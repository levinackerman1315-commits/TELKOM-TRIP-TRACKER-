// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { ReactNode } from 'react';

// interface ProtectedRouteProps {
//   children: ReactNode;
//   allowedRoles?: ('employee' | 'finance_area' | 'finance_regional')[];
// }

// export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
//   const { isAuthenticated, isLoading, user } = useAuth();

//   // Show loading while checking authentication
//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   // Redirect to login if not authenticated
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if user role is allowed
//   if (allowedRoles && user && !allowedRoles.includes(user.role)) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
//           <p className="text-gray-600">You don't have permission to access this page.</p>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };



import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ('employee' | 'finance_area' | 'finance_regional' | 'hr')[]; // ✅ TAMBAH 'hr'
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is allowed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};