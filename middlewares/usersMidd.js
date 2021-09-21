const { jwt, secretJwt } = require("../src/config/db.js");
const { users } = require("../src/models");
// function jwtMiddleware(req, res, next) {
//   const headerAuth = req.headers["authorization"];
//   if (!headerAuth) {
//     return res.status("401").json({ message: "Token is missing!" });
//   }
//   const [, token] = headerAuth.split(" ");
//   try {
//     const tokenDecoded = jwt.verify(token, secretJwt);
//     req.user = tokenDecoded.user;
//   } catch (error) {
//     let message;
//     switch (error.name) {
//       case "JsonWebTokenError":
//         message = "Error in the JWT";
//         break;
//       default:
//         message = "Error";
//         break;
//     }
//     return res.status(401).json({ message });
//   }
//   return next();
// };

function validateAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ Error: "Token Invalido" });
  } else {
    const verify = jwt.verify(token, secretJwt);
    console.log(verify);

    if (verify.user.rol.id == 3) {
      next();
    } else {
      res.status(401).json({ Error: "Token Invalido" });
    }
  }
}

function validateDataUser(req, res, next) {
  const { username, name, lastname, email, password, phone, adress } = req.body;

  if (
    !username ||
    !name ||
    !lastname ||
    !email ||
    !password ||
    !phone ||
    !adress
  ) {
    res.status(400).json({
      error: `Incomplete data, please try again`,
    });
  } else {
    next();
  }
}

function validateUserExist(req, res, next) {
  users.findByPk(req.params.id).then((user) => {
    if (user.id > 0) {
      res
        .status(400)
        .json({ error: `El usuario ${req.body.username} ya existe` });
    } else {
      next();
    }
  });
}

module.exports = { validateAdmin, validateDataUser, validateUserExist };
