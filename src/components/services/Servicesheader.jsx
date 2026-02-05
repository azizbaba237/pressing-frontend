import React from "react";
import { FaPlus } from "react-icons/fa";

const ServicesHeader = ({ onNewService, onNewCategorie }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Services</h1>
        <p className="mt-2 text-gray-600">Gérez vos services et catégories</p>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onNewCategorie}
          className="btn-secondary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Nouvelle catégorie</span>
        </button>
        <button
          onClick={onNewService}
          className="btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Nouveau service</span>
        </button>
      </div>
    </div>
  );
};

export default ServicesHeader;
