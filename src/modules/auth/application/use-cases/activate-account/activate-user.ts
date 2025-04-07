import { AppError } from "../../../../../shared/core/app-error"
import { left, right } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { UseCase } from "../../../../../shared/core/use-case"
import { AuthRepo } from "../../repo/auth-repo"
import {
    ActivateAccountDTO,
    ActivateAccountResponse,
} from "./activate-account-dto"
import { ActivateAccountErrors } from "./activate-account-errors"

export class ActivateAccount
    implements UseCase<ActivateAccountDTO, ActivateAccountResponse>
{
    private _authRepo: AuthRepo

    constructor(repo: AuthRepo) {
        this._authRepo = repo
    }

    public async execute(
        request: ActivateAccountDTO
    ): Promise<ActivateAccountResponse> {
        const { token } = request

        try {
            const user = await this._authRepo.findByActivationToken(token)


            if (!user) {
                return left(new ActivateAccountErrors.UserNotFound())
            }

            if (user.activated) {
                return left(
                    new ActivateAccountErrors.UserAlreadyActivated(
                        user.email.value
                    )
                )
            }

            if (
                !user.activationToken ||
                user.activationToken.isExpired
            ) {
                return left(new ActivateAccountErrors.TokenExpired())
            }

            user.activate()
            user.clearActivationToken()
            await this._authRepo.save(user)

            return right(Result.ok<void>())
        } catch (error) {
            return left(new AppError.UnexpectedError(error))
        }
    }
}
