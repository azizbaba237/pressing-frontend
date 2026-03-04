import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Alert from "../components/common/Alert";
import ClientsHeader from "../components/clients/ClientsHeader";
import ClientsSearch from "../components/clients/ClientsSearch";
import ClientsTable from "../components/clients/ClientsTable";
import ClientFormModal from "../components/clients/ClientFormModal";
import ClientDetailsModal from "../components/clients/ClientDetailsModal";
import { useClientsData } from "../hooks/clients/useClientsData";
import { useClientForm } from "../hooks/clients/useClientForm";
import { useAlert } from "../hooks/useAlert";

/**
 * Page principale de gestion des clients
 *
 * Responsabilités :
 * - Orchestration des composants
 * - Gestion des modales
 * - Coordination entre les hooks
 */
const Clients = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { alert, showAlert, closeAlert } = useAlert();

  const {
    clients,
    loading,
    selectedClient,
    clientStats,
    setSelectedClient,
    fetchClients,
    fetchClientStats,
    handleDelete,
  } = useClientsData({ searchTerm, showAlert });

  const { formData, handleChange, handleSubmit, handleEdit, resetForm } =
    useClientForm({
      showAlert,
      fetchClients,
      setShowModal,
      setSelectedClient,
    });

  const handleViewDetails = async (client) => {
    setSelectedClient(client);
    await fetchClientStats(client.id);
    setShowDetailModal(true);
  };

  const handleCloseFormModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedClient(null);
  };

  const handleNewClient = () => {
    resetForm();
    setShowModal(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <ClientsHeader onNewClient={handleNewClient} />

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}

        <ClientsSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <ClientsTable
          clients={clients}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />

        <ClientFormModal
          isOpen={showModal}
          onClose={handleCloseFormModal}
          selectedClient={selectedClient}
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <ClientDetailsModal
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
          client={selectedClient}
          stats={clientStats}
        />
      </div>
    </MainLayout>
  );
};

export default Clients;
