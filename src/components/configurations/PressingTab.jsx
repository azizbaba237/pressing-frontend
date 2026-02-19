import React from "react";
import { FaSave } from "react-icons/fa";
import { DEVISE_OPTIONS } from "../../constants/configurations";

const PressingTab = ({ pressingData, handleChange, handleSavePressing }) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Informations du Pressing
      </h2>

      <form onSubmit={handleSavePressing} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse
            </label>
            <textarea
              rows="2"
              value={pressingData.adresse}
              onChange={(e) => handleChange("adresse", e.target.value)}
              className="input-field"
              placeholder="Adresse complète de votre pressing"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Délai de traitement par défaut (heures)
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

        {/* Messages automatiques */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Messages automatiques
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message de confirmation de réception
              </label>
              <textarea
                rows="2"
                value={pressingData.message_recu}
                onChange={(e) => handleChange("message_recu", e.target.value)}
                className="input-field"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message de notification commande prête
              </label>
              <textarea
                rows="2"
                value={pressingData.message_pret}
                onChange={(e) => handleChange("message_pret", e.target.value)}
                className="input-field"
              ></textarea>
            </div>
          </div>
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

export default PressingTab;
