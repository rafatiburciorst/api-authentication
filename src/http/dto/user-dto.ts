import { z } from "zod"

const userSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.enum(['user', 'admin']).optional().default('user'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
})

type Users = z.infer<typeof userSchema>

export {
    userSchema,
    Users
}
