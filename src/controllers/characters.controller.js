require("dotenv").config();
const CharacterDB = require("../models/characters.model");
const TableUion_Movies_Series = require("../models/table_character_movieOrSerie.model");
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

//params
async function getCharacter(req, res) {
  const { id } = req.params;
  try {
    const movies2 = await CharacterDB.findOne({
      include: ["Movies1"],
      where: {
        id_character: id,
      },
    });
    // console.log(movies2);

    if (movies2 == null || movies2.length == 0 || movies2 == undefined) {
      res.status(404).json("Not found");
    } else {
      fs.writeFileSync(
        path.join(
          __dirname,
          "../dbimages/" + movies2.id_character + "imagen.png"
        ),
        movies2.image_character
      );
      const imagesDir = fs.readdirSync(path.join(__dirname, "../dbimages/"));

      // get
      const info = {
        information: [
          {
            Image: `http://localhost:3090/${imagesDir}`,
            Name: movies2.name_character,
          },
        ],
        details: [
          {
            Age: movies2.age_character,
            Weight: movies2.weight_character,
            History: movies2.history_character,
            Peliculas_Series_Asociadas: movies2.Movies1.map((pelicula) => {
              return {
                id: pelicula.id_ms,
                Title: pelicula.title_ms,
                Creation: pelicula.creation_date_ms,
              };
            }),
          },
        ],
      };
      res.json(info);
    }
  } catch (error) {
    console.log(error);
  }
}

// Query
async function getCharacterQuery(req, res) {
  const movies2 = await CharacterDB.findAll({
    include: ["Movies1"],
  });
  // Escribe lo que esta en base de datos en la carpeta dbimages
  movies2.map((img) => {
    fs.writeFileSync(
      path.join(__dirname, "../dbimages/" + img.id_character + "imagen.png"),
      img.image_character
    );
  });
  const imagesDir = fs.readdirSync(path.join(__dirname, "../dbimages/"));

  // Armo lista de get, para que se pueda usar en la vista
  const info = movies2.map((movie) => {
    return {
      information: [
        {
          Image: `http://localhost:3090/${imagesDir.find((img) =>
            img.includes(movie.id_character)
          )}`,
          Name: movie.name_character,
        },
      ],
      details: [
        {
          Age: movie.age_character,
          Weight: movie.weight_character,
          History: movie.history_character,
          Peliculas_Series_Asociadas: movie.Movies1.map((pelicula) => {
            return {
              id: pelicula.id_ms,
              Title: pelicula.title_ms,
              Creation: pelicula.creation_date_ms,
            };
          }),
        },
      ],
    };
  });
  const { name, age, idMovies } = req.query;

  //hasta aca todo bien
  if (name != undefined) {
    const mapeo = info.filter((item) =>
      item.information[0].Name.split(" ")
        .join("")
        .toLowerCase()
        .includes(name.toLowerCase().split(" ").join(""))
    );
    res.json(mapeo);
  } else if (age != undefined) {
    const mapeo = info.filter((item) => item.details[0].Age == age);
    res.json(mapeo);
  } else if (idMovies != undefined) {
    const mapeo = info.filter((item) =>
      item.details[0].Peliculas_Series_Asociadas.some((el) => el.id == idMovies)
    );
    res.json(mapeo);
  } else {
    res.json(info);
  }
}

async function addCharacter(req, res) {
  // console.log(req.file);
  const data = fs.readFileSync(
    path.join(__dirname, "../images/", req.file.filename)
  );
  // console.log(data.filename);
  const { name_character, age_character, weight_character, history_character } =
    req.body;
  try {
    const product = await CharacterDB.create({
      name_character: name_character,
      age_character: age_character,
      weight_character: weight_character,
      history_character: history_character,
      image_character: data,
    });
    res.status(200).json("Added correctly");
  } catch (error) {
    console.log(error);
  }
}

async function editCharacter(req, res) {
  const { id } = req.params;
  const {
    name_character,
    edad_character,
    weight_character,
    history_character,
  } = req.body;
  try {
    const product = await CharacterDB.update(
      {
        name_character: name_character,
        edad_character: edad_character,
        weight_character: weight_character,
        history_character: history_character,
      },
      {
        where: {
          id_character: id,
        },
      }
    );
    res.status(200).json("Edited correctly");
  } catch (error) {
    console.log(error);
  }
}

async function deleteCharacter(req, res) {
  const { id } = req.params;
  try {
    const product = await CharacterDB.destroy({
      where: {
        id_character: id,
      },
    });
    res.status(200).json("Deleted correctly");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getCharacter,
  addCharacter,
  editCharacter,
  deleteCharacter,
  getCharacterQuery,
};
