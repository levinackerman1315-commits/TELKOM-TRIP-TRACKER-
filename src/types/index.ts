export interface User {
  id: number;
  name: string;
  email: string;
  role: 'employee' | 'finance';
}

export interface Trip {
  id: number;
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  advance: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'employee' | 'finance';
}

export interface CreateTripData {
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  advance: number;
}
