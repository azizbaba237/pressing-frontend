import axios from "axios";

// URL de l'API
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

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
  },
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
          },
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
  },
);

// Service d'authentification
export const authService = {
  login: async (username, password) => {
    const response = await axios.post(
      `${API_URL.replace("/api", "")}/api/token/`,
      {
        username,
        password,
      },
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
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  },
};

// Service Clients
export const clientService = {
  getAll: (params) => api.get("/api/customers/", { params }),
  getById: (id) => api.get(`/api/customers/${id}/`),
  create: (data) => api.post("/api/customers/", data),
  update: (id, data) => api.put(`/api/customers/${id}/`, data),
  delete: (id) => api.delete(`/api/customers/${id}/`),
  getCommandes: (id) => api.get(`/api/customers/${id}/orders/`),
  getStatistiques: (id) => api.get(`/api/customers/${id}/statistics/`),
};

// Service Catégories
export const categorieService = {
  getAll: (params) => api.get("/api/categories/", { params }),
  getById: (id) => api.get(`/api/categories/${id}/`),
  create: (data) => api.post("/api/categories/", data),
  update: (id, data) => api.put(`/api/categories/${id}/`, data),
  delete: (id) => api.delete(`/api/categories/${id}/`),
};

// Service Services
export const serviceService = {
  getAll: (params) => api.get("/api/services/", { params }),
  getById: (id) => api.get(`/api/services/${id}/`),
  create: (data) => api.post("/api/services/", data),
  update: (id, data) => api.put(`/api/services/${id}/`, data),
  delete: (id) => api.delete(`/api/services/${id}/`),
};

// Service Commandes
export const commandeService = {
  getAll: (params) => api.get("/api/orders/", { params }),
  getById: (id) => api.get(`/api/orders/${id}/`),
  create: (data) => api.post("/api/orders/", data),
  update: (id, data) => api.put(`/api/orders/${id}/`, data),
  delete: (id) => api.delete(`/api/orders/${id}/`),
  changerStatut: (id, status) =>
    api.post(`/api/orders/${id}/change_status/`, { status }),
  ajouterPaiement: (id, data) =>
    api.post(`/api/orders/${id}/add_payment/`, data),
  getStatistiques: () => api.get("/api/orders/statistics/"),
};

// Service Paiements
export const paiementService = {
  getAll: (params) => api.get("/api/payments/", { params }),
  getById: (id) => api.get(`/api/payments/${id}/`),
  create: (data) => api.post("/api/payments/", data),
};

export default api;
