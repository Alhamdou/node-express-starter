import * as bcrypt from "bcrypt"
import { ValueObject } from "../../../shared/domain/value-object"
import { Result } from "../../../shared/core/result"

interface PasswordProps {
    value: string
    hashed: boolean
}

export class Password extends ValueObject<PasswordProps> {
    private constructor(props: PasswordProps) {
        super(props)
    }

    get value(): string {
        return this.props.value
    }

    public isHashed(): boolean {
        return this.props.hashed
    }

    private hashPassword(plainTextPassword: string): string {
        let hash = bcrypt.hashSync(plainTextPassword, 1)
        return hash
    }

    public getHashedValue(): string {
        if (this.isHashed()) {
            return this.props.value
        } else {
            return this.hashPassword(this.props.value)
        }
    }

    private bcryptCompare(
        plainText: string,
        hashed: string
    ): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, result) => {
                if (err) return resolve(false)
                return resolve(result)
            })
        })
    }

    public async comparePassword(
        plainTextPassword: string
    ): Promise<boolean> {
        let hashed: string
        if (this.isHashed()) {
            hashed = this.props.value
            return this.bcryptCompare(plainTextPassword, hashed)
        } else {
            return this.props.value === plainTextPassword
        }
    }

    public static create(
        value: string,
        hashed: boolean
    ): Result<Password> {
        // if (TextUtil.isValidPassword(value)) {
        //     return Result.fail<Password>(
        //         "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number"
        //     )
        // }

        return Result.ok<Password>(new Password({ value, hashed }))
    }
}
