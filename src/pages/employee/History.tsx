// import { useState, useEffect } from 'react';
// import { tripAPI } from '@/services/api';
// import { Trip } from '@/types';
// import { useAuth } from '@/contexts/AuthContext';
// import { Link } from 'react-router-dom';

// export default function History() {
//   const { user } = useAuth();
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [filter, setFilter] = useState<'all' | 'completed' | 'cancelled'>('all');

//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   const fetchTrips = async () => {
//     try {
//       setIsLoading(true);
//       const response = await tripAPI.getAll();
//       setTrips(response.data.data || []);
//     } catch (error) {
//       console.error('Failed to fetch trips:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Filter trips yang sudah selesai atau dibatalkan
//   const filteredTrips = trips.filter(trip => {
//     if (filter === 'all') {
//       return trip.status === 'completed' || trip.status === 'cancelled';
//     }
//     return trip.status === filter;
//   });

//   const getStatusBadge = (status: string) => {
//     const badges: Record<string, { color: string; text: string }> = {
//       completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
//       cancelled: { color: 'bg-red-100 text-red-800', text: 'Cancelled' },
//     };
//     const badge = badges[status] || { color: 'bg-gray-100 text-gray-800', text: status };
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}>
//         {badge.text}
//       </span>
//     );
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     });
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading history...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Trip History</h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 View your completed and cancelled trips
//               </p>
//             </div>
//             <Link
//               to="/employee/dashboard"
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//             >
//               ← Back to Dashboard
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Filter Tabs */}
//         <div className="bg-white rounded-lg shadow mb-6">
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               <button
//                 onClick={() => setFilter('all')}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
//                   filter === 'all'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 All ({filteredTrips.length})
//               </button>
//               <button
//                 onClick={() => setFilter('completed')}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
//                   filter === 'completed'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Completed ({trips.filter(t => t.status === 'completed').length})
//               </button>
//               <button
//                 onClick={() => setFilter('cancelled')}
//                 className={`px-6 py-4 text-sm font-medium border-b-2 transition ${
//                   filter === 'cancelled'
//                     ? 'border-blue-500 text-blue-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 Cancelled ({trips.filter(t => t.status === 'cancelled').length})
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Trips List */}
//         {filteredTrips.length === 0 ? (
//           <div className="bg-white rounded-lg shadow p-12 text-center">
//             <svg
//               className="mx-auto h-16 w-16 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//               />
//             </svg>
//             <h3 className="mt-4 text-lg font-medium text-gray-900">No trips found</h3>
//             <p className="mt-2 text-sm text-gray-500">
//               You don't have any {filter === 'all' ? 'completed or cancelled' : filter} trips yet.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredTrips.map((trip) => (
//               <div
//                 key={trip.trip_id}
//                 className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {trip.destination}
//                       </h3>
//                       {getStatusBadge(trip.status)}
//                     </div>
//                     <p className="text-sm text-gray-600 mb-4">{trip.purpose}</p>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//                       <div>
//                         <p className="text-xs text-gray-500">Trip Number</p>
//                         <p className="text-sm font-medium text-gray-900">{trip.trip_number}</p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Duration</p>
//                         <p className="text-sm font-medium text-gray-900">
//                           {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Total Days</p>
//                         <p className="text-sm font-medium text-gray-900">{trip.duration} days</p>
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
//                       <div>
//                         <p className="text-xs text-gray-500">Total Advance</p>
//                         <p className="text-sm font-semibold text-blue-600">
//                           {formatCurrency(trip.total_advance || 0)}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Total Expenses</p>
//                         <p className="text-sm font-semibold text-green-600">
//                           {formatCurrency(trip.total_expenses || 0)}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-gray-500">Balance</p>
//                         <p className={`text-sm font-semibold ${
//                           (trip.total_advance || 0) - (trip.total_expenses || 0) > 0
//                             ? 'text-orange-600'
//                             : 'text-purple-600'
//                         }`}>
//                           {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <Link
//                     to={`/employee/trips/${trip.trip_id}`}
//                     className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
//                   >
//                     View Details
//                   </Link>
//                 </div>

//                 {trip.completed_at && (
//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <p className="text-xs text-gray-500">
//                       Completed on {formatDate(trip.completed_at)}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft,
  Search,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  Download
} from 'lucide-react'
import { tripAPI } from '@/services/api'
import { Trip } from '@/types'

export default function History() {
  const navigate = useNavigate()

  const [trips, setTrips] = useState<Trip[]>([])
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCompletedTrips()
  }, [])

  useEffect(() => {
    filterTrips()
  }, [searchQuery, trips])

  const fetchCompletedTrips = async () => {
    try {
      setIsLoading(true)
      const response = await tripAPI.getAll()
      const allTrips = (response.data.data || []) as Trip[]
      const completedTrips = allTrips.filter((t) => t.status === 'completed')
      setTrips(completedTrips)
    } catch (error) {
      console.error('Failed to fetch completed trips:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterTrips = () => {
    if (searchQuery) {
      const filtered = trips.filter(trip =>
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.trip_number.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredTrips(filtered)
    } else {
      setFilteredTrips(trips)
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
      month: 'short',
      year: 'numeric'
    })
  }

  const calculateSettlement = (trip: Trip) => {
    const totalAdvance = trip.total_advance || 0
    const totalExpenses = trip.total_expenses || 0
    const balance = totalAdvance - totalExpenses
    
    return {
      advance: totalAdvance,
      expenses: totalExpenses,
      balance: balance,
      status: balance > 0 ? 'refund' : balance < 0 ? 'reimbursement' : 'settled'
    }
  }

  const totalStats = {
    trips: trips.length,
    totalAdvance: trips.reduce((sum, t) => sum + (t.total_advance || 0), 0),
    totalExpenses: trips.reduce((sum, t) => sum + (t.total_expenses || 0), 0),
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trip history...</p>
        </div>
      </div>
    )
  }

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
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Trip History</h1>
            <p className="text-sm text-white/80">View all completed business trips</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed Trips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStats.trips}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Total Advance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(totalStats.totalAdvance)}</div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Total Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{formatCurrency(totalStats.totalExpenses)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by destination, purpose, or trip number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Trips List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Completed Trips</CardTitle>
            <CardDescription>
              {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredTrips.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No completed trips</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery
                    ? 'No trips match your search criteria'
                    : "You haven't completed any trips yet"}
                </p>
                {!searchQuery && (
                  <Button onClick={() => navigate('/employee/trips')}>
                    View My Trips
                  </Button>
                )}
              </div>
            ) : (
              filteredTrips.map((trip) => {
                const settlement = calculateSettlement(trip)
                
                return (
                  <Card key={trip.trip_id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg mb-1">{trip.destination}</h3>
                                <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
                              </div>
                              <Badge variant="outline" className="gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Completed
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                            
                            {/* Trip Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Duration</p>
                                  <p className="font-medium">{trip.duration} days</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Completed</p>
                                  <p className="font-medium">{trip.completed_at ? formatDate(trip.completed_at) : '-'}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Advance</p>
                                  <p className="font-medium text-primary">{formatCurrency(settlement.advance)}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <TrendingDown className="w-4 h-4 text-success" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Expenses</p>
                                  <p className="font-medium text-success">{formatCurrency(settlement.expenses)}</p>
                                </div>
                              </div>
                            </div>

                            {/* Settlement Info */}
                            <Card className={`
                              ${settlement.status === 'refund' ? 'bg-warning/10 border-warning/30' : ''}
                              ${settlement.status === 'reimbursement' ? 'bg-purple-50 border-purple-200' : ''}
                              ${settlement.status === 'settled' ? 'bg-success/10 border-success/30' : ''}
                            `}>
                              <CardContent className="p-3">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Settlement Status</p>
                                    <p className="font-semibold">
                                      {settlement.status === 'refund' && (
                                        <span className="text-warning">Refund Required: {formatCurrency(Math.abs(settlement.balance))}</span>
                                      )}
                                      {settlement.status === 'reimbursement' && (
                                        <span className="text-purple-600">Reimbursement: {formatCurrency(Math.abs(settlement.balance))}</span>
                                      )}
                                      {settlement.status === 'settled' && (
                                        <span className="text-success">Fully Settled</span>
                                      )}
                                    </p>
                                  </div>
                                  {settlement.status !== 'settled' && (
                                    <Badge variant={settlement.status === 'refund' ? 'default' : 'secondary'}>
                                      {settlement.status === 'refund' ? 'Action Required' : 'Processing'}
                                    </Badge>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-end gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/employee/trips/${trip.trip_id}`)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        {/* Optional: Add export/download report button */}
                        {/* <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download Report
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}