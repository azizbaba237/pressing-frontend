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
        <Loader text="Chargement des statistiques..." />
      </MainLayout>
    );
  }

  const statCards = [
    {
      title: "Total Commandes",
      value: stats?.total_orders || 0,
      icon: <FaShoppingCart className="text-4xl" />,
      color: "bg-blue-500",
      textColor: "text-blue-600",
    },
    {
      title: "Commandes Aujourd'hui",
      value: stats?.orders_today || 0,
      icon: <FaClock className="text-4xl" />,
      color: "bg-green-500",
      textColor: "text-green-600",
    },
    {
      title: "CA 30 derniers jours",
      value: `${(stats?.orders_last_30_days || 0).toLocaleString()} FCFA`,
      icon: <FaMoneyBillWave className="text-4xl" />,
      color: "bg-yellow-500",
      textColor: "text-yellow-600",
    },
    {
      title: "Montants en attente",
      value: `${(stats?.pending_amount || 0).toLocaleString()} FCFA`,
      icon: <FaClock className="text-4xl" />,
      color: "bg-red-500",
      textColor: "text-red-600",
    },
  ];

  // Données pour le graphique des statuts
  const statutData = stats?.orders_by_status
    ? Object.entries(stats.orders_by_status).map(([key, value]) => ({
        name: getStatutLabel(key),
        value: value,
      }))
    : [];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Vue d'ensemble de votre activité de pressing
          </p>
        </div>

        {/* Cartes statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold ${card.textColor} mt-2`}>
                    {card.value}
                  </p>
                </div>
                <div className={`${card.color} bg-opacity-10 p-4 rounded-full`}>
                  <div className={card.textColor}>{card.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Graphique des statuts - Pie Chart */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 text-center sm:text-left">
              Répartition par statut
            </h3>

            <div className="w-full h-[240px] sm:h-[280px] md:h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statutData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius="70%"
                    dataKey="value"
                  >
                    {statutData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graphique en barres - Commandes par statut */}
          <div className="card p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 text-center sm:text-left">
              Commandes par statut
            </h3>

            <div className="w-full h-65 sm:h-75">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="value"
                    fill="#3B82F6"
                    name="Nombre de commandes"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Résumé des statuts avec icônes */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            État des commandes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats?.orders_by_status && (
              <>
                <StatutCard
                  label="En attente"
                  count={stats.orders_by_status.PENDING || 0}
                  icon={<FaClock />}
                  color="text-yellow-600"
                  bgColor="bg-yellow-100"
                />
                <StatutCard
                  label="En cours"
                  count={stats.orders_by_status.IN_PROGRESS || 0}
                  icon={<FaTruck />}
                  color="text-blue-600"
                  bgColor="bg-blue-100"
                />
                <StatutCard
                  label="Prêt"
                  count={stats.orders_by_status.READY || 0}
                  icon={<FaCheckCircle />}
                  color="text-green-600"
                  bgColor="bg-green-100"
                />
                <StatutCard
                  label="Livré"
                  count={stats.orders_by_status.DELIVERED || 0}
                  icon={<FaCheckCircle />}
                  color="text-purple-600"
                  bgColor="bg-purple-100"
                />
                <StatutCard
                  label="Annulé"
                  count={stats.orders_by_status.CANCELLED || 0}
                  icon={<FaClock />}
                  color="text-red-600"
                  bgColor="bg-red-100"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

const StatutCard = ({ label, count, icon, color, bgColor }) => (
  <div className={`${bgColor} rounded-lg p-4`}>
    <div className="flex items-center space-x-3">
      <div className={`${color} text-2xl`}>{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{count}</p>
      </div>
    </div>
  </div>
);

const getStatutLabel = (status) => {
  const labels = {
    PENDING: "Pending",
    IN_PROGRESS: "In Progress",
    READY: "Ready",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
  };
  return labels[status] || status;
};

export default Dashboard;
