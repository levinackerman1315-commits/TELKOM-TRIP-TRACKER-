
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// ✅ FIX: Set token SEBELUM request
api.interceptors.request.use(
  (config) => {
    // ✅ CRITICAL: Ambil token dari localStorage setiap request
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url, {
      hasToken: !!token,
      headers: config.headers.Authorization
    });
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    
    // ✅ Handle 401 Unauthorized
    if (error.response?.status === 401) {
      console.error('Unauthorized! Token mungkin expired.');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// ═══════════════════════════════════════════════════════════
// AUTH API - ✅ PERBAIKAN: identifier bukan email
// ═══════════════════════════════════════════════════════════
export const authAPI = {
  // ✅ UPDATED: Kirim identifier bukan email
  login: (identifier: string, password: string) => 
    api.post('/login', { identifier, password }),
  
  logout: () => 
    api.post('/logout'),
  me: () => 
    api.get('/me'),
  register: (data: any) => 
    api.post('/register', data),
};

// ═══════════════════════════════════════════════════════════
// USER PROFILE API (Untuk semua role) - ✅ TAMBAH INI
// ═══════════════════════════════════════════════════════════
export const profileAPI = {
  // Get current user profile
  getProfile: () => 
    api.get('/user/profile'),
  
  // Change password
  changePassword: (data: {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
  }) => 
    api.post('/user/change-password', data),
  
  // Update profile (phone, bank info)
  updateProfile: (data: { 
    phone?: string;
    bank_account?: string;
    bank_name?: string;
  }) => 
    api.put('/user/update-profile', data),
};

// ═══════════════════════════════════════════════════════════
// TRIP API
// ═══════════════════════════════════════════════════════════
export const tripAPI = {
  // Employee - Basic CRUD
  getAll: () => 
    api.get('/trips'),
  getById: (id: number) => 
    api.get(`/trips/${id}`),
  create: (data: any) => 
    api.post('/trips', data),
  update: (id: number, data: any) => 
    api.put(`/trips/${id}`, data),
  delete: (id: number) => 
    api.delete(`/trips/${id}`),

    getOngoing: () => 
    api.get('/trips/ongoing'),
  
  // Employee - Actions
  requestExtension: (id: number, data: any) => 
    api.post(`/trips/${id}/extension`, data),
  submit: (id: number) => 
    api.post(`/trips/${id}/submit`),
  cancel: (id: number, data?: any) => 
    api.post(`/trips/${id}/cancel`, data),
  cancelExtension: async (id: number) => {
    const response = await api.post(`/trips/${id}/cancel-extension`);
    return response.data;
  },
  
  // Employee - Related Data
  getAdvances: (tripId: number) => 
    api.get(`/trips/${tripId}/advances`),
  getStatistics: () => 
    api.get('/trips/statistics'),
  
  // ✅ Finance Area - Settlement Review
  approveByArea: (id: number, data?: { notes?: string }) =>
    api.post(`/trips/${id}/approve-settlement`, data),
  
  rejectSettlement: (id: number, data: { rejection_reason: string }) =>
    api.post(`/trips/${id}/reject-settlement`, data),
  
  // ✅ Finance Regional - Final Approval (FIXED!)
  approveSettlementRegional: (id: number, data?: { notes?: string }) =>
    api.post(`/trips/${id}/approve-settlement-regional`, data),
};

// ═══════════════════════════════════════════════════════════
// ADVANCE API
// ═══════════════════════════════════════════════════════════
export const advanceAPI = {
  getAll: (params?: any) => 
    api.get('/advances', { params }),
  getById: (id: number) => 
    api.get(`/advances/${id}`),
  
  // ✅ Get status history
  getStatusHistory: (id: number) => 
    api.get(`/advances/${id}/status-history`),
  
  // ✅ UPDATED: Support FormData untuk upload supporting document
  create: (data: any) => 
    api.post('/advances', data, {
      headers: data instanceof FormData ? {
        'Content-Type': 'multipart/form-data'
      } : {}
    }),
  
  // Advance Approval Flow
  approveByArea: (id: number, data: any) => 
    api.post(`/advances/${id}/approve-area`, data),
  approveByRegional: (id: number, data: any) => 
    api.post(`/advances/${id}/approve-regional`, data),
  markAsTransferred: (id: number, data: any) => 
    api.post(`/advances/${id}/transfer`, data),
  reject: (id: number, data: any) => 
    api.post(`/advances/${id}/reject`, data),
  remove: (id: number) => 
    api.delete(`/advances/${id}`),
};

// ═══════════════════════════════════════════════════════════
// RECEIPT API
// ═══════════════════════════════════════════════════════════
export const receiptAPI = {
  getAll: (params?: any) => 
    api.get('/receipts', { params }),
  getById: (id: number) => 
    api.get(`/receipts/${id}`),
  
  // ✅ PERBAIKAN: Ganti 'upload' jadi 'create' untuk konsistensi
  create: (formData: FormData) => 
    api.post('/receipts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  
  update: (id: number, data: any) => 
    api.put(`/receipts/${id}`, data),
  delete: (id: number) => 
    api.delete(`/receipts/${id}`),
  
  // Finance Area - Verification
  verify: (id: number, data?: { notes?: string }) => 
    api.post(`/receipts/${id}/verify`, data),
  
  unverify: (id: number, data?: { notes?: string }) => 
    api.post(`/receipts/${id}/unverify`, data),
  
  // Download
  download: (id: number) => 
    api.get(`/receipts/${id}/download`, { responseType: 'blob' }),
};

// ═══════════════════════════════════════════════════════════
// NOTIFICATION API
// ═══════════════════════════════════════════════════════════
export const notificationAPI = {
  getAll: (params?: any) => 
    api.get('/notifications', { params }),
  markAsRead: (id: number) => 
    api.post(`/notifications/${id}/read`),
  markAllAsRead: () => 
    api.post('/notifications/read-all'),
  delete: (id: number) => 
    api.delete(`/notifications/${id}`),
  getUnreadCount: () => 
    api.get('/notifications/unread-count'),
};

// ═══════════════════════════════════════════════════════════
// USER API (HR Management)
// ═══════════════════════════════════════════════════════════
export const userAPI = {
  // List & Statistics
  getAll: (params?: any) => api.get('/users', { params }),
  getStatistics: () => api.get('/users/statistics'),
  
  // ✅ FIXED: Real-time validation endpoints with optional userId for edit mode
  checkNik: (nik: string, userId?: number) => 
    api.get('/users/check-nik', { 
      params: { 
        nik,
        ...(userId && { user_id: userId })
      } 
    }),
  
  checkEmail: (email: string, userId?: number) => 
    api.get('/users/check-email', { 
      params: { 
        email,
        ...(userId && { user_id: userId })
      } 
    }),
  
  // CRUD operations
  getById: (id: number) => api.get(`/users/${id}`),
  create: (data: any) => api.post('/users', data),
  update: (id: number, data: any) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
  
  // User actions
  activate: (id: number) => api.post(`/users/${id}/activate`),
  
  // 🆕 BULK UPLOAD
  bulkCreate: (users: any[]) => 
    api.post('/users/bulk-create', { users }),
};

// ═══════════════════════════════════════════════════════════
// ✅ NEW: SETTINGS API (Finance Area)
// ═══════════════════════════════════════════════════════════
export const settingsAPI = {
  // Get all settings (Finance Area & Regional only)
  getAll: () => 
    api.get('/settings'),
  
  // Get price per km (ALL authenticated users - untuk NewTrip calculation)
  getPricePerKm: () => 
    api.get('/settings/price-per-km'),
  
  // Update price per km (Finance Area only)
  updatePricePerKm: (price_per_km: number) => 
    api.put('/settings/price-per-km', { price_per_km }),
};

export default api;