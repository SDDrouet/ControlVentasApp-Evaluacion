const Clientes = require('../models/clientes');

class ClientesService {
    async getAllClientes() {
        return (await Clientes.findAll({
            order: [["idCliente", "ASC"]],
          }));
    }

    async getClienteById(idCliente) {
        return await Clientes.findByPk(idCliente);
    }

    async createCliente(clienteDTO) {
        return await Clientes.create(clienteDTO);
    }

    async updateCliente(clienteDTO) {
        return await Clientes.update(clienteDTO, {
            where: {
                idCliente: clienteDTO.idCliente,
            },
        });
    }

    async deleteCliente(idCliente) {
        return await Clientes.destroy({
            where: {
                idCliente: idCliente,
            },
        });
    }

}

module.exports = new ClientesService();
