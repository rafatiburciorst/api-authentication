import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { users } from "../../db/schema";
import { hash } from 'bcryptjs'
import { Users } from "../dto/user-dto";

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

    async update(dada: Users, userId: number) {
        await db.update(users).set(dada).where(eq(users.id, userId))
    }

    async delete(userId: number) {
        await db.delete(users).where(eq(users.id, userId))
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