// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       const user = await login(email, password); // ← Get user data
      
//       // Navigate based on role
//       switch (user.role) {
//         case 'employee':
//           navigate('/employee/dashboard');
//           break;
//         case 'finance_area':
//           navigate('/finance-area/dashboard');
//           break;
//         case 'finance_regional':
//           navigate('/finance-regional/dashboard');
//           break;
//         default:
//           navigate('/');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Telkom Akses</h1>
//           <p className="text-gray-600 mt-2">Business Trip Administration System</p>
//         </div>

//         <div className="mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign In</h2>
//           <p className="text-gray-600 text-center mt-2">Enter your credentials to access the system</p>
//         </div>

//         {error && (
//           <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-red-600 text-sm">{error}</p>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="your.email@telkomakses.co.id"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//               placeholder="••••••••"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? 'Signing In...' : 'Sign In'}
//           </button>
//         </form>

//         <div className="mt-6 p-4 bg-gray-50 rounded-lg">
//           <p className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</p>
//           <div className="space-y-1 text-xs text-gray-600">
//             <p><strong>Employee:</strong> budi@telkomakses.co.id / password123</p>
//             <p><strong>Finance Area:</strong> ahmad@telkomakses.co.id / password123</p>
//             <p><strong>Finance Regional:</strong> hendra@telkomakses.co.id / password123</p>
//           </div>
//         </div>

//         <p className="mt-6 text-center text-xs text-gray-500">
//           Secure access for authorized personnel only
//         </p>
//       </div>
//     </div>
//   );
// }






import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      // Redirect handled by AuthContext
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <img 
            src="/logo-telkom-akses.png" 
            alt="Telkom Akses" 
            className="h-16 w-auto mx-auto mb-4"
            onError={(e) => { 
              e.currentTarget.style.display = 'none'
            }}
          />
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Telkom Akses</h1>
          <p className="text-gray-600 mt-2 font-medium">Business Trip Administration System</p>
        </div>

        {/* Sign In Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Sign In</h2>
          <p className="text-gray-600 text-center mt-2">Enter your credentials to access the system</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
              placeholder="your.email@telkomakses.co.id"
              required
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-red-600 disabled:hover:to-red-700"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm font-bold text-gray-800 mb-3 text-center">Demo Credentials</p>
          <div className="space-y-2 text-xs">
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-blue-600">👨‍💼</span> Employee
              </p>
              <p className="text-gray-600 font-mono">budi@telkomakses.co.id</p>
              <p className="text-gray-600 font-mono">password123</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-purple-600">💼</span> Finance Area
              </p>
              <p className="text-gray-600 font-mono">ahmad@telkomakses.co.id</p>
              <p className="text-gray-600 font-mono">password123</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-orange-600">👔</span> Finance Regional
              </p>
              <p className="text-gray-600 font-mono">hendra@telkomakses.co.id</p>
              <p className="text-gray-600 font-mono">password123</p>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-green-600">👤</span> HR
              </p>
              <p className="text-gray-600 font-mono">hr@telkomakses.co.id</p>
              <p className="text-gray-600 font-mono">password</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure access for authorized personnel only
          </p>
          <p className="text-xs text-gray-400 mt-2">
            © 2025 Telkom Akses. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}