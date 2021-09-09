const { DataTypes } = require ('sequelize');
const sequelize = require ('../config/db');


const orders = sequelize.define('orders', {
    total_price: {
        type: DataTypes.DECIMAL,
        allowNull:false
    },
    state: {
        type: DataTypes.ENUM(['nuevo', 'confirmado','finalizado']),
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