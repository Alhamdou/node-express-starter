import { Guard } from "../../../shared/core/guard"
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/value-object"
import { TextUtil } from "../../../shared/utils/text-util"

interface Props {
    value: string
}

export class Email extends ValueObject<Props> {
    private constructor(props: Props) {
        super(props)
    }

    get value(): string {
        return this.props.value
    }

    public static create(value: string): Result<Email> {
        const guardResult = Guard.againstNullOrUndefined(value, "email")

        if (guardResult.isFailure) {
            return Result.fail<Email>(guardResult.getErrorValue())
        }

        if (value.length < 1) {
            return Result.fail<Email>("Email must not be empty")
        }

        if (!TextUtil.isValidEmail(value)) {
            return Result.fail<Email>("Email is invalid")
        }

        return Result.ok<Email>(new Email({ value }))
    }
}
