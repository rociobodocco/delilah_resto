const {
  validateAdmin,
  validateDataUser,
  validateUserExist,
} = require("../middlewares/usersMidd.js");
const { jwt, secretJwt } = require("../src/config/db.js");
const { users, rol } = require("../src/models");
// const bcrypt = require('bcrypt');

module.exports = (app) => {
  // USERS ENDPOINTS

  //REGISTER:
  app.post(
    "/register",
    validateDataUser,
    validateUserExist,
    async (req, res) => {
      const {
        username,
        name,
        lastname,
        phone,
        adress,
        password,
        email,
        rol_id,
      } = req.body;

      const newUser = await users.create({
        username: username,
        name: name,
        lastname: lastname,
        phone: phone,
        adress: adress,
        password: password,
        email: email,
        rol_id: rol_id,
      });

      newUser
        .save()
        .then((user) => {
          let token = jwt.sign({ user: user }, secretJwt, {
            expiresIn: "60m",
          });
          res.json({
            user: user,
            token: token,
          });
        })
        .catch((e) => {
          res.status(500).json(e);
        });
    }
  ); //ok 

  // LOGUIN:
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({
      attributes: ["id", "email", "name"],
      where: {
        username,
        password,
      },
      include: [{ model: rol }],
    });

    if (!user) {
      return res.status(401).json({
        status: 401,
        error: "usuario y/o contraña incorrecto",
      });
    }
    const token = jwt.sign(
      {
        user,
      },
      secretJwt,
      { expiresIn: "60m" }
    );

    return res.json({ token });
  }); //ok

  app.get("/users", validateAdmin, async (req, res) => {
    try {
      const usersData = await users.findAll({
        attributes: {
          exclude: ["rol_id"],
        },
        include: ["rol"],
      });
      return res.json({
        status: 200,
        data: usersData,
      });
    } catch (error) {
      return next({ message: "Internal server error" });
    }
  }); //ok

  app.get("/users/:id", validateAdmin, async (req, res) => {
    try {
      if (users) res.status(200).json(await users.findByPk(req.params.id));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}; //ok
