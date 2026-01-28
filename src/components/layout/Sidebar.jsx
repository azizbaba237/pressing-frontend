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
} from "react-icons/fa";

const Sidebar = () => {
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
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "text-gray-300 hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
