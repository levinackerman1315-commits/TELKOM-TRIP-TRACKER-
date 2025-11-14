import API_URL, { getAuthHeaders, handleApiError } from './config';

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

export interface CreateTripData {
  destination: string;
  purpose: string;
  start_date: string;
  end_date: string;
  advance: number;
}

// Get all trips for employee
export const getMyTrips = async (): Promise<Trip[]> => {
  try {
    const response = await fetch(`${API_URL}/employee/trips`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Get single trip
export const getTrip = async (id: number): Promise<Trip> => {
  try {
    const response = await fetch(`${API_URL}/employee/trips/${id}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trip');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Create new trip
export const createTrip = async (data: CreateTripData): Promise<Trip> => {
  try {
    const response = await fetch(`${API_URL}/employee/trips`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create trip');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Get all trips for finance
export const getAllTrips = async (): Promise<Trip[]> => {
  try {
    const response = await fetch(`${API_URL}/finance/trips`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Approve trip (finance only)
export const approveTrip = async (id: number): Promise<Trip> => {
  try {
    const response = await fetch(`${API_URL}/finance/trips/${id}/approve`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to approve trip');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};

// Reject trip (finance only)
export const rejectTrip = async (id: number, reason?: string): Promise<Trip> => {
  try {
    const response = await fetch(`${API_URL}/finance/trips/${id}/reject`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });

    if (!response.ok) {
      throw new Error('Failed to reject trip');
    }

    return await response.json();
  } catch (error: any) {
    throw handleApiError(error);
  }
};
