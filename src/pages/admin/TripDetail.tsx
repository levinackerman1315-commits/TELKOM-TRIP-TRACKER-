// import { useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { getTripById } from '@/data/mockTrips';
// import { TripStatusTracker } from '@/components/admin/TripStatusTracker';
// import { 
//   ArrowLeft, 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   FileText,
//   CheckCircle,
//   XCircle,
//   AlertCircle
// } from 'lucide-react';

// export default function AdminTripDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const trip = getTripById(id || '');

//   const [showApproveModal, setShowApproveModal] = useState(false);
//   const [showRejectModal, setShowRejectModal] = useState(false);
//   const [notes, setNotes] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   if (!trip) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip Not Found</h2>
//           <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist.</p>
//           <Link
//             to="/admin/dashboard"
//             className="text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//     });
//   };

//   // Check if current user can take action
//   const canTakeAction = trip.status === 'submitted' || trip.status === 'area_review';

//   const handleApprove = () => {
//     setIsProcessing(true);
//     // TODO: Replace with API call
//     setTimeout(() => {
//       alert(`Trip approved and forwarded to regional!\nNotes: ${notes}`);
//       setIsProcessing(false);
//       setShowApproveModal(false);
//       navigate('/admin/dashboard');
//     }, 1000);
//   };

//   const handleReject = () => {
//     setIsProcessing(true);
//     // TODO: Replace with API call
//     setTimeout(() => {
//       alert(`Trip rejected!\nReason: ${notes}`);
//       setIsProcessing(false);
//       setShowRejectModal(false);
//       navigate('/admin/dashboard');
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <Link
//             to="/admin/dashboard"
//             className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Link>
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Trip Review</h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 Review and process business trip request
//               </p>
//             </div>
//             {canTakeAction && (
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowRejectModal(true)}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   <XCircle className="h-4 w-4" />
//                   Reject
//                 </button>
//                 <button
//                   onClick={() => setShowApproveModal(true)}
//                   className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                 >
//                   <CheckCircle className="h-4 w-4" />
//                   Approve
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Alert if already processed */}
//         {!canTakeAction && trip.status !== 'rejected' && (
//           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
//             <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
//             <div>
//               <p className="font-medium text-blue-900">Already Processed</p>
//               <p className="text-sm text-blue-700 mt-1">
//                 This trip has been processed and forwarded to the next stage.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Trip Info Card */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
//                   <MapPin className="h-4 w-4" />
//                   Destination
//                 </label>
//                 <p className="text-lg font-semibold text-gray-900">{trip.destination}</p>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
//                   <FileText className="h-4 w-4" />
//                   Purpose
//                 </label>
//                 <p className="text-gray-900">{trip.purpose}</p>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
//                   <DollarSign className="h-4 w-4" />
//                   Advance Amount
//                 </label>
//                 <p className="text-lg font-semibold text-gray-900">
//                   {formatCurrency(trip.advance_amount)}
//                 </p>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-500 mb-1 block">
//                   Employee
//                 </label>
//                 <p className="text-gray-900 font-medium">{trip.employee_name}</p>
//                 <p className="text-sm text-gray-500">{trip.employee_id}</p>
//               </div>

//               <div>
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-1">
//                   <Calendar className="h-4 w-4" />
//                   Travel Dates
//                 </label>
//                 <p className="text-gray-900">
//                   {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
//                 </p>
//               </div>

//               <div>
//                 <label className="text-sm font-medium text-gray-500 mb-1 block">
//                   Request Date
//                 </label>
//                 <p className="text-gray-900">
//                   {new Date(trip.created_at).toLocaleDateString('id-ID', {
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric',
//                     hour: '2-digit',
//                     minute: '2-digit',
//                   })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Status Tracking */}
//         <div className="bg-white rounded-lg shadow-sm border p-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-6">Trip Progress</h2>
//           <TripStatusTracker currentStatus={trip.status} history={trip.history} />
//         </div>
//       </div>

//       {/* Approve Modal */}
//       {showApproveModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <CheckCircle className="h-6 w-6 text-green-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Approve Trip</h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Are you sure you want to approve this trip? It will be forwarded to Finance Regional for final approval.
//             </p>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Notes (Optional)
//               </label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Add any notes or comments..."
//               />
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowApproveModal(false)}
//                 disabled={isProcessing}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleApprove}
//                 disabled={isProcessing}
//                 className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
//               >
//                 {isProcessing ? 'Processing...' : 'Approve'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Reject Modal */}
//       {showRejectModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg max-w-md w-full p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <XCircle className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900">Reject Trip</h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Please provide a reason for rejecting this trip request.
//             </p>
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Rejection Reason *
//               </label>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 rows={3}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
//                 placeholder="Explain why this trip is being rejected..."
//                 required
//               />
//             </div>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowRejectModal(false)}
//                 disabled={isProcessing}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleReject}
//                 disabled={isProcessing || !notes.trim()}
//                 className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
//               >
//                 {isProcessing ? 'Processing...' : 'Reject'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { tripAPI, receiptAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Receipt as ReceiptIcon,
  Image as ImageIcon
} from 'lucide-react'
import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

interface Trip {
  trip_id: number
  trip_number: string
  destination: string
  purpose: string
  start_date: string
  end_date: string
  extended_end_date?: string
  duration: number
  status: string
  total_advance: number
  total_expenses: number
  employee_name?: string
  user?: {
    name: string
    email: string
  }
}

interface Receipt {
  receipt_id: number
  receipt_number: string
  category: string
  type?: string
  amount: number
  merchant_name?: string
  description?: string
  receipt_date: string
  receipt_image_url?: string
  image_path?: string
  is_verified: boolean
}

export default function TripSettlementDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const [trip, setTrip] = useState<Trip | null>(null)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    if (id) loadData()
  }, [id])

  const loadData = async () => {
    try {
      setIsLoading(true)
      
      const tripRes = await tripAPI.getById(Number(id))
      setTrip(tripRes.data.data)
      
      const receiptsRes = await receiptAPI.getAll({ trip_id: id })
      setReceipts(receiptsRes.data.data || [])
      
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const canTakeAction = trip?.status === 'awaiting_review'

  const handleApprove = async () => {
    if (!window.confirm('Approve this settlement and forward to Finance Regional?')) return

    try {
      await tripAPI.approveByArea(Number(id), {
        notes: 'Approved by Finance Area'
      })
      alert('Settlement approved and forwarded to Finance Regional')
      navigate('/finance-area/dashboard')
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to approve settlement')
    }
  }

  const handleReject = async () => {
    const reason = window.prompt('Please provide rejection reason:')
    if (!reason) return

    try {
      await tripAPI.rejectSettlement(Number(id), {
        rejection_reason: reason
      })
      alert('Settlement rejected and returned to employee')
      navigate('/finance-area/dashboard')
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to reject settlement')
    }
  }

  const handleVerifyReceipt = async (receiptId: number) => {
    const notes = window.prompt('Optional notes for verification:')
    
    try {
      await receiptAPI.verify(receiptId, { notes: notes || undefined })
      alert('Receipt verified successfully')
      loadData() // Reload data
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to verify receipt')
    }
  }

  const handleUnverifyReceipt = async (receiptId: number) => {
    const notes = window.prompt('Reason for unverify:')
    
    try {
      await receiptAPI.unverify(receiptId, { notes: notes || undefined })
      alert('Receipt unverified')
      loadData()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to unverify receipt')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trip detail...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Trip Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Unable to load trip details.</p>
            <Button onClick={() => navigate('/finance-area/dashboard')} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const totalAdvance = trip.total_advance || 0
  const totalExpenses = trip.total_expenses || receipts.reduce((sum, r) => sum + Number(r.amount), 0)
  const balance = totalAdvance - totalExpenses
  const unverifiedCount = receipts.filter(r => !r.is_verified).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/finance-area/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Settlement Review</h1>
              <p className="text-sm text-white/80">{trip.trip_number}</p>
            </div>
            {canTakeAction && (
              <div className="flex gap-3">
                <Button
                  onClick={handleReject}
                  variant="destructive"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={handleApprove}
                  variant="default"
                  disabled={unverifiedCount > 0 || receipts.length === 0}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trip Info */}
          <div className="space-y-6">
            {/* Trip Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trip Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Employee</label>
                  <p className="font-semibold">{trip.user?.name || trip.employee_name || '-'}</p>
                  {trip.user?.email && (
                    <p className="text-xs text-muted-foreground">{trip.user.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Destination</label>
                  <p className="font-semibold">{trip.destination}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Purpose</label>
                  <p className="text-sm">{trip.purpose}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                    <p className="text-sm font-medium">{formatDate(trip.start_date)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                    <p className="text-sm font-medium">{formatDate(trip.extended_end_date || trip.end_date)}</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Duration</label>
                  <p className="text-sm font-medium">{trip.duration} days</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Status</label>
                  <Badge variant={trip.status === 'awaiting_review' ? 'default' : 'secondary'}>
                    {trip.status.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Advance</span>
                  <span className="text-sm font-semibold text-green-600">{formatCurrency(totalAdvance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Expenses</span>
                  <span className="text-sm font-semibold text-blue-600">{formatCurrency(totalExpenses)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="text-sm font-semibold">Balance</span>
                  <span className={`text-sm font-bold ${
                    balance > 0 
                      ? 'text-yellow-600' 
                      : balance < 0 
                      ? 'text-purple-600' 
                      : 'text-gray-600'
                  }`}>
                    {formatCurrency(Math.abs(balance))}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {balance > 0 && '⚠️ Refund to Company'}
                  {balance < 0 && '💰 Reimbursement to Employee'}
                  {balance === 0 && '✅ Fully settled'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Card>
              <Tabs defaultValue="receipts">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="receipts">
                      Receipts ({receipts.length})
                      {unverifiedCount > 0 && (
                        <Badge variant="destructive" className="ml-2">{unverifiedCount}</Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="status">Status Tracker</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  {/* Receipts Tab */}
                  <TabsContent value="receipts" className="space-y-4">
                    {receipts.length === 0 ? (
                      <div className="text-center py-8">
                        <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No receipts uploaded</p>
                      </div>
                    ) : (
                      receipts.map(receipt => (
                        <Card key={receipt.receipt_id} className={`border ${receipt.is_verified ? 'bg-green-50 border-green-200' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-medium">{receipt.receipt_number}</p>
                                <p className="text-xs text-muted-foreground capitalize">
                                  {receipt.type || receipt.category}
                                </p>
                              </div>
                              <Badge variant={receipt.is_verified ? 'default' : 'secondary'}>
                                {receipt.is_verified ? '✓ Verified' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm mb-3">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-semibold">{formatCurrency(receipt.amount)}</span>
                              </div>
                              {receipt.merchant_name && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Merchant</span>
                                  <span>{receipt.merchant_name}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date</span>
                                <span>{formatDate(receipt.receipt_date)}</span>
                              </div>
                            </div>

                            {receipt.description && (
                              <p className="text-xs text-muted-foreground mb-3">{receipt.description}</p>
                            )}

                            {/* Receipt Image */}
                            {(receipt.receipt_image_url || receipt.image_path) && (
                              <div className="mt-3 flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    const imageUrl = receipt.receipt_image_url || 
                                      `http://127.0.0.1:8000/storage/${receipt.image_path}`
                                    setSelectedImage(imageUrl)
                                  }}
                                >
                                  <ImageIcon className="w-4 h-4 mr-2" />
                                  View Image
                                </Button>
                                
                                {canTakeAction && (
                                  receipt.is_verified ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleUnverifyReceipt(receipt.receipt_id)}
                                    >
                                      <XCircle className="w-4 h-4 mr-2" />
                                      Unverify
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="default"
                                      size="sm"
                                      onClick={() => handleVerifyReceipt(receipt.receipt_id)}
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Verify
                                    </Button>
                                  )
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>

                  {/* Status Tracker Tab */}
                  <TabsContent value="status">
                    <TripStatusTracker 
                      currentStatus={trip.status} 
                      history={[]} 
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-2 right-2 z-10"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
            >
              Close
            </Button>
            <img
              src={selectedImage}
              alt="Receipt"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  )
}