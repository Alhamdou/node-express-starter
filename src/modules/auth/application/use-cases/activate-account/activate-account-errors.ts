import { Result } from "../../../../../shared/core/result"
import { UseCaseError } from "../../../../../shared/core/use-case-error"

export namespace ActivateAccountErrors {
    export class UserAlreadyActivated extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, { message: `User already activated` })
            console.error(
                `[ActivateAccountErrors]: user with email ${email} already activated`
            )
        }
    }

    export class TokenExpired extends Result<UseCaseError> {
        constructor() {
            super(false, { message: `Token expired` })
            console.error(`[ActivateAccountErrors]: token expired`)
        }
    }

    export class InvalidToken extends Result<UseCaseError> {
        constructor() {
            super(false, { message: `Invalid token` })
            console.error(`[ActivateAccountErrors]: invalid token`)
        }
    }

}
