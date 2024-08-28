import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { inventarioApi, clientesApi, ventasApi } from '../../services/api';
import ProductCard from './ProductCard';
import Modal from '../Modal';
import { FaInfoCircle, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const NuevaVenta = () => {
    const [clienteId, setClienteId] = useState('');
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isModalInfoOpen, setIsModalInfoOpen] = useState(false);
    const [modalInfoContent, setModalInfoContent] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchProductos();
        fetchClientes();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [selectedProducts]);

    useEffect(() => {
        handleSearch();
    }, [searchTerm, productos]);

    const fetchProductos = async () => {
        try {
            const response = await inventarioApi.getAll();
            setProductos(response.data);
            setFilteredProductos(response.data);
        } catch (error) {
            setModalInfoContent('Error al cargar los productos');
            setIsModalInfoOpen(true);
        }
    };

    const fetchClientes = async () => {
        try {
            const response = await clientesApi.getAll();
            setClientes(response.data);
        } catch (error) {
            setModalInfoContent('Error al cargar los clientes');
            setIsModalInfoOpen(true);
        }
    };

    const handleSearch = () => {
        const lowercasedFilter = searchTerm.toLowerCase();
        const filteredData = productos.filter(producto =>
            producto.descripcion.toLowerCase().includes(lowercasedFilter) ||
            producto.idProducto.toString().includes(lowercasedFilter)
        );
        setFilteredProductos(filteredData);
    };

    const handleAddProduct = (product) => {
        const existingProduct = selectedProducts.find(p => p.idProducto === product.idProducto);

        if (product.stock !== 0) {
            if (existingProduct) {
                if (existingProduct.cantidad + 1 > product.stock) {
                    setModalInfoContent('No hay suficiente stock para agregar otro producto: ' + product.descripcion);
                    setIsModalInfoOpen(true);
                    return;
                }
                setSelectedProducts(selectedProducts.map(p =>
                    p.idProducto === product.idProducto ? { ...p, cantidad: p.cantidad + 1 } : p
                ));
            } else {
                setSelectedProducts([...selectedProducts, { ...product, cantidad: 1 }]);
            }
        } else {
            setModalInfoContent('Stock terminado para producto: ' + product.descripcion);
            setIsModalInfoOpen(true);
        }
    };

    const handleRemoveProduct = (productId) => {
        setSelectedProducts(selectedProducts.filter(p => p.idProducto !== productId));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setSelectedProducts(selectedProducts.map(p =>
            p.idProducto === productId ? { ...p, cantidad: parseInt(newQuantity) } : p
        ));
    };

    const calculateTotal = () => {
        const newTotal = selectedProducts.reduce((sum, product) => sum + (product.precio * product.cantidad), 0);
        setTotal(newTotal);
    };

    const handleSubmitVenta = async () => {
        if (!clienteId || selectedProducts.length === 0) {
            setModalInfoContent('Por favor, ingrese el ID del cliente y seleccione al menos un producto.');
            setIsModalInfoOpen(true);

            return;
        }

        try {
            const ventaData = {
                idCliente: clienteId,
                detalleVenta: selectedProducts.map(p => ({
                    idProducto: p.idProducto,
                    cantidad: p.cantidad
                }))
            };

            await ventasApi.create(ventaData);
            
            setModalInfoContent('Venta registrada exitosamente');
            setIsModalInfoOpen(true);

            setClienteId('');
            setSelectedProducts([]);
            navigate('/ventas');
        } catch (error) {
            setModalInfoContent('Error al registrar la venta');
            setIsModalInfoOpen(true);
        }
    };

    return (
        <div className="flex flex-col gap-4 container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Registro de Venta</h1>

            

            <div className='bg-gray-100 p-8 rounded-lg'>
                <h2 className="text-xl font-semibold mb-2">Selección de Productos</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                        Buscar Producto
                    </label>
                    <input
                        className="mt-1 block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        id="search"
                        type="text"
                        placeholder="Buscar por nombre o ID del producto"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Productos Disponibles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden p-2 min-h-[30lvh] max-h-[70lvh]">
                        {filteredProductos.map(producto => (
                            <ProductCard key={producto.idProducto} producto={producto} handleAddProduct={handleAddProduct} />
                        ))}
                    </div>
                </div>

            </div>

            <div>
                <label className="block text-gray-700 font-bold mb-2" htmlFor="clienteId">
                    Cliente
                </label>
                <select
                    className="mt-1 cursor-pointer block w-full rounded-md p-2 border-gray-200 shadow-sm outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    id="clienteId"
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                >
                    <option value="">Seleccione un cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente} value={cliente.idCliente}>{cliente.idCliente + " - " + cliente.nombre + " " + cliente.apellido}</option>
                    ))}

                </select>

            </div>

            <div className="mb-4">
                <h2 className="text-xl font-bold mb-4 select-text">Productos Seleccionados</h2>
                <div className="overflow-x-auto max-h-[75lvh] overflow-y-auto rounded-lg">
                    <table className="min-w-full bg-white select-text">
                        <thead className='sticky top-0 z-20'>
                            <tr className="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Producto</th>
                                <th className="py-3 px-6 text-left">Cantidad</th>
                                <th className="py-3 px-6 text-left">Precio Unitario</th>
                                <th className="py-3 px-6 text-left">Subtotal</th>
                                <th className="py-3 px-6 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {selectedProducts.map((product, i) => (
                                <motion.tr
                                    key={product.idProducto}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className={"border-b border-gray-200 hover:bg-gray-200 rounded-md" + (i % 2 === 0 ? ' bg-gray-100' : '')}
                                >
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{product.descripcion}</td>
                                    <td className="py-3 px-6 text-left">
                                        <input
                                            type="number"
                                            min="1"
                                            max={product.stock}
                                            value={product.cantidad}
                                            onChange={(e) => handleQuantityChange(product.idProducto, e.target.value)}
                                            className="w-20 border rounded px-2 py-1"
                                        />
                                    </td>
                                    <td className="py-3 px-6 text-left">${product.precio}</td>
                                    <td className="py-3 px-6 text-left">${(product.precio * product.cantidad).toFixed(2)}</td>
                                    <td className="py-3 px-6 text-center">
                                        <motion.button
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="transform text-red-500 hover:text-red-700"
                                            onClick={() => handleRemoveProduct(product.idProducto)}
                                        >
                                            <FaTrash />
                                        </motion.button>
                                        
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mb-4">

                <h2 className="text-xl text-right"><span className='font-semibold'>Subtotal:</span> ${total.toFixed(2)}</h2>
                <h2 className="text-xl text-right"><span className='font-semibold'>IVA (15%):</span> ${(total * 0.15).toFixed(2)}</h2>
                <h2 className="text-xl text-right"><span className='font-semibold'>Total:</span> ${(total + (total * 0.15)).toFixed(2)}</h2>
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmitVenta}
            >
                Registrar Venta
            </motion.button>

            {/* Delete Confirmation Modal */}
            <Modal isOpen={isModalInfoOpen}>
                <div className='flex flex-col gap-8 justify-center'>
                    <h2 className="text-2xl text-blue-600 font-bold flex justify-center gap-4 items-center"><FaInfoCircle /> Mensaje de información</h2>
                    <p className='font-semibold' >{modalInfoContent}</p>
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                        onClick={() => setIsModalInfoOpen(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </Modal>
        </div >
    );
}

export default NuevaVenta