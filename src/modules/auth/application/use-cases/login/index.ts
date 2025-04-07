import { authRepoImpl } from "../../../infrastructure/repo"
import { Login } from "./login"
import { LoginController } from "./login-controller"

const login = new Login(authRepoImpl)
const loginController = new LoginController(login)

export { loginController }
