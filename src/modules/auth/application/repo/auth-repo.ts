import { Email } from "../../domain/email"
import { User } from "../../domain/user"

export interface AuthRepo {
    save(user: User): Promise<void>
    findByEmail(email: Email): Promise<User | null>
    findByActivationToken(token: string): Promise<User | null>
    findByAccessToken(token: string): Promise<User | null>
}
