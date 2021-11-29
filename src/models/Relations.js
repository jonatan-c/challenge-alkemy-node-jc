const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.CharacterDB = require("../models/characters.model");
db.MoviesOrSeriesDB = require("../models/moviesOrSeries.model");
db.GenreDB = require("../models/genres.model");
db.table_character_movieOrSerieDB = require("../models/table_character_movieOrSerie.model");
db.UserDB = require("../models/users.model");

db.CharacterDB.belongsToMany(db.MoviesOrSeriesDB, {
  as: "Movies1",
  through: { model: db.table_character_movieOrSerieDB },
  foreignKey: "id_character",
});
db.MoviesOrSeriesDB.belongsToMany(db.CharacterDB, {
  as: "Characters1",
  through: { model: db.table_character_movieOrSerieDB },
  foreignKey: "id_ms",
});

db.GenreDB.hasMany(db.MoviesOrSeriesDB, {
  as: "MoviesOrSeriesDB",
  foreignKey: "id_genre",
});
db.MoviesOrSeriesDB.belongsTo(db.GenreDB, {
  as: "Genre",
  foreignKey: "id_genre",
});

module.exports = db;
