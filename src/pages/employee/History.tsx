import { useState, useEffect } from 'react';
import { tripAPI } from '@/services/api';
import { Trip } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function History() {
  const { user } = useAuth();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setIsLoading(true);
      const response = await tripAPI.getAll();
      setTrips(response.data.data || []);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter trips yang sudah selesai atau dibatalkan
  const filteredTrips = trips.filter(trip => {
    if (filter === 'all') {
      return trip.status === 'completed' || trip.status === 'cancelled';
    }
    return trip.status === filter;
  });

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; text: string }> = {
      completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
      cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
    };
    const badge = badges[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Trip History</h1>
              <p className="mt-1 text-sm text-gray-500">
                View your completed and cancelled trips
              </p>
            </div>
            <Link
              to="/employee/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  filter === 'all'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All ({filteredTrips.length})
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  filter === 'completed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed ({trips.filter(t => t.status === 'completed').length})
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
                  filter === 'cancelled'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Cancelled ({trips.filter(t => t.status === 'cancelled').length})
              </button>
            </nav>
          </div>
        </div>

        {/* Trips List */}
        {filteredTrips.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No trips found</h3>
            <p className="mt-2 text-sm text-gray-500">
              You don't have any {filter === 'all' ? 'completed or cancelled' : filter} trips yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTrips.map((trip) => (
              <div
                key={trip.trip_id}
                className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {trip.destination}
                      </h3>
                      {getStatusBadge(trip.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{trip.purpose}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Trip Number</p>
                        <p className="text-sm font-medium text-gray-900">{trip.trip_number}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Days</p>
                        <p className="text-sm font-medium text-gray-900">{trip.duration} days</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-500">Total Advance</p>
                        <p className="text-sm font-semibold text-blue-600">
                          {formatCurrency(trip.total_advance || 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Expenses</p>
                        <p className="text-sm font-semibold text-green-600">
                          {formatCurrency(trip.total_expenses || 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Balance</p>
                        <p className={`text-sm font-semibold ${
                          (trip.total_advance || 0) - (trip.total_expenses || 0) > 0
                            ? 'text-orange-600'
                            : 'text-purple-600'
                        }`}>
                          {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/employee/trips/${trip.trip_id}`}
                    className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                  >
                    View Details
                  </Link>
                </div>

                {trip.completed_at && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Completed on {formatDate(trip.completed_at)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}