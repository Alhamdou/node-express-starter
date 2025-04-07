import { AppError } from "../../../../../shared/core/app-error"
import { Either } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { Token } from "../../../domain/token"
import { LoginErrors } from "./login-errors"

export interface LoginDTO {
    email: string
    password: string
}

export type LoginResponse = Either<
    | AppError.UnexpectedError
    | LoginErrors.InvalidUsernameOrPassword
    | LoginErrors.UserNotFound
    | LoginErrors.UserNotActivated,
    Result<Token>
>
