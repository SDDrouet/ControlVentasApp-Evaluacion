const Ventas = require('../models/ventas');
const VentasDetalle = require('../models/ventasDetalle');
const sequelize = require('../config/database');

class VentasService {
    async getAllVentas() {
        return (await Ventas.findAll({
            order: [["idVenta", "DESC"]],
        }));
    }

    async getVentaById(idVenta) {
        return await Ventas.findByPk(idVenta);
    }

    async createVenta(ventaDTO, options) {
        return await Ventas.create(ventaDTO, options);
    }

    async getVentasDetalleByIdVenta(idVenta) {
        return await VentasDetalle.findAll({
            where: {
                idVenta: idVenta,
            },
        });
    }

    //Insertando varios ventasDetalle
    async createVentasDetalles(ventasDetalleDTOArray, options) {
        return await VentasDetalle.bulkCreate(ventasDetalleDTOArray, options);
    }


    async createVentaConDetalles(ventaDTO, detallesDTOArray) {
        const t = await sequelize.transaction(); // Iniciar una transacción
        try {

            // 1. Crear la venta
            const ventaCreada = await this.createVenta(ventaDTO, { transaction: t });

            // 2. Crear los detalles de la venta
            //añadimos el idVenta a cada detalle
            detallesDTOArray.forEach(detalle => {
                detalle.idVenta = ventaCreada.idVenta;
            });

            await this.createVentasDetalles(detallesDTOArray, { transaction: t });

            // 3. Confirmar la transacción
            await t.commit();

            return ventaCreada;
        } catch (error) {
            // Revertir la transacción si algo falla
            await t.rollback();
            throw error;
        }
    }

}

module.exports = new VentasService();
