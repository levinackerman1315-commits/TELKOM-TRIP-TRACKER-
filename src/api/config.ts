// API Base Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function untuk handle API errors
export const handleApiError = (error: any) => {
  if (error.response) {
    // Server responded with error
    const message = error.response.data?.message || 'Terjadi kesalahan pada server';
    return { error: true, message, status: error.response.status };
  } else if (error.request) {
    // Request made but no response
    return { error: true, message: 'Tidak dapat terhubung ke server', status: 0 };
  } else {
    // Something else happened
    return { error: true, message: error.message || 'Terjadi kesalahan', status: 0 };
  }
};

// Helper function untuk set authorization header
export const getAuthHeaders = () => {
  const token = localStorage.getItem('auth_token');
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

export default API_URL;
