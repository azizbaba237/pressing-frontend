import React from "react";

const NotificationToggle = ({
  label,
  description,
  checked,
  onChange,
  badge,
  disabled = false,
}) => {
  return (
    <div
      className={`flex items-start space-x-4 p-4 bg-gray-50 rounded-lg ${
        disabled ? "opacity-60" : ""
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-gray-900">{label}</p>
          {badge && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      <label
        className={`relative inline-flex items-center ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
      </label>
    </div>
  );
};

export default NotificationToggle;
