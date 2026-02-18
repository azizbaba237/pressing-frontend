import React from "react";

const KPICard = ({ title, value, subtitle, icon: Icon, gradient }) => {
  const gradientClass = gradient || "from-blue-500 to-blue-600";

  return (
    <div className={`card bg-gradient-to-br ${gradientClass} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && <p className="text-xs opacity-75 mt-1">{subtitle}</p>}
        </div>
        {Icon && <Icon className="text-5xl opacity-30" />}
      </div>
    </div>
  );
};

export default KPICard;
