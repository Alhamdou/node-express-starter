import { Guard } from "../../../shared/core/guard"
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/value-object"

interface Props {
    value: string
}

export class Name extends ValueObject<Props> {
    private constructor(props: Props) {
        super(props)
    }

    get firstName(): string {
        return this.props.value.split(" ")[0]
    }

    get lastName(): string {
        return this.props.value.split(" ")[1]
    }

    get value(): string {
        return this.props.value
    }

    public static create(value: string): Result<Name> {
        const nullGuard = Guard.againstNullOrUndefined(value, "name")

        if (!nullGuard.isSuccess) {
            return Result.fail<Name>(nullGuard.getErrorValue())
        }

        return Result.ok<Name>(new Name({ value }))
    }
}
