import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { inventarioApi } from '../../services/api';
import Modal from '../Modal';
import ProductoForm from './ProductoForm';

const ProductoList = () => {
    const [productos, setProductos] = useState([]);
    const [editingProducto, setEditingProducto] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productoToDelete, setProductoToDelete] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const response = await inventarioApi.getAll();
            setProductos(response.data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const handleEdit = (producto) => {
        setEditingProducto(producto);
        setIsEditModalOpen(true);
    };

    const handleUpdate = async (updatedProducto) => {
        try {
            await inventarioApi.update(updatedProducto.idProducto, updatedProducto);
            setIsEditModalOpen(false);
            fetchProductos();
        } catch (error) {
            console.error('Error updating producto:', error);
        }
    };

    const handleDeleteConfirmation = (producto) => {
        setProductoToDelete(producto);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (productoToDelete) {
            try {
                await inventarioApi.delete(productoToDelete.idProducto);
                setIsDeleteModalOpen(false);
                fetchProductos();
            } catch (error) {
                console.error('Error deleting producto:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    return (
        <div className="container mx-auto px-8 select-none">
            <h1 className="text-2xl font-bold mb-4 select-text">Lista de Productos</h1>
            <div className="overflow-x-auto h-[75lvh] overflow-y-auto rounded-lg">
                <table className="min-w-full bg-white select-text">
                    <thead className='sticky top-0 z-20'>
                        <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">ID</th>
                            <th className="py-3 px-6 text-left">Descripción</th>
                            <th className="py-3 px-6 text-left">Precio</th>
                            <th className="py-3 px-6 text-left">Stock</th>
                            <th className="py-3 px-6 text-left">Creado</th>
                            <th className="py-3 px-6 text-left">Actualizado</th>
                            <th className="py-3 px-6 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light rounded-md">
                        {productos.map(producto => (
                            <motion.tr
                                key={"producto" + producto.idProducto}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={"border-b border-gray-200 hover:bg-gray-200 rounded-md" + (producto.idProducto % 2 === 0 ? ' bg-gray-100' : '')}
                                id={producto.descripcion !== "Producto test Prueba" ? "producto" + producto.idProducto : "id_producto_test"}
                            >
                                <td className="py-3 px-6 text-left whitespace-nowrap">{producto.idProducto}</td>
                                <td className="py-3 px-6 text-left">{producto.descripcion}</td>
                                <td className="py-3 px-6 text-left">${producto.precio.toFixed(2)}</td>
                                <td className="py-3 px-6 text-left">{producto.stock}</td>
                                <td className="py-3 px-6 text-left">{formatDate(producto.createdAt)}</td>
                                <td className="py-3 px-6 text-left">{formatDate(producto.updatedAt)}</td>
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="transform text-blue-500 hover:text-blue-700 mr-3"
                                            onClick={() => handleEdit(producto)}
                                        >
                                            <FaEdit />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="transform text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteConfirmation(producto)}
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
                <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
                <ProductoForm
                    initialData={editingProducto}
                    onSubmit={handleUpdate}
                    onCancel={() => setIsEditModalOpen(false)}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">Confirmar Eliminación</h2>
                <p>¿Estás seguro de que deseas eliminar este producto?</p>
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

export default ProductoList;