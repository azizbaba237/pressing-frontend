import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";
import { commandeService } from "../services/api";
import Loader from "../components/common/Loader";
import {
  FaShoppingCart,
  FaUsers,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaTruck,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistiques();
  }, []);

  const fetchStatistiques = async () => {
    try {
      const response = await commandeService.getStatistiques();
      setStats(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-screen">
          <Loader text="Chargement des statistiques..." />
        </div>
      </MainLayout>
    );
  }

  const statCards = [
    {
      title: "Total Commandes",
      value: stats?.total_orders || 0,
      icon: <FaShoppingCart />,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
    },
    {
      title: "Commandes Aujourd'hui",
      value: stats?.orders_today || 0,
      icon: <FaClock />,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgLight: "bg-green-50",
    },
    {
      title: "CA 30 derniers jours",
      // Séparer la valeur et l'unité pour un affichage mobile propre
      value: (stats?.orders_last_30_days || 0).toLocaleString(),
      unit: "FCFA",
      icon: <FaMoneyBillWave />,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
      bgLight: "bg-yellow-50",
    },
    {
      title: "Montants en attente",
      value: (stats?.pending_amount || 0).toLocaleString(),
      unit: "FCFA",
      icon: <FaClock />,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgLight: "bg-red-50",
    },
  ];

  const statutData = stats?.orders_by_status
    ? Object.entries(stats.orders_by_status).map(([key, value]) => ({
        name: getStatutLabel(key),
        value: value,
      }))
    : [];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];
  const hasChartData = statutData && statutData.length > 0;

  return (
    <MainLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Vue d'ensemble des activités et des performances récentes
          </p>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="card hover:shadow-lg transition-shadow p-3! sm:p-5!"
            >
              {/* Icône en haut */}
              <div
                className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl ${card.bgLight} mb-3`}
              >
                <span
                  className={`${card.textColor} text-xl sm:text-2xl lg:text-4xl`}
                >
                  {card.icon}
                </span>
              </div>

              {/* Titre */}
              <p className="text-xs sm:text-sm text-gray-500 leading-tight mb-1">
                {card.title}
              </p>

              {/* Valeur + unité sur deux lignes si nécessaire */}
              <p
                className={`text-lg sm:text-2xl font-bold ${card.textColor} leading-tight`}
              >
                {card.value}
              </p>
              {card.unit && (
                <p
                  className={`text-xs sm:text-sm font-medium ${card.textColor} opacity-75`}
                >
                  {card.unit}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Graphiques */}
        {hasChartData ? (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Pie Chart */}
            <div className="card p-4! sm:p-6!">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                Répartition par statut
              </h3>
              {/* Hauteur réduite sur mobile */}
              <div style={{ height: "260px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statutData}
                      cx="50%"
                      cy="40%"
                      labelLine={false}
                      label={false}
                      outerRadius="65%"
                      dataKey="value"
                    >
                      {statutData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} commandes`, name]}
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Legend
                      verticalAlign="bottom"
                      align="center"
                      height={70}
                      wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                      iconType="circle"
                      iconSize={8}
                      formatter={(value, entry) => {
                        const total = statutData.reduce(
                          (sum, item) => sum + item.value,
                          0,
                        );
                        const percent = (
                          (entry.payload.value / total) *
                          100
                        ).toFixed(1);
                        return `${value} (${percent}%)`;
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="card p-4! sm:p-6!">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                Commandes par statut
              </h3>
              <div style={{ height: "260px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={statutData}
                    margin={{ left: -25, right: 5, top: 5, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-35}
                      textAnchor="end"
                    />
                    <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <Bar dataKey="value" name="Commandes" radius={[6, 6, 0, 0]}>
                      {statutData.map((entry, index) => (
                        <Cell
                          key={`bar-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="card p-6 text-center">
            <p className="text-gray-500 text-sm">
              Aucune donnée disponible pour les graphiques
            </p>
          </div>
        )}

        {/* État des commandes */}
        <div className="card p-4! sm:p-6!">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
            État des commandes
          </h3>
          {stats?.orders_by_status ? (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3">
              <StatutCard
                label="En attente"
                count={stats.orders_by_status.PENDING || 0}
                icon={<FaClock />}
                color="text-yellow-600"
                bgColor="bg-yellow-50"
                borderColor="border-yellow-200"
              />
              <StatutCard
                label="En cours"
                count={stats.orders_by_status.IN_PROGRESS || 0}
                icon={<FaTruck />}
                color="text-blue-600"
                bgColor="bg-blue-50"
                borderColor="border-blue-200"
              />
              <StatutCard
                label="Prêt"
                count={stats.orders_by_status.READY || 0}
                icon={<FaCheckCircle />}
                color="text-green-600"
                bgColor="bg-green-50"
                borderColor="border-green-200"
              />
              <StatutCard
                label="Livré"
                count={stats.orders_by_status.DELIVERED || 0}
                icon={<FaCheckCircle />}
                color="text-purple-600"
                bgColor="bg-purple-50"
                borderColor="border-purple-200"
              />
              <StatutCard
                label="Annulé"
                count={stats.orders_by_status.CANCELLED || 0}
                icon={<FaClock />}
                color="text-red-600"
                bgColor="bg-red-50"
                borderColor="border-red-200"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-400">Aucune donnée</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

/* StatutCard redesignée : centrée, compacte, lisible sur mobile */
const StatutCard = ({ label, count, icon, color, bgColor, borderColor }) => (
  <div
    className={`${bgColor} border ${borderColor} rounded-xl p-3 sm:p-4 flex flex-col items-center text-center gap-1`}
  >
    <span className={`${color} text-lg sm:text-xl`}>{icon}</span>
    <span className={`text-xl sm:text-2xl font-bold ${color}`}>{count}</span>
    <span className="text-xs text-gray-500 leading-tight">{label}</span>
  </div>
);

const getStatutLabel = (status) => {
  const labels = {
    PENDING: "En attente",
    IN_PROGRESS: "En cours",
    READY: "Prêt",
    DELIVERED: "Livré",
    CANCELLED: "Annulé",
  };
  return labels[status] || status;
};

export default Dashboard;
