// import { useState, useEffect } from 'react';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { tripAPI, advanceAPI, receiptAPI } from '@/services/api';
// import { Trip, Advance, Receipt } from '@/types';

// export default function TripDetail() {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   const [trip, setTrip] = useState<Trip | null>(null);
//   const [advances, setAdvances] = useState<Advance[]>([]);
//   const [receipts, setReceipts] = useState<Receipt[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'overview' | 'advances' | 'receipts'>('overview');

//   useEffect(() => {
//     if (id) {
//       fetchTripDetail();
//     }
//   }, [id]);

//   const fetchTripDetail = async () => {
//     try {
//       setIsLoading(true);
      
//       // Fetch trip detail
//       const tripResponse = await tripAPI.getById(Number(id));
//       setTrip(tripResponse.data.data);

//       // Fetch advances for this trip
//       const advancesResponse = await advanceAPI.getAll({ trip_id: id });
//       setAdvances(advancesResponse.data.data || []);

//       // Fetch receipts for this trip
//       const receiptsResponse = await receiptAPI.getAll({ trip_id: id });
//       setReceipts(receiptsResponse.data.data || []);

//     } catch (error) {
//       console.error('Failed to fetch trip detail:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   const getStatusBadge = (status: string) => {
//     const badges: Record<string, { color: string; text: string }> = {
//       active: { color: 'bg-green-100 text-green-800', text: 'Active' },
//       awaiting_review: { color: 'bg-yellow-100 text-yellow-800', text: 'Awaiting Review' },
//       under_review_area: { color: 'bg-blue-100 text-blue-800', text: 'Under Review (Area)' },
//       under_review_regional: { color: 'bg-purple-100 text-purple-800', text: 'Under Review (Regional)' },
//       completed: { color: 'bg-gray-100 text-gray-800', text: 'Completed' },
//       cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
//     };
//     const badge = badges[status] || { color: 'bg-gray-100 text-gray-800', text: status };
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
//         {badge.text}
//       </span>
//     );
//   };

//   const getAdvanceStatusBadge = (status: string) => {
//     const badges: Record<string, { color: string; text: string }> = {
//       pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
//       approved_area: { color: 'bg-blue-100 text-blue-800', text: 'Approved by Area' },
//       approved_regional: { color: 'bg-purple-100 text-purple-800', text: 'Approved by Regional' },
//       transferred: { color: 'bg-green-100 text-green-800', text: 'Transferred' },
//       rejected: { color: 'bg-red-100 text-red-800', text: 'Rejected' },
//     };
//     const badge = badges[status] || { color: 'bg-gray-100 text-gray-800', text: status };
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
//         {badge.text}
//       </span>
//     );
//   };

//   const handleCancelTrip = async () => {
//     if (!window.confirm('Are you sure you want to cancel this trip?')) {
//       return;
//     }

//     try {
//       await tripAPI.cancel(Number(id));
//       alert('Trip cancelled successfully');
//       navigate('/employee/dashboard');
//     } catch (error) {
//       console.error('Failed to cancel trip:', error);
//       alert('Failed to cancel trip');
//     }
//   };

//   const handleSubmitForReview = async () => {
//     if (!window.confirm('Submit this trip for review? You cannot make changes after submission.')) {
//       return;
//     }

//     try {
//       await tripAPI.submit(Number(id));
//       alert('Trip submitted for review successfully');
//       fetchTripDetail(); // Refresh data
//     } catch (error: any) {
//       console.error('Failed to submit trip:', error);
//       alert(error.response?.data?.message || 'Failed to submit trip');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading trip detail...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!trip) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Not Found</h2>
//           <Link
//             to="/employee/dashboard"
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const totalAdvance = advances
//     .filter(a => a.status === 'transferred')
//     .reduce((sum, a) => sum + (a.approved_amount || 0), 0);

//   const totalReceipts = receipts.reduce((sum, r) => sum + r.amount, 0);
//   const balance = totalAdvance - totalReceipts;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-2">
//                 <h1 className="text-3xl font-bold text-gray-900">{trip.destination}</h1>
//                 {getStatusBadge(trip.status)}
//               </div>
//               <p className="text-sm text-gray-500">Trip #{trip.trip_number}</p>
//             </div>
//             <Link
//               to="/employee/dashboard"
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//             >
//               ← Back
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - Trip Info & Actions */}
//           <div className="lg:col-span-1 space-y-6">
//             {/* Trip Info Card */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Trip Information</h3>
              
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-xs text-gray-500">Purpose</p>
//                   <p className="text-sm text-gray-900">{trip.purpose}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <p className="text-xs text-gray-500">Start Date</p>
//                     <p className="text-sm font-medium text-gray-900">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-gray-500">End Date</p>
//                     <p className="text-sm font-medium text-gray-900">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-xs text-gray-500">Duration</p>
//                   <p className="text-sm font-medium text-gray-900">{trip.duration} days</p>
//                 </div>

//                 {trip.extended_end_date && (
//                   <div className="pt-3 border-t border-gray-200">
//                     <p className="text-xs text-gray-500">Extended Until</p>
//                     <p className="text-sm font-medium text-orange-600">{formatDate(trip.extended_end_date)}</p>
//                     {trip.extension_reason && (
//                       <p className="text-xs text-gray-600 mt-1">{trip.extension_reason}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Financial Summary */}
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="font-semibold text-gray-900 mb-4">Financial Summary</h3>
              
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Total Advance</span>
//                   <span className="text-sm font-semibold text-blue-600">{formatCurrency(totalAdvance)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-gray-600">Total Expenses</span>
//                   <span className="text-sm font-semibold text-green-600">{formatCurrency(totalReceipts)}</span>
//                 </div>
//                 <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
//                   <span className="text-sm font-semibold text-gray-900">Balance</span>
//                   <span className={`text-sm font-bold ${balance > 0 ? 'text-orange-600' : balance < 0 ? 'text-purple-600' : 'text-gray-600'}`}>
//                     {formatCurrency(balance)}
//                   </span>
//                 </div>
//                 {balance > 0 && (
//                   <p className="text-xs text-orange-600">You need to refund {formatCurrency(balance)}</p>
//                 )}
//                 {balance < 0 && (
//                   <p className="text-xs text-purple-600">Company owes you {formatCurrency(Math.abs(balance))}</p>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             {trip.status === 'active' && (
//               <div className="bg-white rounded-lg shadow p-6 space-y-3">
//                 <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>
                
//                 <button
//                   onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}
//                   className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm"
//                 >
//                   💰 Request Advance
//                 </button>

//                 <button
//                   onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}
//                   className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium text-sm"
//                 >
//                   📄 Upload Receipt
//                 </button>

//                 <button
//                   onClick={() => navigate(`/employee/trips/${trip.trip_id}/extension`)}
//                   className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-medium text-sm"
//                 >
//                   📅 Request Extension
//                 </button>

//                 <button
//                   onClick={handleSubmitForReview}
//                   className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium text-sm"
//                 >
//                   ✅ Submit for Review
//                 </button>

//                 <button
//                   onClick={handleCancelTrip}
//                   className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
//                 >
//                   ❌ Cancel Trip
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Right Column - Tabs */}
//           <div className="lg:col-span-2">
//             {/* Tabs */}
//             <div className="bg-white rounded-lg shadow mb-6">
//               <div className="border-b border-gray-200">
//                 <nav className="flex -mb-px">
//                   <button
//                     onClick={() => setActiveTab('overview')}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
//                       activeTab === 'overview'
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     Overview
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('advances')}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
//                       activeTab === 'advances'
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     Advances ({advances.length})
//                   </button>
//                   <button
//                     onClick={() => setActiveTab('receipts')}
//                     className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
//                       activeTab === 'receipts'
//                         ? 'border-blue-500 text-blue-600'
//                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }`}
//                   >
//                     Receipts ({receipts.length})
//                   </button>
//                 </nav>
//               </div>

//               <div className="p-6">
//                 {/* Overview Tab */}
//                 {activeTab === 'overview' && (
//                   <div className="space-y-6">
//                     <div>
//                       <h4 className="font-semibold text-gray-900 mb-3">Trip Timeline</h4>
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3">
//                           <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
//                           <div>
//                             <p className="text-sm font-medium text-gray-900">Trip Created</p>
//                             <p className="text-xs text-gray-500">{formatDate(trip.created_at)}</p>
//                           </div>
//                         </div>
                        
//                         {trip.submitted_at && (
//                           <div className="flex items-start gap-3">
//                             <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-900">Submitted for Review</p>
//                               <p className="text-xs text-gray-500">{formatDate(trip.submitted_at)}</p>
//                             </div>
//                           </div>
//                         )}

//                         {trip.completed_at && (
//                           <div className="flex items-start gap-3">
//                             <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
//                             <div>
//                               <p className="text-sm font-medium text-gray-900">Completed</p>
//                               <p className="text-xs text-gray-500">{formatDate(trip.completed_at)}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                       <h4 className="font-semibold text-blue-900 mb-2">Quick Stats</h4>
//                       <div className="grid grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <p className="text-blue-700">Total Advances</p>
//                           <p className="font-semibold text-blue-900">{advances.length}</p>
//                         </div>
//                         <div>
//                           <p className="text-blue-700">Total Receipts</p>
//                           <p className="font-semibold text-blue-900">{receipts.length}</p>
//                         </div>
//                         <div>
//                           <p className="text-blue-700">Verified Receipts</p>
//                           <p className="font-semibold text-blue-900">
//                             {receipts.filter(r => r.is_verified).length}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-blue-700">Pending Receipts</p>
//                           <p className="font-semibold text-blue-900">
//                             {receipts.filter(r => !r.is_verified).length}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Advances Tab */}
//                 {activeTab === 'advances' && (
//                   <div className="space-y-4">
//                     {advances.length === 0 ? (
//                       <div className="text-center py-8">
//                         <p className="text-gray-500">No advances yet</p>
//                         {trip.status === 'active' && (
//                           <button
//                             onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}
//                             className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                           >
//                             Request Advance
//                           </button>
//                         )}
//                       </div>
//                     ) : (
//                       advances.map((advance) => (
//                         <div key={advance.advance_id} className="border border-gray-200 rounded-lg p-4">
//                           <div className="flex items-start justify-between mb-3">
//                             <div>
//                               <p className="font-medium text-gray-900">{advance.advance_number}</p>
//                               <p className="text-xs text-gray-500 capitalize">{advance.request_type} Request</p>
//                             </div>
//                             {getAdvanceStatusBadge(advance.status)}
//                           </div>
                          
//                           <div className="grid grid-cols-2 gap-3 text-sm">
//                             <div>
//                               <p className="text-gray-500">Requested</p>
//                               <p className="font-semibold text-gray-900">{formatCurrency(advance.requested_amount)}</p>
//                             </div>
//                             {advance.approved_amount && (
//                               <div>
//                                 <p className="text-gray-500">Approved</p>
//                                 <p className="font-semibold text-green-600">{formatCurrency(advance.approved_amount)}</p>
//                               </div>
//                             )}
//                           </div>

//                           {advance.request_reason && (
//                             <p className="text-xs text-gray-600 mt-2">{advance.request_reason}</p>
//                           )}
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}

//                 {/* Receipts Tab */}
//                 {activeTab === 'receipts' && (
//                   <div className="space-y-4">
//                     {receipts.length === 0 ? (
//                       <div className="text-center py-8">
//                         <p className="text-gray-500">No receipts yet</p>
//                         {trip.status === 'active' && (
//                           <button
//                             onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}
//                             className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                           >
//                             Upload Receipt
//                           </button>
//                         )}
//                       </div>
//                     ) : (
//                       receipts.map((receipt) => (
//                         <div key={receipt.receipt_id} className="border border-gray-200 rounded-lg p-4">
//                           <div className="flex items-start justify-between mb-3">
//                             <div>
//                               <p className="font-medium text-gray-900">{receipt.receipt_number}</p>
//                               <p className="text-xs text-gray-500 capitalize">{receipt.category}</p>
//                             </div>
//                             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                               receipt.is_verified
//                                 ? 'bg-green-100 text-green-800'
//                                 : 'bg-yellow-100 text-yellow-800'
//                             }`}>
//                               {receipt.is_verified ? 'Verified' : 'Pending'}
//                             </span>
//                           </div>
                          
//                           <div className="space-y-2 text-sm">
//                             <div className="flex justify-between">
//                               <span className="text-gray-500">Amount</span>
//                               <span className="font-semibold text-gray-900">{formatCurrency(receipt.amount)}</span>
//                             </div>
//                             <div className="flex justify-between">
//                               <span className="text-gray-500">Date</span>
//                               <span className="text-gray-900">{formatDate(receipt.receipt_date)}</span>
//                             </div>
//                             {receipt.merchant_name && (
//                               <div className="flex justify-between">
//                                 <span className="text-gray-500">Merchant</span>
//                                 <span className="text-gray-900">{receipt.merchant_name}</span>
//                               </div>
//                             )}
//                           </div>

//                           <p className="text-xs text-gray-600 mt-2">{receipt.description}</p>
//                         </div>
//                       ))
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  FileText,
  Clock,
  Receipt as ReceiptIcon,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { tripAPI, advanceAPI, receiptAPI } from '@/services/api'
import { Trip, Advance, Receipt } from '@/types'

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: any; icon: any; label: string }> = {
    active: { variant: 'default', icon: CheckCircle2, label: 'Active' },
    awaiting_review: { variant: 'secondary', icon: Clock, label: 'Awaiting Review' },
    under_review_area: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Area)' },
    under_review_regional: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Regional)' },
    completed: { variant: 'outline', icon: CheckCircle2, label: 'Completed' },
    cancelled: { variant: 'destructive', icon: XCircle, label: 'Cancelled' },
  }
  
  const status_info = statusMap[status] || statusMap.active
  const Icon = status_info.icon
  
  return (
    <Badge variant={status_info.variant} className="gap-1">
      <Icon className="w-3 h-3" />
      {status_info.label}
    </Badge>
  )
}

const getAdvanceStatusBadge = (status: string) => {
  const statusMap: Record<string, { color: string; label: string }> = {
    pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' },
    approved_area: { color: 'bg-blue-100 text-blue-800', label: 'Approved by Area' },
    approved_regional: { color: 'bg-purple-100 text-purple-800', label: 'Approved by Regional' },
    transferred: { color: 'bg-success text-success-foreground', label: 'Transferred' },
    rejected: { color: 'bg-destructive text-destructive-foreground', label: 'Rejected' },
  }
  
  const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
  
  return <Badge className={color}>{label}</Badge>
}

export default function TripDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [trip, setTrip] = useState<Trip | null>(null)
  const [advances, setAdvances] = useState<Advance[]>([])
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (id) {
      fetchTripDetail()
    }
  }, [id])

  const fetchTripDetail = async () => {
    try {
      setIsLoading(true)
      
      const tripResponse = await tripAPI.getById(Number(id))
      setTrip(tripResponse.data.data)

      const advancesResponse = await advanceAPI.getAll({ trip_id: id })
      setAdvances(advancesResponse.data.data || [])

      const receiptsResponse = await receiptAPI.getAll({ trip_id: id })
      setReceipts(receiptsResponse.data.data || [])

    } catch (error) {
      console.error('Failed to fetch trip detail:', error)
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

  const handleCancelTrip = async () => {
    if (!window.confirm('Are you sure you want to cancel this trip?')) return

    try {
      await tripAPI.cancel(Number(id))
      alert('Trip cancelled successfully')
      navigate('/employee/dashboard')
    } catch (error) {
      console.error('Failed to cancel trip:', error)
      alert('Failed to cancel trip')
    }
  }

  const handleSubmitForReview = async () => {
    if (!window.confirm('Submit this trip for review? You cannot make changes after submission.')) return

    try {
      await tripAPI.submit(Number(id))
      alert('Trip submitted for review successfully')
      fetchTripDetail()
    } catch (error: any) {
      console.error('Failed to submit trip:', error)
      alert(error.response?.data?.message || 'Failed to submit trip')
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
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Trip Not Found</h2>
          <p className="text-muted-foreground mb-4">The trip you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/employee/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  // GANTI perhitungan lama:
  // const totalAdvance = advances
  //   .filter(a => a.status === 'transferred')
  //   .reduce((sum, a) => sum + (a.approved_amount || 0), 0)

  const requestedAdvanceTotal = advances
    .filter(a => a.status !== 'rejected')
    .reduce((sum, a) => sum + (a.requested_amount || 0), 0)

  const approvedAdvanceTotal = advances
    .filter(a => ['approved_area','approved_regional','transferred'].includes(a.status))
    .reduce((sum, a) => sum + (a.approved_amount || 0), 0)

  const transferredAdvanceTotal = advances
    .filter(a => a.status === 'transferred')
    .reduce((sum, a) => sum + (a.approved_amount || 0), 0)

  const totalReceipts = receipts.reduce((sum, r) => sum + r.amount, 0)
  const balance = transferredAdvanceTotal - totalReceipts

  const estimatedBudget = trip.estimated_budget || 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/employee/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{trip.destination}</h1>
              <p className="text-sm text-white/80">Trip #{trip.trip_number}</p>
            </div>
            {getStatusBadge(trip.status)}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trip Info */}
          <div className="space-y-6">
            {/* Trip Information */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Trip Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                    <FileText className="h-4 w-4" />
                    Purpose
                  </label>
                  <p className="text-sm">{trip.purpose}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                    <p className="text-sm font-medium">{formatDate(trip.start_date)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                    <p className="text-sm font-medium">{formatDate(trip.end_date)}</p>
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                    <Clock className="h-4 w-4" />
                    Duration
                  </label>
                  <p className="text-sm font-medium">{trip.duration} days</p>
                </div>

                {trip.extended_end_date && (
                  <div className="pt-3 border-t">
                    <label className="text-xs text-muted-foreground mb-1 block">Extended Until</label>
                    <p className="text-sm font-medium text-warning">{formatDate(trip.extended_end_date)}</p>
                    {trip.extension_reason && (
                      <p className="text-xs text-muted-foreground mt-1">{trip.extension_reason}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Summary
                </CardTitle>
                <CardDescription>Overview of budget, advances, and expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated Budget</span>
                  <span className="text-sm font-semibold">{formatCurrency(estimatedBudget)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Requested Advance Total</span>
                  <span className="text-sm font-semibold text-warning">{formatCurrency(requestedAdvanceTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Approved Advance Total</span>
                  <span className="text-sm font-semibold text-primary">{formatCurrency(approvedAdvanceTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Transferred Advance Total</span>
                  <span className="text-sm font-semibold text-success">{formatCurrency(transferredAdvanceTotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Expenses</span>
                  <span className="text-sm font-semibold text-success">{formatCurrency(totalReceipts)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between items-center">
                  <span className="text-sm font-semibold">Balance (Transferred - Expenses)</span>
                  <span className={`text-sm font-bold ${balance > 0 ? 'text-warning' : balance < 0 ? 'text-purple-600' : 'text-muted-foreground'}`}>
                    {formatCurrency(balance)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Remaining Budget (Est - Expenses)</span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(Math.max(estimatedBudget - totalReceipts, 0))}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            {trip.status === 'active' && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}
                    className="w-full"
                    variant="default"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Request Advance
                  </Button>

                  <Button
                    onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}
                    className="w-full"
                    variant="outline"
                  >
                    <ReceiptIcon className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>

                  <Button
                    onClick={() => navigate(`/employee/trips/${trip.trip_id}/extension`)}
                    className="w-full"
                    variant="outline"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Request Extension
                  </Button>

                  <Button
                    onClick={handleSubmitForReview}
                    className="w-full"
                    variant="secondary"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Submit for Review
                  </Button>

                  <Button
                    onClick={handleCancelTrip}
                    className="w-full"
                    variant="destructive"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Trip
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft">
              <Tabs defaultValue="overview" className="w-full">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="advances">Advances ({advances.length})</TabsTrigger>
                    <TabsTrigger value="receipts">Receipts ({receipts.length})</TabsTrigger>
                  </TabsList>
                </CardHeader>

                <CardContent>
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Trip Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                          <div>
                            <p className="text-sm font-medium">Trip Created</p>
                            <p className="text-xs text-muted-foreground">{formatDate(trip.created_at)}</p>
                          </div>
                        </div>
                        
                        {trip.submitted_at && (
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Submitted for Review</p>
                              <p className="text-xs text-muted-foreground">{formatDate(trip.submitted_at)}</p>
                            </div>
                          </div>
                        )}

                        {trip.completed_at && (
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                            <div>
                              <p className="text-sm font-medium">Completed</p>
                              <p className="text-xs text-muted-foreground">{formatDate(trip.completed_at)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <Card className="bg-primary/5 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-base">Quick Stats</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Total Advances</p>
                            <p className="font-semibold">{advances.length}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total Receipts</p>
                            <p className="font-semibold">{receipts.length}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Verified Receipts</p>
                            <p className="font-semibold text-success">
                              {receipts.filter(r => r.is_verified).length}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Pending Receipts</p>
                            <p className="font-semibold text-warning">
                              {receipts.filter(r => !r.is_verified).length}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Advances Tab */}
                  <TabsContent value="advances" className="space-y-4">
                    {advances.length === 0 ? (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground mb-4">No advances yet</p>
                        {trip.status === 'active' && (
                          <Button onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}>
                            Request Advance
                          </Button>
                        )}
                      </div>
                    ) : (
                      advances.map((advance) => (
                        <Card key={advance.advance_id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-medium">{advance.advance_number}</p>
                                <p className="text-xs text-muted-foreground capitalize">{advance.request_type} Request</p>
                              </div>
                              {getAdvanceStatusBadge(advance.status)}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-muted-foreground">Requested</p>
                                <p className="font-semibold">{formatCurrency(advance.requested_amount)}</p>
                              </div>
                              {advance.approved_amount && (
                                <div>
                                  <p className="text-muted-foreground">Approved</p>
                                  <p className="font-semibold text-success">{formatCurrency(advance.approved_amount)}</p>
                                </div>
                              )}
                            </div>

                            {advance.request_reason && (
                              <p className="text-xs text-muted-foreground mt-2">{advance.request_reason}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>

                  {/* Receipts Tab */}
                  <TabsContent value="receipts" className="space-y-4">
                    {receipts.length === 0 ? (
                      <div className="text-center py-8">
                        <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground mb-4">No receipts yet</p>
                        {trip.status === 'active' && (
                          <Button onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}>
                            Upload Receipt
                          </Button>
                        )}
                      </div>
                    ) : (
                      receipts.map((receipt) => (
                        <Card key={receipt.receipt_id} className="border">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="font-medium">{receipt.receipt_number}</p>
                                <p className="text-xs text-muted-foreground capitalize">{receipt.category}</p>
                              </div>
                              <Badge variant={receipt.is_verified ? 'default' : 'secondary'}>
                                {receipt.is_verified ? 'Verified' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Amount</span>
                                <span className="font-semibold">{formatCurrency(receipt.amount)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Date</span>
                                <span>{formatDate(receipt.receipt_date)}</span>
                              </div>
                              {receipt.merchant_name && (
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Merchant</span>
                                  <span>{receipt.merchant_name}</span>
                                </div>
                              )}
                            </div>

                            <p className="text-xs text-muted-foreground mt-2">{receipt.description}</p>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}