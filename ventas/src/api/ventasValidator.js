const axios = require('axios');
require('dotenv').config();

class VentasValidator {

    async getCliente(idCliente) {

        const response = await axios.get(`http://${process.env.API_CLIENTES_HOST}:3002/api/clientes/${idCliente}`);
        if (!response.data) {
            return null;
        }

        return response.data; // Devuelve la información del cliente

    }

    async getProducto(idProducto) {
        try {
            const response = await axios.get(`http://${process.env.API_INVENTARIO_HOST}:3001/api/inventario/${idProducto}`);
            if (!response.data) {
                throw new Error('Producto con id: ' + idProducto +' no encontrado');
            }
            return response.data; // Devuelve la información del producto
        } catch (error) {
            console.error('Error el Producto no fue encontrado: ', error.message);
            throw error;
        }
    }

    // actualizarStock
    async actualizarStock(detalleVenta) {
        try {
            for (let detalle of detalleVenta) {
                const producto = await this.getProducto(detalle.idProducto);

                if (!producto) {
                    throw new Error('Producto no encontrado');
                }

                producto.stock -= detalle.cantidad;

                await axios.put(`http://${process.env.API_INVENTARIO_HOST}:3001/api/inventario/${producto.idProducto}`, producto);
            }
        } catch (error) {
            console.error('Error al actualizar el stock:', error.message);
            throw error;
        }
    }

    async validateStock(producto, cantidad) {
        try {
            
            if (cantidad <= 0) return false; // Cantidad no válida

            if (producto.stock < cantidad) {
                console.log('No hay suficiente stock');
                return false; // No hay suficiente stock
            }
            return true; // Validación exitosa
        } catch (error) {
            console.error('Error al validar el stock:', error.message);
            throw error;
        }
    }

    async getPrecioTotalProducto(idProducto, cantidad) {
        try {
            const producto = await this.getProducto(idProducto);

            const precioTotalProducto = producto.precio * cantidad;

            return precioTotalProducto;

        } catch (error) {
            console.error('Error al obtener el precio total:', error.message);
            throw error;
        }
    }

    async getPrecioTotalVenta(detalleVenta) {
        try {
            let precioTotalVenta = 0;

            for (let detalle of detalleVenta) {
                const precioTotalProducto = await this.getPrecioTotalProducto(detalle.idProducto, detalle.cantidad);
                if (precioTotalProducto) {
                    precioTotalVenta += precioTotalProducto;
                } else {
                    return null;
                }
            }

            return precioTotalVenta;
        } catch (error) {
            console.error('Error al obtener el precio total de la venta:', error.message);
            throw error;
        }
    }

    // validarProductos
    async validarProductos(detalleVenta) {
        try {
            for (let detalle of detalleVenta) {
                const producto = await this.getProducto(detalle.idProducto);

                if (!producto) {
                    throw new Error('Producto no encontrado');
                }

                if (await this.validateStock(producto, detalle.cantidad)) {
                    detalle.precioTotal = producto.precio * detalle.cantidad;
                } else {
                    return null;
                }
            }

            return detalleVenta;
        } catch (error) {
            console.error('Error al validar los productos:', error.message);
            throw error;
        }
    }

    
    

}

module.exports = new VentasValidator();
