import React from "react";
import Table from "../common/Table";
//import ServiceTableRow from "./ServiceTableRow";
import { FaTag, FaEdit, FaTrash } from "react-icons/fa";

const ServicesTable = ({ services, loading, onEdit, onDelete }) => {
  const serviceColumns = [
    {
      header: "Service",
      accessor: "name",
      render: (row) => (
        <div>
          <p className="font-semibold">{row.name}</p>
          {row.description && (
            <p className="text-sm text-gray-500 mt-1">{row.description}</p>
          )}
        </div>
      ),
    },
    {
      header: "Catégorie",
      accessor: "name",
      render: (row) => (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
          <FaTag className="mr-1" />
          {row.name}
        </span>
      ),
    },
    {
      header: "Prix",
      accessor: "price",
      render: (row) => (
        <span className="font-semibold text-green-600">
          {parseFloat(row.price).toLocaleString()} FCFA
        </span>
      ),
    },
    {
      header: "Durée estimée",
      accessor: "estimate_time",
      render: (row) => `${row.estimate_time}h`,
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
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          <button className="border-primary-500 text-primary-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
            Services ({services.length})
          </button>
        </nav>
      </div>

      <div className="p-6">
        <Table columns={serviceColumns} data={services} loading={loading} />
      </div>
    </div>
  );
};

export default ServicesTable;
