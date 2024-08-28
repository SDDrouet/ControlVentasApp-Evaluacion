import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ClienteList from '../components/Clientes/ClienteList';
import NuevoCliente from '../components/Clientes/NuevoCliente';

const Inventario = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Routes>
        <Route path="/" element={<Navigate to="/clientes/lista" replace />} />
        <Route path="/lista" element={<ClienteList />} />
        <Route path="nuevo" element={<NuevoCliente />} />
      </Routes>
    </motion.div>
  );
};

export default Inventario;