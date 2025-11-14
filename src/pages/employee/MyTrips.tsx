import { useNavigate } from 'react-router-dom';
import { mockTrips } from '@/data/mockTrips'; // Import mock data atau API

export default function MyTrips() {
  const navigate = useNavigate();

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">Submitted</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Pending</span>;
      case 'approved':
        return <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Approved</span>;
      case 'completed':
        return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold">Completed</span>;
      case 'rejected':
        return <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">My Trips</h1>
        <p className="text-gray-600 mb-6">View and manage your business trip requests</p>
        <div className="space-y-4">
          {mockTrips.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No trips found</div>
          ) : (
            mockTrips.map(trip => (
              <div key={trip.id} className="flex items-center justify-between bg-white rounded-lg shadow p-5 border">
                <div className="flex items-center gap-4">
                  <div className="bg-red-50 rounded-lg p-3">
                    <span role="img" aria-label="plane">✈️</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{trip.destination}</div>
                    <div className="text-sm text-gray-600">{trip.purpose}</div>
                    <div className="text-xs text-gray-500">
                      {formatDate(trip.start_date)} - {formatDate(trip.end_date)} • Advance: {formatCurrency(trip.advance_amount)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(trip.status)}
                  <button
                    onClick={() => navigate(`/employee/trips/${trip.id}`)}
                    className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}