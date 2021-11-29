require("dotenv").config();
const usersDB = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function registerUser(req, res) {
  const resp = req.body.password1;
  const msg = {
    to: req.body.email,
    from: "jona.cc.93@gmail.com", // Use the email address or domain you verified above
    subject: "Bienvenido a la API de Disney",
    text: `Hola ${req.body.name} , gracias por registrarte, disfruta de nuestro contenido!`,
  };

  const salt = await bcryptjs.genSalt(10);
  const respHash = await bcryptjs.hash(resp, salt);
  const newUser = await usersDB.create({
    name: req.body.name,
    email: req.body.email,
    password1: respHash,
    role_user: "user",
    status_user: "offline",
  });

  sgMail.send(msg, function (error, info) {
    if (error) {
      console.log("Email not sent");
    } else {
      console.log("Email sent success");
    }
  });
}

async function loginUser(req, res) {
  const { email, password1 } = req.body;

  try {
    // check password
    let usuario = await usersDB.findOne({
      where: { email: email },
    });
    const passCorrect = await bcryptjs.compare(password1, usuario.password1);
    if (!passCorrect) {
      return res.status(400).json({
        message: "Password incorrect",
      });
    }

    // generate token
    const payload = {
      id_user: usuario.id_user,
      role: usuario.role_user,
    };

    usuario = await usersDB.update(
      {
        status_user: "online",
      },
      {
        where: { email: email },
      }
    );
    console.log(payload);

    //Crear y firmar JWT
    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
}
module.exports = { registerUser, loginUser };
