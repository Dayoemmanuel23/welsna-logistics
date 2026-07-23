import AdminLogin from "@/components/admin/login/AdminLogin";
import AdminLayout from "@/components/admin/layout/AdminLayout";
import ProtectedRoute from "@/components/admin/layout/ProtectedRoute";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import apiClient from "@/api/apiClient";
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/welsna/UserNotRegisteredError';
import ScrollToTop from '@/components/welsna/ScrollToTop';
// Add page imports here
import Home from '@/components/pages/Home';
import Shipments from "@/components/admin/shipments/Shipments";
import Quotes from "@/components/admin/quotes/Quotes";
import Contacts from "@/components/admin/contacts/Contacts";
import Users from "@/components/admin/users/Users";
import Settings from "@/components/admin/settings/Settings";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();
  

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
  <Routes>

  <Route path="/" element={<Home />} />

  <Route
    path="/admin/login"
    element={<AdminLogin />}
  />

  <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
    <Route index element={<Dashboard />} />
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="shipments" element={<Shipments />} />
    <Route path="quotes" element={<Quotes />} />
    <Route path="contacts" element={<Contacts />} />
    <Route path="users" element={<Users />} />
    <Route path="settings" element={<Settings />} />
</Route>

  <Route path="*" element={<PageNotFound />} />

</Routes>
);
};

function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App