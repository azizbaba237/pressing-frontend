import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import {
    FaHome,
    FaShoppingBag,
    FaUser,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaPhone,
    FaTags,
} from 'react-icons/fa';

const ClientLayout = ({ children }) => {
    const { client, logout } = useClientAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/client/login');
    };

    const menuItems = [
        { name: 'Accueil', path: '/client/dashboard', icon: <FaHome /> },
        { name: 'Mes Commandes', path: '/client/commandes', icon: <FaShoppingBag /> },
        { name: 'Services', path: '/client/services', icon: <FaTags /> },
        { name: 'Contact', path: '/client/contact', icon: <FaPhone /> },
        { name: 'Mon Profil', path: '/client/profil', icon: <FaUser /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
            {/* Navbar */}
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/client/dashboard" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                                    Pressing Pro
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1">
                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive(item.path)
                                        ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}
                        </div>

                        {/* User Menu Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-900">
                                    {client?.prenom} {client?.nom}
                                </p>
                                <p className="text-xs text-gray-500">{client?.telephone}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Déconnexion"
                            >
                                <FaSignOutAlt className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100"
                            >
                                {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t">
                        <div className="px-4 pt-2 pb-4 space-y-1">
                            {/* User Info Mobile */}
                            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                                <p className="font-semibold text-gray-900">
                                    {client?.prenom} {client?.nom}
                                </p>
                                <p className="text-sm text-gray-600">{client?.telephone}</p>
                            </div>

                            {menuItems.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                        ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.icon}
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            ))}

                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <FaSignOutAlt />
                                <span className="font-medium">Déconnexion</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center text-gray-600">
                        <p className="text-sm">© 2026 Pressing Pro. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClientLayout;