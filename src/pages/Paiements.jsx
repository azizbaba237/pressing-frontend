import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import Alert from "../components/common/Alert";
import PaiementsHeader from "../components/paiements/PaiementsHeader";
import PaiementsStats from "../components/paiements/PaiementsStats";
import PaiementsFilters from "../components/paiements/PaiementsFilters";
import PaiementsTable from "../components/paiements/PaiementsTable";
import { usePaiementsData } from "../hooks/usePaiementsData";
import { useAlert } from "../hooks/useAlert";
import { usePaymentStats } from "../hooks/usePaymentStats";

/**
 * Page principale de gestion des paiements
 *
 * Responsabilités :
 * - Orchestration des composants enfants
 * - Gestion de l'état local (filtres)
 * - Délégation de la logique métier aux hooks
 */
const Paiements = () => {
  // État local des filtres
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  // Hooks personnalisés
  const { alert, showAlert, closeAlert } = useAlert();
  const { payments, loading, fetchPaiements } = usePaiementsData({
    searchTerm,
    filterMode,
    dateDebut,
    dateFin,
    showAlert,
  });
  const stats = usePaymentStats(payments);

  // Effet pour charger les données
  useEffect(() => {
    fetchPaiements();
  }, [searchTerm, filterMode, dateDebut, dateFin]);

  // Handlers
  const handleExportPDF = () => {
    showAlert("info", "Fonctionnalité d'export PDF en développement");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setFilterMode("");
    setDateDebut("");
    setDateFin("");
  };

  const hasActiveFilters = searchTerm || filterMode || dateDebut || dateFin;

  return (
    <MainLayout>
      <div className="space-y-6">
        <PaiementsHeader onExport={handleExportPDF} />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}

        <PaiementsStats stats={stats} payments={payments} />

        <PaiementsFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterMode={filterMode}
          onFilterModeChange={setFilterMode}
          dateDebut={dateDebut}
          onDateDebutChange={setDateDebut}
          dateFin={dateFin}
          onDateFinChange={setDateFin}
          hasActiveFilters={hasActiveFilters}
          resultsCount={payments.length}
          onResetFilters={handleResetFilters}
        />

        <PaiementsTable payments={payments} loading={loading} />
      </div>
    </MainLayout>
  );
};

export default Paiements;
