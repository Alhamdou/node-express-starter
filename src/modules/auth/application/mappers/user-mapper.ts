import { UniqueEntityID } from "../../../../shared/domain/unique-entity-id"
import { Email } from "../../domain/email"
import { Name } from "../../domain/name"
import { Password } from "../../domain/password"
import { PhoneNumber } from "../../domain/phone-number"
import { Role } from "../../domain/role"
import { Token } from "../../domain/token"
import { User } from "../../domain/user"

export class UserMapper {
    public static toPersistence(user: User): any {
        return {
            id: user.id.toString(),
            name: user.name.value,
            email: user.email.value,
            phoneNumber: user.phoneNumber.value,
            activated: user.activated,
            roles: user.roles?.map((role: any) => role.value),
            accessToken: user.accessToken?.value,
            activationToken: user.activationToken?.value,
            password: user.password
                ? user.password.isHashed()
                    ? user.password.value
                    : user.password.getHashedValue()
                : undefined,
        }
    }

    public static toDomain(raw: any): User | null {
        const rolesArray: Role[] = raw.roles?.map((role: any) =>
            Role.create(role)
        )

        const userOrError = User.create(
            {
                name: Name.create(raw.name).getValue(),
                email: Email.create(raw.email).getValue(),
                phoneNumber: PhoneNumber.create(
                    raw.phoneNumber
                ).getValue(),
                activated: raw.activated,
                roles: rolesArray,
                accessToken: raw.accessToken
                    ? Token.create(raw.accessToken)
                    : undefined,
                activationToken: raw.activationToken
                    ? Token.create(raw.activationToken)
                    : undefined,
                password: raw.password
                    ? Password.create(raw.password, true).getValue()
                    : undefined,
            },
            new UniqueEntityID(raw.id)
        )

        return userOrError.isSuccess
            ? userOrError.getValue()
            : userOrError.getErrorValue()
    }
}
