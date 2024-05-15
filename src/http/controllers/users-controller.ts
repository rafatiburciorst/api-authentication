import { FastifyReply, FastifyRequest } from "fastify"
import { UsersService } from "../services/users-service"
import { userSchema } from "../dto/user-dto"
import { ValidationError } from "../exceptions/validation-error"


class UsersController {

    private usersService: UsersService
    constructor() {
        this.usersService = new UsersService()
    }

    create = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const body = userSchema.safeParse(request.body)
            if (body.success === false) {
                throw new ValidationError(
                    'Validation Error',
                    body.error.formErrors.fieldErrors
                )
            }

            await this.usersService.create(body.data)
            return reply.status(201).send({
                message: 'user created successfully'
            })
        } catch (error: any) {
            if (error instanceof ValidationError) {
                return reply.status(401).send({
                    message: error.errors
                })
            }
        }
    }

    update = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { sub } = request.user
            const body = userSchema.safeParse(request.body)
            if (body.success === false) {
                return reply.status(400).send({
                    message: 'validation error',
                    errors: body.error.formErrors.fieldErrors
                })
            }

            await this.usersService.update(body.data, sub)
            return reply.status(200).send()
        } catch (error) {
            return reply.status(400).send({
                message: 'Something went wrong',
                errors: error
            })
        }
    }

    delete = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const { sub } = request.user
            await this.usersService.delete(sub)
            return reply.status(200).send()
        } catch (error) {
            return reply.status(400).send()
        }
    }
}

const usersController = new UsersController()
export {
    usersController
}