import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VentasList from '../components/Ventas/VentasList';
import NuevaVenta from '../components/Ventas/NuevaVenta';

const Ventas = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/ventas/lista" replace />} />
        <Route path="/lista" element={<VentasList />} />
        <Route path="nuevo" element={<NuevaVenta />} />
      </Routes>
    </motion.div>
  );
};

export default Ventas;
