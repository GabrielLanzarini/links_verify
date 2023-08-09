"use strict"

const { DataType } = require("sequelize")
const Links = require("../models/links.js")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("link", Links.getAttributes())
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("link")
  },
}
