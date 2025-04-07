import { AppError } from "../../../../../shared/core/app-error"
import { Either } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { RegisterUserErrors } from "./register-user-errors"

export interface RegisterUserDTO {
    name: string
    phoneNumber: string
    email: string
    password: string
}

export type RegisterUserResponse = Either<
    | AppError.UnexpectedError
    | RegisterUserErrors.EmailAlreadyExists
    | RegisterUserErrors.InvalidParameters,
    Result<void>
>
