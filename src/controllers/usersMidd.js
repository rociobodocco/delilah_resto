const { jwt, secretJwt } = require("../../config/db");
const { users } = require("../models");

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
      res.status(401).json({ Error: "Token Invalido para esta consulta" });
    }
  }
};

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
};

function validateUserExist(req, res, next) {
  users.findByPk(req.params.email).then((user) => {
    if (user) {
      res
        .status(400)
        .json({ error: `El usuario ${req.body.username} ya existe` });
    } else {
      next();
    }
  });
};

module.exports = { validateAdmin, validateDataUser, validateUserExist };
