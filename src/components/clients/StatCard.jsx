import React from "react";
import { formatCurrency } from "../../utils/clients";

const StatCard = ({ config, value }) => {
  const { label, color, icon, format } = config;

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
    red: "bg-red-50 text-red-600 border-red-100",
  };

  const formattedValue =
    format === "currency" ? formatCurrency(value || 0) : value || 0;

  const displayValue =
    typeof formattedValue === "number"
      ? formattedValue.toLocaleString()
      : formattedValue;

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-3 sm:p-4`}>
      {/* Icône + label */}
      <div className="flex items-center space-x-2 mb-2">
        <span className="text-lg sm:text-xl shrink-0">{icon}</span>
        <p className="text-xs sm:text-sm opacity-80 leading-tight">{label}</p>
      </div>

      {/* Valeur — taille adaptative pour éviter le débordement */}
      <p className="text-lg sm:text-2xl font-bold leading-tight break-all">
        {displayValue}
      </p>
    </div>
  );
};

export default StatCard;
