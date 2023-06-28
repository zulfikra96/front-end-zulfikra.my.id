import { Pool } from "pg";
import { createClient } from "redis"

const redisClient = createClient({
    url:`redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on("error", () => {
    console.log("Redis Client Error ", err);
})

const postgres = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POST
})

// export const 
/**
 * 
 * @param {String} query string ex "SELECT * FROM users"
 * @param {Array} params 
 * @returns 
 */
export function rawSql(query, params) {
    return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
            if(err) throw err;
            client.query(query, params, (err, result) => {
                done();
                if(err){
                    return reject(err.stack);
                }
                return resolve(result.rows);
            });
        });
    });
}

export function rawSqlWithCache(query, params, cache, duration, flush) {
    if(flush){
        redisClient.flushall();
    }
    if(cache){
        return new Promise((resolve, reject) => {
            redisClient.get(query, async (err, result) => {
                if(err) return reject(err);
                if(result === null){
                    const FETCH = await rawSql(query, params)
                        .catch(reject);
                    if(duration === 0 || duration === null){
                        redisClient.set(query, JSON.stringify(FETCH),(err,result) => {
                            if(err) return reject(err);
                            return resolve(JSON.parse(FETCH));
                        });
                    }else{
                        redisClient.setex(query, duration, JSON.stringify(FETCH),(err) => {
                            if(err) return reject(err);
                            if(typeof FETCH === "object") return resolve(FETCH);
                            return resolve(JSON.parse(FETCH));
                        });
                    }
                }
                if(typeof result === "string"){
                    return resolve(JSON.parse(result));
                }
                redisClient.disconnect()
                return result;
            });
            
        });
    }
    return rawSql(query, params);
}