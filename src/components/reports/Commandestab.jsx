import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import BarChartCard from "./Barchartcard";
import StatusBadge from "./Statusbadge";

const CommandesTab = ({ orders, calculations }) => {
  const { commandesParJour } = calculations;

  return (
    <div className="space-y-6">
      {/* Graphique montant des commandes */}
      <BarChartCard
        title="Montant des commandes par jour (FCFA)"
        data={commandesParJour}
        dataKey="montant"
        color="#3B82F6"
        formatter={(value) => [`${value.toLocaleString()} FCFA`, "Montant"]}
      />

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
      </div>
    </div>
  );
};

export default CommandesTab;
