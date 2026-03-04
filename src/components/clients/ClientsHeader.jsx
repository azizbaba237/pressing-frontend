import React from "react";
import { FaPlus } from "react-icons/fa";

const ClientsHeader = ({ onNewClient }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        <p className="mt-2 text-gray-600">Gérez des clients</p>
      </div>
      <button
        onClick={onNewClient}
        className="btn-primary flex items-center space-x-2 text-sm md:text-base"
      >
        <FaPlus />
        <span className="hidden sm:inline">Nouveau client</span>
        <span className="sm:hidden">Nouveau</span>
      </button>
    </div>
  );
};

export default ClientsHeader;
