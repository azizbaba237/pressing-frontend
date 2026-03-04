import React from "react";
import { FaSearch } from "react-icons/fa";

const ClientsSearch = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="card">
      <div className="flex items-center space-x-2">
        <FaSearch className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Rechercher un client..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-field text-sm md:text-base"
        />
      </div>
    </div>
  );
};

export default ClientsSearch;
