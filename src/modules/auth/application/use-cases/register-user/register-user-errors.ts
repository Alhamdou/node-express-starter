import { Result } from "../../../../../shared/core/result"
import { UseCaseError } from "../../../../../shared/core/use-case-error"

export namespace RegisterUserErrors {
    export class InvalidParameters extends Result<UseCaseError> {
        constructor(message: string) {
            super(false, { message })
            console.error(
                `[RegisterUserErrors]: ${this.getErrorValue().message}`
            )
        }
    }

    export class EmailAlreadyExists extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `The email ${email} is already in use.`,
            })
            console.error(
                `[RegisterUserErrors]: ${this.getErrorValue().message}`
            )
        }
    }

    export class ActivationTokenExpired extends Result<UseCaseError> {
        constructor() {
            super(false, {
                message: `Account already registered, resend activation link to activate account.`,
            })
            console.error(
                `[RegisterUserErrors]: ${this.getErrorValue().message}`
            )
        }
    }
}
