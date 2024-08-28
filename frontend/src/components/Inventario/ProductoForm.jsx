import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProductoForm = ({ onSubmit, onCancel, initialData }) => {
    const [producto, setProducto] = useState({
        descripcion: '',
        precio: '',
        stock: ''
    });

    useEffect(() => {
        if (initialData) {
            setProducto(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(producto);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="descripcion">
                    Descripción
                </label>
                <input
                    className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    id="descripcion"
                    type="text"
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className='flex gap-8 w-full'>
                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="precio">
                        Precio
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="precio"
                        type="number"
                        step="0.01"
                        name="precio"
                        min="0"
                        value={producto.precio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="stock">
                        Stock
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="stock"
                        type="number"
                        name="stock"
                        min="0"
                        value={producto.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end space-x-2">
                {onCancel && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                        onClick={onCancel}
                        type="button"
                    >
                        Cancelar
                    </motion.button>
                )}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    type="submit"
                >
                    {initialData ? 'Actualizar' : 'Crear'} Producto
                </motion.button>
            </div>
        </form>
    );
};

export default ProductoForm;