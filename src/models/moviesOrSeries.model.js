const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const MoviesOrSeriesDB = sequelize.define(
  "moviesorseries",
  {
    id_ms: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title_ms: {
      type: DataTypes.STRING,
    },
    creation_date_ms: {
      type: DataTypes.INTEGER,
    },
    qualification_ms: {
      type: DataTypes.INTEGER,
    },
    image_ms: {
      type: DataTypes.BLOB("long"),
    },
    //PERSONAJES ASOCIADOS
  },
  {
    timestamps: false,
  }
);

module.exports = MoviesOrSeriesDB;
