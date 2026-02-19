import React from "react";
import { FaUser, FaLock, FaStore, FaBell } from "react-icons/fa";

const TABS = [
  { id: "profil", label: "Mon Profil", icon: FaUser },
  { id: "securite", label: "Sécurité", icon: FaLock },
  { id: "pressing", label: "Mon Pressing", icon: FaStore },
  { id: "notifications", label: "Notifications", icon: FaBell },
];

const ParametresSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="lg:w-64">
      <div className="card p-2">
        <nav className="space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="text-lg" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ParametresSidebar;
