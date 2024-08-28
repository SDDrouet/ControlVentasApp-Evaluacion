import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaList, FaPlus } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  const getPageInfo = () => {
    const path = location.pathname.split('/')[1];
    switch (path) {
      case 'inventario':
        return {
          title: 'Inventario',
          listPath: '/inventario/lista',
          createPath: '/inventario/nuevo',
          createAction: 'Crear Producto'
        };
      case 'clientes':
        return {
          title: 'Clientes',
          listPath: '/clientes/lista',
          createPath: '/clientes/nuevo',
          createAction: 'Crear Cliente'
        };
      case 'ventas':
        return {
          title: 'Ventas',
          listPath: '/ventas/lista',
          createPath: '/ventas/nuevo',
          createAction: 'Realizar Venta'
        };
      default:
        return null;
    }
  };

  const pageInfo = getPageInfo();

  if (!pageInfo) {
    return null; // No mostrar sidebar en la página de inicio o páginas no reconocidas
  }

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.2,
      }}
      exit={{ x: -300 }}
      
      className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out"
    >
      <nav>
        <h2 className="text-2xl font-semibold mb-4 px-4">{pageInfo.title}</h2>
        <SidebarLink
          to={pageInfo.listPath}
          icon={FaList}
          text={`Lista de ${pageInfo.title}`}
        />
        <SidebarLink
          to={pageInfo.createPath}
          icon={FaPlus}
          text={`${pageInfo.createAction}`}
        />
      </nav>
    </motion.div>
  );
};

const SidebarLink = ({ to, icon: Icon, text }) => (
  <Link to={to} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700">
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center"
    >
      <Icon className="mr-2" />
      <span>{text}</span>
    </motion.div>
  </Link>
);

export default Sidebar;