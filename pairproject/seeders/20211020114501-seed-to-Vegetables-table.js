'use strict';
const fs = require("fs")

module.exports = {
  up: (queryInterface, Sequelize) => {
      let data = JSON.parse(
        fs.readFileSync("./data/vegie.json", "utf-8")
      );
        data.forEach((el) => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
        });
        return queryInterface.bulkInsert("Vegetables", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Vegetabels", null, {});
  }
};
