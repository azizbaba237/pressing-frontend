import React from "react";
import { Navigate } from "react-router-dom";
//import { useAuth } from "../contexts/AuthContext";
import { useUnifiedAuth } from'../contexts/UnifiedAuthContext';
import Loader from "../components/common/Loader";

const PrivateRoute = ({ children }) => {
  //const { isAuthenticated, loading } = useAuth();
  const { isAuthenticated, loading } = useUnifiedAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Chargement..." />
      </div>
    );
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
