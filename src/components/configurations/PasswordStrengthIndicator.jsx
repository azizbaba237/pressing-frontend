import React from "react";
import {
  getPasswordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthLabel,
} from "../../utils/configurations/Passwordutils";

const PasswordStrengthIndicator = ({ password }) => {
  const strength = getPasswordStrength(password);

  return (
    <div className="mt-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              strength >= level
                ? getPasswordStrengthColor(strength)
                : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">
        Force: {getPasswordStrengthLabel(strength)}
      </p>
    </div>
  );
};

export default PasswordStrengthIndicator;
