import { Request, Response } from "express"
import { BaseController } from "../../../../../shared/infra/http/base-controller"
import { GetAuthUser } from "./get-auth-user"
import { GetAuthUserDTO } from "./get-auth-user-dto"
import { GetAuthUserErrors } from "./get-auth-user-errors"

export class GetAuthUserController extends BaseController {
    constructor(private readonly _useCase: GetAuthUser) {
        super()
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : null

        if (token === null) {
            return this.unauthorized(res, "Unauthorized")
        }

        const dto: GetAuthUserDTO = { token }

        const result = await this._useCase.execute(dto)

        if (result.isRight()) {
            const value = result.value.getValue()

            return this.ok(res, value)
        } else {
            const error = result.value

            switch (error.constructor) {
                case GetAuthUserErrors.InvalidToken:
                    return this.unauthorized(
                        res,
                        error.getErrorValue().message
                    )
                case GetAuthUserErrors.TokenExpired:
                    return this.unauthorized(
                        res,
                        error.getErrorValue().message
                    )
                case GetAuthUserErrors.UserNotFound:
                    return this.notFound(
                        res,
                        error.getErrorValue().message
                    )
                default:
                    return this.fail(res, error.getErrorValue().message)
            }
        }
    }
}
