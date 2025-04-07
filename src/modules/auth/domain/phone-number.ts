import { Guard } from "../../../shared/core/guard"
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/value-object"
import { TextUtil } from "../../../shared/utils/text-util"

interface Props {
    value: string
}

export class PhoneNumber extends ValueObject<Props> {
    public static minLength: number = 7

    private constructor(props: Props) {
        super(props)
    }

    get value(): string {
        return this.props.value
    }

    public static create(value: string): Result<PhoneNumber> {
        const nullCheck = Guard.againstNullOrUndefined(
            value,
            "phone number"
        )
        const lengthCheck = Guard.againstAtLeast(7, value, "phone number")

        const combined = Result.combine([nullCheck, lengthCheck])
        if (combined.isFailure) {
            return Result.fail<PhoneNumber>(
                `Phone must be at least ${this.minLength} characters long`
            )
        }

        if (!TextUtil.isValidPhoneNumber(value)) {
            return Result.fail<PhoneNumber>("Phone number is not valid")
        }

        return Result.ok(new PhoneNumber({ value }))
    }
}
