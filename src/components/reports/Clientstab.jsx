import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { FaUsers } from "react-icons/fa";
import TopClientCard from "./Topclientcard";
import { CHART_COLORS } from "../../constants/reports";

const ClientsTab = ({ customers, calculations }) => {
  const { topClients, clientsStats } = calculations;

  return (
    <div className="space-y-6">
      {/* KPIs clients */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <div className="card p-4! sm:p-6!">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Total Clients</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-600 mt-1">
                {clientsStats.total}
              </p>
            </div>
            <FaUsers className="text-3xl sm:text-5xl text-blue-200" />
          </div>
        </div>

        <div className="card p-4! sm:p-6!">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Clients Actifs</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                {clientsStats.actifs}
              </p>
            </div>
            <FaUsers className="text-3xl sm:text-5xl text-green-200" />
          </div>
        </div>

        <div className="card p-4! sm:p-6!">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">
                Clients Inactifs
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-1">
                {clientsStats.inactifs}
              </p>
            </div>
            <FaUsers className="text-3xl sm:text-5xl text-red-200" />
          </div>
        </div>
      </div>

      {/* Top clients */}
      <div className="card">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
          Top 5 Clients (par montant dépensé)
        </h3>
        <div className="space-y-3">
          {topClients.map((customer, index) => (
            <TopClientCard
              key={index}
              customer={customer}
              rank={index + 1}
              color={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))}
          {topClients.length === 0 && (
            <p className="text-center text-gray-500 py-8 text-sm">
              Aucune donnée disponible
            </p>
          )}
        </div>
      </div>

      {/* Tableau clients récents */}
      <div className="card">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
          Clients récemment inscrits
        </h3>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Nom",
                  "Téléphone",
                  "Email",
                  "Date inscription",
                  "Statut",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
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

        {/* Mobile — cards */}
        <div className="md:hidden space-y-3">
          {customers.slice(0, 10).map((customer) => (
            <div
              key={customer.id}
              className="border border-gray-100 rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between items-start">
                <p className="font-semibold text-sm text-gray-900">
                  {customer.first_name} {customer.last_name}
                </p>
                {customer.actif ? (
                  <span className="badge-success">Actif</span>
                ) : (
                  <span className="badge-danger">Inactif</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                <span>{customer.phone}</span>
                <span className="truncate">{customer.email || "-"}</span>
                <span>
                  {format(new Date(customer.inscription_date), "dd/MM/yyyy", {
                    locale: fr,
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientsTab;
