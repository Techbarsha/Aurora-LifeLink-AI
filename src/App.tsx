import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CancerDetectionPage from './pages/CancerDetectionPage';
import DonorManagementPage from './pages/DonorManagementPage';
import CampLocatorPage from './pages/CampLocatorPage';
import BloodRequestPage from './pages/BloodRequestPage';
import AppointmentPage from './pages/AppointmentPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="cancer-detection" element={
              <ProtectedRoute>
                <CancerDetectionPage />
              </ProtectedRoute>
            } />
            <Route path="donor-management" element={
              <ProtectedRoute>
                <DonorManagementPage />
              </ProtectedRoute>
            } />
            <Route path="camp-locator" element={
              <ProtectedRoute>
                <CampLocatorPage />
              </ProtectedRoute>
            } />
            <Route path="blood-request" element={
              <ProtectedRoute>
                <BloodRequestPage />
              </ProtectedRoute>
            } />
            <Route path="appointments" element={
              <ProtectedRoute>
                <AppointmentPage />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;