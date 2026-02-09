import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { clientService } from "../services/api";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Alert from "../components/common/Alert";
import Loader from "../components/common/Loader";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye } from "react-icons/fa";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientStats, setClientStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [alert, setAlert] = useState(null);
  const [formData, setFormData] = useState({
    last_name: "",
    first_name: "",
    phone: "",
    email: "",
    adresse: "",
    actif: true,
  });

  useEffect(() => {
    const timeout = setTimeout(fetchClients, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const params = searchTerm ? { search: searchTerm } : {};
      const response = await clientService.getAll(params);
      const data = response.data?.results ?? response.data ?? [];
      setClients(data);
    } catch (error) {
      showAlert(error, "Erreur lors du chargement des clients");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientStats = async (clientId) => {
    try {
      const response = await clientService.getStatistiques(clientId);
      setClientStats(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedClient) {
        await clientService.update(selectedClient.id, formData);
        showAlert("success", "Client modifié avec succès");
      } else {
        await clientService.create(formData);
        showAlert("success", "Client ajouté avec succès");
      }
      setShowModal(false);
      resetForm();
      fetchClients();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la sauvegarde",
      );
    }
  };

  const handleEdit = (customer) => {
    setSelectedClient(customer);
    setFormData({
      last_name: customer.last_name,
      first_name: customer.first_name,
      phone: customer.phone,
      email: customer.email || "",
      adresse: customer.adresse || "",
      actif: customer.actif,
    });
    setShowModal(true);
  };

  const handleDelete = async (customer) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer ${customer.first_name} ${customer.last_name} ?`,
      )
    ) {
      try {
        await clientService.delete(customer.id);
        showAlert("success", "Client supprimé avec succès");
        fetchClients();
      } catch (error) {
        showAlert(error, "Erreur lors de la suppression");
      }
    }
  };

  const handleViewDetails = async (customer) => {
    setSelectedClient(customer);
    await fetchClientStats(customer.id);
    setShowDetailModal(true);
  };

  const resetForm = () => {
    setSelectedClient(null);
    setFormData({
      last_name: "",
      first_name: "",
      phone: "",
      email: "",
      adresse: "",
      actif: true,
    });
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const columns = [
    {
      header: "Nom complet",
      accessor: "last_name",
      render: (row) => `${row.last_name} ${row.first_name}`,
    },
    { header: "Téléphone", accessor: "phone" },
    { header: "Email", accessor: "email", render: (row) => row.email || "-" },
    {
      header: "Statut",
      accessor: "actif",
      render: (row) =>
        row.actif ? (
          <span className="badge-success">Actif</span>
        ) : (
          <span className="badge-danger">Inactif</span>
        ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails(row);
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Voir détails"
          >
            <FaEye />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(row);
            }}
            className="text-green-600 hover:text-green-800"
            title="Modifier"
          >
            <FaEdit />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row);
            }}
            className="text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6 ">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="mt-2 text-gray-600">Gérez vos clients</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-primary flex items-center space-x-2 text-sm md:text-base"
          >
            <FaPlus />
            <span className="hidden sm:inline">Nouveau client</span>
            <span className="sm:hidden">Nouveau</span>
          </button>
        </div>

        {/* Alertes */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Barre de recherche */}
        <div className="card">
          <div className="flex items-center space-x-2">
            <FaSearch className="text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field text-sm md:text-base"
            />
          </div>
        </div>

        {/* Table des clients */}
        <div className="card">
          <Table columns={columns} data={clients} loading={loading} />
        </div>

        {/* Modal Formulaire */}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          title={selectedClient ? "Modifier le client" : "Nouveau client"}
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="input-field"
                placeholder="+237 6XX XXX XXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <textarea
                rows="3"
                value={formData.adresse}
                onChange={(e) =>
                  setFormData({ ...formData, adresse: e.target.value })
                }
                className="input-field"
              ></textarea>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="actif"
                checked={formData.actif}
                onChange={(e) =>
                  setFormData({ ...formData, actif: e.target.checked })
                }
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label
                htmlFor="actif"
                className="ml-2 block text-sm text-gray-900"
              >
                Client actif
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                {selectedClient ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </Modal>

        {/* Modal Détails Client */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedClient(null);
            setClientStats(null);
          }}
          title="Détails du client"
          size="lg"
        >
          {selectedClient && (
            <div className="space-y-6">
              {/* Informations du client */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-semibold">{`${selectedClient.last_name} ${selectedClient.first_name}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-semibold">{selectedClient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{selectedClient.email || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <p>
                    {selectedClient.actif ? (
                      <span className="badge-success">Actif</span>
                    ) : (
                      <span className="badge-danger">Inactif</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Statistiques */}
              {clientStats ? (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Total commandes</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {clientStats.total_orders}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Commandes livrées</p>
                      <p className="text-2xl font-bold text-green-600">
                        {clientStats.orders_delivered}
                      </p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">Total dépensé</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {(clientStats.total_amount_spent ?? 0).toLocaleString()}{" "}
                        FCFA
                      </p>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4">
                      <p className="text-sm text-gray-600">
                        Montant en attente
                      </p>
                      <p className="text-2xl font-bold text-red-600">
                        {(clientStats.amount_pending ?? 0).toLocaleString()}{" "}
                        FCFA
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Loader size="small" text="Chargement des statistiques..." />
              )}
            </div>
          )}
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Clients;
