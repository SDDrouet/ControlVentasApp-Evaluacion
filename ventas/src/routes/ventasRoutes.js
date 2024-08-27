const express = require('express');
const router = express.Router();
const VentasController = require('../controllers/ventasController');

router.get('/ventas', VentasController.getAllVentas);
router.get('/ventas/:id', VentasController.getVentaById);
router.post('/ventas', VentasController.createVenta);


module.exports = router;
