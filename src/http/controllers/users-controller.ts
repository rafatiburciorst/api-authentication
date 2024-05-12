import { FastifyReply, FastifyRequest } from "fastify"
import { z } from 'zod'
import { UsersService } from "../services/users-service"

const usersSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['user', 'admin']).optional().default('user'),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
})

export type Users = z.infer<typeof usersSchema>

class UsersController {

    private usersService: UsersService
    constructor() {
        this.usersService = new UsersService()
    }

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = usersSchema.parse(request.body)
            await this.usersService.create(body)
            return reply.status(201).send({
                message: 'user created successfully'
            })
        } catch (error) {
            console.log(error)
            return reply.status(401).send({
                message: 'error on create user'
            })
        }
    }
}

const usersController = new UsersController()
export {
    usersController
}