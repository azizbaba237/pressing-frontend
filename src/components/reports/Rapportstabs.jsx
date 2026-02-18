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
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {TABS_CONFIG.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default RapportsTabs;
