import { AppError } from "../../../../../shared/core/app-error"
import { Either } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { User } from "../../../domain/user"
import { GetAuthUserErrors } from "./get-auth-user-errors"

export interface GetAuthUserDTO {
    token: string
}

export type GetAuthUserResponse = Either<
    | AppError.UnexpectedError
    | GetAuthUserErrors.UserNotFound
    | GetAuthUserErrors.InvalidToken
    | GetAuthUserErrors.TokenExpired,
    Result<User>
>
