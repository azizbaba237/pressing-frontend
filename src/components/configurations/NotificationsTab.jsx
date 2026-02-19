import { FaSave } from "react-icons/fa";
import { NOTIFICATIONS_CONFIG, NOTIFICATION_CHANNELS } from "../../constants/configurations";
import NotificationToggle from "./NotificationToggle";

const NotificationsTab = ({
  notifData,
  handleToggle,
  handleSaveNotifications,
}) => {
  return (
    <div className="card">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Préférences de notifications
      </h2>

      <form onSubmit={handleSaveNotifications} className="space-y-6">
        {/* Notifications internes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Notifications de l'application
          </h3>
          <div className="space-y-4">
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

        {/* Canaux de notification */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Canaux de notification
          </h3>
          <div className="space-y-4">
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

        <div className="flex justify-end pt-4">
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
