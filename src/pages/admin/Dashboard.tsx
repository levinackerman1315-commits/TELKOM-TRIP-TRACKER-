import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTrips } from '@/data/mockTrips';
import { TripStatus } from '@/types/trips';
import { Plane } from 'lucide-react';

export default function AdminDashboard() {
  const [filterStatus, setFilterStatus] = useState<TripStatus | 'all'>('all');
  const navigate = useNavigate();

  const filteredTrips = filterStatus === 'all'
    ? mockTrips
    : mockTrips.filter(trip => trip.status === filterStatus);

  // Count stats
  const stats = {
    all: mockTrips.length,
    submitted: mockTrips.filter(t => t.status === 'submitted').length,
    area_review: mockTrips.filter(t => t.status === 'area_review').length,
    regional_review: mockTrips.filter(t => t.status === 'regional_review').length,
    completed: mockTrips.filter(t => t.status === 'completed').length,
    rejected: mockTrips.filter(t => t.status === 'rejected').length,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: TripStatus) => {
    const badges = {
      submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
      area_review: { label: 'Area Review', color: 'bg-yellow-100 text-yellow-800' },
      regional_review: { label: 'Regional Review', color: 'bg-purple-100 text-purple-800' },
      completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
      rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
    };
    
    const badge = badges[status];
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
        {status === 'completed' && '✓'}
        {status === 'rejected' && '✗'}
        {status === 'submitted' && '⏱'}
        {status === 'area_review' && '⏳'}
        {status === 'regional_review' && '⏳'}
        {badge.label}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-red-600 border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-telkom-akses.png" 
              alt="Telkom Akses" 
              className="h-10 w-auto bg-white rounded px-2 py-1"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
              <p className="text-sm text-white/90">Telkom Akses Business Trip Tracker</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Trip Management</h2>
          <p className="text-muted-foreground">Review and manage all business trip requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              filterStatus === 'all'
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-gray-900">{stats.all}</div>
            <div className="text-xs text-gray-600 mt-1">All Trips</div>
          </button>

          <button
            onClick={() => setFilterStatus('submitted')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              filterStatus === 'submitted'
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
            <div className="text-xs text-gray-600 mt-1">Submitted</div>
          </button>

          <button
            onClick={() => setFilterStatus('area_review')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              filterStatus === 'area_review'
                ? 'border-yellow-600 bg-yellow-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-yellow-600">{stats.area_review}</div>
            <div className="text-xs text-gray-600 mt-1">Area Review</div>
          </button>

          <button
            onClick={() => setFilterStatus('regional_review')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              filterStatus === 'regional_review'
                ? 'border-purple-600 bg-purple-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-purple-600">{stats.regional_review}</div>
            <div className="text-xs text-gray-600 mt-1">Regional Review</div>
          </button>

          <button
            onClick={() => setFilterStatus('completed')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              filterStatus === 'completed'
                ? 'border-green-600 bg-green-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-600 mt-1">Completed</div>
          </button>

          <button
            onClick={() => setFilterStatus('rejected')}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              filterStatus === 'rejected'
                ? 'border-red-600 bg-red-50 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-xs text-gray-600 mt-1">Rejected</div>
          </button>
        </div>

        {/* Trip List */}
        <div className="space-y-4">
          {filteredTrips.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border">
              <p className="text-gray-500">No trips found</p>
            </div>
          ) : (
            filteredTrips.map(trip => (
              <div
                key={trip.id}
                className="flex items-center justify-between bg-card rounded-lg shadow-soft p-5 border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-red-50 rounded-lg p-3">
                    <Plane className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-bold text-lg text-foreground">{trip.destination}</div>
                    <div className="text-sm text-muted-foreground">{trip.purpose}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      <span className="font-medium">{trip.employee_name}</span> • {trip.start_date} - {trip.end_date}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Advance: {formatCurrency(trip.advance_amount)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(trip.status)}
                  <button
                    onClick={() => navigate(`/admin/trips/${trip.id}`)}
                    className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors"
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