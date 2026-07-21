import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
import AppShell from './components/layout/AppShell';

// Pages
import SplashScreen from './pages/SplashScreen';
import LanguageScreen from './pages/LanguageScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/register/RegisterScreen';
import DashboardScreen from './pages/DashboardScreen';
import VerificationScreen from './pages/VerificationScreen';
import FamilyScreen from './pages/FamilyScreen';
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
      <Route path="/application-success" element={<ApplicationSuccess />} />

      {/* Protected routes with bottom nav */}
      <Route element={
        <ProtectedRoute>
          <AppShell />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<DashboardScreen />} />
        <Route path="/family" element={<FamilyScreen />} />
        <Route path="/payments" element={<PaymentsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* Verification (full screen) */}
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
