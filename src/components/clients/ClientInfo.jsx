import React from "react";
import { getFullName } from "../../utils/clients";

const ClientInfo = ({ client }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-gray-600">Nom complet</p>
        <p className="font-semibold">{getFullName(client)}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Téléphone</p>
        <p className="font-semibold">{client.phone}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Email</p>
        <p className="font-semibold">{client.email || "-"}</p>
      </div>
      <div>
        <p className="text-sm text-gray-600">Statut</p>
        <p>
          {client.actif ? (
            <span className="badge-success">Actif</span>
          ) : (
            <span className="badge-danger">Inactif</span>
          )}
        </p>
      </div>
      {client.adresse && (
        <div className="col-span-2">
          <p className="text-sm text-gray-600">Adresse</p>
          <p className="font-semibold">{client.adresse}</p>
        </div>
      )}
    </div>
  );
};

export default ClientInfo;
