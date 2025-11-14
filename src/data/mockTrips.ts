import { TripDetail, TripStatus } from '@/types/trips';

// Helper function untuk format tanggal
const formatDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Dummy trips data
export const mockTrips: TripDetail[] = [
  {
    id: '1',
    employee_id: 'EMP001',
    employee_name: 'DEDI YULIANDI',
    destination: 'Jakarta',
    purpose: 'Client Meeting',
    start_date: '2024-11-15',
    end_date: '2024-11-17',
    advance_amount: 5000000,
    status: 'area_review',
    created_at: formatDate(2),
    updated_at: formatDate(1),
    history: [
      {
        id: 'h1',
        trip_id: '1',
        user_id: 'EMP001',
        user_name: 'DEDI YULIANDI',
        user_role: 'employee',
        action_type: 'submit',
        status: 'submitted',
        notes: 'Pengajuan perjalanan dinas untuk meeting dengan client Telkomsel',
        created_at: formatDate(2),
      },
    ],
  },
  {
    id: '2',
    employee_id: 'EMP002',
    employee_name: 'SITI NURHALIZA',
    destination: 'Surabaya',
    purpose: 'Network Installation',
    start_date: '2024-11-20',
    end_date: '2024-11-22',
    advance_amount: 3500000,
    status: 'submitted',
    created_at: formatDate(1),
    updated_at: formatDate(1),
    history: [
      {
        id: 'h2',
        trip_id: '2',
        user_id: 'EMP002',
        user_name: 'SITI NURHALIZA',
        user_role: 'employee',
        action_type: 'submit',
        status: 'submitted',
        notes: 'Instalasi jaringan fiber optik di area Surabaya Timur',
        created_at: formatDate(1),
      },
    ],
  },
  {
    id: '3',
    employee_id: 'EMP003',
    employee_name: 'BUDI SANTOSO',
    destination: 'Bandung',
    purpose: 'Training Session',
    start_date: '2024-11-10',
    end_date: '2024-11-12',
    advance_amount: 2500000,
    status: 'completed',
    created_at: formatDate(5),
    updated_at: formatDate(0),
    history: [
      {
        id: 'h3',
        trip_id: '3',
        user_id: 'EMP003',
        user_name: 'BUDI SANTOSO',
        user_role: 'employee',
        action_type: 'submit',
        status: 'submitted',
        notes: 'Pelatihan teknis instalasi FO',
        created_at: formatDate(5),
      },
      {
        id: 'h4',
        trip_id: '3',
        user_id: 'FIN001',
        user_name: 'YULIA RAHMAWATI',
        user_role: 'finance_area',
        action_type: 'approve',
        status: 'area_review',
        notes: 'Disetujui finance area, diteruskan ke regional',
        created_at: formatDate(4),
      },
      {
        id: 'h5',
        trip_id: '3',
        user_id: 'FIN002',
        user_name: 'RONY SETIAWAN',
        user_role: 'finance_regional',
        action_type: 'complete',
        status: 'completed',
        notes: 'Proses selesai, dana telah ditransfer',
        created_at: formatDate(0),
      },
    ],
  },
  {
    id: '4',
    employee_id: 'EMP004',
    employee_name: 'RINA WIJAYA',
    destination: 'Medan',
    purpose: 'Site Survey',
    start_date: '2024-11-18',
    end_date: '2024-11-20',
    advance_amount: 4000000,
    status: 'regional_review',
    created_at: formatDate(3),
    updated_at: formatDate(1),
    history: [
      {
        id: 'h6',
        trip_id: '4',
        user_id: 'EMP004',
        user_name: 'RINA WIJAYA',
        user_role: 'employee',
        action_type: 'submit',
        status: 'submitted',
        notes: 'Survey lokasi untuk pemasangan BTS baru',
        created_at: formatDate(3),
      },
      {
        id: 'h7',
        trip_id: '4',
        user_id: 'FIN001',
        user_name: 'YULIA RAHMAWATI',
        user_role: 'finance_area',
        action_type: 'approve',
        status: 'area_review',
        notes: 'Approved, forwarded to regional',
        created_at: formatDate(1),
      },
    ],
  },
  {
    id: '5',
    employee_id: 'EMP005',
    employee_name: 'AHMAD FAUZI',
    destination: 'Bali',
    purpose: 'Customer Support',
    start_date: '2024-11-25',
    end_date: '2024-11-27',
    advance_amount: 6000000,
    status: 'rejected',
    created_at: formatDate(4),
    updated_at: formatDate(2),
    history: [
      {
        id: 'h8',
        trip_id: '5',
        user_id: 'EMP005',
        user_name: 'AHMAD FAUZI',
        user_role: 'employee',
        action_type: 'submit',
        status: 'submitted',
        notes: 'Penanganan komplain customer premium',
        created_at: formatDate(4),
      },
      {
        id: 'h9',
        trip_id: '5',
        user_id: 'FIN001',
        user_name: 'YULIA RAHMAWATI',
        user_role: 'finance_area',
        action_type: 'reject',
        status: 'rejected',
        notes: 'Budget tidak mencukupi untuk periode ini. Silakan ajukan bulan depan.',
        created_at: formatDate(2),
      },
    ],
  },
];

// Helper function untuk filter berdasarkan status
export const getTripsByStatus = (status: TripStatus): TripDetail[] => {
  return mockTrips.filter(trip => trip.status === status);
};

// Helper function untuk get single trip
export const getTripById = (id: string): TripDetail | undefined => {
  return mockTrips.find(trip => trip.id === id);
};