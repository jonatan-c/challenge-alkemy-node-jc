const { Router } = require("express");
const router = Router();
// ******************** MULTER *************
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images/genres/input"),
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});
const upload = multer({ storage });

// const { auth } = require("../middlewares/auth.middlewares");
// const { isIdCharacterinDB } = require("../middlewares/characters.middlewares");
const { addGenre, getGenres } = require("../controllers/genres.controller");

router.get("/", getGenres);
// router.get("/:id", isIdCharacterinDB, getCharacter); // funciona, no midificar
router.post("/", upload.single("image_genre"), addGenre);
// router.put("/:id", isIdCharacterinDB, editCharacter);
// router.delete("/:id", isIdCharacterinDB, deleteCharacter);

module.exports = router;

/**
 * @swagger
 * /genres:
 *  post:
 *    tags:
 *      - Genre
 *    summary: Add a new genre
 *    description: Add a new genre
 *    parameters:
 *    - name : x-auth-token
 *      value : Authorization token
 *      required : true
 *      dataType : string
 *      in : header
 *    - name: name_genre
 *      description: name of the genre
 *      in: formData
 *      required: true
 *      type: string
 *    - name : image_genre
 *      description: image of the genre
 *      in: formData
 *      required: true
 *      type: file
 *    responses:
 *      200:
 *        description: Success
 */
