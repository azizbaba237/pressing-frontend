import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const CLIENT_API_URL = API_URL;

const clientApi = axios.create({
    baseURL: CLIENT_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

clientApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('client_access_token');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

clientApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('client_refresh_token');
                const response = await axios.post(`${API_URL.replace('/api', '')}/api/token/refresh/`, {
                    refresh: refreshToken,
                });
                const { access } = response.data;
                localStorage.setItem('client_access_token', access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return clientApi(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('client_access_token');
                localStorage.removeItem('client_refresh_token');
                localStorage.removeItem('client_data');
                window.location.href = '/client/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export const clientAuthService = {
    register: async (data) => {
        const response = await axios.post(`${CLIENT_API_URL}/register/`, data);
        if (response.data.tokens) {
            localStorage.setItem('client_access_token', response.data.tokens.access);
            localStorage.setItem('client_refresh_token', response.data.tokens.refresh);
            localStorage.setItem('client_data', JSON.stringify(response.data.customer));
        }
        return response.data;
    },

    login: async (username, password) => {
        const response = await axios.post(`${CLIENT_API_URL}/login/`, { username, password });
        if (response.data.tokens) {
            localStorage.setItem('client_access_token', response.data.tokens.access);
            localStorage.setItem('client_refresh_token', response.data.tokens.refresh);
            localStorage.setItem('client_data', JSON.stringify(response.data.customer));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('client_access_token');
        localStorage.removeItem('client_refresh_token');
        localStorage.removeItem('client_data');
    },

    isAuthenticated: () => !!localStorage.getItem('client_access_token'),

    getClientData: () => {
        const data = localStorage.getItem('client_data');
        return data ? JSON.parse(data) : null;
    },
};

export const clientProfileService = {
    getProfile: () => clientApi.get('/profile/'),
    getMesCommandes: () => clientApi.get('/profile/my_orders/'),
    getStatistiques: () => clientApi.get('/profile/statistics/'),
    updateProfile: (data) => clientApi.put('/profile/update_profile/', data),
};

// ✅ Routes publiques — pas de token requis
export const publicServiceService = {
    getAll: (params) => axios.get(`${CLIENT_API_URL}/public/services/`, { params }),
    getById: (id) => axios.get(`${CLIENT_API_URL}/public/services/${id}/`),
};

export const publicCategorieService = {
    getAll: (params) => axios.get(`${CLIENT_API_URL}/public/categories/`, { params }),
};

export const contactService = {
    sendMessage: (data) => axios.post(`${CLIENT_API_URL}/contact/`, data),
};

export default clientApi;