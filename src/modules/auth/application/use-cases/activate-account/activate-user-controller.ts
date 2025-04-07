import { Request, Response } from "express"
import { ActivateAccount } from "./activate-user"
import { ActivateAccountDTO } from "./activate-account-dto"
import { ActivateAccountErrors } from "./activate-account-errors"
import { BaseController } from "../../../../../shared/infra/http/base-controller"

export class ActivateAccountController extends BaseController {
    private _useCase: ActivateAccount

    constructor(useCase: ActivateAccount) {
        super()
        this._useCase = useCase
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const activationToken = req.params.token

        const dto: ActivateAccountDTO = {
            token: activationToken,
        }

        try {
            const result = await this._useCase.execute(dto)

            if (result.isRight()) {
                return this.ok(res)
            } else {
                const error = result.value

                switch (error.constructor) {
                    case ActivateAccountErrors.InvalidToken:
                        return this.unauthorized(
                            res,
                            error.getErrorValue().message
                        )
                    case ActivateAccountErrors.UserAlreadyActivated:
                        return this.conflict(
                            res,
                            error.getErrorValue().message
                        )
                    case ActivateAccountErrors.TokenExpired:
                        return this.unauthorized(
                            res,
                            error.getErrorValue().message
                        )
                    default:
                        return this.fail(
                            res,
                            error.getErrorValue().message
                        )
                }
            }
        } catch (error: any) {
            return this.fail(res, error)
        }
    }
}
