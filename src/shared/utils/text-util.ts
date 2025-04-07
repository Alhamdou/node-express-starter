export class TextUtil {
    public static isValidEmail(email: string): boolean {
        const emailRegex = new RegExp(
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        )
        return emailRegex.test(email)
    }

    public static isValidPhoneNumber(phoneNumber: string): boolean {
        const regexp = new RegExp(/^(3|5|7|2)\d{6}/)
        return regexp.test(phoneNumber)
    }

    public static isValidPassword(password: string): boolean {
        const passwordRegex = new RegExp(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        )
        return passwordRegex.test(password)
    }
}
