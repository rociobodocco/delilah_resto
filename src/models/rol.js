const { DataTypes } = require ('sequelize');
const {seq} = require ('./../config/db');


const rol = seq.define('rol', {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName:'rol',
    timestamps: false
  });


module.exports = rol;