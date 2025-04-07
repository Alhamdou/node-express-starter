import { Email } from "./email"
import { Name } from "./name"
import { Password } from "./password"
import { PhoneNumber } from "./phone-number"
import { Role } from "./role"
import { Token } from "./token"
import { Entity } from "../../../shared/domain/entity"
import { UniqueEntityID } from "../../../shared/domain/unique-entity-id"
import { Result } from "../../../shared/core/result"
import { Guard } from "../../../shared/core/guard"

interface Props {
    name: Name
    email: Email
    phoneNumber: PhoneNumber
    activated: boolean
    roles?: Role[]
    accessToken?: Token
    activationToken?: Token
    password?: Password
}

export class User extends Entity<Props> {
    private constructor(props: Props, id?: UniqueEntityID) {
        super(props, id)
    }

    get id(): UniqueEntityID {
        return this._id
    }

    get name(): Name {
        return this.props.name
    }

    get email(): Email {
        return this.props.email
    }

    get phoneNumber(): PhoneNumber {
        return this.props.phoneNumber
    }

    get roles(): Role[] | undefined {
        return this.props.roles
    }

    get activated(): boolean {
        return this.props.activated
    }

    set activated(value: boolean) {
        this.props.activated = value
    }

    get accessToken(): Token | undefined {
        return this.props.accessToken
    }

    get activationToken(): Token | undefined {
        return this.props.activationToken
    }

    set activationToken(value: Token | undefined) {
        this.props.activationToken = value
    }

    get password(): Password | undefined {
        return this.props.password
    }

    activate(): void {
        this.props.activated = true
    }

    clearActivationToken(): void {
        this.props.activationToken = undefined
    }

    setDefaultUserRole(): void {
        this.props.roles = [Role.create("user").getValue()]
    }

    setDefaultAdminRole(): void {
        this.props.roles = [Role.create("admin").getValue()]
    }

    generateAccessToken(): Token {
        return Token.create(null)
    }

    generateActivationToken(): void {
        // generate new activation token
    }

    verifyActivationToken(token: string): boolean {
        // verify activation token
        return true
    }

    public static create(props: Props, id?: UniqueEntityID): Result<User> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: "name" },
            { argument: props.email, argumentName: "email" },
            { argument: props.phoneNumber, argumentName: "phoneNumber" },
            { argument: props.activated, argumentName: "activated" },
        ])
        if (!nullGuard.isSuccess) {
            return Result.fail<User>(nullGuard.getErrorValue())
        } else {
            const user = new User(props, id)

            const isNewUser = !!id === false
            if (isNewUser) {
                // user.addDomainEvent(new UserCreated(user))
                // console.info("UserCreatedEvent fired!")
            }

            return Result.ok<User>(user)
        }
    }
}
