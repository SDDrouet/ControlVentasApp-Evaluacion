const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

//ventas deto con idVenta, idCliente, fecha

const Ventas = sequelize.define('Ventas', {
    idVenta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idCliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Ventas;
