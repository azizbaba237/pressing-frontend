import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { UnifiedAuthProvider } from "./contexts/UnifiedAuthContext";

// Pages
import UnifiedLogin from "./pages/UnifiedLogin";
import UnifiedRegister from "./pages/UnifiedRegister";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Commandes from "./pages/Commandes";
import Services from "./pages/Services";
import Paiements from "./pages/Paiements";
import Rapports from "./pages/Rapports";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";

// Pages Client
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientCommandes from "./pages/client/ClientCommandes";
import ClientServices from "./pages/client/ClientServices";
import ClientContact from "./pages/client/ClientContact";
import ClientProfil from "./pages/client/ClientProfil";

// Landing Page
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <UnifiedAuthProvider>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentification */}
          <Route path="/login" element={<UnifiedLogin />} />
          <Route path="/register" element={<UnifiedRegister />} />

          {/* Routes Admin - Protégées */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/clients"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/commandes"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Commandes />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Services />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/paiements"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Paiements />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/rapports"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Rapports />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/parametres"
            element={
              <PrivateRoute requiredRole="ADMIN">
                <Parametres />
              </PrivateRoute>
            }
          />

          {/* Routes Client - Publiques */}
          <Route path="/client/services" element={<ClientServices />} />
          <Route path="/client/contact" element={<ClientContact />} />

          {/* Routes Client - Protégées */}
          <Route
            path="/client/dashboard"
            element={
              <PrivateRoute requiredRole="CUSTOMER">
                <ClientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/commandes"
            element={
              <PrivateRoute requiredRole="CUSTOMER">
                <ClientCommandes />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/profil"
            element={
              <PrivateRoute requiredRole="CUSTOMER">
                <ClientProfil />
              </PrivateRoute>
            }
          />

          {/* Route 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </UnifiedAuthProvider>
  );
}

export default App;
