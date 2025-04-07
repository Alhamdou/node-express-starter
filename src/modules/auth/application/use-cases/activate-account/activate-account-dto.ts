import { AppError } from "../../../../../shared/core/app-error"
import { Either } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { ActivateAccountErrors } from "./activate-account-errors"

export interface ActivateAccountDTO {
    token: string
}

export type ActivateAccountResponse = Either<
    | AppError.UnexpectedError
    | ActivateAccountErrors.InvalidToken
    | ActivateAccountErrors.TokenExpired
    | ActivateAccountErrors.UserAlreadyActivated,
    Result<void>
>
