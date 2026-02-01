import React from "react";
import { FaPlus } from "react-icons/fa";

/**
 * Composant En-tête de la page Commandes
 *
 * Affiche le titre de la page et le bouton de création de commande
 */
const CommandesHeader = ({ onNewCommande }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
        <p className="mt-2 text-gray-600">Gérez les commandes du pressing</p>
      </div>
      <button
        onClick={onNewCommande}
        className="btn-primary flex items-center space-x-2"
      >
        <FaPlus />
        <span>Nouvelle commande</span>
      </button>
    </div>
  );
};

export default CommandesHeader;
