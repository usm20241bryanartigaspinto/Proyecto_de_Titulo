import mysql from 'serverless-mysql'

export const conn = mysql({
    config: {
        host: "localhost",
        user: "root",
        password: "12aa34aa",
        port: "3306",
        database: "bdinfancia1",
    }
})