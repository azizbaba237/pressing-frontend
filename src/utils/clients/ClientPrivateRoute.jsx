import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/api";
import Loader from "../components/common/Loader";

const PrivateRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/login");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    if (!authService.isAuthenticated()) {
      setIsAuthorized(false);
      setRedirectPath("/login");
      setLoading(false);
      return;
    }

    const userRole = authService.getRole();

    // Vérifier le rôle requis
    if (requiredRole) {
      if (
        requiredRole === "ADMIN" &&
        (userRole === "ADMIN" || userRole === "EMPLOYEE")
      ) {
        setIsAuthorized(true);
      } else if (requiredRole === "CUSTOMER" && userRole === "CUSTOMER") {
        setIsAuthorized(true);
      } else {
        // Rediriger vers le bon dashboard selon le rôle
        if (userRole === "ADMIN" || userRole === "EMPLOYEE") {
          setRedirectPath("/admin/dashboard");
        } else if (userRole === "CUSTOMER") {
          setRedirectPath("/client/dashboard");
        }
        setIsAuthorized(false);
      }
    } else {
      setIsAuthorized(true);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader text="Vérification de l'authentification..." />
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to={redirectPath} replace />;
};

export default PrivateRoute;
