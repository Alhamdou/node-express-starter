import { left, right } from "../../../../../shared/core/either"
import { Result } from "../../../../../shared/core/result"
import { UseCase } from "../../../../../shared/core/use-case"
import { User } from "../../../domain/user"
import { AuthRepo } from "../../repo/auth-repo"
import { GetAuthUserDTO, GetAuthUserResponse } from "./get-auth-user-dto"
import { GetAuthUserErrors } from "./get-auth-user-errors"

export class GetAuthUser
    implements UseCase<GetAuthUserDTO, GetAuthUserResponse>
{
    private _authRepo: AuthRepo

    constructor(repo: AuthRepo) {
        this._authRepo = repo
    }

    public async execute(
        request: GetAuthUserDTO
    ): Promise<GetAuthUserResponse> {
        const { token } = request

        try {
            const user = await this._authRepo.findByAccessToken(token)

            if (!user) {
                return left(new GetAuthUserErrors.UserNotFound())
            }

            if (user.accessToken?.isExpired) {
                return left(new GetAuthUserErrors.TokenExpired())
            }

            return right(Result.ok<User>(user))
        } catch (error) {
            return left(new GetAuthUserErrors.InvalidToken())
        }
    }
}
