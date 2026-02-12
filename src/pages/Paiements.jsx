import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { paiementService } from "../services/api";
import Table from "../components/common/Table";
import Alert from "../components/common/Alert";
import Loader from "../components/common/Loader";
import {
  FaSearch,
  FaFilter,
  FaMoneyBillWave,
  FaFileExport,
} from "react-icons/fa";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Paiements = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [alert, setAlert] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    cash: 0,
    card: 0,
    mobile_money: 0,
    check: 0,
  });

  const MODE_PAIEMENT_CHOICES = [
    { value: "CASH", label: "Espèces", icon: "💵" },
    { value: "CARD", label: "Carte bancaire", icon: "💳" },
    { value: "MOBILE_MONEY", label: "Mobile money", icon: "📱" },
    { value: "CHECK", label: "Chèque", icon: "📝" },
  ];

  useEffect(() => {
    fetchPaiements();
  }, [searchTerm, filterMode, dateDebut, dateFin]);

  const fetchPaiements = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (filterMode) params.payment_method = filterMode;

      const response = await paiementService.getAll(params);
      let data = response.data.results || response.data;

      // Filtrer par dates côté client
      if (dateDebut) {
        data = data.filter(
          (p) => new Date(p.payment_date) >= new Date(dateDebut),
        );
      }
      if (dateFin) {
        const fin = new Date(dateFin);
        fin.setHours(23, 59, 59);
        data = data.filter((p) => new Date(p.payment_date) <= fin);
      }

      setPayments(data);
      calculateStats(data);
    } catch (error) {
      showAlert(error, "Erreur lors du chargement des paiements");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const stats = {
      total: 0,
      cash: 0,
      card: 0,
      mobile_money: 0,
      check: 0,
    };

    data.forEach((payment) => {
      const amount = parseFloat(payment.amount);
      stats.total += amount;

      switch (payment.payment_method) {
        case "CASH":
          stats.cash += amount;
          break;
        case "CARD":
          stats.card += amount;
          break;
        case "MOBILE_MONEY":
          stats.mobile_money += amount;
          break;
        case "CHECK":
          stats.check += amount;
          break;
        default:
          break;
      }
    });

    setStats(stats);
  };

  const exportToPDF = () => {
    showAlert("info", "Fonctionnalité d'export PDF en développement");
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const columns = [
    {
      header: "Date",
      accessor: "payment_date",
      render: (row) => (
        <div>
          <p className="font-semibold">
            {format(new Date(row.payment_date), "dd/MM/yyyy", { locale: fr })}
          </p>
          <p className="text-sm text-gray-500">
            {format(new Date(row.payment_date), "HH:mm", { locale: fr })}
          </p>
        </div>
      ),
    },
    {
      header: "N° Commande",
      accessor: "order_id",
      render: (row) => (
        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
          {row.order?.order_id || "-"}
        </span>
      ),
    },
    {
      header: "Montant",
      accessor: "amount",
      render: (row) => (
        <span className="font-semibold text-green-600 text-lg">
          {parseFloat(row.amount).toLocaleString()} FCFA
        </span>
      ),
    },
    {
      header: "Mode de paiement",
      accessor: "payment_method",
      render: (row) => {
        const mode = MODE_PAIEMENT_CHOICES.find(
          (m) => m.value === row.payment_method,
        );
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <span>{mode?.icon}</span>
            <span>{mode?.label}</span>
          </span>
        );
      },
    },
    {
      header: "Référence",
      accessor: "reference",
      render: (row) => row.reference || "-",
    },
    {
      header: "Utilisateur",
      accessor: "username",
      render: (row) => row.username || "-",
    },
    {
      header: "Notes",
      accessor: "notes",
      render: (row) =>
        row.notes ? (
          <span className="text-sm text-gray-600 italic">{row.notes}</span>
        ) : (
          "-"
        ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
            <p className="mt-2 text-gray-600">Historique des paiements reçus</p>
          </div>
          <button
            onClick={exportToPDF}
            className="btn-secondary flex items-center space-x-2"
          >
            <FaFileExport />
            <span>Exporter</span>
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

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total encaissé</p>
                <p className="text-2xl font-bold mt-1">
                  {stats.total.toLocaleString()} FCFA
                </p>
                <p className="text-xs opacity-75 mt-1">
                  {payments.length} paiements
                </p>
              </div>
              <FaMoneyBillWave className="text-4xl opacity-50" />
            </div>
          </div>

          {MODE_PAIEMENT_CHOICES.map((mode) => {
            const amount = stats[mode.value.toLowerCase()] || 0;
            const count = payments.filter(
              (p) => p.payment_method === mode.value,
            ).length;
            return (
              <div
                key={mode.value}
                className="card hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center space-x-1">
                      <span>{mode.icon}</span>
                      <span>{mode.label}</span>
                    </p>
                    <p className="text-xl font-bold text-primary-600 mt-1">
                      {amount.toLocaleString()} FCFA
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {count} paiements
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Filtres */}
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <FaSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher (N° commande, référence)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select
                value={filterMode}
                onChange={(e) => setFilterMode(e.target.value)}
                className="input-field"
              >
                <option value="">Tous les modes</option>
                {MODE_PAIEMENT_CHOICES.map((mode) => (
                  <option key={mode.value} value={mode.value}>
                    {mode.icon} {mode.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                className="input-field"
                placeholder="Date début"
              />
            </div>

            <div>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                className="input-field"
                placeholder="Date fin"
              />
            </div>
          </div>

          {(searchTerm || filterMode || dateDebut || dateFin) && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {payments.length} résultat(s) trouvé(s)
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterMode("");
                  setDateDebut("");
                  setDateFin("");
                }}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Table des paiements */}
        <div className="card">
          {loading ? (
            <Loader text="Chargement des paiements..." />
          ) : payments.length === 0 ? (
            <div className="text-center py-12">
              <FaMoneyBillWave className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-500">Aucun paiement trouvé</p>
            </div>
          ) : (
            <Table columns={columns} data={payments} loading={loading} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};
export default Paiements;
