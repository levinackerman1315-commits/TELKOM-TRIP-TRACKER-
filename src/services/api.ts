// // import axios from 'axios';

// // const BASE_URL = 'http://127.0.0.1:8000/api';

// // console.log('API BASE_URL:', BASE_URL); // ← TAMBAH INI

// // const api = axios.create({
// //   baseURL: BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Accept': 'application/json',
// //   },
// // });

// // // Add request interceptor for debugging
// // api.interceptors.request.use(
// //   (config) => {
// //     console.log('API Request:', config.method?.toUpperCase(), config.url); // ← TAMBAH INI
// //     const token = localStorage.getItem('token');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     console.error('Request Error:', error); // ← TAMBAH INI
// //     return Promise.reject(error);
// //   }
// // );

// // // Add response interceptor for debugging
// // api.interceptors.response.use(
// //   (response) => {
// //     console.log('API Response:', response.status, response.data); // ← TAMBAH INI
// //     return response;
// //   },
// //   (error) => {
// //     console.error('Response Error:', error.response?.status, error.response?.data); // ← TAMBAH INI
// //     return Promise.reject(error);
// //   }
// // );

// // // Auth endpoints
// // export const authAPI = {
// //   login: (email: string, password: string) => 
// //     api.post('/login', { email, password }),
// //   logout: () => 
// //     api.post('/logout'),
// //   me: () => 
// //     api.get('/me'),
// //   register: (data: any) => 
// //     api.post('/register', data),
// // };

// // // Trip endpoints
// // export const tripAPI = {
// //   getAll: () => 
// //     api.get('/trips'),
// //   getById: (id: number) => 
// //     api.get(`/trips/${id}`),
// //   create: (data: any) => 
// //     api.post('/trips', data),
// //   update: (id: number, data: any) => 
// //     api.put(`/trips/${id}`, data),
// //   requestExtension: (id: number, data: any) => 
// //     api.post(`/trips/${id}/extension`, data),
// //   submit: (id: number) => 
// //     api.post(`/trips/${id}/submit`),
// //   cancel: (id: number, data?: any) => 
// //     api.post(`/trips/${id}/cancel`, data),
// //   getAdvances: (tripId: number) => api.get(`/trips/${tripId}/advances`),
// // };

// // // Advance endpoints
// // export const advanceAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/advances', { params }),
// //   getById: (id: number) => 
// //     api.get(`/advances/${id}`),
// //   create: (data: any) => 
// //     api.post('/advances', data),
// //   approveByArea: (id: number, data: any) => 
// //     api.post(`/advances/${id}/approve-area`, data),
// //   approveByRegional: (id: number, data: any) => 
// //     api.post(`/advances/${id}/approve-regional`, data),
// //   markAsTransferred: (id: number, data: any) => 
// //     api.post(`/advances/${id}/transfer`, data),
// //   reject: (id: number, data: any) => 
// //     api.post(`/advances/${id}/reject`, data),
// //   remove: (id: number) => 
// //     api.delete(`/advances/${id}`), // Tambahkan metode ini
// // };

// // // Receipt endpoints
// // export const receiptAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/receipts', { params }),
// //   getById: (id: number) => 
// //     api.get(`/receipts/${id}`),
// //   upload: (data: FormData) => 
// //     api.post('/receipts', data, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     }),
// //   update: (id: number, data: FormData) => 
// //     api.post(`/receipts/${id}`, data, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     }),
// //   delete: (id: number) => 
// //     api.delete(`/receipts/${id}`),
// //   verify: (id: number, data: any) => 
// //     api.post(`/receipts/${id}/verify`, data),
// //   unverify: (id: number, data: any) => 
// //     api.post(`/receipts/${id}/unverify`, data),
// //   download: (id: number) => 
// //     api.get(`/receipts/${id}/download`, { responseType: 'blob' }),
// // };

// // // Settlement endpoints
// // export const settlementAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/settlements', { params }),
// //   getById: (id: number) => 
// //     api.get(`/settlements/${id}`),
// //   create: (data: any) => 
// //     api.post('/settlements', data),
// //   process: (id: number, data: any) => 
// //     api.post(`/settlements/${id}/process`, data),
// //   complete: (id: number) => 
// //     api.post(`/settlements/${id}/complete`),
// //   getByTrip: (tripId: number) => 
// //     api.get(`/settlements/trip/${tripId}`),
// // };

// // // Review endpoints
// // export const reviewAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/reviews', { params }),
// //   getById: (id: number) => 
// //     api.get(`/reviews/${id}`),
// //   reviewByArea: (tripId: number, data: any) => 
// //     api.post(`/reviews/area/${tripId}`, data),
// //   reviewByRegional: (tripId: number, data: any) => 
// //     api.post(`/reviews/regional/${tripId}`, data),
// //   getByTrip: (tripId: number) => 
// //     api.get(`/reviews/trip/${tripId}`),
// // };

// // // Notification endpoints
// // export const notificationAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/notifications', { params }),
// //   markAsRead: (id: number) => 
// //     api.post(`/notifications/${id}/read`),
// //   markAllAsRead: () => 
// //     api.post('/notifications/read-all'),
// //   delete: (id: number) => 
// //     api.delete(`/notifications/${id}`),
// //   getUnreadCount: () => 
// //     api.get('/notifications/unread-count'),
// // };


// // // Removed duplicate declaration of tripAPI
// // export default api;


// // // src/services/api.ts
// // //stabil
// // import axios from 'axios';

// // const BASE_URL = 'http://127.0.0.1:8000/api';

// // const api = axios.create({
// //   baseURL: BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Accept': 'application/json',
// //   },
// // });

// // // ✅ FIX: Set token SEBELUM request
// // api.interceptors.request.use(
// //   (config) => {
// //     // ✅ CRITICAL: Ambil token dari localStorage setiap request
// //     const token = localStorage.getItem('token');
    
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
    
// //     console.log('API Request:', config.method?.toUpperCase(), config.url, {
// //       hasToken: !!token,
// //       headers: config.headers.Authorization
// //     });
    
// //     return config;
// //   },
// //   (error) => {
// //     console.error('Request Error:', error);
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor
// // api.interceptors.response.use(
// //   (response) => {
// //     console.log('API Response:', response.status, response.data);
// //     return response;
// //   },
// //   (error) => {
// //     console.error('Response Error:', {
// //       status: error.response?.status,
// //       data: error.response?.data,
// //       url: error.config?.url
// //     });
    
// //     // ✅ Handle 401 Unauthorized
// //     if (error.response?.status === 401) {
// //       console.error('Unauthorized! Token mungkin expired.');
// //       localStorage.removeItem('token');
// //       window.location.href = '/login';
// //     }
    
// //     return Promise.reject(error);
// //   }
// // );

// // // Auth endpoints
// // export const authAPI = {
// //   login: (email: string, password: string) => 
// //     api.post('/login', { email, password }),
// //   logout: () => 
// //     api.post('/logout'),
// //   me: () => 
// //     api.get('/me'),
// //   register: (data: any) => 
// //     api.post('/register', data),
// // };

// // // Trip endpoints
// // export const tripAPI = {
// //   getAll: () => 
// //     api.get('/trips'),
// //   getById: (id: number) => 
// //     api.get(`/trips/${id}`),
// //   create: (data: any) => 
// //     api.post('/trips', data),
// //   update: (id: number, data: any) => 
// //     api.put(`/trips/${id}`, data),
// //   requestExtension: (id: number, data: any) => 
// //     api.post(`/trips/${id}/extension`, data),
// //   submit: (id: number) => 
// //     api.post(`/trips/${id}/submit`),
// //   cancel: (id: number, data?: any) => 
// //     api.post(`/trips/${id}/cancel`, data),
// //   getAdvances: (tripId: number) => 
// //     api.get(`/trips/${tripId}/advances`),
// //   getStatistics: () => 
// //     api.get('/trips/statistics'),
// // };

// // // Advance endpoints
// // export const advanceAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/advances', { params }),
// //   getById: (id: number) => 
// //     api.get(`/advances/${id}`),
// //   create: (data: any) => 
// //     api.post('/advances', data),
// //   approveByArea: (id: number, data: any) => 
// //     api.post(`/advances/${id}/approve-area`, data),
// //   approveByRegional: (id: number, data: any) => 
// //     api.post(`/advances/${id}/approve-regional`, data),
// //   markAsTransferred: (id: number, data: any) => 
// //     api.post(`/advances/${id}/transfer`, data),
// //   reject: (id: number, data: any) => 
// //     api.post(`/advances/${id}/reject`, data),
// //   remove: (id: number) => 
// //     api.delete(`/advances/${id}`),
// // };

// // // Receipt endpoints
// // export const receiptAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/receipts', { params }),
// //   getById: (id: number) => 
// //     api.get(`/receipts/${id}`),
// //   upload: (data: FormData) => 
// //     api.post('/receipts', data, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     }),
// //   update: (id: number, data: FormData) => 
// //     api.post(`/receipts/${id}`, data, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     }),
// //   delete: (id: number) => 
// //     api.delete(`/receipts/${id}`),
// //   verify: (id: number, data: any) => 
// //     api.post(`/receipts/${id}/verify`, data),
// //   unverify: (id: number, data: any) => 
// //     api.post(`/receipts/${id}/unverify`, data),
// //   download: (id: number) => 
// //     api.get(`/receipts/${id}/download`, { responseType: 'blob' }),
// // };

// // // Notification endpoints
// // export const notificationAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/notifications', { params }),
// //   markAsRead: (id: number) => 
// //     api.post(`/notifications/${id}/read`),
// //   markAllAsRead: () => 
// //     api.post('/notifications/read-all'),
// //   delete: (id: number) => 
// //     api.delete(`/notifications/${id}`),
// //   getUnreadCount: () => 
// //     api.get('/notifications/unread-count'),
// // };


// // export default api;

// // import axios from 'axios';

// // const BASE_URL = 'http://127.0.0.1:8000/api';

// // const api = axios.create({
// //   baseURL: BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //     'Accept': 'application/json',
// //   },
// // });

// // // ✅ FIX: Set token SEBELUM request
// // api.interceptors.request.use(
// //   (config) => {
// //     // ✅ CRITICAL: Ambil token dari localStorage setiap request
// //     const token = localStorage.getItem('token');
    
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
    
// //     console.log('API Request:', config.method?.toUpperCase(), config.url, {
// //       hasToken: !!token,
// //       headers: config.headers.Authorization
// //     });
    
// //     return config;
// //   },
// //   (error) => {
// //     console.error('Request Error:', error);
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor
// // api.interceptors.response.use(
// //   (response) => {
// //     console.log('API Response:', response.status, response.data);
// //     return response;
// //   },
// //   (error) => {
// //     console.error('Response Error:', {
// //       status: error.response?.status,
// //       data: error.response?.data,
// //       url: error.config?.url
// //     });
    
// //     // ✅ Handle 401 Unauthorized
// //     if (error.response?.status === 401) {
// //       console.error('Unauthorized! Token mungkin expired.');
// //       localStorage.removeItem('token');
// //       window.location.href = '/login';
// //     }
    
// //     return Promise.reject(error);
// //   }
// // );

// // // ═══════════════════════════════════════════════════════════
// // // AUTH API
// // // ═══════════════════════════════════════════════════════════
// // export const authAPI = {
// //   login: (email: string, password: string) => 
// //     api.post('/login', { email, password }),
// //   logout: () => 
// //     api.post('/logout'),
// //   me: () => 
// //     api.get('/me'),
// //   register: (data: any) => 
// //     api.post('/register', data),
// // };

// // // ═══════════════════════════════════════════════════════════
// // // TRIP API
// // // ═══════════════════════════════════════════════════════════
// // export const tripAPI = {
// //   // Employee - Basic CRUD
// //   getAll: () => 
// //     api.get('/trips'),
// //   getById: (id: number) => 
// //     api.get(`/trips/${id}`),
// //   create: (data: any) => 
// //     api.post('/trips', data),
// //   update: (id: number, data: any) => 
// //     api.put(`/trips/${id}`, data),
  
// //   // Employee - Actions
// //   requestExtension: (id: number, data: any) => 
// //     api.post(`/trips/${id}/extension`, data),
// //   submit: (id: number) => 
// //     api.post(`/trips/${id}/submit`),
// //   cancel: (id: number, data?: any) => 
// //     api.post(`/trips/${id}/cancel`, data),
  
// //   // Employee - Related Data
// //   getAdvances: (tripId: number) => 
// //     api.get(`/trips/${tripId}/advances`),
// //   getStatistics: () => 
// //     api.get('/trips/statistics'),
  
// //   // ✅ Finance Area - Settlement Review (TAMBAHAN BARU!)
// //   approveByArea: (id: number, data?: { notes?: string }) =>
// //     api.post(`/trips/${id}/approve-settlement`, data),
  
// //   rejectSettlement: (id: number, data: { rejection_reason: string }) =>
// //     api.post(`/trips/${id}/reject-settlement`, data),
  
// //   // ✅ Finance Regional - Final Approval (TAMBAHAN BARU!)
// //   approveByRegional: (id: number, data?: { notes?: string }) =>
// //     api.post(`/trips/${id}/approve-settlement-regional`, data),
// // };

// // // ═══════════════════════════════════════════════════════════
// // // ADVANCE API
// // // ═══════════════════════════════════════════════════════════
// // export const advanceAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/advances', { params }),
// //   getById: (id: number) => 
// //     api.get(`/advances/${id}`),
// //   create: (data: any) => 
// //     api.post('/advances', data),
// //   approveByArea: (id: number, data: any) => 
// //     api.post(`/advances/${id}/approve-area`, data),
// //   approveByRegional: (id: number, data: any) => 
// //     api.post(`/advances/${id}/approve-regional`, data),
// //   markAsTransferred: (id: number, data: any) => 
// //     api.post(`/advances/${id}/transfer`, data),
// //   reject: (id: number, data: any) => 
// //     api.post(`/advances/${id}/reject`, data),
// //   remove: (id: number) => 
// //     api.delete(`/advances/${id}`),
// // };

// // // ═══════════════════════════════════════════════════════════
// // // RECEIPT API
// // // ═══════════════════════════════════════════════════════════
// // export const receiptAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/receipts', { params }),
// //   getById: (id: number) => 
// //     api.get(`/receipts/${id}`),
// //   upload: (data: FormData) => 
// //     api.post('/receipts', data, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     }),
// //   update: (id: number, data: FormData) => 
// //     api.post(`/receipts/${id}`, data, {
// //       headers: { 'Content-Type': 'multipart/form-data' }
// //     }),
// //   delete: (id: number) => 
// //     api.delete(`/receipts/${id}`),
  
// //   // ✅ Finance Area - Verification (TAMBAHAN BARU!)
// //   verify: (id: number, data?: { notes?: string }) => 
// //     api.post(`/receipts/${id}/verify`, data),
  
// //   unverify: (id: number, data?: { notes?: string }) => 
// //     api.post(`/receipts/${id}/unverify`, data),
  
// //   // Download
// //   download: (id: number) => 
// //     api.get(`/receipts/${id}/download`, { responseType: 'blob' }),
// // };

// // // ═══════════════════════════════════════════════════════════
// // // NOTIFICATION API
// // // ═══════════════════════════════════════════════════════════
// // export const notificationAPI = {
// //   getAll: (params?: any) => 
// //     api.get('/notifications', { params }),
// //   markAsRead: (id: number) => 
// //     api.post(`/notifications/${id}/read`),
// //   markAllAsRead: () => 
// //     api.post('/notifications/read-all'),
// //   delete: (id: number) => 
// //     api.delete(`/notifications/${id}`),
// //   getUnreadCount: () => 
// //     api.get('/notifications/unread-count'),
// // };

// // export default api;



// import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:8000/api';

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// });

// // ✅ FIX: Set token SEBELUM request
// api.interceptors.request.use(
//   (config) => {
//     // ✅ CRITICAL: Ambil token dari localStorage setiap request
//     const token = localStorage.getItem('token');
    
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     console.log('API Request:', config.method?.toUpperCase(), config.url, {
//       hasToken: !!token,
//       headers: config.headers.Authorization
//     });
    
//     return config;
//   },
//   (error) => {
//     console.error('Request Error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     console.log('API Response:', response.status, response.data);
//     return response;
//   },
//   (error) => {
//     console.error('Response Error:', {
//       status: error.response?.status,
//       data: error.response?.data,
//       url: error.config?.url
//     });
    
//     // ✅ Handle 401 Unauthorized
//     if (error.response?.status === 401) {
//       console.error('Unauthorized! Token mungkin expired.');
//       localStorage.removeItem('token');
//       window.location.href = '/login';
//     }
    
//     return Promise.reject(error);
//   }
// );

// // ═══════════════════════════════════════════════════════════
// // AUTH API
// // ═══════════════════════════════════════════════════════════
// export const authAPI = {
//   login: (email: string, password: string) => 
//     api.post('/login', { email, password }),
//   logout: () => 
//     api.post('/logout'),
//   me: () => 
//     api.get('/me'),
//   register: (data: any) => 
//     api.post('/register', data),
// };

// // ═══════════════════════════════════════════════════════════
// // TRIP API
// // ═══════════════════════════════════════════════════════════
// export const tripAPI = {
//   // Employee - Basic CRUD
//   getAll: () => 
//     api.get('/trips'),
//   getById: (id: number) => 
//     api.get(`/trips/${id}`),
//   create: (data: any) => 
//     api.post('/trips', data),
//   update: (id: number, data: any) => 
//     api.put(`/trips/${id}`, data),
  

  
//   // Employee - Actions
//   requestExtension: (id: number, data: any) => 
//     api.post(`/trips/${id}/extension`, data),
//   submit: (id: number) => 
//     api.post(`/trips/${id}/submit`),
//   cancel: (id: number, data?: any) => 
//     api.post(`/trips/${id}/cancel`, data),
  
//   // Employee - Related Data
//   getAdvances: (tripId: number) => 
//     api.get(`/trips/${tripId}/advances`),
//   getStatistics: () => 
//     api.get('/trips/statistics'),
  
//   // ✅ Finance Area - Settlement Review (TAMBAHAN BARU!)
//   approveByArea: (id: number, data?: { notes?: string }) =>
//     api.post(`/trips/${id}/approve-settlement`, data),
  
//   rejectSettlement: (id: number, data: { rejection_reason: string }) =>
//     api.post(`/trips/${id}/reject-settlement`, data),
  
//   // ✅ Finance Regional - Final Approval (TAMBAHAN BARU!)
//   approveByRegional: (id: number, data?: { notes?: string }) =>
//     api.post(`/trips/${id}/approve-settlement-regional`, data),
//     // ✅ NEW: DELETE method
//   delete: (id: number) => api.delete(`/trips/${id}`),
//     cancelExtension: async (id: number) => {
//     const response = await api.post(`/trips/${id}/cancel-extension`);
//     return response.data;
//   },
// };

// // ═══════════════════════════════════════════════════════════
// // ADVANCE API
// // ═══════════════════════════════════════════════════════════
// export const advanceAPI = {
//    getAll: (params?: any) => 
//     api.get('/advances', { params }),
//   getById: (id: number) => 
//     api.get(`/advances/${id}`),


//    // ✅ TAMBAH INI!
//   getStatusHistory: (id: number) => 
//     api.get(`/advances/${id}/status-history`),
  
//   // ✅ UPDATED: Support FormData untuk upload supporting document
//    create: (data: any) => 
//     api.post('/advances', data, {
//       headers: data instanceof FormData ? {
//         'Content-Type': 'multipart/form-data'
//       } : {}
//     }),
//     //back
//   // approveByArea: (id: number, data: any) => 
//   //   api.post(`/advances/${id}/approve-area`, data),
//   approveByArea: (id: number, data: any) => 
//   api.post(`/trips/${id}/approve-settlement`, data),
//   approveByRegional: (id: number, data: any) => 
//     api.post(`/advances/${id}/approve-regional`, data),
//   markAsTransferred: (id: number, data: any) => 
//     api.post(`/advances/${id}/transfer`, data),
//   reject: (id: number, data: any) => 
//     api.post(`/advances/${id}/reject`, data),
//   remove: (id: number) => 
//     api.delete(`/advances/${id}`),
// };

// // ═══════════════════════════════════════════════════════════
// // RECEIPT API
// // ═══════════════════════════════════════════════════════════
// export const receiptAPI = {
//   getAll: (params?: any) => 
//     api.get('/receipts', { params }),
//   getById: (id: number) => 
//     api.get(`/receipts/${id}`),
  
//   // ✅ PERBAIKAN: Ganti 'upload' jadi 'create' untuk konsistensi
//   create: (formData: FormData) => 
//     api.post('/receipts', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     }),
  
//   update: (id: number, data: any) => 
//     api.put(`/receipts/${id}`, data),
//   delete: (id: number) => 
//     api.delete(`/receipts/${id}`),
  
//   // Finance Area - Verification
//   verify: (id: number, data?: { notes?: string }) => 
//     api.post(`/receipts/${id}/verify`, data),
  
//   unverify: (id: number, data?: { notes?: string }) => 
//     api.post(`/receipts/${id}/unverify`, data),
  
//   // Download
//   download: (id: number) => 
//     api.get(`/receipts/${id}/download`, { responseType: 'blob' }),
// };

// // ═══════════════════════════════════════════════════════════
// // NOTIFICATION API
// // ═══════════════════════════════════════════════════════════
// export const notificationAPI = {
//   getAll: (params?: any) => 
//     api.get('/notifications', { params }),
//   markAsRead: (id: number) => 
//     api.post(`/notifications/${id}/read`),
//   markAllAsRead: () => 
//     api.post('/notifications/read-all'),
//   delete: (id: number) => 
//     api.delete(`/notifications/${id}`),
//   getUnreadCount: () => 
//     api.get('/notifications/unread-count'),
// };

// export default api; 



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
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// ═══════════════════════════════════════════════════════════
// AUTH API
// ═══════════════════════════════════════════════════════════
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

export default api;