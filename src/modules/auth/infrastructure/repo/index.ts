import models from "../../../../shared/infra/database/sequelize/models"
import { AuthRepoImpl } from "./auth-repo-impl"

export const authRepoImpl = new AuthRepoImpl(models)
