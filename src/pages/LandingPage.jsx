import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaShieldAlt,
    FaClock,
    FaStar,
    FaUsers,
    FaArrowRight,
    FaTshirt,
    FaSprayCan,
    FaFacebook,
    FaInstagram,
    FaWhatsapp,
} from 'react-icons/fa';
import { MdIron } from 'react-icons/md';

const LandingPage = () => {
    const features = [
        {
            icon: <FaShieldAlt className="text-4xl" />,
            title: 'Qualité garantie',
            description: "Nous prenons soin de vos vêtements comme si c'étaient les nôtres",
            gradient: 'from-blue-500 to-blue-600',
        },
        {
            icon: <FaClock className="text-4xl" />,
            title: 'Service rapide',
            description: 'Traitement express disponible en 24h',
            gradient: 'from-green-500 to-green-600',
        },
        {
            icon: <FaStar className="text-4xl" />,
            title: 'Satisfaction client',
            description: 'Plus de 1000 clients satisfaits',
            gradient: 'from-yellow-500 to-yellow-600',
        },
        {
            icon: <FaUsers className="text-4xl" />,
            title: 'Équipe professionnelle',
            description: 'Personnel formé et expérimenté',
            gradient: 'from-purple-500 to-purple-600',
        },
    ];

    const services = [
        {
            icon: <FaTshirt className="text-5xl" />,
            title: 'Nettoyage à sec',
            description: 'Pour vos vêtements délicats',
            gradient: 'from-blue-500 to-indigo-600',
        },
        {
            icon: <FaSprayCan className="text-5xl" />,
            title: 'Détachage',
            description: 'Élimination des taches tenaces',
            gradient: 'from-green-500 to-teal-600',
        },
        {
            icon: <MdIron className="text-5xl" />,
            title: 'Repassage',
            description: 'Repassage professionnel',
            gradient: 'from-purple-500 to-pink-600',
        },
    ];

    return (
        <div className="min-h-screen bg-white">

            {/* Navbar */}
            <nav className="bg-white shadow-lg sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <span className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Pressing Pro
                                </span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
                            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">À propos</a>
                            <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
                            <Link to="/client/login" className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                                Connexion
                            </Link>
                        </div>
                        <div className="md:hidden flex items-center">
                            <Link to="/client/login" className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                                Connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                                Votre pressing de confiance à Douala
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-100">
                                Service professionnel de nettoyage et d'entretien de vêtements.
                                Qualité, rapidité et satisfaction garanties.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/client/register" className="inline-flex items-center justify-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl">
                                    <span>Créer un compte</span>
                                    <FaArrowRight />
                                </Link>
                                <Link to="/client/services" className="inline-flex items-center justify-center space-x-2 border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-purple-600 transition-all">
                                    Voir nos services
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="relative">
                                <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                                    <FaTshirt className="text-9xl text-white/50" />
                                </div>
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                                    <span className="text-2xl font-bold text-gray-900">-20%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Pourquoi nous choisir ?</h2>
                        <p className="text-xl text-gray-600">Découvrez les avantages de notre pressing</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                                <div className={`w-16 h-16 bg-linear-to-br ${feature.gradient} rounded-full flex items-center justify-center text-white mb-6 mx-auto`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                                <p className="text-gray-600 text-center">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
                        <p className="text-xl text-gray-600">Une gamme complète de prestations</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2">
                                <div className={`h-2 bg-linear-to-r ${service.gradient}`}></div>
                                <div className="p-8">
                                    <div className={`w-20 h-20 bg-linear-to-br ${service.gradient} rounded-full flex items-center justify-center text-white mb-6 mx-auto`}>
                                        {service.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-center mb-3">{service.title}</h3>
                                    <p className="text-gray-600 text-center mb-6">{service.description}</p>
                                    <Link to="/client/services" className="block text-center text-blue-600 font-semibold">
                                        En savoir plus →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">P</span>
                                </div>
                                <span className="text-2xl font-bold">Pressing Pro</span>
                            </div>
                            <p className="text-gray-400 mb-4">Votre pressing de confiance à Douala.</p>
                            <div className="flex space-x-4">
                                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"><FaFacebook /></a>
                                <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center"><FaInstagram /></a>
                                <a href="#" className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center"><FaWhatsapp /></a>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
                            <ul className="space-y-2">
                                <li><Link to="/client/services" className="text-gray-400 hover:text-white">Nos services</Link></li>
                                <li><Link to="/client/login" className="text-gray-400 hover:text-white">Connexion</Link></li>
                                <li><Link to="/client/register" className="text-gray-400 hover:text-white">Créer un compte</Link></li>
                                <li><Link to="/admin/login" className="text-gray-400 hover:text-white">Espace Admin</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>📍 Douala, Cameroun</li>
                                <li>📞 +237 6XX XXX XXX</li>
                                <li>✉️ contact@pressing.com</li>
                                <li>🕒 Lun-Ven : 8h-18h</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>© 2026 Pressing Pro. Tous droits réservés.</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;