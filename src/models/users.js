const { DataTypes } = require ('sequelize');
const {seq} = require ('./../config/db');

const users = seq.define('users', {
    username: {
        type: DataTypes.STRING,
        allowNull:false
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull:false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull:false
    },
    adress: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    timestamps: false
  });

module.exports = users;