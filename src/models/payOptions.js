const { DataTypes } = require ('sequelize');
const {seq} = require ('./../config/db');


const payOptions = seq.define('payoptions', {
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