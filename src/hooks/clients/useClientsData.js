/**
 * =============================================================================
 * HOOK PERSONNALISÉ - GESTION DES DONNÉES CLIENTS
 * =============================================================================
 * Ce hook centralise la logique de récupération et de gestion des clients.
 * Utilisé principalement dans la page Clients de l'admin.
 * =============================================================================
 */

import { useState, useEffect } from 'react';
import { customerService } from '../services/orderService';

/**
 * Hook pour gérer les données des clients
 * @param {Object} filters - Filtres à appliquer (search, actif...)
 * @returns {Object} { clients, loading, error, refresh }
 */
export const useClientsData = (filters = {}) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClients = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await customerService.getAll(filters);
            setClients(response.data.results || response.data);
        } catch (err) {
            setError(err.message || 'Erreur lors du chargement des clients');
            console.error('Erreur chargement clients:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, [JSON.stringify(filters)]);

    return {
        clients,
        loading,
        error,
        refresh: fetchClients,
    };
};