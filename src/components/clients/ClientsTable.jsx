import React from "react";
import Table from "../../components/common/Table";
import ClientActions from "./ClientActions";
import { getFullName } from "../../utils/clients";

const ClientsTable = ({
  clients,
  loading,
  onEdit,
  onDelete,
  onViewDetails,
}) => {
  const columns = [
    {
      header: "Nom complet",
      accessor: "last_name",
      render: (row) => getFullName(row),
    },
    {
      header: "Téléphone",
      accessor: "phone",
    },
    {
      header: "Email",
      accessor: "email",
      render: (row) => row.email || "-",
    },
    {
      header: "Statut",
      accessor: "actif",
      render: (row) =>
        row.actif ? (
          <span className="badge-success">Actif</span>
        ) : (
          <span className="badge-danger">Inactif</span>
        ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (row) => (
        <ClientActions
          client={row}
          onView={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <div className="card">
      <Table columns={columns} data={clients} loading={loading} />
    </div>
  );
};

export default ClientsTable;
