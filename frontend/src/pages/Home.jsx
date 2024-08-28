import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
          <motion.img
            src="/logo.png" // Actualiza la ruta del logo
            alt="Logo de la Empresa"
            className="w-1/3 mb-8"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: -10}}

          />
          <h1 className="text-4xl font-bold mb-4">Bienvenido a tu Gestor de Ventas</h1>
          <p className="text-xl text-gray-700 mb-6">
            Esta aplicación está diseñada para facilitar la gestión integral de tu negocio. Aquí
            podrás:
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 mb-6">
            <li>Gestionar Clientes: Añade, edita, y elimina la información de tus clientes.</li>
            <li>Gestionar Inventario: Administra los productos disponibles en tu inventario.</li>
            <li>Gestionar Ventas: Registra y gestiona las ventas realizadas.</li>
          </ul>
          <p className="text-xl text-gray-700">
            ¡Explora las opciones en el menú y comienza a optimizar tu negocio!
          </p>
    </div>
  );
};

export default Home;
