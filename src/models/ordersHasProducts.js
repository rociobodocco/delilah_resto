const { DataTypes } = require ('sequelize');
const sequelize = require ('./../config/db');
const orders = require('./orders');
const products = require('./products');

const ordersHasProducts = sequelize.define('orders_has_products', {
    quantity: { 
        type: DataTypes.INTEGER,
        allowNull:false
    },
    orders_id: {
        field: 'orders_id',
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:orders,
            key:'id',
        }
    },
    products_id: {
        field: 'products_id',
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
            model:products,
            key:'id'
        }
    }
}, {
    timestamps: false,
    underscored: true
  });


module.exports = ordersHasProducts;