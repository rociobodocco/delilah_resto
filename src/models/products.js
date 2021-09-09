const { DataTypes } = require ('sequelize');
const sequelize = require ('./../config/db');


const products = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull:false
    },
    image: {
        type: DataTypes.STRING,
        allowNull:true
    },
}, {
    timestamps: false
  });

module.exports = products;