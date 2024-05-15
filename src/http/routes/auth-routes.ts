import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth-controller";
import { authenticated } from "../middleware/authenticate";

export async function authRoutes(app: FastifyInstance) {
    app.post('/sign-in', authController.signIn)
    app.get('/me', { preHandler: [authenticated] }, authController.me)
}