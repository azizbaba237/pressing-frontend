/**
 * Constantes pour le module Paramètres
 */

// Onglets disponibles
export const TABS_CONFIG = [
    { id: 'profil', label: 'Mon Profil' },
    { id: 'securite', label: 'Sécurité' },
    { id: 'pressing', label: 'Mon Pressing' },
    { id: 'notifications', label: 'Notifications' },
];

// Devises disponibles
export const DEVISE_OPTIONS = [
    { value: 'FCFA', label: 'FCFA (Franc CFA)' },
    { value: 'EUR', label: 'EUR (Euro)' },
    { value: 'USD', label: 'USD (Dollar américain)' },
    { value: 'GNF', label: 'GNF (Franc guinéen)' },
    { value: 'MAD', label: 'MAD (Dirham marocain)' },
];

// Configuration des notifications
export const NOTIFICATIONS_CONFIG = [
    {
        key: 'notif_nouvelle_commande',
        label: 'Nouvelle commande',
        description: "Recevoir une notification lors de la création d'une nouvelle commande",
    },
    {
        key: 'notif_paiement',
        label: 'Paiement reçu',
        description: "Recevoir une notification lors de l'enregistrement d'un paiement",
    },
    {
        key: 'notif_commande_prete',
        label: 'Commande prête',
        description: "Recevoir une notification lorsqu'une commande est marquée comme prête",
    },
];

// Canaux de notification
export const NOTIFICATION_CHANNELS = [
    {
        key: 'notif_email',
        label: 'Email',
        description: 'Recevoir les notifications par email',
        badge: 'Bientôt disponible',
        disabled: true,
    },
    {
        key: 'notif_sms',
        label: 'SMS',
        description: 'Recevoir les notifications par SMS',
        badge: 'Bientôt disponible',
        disabled: true,
    },
];

// Règles de validation du mot de passe
export const PASSWORD_RULES = [
    'Au moins 8 caractères',
    'Mélanger lettres majuscules et minuscules',
    'Inclure des chiffres et des caractères spéciaux',
    "Ne pas utiliser d'informations personnelles",
];

// Messages par défaut
export const DEFAULT_MESSAGES = {
    message_recu: 'Votre commande a été bien reçue.',
    message_pret: 'Votre commande est prête. Veuillez passer la récupérer.',
};