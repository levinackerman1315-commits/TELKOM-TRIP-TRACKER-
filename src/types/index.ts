// User Types
export interface User {
  user_id: number;
  nik: string;
  name: string;
  email: string;
  phone?: string;
  role: 'employee' | 'finance_area' | 'finance_regional';
  department?: string;
  position?: string;
  office_location?: string;
  area_code?: string;
  bank_account?: string;
  bank_name?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

// Trip Types
export interface Trip {
  trip_id: number;
  user_id: number;
  trip_number: string;
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  duration: number;
  extended_end_date?: string;
  extension_reason?: string;
  extension_requested_at?: string;
  estimated_budget?: number;
  total_advance: number;
  total_expenses: number;
  status: 'active' | 'awaiting_review' | 'under_review_area' | 'under_review_regional' | 'completed' | 'cancelled';
  submitted_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  advances?: Advance[];
  receipts?: Receipt[];
  reviews?: TripReview[];
  settlement?: Settlement;
  status_history?: TripStatusHistory[];
}

// Advance Types
export interface Advance {
  advance_id: number;
  trip_id: number;
  advance_number: string;
  request_type: 'initial' | 'additional';
  requested_amount: number;
  approved_amount?: number;
  status: 'pending' | 'approved_area' | 'approved_regional' | 'rejected' | 'transferred';
  request_reason?: string;
  transfer_date?: string;
  transfer_reference?: string;
  requested_at: string;
  approved_by_area?: number;
  approved_at_area?: string;
  approved_by_regional?: number;
  approved_at_regional?: string;
  rejection_reason?: string;
  notes?: string;
  trip?: Trip;
  approver_area?: User;
  approver_regional?: User;
  status_history?: AdvanceStatusHistory[];
}

// Receipt Types
export interface Receipt {
  receipt_id: number;
  trip_id: number;
  advance_id?: number;
  receipt_number: string;
  receipt_date: string;
  amount: number;
  category: 'fuel' | 'meal' | 'accommodation' | 'transportation' | 'parking' | 'toll' | 'other';
  merchant_name?: string;
  description: string;
  file_path: string;
  file_name: string;
  file_size: number;
  is_verified: boolean;
  verified_by?: number;
  verified_at?: string;
  verification_notes?: string;
  uploaded_at: string;
  trip?: Trip;
  advance?: Advance;
  verifier?: User;
}

// Settlement Types
export interface Settlement {
  settlement_id: number;
  trip_id: number;
  settlement_number: string;
  total_advance: number;
  total_receipts: number;
  balance: number;
  settlement_type: 'refund' | 'payment' | 'balanced';
  settlement_amount: number;
  settlement_date?: string;
  status: 'pending' | 'processed' | 'completed';
  processed_by?: number;
  processed_at?: string;
  transfer_reference?: string;
  notes?: string;
  created_at: string;
  trip?: Trip;
  processor?: User;
}

// Trip Review Types
export interface TripReview {
  review_id: number;
  trip_id: number;
  reviewer_id: number;
  review_level: 'area' | 'regional';
  status: 'pending' | 'checked' | 'completed' | 'returned';
  comments?: string;
  reviewed_at: string;
  trip?: Trip;
  reviewer?: User;
}

// Advance Status History Types
export interface AdvanceStatusHistory {
  history_id: number;
  advance_id: number;
  old_status?: string;
  new_status: string;
  changed_by: number;
  notes?: string;
  changed_at: string;
  advance?: Advance;
  changer?: User;
}

// Trip Status History Types
export interface TripStatusHistory {
  history_id: number;
  trip_id: number;
  old_status?: string;
  new_status: string;
  changed_by: number;
  notes?: string;
  changed_at: string;
  trip?: Trip;
  changer?: User;
}

// Notification Types
export interface Notification {
  notification_id: number;
  user_id: number;
  trip_id?: number;
  advance_id?: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  read_at?: string;
  created_at: string;
  trip?: Trip;
  advance?: Advance;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface TripForm {
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  estimated_budget?: number;
}

export interface AdvanceForm {
  trip_id: number;
  request_type: 'initial' | 'additional';
  requested_amount: number;
  request_reason?: string;
}

export interface ReceiptForm {
  trip_id: number;
  advance_id?: number;
  receipt_date: string;
  amount: number;
  category: 'fuel' | 'meal' | 'accommodation' | 'transportation' | 'parking' | 'toll' | 'other';
  merchant_name?: string;
  description: string;
  file: File;
}

export interface ExtensionForm {
  extended_end_date: string;
  extension_reason: string;
}

export interface ApprovalForm {
  approved_amount?: number;
  notes?: string;
}

export interface RejectionForm {
  rejection_reason: string;
}

export interface VerificationForm {
  verification_notes?: string;
}

export interface SettlementProcessForm {
  settlement_date: string;
  transfer_reference?: string;
  notes?: string;
}

export interface ReviewForm {
  status: 'checked' | 'completed' | 'returned';
  comments?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Auth Response
export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

// Dashboard Stats
export interface DashboardStats {
  total_trips: number;
  active_trips: number;
  completed_trips: number;
  pending_advances: number;
  total_advance_amount: number;
  total_expense_amount: number;
  pending_reviews?: number;
  pending_settlements?: number;
}
// src/types/index.ts

export interface User {
  user_id: number;
  name: string;
  email: string;
  role: 'employee' | 'finance_area' | 'finance_regional';
  created_at: string;
  updated_at: string;
}

// ✅ TAMBAHKAN INTERFACE INI
export interface TripStatusHistory {
  history_id: number;
  trip_id: number;
  old_status?: string;
  new_status: string;
  changed_by: number;
  notes?: string;
  changed_at: string;
  changer?: User;
    user_id: number;
    name: string;
    email: string;
  };

export interface Trip {
  trip_id: number;
  user_id: number;
  trip_number: string;
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  duration: number;
  extended_end_date?: string;
  extension_reason?: string;
  extension_requested_at?: string;
  estimated_budget?: number;
  total_advance: number;
  total_expenses: number;
  status: 'active' | 'awaiting_review' | 'under_review_area' | 'under_review_regional' | 'completed' | 'cancelled';
  submitted_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  advances?: Advance[];
  receipts?: Receipt[];
  history?: TripStatusHistory[]; // ✅ TAMBAHKAN INI
}

export interface Advance {
  advance_id: number;
  trip_id: number;
  advance_number: string;
  request_type: 'initial' | 'additional';
  requested_amount: number;
  approved_amount?: number;
  status: 'pending' | 'approved_area' | 'approved_regional' | 'rejected' | 'transferred';
  request_reason?: string;
  transfer_date?: string;
  transfer_reference?: string;
  requested_at: string;
  approved_at_area?: string;
  approved_at_regional?: string;
  approved_by_area?: number;
  approved_by_regional?: number;
  created_at: string;
  updated_at: string;
}

export interface Receipt {
  receipt_id: number;
  trip_id: number;
  receipt_number: string;
  category: 'fuel' | 'meal' | 'accommodation' | 'transportation' | 'parking' | 'toll' | 'other';
  amount: number;
  receipt_date: string;
  merchant_name?: string;
  description: string;
  image_path?: string;
  is_verified: boolean;
  verified_by?: number;
  verified_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Settlement {
  settlement_id: number;
  trip_id: number;
  total_advance: number;
  total_expenses: number;
  balance: number;
  settlement_status: string;
  settlement_date?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface TripStatusTrackerProps {
  currentStatus: string;
  history?: (TripStatusHistory & { old_status?: string })[]; // Make old_status optional
}

