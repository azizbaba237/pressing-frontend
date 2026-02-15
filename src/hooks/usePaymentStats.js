import { useMemo } from "react";

/**
 * Hook personnalisé pour calculer les statistiques des paiements
 */
export const usePaymentStats = (payments) => {
    const stats = useMemo(() => {
        const initialStats = {
            total: 0,
            cash: 0,
            card: 0,
            mobile_money: 0,
            check: 0,
        };

        return payments.reduce((acc, payment) => {
            const amount = parseFloat(payment.amount) || 0;
            acc.total += amount;

            switch (payment.payment_method) {
                case "CASH":
                    acc.cash += amount;
                    break;
                case "CARD":
                    acc.card += amount;
                    break;
                case "MOBILE_MONEY":
                    acc.mobile_money += amount;
                    break;
                case "CHECK":
                    acc.check += amount;
                    break;
                default:
                    break;
            }

            return acc;
        }, initialStats);
    }, [payments]);

    return stats;
};

export default usePaymentStats;