import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ClientAuthProvider } from "./contexts/ClientAuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import ClientPrivateRoute from "./utils/clients/ClientPrivateRoute";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Commandes from "./pages/Commandes";
import Services from "./pages/Services";
import Paiements from "./pages/Paiements";
import Rapports from "./pages/Rapports";
import Parametres from "./pages/Parametres";
import NotFound from "./pages/NotFound";

// Pages Client
import ClientLogin from "./pages/client/ClientLogin";
import ClientRegister from "./pages/client/ClientRegister";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientCommandes from "./pages/client/ClientCommandes";
import ClientServices from "./pages/client/ClientServices";
import ClientContact from "./pages/client/ClientContact";
import ClientProfil from "./pages/client/ClientProfil";

// Landing Page
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <AuthProvider>
      <ClientAuthProvider>
        <Router>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Routes Admin - Authentification */}
            <Route path="/admin/login" element={<Login />} />

            {/* Routes Admin - Protégées */}
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <PrivateRoute>
                  <Clients />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/commandes"
              element={
                <PrivateRoute>
                  <Commandes />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <PrivateRoute>
                  <Services />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/paiements"
              element={
                <PrivateRoute>
                  <Paiements />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/rapports"
              element={
                <PrivateRoute>
                  <Rapports />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/parametres"
              element={
                <PrivateRoute>
                  <Parametres />
                </PrivateRoute>
              }
            />

            {/* Routes Client - Publiques */}
            <Route path="/client/login" element={<ClientLogin />} />
            <Route path="/client/register" element={<ClientRegister />} />
            <Route path="/client/services" element={<ClientServices />} />
            <Route path="/client/contact" element={<ClientContact />} />

            {/* Routes Client - Protégées */}
            <Route
              path="/client/dashboard"
              element={
                <ClientPrivateRoute>
                  <ClientDashboard />
                </ClientPrivateRoute>
              }
            />
            <Route
              path="/client/commandes"
              element={
                <ClientPrivateRoute>
                  <ClientCommandes />
                </ClientPrivateRoute>
              }
            />
            <Route
              path="/client/profil"
              element={
                <ClientPrivateRoute>
                  <ClientProfil />
                </ClientPrivateRoute>
              }
            />

            {/* Redirections pour compatibilité */}
            <Route
              path="/login"
              element={<Navigate to="/admin/login" replace />}
            />
            <Route
              path="/clients"
              element={<Navigate to="/admin/clients" replace />}
            />
            <Route
              path="/commandes"
              element={<Navigate to="/admin/commandes" replace />}
            />
            <Route
              path="/services"
              element={<Navigate to="/admin/services" replace />}
            />
            <Route
              path="/paiements"
              element={<Navigate to="/admin/paiements" replace />}
            />
            <Route
              path="/rapports"
              element={<Navigate to="/admin/rapports" replace />}
            />
            <Route
              path="/parametres"
              element={<Navigate to="/admin/parametres" replace />}
            />

            {/* Route 404 */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ClientAuthProvider>
    </AuthProvider>
  );
}

export default App;
