import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import Alert from '../../components/common/Alert';
import {
    FaUser,
    FaLock,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaSpinner,
    FaArrowLeft,
    FaCheckCircle,
} from 'react-icons/fa';

const ClientRegister = () => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        username: '',
        telephone: '',
        email: '',
        adresse: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const { register } = useClientAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateStep1 = () => {
        if (!formData.nom || !formData.prenom || !formData.telephone) {
            setError('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        if (formData.telephone.length < 9) {
            setError('Numéro de téléphone invalide');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setError('Veuillez remplir tous les champs obligatoires');
            return false;
        }
        if (formData.password.length < 8) {
            setError('Le mot de passe doit contenir au moins 8 caractères');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        setError('');
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateStep2()) return;

        setLoading(true);

        const result = await register(formData);

        if (result.success) {
            navigate('/client/dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-green-500 via-teal-500 to-blue-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Link
                to="/client/login"
                className="absolute top-4 left-4 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
            >
                <FaArrowLeft />
                <span className="hidden sm:inline">Retour à la connexion</span>
            </Link>

            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-linear-to-r from-green-600 to-teal-600 px-8 py-8 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <FaUser className="text-4xl text-green-600" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-white">Créer un compte</h2>
                        <p className="mt-2 text-green-100">Rejoignez Pressing Pro aujourd'hui</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="px-8 pt-6">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex-1">
                                <div
                                    className={`h-2 rounded-full transition-all ${step >= 1 ? 'bg-linear-to-r from-green-600 to-teal-600' : 'bg-gray-200'
                                        }`}
                                ></div>
                                <p
                                    className={`text-xs mt-2 font-medium ${step >= 1 ? 'text-green-600' : 'text-gray-400'
                                        }`}
                                >
                                    Informations personnelles
                                </p>
                            </div>
                            <div className="w-8"></div>
                            <div className="flex-1">
                                <div
                                    className={`h-2 rounded-full transition-all ${step >= 2 ? 'bg-linear-to-r from-green-600 to-teal-600' : 'bg-gray-200'
                                        }`}
                                ></div>
                                <p
                                    className={`text-xs mt-2 font-medium ${step >= 2 ? 'text-green-600' : 'text-gray-400'
                                        }`}
                                >
                                    Compte et sécurité
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="px-8 pb-8">
                        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Step 1 */}
                            {step === 1 && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Prénom *
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                required
                                                value={formData.prenom}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="Votre prénom"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Nom *
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                required
                                                value={formData.nom}
                                                onChange={handleChange}
                                                className="input-field"
                                                placeholder="Votre nom"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Téléphone *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaPhone className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="tel"
                                                name="telephone"
                                                required
                                                value={formData.telephone}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="+237 6XX XXX XXX"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email (optionnel)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="votre@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Adresse (optionnel)
                                        </label>
                                        <div className="relative">
                                            <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                                                <FaMapMarkerAlt className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <textarea
                                                name="adresse"
                                                rows="2"
                                                value={formData.adresse}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="Votre adresse complète"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                                    >
                                        Suivant
                                    </button>
                                </div>
                            )}

                            {/* Step 2 */}
                            {step === 2 && (
                                <div className="space-y-4 animate-fadeIn">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nom d'utilisateur *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                required
                                                value={formData.username}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="Choisissez un nom d'utilisateur"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Utilisé pour vous connecter
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mot de passe *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                required
                                                value={formData.password}
                                                onChange={handleChange}
                                                className="input-field pl-10"
                                                placeholder="Créez un mot de passe sécurisé"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Minimum 8 caractères
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Confirmer le mot de passe *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaCheckCircle
                                                    className={`h-5 w-5 ${formData.confirmPassword &&
                                                            formData.password === formData.confirmPassword
                                                            ? 'text-green-500'
                                                            : 'text-gray-400'
                                                        }`}
                                                />
                                            </div>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                required
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className={`input-field pl-10 ${formData.confirmPassword &&
                                                        formData.password !== formData.confirmPassword
                                                        ? 'border-red-500'
                                                        : ''
                                                    }`}
                                                placeholder="Confirmez votre mot de passe"
                                            />
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-blue-800 mb-2">
                                            Avantages de votre compte :
                                        </h4>
                                        <ul className="text-sm text-blue-700 space-y-1">
                                            <li className="flex items-center">
                                                <FaCheckCircle className="mr-2 text-blue-600" />
                                                Suivre vos commandes en temps réel
                                            </li>
                                            <li className="flex items-center">
                                                <FaCheckCircle className="mr-2 text-blue-600" />
                                                Historique de toutes vos transactions
                                            </li>
                                            <li className="flex items-center">
                                                <FaCheckCircle className="mr-2 text-blue-600" />
                                                Notifications pour vos commandes
                                            </li>
                                            <li className="flex items-center">
                                                <FaCheckCircle className="mr-2 text-blue-600" />
                                                Consultation des services disponibles
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                                        >
                                            Précédent
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-linear-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-4 rounded-lg hover:from-green-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                        >
                                            {loading ? (
                                                <>
                                                    <FaSpinner className="animate-spin mr-2" />
                                                    Création...
                                                </>
                                            ) : (
                                                'Créer mon compte'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </form>

                        {/* Login Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Vous avez déjà un compte ?{' '}
                                <Link
                                    to="/client/login"
                                    className="font-semibold text-green-600 hover:text-green-700"
                                >
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientRegister;