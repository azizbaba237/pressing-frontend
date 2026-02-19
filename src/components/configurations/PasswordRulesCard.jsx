import React from "react";
import { PASSWORD_RULES } from "../../constants/configurations";

const PasswordRulesCard = () => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
      <h4 className="text-sm font-medium text-yellow-800 mb-2">
        Conseils pour un mot de passe sécurisé:
      </h4>
      <ul className="text-sm text-yellow-700 space-y-1">
        {PASSWORD_RULES.map((rule, index) => (
          <li key={index}>• {rule}</li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordRulesCard;
