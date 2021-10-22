"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vegetable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vegetable.hasMany(models.Vitamin);
      Vegetable.hasMany(models.Transaction);
    }

    get showPrice() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(this.price);
    }

    get showGram() {
      return `Berat: ${this.weight} grams`;
    }
  }
  Vegetable.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please input Name." },
        },
      },
      price: DataTypes.INTEGER,
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Please input Image." },
        },
      },
      description: DataTypes.TEXT,
      stock: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (instance, options) => {
          let nama = instance.name.split(" ");
          let namaFormatted = nama.map(
            (e) => `${e[0].toUpperCase()}${e.slice(1).toLowerCase()}`
          );
          instance.name = namaFormatted.join(" ");
          //kota
        },
      },
      modelName: "Vegetable",
    }
  );
  return Vegetable;
};
