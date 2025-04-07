import { Result } from "../../../../../shared/core/result"
import { UseCaseError } from "../../../../../shared/core/use-case-error"

export namespace GetAuthUserErrors {
    export class UserNotFound extends Result<UseCaseError> {
        constructor() {
            super(false, { message: `User not found.` })
            console.error(`User not found`)
        }
    }

    export class TokenExpired extends Result<UseCaseError> {
        constructor() {
            super(false, { message: `Token expired` })
            console.error(`[GetAuthUserErrors]: token expired`)
        }
    }

    export class InvalidToken extends Result<UseCaseError> {
        constructor() {
            super(false, { message: `Invalid token` })
            console.error(`[GetAuthUserErrors]: invalid token`)
        }
    }
}
