const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const MovieOrSerieDB = sequelize.define(
  "movie_or_serie",
  {
    id_character_movie_serie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // PELICULA O SERIE ASOCIADOS
  },
  {
    timestamps: false,
  }
);

module.exports = MovieOrSerieDB;
