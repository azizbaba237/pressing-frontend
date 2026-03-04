import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ClientActions = ({ client, onView, onEdit, onDelete }) => {
  const handleClick = (e, action) => {
    e.stopPropagation();
    action(client);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={(e) => handleClick(e, onView)}
        className="text-blue-600 hover:text-blue-800 transition-colors"
        title="Voir détails"
      >
        <FaEye />
      </button>
      <button
        onClick={(e) => handleClick(e, onEdit)}
        className="text-green-600 hover:text-green-800 transition-colors"
        title="Modifier"
      >
        <FaEdit />
      </button>
      <button
        onClick={(e) => handleClick(e, onDelete)}
        className="text-red-600 hover:text-red-800 transition-colors"
        title="Supprimer"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default ClientActions;
