import React from 'react';
import { motion } from 'framer-motion';

const FacturaVenta = ({ venta, ventaDetalle }) => {
  const calcularSubtotal = () => {
    return ventaDetalle.reduce((acc, item) => acc + parseFloat(item.precioTotal), 0);
  };

  const subtotal = calcularSubtotal();
  const iva = subtotal * 0.15;
  const total = subtotal + iva;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
};

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 border-b pb-2">
        <h2 className="text-2xl font-semibold mb-2 text-center">Factura de Venta</h2>
        <div className="text-gray-700 grid grid-cols-2">
          <p><strong>ID de Venta:</strong> {venta.idVenta}</p>
          <p><strong>Fecha:</strong> {formatDate(venta.createdAt)}</p>
        </div>
      </div>

      <div className="mb-4 border-b pb-2">
        <h3 className="text-xl font-semibold mb-2">Información del Cliente</h3>
        <div className="text-gray-700 grid-cols-2 grid">
          <p><strong>ID Cliente:</strong> {venta.cliente.idCliente}</p>
          <p><strong>Nombre:</strong> {venta.cliente.nombre} {venta.cliente.apellido}</p>
          <p><strong>Tipo de Cliente:</strong> {venta.cliente.tipo}</p>
          <p><strong>Teléfono:</strong> {venta.cliente.telefono}</p>
          <p><strong>Dirección:</strong> {venta.cliente.direccion}</p>
        </div>
      </div>

      <div className="mb-4 border-b pb-2">
        <h3 className="text-xl font-semibold mb-2">Detalles de los Productos</h3>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID Producto</th>
              <th className="py-3 px-6 text-left">Descripción</th>
              <th className="py-3 px-6 text-left">Precio Unitario</th>
              <th className="py-3 px-6 text-left">Cantidad</th>
              <th className="py-3 px-6 text-left">Total</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {ventaDetalle.map(item => (
              <tr key={item.idVentaDetalle} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{item.producto.idProducto}</td>
                <td className="py-3 px-6 text-left">{item.producto.descripcion}</td>
                <td className="py-3 px-6 text-left">${item.producto.precio.toFixed(2)}</td>
                <td className="py-3 px-6 text-left">{item.cantidad}</td>
                <td className="py-3 px-6 text-left">${parseFloat(item.precioTotal).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right mt-6">
        <p className="text-gray-700"><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
        <p className="text-gray-700"><strong>IVA (15%):</strong> ${iva.toFixed(2)}</p>
        <p className="text-gray-700"><strong>Total:</strong> ${total.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default FacturaVenta;
