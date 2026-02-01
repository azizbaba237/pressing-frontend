import React from "react";

/**
 * Composant Résumé financier d'une commande
 * Fichier: src/components/commandes/CommandeFinancial.jsx
 *
 * Affiche le montant total, payé et reste à payer
 */
const CommandeFinancial = ({ commande }) => {
  // Calculer le reste à payer
  const resteAPayer =
    parseFloat(commande.total_amount) - parseFloat(commande.amount_paid);

  return (
    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
      <div className="flex justify-between">
        <span className="text-gray-600">Montant total:</span>
        <span className="font-semibold">
          {parseFloat(commande.total_amount).toLocaleString()} FCFA
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">Montant payé:</span>
        <span className="font-semibold text-green-600">
          {parseFloat(commande.amount_paid).toLocaleString()} FCFA
        </span>
      </div>

      <div className="flex justify-between border-t pt-2">
        <span className="text-gray-900 font-semibold">Reste à payer:</span>
        <span
          className={`text-xl font-bold ${resteAPayer > 0 ? "text-red-600" : "text-green-600"}`}
        >
          {resteAPayer.toLocaleString()} FCFA
        </span>
      </div>

      {commande.is_paid && (
        <div className="flex items-center justify-center pt-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            ✓ Commande payée
          </span>
        </div>
      )}
    </div>
  );
};

export default CommandeFinancial;
