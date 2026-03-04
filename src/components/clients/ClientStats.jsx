import React from "react";
import StatCard from "./StatCard";
import { STATS_CONFIG } from "../../constants/clients";

const ClientStats = ({ stats }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
      <div className="grid grid-cols-2 gap-4">
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
