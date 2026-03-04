/**
 * Constantes pour le module Clients
 */

// Valeurs par défaut du formulaire
export const DEFAULT_FORM_DATA = {
    last_name: "",
    first_name: "",
    phone: "",
    email: "",
    adresse: "",
    actif: true,
};

// Configuration des colonnes de la table
export const TABLE_COLUMNS_CONFIG = [
    {
        header: "Nom complet",
        accessor: "last_name",
        sortable: true,
    },
    {
        header: "Téléphone",
        accessor: "phone",
        sortable: true,
    },
    {
        header: "Email",
        accessor: "email",
        sortable: true,
    },
    {
        header: "Statut",
        accessor: "actif",
        sortable: true,
    },
    {
        header: "Actions",
        accessor: "id",
        sortable: false,
    },
];

// Configuration des statistiques
export const STATS_CONFIG = [
    {
        key: "total_orders",
        label: "Total commandes",
        color: "blue",
        icon: "📦",
    },
    {
        key: "orders_delivered",
        label: "Commandes livrées",
        color: "green",
        icon: "✅",
    },
    {
        key: "total_amount_spent",
        label: "Total dépensé",
        color: "yellow",
        icon: "💰",
        format: "currency",
    },
    {
        key: "amount_pending",
        label: "Montant en attente",
        color: "red",
        icon: "⏳",
        format: "currency",
    },
];

// Messages de confirmation
export const CONFIRMATION_MESSAGES = {
    delete: (client) =>
        `Êtes-vous sûr de vouloir supprimer ${client.first_name} ${client.last_name} ?`,
};

// Messages de succès
export const SUCCESS_MESSAGES = {
    created: "Client ajouté avec succès",
    updated: "Client modifié avec succès",
    deleted: "Client supprimé avec succès",
};

// Messages d'erreur
export const ERROR_MESSAGES = {
    fetch: "Erreur lors du chargement des clients",
    save: "Erreur lors de la sauvegarde",
    delete: "Erreur lors de la suppression",
    stats: "Erreur lors du chargement des statistiques",
};

// Délai de debounce pour la recherche (ms)
export const SEARCH_DEBOUNCE_DELAY = 400;