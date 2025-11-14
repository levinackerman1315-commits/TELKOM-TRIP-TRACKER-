import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [financeEmail, setFinanceEmail] = useState("");
  const [financePassword, setFinancePassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleEmployeeLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(employeeEmail, employeePassword);
      localStorage.setItem("userRole", "employee");
      toast.success("Login successful!");
      navigate("/employee/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinanceLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(financeEmail, financePassword);
      localStorage.setItem("userRole", "finance");
      toast.success("Login successful!");
      navigate("/finance/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Telkom Akses</h1>
          <p className="text-gray-600 mt-2">Business Trip Administration System</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">Sign In</h2>
        <p className="text-gray-600 text-center mb-6">Enter your credentials to access the system</p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleEmployeeLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <Label htmlFor="employee-email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </Label>
            <Input
              id="employee-email"
              type="email"
              placeholder="employee@telkomakses.co.id"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="employee-password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </Label>
            <Input
              id="employee-password"
              type="password"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-3 text-center">Demo Credentials:</p>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">👨‍💼 Employee</p>
              <p className="text-xs text-gray-600">budi@telkomakses.co.id</p>
              <p className="text-xs text-gray-600">password123</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">💼 Finance Area</p>
              <p className="text-xs text-gray-600">ahmad@telkomakses.co.id</p>
              <p className="text-xs text-gray-600">password123</p>
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">👔 Finance Regional</p>
              <p className="text-xs text-gray-600">hendra@telkomakses.co.id</p>
              <p className="text-xs text-gray-600">password123</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">Secure access for authorized personnel only</p>
      </div>
    </div>
  );
}
