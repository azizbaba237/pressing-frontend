import React from "react";
import { FaSave, FaBell } from "react-icons/fa";
import {
  NOTIFICATIONS_CONFIG,
  NOTIFICATION_CHANNELS,
} from "../../constants/configurations";
import NotificationToggle from "./NotificationToggle";

const NotificationsTab = ({
  notifData,
  handleToggle,
  handleSaveNotifications,
}) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl p-5 sm:p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center shrink-0">
            <FaBell className="text-xl text-white" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold">Notifications</h2>
            <p className="text-yellow-100 text-sm">
              Gérez vos préférences d'alertes
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveNotifications} className="space-y-4">
        {/* Notifications app */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-7 h-7 bg-yellow-50 rounded-lg flex items-center justify-center">
              <FaBell className="text-yellow-500 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Notifications de l'application
            </h3>
          </div>
          <div className="space-y-3">
            {NOTIFICATIONS_CONFIG.map((notif) => (
              <NotificationToggle
                key={notif.key}
                label={notif.label}
                description={notif.description}
                checked={notifData[notif.key]}
                onChange={(checked) => handleToggle(notif.key, checked)}
              />
            ))}
          </div>
        </div>

        {/* Canaux */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
              <FaBell className="text-blue-500 text-xs" />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Canaux de notification
            </h3>
          </div>
          <div className="space-y-3">
            {NOTIFICATION_CHANNELS.map((canal) => (
              <NotificationToggle
                key={canal.key}
                label={canal.label}
                description={canal.description}
                badge={canal.badge}
                checked={notifData[canal.key]}
                disabled={canal.disabled}
                onChange={(checked) => handleToggle(canal.key, checked)}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary flex items-center space-x-2"
          >
            <FaSave />
            <span>Sauvegarder les préférences</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationsTab;
