const ProductosService = require('../services/productosService');
const ProductoDTO = require('../dtos/productosDTO');

class ProductosController {
    async getAllProducts(req, res) {

        try {
            const productos = await ProductosService.getAllProducts();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const idProducto = req.params.id;
            const producto = await ProductosService.getProductById(idProducto);
            res.json(producto);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            const { descripcion, precio, stock } = req.body;
            const productoDTO = new ProductoDTO(null, descripcion, precio, stock);
            const newProduct = await ProductosService.createProduct(productoDTO);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    // Otros métodos como actualizar y eliminar
    async updateProduct(req, res) {
        try {
            const idProducto = req.params.id;
            const { descripcion, precio, stock} = req.body;
            const productoDTO = new ProductoDTO(idProducto, descripcion, precio, stock);
            const updatedProduct = await ProductosService.updateProduct(productoDTO);
            res.json({message: 'Producto actualizado correctamente', count: updatedProduct});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const idProducto = req.params.id;
            const deletedProduct = await ProductosService.deleteProduct(idProducto);
            res.json({ message: 'Producto eliminado correctamente', count: deletedProduct });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new ProductosController();
