import React from "react";
import {
  FaChartBar,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

const TABS_CONFIG = [
  { id: "overview", label: "Vue d'ensemble", icon: FaChartBar },
  { id: "orders", label: "Commandes", icon: FaShoppingCart },
  { id: "payments", label: "Paiements", icon: FaMoneyBillWave },
  { id: "customers", label: "Clients", icon: FaUsers },
];

const RapportsTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <nav className="-mb-px flex space-x-2 sm:space-x-6 min-w-max">
        {TABS_CONFIG.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-1.5 py-3 px-2 sm:px-3 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap ${
                isActive
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default RapportsTabs;
