import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loader = ({ size = "medium", text = "Chargement..." }) => {
  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl",
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner
        className={`${sizeClasses[size]} text-primary-600 animate-spin`}
      />
      {text && <p className="mt-4 text-gray-600">{text}</p>}
    </div>
  );
};

export default Loader;
