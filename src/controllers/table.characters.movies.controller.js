const TableCharactersMovies = require("../models/table_character_movieOrSerie.model");

async function addCharacterMovie(req, res) {
  const { id_character, id_ms } = req.body;
  const newCharacterMovie = await TableCharactersMovies.create({
    id_character: id_character,
    id_ms: id_ms,
  });

  res.json({
    status: "Character Movie Saved",
  });
}

module.exports = {
  addCharacterMovie,
};
