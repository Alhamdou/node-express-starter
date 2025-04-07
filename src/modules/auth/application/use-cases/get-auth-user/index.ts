import { authRepoImpl } from "../../../infrastructure/repo"
import { GetAuthUser } from "./get-auth-user"
import { GetAuthUserController } from "./get-auth-user-controller"

const getAuthUser = new GetAuthUser(authRepoImpl)
const getAuthUserController = new GetAuthUserController(getAuthUser)

export { getAuthUserController }
