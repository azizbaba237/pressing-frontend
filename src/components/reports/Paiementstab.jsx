import React from "react";
import LineChartCard from "../reports/Linechartcard";
import PieChartCard from "../reports/Piechartcard";
import PaymentMethodBar from "../reports/PaymentMethodBar";
import { CHART_COLORS } from "../../constants/reports";

const PaiementsTab = ({ calculations }) => {
  const { paiementsParJour, paiementsParMode, totalEncaisse } = calculations;

  return (
    <div className="space-y-6">
      {/* Graphique évolution des paiements */}
      <LineChartCard
        title="Évolution des encaissements (FCFA)"
        data={paiementsParJour}
        dataKey="montant"
        color="#10B981"
      />

      {/* Répartition par mode de paiement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard
          title="Répartition par mode de paiement"
          data={paiementsParMode
            .filter((p) => p.total > 0)
            .map((p) => ({ name: p.name, value: p.total }))}
        />

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Détail par mode de paiement
          </h3>
          <div className="space-y-4">
            {paiementsParMode.map((mode, index) => (
              <PaymentMethodBar
                key={index}
                mode={mode}
                total={totalEncaisse}
                color={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaiementsTab;
