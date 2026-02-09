import React from "react";
import { FaTag } from "react-icons/fa";
import CategoryStatCard from "./Categorystatcard";

const CategoriesStats = ({ category, services, onCategoryClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {category.slice(0, 4).map((category) => {
        const servicesCount = services.filter(
          (s) => s.category === category.id && s.actif,
        ).length;

        return (
          <CategoryStatCard
            key={category.id}
            category={category}
            servicesCount={servicesCount}
            onClick={() => onCategoryClick(category.id)}
          />
        );
      })}
    </div>
  );
};

export default CategoriesStats;
