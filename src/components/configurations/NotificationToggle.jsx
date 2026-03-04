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
      className={`flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl border transition-all ${
        checked && !disabled
          ? "bg-blue-50 border-blue-200"
          : "bg-gray-50 border-gray-100"
      } ${disabled ? "opacity-50" : "cursor-pointer"}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      {/* Texte */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          {badge && (
            <span className="text-xs bg-yellow-100 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full shrink-0">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">
          {description}
        </p>
      </div>

      {/* Toggle switch */}
      <label
        className={`relative inline-flex items-center shrink-0 ${
          disabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div className="w-10 h-5 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5 shadow-inner" />
      </label>
    </div>
  );
};

export default NotificationToggle;
