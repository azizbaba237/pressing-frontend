import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FaUsers } from "react-icons/fa";
import KPICard from "../reports/Kpicard";
import TopClientCard from "../reports/TopClientCard";
import { CHART_COLORS } from "../../constants/reports";

const ClientsTab = ({ customers, calculations }) => {
  const { topClients, clientsStats } = calculations;

  return (
    <div className="space-y-6">
      {/* KPIs clients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clients</p>
              <p className="text-3xl font-bold text-primary-600">
                {clientsStats.total}
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
                {clientsStats.actifs}
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
                {clientsStats.inactifs}
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
          {topClients.map((customer, index) => (
            <TopClientCard
              key={index}
              customer={customer}
              rank={index + 1}
              color={CHART_COLORS[index % CHART_COLORS.length]}
            />
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
              {customers.slice(0, 10).map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-semibold">
                    {customer.first_name} {customer.last_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {customer.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(customer.inscription_date), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {customer.actif ? (
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
  );
};

export default ClientsTab;
