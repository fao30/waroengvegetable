'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Vitamins", "VegetableId", {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Vegetables",
        },
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Vitamins", "VegetableId", {});
  }
};
