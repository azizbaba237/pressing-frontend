import React from "react";

/**
 * Composant Liste des articles d'une commande
 * Fichier: src/components/commandes/CommandeItems.jsx
 *
 * Affiche la table des articles avec quantités, prix et totaux
 */
const CommandeItems = ({ items }) => {
  if (!items || items.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-3">Articles</h3>
        <p className="text-gray-500">Aucun article</p>
      </div>
    );
  }

  return (
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
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3 text-sm">{item.service_name}</td>
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
  );
};

export default CommandeItems;
