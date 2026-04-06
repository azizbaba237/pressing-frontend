import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../../contexts/AuthContext";
import { useUnifiedAuth } from'../../contexts/UnifiedAuthContext';
import { FaUser, FaSignOutAlt, FaBars } from "react-icons/fa";

const Navbar = ({ onMenuToggle }) => {
  //const { user, logout } = useAuth();
  const { user, logout } = useUnifiedAuth();
  
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md h-16 flex items-center">
      <div className="w-full px-4 sm:px-6 flex items-center justify-between">
        {/* Gauche : hamburger (mobile) + logo */}
        <div className="flex items-center space-x-3">
          {/* Bouton hamburger — visible uniquement sur mobile */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none"
            aria-label="Ouvrir le menu"
          >
            <FaBars className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">
              Pressing Pro
            </span>
          </Link>
        </div>

        {/* Droite : menu utilisateur */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <FaUser className="w-4 h-4 text-blue-600" />
            </div>
            <span className="hidden md:block text-sm font-medium">
              {user?.username || "Utilisateur"}
            </span>
          </button>

          {showUserMenu && (
            <>
              {/* Overlay invisible pour fermer au clic extérieur */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20 border border-gray-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500">Connecté en tant que</p>
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {user?.username || "Utilisateur"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2 mt-1"
                >
                  <FaSignOutAlt />
                  <span>Déconnexion</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
