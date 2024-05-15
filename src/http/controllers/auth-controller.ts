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
            const { role, sub } = await this.authService.signIn(body)

            const token = await reply.jwtSign({
                role,
                sub
            })

            const refreshToken = await reply.jwtSign({
                role,
                sub,
            }, {
                expiresIn: '7d',
            })

            reply.setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/',
                secure: true,
                sameSite: true
            }).status(200).send({
                accessToken: token
            })
        } catch (error) {
            console.log(error)
            return reply.status(400).send({
                message: error
            })
        }
    }

    me = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { sub } = request.user
            const user = await this.authService.me(sub)
            return reply.status(200).send(user)
        } catch (error) {
            return reply.status(400).send(error)
        }
    }
}

const authController = new AuthController()

export {
    authController
}