const { Router } = require("express");
const router = Router();

const { registerUser, loginUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;

/**
 * @swagger
 * /auth/register:
 *  post:
 *    tags:
 *      - Register
 *    summary: You can register a new user
 *    description: You can register a new user
 *    parameters:
 *    - name: name
 *      description: Name of the user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password1
 *      description: password of the user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: email of the user
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                name:
 *                  type: string
 *      400:
 *        description: The specified user ID is invalid (e.g. not a number)
 *      404:
 *        description: A user with the specified ID was not found
 *
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags:
 *      - Login - Auth
 *    summary: You can login a user
 *    description: You can login a user
 *    parameters:
 *    - name: email
 *      value : correo@correo.com
 *      description:  Email of the user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password1
 *      value : correo
 *      description: password of the user
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      200:
 *        description: Success
 */
