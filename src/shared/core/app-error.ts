import { Result } from "./result"
import { UseCaseError } from "./use-case-error"

export namespace AppError {
    export class UnexpectedError extends Result<UseCaseError> {
        public constructor(error: any) {
            super(false, {
                message: "An unexpected error occurred.",
                error,
            } as UseCaseError)
            console.error(`[AppError]: An unexpected error occurred.`)
            console.error(error)
        }

        public static create(err: any): UnexpectedError {
            return new UnexpectedError(err)
        }
    }
}
