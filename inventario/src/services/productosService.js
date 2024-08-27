const Producto = require('../models/productos');

class ProductosService {
    async getAllProducts() {
        return (await Producto.findAll({
            order: [["idProducto", "ASC"]],
          }));
    }

    async getProductById(idProducto) {
        return await Producto.findByPk(idProducto);
    }

    async createProduct(productoDTO) {
        return await Producto.create(productoDTO);
    }

    // Otros métodos como actualizar y eliminar
    async updateProduct(productoDTO) {
        return await Producto.update(productoDTO, {
            where: {
                idProducto: productoDTO.idProducto,
            },
        });
    }

    async deleteProduct(idProducto) {
        return await Producto.destroy({
            where: {
                idProducto: idProducto,
            },
        });
    }
}

module.exports = new ProductosService();
