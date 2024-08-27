class ClienteDTO {
    constructor(idCliente, tipo, nombre, apellido, telefono, direccion) {
        this.idCliente = idCliente;
        this.tipo = tipo;
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.direccion = direccion;
    }
}

module.exports = ClienteDTO;
