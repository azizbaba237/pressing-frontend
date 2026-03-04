import React from "react";
import { FaSave, FaStore, FaCommentDots } from "react-icons/fa";
import { DEVISE_OPTIONS } from "../../constants/configurations";

const PressingTab = ({ pressingData, handleChange, handleSavePressing }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shrink-0">
            <FaStore className="text-xl text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Mon Pressing</h2>
            <p className="text-green-200 text-sm">
              {pressingData.nom || "Configurez votre établissement"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSavePressing} className="space-y-4">
        {/* Infos principales */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
              <FaStore className="text-green-600 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Informations générales
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Nom du pressing *
              </label>
              <input
                type="text"
                required
                value={pressingData.nom}
                onChange={(e) => handleChange("nom", e.target.value)}
                className="input-field"
                placeholder="Nom de votre pressing"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={pressingData.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  className="input-field"
                  placeholder="+237 6XX XXX XXX"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={pressingData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="input-field"
                  placeholder="contact@pressing.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Adresse
              </label>
              <textarea
                rows="2"
                value={pressingData.adresse}
                onChange={(e) => handleChange("adresse", e.target.value)}
                className="input-field"
                placeholder="Adresse complète de votre pressing"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                  Devise
                </label>
                <select
                  value={pressingData.devise}
                  onChange={(e) => handleChange("devise", e.target.value)}
                  className="input-field"
                >
                  {DEVISE_OPTIONS.map((devise) => (
                    <option key={devise.value} value={devise.value}>
                      {devise.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                  Délai de traitement (heures)
                </label>
                <input
                  type="number"
                  min="1"
                  value={pressingData.delai_defaut}
                  onChange={(e) => handleChange("delai_defaut", e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Messages automatiques */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center space-x-2 mb-5">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaCommentDots className="text-blue-500 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Messages automatiques
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Message de confirmation de réception
              </label>
              <textarea
                rows="3"
                value={pressingData.message_recu}
                onChange={(e) => handleChange("message_recu", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
                Message de notification commande prête
              </label>
              <textarea
                rows="3"
                value={pressingData.message_pret}
                onChange={(e) => handleChange("message_pret", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
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

export default PressingTab;
