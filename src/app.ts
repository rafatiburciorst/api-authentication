import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { userRoutes } from "./http/routes/users-routes";
import { authRoutes } from "./http/routes/auth-routes";
import { env } from "./env";

const app = fastify()

app.register(fastifyJwt, {
    secret: {
        public: Buffer.from(env.JWT_PUBLIC_KEY, 'base64'),
        private: Buffer.from(env.JWT_PRIVATE_KEY, 'base64')
    },
    sign: { algorithm: 'RS256', expiresIn: '7m' },
})

app.register(fastifyCookie)

app.register(userRoutes)
app.register(authRoutes)

export {
    app
}