const { Sequelize } = require("sequelize");
const jwt = require("jsonwebtoken");

// RANDOM CRYPTO CODE:
const secretJwt = process.env.SECRET_TOKEN;

const { DB_USER, DB_PWD, DB_NAME, DB_PORT, DB_SERVER } = process.env;

const conString = `mysql://${DB_USER}${DB_PWD && `:${DB_PWD}`}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;

const seq = new Sequelize(conString);

seq
  .authenticate()
  .then(() => {
    console.log("All OK");
  })
  .catch((e) => {
    console.error(e.message);
  });

module.exports = {seq, jwt, secretJwt};
