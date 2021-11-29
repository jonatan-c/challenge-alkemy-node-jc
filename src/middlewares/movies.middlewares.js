const MovieOrSerieDB = require("../models/moviesOrSeries.model");

const isIdMSinDB = async (req, res, next) => {
  const id = req.params.id;
  const movieOrSerieDB = await MovieOrSerieDB.findOne({
    where: { id_ms: id },
  });
  if (!movieOrSerieDB) {
    return res.status(404).json({
      status: "error",
      message: "Movie or serie not found",
    });
  }
  next();
};

module.exports = { isIdMSinDB };
