const payOptions = require("./payOptions");
const orders = require("./orders");
const ordersHasProducts = require("./ordersHasProducts");
const products = require("./products");
const rol = require("./rol");
const users = require("./users");

users.belongsTo(rol, {
    foreignKey: 'rol_id'
});

users.hasMany(orders, {
    foreignKey: 'users_id'
});

orders.belongsTo(users, {
    foreignKey: 'users_id'
});

orders.belongsToMany(products, {
    through: ordersHasProducts
});

orders.belongsTo(payOptions, {
    foreignKey: 'payoptions_id'
});


module.exports = { users, products, rol, ordersHasProducts, orders, payOptions };

