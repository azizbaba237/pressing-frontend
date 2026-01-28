import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import Commandes from './pages/Commandes';
import Services from './pages/Services';
import Paiements from './pages/Paiements';
import Rapports from './pages/Rapports';
import Parametres from './pages/Parametres';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<Login />} />

          {/* Routes protégées */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />
          <Route
            path="/commandes"
            element={
              <PrivateRoute>
                <Commandes />
              </PrivateRoute>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <Services />
              </PrivateRoute>
            }
          />
          <Route
            path="/paiements"
            element={
              <PrivateRoute>
                <Paiements />
              </PrivateRoute>
            }
          />
          <Route
            path="/rapports"
            element={
              <PrivateRoute>
                <Rapports />
              </PrivateRoute>
            }
          />
          <Route
            path="/parametres"
            element={
              <PrivateRoute>
                <Parametres />
              </PrivateRoute>
            }
          />

          {/* Route 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;