import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import {
  commandeService,
  clientService,
  paiementService,
} from "../services/api";
import Loader from "../components/common/Loader";
import Alert from "../components/common/Alert";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaFileExport,
  FaCalendarAlt,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  format,
  subDays,
  //startOfMonth,
  //endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import { fr } from "date-fns/locale";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

const Rapports = () => {
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [periode, setPeriode] = useState("30");
  const [stats, setStats] = useState(null);
  const [commandes, setCommandes] = useState([]);
  const [paiements, setPaiements] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchAllData();
  }, [periode]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [statsRes, commandesRes, paiementsRes, clientsRes] =
        await Promise.all([
          commandeService.getStatistiques(),
          commandeService.getAll({ ordering: "-deposit_date" }),
          paiementService.getAll({ ordering: "-payment_date" }),
          clientService.getAll({ ordering: "-inscription_date" }),
        ]);

      setStats(statsRes.data);
      setCommandes(commandesRes.data.results || commandesRes.data);
      setPaiements(paiementsRes.data.results || paiementsRes.data);
      setClients(clientsRes.data.results || clientsRes.data);
    } catch (error) {
      showAlert(error, "Erreur lors du chargement des rapports");
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Données pour le graphique des commandes par jour
  const getCommandesParJour = () => {
    const days = parseInt(periode);
    const dateDebut = subDays(new Date(), days);
    const interval = eachDayOfInterval({ start: dateDebut, end: new Date() });

    return interval.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const count = commandes.filter(
        (c) => format(new Date(c.deposit_date), "yyyy-MM-dd") === dayStr,
      ).length;
      const montant = commandes
        .filter((c) => format(new Date(c.deposit_date), "yyyy-MM-dd") === dayStr)
        .reduce((sum, c) => sum + parseFloat(c.total_amount), 0);

      return {
        date: format(day, "dd/MM", { locale: fr }),
        commandes: count,
        montant: montant,
      };
    });
  };

  // Données pour le graphique des paiements par mode
  const getPaiementsParMode = () => {
    const modes = {
      CASH: { label: "Espèces", total: 0, count: 0 },
      CARD: { label: "Carte", total: 0, count: 0 },
      MOBILE_MONEY: { label: "Mobile Money", total: 0, count: 0 },
      CHECK: { label: "Chèque", total: 0, count: 0 },
    };

    paiements.forEach((p) => {
      if (modes[p.payment_method]) {
        modes[p.payment_method].total += parseFloat(p.amount);
        modes[p.payment_method].count += 1;
      }
    });

    return Object.entries(modes).map(([key, value]) => ({
      name: value.label,
      total: value.total,
      count: value.count,
    }));
  };

  // Données pour le graphique des commandes par statut
  const getCommandesParStatut = () => {
    const statuts = {
      PENDING: { label: "En attente", count: 0 },
      IN_PROGRESS: { label: "En cours", count: 0 },
      READY: { label: "Prêt", count: 0 },
      DELIVERED: { label: "Livré", count: 0 },
      CANCELED: { label: "Annulé", count: 0 },
    };

    commandes.forEach((c) => {
      if (statuts[c.status]) {
        statuts[c.status].count += 1;
      }
    });

    return Object.values(statuts).map((s) => ({
      name: s.label,
      value: s.count,
    }));
  };

  // Données pour le graphique des paiements par jour
  const getPaiementsParJour = () => {
    const days = parseInt(periode);
    const dateDebut = subDays(new Date(), days);
    const interval = eachDayOfInterval({ start: dateDebut, end: new Date() });

    return interval.map((day) => {
      const dayStr = format(day, "yyyy-MM-dd");
      const montant = paiements
        .filter(
          (p) => format(new Date(p.payment_date), "yyyy-MM-dd") === dayStr,
        )
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);

      return {
        date: format(day, "dd/MM", { locale: fr }),
        montant: montant,
      };
    });
  };

  // Top clients par montant dépensé
  const getTopClients = () => {
    const clientStats = {};

    commandes.forEach((c) => {
      if (c.client_detail) {
        const clientId = c.client_detail.id;
        if (!clientStats[clientId]) {
          clientStats[clientId] = {
            nom: `${c.client_detail.prenom} ${c.client_detail.nom}`,
            telephone: c.client_detail.telephone,
            totalCommandes: 0,
            totalMontant: 0,
          };
        }
        clientStats[clientId].totalCommandes += 1;
        clientStats[clientId].totalMontant += parseFloat(c.montant_total);
      }
    });

    return Object.values(clientStats)
      .sort((a, b) => b.totalMontant - a.totalMontant)
      .slice(0, 5);
  };

  // Calcul du chiffre d'affaires total
  const getChiffreAffaires = () => {
    return commandes.reduce((sum, c) => sum + parseFloat(c.montant_total), 0);
  };

  // Calcul du total encaissé
  const getTotalEncaisse = () => {
    return paiements.reduce((sum, p) => sum + parseFloat(p.montant), 0);
  };

  // Calcul du montant impayé
  const getMontantImpaye = () => {
    return getChiffreAffaires() - getTotalEncaisse();
  };

  const tabs = [
    { id: "overview", label: "Vue d'ensemble", icon: <FaChartBar /> },
    { id: "commandes", label: "Commandes", icon: <FaShoppingCart /> },
    { id: "paiements", label: "Paiements", icon: <FaMoneyBillWave /> },
    { id: "clients", label: "Clients", icon: <FaUsers /> },
  ];

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Chargement des rapports..." />
      </MainLayout>
    );
  }

  const commandesParJour = getCommandesParJour();
  const paiementsParMode = getPaiementsParMode();
  const commandesParStatut = getCommandesParStatut();
  const paiementsParJour = getPaiementsParJour();
  const topClients = getTopClients();

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Rapports & Statistiques
            </h1>
            <p className="mt-2 text-gray-600">Analyse de votre activité</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaCalendarAlt className="text-gray-400" />
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="input-field w-auto"
              >
                <option value="7">7 derniers jours</option>
                <option value="30">30 derniers jours</option>
                <option value="90">90 derniers jours</option>
                <option value="365">Cette année</option>
              </select>
            </div>
          </div>
        </div>

        {/* Alertes */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        {/* Onglets */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Onglet Vue d'ensemble */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* KPIs principaux */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Commandes</p>
                    <p className="text-3xl font-bold mt-1">
                      {commandes.length}
                    </p>
                    <p className="text-xs opacity-75 mt-1">Sur la période</p>
                  </div>
                  <FaShoppingCart className="text-5xl opacity-30" />
                </div>
              </div>

              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Chiffre d'Affaires</p>
                    <p className="text-3xl font-bold mt-1">
                      {getChiffreAffaires().toLocaleString()}
                    </p>
                    <p className="text-xs opacity-75 mt-1">FCFA</p>
                  </div>
                  <FaMoneyBillWave className="text-5xl opacity-30" />
                </div>
              </div>

              <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Total Encaissé</p>
                    <p className="text-3xl font-bold mt-1">
                      {getTotalEncaisse().toLocaleString()}
                    </p>
                    <p className="text-xs opacity-75 mt-1">FCFA</p>
                  </div>
                  <FaChartLine className="text-5xl opacity-30" />
                </div>
              </div>

              <div className="card bg-gradient-to-br from-red-500 to-red-600 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-90">Montant Impayé</p>
                    <p className="text-3xl font-bold mt-1">
                      {getMontantImpaye().toLocaleString()}
                    </p>
                    <p className="text-xs opacity-75 mt-1">FCFA</p>
                  </div>
                  <FaChartPie className="text-5xl opacity-30" />
                </div>
              </div>
            </div>

            {/* Graphiques principaux */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Évolution des commandes */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Évolution des commandes
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={commandesParJour}>
                    <defs>
                      <linearGradient
                        id="colorCommandes"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="commandes"
                      stroke="#3B82F6"
                      fill="url(#colorCommandes)"
                      name="Commandes"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Répartition par statut */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Répartition par statut
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={commandesParStatut}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        percent > 0
                          ? `${name}: ${(percent * 100).toFixed(0)}%`
                          : ""
                      }
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {commandesParStatut.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Commandes */}
        {activeTab === "commandes" && (
          <div className="space-y-6">
            {/* Graphique montant des commandes */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Montant des commandes par jour (FCFA)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={commandesParJour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString()} FCFA`,
                      "Montant",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="montant"
                    fill="#3B82F6"
                    name="Montant (FCFA)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Tableau des commandes récentes */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Commandes récentes
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        N° Commande
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Statut
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Montant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {commandes.slice(0, 10).map((commande) => (
                      <tr key={commande.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-mono">
                          {commande.numero_commande}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {commande.client_detail
                            ? `${commande.client_detail.prenom} ${commande.client_detail.nom}`
                            : "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {format(new Date(commande.date_depot), "dd/MM/yyyy", {
                            locale: fr,
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <StatutBadge statut={commande.statut} />
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">
                          {parseFloat(commande.montant_total).toLocaleString()}{" "}
                          FCFA
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Paiements */}
        {activeTab === "paiements" && (
          <div className="space-y-6">
            {/* Graphique évolution des paiements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Évolution des encaissements (FCFA)
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={paiementsParJour}>
                  <defs>
                    <linearGradient
                      id="colorMontant"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [
                      `${value.toLocaleString()} FCFA`,
                      "Montant",
                    ]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="montant"
                    stroke="#10B981"
                    strokeWidth={2}
                    name="Encaissements (FCFA)"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Répartition par mode de paiement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Répartition par mode de paiement
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paiementsParMode.filter((p) => p.total > 0)}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="total"
                      nameKey="name"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {paiementsParMode.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `${value.toLocaleString()} FCFA`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Détail par mode de paiement
                </h3>
                <div className="space-y-4">
                  {paiementsParMode.map((mode, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {mode.name}
                        </span>
                        <span className="text-sm font-semibold text-gray-900">
                          {mode.total.toLocaleString()} FCFA ({mode.count}{" "}
                          paiements)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              getTotalEncaisse() > 0
                                ? (mode.total / getTotalEncaisse()) * 100
                                : 0
                            }%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Clients */}
        {activeTab === "clients" && (
          <div className="space-y-6">
            {/* KPIs clients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Clients</p>
                    <p className="text-3xl font-bold text-primary-600">
                      {clients.length}
                    </p>
                  </div>
                  <FaUsers className="text-5xl text-primary-200" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Clients Actifs</p>
                    <p className="text-3xl font-bold text-green-600">
                      {clients.filter((c) => c.actif).length}
                    </p>
                  </div>
                  <FaUsers className="text-5xl text-green-200" />
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Clients Inactifs</p>
                    <p className="text-3xl font-bold text-red-600">
                      {clients.filter((c) => !c.actif).length}
                    </p>
                  </div>
                  <FaUsers className="text-5xl text-red-200" />
                </div>
              </div>
            </div>

            {/* Top clients */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top 5 Clients (par montant dépensé)
              </h3>
              <div className="space-y-4">
                {topClients.map((client, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {client.nom}
                        </p>
                        <p className="text-sm text-gray-500">
                          {client.telephone}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        {client.totalMontant.toLocaleString()} FCFA
                      </p>
                      <p className="text-sm text-gray-500">
                        {client.totalCommandes} commande(s)
                      </p>
                    </div>
                  </div>
                ))}

                {topClients.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Aucune donnée disponible
                  </p>
                )}
              </div>
            </div>

            {/* Tableau des clients récents */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Clients récemment inscrits
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Téléphone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Date inscription
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clients.slice(0, 10).map((client) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold">
                          {client.prenom} {client.nom}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {client.telephone}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {client.email || "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {format(
                            new Date(client.date_inscription),
                            "dd/MM/yyyy",
                            {
                              locale: fr,
                            },
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {client.actif ? (
                            <span className="badge-success">Actif</span>
                          ) : (
                            <span className="badge-danger">Inactif</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Composant badge statut
const StatutBadge = ({ statut }) => {
  const statuts = {
    EN_ATTENTE: { label: "En attente", class: "badge-warning" },
    EN_COURS: { label: "En cours", class: "badge-info" },
    PRET: { label: "Prêt", class: "badge-success" },
    LIVRE: { label: "Livré", class: "bg-purple-100 text-purple-800" },
    ANNULE: { label: "Annulé", class: "badge-danger" },
  };

  const info = statuts[statut] || { label: statut, class: "badge-info" };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${info.class}`}
    >
      {info.label}
    </span>
  );
};

export default Rapports;
