import React from 'react';
import { motion } from 'framer-motion';
import ProductoForm from './ProductoForm';
import { inventarioApi } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
    const navigate = useNavigate();

    const handleSubmit = async (producto) => {
        try {
            await inventarioApi.create(producto);
            navigate('/inventario');
        } catch (error) {
            console.error('Error creating producto:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto px-4 flex flex-col items-center justify-center py-8"
        >
            <h1 className="text-2xl font-bold mb-4">Crear Nuevo Producto</h1>
            <div className='bg-gray-100 p-8 w-1/2 rounded-md shadow-sm'>
                <ProductoForm onSubmit={handleSubmit} />
            </div>

        </motion.div>
    );
};

export default NuevoProducto;