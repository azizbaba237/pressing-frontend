import React from "react";
import Table from "../common/Table";
import { FaEdit, FaTrash } from "react-icons/fa";

const CategoriesTable = ({ category, onEdit, onDelete }) => {
  const categorieColumns = [
    { header: "Nom", accessor: "name" },
    {
      header: "Description",
      accessor: "description",
      render: (row) => row.description || "-",
    },
    {
      header: "Nombre de services",
      accessor: "service_count",
      render: (row) => (
        <span className="badge-info">{row.service_count || 0}</span>
      ),
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
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row);
            }}
            className="text-green-600 hover:text-green-800"
            title="Modifier"
          >
            <FaEdit />
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
      <h2 className="text-xl font-semibold mb-4">Catégories de services</h2>
      <Table columns={categorieColumns} data={category} loading={false} />
    </div>
  );
};

export default CategoriesTable;
