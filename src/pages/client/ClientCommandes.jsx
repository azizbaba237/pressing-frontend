import React, { useState, useEffect } from "react";
import ClientLayout from "../../components/layout/ClientLayout";
import { clientProfileService } from "../../services/clientApi";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";
import Modal from "../../components/common/Modal";
import {
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaExclamationCircle,
  FaCalendarAlt,
  FaFilter,
  FaSearch,
  FaEye,
} from "react-icons/fa";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ClientCommandes = () => {
  const [orders, setOrders] = useState([]);
  const [filteredCommandes, setFilteredCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [filterStatut, setFilterStatut] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCommande, setSelectedCommande] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const STATUT_CHOICES = [
    { value: "", label: "Tous les statuts", icon: <FaShoppingBag /> },
    {
      value: "EN_ATTENTE",
      label: "En attente",
      icon: <FaClock />,
      color: "yellow",
    },
    { value: "EN_COURS", label: "En cours", icon: <FaTruck />, color: "blue" },
    { value: "PRET", label: "Prêt", icon: <FaCheckCircle />, color: "green" },
    {
      value: "LIVRE",
      label: "Livré",
      icon: <FaCheckCircle />,
      color: "purple",
    },
    {
      value: "ANNULE",
      label: "Annulé",
      icon: <FaExclamationCircle />,
      color: "red",
    },
  ];

  useEffect(() => {
    fetchCommandes();
  }, []);

  useEffect(() => {
    filterCommandes();
  }, [orders, filterStatut, searchTerm]);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const response = await clientProfileService.getMesCommandes();
      setOrders(response.data);
    } catch (error) {
      setAlert({
        type: error,
        message: "Erreur lors du chargement des commandes",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCommandes = () => {
    let filtered = [...orders];

    if (filterStatut) {
      filtered = filtered.filter((c) => c.status === filterStatut);
    }

    if (searchTerm) {
      filtered = filtered.filter((c) =>
        c.order_id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredCommandes(filtered);
  };

  const getStatutInfo = (status) => {
    const statuts = {
      EN_ATTENTE: {
        label: "En attente",
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        icon: <FaClock />,
        gradient: "from-yellow-400 to-orange-500",
      },
      EN_COURS: {
        label: "En cours de traitement",
        color: "bg-blue-100 text-blue-800 border-blue-300",
        icon: <FaTruck />,
        gradient: "from-blue-400 to-blue-600",
      },
      PRET: {
        label: "Prêt à récupérer",
        color: "bg-green-100 text-green-800 border-green-300",
        icon: <FaCheckCircle />,
        gradient: "from-green-400 to-green-600",
      },
      LIVRE: {
        label: "Livré",
        color: "bg-purple-100 text-purple-800 border-purple-300",
        icon: <FaCheckCircle />,
        gradient: "from-purple-400 to-purple-600",
      },
      ANNULE: {
        label: "Annulé",
        color: "bg-red-100 text-red-800 border-red-300",
        icon: <FaExclamationCircle />,
        gradient: "from-red-400 to-red-600",
      },
    };
    return statuts[status] || statuts.EN_ATTENTE;
  };

  const handleViewDetails = (order) => {
    setSelectedCommande(order);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <ClientLayout>
        <Loader text="Chargement de vos commandes..." />
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Mes Commandes</h1>
          <p className="text-blue-100">
            Suivez l'évolution de toutes vos commandes en temps réel
          </p>
        </div>

        {/* Alerts */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher par N° de commande..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-9!"
              />
            </div>

            {/* Filter by status */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400" />
              </div>
              <select
                value={filterStatut}
                onChange={(e) => setFilterStatut(e.target.value)}
                className="input-field pl-9!"
              >
                {STATUT_CHOICES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold">{filteredCommandes.length}</span>{" "}
            commande(s) trouvée(s)
          </div>
        </div>

        {/* Stats by status */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATUT_CHOICES.slice(1).map((status) => {
            const count = orders.filter(
              (c) => c.status === status.value,
            ).length;
            const colorClasses = {
              yellow: "from-yellow-500 to-orange-500",
              blue: "from-blue-500 to-blue-600",
              green: "from-green-500 to-emerald-500",
              purple: "from-purple-500 to-purple-600",
              red: "from-red-500 to-red-600",
            };

            return (
              <button
                key={status.value}
                onClick={() => setFilterStatut(status.value)}
                className={`bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                  filterStatut === status.value ? "ring-4 ring-blue-500" : ""
                }`}
              >
                <div
                  className={`w-12 h-12 bg-linear-to-br ${
                    colorClasses[status.color]
                  } rounded-full flex items-center justify-center mx-auto mb-3`}
                >
                  <span className="text-white text-xl">{status.icon}</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{count}</p>
                <p className="text-xs text-gray-600 mt-1">{status.label}</p>
              </button>
            );
          })}
        </div>

        {/* Commandes List */}
        {filteredCommandes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-24 h-24 bg-linear-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaShoppingBag className="text-5xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune commande trouvée
            </h3>
            <p className="text-gray-600">
              {searchTerm || filterStatut
                ? "Essayez de modifier vos filtres"
                : "Vous n'avez pas encore passé de commande"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCommandes.map((order) => {
              const statutInfo = getStatutInfo(order.status);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Status Bar */}
                  <div
                    className={`h-2 bg-linear-to-r ${statutInfo.gradient}`}
                  ></div>

                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                      {/* Left Section */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="font-mono font-bold text-xl text-gray-900">
                            {order.order_id}
                          </span>
                          <span
                            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${statutInfo.color}`}
                          >
                            {statutInfo.icon}
                            <span>{statutInfo.label}</span>
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>
                              Déposé le{" "}
                              {format(
                                new Date(order.deposit_date),
                                "dd MMMM yyyy à HH:mm",
                                {
                                  locale: fr,
                                },
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaClock className="text-green-500" />
                            <span>
                              Promis le{" "}
                              {format(
                                new Date(order.due_date),
                                "dd MMMM yyyy à HH:mm",
                                { locale: fr },
                              )}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FaShoppingBag className="text-purple-500" />
                            <span>{order.items?.length || 0} article(s)</span>
                          </div>
                          {order.date_retrait && (
                            <div className="flex items-center space-x-2">
                              <FaCheckCircle className="text-green-500" />
                              <span>
                                Retiré le{" "}
                                {format(
                                  new Date(order.date_retrait),
                                  "dd MMMM yyyy",
                                  { locale: fr },
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Section */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:ml-6">
                        <div className="text-right">
                          <p className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {parseFloat(order.total_amount).toLocaleString()}{" "}
                            FCFA
                          </p>
                          {parseFloat(order.due_amount) > 0 ? (
                            <p className="text-sm text-red-600 font-semibold mt-1">
                              Reste à payer:{" "}
                              {parseFloat(order.due_amount).toLocaleString()}{" "}
                              FCFA
                            </p>
                          ) : (
                            <p className="text-sm text-green-600 font-semibold mt-1 flex items-center justify-end space-x-1">
                              <FaCheckCircle />
                              <span>Payé</span>
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => handleViewDetails(order)}
                          className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
                        >
                          <FaEye />
                          <span>Détails</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Détails */}
        <Modal
          isOpen={showDetailModal}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedCommande(null);
          }}
          title="Détails de la commande"
          size="xl"
        >
          {selectedCommande && (
            <div className="space-y-6">
              {/* Status */}
              <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      Numéro de commande
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {selectedCommande.order_id}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold border-2 ${
                      getStatutInfo(selectedCommande.statut).color
                    }`}
                  >
                    {getStatutInfo(selectedCommande.status).icon}
                    <span>{getStatutInfo(selectedCommande.status).label}</span>
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Chronologie
                </h3>
                <div className="space-y-4">
                  <TimelineItem
                    icon={<FaCalendarAlt />}
                    label="Déposé"
                    date={selectedCommande.deposit_date}
                    completed={true}
                  />
                  <TimelineItem
                    icon={<FaTruck />}
                    label="En traitement"
                    completed={["EN_COURS", "PRET", "LIVRE"].includes(
                      selectedCommande.status,
                    )}
                  />
                  <TimelineItem
                    icon={<FaCheckCircle />}
                    label="Prêt"
                    date={selectedCommande.due_date}
                    completed={["PRET", "LIVRE"].includes(
                      selectedCommande.status,
                    )}
                  />
                  {selectedCommande.date_retrait && (
                    <TimelineItem
                      icon={<FaCheckCircle />}
                      label="Retiré"
                      date={selectedCommande.delivered_date}
                      completed={true}
                    />
                  )}
                </div>
              </div>

              {/* Articles */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Articles
                </h3>
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Quantité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Prix unitaire
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedCommande.items?.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 text-sm">
                            <p className="font-semibold text-gray-900">
                              {item.name}
                            </p>
                            {item.description && (
                              <p className="text-gray-500 text-xs mt-1">
                                {item.description}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {parseFloat(item.unit_price).toLocaleString()} FCFA
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            {parseFloat(item.total_price).toLocaleString()} FCFA
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Résumé des paiements
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Montant total:</span>
                    <span className="font-semibold">
                      {parseFloat(
                        selectedCommande.total_amount,
                      ).toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Montant payé:</span>
                    <span className="font-semibold text-green-600">
                      {parseFloat(
                        selectedCommande.amount_paid,
                      ).toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 border-t pt-2">
                    <span>Reste à payer:</span>
                    <span
                      className={
                        parseFloat(selectedCommande.due_amount) > 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {parseFloat(selectedCommande.due_amount).toLocaleString()}{" "}
                      FCFA
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedCommande.notes && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    Notes
                  </h3>
                  <p className="text-sm text-blue-800">
                    {selectedCommande.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </ClientLayout>
  );
};

// Timeline Item Component
const TimelineItem = ({ icon, label, date, completed }) => (
  <div className="flex items-center space-x-4">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${
        completed
          ? "bg-linear-to-br from-green-500 to-emerald-500 text-white"
          : "bg-gray-200 text-gray-400"
      }`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <p
        className={`font-semibold ${completed ? "text-gray-900" : "text-gray-400"}`}
      >
        {label}
      </p>
      {date && (
        <p className="text-sm text-gray-600">
          {format(new Date(date), "dd MMMM yyyy à HH:mm", { locale: fr })}
        </p>
      )}
    </div>
    {completed && <FaCheckCircle className="text-green-500" />}
  </div>
);

export default ClientCommandes;
