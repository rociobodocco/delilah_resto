const {
  validateAdmin,
  validateDataUser,
  validateUserExist,
} = require("../middlewares/usersMidd.js");
const { jwt, secretJwt } = require("../src/config/db.js");

module.exports = (app) => {
  // USERS ENDPOINTS

  //REGISTER:
  //valid data and exist
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

      const newUser = users.build({
        username,
        name,
        lastname,
        phone,
        adress,
        password,
        email,
        rol_id,
      });

      res.status(201).json(
        await newUser
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
          })
      );
    }
  );

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
      if (user) res.status(200).json(await users.findByPk(req.params.username));
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
};
