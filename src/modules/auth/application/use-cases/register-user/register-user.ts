import { AppError } from "../../../../../shared/core/app-error"
import { left, right } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { UseCase } from "../../../../../shared/core/use-case"
import { Email } from "../../../domain/email"
import { Name } from "../../../domain/name"
import { Password } from "../../../domain/password"
import { PhoneNumber } from "../../../domain/phone-number"
import { User } from "../../../domain/user"
import { AuthRepo } from "../../repo/auth-repo"
import { RegisterUserDTO, RegisterUserResponse } from "./register-user-dto"
import { RegisterUserErrors } from "./register-user-errors"

export class RegisterUser
    implements UseCase<RegisterUserDTO, RegisterUserResponse>
{
    private _authRepo: AuthRepo

    constructor(repo: AuthRepo) {
        this._authRepo = repo
    }

    public async execute(
        request: RegisterUserDTO
    ): Promise<RegisterUserResponse> {
        const nameOrError = Name.create(request.name)
        const phoneNumberOrError = PhoneNumber.create(request.phoneNumber)
        const emailOrError = Email.create(request.email)
        const passwordOrError = Password.create(request.password, false)

        const combinedResult = Result.combine([
            nameOrError,
            phoneNumberOrError,
            emailOrError,
            passwordOrError,
        ])
        if (combinedResult.isFailure) {
            return left(
                new RegisterUserErrors.InvalidParameters(
                    combinedResult.getErrorValue()
                )
            )
        }

        const name = nameOrError.getValue()
        const phoneNumber = phoneNumberOrError.getValue()
        const email = emailOrError.getValue()
        const password = passwordOrError.getValue()

        try {
            const userExists = await this._authRepo.findByEmail(email)

            if (userExists && userExists.activationToken === undefined) {
                return left(
                    new RegisterUserErrors.ActivationTokenExpired()
                )
            }
            if (userExists && userExists.activated === true) {
                return left(
                    new RegisterUserErrors.EmailAlreadyExists(
                        request.email
                    )
                )
            }

            const user = User.create({
                name,
                phoneNumber,
                email,
                password,
                activated: false,
            }).getValue()

            user.setDefaultUserRole()
            user.generateActivationToken()

            await this._authRepo.save(user)

            return right(Result.ok<void>())
        } catch (error) {
            return left(AppError.UnexpectedError.create(error))
        }
    }
}
