import { authRepoImpl } from "../../../infrastructure/repo"
import { ActivateAccount } from "./activate-user"
import { ActivateAccountController } from "./activate-user-controller"

const activateUser = new ActivateAccount(authRepoImpl)
const activateUserController = new ActivateAccountController(activateUser)

export { activateUserController }
