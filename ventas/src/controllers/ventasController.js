const VentasService = require('../services/ventasService');
const VentaDTO = require('../dtos/ventasDTO');
const VentasDetalleDTO = require('../dtos/ventasDetalleDTO');
const apiValidation = require('../api/ventasValidator');

class VentasController {

    // obtener todas las ventas
    async getAllVentas(req, res) {
        try {
            const ventas = await VentasService.getAllVentas();
            
            //agregar cliente a las ventas
            for (let i = 0; i < ventas.length; i++) {
                ventas[i].dataValues.cliente = await apiValidation.getCliente(ventas[i].dataValues.idCliente);
            }

            res.json(ventas);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // obtener una venta por id y su detalle de venta
    async getVentaById(req, res) {
        try {
            const idVenta = req.params.id;
            const venta = await VentasService.getVentaById(idVenta);

            //agregar cliente a la venta
            venta.dataValues.cliente = await apiValidation.getCliente(venta.dataValues.idCliente);
            const ventaDetalle = await VentasService.getVentasDetalleByIdVenta(idVenta);

            //agregar producto a los detalles de venta
            for (let i = 0; i < ventaDetalle.length; i++) {
                ventaDetalle[i].dataValues.producto = await apiValidation.getProducto(ventaDetalle[i].dataValues.idProducto);
            }

            res.json({ venta, ventaDetalle });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //createVentaConDetalles

    async createVenta(req, res) {
        try {
            const { idCliente, detalleVenta } = req.body;

            if (!(await apiValidation.getCliente(idCliente))) {
                return res.status(400).json({ message: 'Cliente no encontrado' });
            }

            //validar productos
            const detalleVentaValidado = await apiValidation.validarProductos(detalleVenta);

            if (!detalleVentaValidado) {
                return res.status(400).json({ message: 'Producto no encontrado o sin stock' });
            }

            const ventaDTO = new VentaDTO(null, idCliente);

            const detallesDTOArray = detalleVentaValidado.map(detalle => {
                return new VentasDetalleDTO(
                    null,
                    null,
                    detalle.idProducto,
                    detalle.cantidad,
                    detalle.precioTotal
                );
            });
            
            const ventaCreada = await VentasService.createVentaConDetalles(ventaDTO, detallesDTOArray);

            //actualizar stock
            apiValidation.actualizarStock(detalleVentaValidado);

            res.status(201).json(ventaCreada);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new VentasController();
