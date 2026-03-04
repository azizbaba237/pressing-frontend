import React from "react";
import { formatCurrency } from "../../utils/clients";

const StatCard = ({ config, value }) => {
  const { label, color, icon, format } = config;

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    yellow: "bg-yellow-50 text-yellow-600",
    red: "bg-red-50 text-red-600",
  };

  const formattedValue =
    format === "currency" ? formatCurrency(value || 0) : value || 0;

  return (
    <div className={`${colorClasses[color]} rounded-lg p-4`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm opacity-80">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-2xl font-bold">
        {typeof formattedValue === "number"
          ? formattedValue.toLocaleString()
          : formattedValue}
      </p>
    </div>
  );
};

export default StatCard;
