import React from "react";

const KPICard = ({ title, value, subtitle, icon: Icon, gradient }) => {
  const gradientClass = gradient || "from-blue-500 to-blue-600";

  return (
    <div
      className={`rounded-xl bg-gradient-to-br ${gradientClass} text-white p-3 sm:p-4 lg:p-5 shadow-md`}
    >
      {/* Icône + titre sur la même ligne */}
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <p className="text-xs sm:text-sm opacity-90 leading-tight font-medium">
          {title}
        </p>
        {Icon && (
          <div className="bg-white bg-opacity-20 rounded-lg p-1.5 sm:p-2 shrink-0 ml-2">
            <Icon className="text-sm sm:text-base lg:text-xl text-white" />
          </div>
        )}
      </div>

      {/* Valeur principale */}
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight break-all">
        {value}
      </p>

      {/* Sous-titre */}
      {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
    </div>
  );
};

export default KPICard;
