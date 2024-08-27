//ventasDetalleDTO con idVentaDetalle, idVenta, idProducto, cantidad, precioTotal

class VentasDetalleDTO {
    constructor(idVentaDetalle, idVenta, idProducto, cantidad, precioTotal) {
        this.idVentaDetalle = idVentaDetalle;
        this.idVenta = idVenta;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioTotal = precioTotal;
    }
}

module.exports = VentasDetalleDTO;