import { Guard } from "../../../shared/core/guard"
import { Result } from "../../../shared/core/result"
import { ValueObject } from "../../../shared/domain/value-object"

interface Props {
    value: string
}

export class Role extends ValueObject<Props> {
    private constructor(props: Props) {
        super(props)
    }

    get value(): string {
        return this.props.value
    }

    public static create(value: string): Result<Role> {
        const nullGuard = Guard.againstNullOrUndefined(value, "role")
        const isOneOfGuard = Guard.isOneOf(
            value,
            ["user", "admin"],
            "role"
        )

        const combined = Result.combine([nullGuard, isOneOfGuard])

        if (combined.isFailure) {
            return Result.fail<Role>(combined.getErrorValue())
        }

        return Result.ok<Role>(new Role({ value }))
    }
}
