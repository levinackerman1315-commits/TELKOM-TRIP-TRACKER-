import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTripById } from '@/data/mockTrips';
import { TripStatusTracker } from '@/components/admin/TripStatusTracker';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminTripDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = getTripById(id || '');

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h2>
          <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist.</p>
          <Link
            to="/admin/dashboard"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Back to Dashboard
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

  // Check if current user can take action
  const canTakeAction = trip.status === 'submitted' || trip.status === 'area_review';

  const handleApprove = () => {
    setIsProcessing(true);
    // TODO: Replace with API call
    setTimeout(() => {
      alert(`Trip approved and forwarded to regional!\nNotes: ${notes}`);
      setIsProcessing(false);
      setShowApproveModal(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  const handleReject = () => {
    setIsProcessing(true);
    // TODO: Replace with API call
    setTimeout(() => {
      alert(`Trip rejected!\nReason: ${notes}`);
      setIsProcessing(false);
      setShowRejectModal(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Trip Review</h1>
              <p className="text-sm text-gray-600 mt-1">
                Review and process business trip request
              </p>
            </div>
            {canTakeAction && (
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRejectModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <XCircle className="h-4 w-4" />
                  Reject
                </button>
                <button
                  onClick={() => setShowApproveModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alert if already processed */}
        {!canTakeAction && trip.status !== 'rejected' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-900">Already Processed</p>
              <p className="text-sm text-blue-700 mt-1">
                This trip has been processed and forwarded to the next stage.
              </p>
            </div>
          </div>
        )}

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

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Approve Trip</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Are you sure you want to approve this trip? It will be forwarded to Finance Regional for final approval.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Add any notes or comments..."
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowApproveModal(false)}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Reject Trip</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Please provide a reason for rejecting this trip request.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason *
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Explain why this trip is being rejected..."
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                disabled={isProcessing}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing || !notes.trim()}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}