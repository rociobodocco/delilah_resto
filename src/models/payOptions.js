const { DataTypes } = require ('sequelize');
const sequelize = require ('./../config/db');


const payOptions = sequelize.define('payoptions', {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    active: {
        type: DataTypes.TINYINT,
        allowNull:false
    },
}, {
    timestamps: false
  });


module.exports = payOptions;