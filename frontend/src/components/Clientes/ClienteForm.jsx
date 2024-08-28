import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ClienteForm = ({ onSubmit, onCancel, initialData }) => {
    const [cliente, setCliente] = useState({
        tipo: 'Nuevo',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setCliente(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });

        if (name === 'telefono') {
            const telefonoValido = /^[0-9]{7,10}$/;
            if (!telefonoValido.test(value)) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    telefono: 'El número de teléfono debe contener entre 7 y 10 dígitos.'
                }));
            } else {
                setErrors((prevErrors) => {
                    const { telefono, ...rest } = prevErrors;
                    return rest;
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            onSubmit(cliente);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">

            <div className='flex gap-8 w-full'>
                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={cliente.nombre}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="apellido">
                        Apellido
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="apellido"
                        type="text"
                        name="apellido"
                        value={cliente.apellido}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>
            <div className='flex gap-8 w-full'>
                <div className='relative w-full'>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="telefono">
                        Teléfono
                    </label>
                    <input
                        className={`mt-1 block w-full rounded-md p-2 border ${errors.telefono ? 'border-red-500' : 'border-gray-200'
                            } shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                        id="telefono"
                        type="text"
                        name="telefono"
                        value={cliente.telefono}
                        onChange={handleChange}
                        required
                    />
                    {errors.telefono && (
                        <p className="bg-white p-1 border border-red-400 rounded-md absolute w-full mt-2 text-xs text-red-600">{errors.telefono}</p>
                    )}
                </div>
                <div className='w-full'>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="tipo">
                        Tipo de Cliente
                    </label>
                    <select
                        className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="tipo"
                        name="tipo"
                        value={cliente.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="Nuevo">Nuevo</option>
                        <option value="Frecuente">Frecuente</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>

            </div>
            <div className='w-full'>
                <label className="block text-sm font-medium text-gray-700" htmlFor="direccion">
                    Dirección
                </label>
                <input
                    className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    id="direccion"
                    type="text"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleChange}
                    required
                />
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
                    {initialData ? 'Actualizar' : 'Crear'} Cliente
                </motion.button>
            </div>
        </form>
    );
};

export default ClienteForm;
