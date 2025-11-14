// Status enum
export type TripStatus = 
  | 'submitted'
  | 'area_review'
  | 'regional_review'
  | 'completed'
  | 'rejected';

// Action type untuk history
export type ActionType = 
  | 'submit'
  | 'approve'
  | 'reject'
  | 'forward'
  | 'complete';

// Role yang bisa akses
export type UserRole = 
  | 'employee'
  | 'finance_area'
  | 'finance_regional'
  | 'admin';

// Main Trip interface
export interface Trip {
  id: string;
  employee_id: string;
  employee_name: string;
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  advance_amount: number;
  status: TripStatus;
  created_at: string;
  updated_at: string;
}

// History/Log untuk tracking
export interface TripStatusHistory {
  id: string;
  trip_id: string;
  user_id: string;
  user_name: string;
  user_role: UserRole;
  action_type: ActionType;
  status: TripStatus;
  notes: string;
  created_at: string;
}

// Detail trip lengkap dengan history
export interface TripDetail extends Trip {
  history: TripStatusHistory[];
  // Nanti bisa tambah:
  // receipts?: string[];
  // next_actor_role?: UserRole;
}