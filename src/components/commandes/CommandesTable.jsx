import React from "react";
import Table from "../common/Table";
import { FaEye, FaTrash } from "react-icons/fa";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { STATUT_CHOICES, STATUT_COLORS } from "../../constants/commandes";

/**
 * Composant Table des commandes
 * Fichier: src/components/commandes/CommandesTable.jsx
 *
 * Affiche la liste des commandes dans un tableau avec colonnes formatées
 */
const CommandesTable = ({ commandes, loading, onViewDetails, onDelete }) => {
  const getStatutBadge = (status) => {
    const statutInfo = STATUT_CHOICES.find((s) => s.value === status);
    const colorClass = STATUT_COLORS[statutInfo?.color] || "badge-secondary";

    return (
      <span className={`${colorClass} inline-flex items-center`}>
        {statutInfo?.label || status}
      </span>
    );
  };

  const columns = [
    {
      header: "N° Commande",
      accessor: "order_id",
    },
    {
      header: "Client",
      accessor: "customer",
      render: (row) =>
        row.customer_detail
          ? `${row.customer_detail.first_name} ${row.customer_detail.last_name}`
          : "-",
    },
    {
      header: "Date dépôt",
      accessor: "deposit_date",
      render: (row) =>
        format(new Date(row.deposit_date), "dd/MM/yyyy HH:mm", { locale: fr }),
    },
    {
      header: "Date promesse",
      accessor: "due_date",
      render: (row) =>
        format(new Date(row.due_date), "dd/MM/yyyy HH:mm", { locale: fr }),
    },
    {
      header: "Statut",
      accessor: "status",
      render: (row) => getStatutBadge(row.status),
    },
    {
      header: "Montant",
      accessor: "total_amount",
      render: (row) => `${parseFloat(row.total_amount).toLocaleString()} FCFA`,
    },
    {
      header: "Payé",
      accessor: "amount_paid",
      render: (row) => (
        <span
          className={
            row.is_paid
              ? "text-green-600 font-semibold"
              : "text-red-600 font-semibold"
          }
        >
          {parseFloat(row.amount_paid).toLocaleString()} FCFA
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (row) => (
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(row);
            }}
            className="text-blue-600 hover:text-blue-800"
            title="Voir détails"
          >
            <FaEye />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(row);
            }}
            className="text-red-600 hover:text-red-800"
            title="Supprimer"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="card">
      <Table
        columns={columns}
        data={commandes}
        loading={loading}
        onRowClick={onViewDetails}
      />
    </div>
  );
};

export default CommandesTable;
