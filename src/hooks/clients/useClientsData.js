import { useState, useEffect } from "react";
import { clientService } from "../../services/api";
import {
    SEARCH_DEBOUNCE_DELAY,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    CONFIRMATION_MESSAGES
} from "../../constants/clients";

/**
 * Hook pour gérer les données des clients
 */
export const useClientsData = ({ searchTerm, showAlert }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientStats, setClientStats] = useState(null);

    // Fetch clients avec debounce sur la recherche
    useEffect(() => {
        const timeout = setTimeout(fetchClients, SEARCH_DEBOUNCE_DELAY);
        return () => clearTimeout(timeout);
    }, [searchTerm]);

    const fetchClients = async () => {
        try {
            setLoading(true);
            const params = searchTerm ? { search: searchTerm } : {};
            const response = await clientService.getAll(params);
            const data = response.data?.results ?? response.data ?? [];
            setClients(data);
        } catch (error) {
            console.error("Erreur fetchClients:", error);
            showAlert("error", ERROR_MESSAGES.fetch);
        } finally {
            setLoading(false);
        }
    };

    const fetchClientStats = async (clientId) => {
        try {
            setClientStats(null); // Reset stats
            const response = await clientService.getStatistiques(clientId);
            setClientStats(response.data);
        } catch (error) {
            console.error("Erreur fetchClientStats:", error);
            showAlert("error", ERROR_MESSAGES.stats);
        }
    };

    const handleDelete = async (client) => {
        if (window.confirm(CONFIRMATION_MESSAGES.delete(client))) {
            try {
                await clientService.delete(client.id);
                showAlert("success", SUCCESS_MESSAGES.deleted);
                fetchClients();
            } catch (error) {
                console.error("Erreur handleDelete:", error);
                showAlert("error", ERROR_MESSAGES.delete);
            }
        }
    };

    return {
        clients,
        loading,
        selectedClient,
        clientStats,
        setSelectedClient,
        fetchClients,
        fetchClientStats,
        handleDelete,
    };
};

export default useClientsData;