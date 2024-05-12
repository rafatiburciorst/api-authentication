import { eq } from "drizzle-orm";
import { db } from "../../db/connection";
import { compare } from 'bcryptjs'
import { LoginPayload } from "../controllers/auth-controller";
import { UsersService } from "./users-service";

export class AuthService {

    private usersService: UsersService
    constructor() {
        this.usersService = new UsersService()
    }

    async signIn(data: LoginPayload) {
        const user = await this.usersService.findByEmail(data.email)
        if (!user) throw new Error('Email or password does not match')
        const pass = await this.unhashPassword(data.password, user.password)
        if (!pass) {
            console.log('Password não bateu')
            throw new Error('Email or password does not match')
        }
        return {
            sub: user.id
        }
    }

    async unhashPassword(password: string, userPass: string) {
        const pass = await compare(password, userPass)
        if (!pass) throw Error('Email or password does not match')
        
        return pass
    }
}