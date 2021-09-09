const express = require("express");
const app = express();
const { orders, products, users, rol } = require("./src/models");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

// RANDOM CRYPTO CODE:
const secretJwt = "reofw97430294mf38409ofmvojrn09291340r19i2nefu";

// PORT
const APP_PORT = process.env.APP_PORT || 5000;

app.use(express.json());

app.use(
  expressJwt({
    secret: secretJwt,
    algorithms: ["HS256"],
  }).unless({ path: ["/login"] })
);

// MIDDLEWARES:
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
  if (req.usersData.username.rol.name == "admin") {
    next();
  } else {
    res.status(401).json({ error: "usuario no es admin" });
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

  if (user == null) {
    res.status(401).json({ error: "username o contrasena incorrecta" });
  } else {
    const token = jwt.sign(
      {
        user,
      },
      secretJwt,
      { expiresIn: "60m" }
    );
    res.json(token);
  }
});

app.post("/register", validateUserExist, async (req, res) => {
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
    res.status(400).json({ error: e.message });
  }
});

// PRODUCTS:
app.get("/products", async (req, res) => {
  res.status(200).json(
    await products.findAll({
      where: {
        active: true,
      },
    })
  );
});

app.get("/products/:id", async (req, res) => {
  res.status(200).json(await products.findByPk(req.params.id));
});

app.post("/products", validateProductExist, validateAdmin, async (req, res) => {
  const { name, price, active, image } = req.body;

  const newProduct = products.build({ name, price, active, image });

  try {
    res.status(201).json(await newProduct.save());
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.put(
  "/products/:id",
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

// ORDERS:
app.get("/orders", validateAdmin, async (req, res) => {
  res.status(200).json(
    await orders.findAll({
      include: [{ model: products }, { model: users }],
    })
  );
});

app.get("/orders/:id", async (req, res) => {
  res.status(200).json(
    await orders.findByPk(req.params.id, {
      include: [{ model: products }, { model: users }],
    })
  );
});

app.post("/orders", validateProductExist, async (req, res) => {
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

app.put("/orders/:id", validateAdmin, async (req, res) => {
  try {
    res.status(200).json(await req.ordersData.update(req.body));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.delete("/orders/:id", validateAdmin, async (req, res) => {
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
