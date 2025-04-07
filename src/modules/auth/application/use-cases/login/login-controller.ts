import { Request, Response } from "express"
import { Login } from "./login"
import { LoginDTO } from "./login-dto"
import { LoginErrors } from "./login-errors"
import { BaseController } from "../../../../../shared/infra/http/base-controller"

export class LoginController extends BaseController {
    constructor(private readonly _useCase: Login) {
        super()
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const { email, password } = req.body

        if (!!email === false || !!password === false) {
            return this.clientError(res, "email and password are required")
        }

        const dto: LoginDTO = {
            email,
            password,
        }

        const result = await this._useCase.execute(dto)

        if (result.isRight()) {
            const value = result.value.getValue()

            return this.ok(res, value)
        } else {
            const error = result.value

            switch (error.constructor) {
                case LoginErrors.InvalidParameters:
                    return this.clientError(
                        res,
                        error.getErrorValue().message
                    )
                case LoginErrors.UserNotFound:
                    return this.notFound(
                        res,
                        error.getErrorValue().message
                    )
                case LoginErrors.UserNotActivated:
                    return this.forbidden(
                        res,
                        error.getErrorValue().message
                    )
                case LoginErrors.InvalidUsernameOrPassword:
                    return this.fail(res, error.getErrorValue().message)
                default:
                    return this.fail(res, error.getErrorValue().message)
            }
        }
    }
}
