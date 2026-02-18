import { useState } from "react";
import {
    commandeService,
    clientService,
    paiementService,
} from "../../services/api";

/**
 * Hook personnalisé pour gérer les données des rapports
 */
export const useRapportsData = ({ showAlert }) => {
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            setLoading(true);

            const [statsRes, ordersRes, paymentsRes, customersRes] =
                await Promise.all([
                    commandeService.getStatistiques(),
                    commandeService.getAll({ ordering: "-deposit_date" }),
                    paiementService.getAll({ ordering: "-payment_date" }),
                    clientService.getAll({ ordering: "-inscription_date" }),
                ]);

            setStats(statsRes.data);
            setOrders(ordersRes.data.results || ordersRes.data);
            setPayments(paymentsRes.data.results || paymentsRes.data);
            setCustomers(customersRes.data.results || customersRes.data);
        } catch (error) {
            console.error("Erreur fetchAllData:", error);
            showAlert("error", "Erreur lors du chargement des rapports");
        } finally {
            setLoading(false);
        }
    };

    return {
        orders,
        payments,
        customers,
        stats,
        loading,
        fetchAllData,
    };
};

export default useRapportsData;