import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaTags,
  FaChartBar,
  FaMoneyBillWave,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { name: "Tableau de bord", path: "/", icon: <FaHome /> },
    { name: "Clients", path: "/clients", icon: <FaUsers /> },
    { name: "Commandes", path: "/commandes", icon: <FaShoppingCart /> },
    { name: "Services", path: "/services", icon: <FaTags /> },
    { name: "Paiements", path: "/paiements", icon: <FaMoneyBillWave /> },
    { name: "Rapports", path: "/rapports", icon: <FaChartBar /> },
    { name: "Paramètres", path: "/parametres", icon: <FaCog /> },
  ];

  return (
    <>
      {/* Overlay sombre — mobile uniquement quand menu ouvert */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 left-0 bottom-0 z-40
          w-64 bg-gray-800 text-white
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:top-auto lg:bottom-auto lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Bouton fermer — mobile uniquement */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2 lg:hidden">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            Navigation
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Séparateur mobile */}
        <div className="border-b border-gray-700 mx-4 mb-3 lg:hidden" />

        {/* Navigation */}
        <nav className="px-3 pb-4 overflow-y-auto h-full">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  onClick={onClose} // Ferme le menu sur mobile après navigation
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-sm ${
                      isActive
                        ? "bg-blue-600 text-white font-medium"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`
                  }
                >
                  <span className="text-base lg:text-xl shrink-0">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
