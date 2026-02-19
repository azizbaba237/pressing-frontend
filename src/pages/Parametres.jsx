import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Alert from "../components/common/Alert";
import ParametresSidebar from "../components/configurations/ParametresSidebar";
import ProfilTab from "../components/configurations/ProfilTab";
import SecuriteTab from "../components/configurations/SecuriteTab";
import PressingTab from "../components/configurations/PressingTab";
import NotificationsTab from "../components/configurations/NotificationsTab";
import { useAlert } from "../hooks/useAlert";
import { useProfilData } from "../hooks/configurations/Useprofildata";
import { usePasswordData } from "../hooks/configurations/Usepassworddata";
import { usePressingData } from "../hooks/configurations/Usepressingdata";
import { useNotificationsData } from "../hooks/configurations/Usenotificationsdata";

/**
 * Page principale des paramètres
 *
 * Responsabilités :
 * - Orchestration des onglets
 * - Gestion de l'état actif
 * - Délégation de la logique aux hooks
 */
const Parametres = () => {
  const [activeTab, setActiveTab] = useState("profil");
  const { alert, showAlert, closeAlert } = useAlert();

  // Hooks pour chaque section
  const profilHandlers = useProfilData({ showAlert });
  const passwordHandlers = usePasswordData({ showAlert });
  const pressingHandlers = usePressingData({ showAlert });
  const notificationsHandlers = useNotificationsData({ showAlert });

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos préférences et la configuration de l'application
          </p>
        </div>

        {/* Alertes */}
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={closeAlert}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Menu latéral */}
          <ParametresSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Contenu des onglets */}
          <div className="flex-1">
            {activeTab === "profil" && <ProfilTab {...profilHandlers} />}

            {activeTab === "securite" && <SecuriteTab {...passwordHandlers} />}

            {activeTab === "pressing" && <PressingTab {...pressingHandlers} />}

            {activeTab === "notifications" && (
              <NotificationsTab {...notificationsHandlers} />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Parametres;
