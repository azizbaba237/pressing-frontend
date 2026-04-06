import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { customerService } from "../services/orderService";
import Alert from "../components/common/Alert";
import ClientsHeader from "../components/clients/ClientsHeader";
import ClientsSearch from "../components/clients/ClientsSearch";
import ClientsTable from "../components/clients/ClientsTable";
import ClientFormModal from "../components/clients/ClientFormModal";
import ClientDetailsModal from "../components/clients/ClientDetailsModal";
import { useClientForm } from "../hooks/clients/useClientForm";
import { useAlert } from "../hooks/useAlert";

const Clients = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientStats, setClientStats] = useState(null);

  const { alert, showAlert, closeAlert } = useAlert();

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await customerService.getAll({ search: searchTerm });
      setClients(res.data);
    } catch (error) {
      showAlert(error, "Erreur lors du chargement des clients");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientStats = async (id) => {
    try {
      const res = await customerService.getStatistics(id);
      setClientStats(res.data);
    } catch (err) {
      console.error("Erreur stats client:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce client ?")) return;
    try {
      await customerService.delete(id);
      showAlert("success", "Client supprimé avec succès");
      fetchClients();
    } catch (err) {
      showAlert(err, "Erreur lors de la suppression");
    }
  };

  // ✅ Recharge quand searchTerm change
  useEffect(() => {
    fetchClients();
  }, [searchTerm]);

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
