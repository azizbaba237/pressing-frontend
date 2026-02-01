import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Composant Historique des paiements d'une commande
 * Fichier: src/components/commandes/CommandePayments.jsx
 *
 * Liste tous les paiements effectués avec détails
 */
const CommandePayments = ({ payments, modePaiementChoices }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Historique des paiements</h3>
      <div className="space-y-2">
        {payments.map((payment) => {
          const modeLabel =
            modePaiementChoices.find((m) => m.value === payment.payment_method)
              ?.label || payment.payment_method;

          return (
            <div
              key={payment.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-semibold">
                  {parseFloat(payment.amount).toLocaleString()} FCFA
                </p>
                <p className="text-sm text-gray-600">{modeLabel}</p>
                {payment.reference && (
                  <p className="text-xs text-gray-500">
                    Réf: {payment.reference}
                  </p>
                )}
                {payment.notes && (
                  <p className="text-xs text-gray-500 italic">
                    {payment.notes}
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  {format(new Date(payment.payment_date), "dd/MM/yyyy", {
                    locale: fr,
                  })}
                </p>
                <p className="text-xs text-gray-400">
                  {format(new Date(payment.payment_date), "HH:mm", {
                    locale: fr,
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommandePayments;
