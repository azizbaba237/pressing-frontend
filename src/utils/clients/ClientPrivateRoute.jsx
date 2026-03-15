import React from 'react';
import { Navigate } from 'react-router-dom';
import { useClientAuth } from '../../contexts/ClientAuthContext';
import Loader from '../../components/common/Loader';

const ClientPrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useClientAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader text="Chargement..." />
            </div>
        );
    }

    return isAuthenticated() ? children : <Navigate to="/client/login" />;
};

export default ClientPrivateRoute;