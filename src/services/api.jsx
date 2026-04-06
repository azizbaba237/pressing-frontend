/**
 * =============================================================================
 * CONFIGURATION API ET AUTHENTIFICATION
 * =============================================================================
 * Ce fichier configure Axios et gère l'authentification unifiée.
 *
 * Fonctionnalités :
 * - Configuration Axios avec intercepteurs
 * - Gestion automatique du refresh token
 * - Service d'authentification unifié (login, register, logout...)
 * =============================================================================
 */

import axios from "axios";

// ========================================
// CONFIGURATION DE BASE
// ========================================
/**
 * URL de base de l'API
 * Peut être modifiée via la variable d'environnement REACT_APP_API_URL
 */
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// ========================================
// INSTANCE AXIOS
// ========================================
/**
 * Instance Axios configurée pour communiquer avec le backend
 */
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ========================================
// INTERCEPTEUR DE REQUÊTE
// ========================================
/**
 * Ajoute automatiquement le token JWT à toutes les requêtes
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ========================================
// INTERCEPTEUR DE RÉPONSE
// ========================================
/**
 * Gère automatiquement le refresh du token JWT quand il expire
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si erreur 401 et pas déjà tenté de refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem("access_token", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si le refresh échoue, déconnecter l'utilisateur
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// ========================================
// SERVICE D'AUTHENTIFICATION UNIFIÉ
// ========================================
/**
 * Service gérant toutes les opérations d'authentification
 */
export const authService = {
  /**
   * Connexion utilisateur (admin ou client)
   * @param {string} username - Nom d'utilisateur ou téléphone
   * @param {string} password - Mot de passe
   * @returns {Promise<Object>} Données utilisateur + tokens + redirection
   */
  login: async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login/`, {
      username,
      password,
    });

    const { tokens, user, role, customer, redirect } = response.data;

    // Sauvegarder les données dans localStorage
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    localStorage.setItem("user_data", JSON.stringify(user));
    localStorage.setItem("user_role", role);

    if (customer) {
      localStorage.setItem("customer_data", JSON.stringify(customer));
    }

    return { tokens, user, role, customer, redirect };
  },

  /**
   * Inscription d'un nouveau client
   * @param {Object} data - Données d'inscription (username, password, phone...)
   * @returns {Promise<Object>} Données utilisateur + tokens + redirection
   */
  register: async (data) => {
    const response = await axios.post(`${API_URL}/auth/register/`, data);

    const { tokens, user, customer, role, redirect } = response.data;

    // Sauvegarder les données
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);
    localStorage.setItem("user_data", JSON.stringify(user));
    localStorage.setItem("user_role", role);
    localStorage.setItem("customer_data", JSON.stringify(customer));

    return { tokens, user, customer, role, redirect };
  },

  /**
   * Récupère les informations de l'utilisateur connecté
   * @returns {Promise<Object>} Données utilisateur + rôle + customer (si applicable)
   */
  getCurrentUser: async () => {
    const response = await api.get("/auth/me/");
    return response.data;
  },

  /**
   * Déconnexion utilisateur
   * Nettoie le localStorage
   */
  logout: () => {
    localStorage.clear();
  },

  /**
   * Vérifie si l'utilisateur est authentifié
   * @returns {boolean}
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  /**
   * Récupère le rôle de l'utilisateur connecté
   * @returns {string|null} ADMIN, EMPLOYEE, CUSTOMER ou null
   */
  getRole: () => {
    return localStorage.getItem("user_role");
  },

  /**
   * Vérifie si l'utilisateur est un administrateur
   * @returns {boolean}
   */
  isAdmin: () => {
    const role = localStorage.getItem("user_role");
    return role === "ADMIN" || role === "EMPLOYEE";
  },

  /**
   * Vérifie si l'utilisateur est un client
   * @returns {boolean}
   */
  isCustomer: () => {
    return localStorage.getItem("user_role") === "CUSTOMER";
  },

  /**
   * Récupère les données utilisateur depuis localStorage
   * @returns {Object|null}
   */
  getUserData: () => {
    const data = localStorage.getItem("user_data");
    return data ? JSON.parse(data) : null;
  },

  /**
   * Récupère les données client depuis localStorage
   * @returns {Object|null}
   */
  getCustomerData: () => {
    const data = localStorage.getItem("customer_data");
    return data ? JSON.parse(data) : null;
  },
};

// Export par défaut de l'instance API
export default api;
