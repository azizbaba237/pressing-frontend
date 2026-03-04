import React from "react";
import { getFullName } from "../../utils/clients";

const ClientInfo = ({ client }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="bg-gray-50 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Nom complet
        </p>
        <p className="font-semibold text-gray-900 text-sm sm:text-base">
          {getFullName(client)}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Téléphone
        </p>
        <p className="font-semibold text-gray-900 text-sm sm:text-base">
          {client.phone}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Email
        </p>
        <p className="font-semibold text-gray-900 text-sm sm:text-base break-all">
          {client.email || "-"}
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg px-4 py-3">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          Statut
        </p>
        <div className="mt-0.5">
          {client.actif ? (
            <span className="badge-success">Actif</span>
          ) : (
            <span className="badge-danger">Inactif</span>
          )}
        </div>
      </div>

      {client.adresse && (
        <div className="sm:col-span-2 bg-gray-50 rounded-lg px-4 py-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Adresse
          </p>
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            {client.adresse}
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientInfo;
