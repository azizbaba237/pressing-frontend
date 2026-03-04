import React from "react";
import {
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaChartPie,
} from "react-icons/fa";
import KPICard from "./Kpicard";
import AreaChartCard from "./Areachartcard";
import PieChartCard from "./Piechartcard";

const OverviewTab = ({ calculations, orders }) => {
  const {
    chiffreAffaires,
    totalEncaisse,
    montantImpaye,
    commandesParJour,
    commandesParStatut,
  } = calculations;

  return (
    <div className="space-y-6">
      {/* KPIs : 2 colonnes sur mobile, 4 sur grand écran */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <KPICard
          title="Total Commandes"
          value={orders.length}
          subtitle="Sur la période"
          icon={FaShoppingCart}
          gradient="from-blue-500 to-blue-600"
        />
        <KPICard
          title="Chiffre d'Affaires"
          value={chiffreAffaires.toLocaleString()}
          subtitle="FCFA"
          icon={FaMoneyBillWave}
          gradient="from-green-500 to-green-600"
        />
        <KPICard
          title="Total Encaissé"
          value={totalEncaisse.toLocaleString()}
          subtitle="FCFA"
          icon={FaChartLine}
          gradient="from-yellow-500 to-yellow-600"
        />
        <KPICard
          title="Montant Impayé"
          value={montantImpaye.toLocaleString()}
          subtitle="FCFA"
          icon={FaChartPie}
          gradient="from-red-500 to-red-600"
        />
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <AreaChartCard
          title="Évolution des commandes"
          data={commandesParJour}
          dataKey="commandes"
          color="#3B82F6"
        />
        <PieChartCard
          title="Répartition par statut"
          data={commandesParStatut}
        />
      </div>
    </div>
  );
};

export default OverviewTab;
