import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Composant Informations générales d'une commande
 * Fichier: src/components/commandes/CommandeInfo.jsx
 *
 * Affiche les informations de base : client, dates, statut
 */
const CommandeInfo = ({ commande, getStatutBadge }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Client */}
      <div>
        <p className="text-sm text-gray-600">Client</p>
        <p className="font-semibold">
          {commande.customer_detail?.first_name}{" "}
          {commande.customer_detail?.last_name}
        </p>
        <p className="text-sm text-gray-500">
          {commande.customer_detail?.phone}
        </p>
      </div>

      {/* Statut */}
      <div>
        <p className="text-sm text-gray-600">Statut</p>
        <div className="mt-1">{getStatutBadge(commande.status)}</div>
      </div>

      {/* Date de dépôt */}
      <div>
        <p className="text-sm text-gray-600">Date de dépôt</p>
        <p className="font-semibold">
          {format(new Date(commande.deposit_date), "dd/MM/yyyy à HH:mm", {
            locale: fr,
          })}
        </p>
      </div>

      {/* Date de promesse */}
      <div>
        <p className="text-sm text-gray-600">Date de promesse</p>
        <p className="font-semibold">
          {format(new Date(commande.due_date), "dd/MM/yyyy à HH:mm", {
            locale: fr,
          })}
        </p>
      </div>

      {/* Notes (si présentes) */}
      {commande.notes && (
        <div className="col-span-2">
          <p className="text-sm text-gray-600">Notes</p>
          <p className="text-sm bg-gray-50 p-2 rounded">{commande.notes}</p>
        </div>
      )}
    </div>
  );
};

export default CommandeInfo;
