import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import { MODE_PAIEMENT_CHOICES } from "../../constants/paymentModes";

const PaiementsFilters = ({
  searchTerm,
  onSearchChange,
  filterMode,
  onFilterModeChange,
  dateDebut,
  onDateDebutChange,
  dateFin,
  onDateFinChange,
  hasActiveFilters,
  resultsCount,
  onResetFilters,
}) => {
  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Recherche */}
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher (N° commande, référence)..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field"
          />
        </div>

        {/* Filtre par mode */}
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterMode}
            onChange={(e) => onFilterModeChange(e.target.value)}
            className="input-field"
          >
            <option value="">Tous les modes</option>
            {MODE_PAIEMENT_CHOICES.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.icon} {mode.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date début */}
        <div>
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => onDateDebutChange(e.target.value)}
            className="input-field"
            placeholder="Date début"
          />
        </div>

        {/* Date fin */}
        <div>
          <input
            type="date"
            value={dateFin}
            onChange={(e) => onDateFinChange(e.target.value)}
            className="input-field"
            placeholder="Date fin"
          />
        </div>
      </div>

      {/* Résultats et réinitialisation */}
      {hasActiveFilters && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {resultsCount} résultat(s) trouvé(s)
          </p>
          <button
            onClick={onResetFilters}
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default PaiementsFilters;
