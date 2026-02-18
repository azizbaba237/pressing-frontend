/**
 * Constantes pour le module Rapports
 */

// Couleurs pour les graphiques
export const CHART_COLORS = [
    "#3B82F6", // Bleu
    "#10B981", // Vert
    "#F59E0B", // Orange
    "#EF4444", // Rouge
    "#8B5CF6", // Violet
    "#EC4899", // Rose
];

// Dégradés pour les graphiques
export const CHART_GRADIENTS = {
    blue: {
        id: "colorCommandes",
        from: "#3B82F6",
        to: "#3B82F6",
        opacity: { start: 0.8, end: 0 }
    },
    green: {
        id: "colorMontant",
        from: "#10B981",
        to: "#10B981",
        opacity: { start: 0.8, end: 0 }
    }
};

// Options de période
export const PERIODE_OPTIONS = [
    { value: "7", label: "7 derniers jours" },
    { value: "30", label: "30 derniers jours" },
    { value: "90", label: "90 derniers jours" },
    { value: "365", label: "Cette année" }
];

// Onglets disponibles
export const TABS = [
    { id: "overview", label: "Vue d'ensemble" },
    { id: "orders", label: "Commandes" },
    { id: "payments", label: "Paiements" },
    { id: "customers", label: "Clients" }
];

// Statuts de commande
export const ORDER_STATUS = {
    PENDING: { label: "En attente", color: "warning" },
    IN_PROGRESS: { label: "En cours", color: "info" },
    READY: { label: "Prêt", color: "success" },
    DELIVERED: { label: "Livré", color: "purple" },
    CANCELED: { label: "Annulé", color: "danger" }
};

// Modes de paiement
export const PAYMENT_METHODS = {
    CASH: { label: "Espèces", icon: "💵" },
    CARD: { label: "Carte", icon: "💳" },
    MOBILE_MONEY: { label: "Mobile Money", icon: "📱" },
    CHECK: { label: "Chèque", icon: "📝" }
};