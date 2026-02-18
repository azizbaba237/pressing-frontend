import { useMemo } from "react";
import { format } from "date-fns";
import { generateDateInterval, parseMontant, sumField } from "../../constants/reports/Formatters";
import { PAYMENT_METHODS, ORDER_STATUS } from "../../constants/reports";

/**
 * Hook pour tous les calculs des rapports (optimisé avec useMemo)
 */
export const useRapportsCalculations = ({ orders, payments, customers, periode }) => {

    // Calcul du chiffre d'affaires
    const chiffreAffaires = useMemo(() => {
        return sumField(orders, "total_amount");
    }, [orders]);

    // Calcul du total encaissé
    const totalEncaisse = useMemo(() => {
        return sumField(payments, "amount");
    }, [payments]);

    // Calcul du montant impayé
    const montantImpaye = useMemo(() => {
        return chiffreAffaires - totalEncaisse;
    }, [chiffreAffaires, totalEncaisse]);

    // Commandes par jour
    const commandesParJour = useMemo(() => {
        const interval = generateDateInterval(periode);

        return interval.map((day) => {
            const dayStr = format(day, "yyyy-MM-dd");
            const dayCommandes = orders.filter(
                (c) => format(new Date(c.deposit_date), "yyyy-MM-dd") === dayStr
            );

            return {
                date: format(day, "dd/MM"),
                commandes: dayCommandes.length,
                montant: sumField(dayCommandes, "total_amount"),
            };
        });
    }, [orders, periode]);

    // Paiements par mode
    const paiementsParMode = useMemo(() => {
        const modes = Object.keys(PAYMENT_METHODS).reduce((acc, key) => {
            acc[key] = { label: PAYMENT_METHODS[key].label, total: 0, count: 0 };
            return acc;
        }, {});

        payments.forEach((p) => {
            if (modes[p.payment_method]) {
                modes[p.payment_method].total += parseMontant(p.amount);
                modes[p.payment_method].count += 1;
            }
        });

        return Object.entries(modes).map(([key, value]) => ({
            name: value.label,
            total: value.total,
            count: value.count,
        }));
    }, [payments]);

    // Commandes par statut
    const commandesParStatut = useMemo(() => {
        const statuts = Object.keys(ORDER_STATUS).reduce((acc, key) => {
            acc[key] = { label: ORDER_STATUS[key].label, count: 0 };
            return acc;
        }, {});

        orders.forEach((c) => {
            if (statuts[c.status]) {
                statuts[c.status].count += 1;
            }
        });

        return Object.values(statuts).map((s) => ({
            name: s.label,
            value: s.count,
        }));
    }, [orders]);

    // Paiements par jour
    const paiementsParJour = useMemo(() => {
        const interval = generateDateInterval(periode);

        return interval.map((day) => {
            const dayStr = format(day, "yyyy-MM-dd");
            const dayPaiements = payments.filter(
                (p) => format(new Date(p.payment_date), "yyyy-MM-dd") === dayStr
            );

            return {
                date: format(day, "dd/MM"),
                amount: sumField(dayPaiements, "amount"),
            };
        });
    }, [payments, periode]);

    // Top clients
    const topClients = useMemo(() => {
        const clientStats = {};

        orders.forEach((c) => {
            if (c.customer_details) {
                const clientId = c.customer_details.id;
                if (!clientStats[clientId]) {
                    clientStats[clientId] = {
                        name: `${c.customer_details.first_name} ${c.customer_details.last_name}`,
                        phone: c.customer_details.phone,
                        total_items: 0,
                        total_amount: 0,
                    };
                }
                clientStats[clientId].total_items += 1;
                clientStats[clientId].total_amount += parseMontant(c.total_amount);
            }
        });

        return Object.values(clientStats)
            .sort((a, b) => b.total_amount - a.total_amount)
            .slice(0, 5);
    }, [orders]);

    // Clients actifs/inactifs
    const clientsStats = useMemo(() => {
        return {
            total: customers.length,
            actifs: customers.filter((c) => c.actif).length,
            inactifs: customers.filter((c) => !c.actif).length,
        };
    }, [customers]);

    return {
        chiffreAffaires,
        totalEncaisse,
        montantImpaye,
        commandesParJour,
        paiementsParMode,
        commandesParStatut,
        paiementsParJour,
        topClients,
        clientsStats,
    };
};

export default useRapportsCalculations;