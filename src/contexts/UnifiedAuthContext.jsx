import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UnifiedAuthContext = createContext();

export const useUnifiedAuth = () => {
  const context = useContext(UnifiedAuthContext);
  if (!context) {
    throw new Error("useUnifiedAuth must be used within a UnifiedAuthProvider");
  }
  return context;
};

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const UnifiedAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        const response = await axios.get(`${API_URL}/auth/me/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUser(response.data.user);
        setRole(response.data.role);

        // Peut-être response.data.customer et non .client ?
        if (response.data.customer) {
          setClient(response.data.customer);
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, {
        username,
        password,
      });

      const { tokens, user, role, customer, redirect } = response.data;

      // Sauvegarder les tokens
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      // Mettre à jour l'état
      setUser(user);
      setRole(role);

      if (customer) {
        setClient(customer);
        localStorage.setItem("client_data", JSON.stringify(customer));
      }

      return {
        success: true,
        redirect: redirect,
        role: role,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erreur de connexion",
      };
    }
  };

  const register = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register/`, data);

      const { tokens, user, customer, redirect } = response.data;

      // Sauvegarder les tokens
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      // Mettre à jour l'état
      setUser(user);
      setRole("CLIENT");
      setClient(customer);
      localStorage.setItem("client_data", JSON.stringify(customer));

      return {
        success: true,
        redirect: redirect,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Erreur lors de l'inscription",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("client_data");
    setUser(null);
    setRole(null);
    setClient(null);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem("access_token");
  };

  const isAdmin = () => {
    return role === "ADMIN" || role === "EMPLOYEE";
  };

  const isClient = () => {
    return role === "CLIENT";
  };

  const value = {
    user,
    role,
    client,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    isClient,
    loading,
  };

  return (
    <UnifiedAuthContext.Provider value={value}>
      {children}
    </UnifiedAuthContext.Provider>
  );
};
