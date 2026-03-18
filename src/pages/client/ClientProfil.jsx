import React, { useState, useEffect } from 'react';
import ClientLayout from '../../components/layout/ClientLayout';
import { clientProfileService } from '../../services/clientApi';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import Alert from '../../components/common/Alert';
import Loader from '../../components/common/Loader';
import {
    FaUser,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaSave,
    FaEdit,
    FaLock,
    FaCheckCircle,
    FaShoppingBag,
    FaMoneyBillWave,
} from 'react-icons/fa';

const ClientProfil = () => {
    const { client } = useClientAuth();
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [stats, setStats] = useState(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        adresse: '',
    });

    useEffect(() => {
        if (client) {
            setFormData({
                first_name: client.first_name || '',
                last_name: client.last_name || '',
                email: client.email || '',
                adresse: client.adresse || '',
            });
        }
        fetchStats();
    }, [client]);

    const fetchStats = async () => {
        try {
            const response = await clientProfileService.getStatistiques();
            setStats(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des statistiques:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await clientProfileService.updateProfile(formData);
            setAlert({
                type: 'success',
                message: 'Votre profil a été mis à jour avec succès',
            });
            setIsEditing(false);

            // Mettre à jour les données locales
            const updatedClient = { ...client, ...formData };
            localStorage.setItem('client_data', JSON.stringify(updatedClient));
        } catch (error) {
            setAlert({
                type: error,
                message: 'Erreur lors de la mise à jour du profil',
            });
        } finally {
            setLoading(false);
        }
    };

    if (!client) {
        return (
            <ClientLayout>
                <Loader text="Chargement du profil..." />
            </ClientLayout>
        );
    }

    return (
        <ClientLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <FaUser className="text-5xl text-indigo-600" />
                        </div>
                        <div className="text-center sm:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">
                                {client.first_name} {client.last_name}
                            </h1>
                            <p className="text-indigo-100 flex items-center justify-center sm:justify-start space-x-2">
                                <FaPhone />
                                <span>{client.phone}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                {alert && (
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Statistics */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Mes statistiques</h2>

                            {stats ? (
                                <div className="space-y-4">
                                    <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                                    <FaShoppingBag className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Total</p>
                                                    <p className="text-sm font-semibold text-gray-900">Commandes</p>
                                                </div>
                                            </div>
                                            <p className="text-3xl font-bold text-blue-600">
                                                {stats.total_orders}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                                    <FaCheckCircle className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Commandes</p>
                                                    <p className="text-sm font-semibold text-gray-900">Livrées</p>
                                                </div>
                                            </div>
                                            <p className="text-3xl font-bold text-green-600">
                                                {stats.orders_delivered}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                                                    <FaMoneyBillWave className="text-white text-xl" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-600">Total</p>
                                                    <p className="text-sm font-semibold text-gray-900">Dépensé</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-purple-600">
                                                    {stats.total_amount_spent.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-gray-600">FCFA</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                </div>
                            )}
                        </div>

                        {/* Account Status */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Statut du compte</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Statut</span>
                                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                                        <FaCheckCircle />
                                        <span>Actif</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Type</span>
                                    <span className="text-sm font-semibold text-gray-900">Client</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-xl p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Informations personnelles
                                </h2>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center space-x-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                                    >
                                        <FaEdit />
                                        <span>Modifier</span>
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Prénom
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nom
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Téléphone
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={client.phone}
                                            disabled
                                            className="input-field pl-10 bg-gray-50 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Le numéro de téléphone ne peut pas être modifié
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaEnvelope className="text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                                                }`}
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresse
                                    </label>
                                    <div className="relative">
                                        <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                                            <FaMapMarkerAlt className="text-gray-400" />
                                        </div>
                                        <textarea
                                            name="adresse"
                                            rows="3"
                                            value={formData.adresse}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`input-field pl-10 ${!isEditing ? 'bg-gray-50 cursor-not-allowed' : ''
                                                }`}
                                            placeholder="Votre adresse complète"
                                        ></textarea>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="flex space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({
                                                    first_name: client.first_name || '',
                                                    last_name: client.last_name || '',
                                                    email: client.email || '',
                                                    adresse: client.adresse || '',
                                                });
                                            }}
                                            className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                                        >
                                            Annuler
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                                        >
                                            {loading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                    <span>Enregistrement...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaSave />
                                                    <span>Enregistrer</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </form>

                            {/* Security Section */}
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sécurité</h3>
                                <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold">
                                    <FaLock />
                                    <span>Changer mon mot de passe</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
};

export default ClientProfil;