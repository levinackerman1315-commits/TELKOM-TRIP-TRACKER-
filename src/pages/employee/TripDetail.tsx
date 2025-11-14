import { useParams, Link } from 'react-router-dom';
import { getTripById } from '@/data/mockTrips';
import { TripStatusTracker } from '@/components/admin/TripStatusTracker';
import { ArrowLeft, MapPin, Calendar, DollarSign, FileText } from 'lucide-react';

export default function EmployeeTripDetail() {
  const { id } = useParams<{ id: string }>();
  const trip = getTripById(id || '');

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h2>
          <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist.</p>
          <Link
            to="/employee/dashboard"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to My Trips
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/employee/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Trip Details</h1>
          <p className="text-sm text-gray-600 mt-1">
            View your business trip request details
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Info Card */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                  <MapPin className="h-4 w-4" />
                  Destination
                </label>
                <p className="text-lg font-semibold text-gray-900">{trip.destination}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                  <FileText className="h-4 w-4" />
                  Purpose
                </label>
                <p className="text-gray-900">{trip.purpose}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                  <DollarSign className="h-4 w-4" />
                  Advance Amount
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {formatCurrency(trip.advance_amount)}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Employee
                </label>
                <p className="text-gray-900 font-medium">{trip.employee_name}</p>
                <p className="text-sm text-gray-500">{trip.employee_id}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
                  <Calendar className="h-4 w-4" />
                  Travel Dates
                </label>
                <p className="text-gray-900">
                  {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Request Date
                </label>
                <p className="text-gray-900">
                  {new Date(trip.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tracking */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Trip Progress</h2>
          <TripStatusTracker currentStatus={trip.status} history={trip.history} />
        </div>
      </div>
    </div>
  );
}