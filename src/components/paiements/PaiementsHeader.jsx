import React from "react";
import { FaFileExport } from "react-icons/fa";

const PaiementsHeader = ({ onExport }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paiements</h1>
        <p className="mt-2 text-gray-600">Historique des paiements reçus</p>
      </div>
      <button
        onClick={onExport}
        className="btn-secondary flex items-center space-x-2"
      >
        <FaFileExport />
        <span>Exporter</span>
      </button>
    </div>
  );
};

export default PaiementsHeader;