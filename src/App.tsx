import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
import AppShell from './components/layout/AppShell';

import SplashScreen from './pages/SplashScreen';
import LanguageScreen from './pages/LanguageScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/register/RegisterScreen';
import DashboardScreen from './pages/DashboardScreen';
import VerificationScreen from './pages/VerificationScreen';
import BeneficiariesScreen from './pages/BeneficiariesScreen';
import AddBeneficiaryScreen from './pages/AddBeneficiaryScreen';
import FreshApplicationScreen from './pages/FreshApplicationScreen';
import ExistingKycScreen from './pages/ExistingKycScreen';
import ApplicationsScreen from './pages/ApplicationsScreen';
import PaymentsScreen from './pages/PaymentsScreen';
import ProfileScreen from './pages/ProfileScreen';
import ApplicationSuccess from './pages/ApplicationSuccess';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/language" element={<LanguageScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/application-success" element={
        <ProtectedRoute>
          <ApplicationSuccess />
        </ProtectedRoute>
      } />

      <Route element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/beneficiaries" element={<BeneficiariesScreen />} />
        <Route path="/applications" element={<ApplicationsScreen />} />
        <Route path="/payments" element={<PaymentsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        {/* Legacy redirect */}
        <Route path="/family" element={<Navigate to="/beneficiaries" replace />} />
      </Route>

      <Route path="/beneficiaries/add" element={
        <ProtectedRoute>
          <AddBeneficiaryScreen />
        </ProtectedRoute>
      } />
      <Route path="/application/fresh" element={
        <ProtectedRoute>
          <FreshApplicationScreen />
        </ProtectedRoute>
      } />
      <Route path="/kyc/existing" element={
        <ProtectedRoute>
          <ExistingKycScreen />
        </ProtectedRoute>
      } />
      <Route path="/verification" element={
        <ProtectedRoute>
          <VerificationScreen />
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}
