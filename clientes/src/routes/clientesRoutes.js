const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/clientesController');

router.get('/clientes', ClientesController.getAllClientes);
router.get('/clientes/:id', ClientesController.getClienteById);
router.post('/clientes', ClientesController.createCliente);
router.put('/clientes/:id', ClientesController.updateCliente);
router.delete('/clientes/:id', ClientesController.deleteCliente);

module.exports = router;
