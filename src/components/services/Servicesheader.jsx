import React from "react";
import { FaPlus } from "react-icons/fa";

const ServicesHeader = ({ onNewService, onNewCategorie }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
      <div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Services
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Gestion des services et catégories
        </p>
      </div>

      {/* Boutons : pleine largeur sur mobile, auto sur desktop */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          onClick={onNewCategorie}
          className="btn-secondary flex items-center justify-center space-x-2 text-sm"
        >
          <FaPlus />
          <span>Nouvelle catégorie</span>
        </button>
        <button
          onClick={onNewService}
          className="btn-primary flex items-center justify-center space-x-2 text-sm"
        >
          <FaPlus />
          <span>Nouveau service</span>
        </button>
      </div>
    </div>
  );
};

export default ServicesHeader;
