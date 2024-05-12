import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { Users } from "../controllers/users-controller";
import { hash } from 'bcryptjs'

export class UsersService {

    async create(dada: Users) {
        const exist = await this.findByEmail(dada.email)
        if (exist) {
            throw new Error('User already exists')
        }

        const hashedPassword = await this.hashPassword(dada.password)

        await db.insert(users).values({
            email: dada.email,
            name: dada.name,
            password: hashedPassword,
            role: dada.role
        })
    }

    async findById(userId: number) {
        const user = await db.query.users.findFirst({
            where: eq(users.id, userId)
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await db.query.users.findFirst({
            where: eq(users.email, email)
        })

        return user
    }

    private async hashPassword(password: string) {
        const hashpass = await hash(password, 8)
        return hashpass
    }
}