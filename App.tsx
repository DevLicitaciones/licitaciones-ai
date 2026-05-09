
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MarketingLayout from './components/MarketingLayout';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Marketing pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import Plans from './pages/Plans';
import HowItWorks from './pages/HowItWorks';
import Technology from './pages/Technology';

// Dashboard pages
import Overview from './pages/dashboard/Overview';
import Radar from './pages/dashboard/Radar';
import Predictivo from './pages/dashboard/Predictivo';
import Seguimiento from './pages/dashboard/Seguimiento';
import Perfil from './pages/dashboard/Perfil';
import Suscripcion from './pages/dashboard/Suscripcion';
import Configuracion from './pages/dashboard/Configuracion';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Marketing site (Navbar + Footer) */}
            <Route element={<MarketingLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/quienes-somos" element={<AboutUs />} />
              <Route path="/planes" element={<Plans />} />
              <Route path="/como-funciona" element={<HowItWorks />} />
              <Route path="/tecnologia" element={<Technology />} />
            </Route>

            {/* Customer dashboard (sidebar + topbar, requires auth) */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="radar" element={<Radar />} />
                <Route path="predictivo" element={<Predictivo />} />
                <Route path="seguimiento" element={<Seguimiento />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="suscripcion" element={<Suscripcion />} />
                <Route path="configuracion" element={<Configuracion />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
