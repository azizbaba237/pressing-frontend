import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { PERIODE_OPTIONS } from "../../constants/reports";

const RapportsHeader = ({ periode, onPeriodeChange }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Rapports & Statistiques
        </h1>
        <p className="mt-2 text-gray-600">Analyse de votre activité</p>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FaCalendarAlt className="text-gray-400" />
          <select
            value={periode}
            onChange={(e) => onPeriodeChange(e.target.value)}
            className="input-field w-auto"
          >
            {PERIODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RapportsHeader;
