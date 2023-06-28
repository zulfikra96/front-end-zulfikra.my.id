import Fastify from "fastify"
import api from "./routes/api.js"

const fastify = Fastify({
    logger: true
})

fastify.register(api);

fastify.listen({ port: process.env.PORT, host:"0.0.0.0" }, (err, address) => {
    console.log("app run on", address)
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})