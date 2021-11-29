const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const GenresDB = sequelize.define(
  "genres",
  {
    id_genre: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name_genre: {
      type: DataTypes.STRING,
    },
    image_genre: {
      type: DataTypes.BLOB("long"),
    },
    // PELICULA O SERIE ASOCIADOS
  },
  {
    timestamps: false,
  }
);

module.exports = GenresDB;
