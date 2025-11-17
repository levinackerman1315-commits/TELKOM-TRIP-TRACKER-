// // import { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { mockTrips } from '@/data/mockTrips';
// // import { TripStatus } from '@/types/trips';
// // import { Plane } from 'lucide-react';

// // export default function AdminDashboard() {
// //   const [filterStatus, setFilterStatus] = useState<TripStatus | 'all'>('all');
// //   const navigate = useNavigate();

// //   const filteredTrips = filterStatus === 'all'
// //     ? mockTrips
// //     : mockTrips.filter(trip => trip.status === filterStatus);

// //   // Count stats
// //   const stats = {
// //     all: mockTrips.length,
// //     submitted: mockTrips.filter(t => t.status === 'submitted').length,
// //     area_review: mockTrips.filter(t => t.status === 'area_review').length,
// //     regional_review: mockTrips.filter(t => t.status === 'regional_review').length,
// //     completed: mockTrips.filter(t => t.status === 'completed').length,
// //     rejected: mockTrips.filter(t => t.status === 'rejected').length,
// //   };

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('id-ID', {
// //       style: 'currency',
// //       currency: 'IDR',
// //       minimumFractionDigits: 0,
// //     }).format(amount);
// //   };

// //   const getStatusBadge = (status: TripStatus) => {
// //     const badges = {
// //       submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
// //       area_review: { label: 'Area Review', color: 'bg-yellow-100 text-yellow-800' },
// //       regional_review: { label: 'Regional Review', color: 'bg-purple-100 text-purple-800' },
// //       completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
// //       rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
// //     };
    
// //     const badge = badges[status];
// //     return (
// //       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
// //         {status === 'completed' && '✓'}
// //         {status === 'rejected' && '✗'}
// //         {status === 'submitted' && '⏱'}
// //         {status === 'area_review' && '⏳'}
// //         {status === 'regional_review' && '⏳'}
// //         {badge.label}
// //       </span>
// //     );
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <header className="bg-red-600 border-b shadow-soft">
// //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <img 
// //               src="/logo-telkom-akses.png" 
// //               alt="Telkom Akses" 
// //               className="h-10 w-auto bg-white rounded px-2 py-1"
// //             />
// //             <div>
// //               <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
// //               <p className="text-sm text-white/90">Telkom Akses Business Trip Tracker</p>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <div className="container mx-auto px-4 py-8">
// //         {/* Title Section */}
// //         <div className="mb-8">
// //           <h2 className="text-3xl font-bold text-foreground mb-2">Trip Management</h2>
// //           <p className="text-muted-foreground">Review and manage all business trip requests</p>
// //         </div>

// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
// //           <button
// //             onClick={() => setFilterStatus('all')}
// //             className={`p-4 rounded-lg border-2 transition-all text-left ${
// //               filterStatus === 'all'
// //                 ? 'border-blue-600 bg-blue-50 shadow-md'
// //                 : 'border-gray-200 bg-white hover:border-gray-300'
// //             }`}
// //           >
// //             <div className="text-2xl font-bold text-gray-900">{stats.all}</div>
// //             <div className="text-xs text-gray-600 mt-1">All Trips</div>
// //           </button>

// //           <button
// //             onClick={() => setFilterStatus('submitted')}
// //             className={`p-4 rounded-lg border-2 transition-all text-left ${
// //               filterStatus === 'submitted'
// //                 ? 'border-blue-600 bg-blue-50 shadow-md'
// //                 : 'border-gray-200 bg-white hover:border-gray-300'
// //             }`}
// //           >
// //             <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
// //             <div className="text-xs text-gray-600 mt-1">Submitted</div>
// //           </button>

// //           <button
// //             onClick={() => setFilterStatus('area_review')}
// //             className={`p-4 rounded-lg border-2 transition-all text-left ${
// //               filterStatus === 'area_review'
// //                 ? 'border-yellow-600 bg-yellow-50 shadow-md'
// //                 : 'border-gray-200 bg-white hover:border-gray-300'
// //             }`}
// //           >
// //             <div className="text-2xl font-bold text-yellow-600">{stats.area_review}</div>
// //             <div className="text-xs text-gray-600 mt-1">Area Review</div>
// //           </button>

// //           <button
// //             onClick={() => setFilterStatus('regional_review')}
// //             className={`p-4 rounded-lg border-2 transition-all text-left ${
// //               filterStatus === 'regional_review'
// //                 ? 'border-purple-600 bg-purple-50 shadow-md'
// //                 : 'border-gray-200 bg-white hover:border-gray-300'
// //             }`}
// //           >
// //             <div className="text-2xl font-bold text-purple-600">{stats.regional_review}</div>
// //             <div className="text-xs text-gray-600 mt-1">Regional Review</div>
// //           </button>

// //           <button
// //             onClick={() => setFilterStatus('completed')}
// //             className={`p-4 rounded-lg border-2 transition-all text-left ${
// //               filterStatus === 'completed'
// //                 ? 'border-green-600 bg-green-50 shadow-md'
// //                 : 'border-gray-200 bg-white hover:border-gray-300'
// //             }`}
// //           >
// //             <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
// //             <div className="text-xs text-gray-600 mt-1">Completed</div>
// //           </button>

// //           <button
// //             onClick={() => setFilterStatus('rejected')}
// //             className={`p-4 rounded-lg border-2 transition-all text-left ${
// //               filterStatus === 'rejected'
// //                 ? 'border-red-600 bg-red-50 shadow-md'
// //                 : 'border-gray-200 bg-white hover:border-gray-300'
// //             }`}
// //           >
// //             <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
// //             <div className="text-xs text-gray-600 mt-1">Rejected</div>
// //           </button>
// //         </div>

// //         {/* Trip List */}
// //         <div className="space-y-4">
// //           {filteredTrips.length === 0 ? (
// //             <div className="text-center py-12 bg-white rounded-lg border">
// //               <p className="text-gray-500">No trips found</p>
// //             </div>
// //           ) : (
// //             filteredTrips.map(trip => (
// //               <div
// //                 key={trip.id}
// //                 className="flex items-center justify-between bg-card rounded-lg shadow-soft p-5 border hover:shadow-md transition-shadow"
// //               >
// //                 <div className="flex items-center gap-4">
// //                   <div className="bg-red-50 rounded-lg p-3">
// //                     <Plane className="h-6 w-6 text-red-600" />
// //                   </div>
// //                   <div>
// //                     <div className="font-bold text-lg text-foreground">{trip.destination}</div>
// //                     <div className="text-sm text-muted-foreground">{trip.purpose}</div>
// //                     <div className="text-xs text-muted-foreground mt-1">
// //                       <span className="font-medium">{trip.employee_name}</span> • {trip.start_date} - {trip.end_date}
// //                     </div>
// //                     <div className="text-xs text-muted-foreground">
// //                       Advance: {formatCurrency(trip.advance_amount)}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   {getStatusBadge(trip.status)}
// //                   <button
// //                     onClick={() => navigate(`/finance-area/trips/${trip.id}`)}
// //                     className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors"
// //                   >
// //                     View Details
// //                   </button>
// //                 </div>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { mockTrips } from '@/data/mockTrips';
// import { TripStatus } from '@/types/trips';
// import { Plane } from 'lucide-react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AdvanceRequestsContent from './AdvanceRequestsContent';

// export default function FinanceAreaDashboard() {
//   const [filterStatus, setFilterStatus] = useState<TripStatus | 'all'>('all');
//   const navigate = useNavigate();

//   const filteredTrips = filterStatus === 'all'
//     ? mockTrips
//     : mockTrips.filter(trip => trip.status === filterStatus);

//   // Count stats
//   const stats = {
//     all: mockTrips.length,
//     submitted: mockTrips.filter(t => t.status === 'submitted').length,
//     area_review: mockTrips.filter(t => t.status === 'area_review').length,
//     regional_review: mockTrips.filter(t => t.status === 'regional_review').length,
//     completed: mockTrips.filter(t => t.status === 'completed').length,
//     rejected: mockTrips.filter(t => t.status === 'rejected').length,
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusBadge = (status: TripStatus) => {
//     // ✅ FIX: Gunakan type yang lebih spesifik
//     const badges = {
//       draft: { label: 'Draft', color: 'bg-gray-100 text-gray-800' },
//       submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-800' },
//       area_review: { label: 'Area Review', color: 'bg-yellow-100 text-yellow-800' },
//       regional_review: { label: 'Regional Review', color: 'bg-purple-100 text-purple-800' },
//       completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
//       rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800' },
//       cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
//     } as const;
    
//     const badge = badges[status] || badges.draft;
//     return (
//       <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
//         {status === 'completed' && '✓'}
//         {status === 'rejected' && '✗'}
//         {status === 'submitted' && '⏱'}
//         {status === 'area_review' && '⏳'}
//         {status === 'regional_review' && '⏳'}
//         {badge.label}
//       </span>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <header className="bg-red-600 border-b shadow-soft">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img 
//               src="/logo-telkom-akses.png" 
//               alt="Telkom Akses" 
//               className="h-10 w-auto bg-white rounded px-2 py-1"
//             />
//             <div>
//               <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
//               <p className="text-sm text-white/90">Telkom Akses Business Trip Tracker</p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container max-w-7xl mx-auto px-4 py-8">
//         {/* Tabs untuk 2 tracking */}
//         <Tabs defaultValue="settlements" className="space-y-6">
//           <TabsList className="grid w-full max-w-md grid-cols-2">
//             <TabsTrigger value="settlements">Trip Settlements</TabsTrigger>
//             <TabsTrigger value="advances">Advance Requests</TabsTrigger>
//           </TabsList>

//           {/* Tab 1: Trip Settlements */}
//           <TabsContent value="settlements">
//             {/* Title Section */}
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-foreground mb-2">Trip Management</h2>
//               <p className="text-muted-foreground">Review and manage all business trip requests</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
//               <button
//                 onClick={() => setFilterStatus('all')}
//                 className={`p-4 rounded-lg border-2 transition-all text-left ${
//                   filterStatus === 'all'
//                     ? 'border-blue-600 bg-blue-50 shadow-md'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="text-2xl font-bold text-gray-900">{stats.all}</div>
//                 <div className="text-xs text-gray-600 mt-1">All Trips</div>
//               </button>

//               <button
//                 onClick={() => setFilterStatus('submitted')}
//                 className={`p-4 rounded-lg border-2 transition-all text-left ${
//                   filterStatus === 'submitted'
//                     ? 'border-blue-600 bg-blue-50 shadow-md'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="text-2xl font-bold text-blue-600">{stats.submitted}</div>
//                 <div className="text-xs text-gray-600 mt-1">Submitted</div>
//               </button>

//               <button
//                 onClick={() => setFilterStatus('area_review')}
//                 className={`p-4 rounded-lg border-2 transition-all text-left ${
//                   filterStatus === 'area_review'
//                     ? 'border-yellow-600 bg-yellow-50 shadow-md'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="text-2xl font-bold text-yellow-600">{stats.area_review}</div>
//                 <div className="text-xs text-gray-600 mt-1">Area Review</div>
//               </button>

//               <button
//                 onClick={() => setFilterStatus('regional_review')}
//                 className={`p-4 rounded-lg border-2 transition-all text-left ${
//                   filterStatus === 'regional_review'
//                     ? 'border-purple-600 bg-purple-50 shadow-md'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="text-2xl font-bold text-purple-600">{stats.regional_review}</div>
//                 <div className="text-xs text-gray-600 mt-1">Regional Review</div>
//               </button>

//               <button
//                 onClick={() => setFilterStatus('completed')}
//                 className={`p-4 rounded-lg border-2 transition-all text-left ${
//                   filterStatus === 'completed'
//                     ? 'border-green-600 bg-green-50 shadow-md'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
//                 <div className="text-xs text-gray-600 mt-1">Completed</div>
//               </button>

//               <button
//                 onClick={() => setFilterStatus('rejected')}
//                 className={`p-4 rounded-lg border-2 transition-all text-left ${
//                   filterStatus === 'rejected'
//                     ? 'border-red-600 bg-red-50 shadow-md'
//                     : 'border-gray-200 bg-white hover:border-gray-300'
//                 }`}
//               >
//                 <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
//                 <div className="text-xs text-gray-600 mt-1">Rejected</div>
//               </button>
//             </div>

//             {/* Trip List */}
//             <div className="space-y-4">
//               {filteredTrips.length === 0 ? (
//                 <div className="text-center py-12 bg-white rounded-lg border">
//                   <p className="text-gray-500">No trips found</p>
//                 </div>
//               ) : (
//                 filteredTrips.map(trip => (
//                   <div
//                     key={trip.id}
//                     className="flex items-center justify-between bg-card rounded-lg shadow-soft p-5 border hover:shadow-md transition-shadow"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="bg-red-50 rounded-lg p-3">
//                         <Plane className="h-6 w-6 text-red-600" />
//                       </div>
//                       <div>
//                         <div className="font-bold text-lg text-foreground">{trip.destination}</div>
//                         <div className="text-sm text-muted-foreground">{trip.purpose}</div>
//                         <div className="text-xs text-muted-foreground mt-1">
//                           <span className="font-medium">{trip.employee_name}</span> • {trip.start_date} - {trip.end_date}
//                         </div>
//                         <div className="text-xs text-muted-foreground">
//                           Advance: {formatCurrency(trip.advance_amount || 0)}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       {getStatusBadge(trip.status)}
//                       <button
//                         onClick={() => navigate(`/finance-area/trips/${trip.id}`)}
//                         className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors"
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           </TabsContent>

//           {/* Tab 2: Advance Requests */}
//           <TabsContent value="advances">
//             <AdvanceRequestsContent />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tripAPI } from '@/services/api'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plane, MapPin, Calendar, DollarSign, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import AdvanceRequestsContent from './AdvanceRequestsContent'

interface Trip {
  trip_id: number
  trip_number: string
  user_id: number
  destination: string
  purpose: string
  start_date: string
  end_date: string
  duration: number
  status: string
  total_advance: number
  total_expenses: number
  created_at: string
  // Computed fields dari backend
  employee_name?: string
}

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { icon: any; label: string; color: string }> = {
    active: { icon: Clock, label: 'Active', color: 'bg-blue-100 text-blue-800' },
    awaiting_review: { icon: Clock, label: 'Awaiting Review', color: 'bg-yellow-100 text-yellow-800' },
    under_review_area: { icon: AlertCircle, label: 'Under Review (Area)', color: 'bg-orange-100 text-orange-800' },
    under_review_regional: { icon: AlertCircle, label: 'Under Review (Regional)', color: 'bg-purple-100 text-purple-800' },
    completed: { icon: CheckCircle2, label: 'Completed', color: 'bg-green-100 text-green-800' },
    rejected: { icon: XCircle, label: 'Rejected', color: 'bg-red-100 text-red-800' },
    cancelled: { icon: XCircle, label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
  }

  const { icon: Icon, label, color } = statusMap[status] || statusMap.active

  return (
    <Badge className={`gap-1 ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </Badge>
  )
}

export default function FinanceAreaDashboard() {
  const navigate = useNavigate()
  
  const [trips, setTrips] = useState<Trip[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = async () => {
    try {
      setIsLoading(true)
      const response = await tripAPI.getAll()
      const allTrips = response.data.data || []
      
      // Filter hanya trip yang perlu review (awaiting_review, under_review_area, under_review_regional)
      const tripsToReview = allTrips.filter((t: Trip) => 
        ['awaiting_review', 'under_review_area', 'under_review_regional', 'completed'].includes(t.status)
      )
      
      setTrips(tripsToReview)
    } catch (error) {
      console.error('Failed to load trips:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredTrips = filterStatus === 'all' 
    ? trips 
    : trips.filter(t => t.status === filterStatus)

  const stats = {
    all: trips.length,
    awaiting_review: trips.filter(t => t.status === 'awaiting_review').length,
    under_review_area: trips.filter(t => t.status === 'under_review_area').length,
    under_review_regional: trips.filter(t => t.status === 'under_review_regional').length,
    completed: trips.filter(t => t.status === 'completed').length,
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

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
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div>
              <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
              <p className="text-sm text-white/90">Telkom Akses Business Trip Tracker</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="advances" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="advances">Advance Requests</TabsTrigger>
            <TabsTrigger value="settlements">Trip Settlements</TabsTrigger>
          </TabsList>

          {/* Tab 1: Advance Requests */}
          <TabsContent value="advances">
            <AdvanceRequestsContent />
          </TabsContent>

          {/* Tab 2: Trip Settlements */}
          <TabsContent value="settlements">
            {/* Title Section */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Trip Settlement Management</h2>
              <p className="text-muted-foreground">Review and approve trip settlements</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <Card 
                className={`cursor-pointer transition-all ${filterStatus === 'all' ? 'border-primary shadow-md' : ''}`}
                onClick={() => setFilterStatus('all')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">All Trips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.all}</div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${filterStatus === 'awaiting_review' ? 'border-yellow-600 shadow-md' : ''}`}
                onClick={() => setFilterStatus('awaiting_review')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{stats.awaiting_review}</div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${filterStatus === 'under_review_area' ? 'border-orange-600 shadow-md' : ''}`}
                onClick={() => setFilterStatus('under_review_area')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.under_review_area}</div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${filterStatus === 'under_review_regional' ? 'border-purple-600 shadow-md' : ''}`}
                onClick={() => setFilterStatus('under_review_regional')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Regional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">{stats.under_review_regional}</div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${filterStatus === 'completed' ? 'border-green-600 shadow-md' : ''}`}
                onClick={() => setFilterStatus('completed')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                </CardContent>
              </Card>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading trips...</p>
              </div>
            )}

            {/* Trip List */}
            {!isLoading && (
              <div className="space-y-4">
                {filteredTrips.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No trips found</p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredTrips.map(trip => (
                    <Card key={trip.trip_id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="bg-red-50 rounded-lg p-3">
                              <Plane className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-bold text-lg">{trip.destination}</h3>
                                  <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
                                </div>
                                {getStatusBadge(trip.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Employee</p>
                                    <p className="font-medium">{trip.employee_name || '-'}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Duration</p>
                                    <p className="font-medium">{trip.duration} days</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Advance</p>
                                    <p className="font-medium">{formatCurrency(trip.total_advance || 0)}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Expenses</p>
                                    <p className="font-medium">{formatCurrency(trip.total_expenses || 0)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Button
                            onClick={() => navigate(`/finance-area/trips/${trip.trip_id}`)}
                            className="ml-4"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}