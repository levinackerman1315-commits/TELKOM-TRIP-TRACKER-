// src/types/advance.ts

/**
 * Main Advance interface - dipakai di semua file
 */
export interface Advance {
  // Primary IDs
  id: number
  advance_id: number
  advance_number: string
  
  // Trip & Employee Info
  trip_id: number
  trip_number: string
  destination: string
  employee_id: number
employee_nik?: string  // ✅ TAMBAH INI!
  employee_name: string
  
  // Advance Details
  request_type: 'initial' | 'additional'
  requested_amount: number
  approved_amount?: number
  status: 'pending' | 'approved_area' | 'approved_regional' | 'completed' | 'rejected' | 'voided'
  
  // Text Fields
  request_reason?: string
  rejection_reason?: string
  notes?: string
  
  // Supporting Document
  supporting_document_path?: string
  supporting_document_name?: string
  
  // Timestamps
  requested_at: string
  approved_at_area?: string
  approved_at_regional?: string
  transfer_date?: string
  transfer_reference?: string
  created_at: string
  updated_at: string
  
  // Nested Trip (optional, dari backend dengan eager loading)
  trip?: {
    trip_number: string
    destination: string
    purpose: string
    start_date: string
    end_date: string
    status: string
    estimated_budget?: number
  }
}

/**
 * Status History interface
 */
export interface StatusHistory {
  id: number
  advance_id: number
  old_status: string | null
  new_status: string
  changed_by: number
  changed_by_name?: string
  notes?: string
  changed_at: string
}

/**
 * Stats interface untuk dashboard
 */
export interface AdvanceStats {
  pending: number
  approved: number
  rejected: number
  total: number
}