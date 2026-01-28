import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  commandeService,
  clientService,
  serviceService,
} from "../services/api";
import Table from "../components/common/Table";
import Modal from "../components/common/Modal";
import Alert from "../components/common/Alert";
import Loader from "../components/common/Loader";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
  FaMoneyBillWave,
  FaCheck,
  FaTruck,
  FaClock,
  FaFilter,
} from "react-icons/fa";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Commandes = () => {
  const [commandes, setCommandes] = useState([]);
  const [clients, setClients] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showPaiementModal, setShowPaiementModal] = useState(false);
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatut, setFilterStatut] = useState("");
  const [alert, setAlert] = useState(null);

  // État du formulaire de commande
  const [formData, setFormData] = useState({
    customer: "",
    due_date: "",
    notes: "",
    items: [{ service_id: "", quantity: 1, description: "" }],
  });

  // État du formulaire de paiement
  const [paiementData, setPaiementData] = useState({
    amount: "",
    payment_method: "CASH",
    reference: "",
    notes: "",
  });

  const STATUT_CHOICES = [
    { value: "PENDING", label: "En attente", color: "yellow" },
    { value: "IN_PROCESS", label: "En cours", color: "blue" },
    { value: "READY", label: "Prêt", color: "green" },
    { value: "DELIVERED", label: "Livré", color: "purple" },
    { value: "CANCELED", label: "Annulé", color: "red" },
  ];

  const MODE_PAIEMENT_CHOICES = [
    { value: "CAHS", label: "Espèces" },
    { value: "CARTE", label: "Carte bancaire" },
    { value: "MOBILE", label: "Mobile money" },
    { value: "CHEQUE", label: "Chèque" },
  ];

  useEffect(() => {
    fetchCommandes();
    fetchClients();
    fetchServices();
  }, [searchTerm, filterStatut]);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filterStatut) params.statut = filterStatut;

      const response = await commandeService.getAll(params);
      setCommandes(response.data.results || response.data);
    } catch (error) {
      showAlert("error", "Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await clientService.getAll({ actif: true });
      setClients(response.data.results || response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des clients:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await serviceService.getAll({ actif: true });
      setServices(response.data.results || response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des services:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.client) {
      showAlert("error", "Veuillez sélectionner un client");
      return;
    }

    if (!formData.date_promesse) {
      showAlert("error", "Veuillez sélectionner une date de promesse");
      return;
    }

    if (formData.items.length === 0 || !formData.items[0].service_id) {
      showAlert("error", "Veuillez ajouter au moins un article");
      return;
    }

    try {
      await commandeService.create(formData);
      showAlert("success", "Commande créée avec succès");
      setShowModal(false);
      resetForm();
      fetchCommandes();
    } catch (error) {
      showAlert(
        "error",
        error.response?.data?.message || "Erreur lors de la création",
      );
    }
  };

  const handleChangerStatut = async (commandeId, nouveauStatut) => {
    try {
      await commandeService.changerStatut(commandeId, nouveauStatut);
      showAlert("success", "Statut modifié avec succès");
      fetchCommandes();
      if (showDetailModal) {
        const response = await commandeService.getById(commandeId);
        setSelectedCommande(response.data);
      }
    } catch (error) {
      showAlert("error", "Erreur lors du changement de statut");
    }
  };

  const handleAjouterPaiement = async (e) => {
    e.preventDefault();

    if (!paiementData.amount || parseFloat(paiementData.amount) <= 0) {
      showAlert("error", "Veuillez entrer un montant valide");
      return;
    }

    try {
      await commandeService.ajouterPaiement(selectedCommande.id, paiementData);
      showAlert("success", "Paiement ajouté avec succès");
      setShowPaiementModal(false);
      resetPaiementForm();
      fetchCommandes();

      // Recharger les détails de la commande
      const response = await commandeService.getById(selectedCommande.id);
      setSelectedCommande(response.data);
    } catch (error) {
      showAlert("error", "Erreur lors de l'ajout du paiement");
    }
  };

  const handleDelete = async (order) => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer la commande ${order.order_id} ?`,
      )
    ) {
      try {
        await commandeService.delete(order.id);
        showAlert("success", "Commande supprimée avec succès");
        fetchCommandes();
      } catch (error) {
        showAlert("error", "Erreur lors de la suppression");
      }
    }
  };

  const handleViewDetails = async (order) => {
    try {
      const response = await commandeService.getById(order.id);
      setSelectedCommande(response.data);
      setShowDetailModal(true);
    } catch (error) {
      showAlert("error", "Erreur lors du chargement des détails");
    }
  };

  const addArticle = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { service_id: "", quantity: 1, description: "" },
      ],
    });
  };

  const removeArticle = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const updateArticle = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const resetForm = () => {
    setFormData({
      customer: "",
      due_date: "",
      notes: "",
      items: [{ service_id: "", quantity: 1, description: "" }],
    });
  };

  const resetPaiementForm = () => {
    setPaiementData({
      amount: "",
      payment_method: "CASH",
      reference: "",
      notes: "",
    });
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const getStatutBadge = (status) => {
    const statutInfo = STATUT_CHOICES.find((s) => s.value === status);
    const colorClasses = {
      yellow: "badge-warning",
      blue: "badge-info",
      green: "badge-success",
      purple: "bg-purple-100 text-purple-800",
      red: "badge-danger",
    };

    return (
      <span
        className={`${colorClasses[statutInfo?.color]} inline-flex items-center`}
      >
        {statutInfo?.label || statut}
      </span>
    );
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      const service = services.find((s) => s.id === parseInt(item.service_id));
      if (service) {
        return total + parseFloat(service.prix) * parseInt(item.quantity || 1);
      }
      return total;
    }, 0);
  };

  const columns = [
    { header: "N° Commande", accessor: "order_id" },
    {
      header: "Client",
      accessor: "customer",
      render: (row) =>
        row.customer_detail
          ? `${row.customer_detail.first_name} ${row.customer_detail.last_name}`
          : "-",
    },
    {
      header: "Date dépôt",
      accessor: "deposit_date",
      render: (row) =>
        format(new Date(row.deposit_date), "dd/MM/yyyy HH:mm", { locale: fr }),
    },
    {
      header: "Date promesse",
      accessor: "due_date",
      render: (row) =>
        format(new Date(row.due_date), "dd/MM/yyyy HH:mm", { locale: fr }),
    },
    {
      header: "Statut",
      accessor: "status",
      render: (row) => getStatutBadge(row.status),
    },
    {
      header: "Montant",
      accessor: "total_amount",
      render: (row) => `${parseFloat(row.total_amount).toLocaleString()} FCFA`,
    },
    {
      header: "Payé",
      accessor: "amount_paid",
      render: (row) => (
        <span
          className={
            row.is_paid
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {parseFloat(row.amount_paid).toLocaleString()} FCFA
        </span>
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
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Commandes</h1>
            <p className="mt-2 text-gray-600">
              Gérez les commandes du pressing
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Nouvelle commande</span>
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

        {/* Filtres et recherche */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher (N° commande, client, téléphone)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="input-field"
              >
                <option value="">Tous les statuts</option>
                {STATUT_CHOICES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Résumé des statuts */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {STATUT_CHOICES.map((status) => {
            const count = commandes.filter(
              (c) => c.status === status.value,
            ).length;
            return (
              <div
                key={status.value}
                className="card hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setFilterStatut(status.value)}
              >
                <p className="text-sm text-gray-600">{status.label}</p>
                <p className="text-2xl font-bold text-primary-600">{count}</p>
              </div>
            );
          })}
        </div>

        {/* Table des commandes */}
        <div className="card">
          <Table
            columns={columns}
            data={commandes}
            loading={loading}
            onRowClick={handleViewDetails}
          />
        </div>

        {/* Modal Nouvelle Commande */}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          title="Nouvelle commande"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client *
                </label>
                <select
                  required
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({ ...formData, customer: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="">Sélectionnez un client</option>
                  {clients.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name} -{" "}
                      {customer.phone}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de promesse *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={formData.date_promesse}
                  onChange={(e) =>
                    setFormData({ ...formData, date_promesse: e.target.value })
                  }
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                rows="2"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="input-field"
                placeholder="Instructions spéciales, remarques..."
              ></textarea>
            </div>

            {/* Articles */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Articles *
                </label>
                <button
                  type="button"
                  onClick={addArticle}
                  className="text-primary-600 hover:text-primary-800 text-sm flex items-center space-x-1"
                >
                  <FaPlus />
                  <span>Ajouter un article</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-2 items-start p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="col-span-5">
                      <select
                        required
                        value={item.service_id}
                        onChange={(e) =>
                          updateArticle(index, "service_id", e.target.value)
                        }
                        className="input-field"
                      >
                        <option value="">Sélectionnez un service</option>
                        {services.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name} - {service.price} FCFA
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <input
                        type="number"
                        min="1"
                        required
                        value={item.quantity}
                        onChange={(e) =>
                          updateArticle(index, "quantity", e.target.value)
                        }
                        className="input-field"
                        placeholder="Qté"
                      />
                    </div>

                    <div className="col-span-4">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          updateArticle(index, "description", e.target.value)
                        }
                        className="input-field"
                        placeholder="Description (couleur, état...)"
                      />
                    </div>

                    <div className="col-span-1 flex items-center justify-center">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArticle(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total estimé */}
            <div className="bg-primary-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">
                  Total estimé:
                </span>
                <span className="text-2xl font-bold text-primary-600">
                  {calculateTotal().toLocaleString()} FCFA
                </span>
              </div>
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
                Créer la commande
              </button>
            </div>
          </form>
        </Modal>

        {/* Modal Détails Commande */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCommande(null);
          }}
          title={`Commande ${selectedCommande?.order_id || ""}`}
          size="xl"
        >
          {selectedCommande && (
            <div className="space-y-6">
              {/* Informations générales */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Client</p>
                  <p className="font-semibold">
                    {selectedCommande.customer_detail?.first_name}{" "}
                    {selectedCommande.customer_detail?.last_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedCommande.customer_detail?.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Statut</p>
                  <div className="mt-1">
                    {getStatutBadge(selectedCommande.status)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date de dépôt</p>
                  <p className="font-semibold">
                    {format(
                      new Date(selectedCommande.deposit_date),
                      "dd/MM/yyyy à HH:mm",
                      {
                        locale: fr,
                      },
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date de promesse</p>
                  <p className="font-semibold">
                    {format(
                      new Date(selectedCommande.due_date),
                      "dd/MM/yyyy à HH:mm",
                      {
                        locale: fr,
                      },
                    )}
                  </p>
                </div>
              </div>

              {/* Articles */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Articles</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Service
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Quantité
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Prix unitaire
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Total
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedCommande.items?.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm">
                            {item.service_name}
                          </td>
                          <td className="px-4 py-3 text-sm">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm">
                            {parseFloat(item.unit_price).toLocaleString()} FCFA
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold">
                            {parseFloat(item.total_price).toLocaleString()} FCFA
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-500">
                            {item.description || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Résumé financier */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant total:</span>
                  <span className="font-semibold">
                    {parseFloat(selectedCommande.total_amount).toLocaleString()}{" "}
                    FCFA
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant payé:</span>
                  <span className="font-semibold text-green-600">
                    {parseFloat(selectedCommande.amount_paid).toLocaleString()}{" "}
                    FCFA
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-900 font-semibold">
                    Reste à payer:
                  </span>
                  <span className="text-xl font-bold text-red-600">
                    {parseFloat(
                      selectedCommande.pending_amount,
                    ).toLocaleString()}{" "}
                    FCFA
                  </span>
                </div>
              </div>

              {/* Paiements */}
              {selectedCommande.payments &&
                selectedCommande.payments.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Historique des paiements
                    </h3>
                    <div className="space-y-2">
                      {selectedCommande.payments.map((payment) => (
                        <div
                          key={payment.id}
                          className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold">
                              {parseFloat(payment.amount).toLocaleString()} FCFA
                            </p>
                            <p className="text-sm text-gray-600">
                              {
                                MODE_PAIEMENT_CHOICES.find(
                                  (m) => m.value === payment.payment_method,
                                )?.label
                              }
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {format(
                              new Date(payment.payment_date),
                              "dd/MM/yyyy HH:mm",
                              {
                                locale: fr,
                              },
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowPaiementModal(true);
                  }}
                  className="btn-primary flex items-center space-x-2"
                  disabled={selectedCommande.est_paye}
                >
                  <FaMoneyBillWave />
                  <span>Ajouter un paiement</span>
                </button>

                {selectedCommande.statut !== "LIVRE" && (
                  <select
                    value={selectedCommande.status}
                    onChange={(e) =>
                      handleChangerStatut(selectedCommande.id, e.target.value)
                    }
                    className="input-field"
                  >
                    {STATUT_CHOICES.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          )}
        </Modal>

        {/* Modal Ajouter Paiement */}
        <Modal
          isOpen={showPaiementModal}
          onClose={() => {
            setShowPaiementModal(false);
            resetPaiementForm();
          }}
          title="Ajouter un paiement"
          size="md"
        >
          <form onSubmit={handleAjouterPaiement} className="space-y-4">
            {selectedCommande && (
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600">Reste à payer:</p>
                <p className="text-2xl font-bold text-blue-600">
                  {parseFloat(selectedCommande.due_amount).toLocaleString()}{" "}
                  FCFA
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Montant *
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                value={paiementData.amount}
                onChange={(e) =>
                  setPaiementData({ ...paiementData, amount: e.target.value })
                }
                className="input-field"
                placeholder="Montant en FCFA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mode de paiement *
              </label>
              <select
                required
                value={paiementData.payment_method}
                onChange={(e) =>
                  setPaiementData({
                    ...paiementData,
                    payment_method: e.target.value,
                  })
                }
                className="input-field"
              >
                {MODE_PAIEMENT_CHOICES.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Référence
              </label>
              <input
                type="text"
                value={paiementData.reference}
                onChange={(e) =>
                  setPaiementData({
                    ...paiementData,
                    reference: e.target.value,
                  })
                }
                className="input-field"
                placeholder="Numéro de transaction, chèque..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                rows="2"
                value={paiementData.notes}
                onChange={(e) =>
                  setPaiementData({ ...paiementData, notes: e.target.value })
                }
                className="input-field"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowPaiementModal(false);
                  resetPaiementForm();
                }}
                className="btn-secondary"
              >
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                Enregistrer le paiement
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default Commandes;
