import { authRepoImpl } from "../../../infrastructure/repo"
import { RegisterUser } from "./register-user"
import { RegisterUserController } from "./register-user-controller"

const registerUser = new RegisterUser(authRepoImpl)
const registerUserController = new RegisterUserController(registerUser)

export { registerUserController }
