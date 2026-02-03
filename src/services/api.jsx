import axios from "axios";

// URL de l'API
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
//const API_URL = process.env.REACT_APP_API_URL;

// Instance Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour ajouter le token JWT
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
  }
);

// Intercepteur pour gérer le refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post(
          `${API_URL.replace("/api", "")}/api/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const { access } = response.data;
        localStorage.setItem("access_token", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Service d'authentification
export const authService = {
  login: async (username, password) => {
    const response = await axios.post(
      `${API_URL.replace("/api", "")}/api/token/`,
      {
        username,
        password,
      }
    );
    const { access, refresh } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("access_token");
  },

  getUser: () => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  },
};

// Service Clients
export const clientService = {
  getAll: (params) => api.get("/customers/", { params }),
  getById: (id) => api.get(`/customers/${id}/`),
  create: (data) => api.post("/customers/", data),
  update: (id, data) => api.put(`/customers/${id}/`, data),
  delete: (id) => api.delete(`/customers/${id}/`),
  getCommandes: (id) => api.get(`/customers/${id}/orders/`),
  getStatistiques: (id) => api.get(`/customers/${id}/statistics/`),
};

// Service Catégories
export const categorieService = {
  getAll: (params) => api.get("/categories/", { params }),
  getById: (id) => api.get(`/categories/${id}/`),
  create: (data) => api.post("/categories/", data),
  update: (id, data) => api.put(`/categories/${id}/`, data),
  delete: (id) => api.delete(`/categories/${id}/`),
};

// Service Services
export const serviceService = {
  getAll: (params) => api.get("/services/", { params }),
  getById: (id) => api.get(`/services/${id}/`),
  create: (data) => api.post("/services/", data),
  update: (id, data) => api.put(`/services/${id}/`, data),
  delete: (id) => api.delete(`/services/${id}/`),
};

// Service Commandes
export const commandeService = {
  getAll: (params) => api.get("/orders/", { params }),
  getById: (id) => api.get(`/orders/${id}/`),
  create: (data) => api.post("/orders/", data),
  update: (id, data) => api.put(`/orders/${id}/`, data),
  delete: (id) => api.delete(`/orders/${id}/`),
  changerStatut: (id, statut) =>
    api.post(`/orders/${id}/change_status/`, { statut }),
  ajouterPaiement: (id, data) =>
    api.post(`/orders/${id}/add_payment/`, data),
  getStatistiques: () => api.get("/orders/statistics/"),
};

// Service Paiements
export const paiementService = {
  getAll: (params) => api.get("/payments/", { params }),
  getById: (id) => api.get(`/payments/${id}/`),
  create: (data) => api.post("/payments/", data),
};

export default api;
