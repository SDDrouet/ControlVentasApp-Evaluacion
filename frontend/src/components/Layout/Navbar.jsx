import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">Supermercado Antojitos</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" icon={<FaHome />} key={"navbar-Inicio"}>Inicio</NavLink>
              <NavLink to="/inventario" icon={<FaBox />} key={"navbar-Inventario"}>Inventario</NavLink>
              <NavLink to="/clientes" icon={<FaUsers />} key={"navbar-Clientes"}>Clientes</NavLink>
              <NavLink to="/ventas" icon={<FaShoppingCart />} key={"navbar-Ventas"}>Ventas</NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex items-center"
    >
      {icon}
      <span className="ml-2">{children}</span>
    </motion.div>
  </Link>
);

export default Navbar;