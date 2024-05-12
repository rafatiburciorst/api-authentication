import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3333),
    DRIZZLE_DATABASE_URL: z.string(),
    JWT_PRIVATE_KEY: z.string(),
    JWT_PUBLIC_KEY: z.string(),
})

const isValid = envSchema.safeParse(process.env)

if (!isValid.success) {
    console.error(isValid.error.formErrors.fieldErrors)
    throw new Error()
}

const env = isValid.data

export {
    env
}