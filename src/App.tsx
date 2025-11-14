import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

import Login from "./auth/LoginPage"
import EmployeeDashboard from "./pages/employee/Dashboard"
import MyTrips from "./pages/employee/MyTrips"
import NewTrip from "./pages/employee/NewTrip"
import TripDetail from "./pages/employee/TripDetail"
import History from "./pages/employee/History"
// Tambahan import halaman employee baru:
import NewAdvance from "./pages/employee/NewAdvance"
import UploadReceipt from "./pages/employee/UploadReceipt"
import TripExtension from "./pages/employee/TripExtension"
import Notifications from "./pages/employee/Notifications"
import FinanceDashboard from "./pages/finance/Dashboard"
import AdminDashboard from "./pages/admin/Dashboard"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Routes employee yang sudah ada */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/trips"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <MyTrips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/trips/new"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <NewTrip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/trips/:id"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <TripDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/history"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Tambahan routes employee */}
        <Route
          path="/employee/advances/new"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <NewAdvance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/receipts/new"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <UploadReceipt />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/trips/:id/extension"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <TripExtension />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/notifications"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/finance-area/dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <FinanceDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/finance-regional/dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance_regional"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<RoleBasedRedirect />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
)

const RoleBasedRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />

  switch (user?.role) {
    case "employee":
      return <Navigate to="/employee/dashboard" replace />
    case "finance_area":
      return <Navigate to="/finance-area/dashboard" replace />
    case "finance_regional":
      return <Navigate to="/finance-regional/dashboard" replace />
    default:
      return <Navigate to="/login" replace />
  }
}

export default App