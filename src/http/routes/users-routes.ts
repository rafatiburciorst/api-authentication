import { FastifyInstance } from "fastify";
import { usersController } from "../controllers/users-controller";
import { authenticated } from "../middleware/authenticate";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', usersController.create)
    app.put('/users', { onRequest: [authenticated] }, usersController.update)
    app.delete('/users', { onRequest: [authenticated] }, usersController.delete)
}