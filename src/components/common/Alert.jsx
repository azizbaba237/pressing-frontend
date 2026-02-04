import React from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const Alert = ({ type = "info", message, onClose }) => {
  const types = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: <FaCheckCircle className="text-green-400" />,
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: <FaExclamationCircle className="text-red-400" />,
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      text: "text-yellow-800",
      icon: <FaExclamationCircle className="text-yellow-400" />,
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: <FaInfoCircle className="text-blue-400" />,
    },
  };

  const style = types[type] || types.info;

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 mb-4`}>
      <div className="flex items-start">
        <div className="shrink-0">{style.icon}</div>
        <div className={`ml-3 flex-1 ${style.text}`}>
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-3 shrink-0 ${style.text} hover:opacity-75`}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
