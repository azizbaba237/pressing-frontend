import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import BarChartCard from "./Barchartcard";
import StatusBadge from "./Statusbadge";

const CommandesTab = ({ orders, calculations }) => {
  const { commandesParJour } = calculations;

  return (
    <div className="space-y-6">
      <BarChartCard
        title="Montant des commandes par jour (FCFA)"
        data={commandesParJour}
        dataKey="montant"
        color="#3B82F6"
        formatter={(value) => [`${value.toLocaleString()} FCFA`, "Montant"]}
      />

      <div className="card">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
          Commandes récentes
        </h3>

        {/* Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["N° Commande", "Client", "Date", "Statut", "Montant"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.slice(0, 10).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono">
                    {order.order_id}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.customer_details
                      ? `${order.customer_details.first_name} ${order.customer_details.last_name}`
                      : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {format(new Date(order.deposit_date), "dd/MM/yyyy", {
                      locale: fr,
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-green-600">
                    {parseFloat(order.total_amount).toLocaleString()} FCFA
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile — cards */}
        <div className="md:hidden space-y-3">
          {orders.slice(0, 10).map((order) => (
            <div
              key={order.id}
              className="border border-gray-100 rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-gray-500">
                  {order.order_id}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-900">
                  {order.customer_details
                    ? `${order.customer_details.first_name} ${order.customer_details.last_name}`
                    : "-"}
                </p>
                <p className="text-sm font-bold text-green-600">
                  {parseFloat(order.total_amount).toLocaleString()}
                  <span className="text-xs font-normal ml-0.5">FCFA</span>
                </p>
              </div>
              <p className="text-xs text-gray-400">
                {format(new Date(order.deposit_date), "dd/MM/yyyy", {
                  locale: fr,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandesTab;
