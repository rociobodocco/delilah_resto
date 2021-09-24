const express = require("express");
const expressJwt = require("express-jwt");
const { secretJwt } = require("./src/config/db.js");

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

const usersRoutes = require("./routes/usersRoutes.js");
const productsRoutes = require("./routes/productsRoutes.js");
const ordersRoutes = require("./routes/ordersRoutes.js");

usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

// PORT:
app.listen(APP_PORT, () => {
  console.info("Server run on port " + APP_PORT);
});
