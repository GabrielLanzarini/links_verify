const express = require("express")
const routes = require("./routes")
const cors = require("cors")
const sequelize = require("./database")

const app = express()

sequelize.authenticate().then(() => {
    app.use(express.json())

    app.use(cors())

    app.use(routes)

    app.listen(5000, () => {
        console.log("http://localhost:5000")
    })
})
