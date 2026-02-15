import { useState } from "react";
import { paiementService } from "../services/api";

/**
 * Hook personnalisé pour gérer les données des paiements
 */
export const usePaiementsData = ({
    searchTerm,
    filterMode,
    dateDebut,
    dateFin,
    showAlert,
}) => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPaiements = async () => {
        try {
            setLoading(true);
            const params = {};
            if (searchTerm) params.search = searchTerm;
            if (filterMode) params.payment_method = filterMode;

            const response = await paiementService.getAll(params);
            let data = response.data.results || response.data;

            // Filtrer par dates côté client
            data = filterByDateRange(data, dateDebut, dateFin);

            setPayments(data);
        } catch (error) {
            console.error("Erreur fetchPaiements:", error);
            showAlert("error", "Erreur lors du chargement des paiements");
        } finally {
            setLoading(false);
        }
    };

    return {
        payments,
        loading,
        fetchPaiements,
    };
};

/**
 * Filtre les paiements par plage de dates
 */
const filterByDateRange = (data, dateDebut, dateFin) => {
    let filteredData = data;

    if (dateDebut) {
        filteredData = filteredData.filter(
            (p) => new Date(p.payment_date) >= new Date(dateDebut)
        );
    }

    if (dateFin) {
        const fin = new Date(dateFin);
        fin.setHours(23, 59, 59);
        filteredData = filteredData.filter(
            (p) => new Date(p.payment_date) <= fin
        );
    }

    return filteredData;
};

export default usePaiementsData;