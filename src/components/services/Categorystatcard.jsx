import React from "react";
import { FaTag } from "react-icons/fa";

const CategoryStatCard = ({ category, servicesCount, onClick }) => {
  return (
    <div
      className="card hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{category.name}</p>
          <p className="text-2xl font-bold text-primary-600">{servicesCount}</p>
          <p className="text-xs text-gray-500 mt-1">services actifs</p>
        </div>
        <FaTag className="text-4xl text-primary-200" />
      </div>
    </div>
  );
};

export default CategoryStatCard;
