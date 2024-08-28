import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductoList from '../components/Inventario/ProductoList';
import NuevoProducto from '../components/Inventario/NuevoProducto';

const Inventario = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/inventario/lista" replace />} />
        <Route path="/lista" element={<ProductoList />} />
        <Route path="nuevo" element={<NuevoProducto />} />
      </Routes>
    </motion.div>
  );
};

export default Inventario;