const express = require('express');
const router = express.Router();
const ProductosController = require('../controllers/productosController');

router.get('/inventario', ProductosController.getAllProducts);
router.get('/inventario/:id', ProductosController.getProductById);
router.post('/inventario', ProductosController.createProduct);
router.put('/inventario/:id', ProductosController.updateProduct);
router.delete('/inventario/:id', ProductosController.deleteProduct);

module.exports = router;
