import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ventasApi } from '../../services/api';
import Modal from '../Modal';
import { BiShow } from "react-icons/bi";
import FacturaVenta from './FacturaVenta';


const VentasList = () => {
    const [ventas, setVentas] = useState([]);
    const [selectedVenta, setSelectedVenta] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
        try {
            const response = await ventasApi.getAll();
            setVentas(response.data);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };

    const getOneVenta = async (idVenta) => {
        try {
            const response = await ventasApi.getOne(idVenta);
            return response.data;
        } catch (error) {
            console.error('Error fetching venta:', error);
        }
    };

    const handleView = async (venta) => {
        const ventaDetallada = await getOneVenta(venta.idVenta);
        setSelectedVenta(ventaDetallada);
        setIsModalOpen(true);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="container mx-auto px-8 select-none">
            <h1 className="text-2xl font-bold mb-4 select-text">Lista de Ventas</h1>
            <div className="overflow-x-auto h-[75lvh] overflow-y-auto rounded-lg">
                <table className="min-w-full bg-white select-text">
                    <thead className='sticky top-0 z-20'>
                        <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID Venta</th>
                            <th className="py-3 px-6 text-left">ID Cliente</th>
                            <th className="py-3 px-6 text-left">Nombre Cliente</th>
                            <th className="py-3 px-6 text-left">Fecha de Venta</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light rounded-md">
                        {ventas.map(venta => (
                            <motion.tr
                                key={venta.idVenta}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={"border-b border-gray-200 hover:bg-gray-200 rounded-md" + (venta.idVenta % 2 === 0 ? ' bg-gray-100' : '')}
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">{venta.idVenta}</td>
                                <td className="py-3 px-6 text-left">{venta.idCliente}</td>
                                <td className="py-3 px-6 text-left">{venta.cliente.nombre} {venta.cliente.apellido}</td>
                                <td className="py-3 px-6 text-left">{formatDate(venta.createdAt)}</td>
                                <td className="py-3 px-6 text-center">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="transform text-blue-500 hover:text-blue-700 text-lg"
                                        onClick={() => handleView(venta)}
                                    >
                                        <BiShow />
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedVenta && (
                    <div className='flex flex-col gap-4'>
                        <h2 className="text-2xl font-bold">Detalle de Venta</h2>
                        
                        <div className='max-h-[70lvh] overflow-y-auto overflow-x-hidden'>
                            <FacturaVenta venta={selectedVenta.venta} ventaDetalle={selectedVenta.ventaDetalle} />
                        </div>

                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default VentasList;
