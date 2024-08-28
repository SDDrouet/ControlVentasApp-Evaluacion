import React from 'react'
import { motion } from 'framer-motion'

const ProductCard = ({ producto, handleAddProduct }) => {
    return (
        <motion.div
            key={producto.idProducto}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-50 shadow-sm border border-gray-300 rounded-lg p-4 cursor-pointer flex flex-col"
            onClick={() => handleAddProduct(producto)}
        >
            <h3 className="text-xl font-semibold text-center mb-2 border-b-2 border-gray-200">{producto.descripcion}</h3>
            <div className='flex flex-col'>
                <div className='flex'>
                    <span className='font-semibold w-1/3'>Código:</span>
                    <span>{producto.idProducto}</span>
                </div>

                <div className='flex'>
                    <span className='font-semibold w-1/3'>Precio:</span>
                    <span>${producto.precio}</span>
                </div>

                <div className='flex'>
                    <span className='font-semibold w-1/3'>Stock:</span>
                    <span>{producto.stock}</span>    
                </div>

            </div>
            
        </motion.div>
    )
}

export default ProductCard