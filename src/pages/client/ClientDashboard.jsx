import React, { useState, useEffect } from 'react';
import ClientLayout from '../../components/layout/ClientLayout';
import { clientProfileService } from '../../services/clientApi';
import Loader from '../../components/common/Loader';
import Alert from '../../components/common/Alert';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import {
    FaShoppingBag,
    FaClock,
    FaCheckCircle,
    FaTruck,
    FaMoneyBillWave,
    FaExclamationCircle,
    FaCalendarAlt,
    FaArrowRight,
} from 'react-icons/fa';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Link } from 'react-router-dom';

const ClientDashboard = () => {
    const { client } = useClientAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [recentCommandes, setRecentCommandes] = useState([]);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [statsRes, commandesRes] = await Promise.all([
                clientProfileService.getStatistiques(),
                clientProfileService.getMesCommandes(),
            ]);

            setStats(statsRes.data);
            setRecentCommandes(commandesRes.data.slice(0, 5));
        } catch (error) {
            setAlert({ type: error, message: 'Erreur lors du chargement des données' });
        } finally {
            setLoading(false);
        }
    };

    const getStatutInfo = (statut) => {
        const statuts = {
            EN_ATTENTE: {
                label: 'En attente',
                color: 'bg-yellow-100 text-yellow-800',
                icon: <FaClock />,
                gradient: 'from-yellow-400 to-orange-500',
            },
            EN_COURS: {
                label: 'En cours',
                color: 'bg-blue-100 text-blue-800',
                icon: <FaTruck />,
                gradient: 'from-blue-400 to-blue-600',
            },
            PRET: {
                label: 'Prêt',
                color: 'bg-green-100 text-green-800',
                icon: <FaCheckCircle />,
                gradient: 'from-green-400 to-green-600',
            },
            LIVRE: {
                label: 'Livré',
                color: 'bg-purple-100 text-purple-800',
                icon: <FaCheckCircle />,
                gradient: 'from-purple-400 to-purple-600',
            },
            ANNULE: {
                label: 'Annulé',
                color: 'bg-red-100 text-red-800',
                icon: <FaExclamationCircle />,
                gradient: 'from-red-400 to-red-600',
            },
        };
        return statuts[statut] || statuts.EN_ATTENTE;
    };

    if (loading) {
        return (
            <ClientLayout>
                <Loader text="Chargement de votre tableau de bord..." />
            </ClientLayout>
        );
    }

    return (
        <ClientLayout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                Bonjour, {client?.prenom} ! 👋
                            </h1>
                            <p className="text-blue-100 text-lg">
                                Bienvenue sur votre espace personnel
                            </p>
                        </div>
                        <div className="mt-4 md:mt-0 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                            <p className="text-sm text-blue-100">Membre depuis</p>
                            <p className="text-xl font-bold">2026</p>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {alert && (
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Commandes */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total Commandes</p>
                                <p className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {stats?.total_commandes || 0}
                                </p>
                            </div>
                            <div className="bg-linear-to-br from-blue-500 to-purple-500 p-4 rounded-full">
                                <FaShoppingBag className="text-2xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* En Cours */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">En cours</p>
                                <p className="text-3xl font-bold bg-linear-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                    {stats?.commandes_en_cours || 0}
                                </p>
                            </div>
                            <div className="bg-linear-to-br from-yellow-500 to-orange-500 p-4 rounded-full">
                                <FaClock className="text-2xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Prêtes */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Prêtes</p>
                                <p className="text-3xl font-bold bg-linear-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    {stats?.commandes_pretes || 0}
                                </p>
                            </div>
                            <div className="bg-linear-to-br from-green-500 to-emerald-500 p-4 rounded-full">
                                <FaCheckCircle className="text-2xl text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Total Dépensé */}
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Total dépensé</p>
                                <p className="text-3xl font-bold bg-linear-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                                    {(stats?.montant_total_depense || 0).toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">FCFA</p>
                            </div>
                            <div className="bg-linear-to-br from-pink-500 to-rose-500 p-4 rounded-full">
                                <FaMoneyBillWave className="text-2xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Commandes en cours - Highlighted */}
                {stats?.commandes_pretes > 0 && (
                    <div className="bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-xl animate-pulse">
                        <div className="flex flex-col sm:flex-row items-center justify-between">
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                                <div className="bg-white/20 p-4 rounded-full">
                                    <FaCheckCircle className="text-3xl" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">
                                        {stats.commandes_pretes} commande(s) prête(s) !
                                    </h3>
                                    <p className="text-green-100">
                                        Venez récupérer vos articles au pressing
                                    </p>
                                </div>
                            </div>
                            <Link
                                to="/client/commandes"
                                className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors flex items-center space-x-2"
                            >
                                <span>Voir mes commandes</span>
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-white">Mes dernières commandes</h2>
                            <Link
                                to="/client/commandes"
                                className="text-white hover:text-blue-100 flex items-center space-x-2 text-sm"
                            >
                                <span>Voir tout</span>
                                <FaArrowRight />
                            </Link>
                        </div>
                    </div>

                    <div className="p-6">
                        {recentCommandes.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaShoppingBag className="text-5xl text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Aucune commande
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Vous n'avez pas encore passé de commande
                                </p>
                                <Link
                                    to="/client/services"
                                    className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                                >
                                    <span>Voir nos services</span>
                                    <FaArrowRight />
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentCommandes.map((commande) => {
                                    const statutInfo = getStatutInfo(commande.statut);
                                    return (
                                        <Link
                                            key={commande.id}
                                            to={`/client/commandes`}
                                            className="block bg-linear-to-r from-gray-50 to-gray-100 rounded-xl p-5 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <span className="font-mono font-bold text-gray-900">
                                                            {commande.numero_commande}
                                                        </span>
                                                        <span
                                                            className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold ${statutInfo.color}`}
                                                        >
                                                            {statutInfo.icon}
                                                            <span>{statutInfo.label}</span>
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <div className="flex items-center space-x-1">
                                                            <FaCalendarAlt className="text-gray-400" />
                                                            <span>
                                                                {format(new Date(commande.date_depot), 'dd MMM yyyy', {
                                                                    locale: fr,
                                                                })}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center space-x-1">
                                                            <FaShoppingBag className="text-gray-400" />
                                                            <span>{commande.articles?.length || 0} article(s)</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                        {parseFloat(commande.montant_total).toLocaleString()} FCFA
                                                    </p>
                                                    {commande.montant_restant > 0 && (
                                                        <p className="text-xs text-red-600 font-semibold">
                                                            Reste: {parseFloat(commande.montant_restant).toLocaleString()}{' '}
                                                            FCFA
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <Link
                        to="/client/services"
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-linear-to-br from-blue-500 to-purple-500 p-4 rounded-full group-hover:scale-110 transition-transform">
                                <FaShoppingBag className="text-2xl text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Nos Services</h3>
                                <p className="text-sm text-gray-600">
                                    Découvrez nos prestations
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/client/commandes"
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-linear-to-br from-green-500 to-emerald-500 p-4 rounded-full group-hover:scale-110 transition-transform">
                                <FaTruck className="text-2xl text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Mes Commandes</h3>
                                <p className="text-sm text-gray-600">
                                    Suivre mes commandes
                                </p>
                            </div>
                        </div>
                    </Link>

                    <Link
                        to="/client/contact"
                        className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="bg-linear-to-br from-pink-500 to-rose-500 p-4 rounded-full group-hover:scale-110 transition-transform">
                                <FaMoneyBillWave className="text-2xl text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 mb-1">Contact</h3>
                                <p className="text-sm text-gray-600">
                                    Nous contacter
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </ClientLayout>
    );
};

export default ClientDashboard;