const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const CharacterDB = sequelize.define(
  "characters",
  {
    id_character: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_character: {
      type: DataTypes.STRING,
    },
    age_character: {
      type: DataTypes.INTEGER,
    },
    weight_character: {
      type: DataTypes.INTEGER,
    },
    history_character: {
      type: DataTypes.STRING,
    },
    image_character: {
      type: DataTypes.BLOB("long"),
    },
    // PELICULAS O SERIE ASOCIADOS
  },
  {
    timestamps: false,
  }
);

module.exports = CharacterDB;
