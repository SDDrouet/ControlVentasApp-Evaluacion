const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

////ventasDetalle con idVentaDetalle, idVenta, idProducto, cantidad, precioTotal

const VentasDetalle = sequelize.define('VentasDetalle', {
    idVentaDetalle: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idVenta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idProducto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precioTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
});

module.exports = VentasDetalle;
