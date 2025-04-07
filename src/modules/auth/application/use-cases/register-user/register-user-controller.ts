import { Request, Response } from "express"
import { BaseController } from "../../../../../shared/infra/http/base-controller"
import { RegisterUser } from "./register-user"
import { RegisterUserDTO } from "./register-user-dto"
import { RegisterUserErrors } from "./register-user-errors"

export class RegisterUserController extends BaseController {
    constructor(private readonly _useCase: RegisterUser) {
        super()
    }

    protected async executeImpl(
        req: Request,
        res: Response
    ): Promise<any> {
        const { name, phoneNumber, email, password } = req.body

        if (!!name === false) {
            return this.clientError(res, "name is required.")
        } else if (!!phoneNumber === false) {
            return this.clientError(res, "phoneNumber is required.")
        } else if (!!email === false) {
            return this.clientError(res, "email is required.")
        } else if (!!password === false) {
            return this.clientError(res, "password is required.")
        }

        const dto: RegisterUserDTO = {
            name,
            phoneNumber,
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
                case RegisterUserErrors.InvalidParameters:
                    return this.clientError(
                        res,
                        error.getErrorValue().message
                    )
                case RegisterUserErrors.EmailAlreadyExists:
                    return this.conflict(
                        res,
                        error.getErrorValue().message
                    )
                default:
                    return this.fail(res, error.getErrorValue().message)
            }
        }
    }
}
