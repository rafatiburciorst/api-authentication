import { FastifyRequest, FastifyReply } from "fastify";


export async function authenticated(request: FastifyRequest, reply: FastifyReply) {
    try {
        await request.jwtVerify()
    } catch (error) {
        return reply.status(401).send({
            message: 'Unauthenticated'
        })
    }
}