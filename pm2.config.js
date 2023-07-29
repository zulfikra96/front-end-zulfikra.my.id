module.exports = {
    apps:[
        {
            name:"zulfikra.my.id",
            script:"PORT=3000 npm run build && npm run start",
            ignore_watch:["."],
            env_production:{
                NODE_ENV:"production"
            }
        }
    ]
}