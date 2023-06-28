/**
 * 
 * @param {import("fastify").FastifyInstance} fastify encapsulation 
 * @param {*} options 
 */
export default  async function routes(fastify, options) {
    fastify.get("/", async (req, res) => {
        return { hello :"world"}
    })
}