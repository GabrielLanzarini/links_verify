"use strict"

import { DataType } from "sequelize"
import Links from "../models/links.js"

export default {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("link", Links.getAttributes())
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("link")
    },
}
