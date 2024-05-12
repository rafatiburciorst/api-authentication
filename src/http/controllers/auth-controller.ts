import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { AuthService } from "../services/auth-service"

const authSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export type LoginPayload = z.infer<typeof authSchema>

class AuthController {

    private authService: AuthService
    constructor() {
        this.authService = new AuthService()
    }

    signIn = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = authSchema.parse(request.body)
            const sub = await this.authService.signIn(body)

            const token = await reply.jwtSign(sub)

            return reply.status(200).send({
                accessToken: token
            })
        } catch (error) {
            console.log(error)
            return reply.status(400).send({
                message: error
            })
        }
    }
}

const authController = new AuthController()
export {
    authController
}