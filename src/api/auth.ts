import API_URL, { getAuthHeaders, handleApiError } from './config';

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'employee' | 'finance';
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'employee' | 'finance';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Login function
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login gagal');
    }

    const data = await response.json();
    
    // Simpan token ke localStorage
    localStorage.setItem('auth_token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return data;
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Logout function
export const logout = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Clear local storage regardless of API call result
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
  }
};

// Get current user
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

// Get stored user
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};
