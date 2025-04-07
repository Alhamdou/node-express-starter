import { AppError } from "../../../../../shared/core/app-error"
import { left, right } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { UseCase } from "../../../../../shared/core/use-case"
import { Email } from "../../../domain/email"
import { Password } from "../../../domain/password"
import { Token } from "../../../domain/token"
import { AuthRepo } from "../../repo/auth-repo"
import { LoginDTO, LoginResponse } from "./login-dto"
import { LoginErrors } from "./login-errors"

export class Login implements UseCase<LoginDTO, LoginResponse> {
    private _authRepo: AuthRepo

    constructor(repo: AuthRepo) {
        this._authRepo = repo
    }

    public async execute(request: LoginDTO): Promise<LoginResponse> {
        const emailOrError = Email.create(request.email)
        const passwordOrError = Password.create(request.password, true)

        const combined = Result.combine([emailOrError, passwordOrError])
        if (combined.isFailure) {
            return left(
                new LoginErrors.InvalidParameters(combined.getErrorValue())
            )
        }

        const email = emailOrError.getValue()
        const password = passwordOrError.getValue()

        try {
            const user = await this._authRepo.findByEmail(email)
            if (!user) {
                return left(new LoginErrors.UserNotFound(email.value))
            }
            if (!user.activated) {
                return left(new LoginErrors.UserNotActivated(email.value))
            }

            const passwordMatches = await user.password?.comparePassword(
                password.value
            )
            if (!passwordMatches) {
                return left(new LoginErrors.InvalidUsernameOrPassword())
            }

            const token = user.generateAccessToken()

            return right(Result.ok<Token>(token))
        } catch (error) {
            return left(AppError.UnexpectedError.create(error))
        }
    }
}
