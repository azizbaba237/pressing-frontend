import React from "react";

/**
 * Composant Statistiques des commandes par statut
 * Fichier: src/components/commandes/CommandesStats.jsx
 *
 * Affiche le nombre de commandes pour chaque statut sous forme de cartes
 * Cliquable pour filtrer par statut
 */
const CommandesStats = ({ commandes, statutChoices, onStatutClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {statutChoices.map((status) => {
        const count = commandes.filter((c) => c.status === status.value).length;

        return (
          <div
            key={status.value}
            className="card hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onStatutClick(status.value)}
          >
            <p className="text-sm text-gray-600">{status.label}</p>
            <p className="text-2xl font-bold text-primary-600">{count}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommandesStats;
