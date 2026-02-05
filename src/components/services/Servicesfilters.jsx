import React from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

const ServicesFilters = ({
  searchTerm,
  onSearchChange,
  filterCategorie,
  onFilterChange,
  category,
}) => {
  return (
    <div className="card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un service..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-400" />
          <select
            value={filterCategorie}
            onChange={(e) => onFilterChange(e.target.value)}
            className="input-field"
          >
            <option value="">Toutes les catégories</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ServicesFilters;
