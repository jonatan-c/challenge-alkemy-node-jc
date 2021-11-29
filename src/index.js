const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
const port = 3090;
const path = require("path");
const db = require("./models/Relations");
app.use(express.static(path.join(__dirname, "dbimages")));

const charactersRoutes = require("./routes/character.routes");
const authRoutes = require("./routes/auth.routes");
const moviesRoutes = require("./routes/movies.routes");
const characterMovieRoutes = require("./routes/table.character.movies.routes");

db.sequelize.sync().then(() => {
  console.log("DB has been created successfully.");
});
//***********************SWAGGER**********************/
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Challenge Node Js",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.routes.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
//*****************************************************

//********************************ROUTES******************* */
app.use("/auth", authRoutes);
app.use("/characters", charactersRoutes);
app.use("/movies", moviesRoutes);
app.use("/character_movies", characterMovieRoutes);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
