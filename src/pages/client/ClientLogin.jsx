import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import Alert from '../../components/common/Alert';
import { FaUser, FaLock, FaSpinner, FaArrowLeft } from 'react-icons/fa';

const ClientLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useClientAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(username, password);

        if (result.success) {
            navigate('/client/dashboard');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Retour à l'accueil */}
            <Link
                to="/"
                className="absolute top-4 left-4 flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
            >
                <FaArrowLeft />
                <span className="hidden sm:inline">Retour à l'accueil</span>
            </Link>

            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-linear-to-r from-blue-600 to-purple-600 px-8 py-10 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <span className="text-4xl font-bold bg-li-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                P
                            </span>
                        </div>
                        <h2 className="text-3xl font-extrabold text-white">Espace Client</h2>
                        <p className="mt-2 text-blue-100">Connectez-vous à votre compte</p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                    Téléphone ou Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaUser className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="input-field pl-10"
                                        placeholder="Votre téléphone ou email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FaLock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input-field pl-10"
                                        placeholder="Votre mot de passe"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                >
                                    {loading ? (
                                        <>
                                            <FaSpinner className="animate-spin mr-2" />
                                            Connexion...
                                        </>
                                    ) : (
                                        'Se connecter'
                                    )}
                                </button>
                            </div>
                        </form>

                        {/* Register Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Pas encore de compte ?{' '}
                                <Link
                                    to="/client/register"
                                    className="font-semibold text-blue-600 hover:text-blue-700"
                                >
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-white">
                        <Link to="/client/services" className="hover:underline">
                            Voir nos services
                        </Link>
                        {' • '}
                        <Link to="/client/contact" className="hover:underline">
                            Nous contacter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClientLogin;