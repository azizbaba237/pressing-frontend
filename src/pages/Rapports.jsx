import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Alert from "../components/common/Alert";
import Loader from "../components/common/Loader";
import RapportsHeader from "../components/reports/Rapportsheader";
import RapportsTabs from "../components/reports/Rapportstabs";
import OverviewTab from "../components/reports/Overviewtab";
import CommandesTab from "../components/reports/Commandestab";
import PaiementsTab from "../components/reports/Paiementstab";
import ClientsTab from "../components/reports/Clientstab";
import { useRapportsData } from "../hooks/reports/userapportsdata";
import { useRapportsCalculations } from "../hooks/reports/useRapportsCalculations";
import { useAlert } from "../hooks/useAlert";

/**
 * Page principale des rapports et statistiques
 *
 * Responsabilités :
 * - Orchestration des onglets
 * - Gestion de l'état global (période)
 * - Délégation des calculs aux hooks
 */
const Rapports = () => {
  const [periode, setPeriode] = useState("30");
  const [activeTab, setActiveTab] = useState("overview");

  const { alert, showAlert, closeAlert } = useAlert();

  const { orders, payments, customers, stats, loading, fetchAllData } =
    useRapportsData({ showAlert });

  const calculations = useRapportsCalculations({
    orders,
    payments,
    customers,
    periode,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Chargement des rapports..." />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <RapportsHeader periode={periode} onPeriodeChange={setPeriode} />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}

        <RapportsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "overview" && (
          <OverviewTab
            calculations={calculations}
            orders={orders}
            payments={payments}
          />
        )}

        {activeTab === "orders" && (
          <CommandesTab orders={orders} calculations={calculations} />
        )}

        {activeTab === "payments" && (
          <PaiementsTab payments={payments} calculations={calculations} />
        )}

        {activeTab === "customers" && (
          <ClientsTab customers={customers} calculations={calculations} />
        )}
      </div>
    </MainLayout>
  );
};

export default Rapports;
