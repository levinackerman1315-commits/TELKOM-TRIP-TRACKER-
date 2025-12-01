
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';

export default function Login() {
  const [identifier, setIdentifier] = useState(''); // Email atau NIK
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // ✅ Track if user has interacted AFTER error
  const [identifierTouched, setIdentifierTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  
  // ✅ Success dialog
  const [showSuccess, setShowSuccess] = useState(false);
  const [successUser, setSuccessUser] = useState<any>(null);
  
  const { login } = useAuth();

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    
    // Reset touch states
    setIdentifierTouched(false);
    setPasswordTouched(false);

    try {
      const userData = await login(identifier, password);
      
      // ✅ Show success dialog
      setSuccessUser(userData);
      setShowSuccess(true);
      
      // Auto close after 2 seconds (redirect handled by AuthContext)
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Clear error only when user blurs after typing
  const handleIdentifierBlur = () => {
    if (identifierTouched && error) {
      setError('');
    }
  };
  
  const handlePasswordBlur = () => {
    if (passwordTouched && error) {
      setError('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && identifier && password && !isLoading) {
      handleSubmit();
    }
  };

  // ✅ Quick fill for testing
  const fillDemo = (credentials: { identifier: string; password: string }) => {
    setIdentifier(credentials.identifier);
    setPassword(credentials.password);
    setError('');
    setIdentifierTouched(false);
    setPasswordTouched(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-50">
      {/* ✅ Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-scaleIn">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h3>
              <p className="text-gray-600 mb-1">Welcome back, {successUser?.name}!</p>
              <p className="text-sm text-gray-500">Redirecting to your dashboard...</p>
            </div>
          </div>
        </div>
      )}

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

        {/* ✅ Error Message - NO BLINK! */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 text-sm font-semibold">Login Failed</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <div className="space-y-5">
          {/* Identifier Field - Email atau NIK */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email or NIK
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.target.value);
                setIdentifierTouched(true);
              }}
              onBlur={handleIdentifierBlur}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
              placeholder="EMP001 or your.email@telkomakses.co.id"
              disabled={isLoading}
              autoComplete="off"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordTouched(true);
                }}
                onBlur={handlePasswordBlur}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
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
            onClick={handleSubmit}
            disabled={isLoading || !identifier || !password}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-red-600 disabled:hover:to-red-700"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <p className="text-sm font-bold text-gray-800 mb-3 text-center">Demo Credentials</p>
          <div className="space-y-2 text-xs">
            <button
              type="button"
              onClick={() => fillDemo({ identifier: 'EMP001', password: 'password123' })}
              className="w-full bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow text-left"
            >
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-blue-600">👨‍💼</span> Employee
              </p>
              <p className="text-gray-600 font-mono">EMP001 / password123</p>
            </button>
            
            <button
              type="button"
              onClick={() => fillDemo({ identifier: 'FIN001', password: 'password123' })}
              className="w-full bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow text-left"
            >
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-purple-600">💼</span> Finance Area
              </p>
              <p className="text-gray-600 font-mono">FIN001 / password123</p>
            </button>
            
            <button
              type="button"
              onClick={() => fillDemo({ identifier: 'REG001', password: 'password123' })}
              className="w-full bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow text-left"
            >
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-orange-600">👔</span> Finance Regional
              </p>
              <p className="text-gray-600 font-mono">REG001 / password123</p>
            </button>
            
            <button
              type="button"
              onClick={() => fillDemo({ identifier: 'HR001', password: 'password' })}
              className="w-full bg-white p-3 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow text-left"
            >
              <p className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                <span className="text-green-600">👤</span> HR
              </p>
              <p className="text-gray-600 font-mono">HR001 / password</p>
            </button>
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

      {/* ✅ Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}