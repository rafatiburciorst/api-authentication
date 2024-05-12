import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth-controller";

export async function authRoutes(app: FastifyInstance) {
    app.post('/sign-in', authController.signIn)
}