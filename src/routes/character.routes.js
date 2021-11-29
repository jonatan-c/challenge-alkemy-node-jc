const { Router } = require("express");
const router = Router();
// ******************** MULTER *************
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

const { auth } = require("../middlewares/auth.middlewares");
// isUserToken
const {
  getCharacter,
  addCharacter,
  editCharacter,
  deleteCharacter,
  getCharacterQuery,
} = require("../controllers/characters.controller");

router.get("/", getCharacterQuery);
router.get("/:id", getCharacter); // funciona, no midificar
router.post("/", upload.single("image_character"), addCharacter);
router.put("/:id", auth, editCharacter);
router.delete("/:id", auth, deleteCharacter);
module.exports = router;

/**
 * @swagger
 * /characters:
 *  get:
 *    tags:
 *      - Characters
 *    summary: Get all characters
 *    description: Get all characters
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - in: query
 *      name: name
 *      description: name of the character
 *      required: false
 *      schema:
 *        type: string
 *    - in: query
 *      name: age
 *      description: age of the character
 *      required: false
 *      schema:
 *        type: integer
 *    - in: query
 *      name: idMovies
 *      description: id of the movies
 *      required: false
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /characters/{id}:
 *  get:
 *    tags:
 *      - Characters
 *    summary: Get a character by id
 *    description: Get a character by id
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: id
 *      description: id of the character
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /characters:
 *  post:
 *    tags:
 *      - Characters
 *    summary: Add a character
 *    description: Add a character
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: name_character
 *      description: name of the character
 *      in: formData
 *      required: true
 *      type: string
 *    - name : age_character
 *      description: age of the character
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : weight_character
 *      description: weight of the character
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : history_character
 *      description: history of the character
 *      in: formData
 *      required: true
 *      type: string
 *    - name : image_character
 *      description: image of the character
 *      in: formData
 *      required: true
 *      type: file
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /characters/{id}:
 *  put:
 *    tags:
 *      - Characters
 *    summary: Edit a character by id
 *    description: Edit a character by id
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: id
 *      description: id of the character
 *      in: path
 *      required: true
 *      type: integer
 *    - name: name_character
 *      description: name of the character
 *      in: formData
 *      required: true
 *      type: string
 *    - name : age_character
 *      description: age of the character
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : weight_character
 *      description: weight of the character
 *      in: formData
 *      required: true
 *      type: integer
 *    - name : history_character
 *      description: history of the character
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */

/**
 * @swagger
 * /characters/{id}:
 *  delete:
 *    tags:
 *      - Characters
 *    summary: Delete a character by id
 *    description:  Delete a character by id
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: id
 *      description: id of the character
 *      in: path
 *      required: true
 *      type: integer
 *    responses:
 *      200:
 *        description: Success
 */
