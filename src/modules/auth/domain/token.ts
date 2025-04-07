import * as bcrypt from "bcrypt"

import { ValueObject } from "../../../shared/domain/value-object"

interface TokenProps {
    value: string
    expiresIn?: number
}

export class Token extends ValueObject<TokenProps> {
    private constructor(props: TokenProps) {
        super(props)
    }

    get value(): string {
        return this.props.value
    }

    get expiry(): number | undefined {
        return this.props.expiresIn
    }

    get isExpired(): boolean {
        if (!this.props.expiresIn) {
            return false
        }

        const now = Date.now()
        const expiryDate = new Date(now + this.props.expiresIn * 1000)

        return now > expiryDate.getTime()
    }

    public static create(
        token: string | null,
        expiryTimeInMinutes = 0
    ): Token {
        let authToken: string
        if (token === null) {
            let timestamp = Date.now().toString()
            authToken = bcrypt.hashSync(timestamp, 1)
        } else {
            authToken = token
        }

        const expiresInSeconds = expiryTimeInMinutes * 60

        return new Token({ value: authToken, expiresIn: expiresInSeconds })
    }
}
