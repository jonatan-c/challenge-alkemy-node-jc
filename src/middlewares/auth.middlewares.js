const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // Leer el token del header
  const token = req.header("x-auth-token");

  //Revisar si no hay token
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida" });
      } else {
        req.decoded = decoded;
        console.log(req.decoded);
        next();
      }
    });
  } else {
    res.send({
      mensaje: "Token no proveída.",
    });
  }
};

module.exports = { auth };

// const isUserToken = (req, res, next) => {
//   const token = req.header("x-auth-token");

//   if (token) {
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//       if (err) {
//         return res.json({ mensaje: "Token inválida" });
//       } else {
//         req.decoded = decoded;
//         if (req.decoded.id_user == parseInt(req.body.id_user)) {
//           next();
//         } else {
//           return res.json({ mensaje: "You are not the user login" });
//         }
//       }
//     });
//   } else {
//     res.send({
//       mensaje: "Token no proveída.",
//     });
//   }
// };
