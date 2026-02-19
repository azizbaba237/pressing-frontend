import { useState, useEffect } from 'react';

/**
 * Hook pour gérer les préférences de notifications
 */
export const useNotificationsData = ({ showAlert }) => {
    const [notifData, setNotifData] = useState({
        notif_nouvelle_commande: true,
        notif_paiement: true,
        notif_commande_prete: true,
        notif_email: false,
        notif_sms: false,
    });

    // Charger les données depuis localStorage au montage
    useEffect(() => {
        const savedConfig = localStorage.getItem('notif_config');
        if (savedConfig) {
            try {
                setNotifData(JSON.parse(savedConfig));
            } catch (error) {
                console.error('Erreur chargement notif config:', error);
            }
        }
    }, []);

    const handleSaveNotifications = (e) => {
        e.preventDefault();

        try {
            localStorage.setItem('notif_config', JSON.stringify(notifData));
            showAlert('success', 'Préférences de notifications sauvegardées');
        } catch (error) {
            console.error('Erreur sauvegarde notifications:', error);
            showAlert('error', 'Erreur lors de la sauvegarde');
        }
    };

    const handleToggle = (key, value) => {
        setNotifData(prev => ({ ...prev, [key]: value }));
    };

    return {
        notifData,
        handleToggle,
        handleSaveNotifications,
    };
};

export default useNotificationsData;