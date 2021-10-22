'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vitamin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vitamin.belongsTo(models.Vegetable)
    }
  };
  Vitamin.init({
    name: DataTypes.STRING,
    VegetableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vitamin',
  });
  return Vitamin;
};