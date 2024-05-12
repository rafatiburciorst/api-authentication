import { FastifyInstance } from "fastify";
import { usersController } from "../controllers/users-controller";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', usersController.create)
}