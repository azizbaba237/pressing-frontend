import React, { createContext, useState, useContext, useEffect } from 'react';
import { clientAuthService } from '../services/clientApi';

const ClientAuthContext = createContext();

export const useClientAuth = () => {
    const context = useContext(ClientAuthContext);
    if (!context) {
        throw new Error('useClientAuth must be used within a ClientAuthProvider');
    }
    return context;
};

export const ClientAuthProvider = ({ children }) => {
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClient = () => {
            const clientData = clientAuthService.getClientData();
            setClient(clientData);
            setLoading(false);
        };
        loadClient();
    }, []);

    const register = async (data) => {
        try {
            const response = await clientAuthService.register(data);
            setClient(response.client);
            return { success: true, data: response };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Erreur lors de l\'inscription',
            };
        }
    };

    const login = async (username, password) => {
        try {
            const response = await clientAuthService.login(username, password);
            setClient(response.client);
            return { success: true, data: response };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error || 'Erreur de connexion',
            };
        }
    };

    const logout = () => {
        clientAuthService.logout();
        setClient(null);
    };

    const isAuthenticated = () => {
        return clientAuthService.isAuthenticated();
    };

    const value = {
        client,
        register,
        login,
        logout,
        isAuthenticated,
        loading,
    };

    return <ClientAuthContext.Provider value={value}>{children}</ClientAuthContext.Provider>;
};