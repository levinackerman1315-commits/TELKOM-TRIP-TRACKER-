import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { login as apiLogin, logout as apiLogout, getStoredUser } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: 'employee' | 'finance') => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'employee' | 'finance') => {
    try {
      setIsLoading(true);
      const response = await apiLogin({ email, password, role });
      setUser(response.user);
      toast.success('Login berhasil!');
    } catch (error: any) {
      toast.error(error.message || 'Login gagal');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      toast.success('Logout berhasil');
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear user even if API call fails
      setUser(null);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
