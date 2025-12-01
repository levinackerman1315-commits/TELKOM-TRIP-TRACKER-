
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

// ✅ Landing Page
import LandingPage from "./pages/LandingPage"
import Login from "./auth/LoginPage"

// Employee Pages
import EmployeeDashboard from "./pages/employee/Dashboard"
import MyTrips from "./pages/employee/MyTrips"
import NewTrip from "./pages/employee/NewTrip"
import TripDetail from "./pages/employee/TripDetail"
import History from "./pages/employee/History"
import NewAdvance from "./pages/employee/NewAdvance"
import UploadReceipt from "./pages/employee/UploadReceipt"
import TripExtension from "./pages/employee/TripExtension"
import EmployeeNotifications from "./pages/employee/Notifications"
import EmployeeProfile from "./pages/employee/Profile"

// Finance Area (Admin folder) Pages
import FinanceAreaDashboard from "./pages/admin/Dashboard"
import AdvanceDetail from "./pages/admin/AdvanceDetail"
import AdvanceRequestsContent from "./pages/admin/AdvanceRequestsContent"
import TripSettlementReview from "./pages/admin/TripSettlementReview"
import OngoingTripDetail from "./pages/admin/OngoingTripDetail" // ✅ NEW: Ongoing Trip Detail
import FinanceAreaNotifications from "./pages/admin/Notifications"
import FinanceAreaProfile from "./pages/admin/Profile"
import FinanceAreaSettings from "./pages/admin/Settings"

// Finance Regional Pages
import FinanceRegionalDashboard from "./pages/finance/Dashboard"
import FinanceRegionalSettlementDetail from "./pages/finance/SettlementDetail"
import FinanceRegionalNotifications from "./pages/finance/Notifications"
import FinanceRegionalProfile from "./pages/finance/Profile"

// HR Pages
import HRDashboard from "./pages/hr/dashboard"
import UserManagement from "./pages/hr/UserManagement"
import UserDetail from "./pages/hr/UserDetail"
import HRProfile from "./pages/hr/Profile"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Routes>
        {/* ============================================ */}
        {/* PUBLIC ROUTES */}
        {/* ============================================ */}
        {/* ✅ Smart Root: Landing if not logged in, Dashboard if logged in */}
        <Route path="/" element={<SmartRootRedirect />} />
        <Route path="/login" element={<Login />} />

        {/* ============================================ */}
        {/* EMPLOYEE ROUTES */}
        {/* ============================================ */}
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
              <EmployeeNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeProfile />
            </ProtectedRoute>
          }
        />

        {/* ============================================ */}
        {/* FINANCE AREA ROUTES (folder admin) */}
        {/* ============================================ */}
        
        {/* ✅ Dashboard - Accessible via both routes */}
        <Route
          path="/finance-area"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <FinanceAreaDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance-area/dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <FinanceAreaDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* ✅ NEW: ONGOING TRIP DETAIL (Read-Only) */}
        <Route
          path="/finance-area/ongoing-trips/:id"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <OngoingTripDetail />
            </ProtectedRoute>
          }
        />
        
        {/* ✅ SETTLEMENT REVIEW (Actions: Approve/Reject) */}
        <Route
          path="/finance-area/trips/:id"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <TripSettlementReview />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/finance-area/advances/:id"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <AdvanceDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance-area/advances"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <AdvanceRequestsContent />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/finance-area/notifications"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <FinanceAreaNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance-area/profile"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <FinanceAreaProfile />
            </ProtectedRoute>
          }
        />
        
        {/* ✅ Finance Area Settings */}
        <Route
          path="/finance-area/settings"
          element={
            <ProtectedRoute allowedRoles={["finance_area"]}>
              <FinanceAreaSettings />
            </ProtectedRoute>
          }
        />

        {/* ============================================ */}
        {/* FINANCE REGIONAL ROUTES (folder finance) */}
        {/* ============================================ */}
        <Route
          path="/finance-regional/dashboard"
          element={
            <ProtectedRoute allowedRoles={["finance_regional"]}>
              <FinanceRegionalDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance-regional/settlements/:id"
          element={
            <ProtectedRoute allowedRoles={["finance_regional"]}>
              <FinanceRegionalSettlementDetail />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/finance-regional/notifications"
          element={
            <ProtectedRoute allowedRoles={["finance_regional"]}>
              <FinanceRegionalNotifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/finance-regional/profile"
          element={
            <ProtectedRoute allowedRoles={["finance_regional"]}>
              <FinanceRegionalProfile />
            </ProtectedRoute>
          }
        />

        {/* ============================================ */}
        {/* HR ROUTES */}
        {/* ============================================ */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <HRDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/users/create"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/users/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/users/:id"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <UserDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hr/profile"
          element={
            <ProtectedRoute allowedRoles={["hr"]}>
              <HRProfile />
            </ProtectedRoute>
          }
        />

        {/* ============================================ */}
        {/* FALLBACK ROUTE */}
        {/* ============================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
)

// ✅ Smart Root Redirect Component
const SmartRootRedirect = () => {
  const { isAuthenticated, user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    )
  }

  // ✅ Not logged in → Show Landing Page
  if (!isAuthenticated) return <LandingPage />

  // ✅ Logged in → Redirect to role dashboard
  switch (user?.role) {
    case "employee":
      return <Navigate to="/employee/dashboard" replace />
    case "finance_area":
      return <Navigate to="/finance-area/dashboard" replace />
    case "finance_regional":
      return <Navigate to="/finance-regional/dashboard" replace />
    case "hr":
      return <Navigate to="/hr/dashboard" replace />
    default:
      return <Navigate to="/login" replace />
  }
}

export default App