const { DataTypes } = require("sequelize")
const sequelize = require("../database")

const Links = sequelize.define(
    "link",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING(40),
        },
        link: {
            type: DataTypes.ARRAY(DataTypes.STRING(400)),
        },
    },
    {
        timestamps: true,
    }
)

module.exports = Links
