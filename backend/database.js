const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: "postgres",
    host: "db",
    username: "postgres",
    password: "postgres",
    database: "links_verify",
    port: 5432,
    define: {
        freezeTableName: true,
    },
})

module.exports = sequelize
