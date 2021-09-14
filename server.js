const express = require("express");
const { orders, products, users, rol } = require("./src/models");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

// RANDOM CRYPTO CODE:
const secretJwt = process.env.SECRET_TOKEN;

// PORT
const APP_PORT = process.env.APP_PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressJwt({
    secret: secretJwt,
    algorithms: ["HS256"],
  }).unless({ path: ["/login"] })
);

// MIDDLEWARES:
function jwtMiddleware(req, res, next) {
  const headerAuth = req.headers["authorization"];
  if (!headerAuth) {
    return res.status("401").json({ message: "Token is missing!" });
  }
  const [, token] = headerAuth.split(" ");
  try {
    const tokenDecoded = jwt.verify(token, secretJwt);
    req.user = tokenDecoded.user;
  } catch (error) {
    let message;
    switch (error.name) {
      case "JsonWebTokenError":
        message = "Error in the JWT";
        break;
      default:
        message = "Error";
        break;
    }
    return res.status(401).json({ message });
  }
  return next();
}

function validateProductExist(req, res, next) {
  products
    .findByPk(req.params.id)
    .then((prod) => {
      if (prod != null) {
        req.productsData = prod;
        next();
      } else {
        res.status(400).json({ error: `id= ${req.params.id} no existe` });
      }
    })
    .catch((e) => {
      res.status(400).json({ error: e.message });
    });
}

function validateAdmin(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ Error: "Token Invalido" });
  } else {
    const verify = jwt.verify(token, secretJwt);
    console.log(verify)

    if (verify.user.rol.id == 3) {
      next();
    } else {
      res.status(401).json({ Error: "Token Invalido" });
    }
  }
}

function validateUserExist(req, res, next) {
  users
    .findByPk(req.params.email)
    .then((user) => {
      if (req.usersData.email == user.email) {
        res
          .status(400)
          .json({ error: `El email: ${req.params.email} ya existe` });
      }
      next();
    })
    .catch((e) => {
      res.status(400).json({ error: e.message });
    });
}

// ENDPOINTS:

//USERS:
//REGISTER:
app.post("/register", jwtMiddleware, validateUserExist, async (req, res) => {
  const { username, name, lastname, phone, adress, password, email } = req.body;

  const newUser = users.build({
    username,
    name,
    lastname,
    phone,
    adress,
    password,
    email,
  });

  try {
    res.status(201).json(await newUser.save());
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});

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
});

app.get("/users/:id", jwtMiddleware, validateAdmin, async (req, res) => {
  try {
    if (user) res.status(200).json(await users.findByPk(req.params.username));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ----------
// PRODUCTS:
app.get("/products", jwtMiddleware, async (req, res) => {
  try {
    res.status(200).json(
      await products.findAll({
        where: {
          active: true,
        },
      })
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}); //ok

app.get("/products/:id", async (req, res) => {
  try {
    res.status(200).json(await products.findByPk(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}); //ok

app.post(
  "/products",
  jwtMiddleware,
  validateProductExist,
  validateAdmin,
  async (req, res) => {
    const { name, price, active, image } = req.body;

    const newProduct = products.build({ name, price, active, image });

    try {
      res.status(201).json(await newProduct.save());
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

app.put(
  "/products/:id",
  jwtMiddleware,
  validateProductExist,
  validateAdmin,
  async (req, res) => {
    try {
      res.status(200).json(await req.productsData.update(req.body));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

app.delete(
  "/products/:id",
  jwtMiddleware,
  validateProductExist,
  validateAdmin,
  async (req, res) => {
    try {
      res.status(200).json(await req.productsData.update({ active: false }));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
);

// ----------
// ORDERS:
app.get("/orders", jwtMiddleware, validateAdmin, async (req, res) => {
  try {
    res.status(200).json(
      await orders.findAll({
        include: [{ model: products }, { model: users }],
      })
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get("/orders/:id", jwtMiddleware, async (req, res) => {
  try {
    res.status(200).json(
      await orders.findByPk(req.params.id, {
        include: [{ model: products }, { model: users }],
      })
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/orders", jwtMiddleware, validateProductExist, async (req, res) => {
  const { total_price, date, state, payoptions_id, users_id } = req.body;

  const newOrder = orders.build({
    total_price,
    date,
    state,
    payoptions_id,
    users_id,
  });

  try {
    res.status(201).json(await newOrder.save());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put("/orders/:id", jwtMiddleware, validateAdmin, async (req, res) => {
  try {
    res.status(200).json(await req.ordersData.update(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/orders/:id", jwtMiddleware, validateAdmin, async (req, res) => {
  try {
    res.status(200).json(await req.ordersData.update({ state: "cancelado" }));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PORT:
app.listen(APP_PORT, () => {
  console.info("server run on port " + APP_PORT);
});
