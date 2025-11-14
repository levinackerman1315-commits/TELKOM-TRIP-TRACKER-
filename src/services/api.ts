import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/login', { email, password }),
  logout: () => 
    api.post('/logout'),
  me: () => 
    api.get('/me'),
  register: (data: any) => 
    api.post('/register', data),
};

// Trip endpoints
export const tripAPI = {
  getAll: () => 
    api.get('/trips'),
  getById: (id: number) => 
    api.get(`/trips/${id}`),
  create: (data: any) => 
    api.post('/trips', data),
  update: (id: number, data: any) => 
    api.put(`/trips/${id}`, data),
  requestExtension: (id: number, data: any) => 
    api.post(`/trips/${id}/extension`, data),
  submit: (id: number) => 
    api.post(`/trips/${id}/submit`),
  cancel: (id: number, data?: any) => 
    api.post(`/trips/${id}/cancel`, data),
};

// Advance endpoints
export const advanceAPI = {
  getAll: (params?: any) => 
    api.get('/advances', { params }),
  getById: (id: number) => 
    api.get(`/advances/${id}`),
  create: (data: any) => 
    api.post('/advances', data),
  approveByArea: (id: number, data: any) => 
    api.post(`/advances/${id}/approve-area`, data),
  approveByRegional: (id: number, data: any) => 
    api.post(`/advances/${id}/approve-regional`, data),
  markAsTransferred: (id: number, data: any) => 
    api.post(`/advances/${id}/transfer`, data),
  reject: (id: number, data: any) => 
    api.post(`/advances/${id}/reject`, data),
};

// Receipt endpoints
export const receiptAPI = {
  getAll: (params?: any) => 
    api.get('/receipts', { params }),
  getById: (id: number) => 
    api.get(`/receipts/${id}`),
  upload: (data: FormData) => 
    api.post('/receipts', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  update: (id: number, data: FormData) => 
    api.post(`/receipts/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  delete: (id: number) => 
    api.delete(`/receipts/${id}`),
  verify: (id: number, data: any) => 
    api.post(`/receipts/${id}/verify`, data),
  unverify: (id: number, data: any) => 
    api.post(`/receipts/${id}/unverify`, data),
  download: (id: number) => 
    api.get(`/receipts/${id}/download`, { responseType: 'blob' }),
};

// Settlement endpoints
export const settlementAPI = {
  getAll: (params?: any) => 
    api.get('/settlements', { params }),
  getById: (id: number) => 
    api.get(`/settlements/${id}`),
  create: (data: any) => 
    api.post('/settlements', data),
  process: (id: number, data: any) => 
    api.post(`/settlements/${id}/process`, data),
  complete: (id: number) => 
    api.post(`/settlements/${id}/complete`),
  getByTrip: (tripId: number) => 
    api.get(`/settlements/trip/${tripId}`),
};

// Review endpoints
export const reviewAPI = {
  getAll: (params?: any) => 
    api.get('/reviews', { params }),
  getById: (id: number) => 
    api.get(`/reviews/${id}`),
  reviewByArea: (tripId: number, data: any) => 
    api.post(`/reviews/area/${tripId}`, data),
  reviewByRegional: (tripId: number, data: any) => 
    api.post(`/reviews/regional/${tripId}`, data),
  getByTrip: (tripId: number) => 
    api.get(`/reviews/trip/${tripId}`),
};

// Notification endpoints
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

export default api;