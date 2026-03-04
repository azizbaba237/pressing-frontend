import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { PERIODE_OPTIONS } from "../../constants/reports";

const RapportsHeader = ({ periode, onPeriodeChange }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Rapports & Statistiques
        </h1>
        <p className="mt-1 text-sm text-gray-600">Analyse des activités</p>
      </div>

      <div className="flex items-center space-x-2">
        <FaCalendarAlt className="text-gray-400 shrink-0" />
        <select
          value={periode}
          onChange={(e) => onPeriodeChange(e.target.value)}
          className="input-field w-full sm:w-auto text-sm"
        >
          {PERIODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default RapportsHeader;
