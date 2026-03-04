import React from "react";
import { FaUser, FaLock, FaStore, FaBell } from "react-icons/fa";

const TABS = [
  {
    id: "profil",
    label: "Mon Profil",
    icon: FaUser,
    description: "Informations personnelles",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "securite",
    label: "Sécurité",
    icon: FaLock,
    description: "Mot de passe",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    id: "pressing",
    label: "Mon Pressing",
    icon: FaStore,
    description: "Infos & messages auto",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: FaBell,
    description: "Préférences d'alertes",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const ParametresSidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="lg:w-72">
      {/* Mobile : onglets horizontaux scrollables */}
      <div className="flex lg:hidden overflow-x-auto gap-2 pb-1 snap-x">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap snap-start text-sm font-medium transition-all shrink-0 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              <Icon className="text-sm" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop : sidebar verticale */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header sidebar */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
            Navigation
          </p>
        </div>

        <nav className="p-3 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {/* Icône dans un cercle coloré */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                    isActive ? "bg-white bg-opacity-20" : `${tab.bg}`
                  }`}
                >
                  <Icon
                    className={`text-base ${isActive ? "text-white" : tab.color}`}
                  />
                </div>

                <div className="min-w-0">
                  <p
                    className={`font-medium text-sm ${isActive ? "text-white" : "text-gray-800"}`}
                  >
                    {tab.label}
                  </p>
                  <p
                    className={`text-xs truncate ${isActive ? "text-blue-100" : "text-gray-400"}`}
                  >
                    {tab.description}
                  </p>
                </div>

                {/* Indicateur actif */}
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white opacity-80 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ParametresSidebar;
