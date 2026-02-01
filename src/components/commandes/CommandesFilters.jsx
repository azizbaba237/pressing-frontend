import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

/**
 * Composant Filtres et recherche pour les commandes
 *
 * Permet de rechercher par numéro de commande, client ou téléphone
 * et de filtrer par statut
 */
const CommandesFilters = ({
  searchTerm,
  setSearchTerm,
  filterStatut,
  setFilterStatut,
  statutChoices,
}) => {
  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Barre de recherche */}
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher (N° commande, client, téléphone)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Filtre par statut */}
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="input-field"
          >
            <option value="">Tous les statuts</option>
            {statutChoices.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CommandesFilters;
