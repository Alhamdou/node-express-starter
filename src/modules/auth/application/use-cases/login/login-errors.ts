import { Result } from "../../../../../shared/core/result"
import { UseCaseError } from "../../../../../shared/core/use-case-error"

export namespace LoginErrors {
    export class InvalidUsernameOrPassword extends Result<UseCaseError> {
        constructor() {
            super(false, { message: "Invalid username or password" })
            console.error("[LoginErrors]: Invalid username or password")
        }
    }

    export class InvalidParameters extends Result<UseCaseError> {
        constructor(message: string) {
            super(false, { message })
            console.error(`[LoginErrors]: ${this.getErrorValue().message}`)
        }
    }

    export class UserNotFound extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, { message: `User with email ${email} not found` })
            console.error(
                `[LoginErrors]: User with email ${email} not found`
            )
        }
    }

    export class UserNotActivated extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `User with email ${email} not activated`,
            })
            console.error(
                `[LoginErrors]: User with email ${email} not activated`
            )
        }
    }
}
