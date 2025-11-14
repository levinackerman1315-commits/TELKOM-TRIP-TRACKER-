import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Index from "./pages/Index";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage"; // Import landing page

// Employee
import EmployeeDashboard from "./pages/employee/Dashboard";
import NewTrip from "./pages/employee/NewTrip";
import EmployeeTripDetail from "./pages/employee/TripDetail";
import MyTrips from "./pages/employee/MyTrips";

// Admin (Finance Area)
import AdminDashboard from "./pages/admin/Dashboard";
import AdminTripDetail from "./pages/admin/TripDetail";

import FinanceDashboard from "./pages/finance/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Employee Routes */}
          <Route
            path="/employee/dashboard"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/employee/trips/:id" element={<EmployeeTripDetail />} />
          <Route path="/employee/new-trip" element={<NewTrip />} />
          <Route path="/employee/history" element={<MyTrips />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/trips/:id" element={<AdminTripDetail />} />

          {/* Finance Routes */}
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />

          {/* Default Route - Redirect berdasarkan role */}
          <Route path="/" element={<RoleBasedRedirect />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Component untuk redirect berdasarkan role
const RoleBasedRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Redirect based on role
  switch (user?.role) {
    case "employee":
      return <Navigate to="/employee/dashboard" replace />;
    case "finance_area":
      return <Navigate to="/finance-area/dashboard" replace />;
    case "finance_regional":
      return <Navigate to="/finance-regional/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

// 404 Page
const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default App;