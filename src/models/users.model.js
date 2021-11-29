const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const UsersDB = sequelize.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password1: {
      type: DataTypes.STRING,
    },
    role_user: {
      type: DataTypes.STRING,
    },
    status_user: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = UsersDB;
