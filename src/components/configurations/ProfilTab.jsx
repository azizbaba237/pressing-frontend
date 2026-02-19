import React from "react";
import { FaUser, FaSave } from "react-icons/fa";

const ProfilTab = ({ user, profilData, handleChange, handleSaveProfil }) => {
  return (
    <div className="card">
      {/* Avatar et info utilisateur */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center">
          <FaUser className="text-4xl text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {user?.user_name || "Utilisateur"}
          </h2>
          <p className="text-gray-500">Administrateur</p>
        </div>
      </div>

      <form onSubmit={handleSaveProfil} className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
          Informations personnelles
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              value={profilData.first_name}
              onChange={(e) => handleChange("first_name", e.target.value)}
              className="input-field"
              placeholder="Votre prénom"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={profilData.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              className="input-field"
              placeholder="Votre nom"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom d'utilisateur
          </label>
          <input
            type="text"
            value={user?.user_name || ""}
            disabled
            className="input-field bg-gray-100 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">
            Le nom d'utilisateur ne peut pas être modifié
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={profilData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="input-field"
            placeholder="votre@email.com"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2"
          >
            <FaSave />
            <span>Sauvegarder</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilTab;
