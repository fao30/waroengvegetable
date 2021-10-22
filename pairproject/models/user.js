"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Account);
      User.hasMany(models.Transaction);
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate(instence, option) {
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(instence.password, salt);

          instence.password = hash;
        },
      },
      modelName: "User",
    }
  );
  return User;
};
