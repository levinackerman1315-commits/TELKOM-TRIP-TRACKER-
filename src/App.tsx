import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          {/* Employee Routes */}
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/trips/:id" element={<EmployeeTripDetail />} />
          <Route path="/employee/new-trip" element={<NewTrip />} />
          <Route path="/employee/history" element={<MyTrips />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/trips/:id" element={<AdminTripDetail />} />

          {/* Finance Routes */}
          <Route path="/finance/dashboard" element={<FinanceDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;