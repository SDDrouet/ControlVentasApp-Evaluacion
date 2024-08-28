import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { clientesApi } from '../../services/api';
import Modal from '../Modal';
import ClienteForm from './ClienteForm';

const ClienteList = () => {
    const [clientes, setClientes] = useState([]);
    const [editingCliente, setEditingCliente] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [clienteToDelete, setClienteToDelete] = useState(null);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        try {
            const response = await clientesApi.getAll();
            setClientes(response.data);
        } catch (error) {
            console.error('Error fetching clientes:', error);
        }
    };

    const handleEdit = (cliente) => {
        setEditingCliente(cliente);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (updatedCliente) => {
        try {
            await clientesApi.update(updatedCliente.idCliente, updatedCliente);
            setIsEditModalOpen(false);
            fetchClientes();
        } catch (error) {
            console.error('Error updating cliente:', error);
        }
    };

    const handleDeleteConfirmation = (cliente) => {
        setClienteToDelete(cliente);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (clienteToDelete) {
            try {
                await clientesApi.delete(clienteToDelete.idCliente);
                setIsDeleteModalOpen(false);
                fetchClientes();
            } catch (error) {
                console.error('Error deleting cliente:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="container mx-auto px-8 select-none">
            <h1 className="text-2xl font-bold mb-4 select-text">Lista de Clientes</h1>
            <div className="overflow-x-auto h-[75lvh] overflow-y-auto rounded-lg">
                <table className="min-w-full bg-white select-text">
                    <thead className='sticky top-0 z-20'>
                        <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Nombre</th>
                            <th className="py-3 px-6 text-left">Tipo</th>
                            <th className="py-3 px-6 text-left">Teléfono</th>
                            <th className="py-3 px-6 text-left">Dirección</th>
                            <th className="py-3 px-6 text-left">Creado</th>
                            <th className="py-3 px-6 text-left">Actualizado</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light rounded-md">
                        {clientes.map(elemento => (
                            <motion.tr
                                key={elemento.idProducto}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={"border-b border-gray-200 hover:bg-gray-200 rounded-md" + (elemento.idCliente % 2 === 0 ? ' bg-gray-100' : '')}
                                id={elemento.nombre === "pruebaPrueba" ? "id_pruebaPrueba" : elemento.idCliente + "cliente"}
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">{elemento.idCliente}</td>
                                <td className="py-3 px-6 text-left">{elemento.nombre} {elemento.apellido}</td>
                                <td className="py-3 px-6 text-left">{elemento.tipo}</td>
                                <td className="py-3 px-6 text-left">{elemento.telefono}</td>
                                <td className="py-3 px-6 text-left">{elemento.direccion}</td>
                                <td className="py-3 px-6 text-left">{formatDate(elemento.createdAt)}</td>
                                <td className="py-3 px-6 text-left">{formatDate(elemento.updatedAt)}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="transform text-blue-500 hover:text-blue-700 mr-3"
                                            onClick={() => handleEdit(elemento)}
                                        >
                                            <FaEdit />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="transform text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteConfirmation(elemento)}
                                        >
                                            <FaTrash />
                                        </motion.button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Editar Cliente</h2>
                <ClienteForm
                    initialData={editingCliente}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar este Cliente?</p>
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                        onClick={() => setIsDeleteModalOpen(false)}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ClienteList;