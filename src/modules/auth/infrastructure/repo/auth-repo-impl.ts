import { ModelStatic } from "sequelize"
import { AuthRepo } from "../../application/repo/auth-repo"
import { Email } from "../../domain/email"
import { User } from "../../domain/user"
import { UserMapper } from "../../application/mappers/user-mapper"

export class AuthRepoImpl implements AuthRepo {
    constructor(
        private readonly models: Record<string, ModelStatic<any>>
    ) {}

    private createBaseQuery(): any {
        const where: any = {}
        return { where }
    }

    public async save(user: User): Promise<void> {
        const { UserModel } = this.models
        const query = this.createBaseQuery()
        query.where.id = user.id.toString()

        const userPersistence = UserMapper.toPersistence(user)
        const existingUser = await UserModel.findOne(query)

        if (existingUser) {
            await UserModel.update(userPersistence, query)
            return
        }

        await UserModel.create(userPersistence)
    }

    public async findByEmail(email: Email): Promise<User | null> {
        const { UserModel } = this.models
        const query = this.createBaseQuery()

        query.where.email = email.value
        const user = await UserModel.findOne(query)
        if (!user) return null

        return UserMapper.toDomain(user)
    }

    public async findByActivationToken(
        token: string
    ): Promise<User | null> {
        const { UserModel } = this.models
        const query = this.createBaseQuery()

        query.where.activationToken = token
        const user = await UserModel.findOne(query)
        if (!user) return null

        return UserMapper.toDomain(user)
    }

    public async findByAccessToken(token: string): Promise<User | null> {
        const { UserModel } = this.models
        const query = this.createBaseQuery()

        query.where.activationToken = token
        const user = await UserModel.findOne(query)
        if (!user) return null

        return UserMapper.toDomain(user)
    }
}
