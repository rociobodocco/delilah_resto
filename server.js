const express = require("express");
const expressJwt = require("express-jwt");
const { secretJwt } = require("./config/db");

// PORT
const APP_PORT = process.env.APP_PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressJwt({
    secret: secretJwt,
    algorithms: ["HS256"],
  }).unless({
    path: [{ url: "/login", methods: ["POST"] }, { url: "/register", methods: ["POST"] }],
  })
);

const usersRoutes = require("./src/routes/usersRoutes");
const productsRoutes = require("./src/routes/productsRoutes");
const ordersRoutes = require("./src/routes/ordersRoutes");

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

// PORT:
app.listen(APP_PORT, () => {
  console.info("Server run on port " + APP_PORT);
});
