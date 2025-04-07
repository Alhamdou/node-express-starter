require("dotenv").config()
import { Sequelize } from "sequelize"

interface DatabaseCredentialProp {
    [index: string]: any
}

const {
    DB_USER,
    DB_PASS,
    DB_HOST,
    DB_DEV_NAME,
    DB_TEST_NAME,
    DB_PROD_NAME,
    NODE_ENV,
} = process.env

const databaseCredentials: DatabaseCredentialProp = {
    development: {
        username: DB_USER!,
        password: DB_PASS!,
        database: DB_DEV_NAME!,
        host: DB_HOST!,
        dialect: "mysql",
    },
    test: {
        username: DB_USER!,
        password: DB_PASS!,
        database: DB_TEST_NAME!,
        host: DB_HOST!,
        dialect: "mysql",
    },
    production: {
        username: DB_USER!,
        password: DB_PASS!,
        database: DB_PROD_NAME!,
        host: DB_HOST!,
        dialect: "mysql",
    },
}

const { username, password, database, host, dialect } =
    databaseCredentials[NODE_ENV!]

export default databaseCredentials

const mode = NODE_ENV === "development" ? "dev" : "prod"

console.log(`[DB]: Connecting to the database in ${mode} mode.`)

export const connection = new Sequelize(database, username, password, {
    host,
    dialect,
    port: 3306,
    dialectOptions: {
        multipleStatements: true,
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
    logging: false,
})
