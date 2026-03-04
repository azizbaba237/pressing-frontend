import React from "react";
import { FaLock, FaEye, FaEyeSlash, FaShieldAlt } from "react-icons/fa";
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
    <div className="space-y-4">
      {/* Header carte */}
      <div className="bg-linear-to-br from-red-500 to-rose-600 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shrink-0">
            <FaShieldAlt className="text-xl text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Sécurité du compte</h2>
            <p className="text-red-200 text-sm">Modifiez votre mot de passe</p>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
        <div className="flex items-center space-x-2 mb-5">
          <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center">
            <FaLock className="text-red-500 text-xs" />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
            Changer le mot de passe
          </h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Ancien mot de passe */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
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
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
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
                placeholder="Min. 8 caractères"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordData.nouveau_mot_de_passe && (
              <PasswordStrengthIndicator
                password={passwordData.nouveau_mot_de_passe}
              />
            )}
          </div>

          {/* Confirmation */}
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1.5">
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
                  ? "border-red-400 focus:ring-red-400"
                  : ""
              }`}
              placeholder="Confirmez votre nouveau mot de passe"
            />
            {passwordData.confirmer_mot_de_passe &&
              !passwordsMatch(
                passwordData.nouveau_mot_de_passe,
                passwordData.confirmer_mot_de_passe,
              ) && (
                <p className="text-xs text-red-500 mt-1 flex items-center space-x-1">
                  <span>⚠</span>
                  <span>Les mots de passe ne correspondent pas</span>
                </p>
              )}
          </div>

          <PasswordRulesCard />

          <div className="flex justify-end pt-2">
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
    </div>
  );
};

export default SecuriteTab;
