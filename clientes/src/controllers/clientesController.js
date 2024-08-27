const ClientesService = require('../services/clientesService');
const ClienteDTO = require('../dtos/clientesDTO');

class ClientesController {
    async getAllClientes(req, res) {
        try {
            const clientes = await ClientesService.getAllClientes();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getClienteById(req, res) {
        try {
            const idCliente = req.params.id;
            const cliente = await ClientesService.getClienteById(idCliente);
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async createCliente(req, res) {
        try {
            const { tipo, nombre, apellido, telefono, direccion } = req.body;
            const clienteDTO = new ClienteDTO(null, tipo, nombre, apellido, telefono, direccion);
            const newCliente = await ClientesService.createCliente(clienteDTO);
            res.status(201).json(newCliente);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }


    // Otros métodos como actualizar y eliminar
    async updateCliente(req, res) {
        try {
            const idCliente = req.params.id;
            const { tipo, nombre, apellido, telefono, direccion } = req.body;
            const clienteDTO = new ClienteDTO(idCliente, tipo, nombre, apellido, telefono, direccion);
            const updatedCliente = await ClientesService.updateCliente(clienteDTO);
            res.json({ message: 'Cliente actualizado correctamente', count: updatedCliente });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteCliente(req, res) {
        try {
            const idCliente = req.params.id;
            const deletedCliente = await ClientesService.deleteCliente(idCliente);
            res.json({ message: 'Cliente eliminado correctamente', count: deletedCliente });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = new ClientesController();
