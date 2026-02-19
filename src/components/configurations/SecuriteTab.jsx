import React from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import PasswordRulesCard from "./PasswordRulesCard";
import { passwordsMatch } from "../../utils/configurations/Passwordutils";

const SecuriteTab = ({
  passwordData,
  showPassword,
  showNewPassword,
  setShowPassword,
  setShowNewPassword,
  handleChange,
  handleChangePassword,
}) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Changer le mot de passe
      </h2>

      <form onSubmit={handleChangePassword} className="space-y-4">
        {/* Ancien mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ancien mot de passe *
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={passwordData.ancien_mot_de_passe}
              onChange={(e) =>
                handleChange("ancien_mot_de_passe", e.target.value)
              }
              className="input-field pr-10"
              placeholder="Votre mot de passe actuel"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Nouveau mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nouveau mot de passe *
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              required
              value={passwordData.nouveau_mot_de_passe}
              onChange={(e) =>
                handleChange("nouveau_mot_de_passe", e.target.value)
              }
              className="input-field pr-10"
              placeholder="Nouveau mot de passe (min. 8 caractères)"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Indicateur de force du mot de passe */}
          {passwordData.nouveau_mot_de_passe && (
            <PasswordStrengthIndicator
              password={passwordData.nouveau_mot_de_passe}
            />
          )}
        </div>

        {/* Confirmer le nouveau mot de passe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirmer le nouveau mot de passe *
          </label>
          <input
            type="password"
            required
            value={passwordData.confirmer_mot_de_passe}
            onChange={(e) =>
              handleChange("confirmer_mot_de_passe", e.target.value)
            }
            className={`input-field ${
              passwordData.confirmer_mot_de_passe &&
              !passwordsMatch(
                passwordData.nouveau_mot_de_passe,
                passwordData.confirmer_mot_de_passe,
              )
                ? "border-red-500 focus:ring-red-500"
                : ""
            }`}
            placeholder="Confirmez votre nouveau mot de passe"
          />
          {passwordData.confirmer_mot_de_passe &&
            !passwordsMatch(
              passwordData.nouveau_mot_de_passe,
              passwordData.confirmer_mot_de_passe,
            ) && (
              <p className="text-xs text-red-500 mt-1">
                Les mots de passe ne correspondent pas
              </p>
            )}
        </div>

        {/* Conseils pour un mot de passe sécurisé */}
        <PasswordRulesCard />

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2"
          >
            <FaLock />
            <span>Changer le mot de passe</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SecuriteTab;
