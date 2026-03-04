import React from "react";
import StatCard from "./StatCard";
import { STATS_CONFIG } from "../../constants/clients";

const ClientStats = ({ stats }) => {
  return (
    <div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3">
        Statistiques
      </h3>
      {/* grid-cols-2 même sur mobile car les cards sont compactes */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {STATS_CONFIG.map((config) => (
          <StatCard
            key={config.key}
            config={config}
            value={stats[config.key]}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientStats;
