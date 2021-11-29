const CharactersDB = require("../models/characters.model");

const isIdCharacterinDB = async (req, res, next) => {
  const { id } = req.params;
  const character = await CharactersDB.findOne({ where: { id_character: id } });

  if (!character) {
    return res.status(404).json({
      message: "Character not found",
    });
  }
  next();
};

module.exports = { isIdCharacterinDB };
