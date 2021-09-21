const { DataTypes } = require ('sequelize');
const {seq} = require ('./../config/db');


const orders = seq.define('orders', {
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    state: {
        type: DataTypes.ENUM(['nuevo', 'confirmado','finalizado', 'cancelado']),
        allowNull:false
    },
    date: {
        type: DataTypes.DATE,
        allowNull:true
    }
}, {
    timestamps: false,
    underscored: true
  });



module.exports = orders;