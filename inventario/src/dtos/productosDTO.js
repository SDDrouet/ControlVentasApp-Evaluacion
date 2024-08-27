class ProductoDTO {
    constructor(idProducto, descripcion, precio, stock) {
        this.idProducto = idProducto;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }
}

module.exports = ProductoDTO;
