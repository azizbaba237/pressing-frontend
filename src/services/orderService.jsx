/**
 * =============================================================================
 * SERVICES MÉTIER - GESTION DES DONNÉES
 * =============================================================================
 * Ce fichier centralise tous les appels API vers le backend Django.
 *
 * Services disponibles :
 * - orderService : Gestion des commandes
 * - customerService : Gestion des clients
 * - categoryService : Gestion des catégories
 * - serviceService : Gestion des services
 * - paymentService : Gestion des paiements
 * =============================================================================
 */

import api from "./api";

// ============================================================
// SERVICE COMMANDES (ORDERS)
// ============================================================
/**
 * Gère toutes les opérations liées aux commandes
 */
export const orderService = {
  /**
   * Récupère toutes les commandes
   * @param {Object} params - Paramètres de filtrage (status, customer, dates...)
   * @returns {Promise} Liste des commandes
   */
  getAll: (params) => api.get("/orders/", { params }),

  /**
   * Récupère une commande par son ID
   * @param {number} id - ID de la commande
   * @returns {Promise} Détails de la commande
   */
  getById: (id) => api.get(`/orders/${id}/`),

  /**
   * Crée une nouvelle commande
   * @param {Object} data - Données de la commande (customer, items, due_date...)
   * @returns {Promise} Commande créée
   */
  create: (data) => api.post("/orders/", data),

  /**
   * Met à jour une commande existante
   * @param {number} id - ID de la commande
   * @param {Object} data - Nouvelles données
   * @returns {Promise} Commande mise à jour
   */
  update: (id, data) => api.put(`/orders/${id}/`, data),

  /**
   * Supprime une commande
   * @param {number} id - ID de la commande
   * @returns {Promise}
   */
  delete: (id) => api.delete(`/orders/${id}/`),

  /**
   * Change le statut d'une commande
   * @param {number} id - ID de la commande
   * @param {string} status - Nouveau statut (PENDING, IN_PROGRESS, READY, DELIVERED, CANCELLED)
   * @returns {Promise} Commande mise à jour
   */
  changeStatus: (id, status) =>
    api.post(`/orders/${id}/change_status/`, { status }),

  /**
   * Ajoute un paiement à une commande
   * @param {number} id - ID de la commande
   * @param {Object} data - Données du paiement (amount, payment_method...)
   * @returns {Promise} Paiement créé
   */
  addPayment: (id, data) => api.post(`/orders/${id}/add_payment/`, data),

  /**
   * Récupère les statistiques globales des commandes
   * @returns {Promise} Statistiques (total_orders, orders_today, revenue...)
   */
  getStatistics: () => api.get("/orders/statistics/"),
};

// ============================================================
// SERVICE CLIENTS (CUSTOMERS)
// ============================================================
/**
 * Gère toutes les opérations liées aux clients
 */
export const customerService = {
  /**
   * Récupère tous les clients
   * @param {Object} params - Paramètres de filtrage (actif, search...)
   * @returns {Promise} Liste des clients
   */
  getAll: (params) => api.get("/customers/", { params }),

  /**
   * Récupère un client par son ID
   * @param {number} id - ID du client
   * @returns {Promise} Détails du client
   */
  getById: (id) => api.get(`/customers/${id}/`),

  /**
   * Crée un nouveau client
   * @param {Object} data - Données du client (first_name, last_name, phone...)
   * @returns {Promise} Client créé
   */
  create: (data) => api.post("/customers/", data),

  /**
   * Met à jour un client existant
   * @param {number} id - ID du client
   * @param {Object} data - Nouvelles données
   * @returns {Promise} Client mis à jour
   */
  update: (id, data) => api.put(`/customers/${id}/`, data),

  /**
   * Supprime un client
   * @param {number} id - ID du client
   * @returns {Promise}
   */
  delete: (id) => api.delete(`/customers/${id}/`),

  /**
   * Récupère les commandes d'un client
   * @param {number} id - ID du client
   * @returns {Promise} Liste des commandes du client
   */
  getOrders: (id) => api.get(`/customers/${id}/orders/`),

  /**
   * Récupère les statistiques d'un client
   * @param {number} id - ID du client
   * @returns {Promise} Statistiques (total_orders, amount_spent...)
   */
  getStatistics: (id) => api.get(`/customers/${id}/statistics/`),
};

// ============================================================
// SERVICE CATÉGORIES
// ============================================================
/**
 * Gère toutes les opérations liées aux catégories de services
 */
export const categoryService = {
  /**
   * Récupère toutes les catégories
   * @param {Object} params - Paramètres de filtrage (actif...)
   * @returns {Promise} Liste des catégories
   */
  getAll: (params) => api.get("/categories/", { params }),

  /**
   * Récupère une catégorie par son ID
   * @param {number} id - ID de la catégorie
   * @returns {Promise} Détails de la catégorie
   */
  getById: (id) => api.get(`/categories/${id}/`),

  /**
   * Crée une nouvelle catégorie
   * @param {Object} data - Données de la catégorie (name, description...)
   * @returns {Promise} Catégorie créée
   */
  create: (data) => api.post("/categories/", data),

  /**
   * Met à jour une catégorie existante
   * @param {number} id - ID de la catégorie
   * @param {Object} data - Nouvelles données
   * @returns {Promise} Catégorie mise à jour
   */
  update: (id, data) => api.put(`/categories/${id}/`, data),

  /**
   * Supprime une catégorie
   * @param {number} id - ID de la catégorie
   * @returns {Promise}
   */
  delete: (id) => api.delete(`/categories/${id}/`),
};

// ============================================================
// SERVICE SERVICES
// ============================================================
/**
 * Gère toutes les opérations liées aux services (prestations)
 */
export const serviceService = {
  /**
   * Récupère tous les services
   * @param {Object} params - Paramètres de filtrage (actif, category...)
   * @returns {Promise} Liste des services
   */
  getAll: (params) => api.get("/services/", { params }),

  /**
   * Récupère un service par son ID
   * @param {number} id - ID du service
   * @returns {Promise} Détails du service
   */
  getById: (id) => api.get(`/services/${id}/`),

  /**
   * Crée un nouveau service
   * @param {Object} data - Données du service (name, category, price...)
   * @returns {Promise} Service créé
   */
  create: (data) => api.post("/services/", data),

  /**
   * Met à jour un service existant
   * @param {number} id - ID du service
   * @param {Object} data - Nouvelles données
   * @returns {Promise} Service mis à jour
   */
  update: (id, data) => api.put(`/services/${id}/`, data),

  /**
   * Supprime un service
   * @param {number} id - ID du service
   * @returns {Promise}
   */
  delete: (id) => api.delete(`/services/${id}/`),
};

// ============================================================
// SERVICE PAIEMENTS (PAYMENTS)
// ============================================================
/**
 * Gère toutes les opérations liées aux paiements
 */
export const paymentService = {
  /**
   * Récupère tous les paiements
   * @param {Object} params - Paramètres de filtrage (order, payment_method...)
   * @returns {Promise} Liste des paiements
   */
  getAll: (params) => api.get("/payments/", { params }),

  /**
   * Récupère un paiement par son ID
   * @param {number} id - ID du paiement
   * @returns {Promise} Détails du paiement
   */
  getById: (id) => api.get(`/payments/${id}/`),

  /**
   * Crée un nouveau paiement
   * @param {Object} data - Données du paiement (order, amount, payment_method...)
   * @returns {Promise} Paiement créé
   */
  create: (data) => api.post("/payments/", data),
};
