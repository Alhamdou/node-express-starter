require("dotenv").config()
// Infrastructure
import { app } from "./shared/infra/http/app"
import "./shared/infra/database/sequelize"

// Subscriptions
// import './modules/something/subscriptions'

// import server from "./server";

const APP_PORT = process.env.APP_PORT || 3000

app.listen(APP_PORT, () => {
    console.log(`Running on http://localhost:${APP_PORT}`)
})
