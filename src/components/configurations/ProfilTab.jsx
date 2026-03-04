import React from "react";
import { FaUser, FaSave, FaLock } from "react-icons/fa";

const ProfilTab = ({ user, profilData, handleChange, handleSaveProfil }) => {
  const initials =
    [profilData.first_name, profilData.last_name]
      .filter(Boolean)
      .map((n) => n[0].toUpperCase())
      .join("") || "U";

  return (
    <div className="space-y-4">
      {/* Carte avatar + identité */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shrink-0">
            <span className="text-xl sm:text-2xl font-bold text-white">
              {initials}
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold truncate">
              {profilData.first_name && profilData.last_name
                ? `${profilData.first_name} ${profilData.last_name}`
                : user?.user_name || "Utilisateur"}
            </h2>
            <p className="text-blue-200 text-sm">Administrateur</p>
            <p className="text-blue-100 text-xs mt-0.5 truncate">
              @{user?.user_name || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center space-x-2 mb-5">
          <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
            <FaUser className="text-blue-600 text-xs" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Informations personnelles
          </h3>
        </div>

        <form onSubmit={handleSaveProfil} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
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
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
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
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
              Nom d'utilisateur
            </label>
            <div className="relative">
              <input
                type="text"
                value={user?.user_name || ""}
                disabled
                className="input-field bg-gray-50 text-gray-400 cursor-not-allowed pr-10"
              />
              <FaLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Le nom d'utilisateur ne peut pas être modifié
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
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

          <div className="flex justify-end pt-2">
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
    </div>
  );
};

export default ProfilTab;
