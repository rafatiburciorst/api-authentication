import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        payload: {
            role: 'admin' | 'user'
            sub: number
        }
        user: {
            sub: number
        }
    }
}