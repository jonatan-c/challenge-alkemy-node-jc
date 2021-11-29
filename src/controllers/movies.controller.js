const Movies_Series = require("../models/moviesOrSeries.model");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
//params
async function getMovie(req, res) {
  const { id } = req.params;
  try {
    const movies2 = await Movies_Series.findOne({
      include: ["Characters1"],
      where: {
        id_ms: id,
      },
    });
    if (movies2 == null || movies2.length == 0 || movies2 == undefined) {
      res.status(404).json("Not found");
    } else {
      fs.writeFileSync(
        path.join(
          __dirname,
          "../dbimagesmovies/" + movies2.id_ms + "imagen.png"
        ),
        movies2.image_ms
      );
      const imagesDir = fs.readdirSync(
        path.join(__dirname, "../dbimagesmovies/")
      );
      // get
      const info = {
        information: [
          {
            Image: `http://localhost:3090/${imagesDir}`,
            Title: movies2.title_ms,
            Date_Release: movies2.creation_date_ms,
            Genre: movies2.id_genre,
          },
        ],
        Personajes: [
          {
            Name: movies2.name_character,
            Age: movies2.age_character,
            Weight: movies2.weight_character,
            Historia: movies2.history_character,
          },
        ],
      };
      res.json(info);
    }
  } catch (error) {
    console.log(error);
  }
}

//Query params
async function getMovieQuery(req, res) {
  const result = await Movies_Series.findAll({
    // include: [{ all: true }],
    include: ["Characters1"],
  });

  result.map((img) => {
    fs.writeFileSync(
      path.join(__dirname, "../dbimagesmovies/" + img.id_ms + "imagen.png"),
      img.image_ms
    );
  });
  const imagesDir = fs.readdirSync(path.join(__dirname, "../dbimagesmovies/"));

  const info = result.map((item) => {
    return {
      information: [
        {
          Imagen: `http://localhost:3090/${imagesDir.find((img) =>
            img.includes(item.id_ms)
          )}`,
          Titulo: item.title_ms,
          Fecha_Estreno: item.creation_date_ms,
          // Genero: item.Genre.name_genre,
        },
      ],
      Details: [
        {
          Personajes: item.Characters1.map((character) => {
            return {
              Nombre: character.name_character,
              Edad: character.age_character,
              Peso: character.weight_character,
              Historia: character.history_character,
            };
          }),
        },
      ],
    };
  });

  //querys
  const { name, genre, order } = req.query;
  if (name != undefined) {
    const mapeo = info.filter((item) =>
      item.information[0].Titulo.split(" ")
        .join("")
        .toLowerCase()
        .includes(name.toLowerCase().split(" ").join(""))
    );
    res.json(mapeo);
  } else if (genre != undefined) {
    const mapeo = info.filter((item) =>
      item.information[0].Genero.split(" ")
        .join("")
        .toLowerCase()
        .includes(genre.toLowerCase().split(" ").join(""))
    );
    res.json(mapeo);
  } else if (order != undefined) {
    const mapeo = info.sort((a, b) => {
      if (order == "asc") {
        return a.information[0].Fecha_Estreno - b.information[0].Fecha_Estreno;
      } else if (order == "desc") {
        return b.information[0].Fecha_Estreno - a.information[0].Fecha_Estreno;
      }
    });
    res.json(mapeo);
  } else {
    res.json(info);
  }
}

async function addMovie(req, res) {
  const { title_ms, creation_date_ms, qualification_ms, id_genre } = req.body;
  const data = fs.readFileSync(
    path.join(__dirname, "../imagesmovies/", req.file.filename)
  );
  const result = await Movies_Series.create({
    title_ms: title_ms,
    image_ms: data,
    creation_date_ms: creation_date_ms,
    qualification_ms: qualification_ms,
    id_genre: id_genre,
  });
  res.json("Movie added correctly");
}

async function editMovie(req, res) {
  const { id } = req.params;
  const result = await Movies_Series.update(
    {
      title_ms: req.body.title_ms,
      image_ms: req.body.image_ms,
      creation_date_ms: req.body.creation_date_ms,
      qualification_ms: req.body.qualification_ms,
      id_genre: req.body.id_genre,
    },
    {
      where: {
        id_ms: id,
      },
    }
  );
  res.json("Edit correctly");
}

async function deleteMovie(req, res) {
  const { id } = req.params;
  const result = await Movies_Series.destroy({
    where: {
      id_ms: id,
    },
  });
  res.json("Delete correctly");
}

module.exports = {
  getMovie,
  getMovieQuery,
  addMovie,
  editMovie,
  deleteMovie,
};
