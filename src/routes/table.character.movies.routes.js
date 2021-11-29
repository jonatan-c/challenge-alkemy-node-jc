const { Router } = require("express");
const router = Router();

const {
  addCharacterMovie,
} = require("../controllers/table.characters.movies.controller");

router.post("/", addCharacterMovie);

module.exports = router;

/**
 * @swagger
 * /character_movies:
 *  post:
 *    tags:
 *      - Asociated Table - Character - Movie
 *    summary: Add a new character movie
 *    description: Add a new character movie
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name : id_character
 *      description: Id of the character
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : id_ms
 *      description: Id of the movie
 *      in: formData
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
