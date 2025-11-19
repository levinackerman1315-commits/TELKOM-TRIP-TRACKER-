// // import { useNavigate } from 'react-router-dom';
// // import { mockTrips } from '@/data/mockTrips'; // Import mock data atau API

// // export default function MyTrips() {
// //   const navigate = useNavigate();

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('id-ID', {
// //       style: 'currency',
// //       currency: 'IDR',
// //       minimumFractionDigits: 0,
// //     }).format(amount);
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('id-ID', {
// //       day: 'numeric',
// //       month: 'long',
// //       year: 'numeric',
// //     });
// //   };

// //   const getStatusBadge = (status: string) => {
// //     switch (status) {
// //       case 'submitted':
// //         return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">Submitted</span>;
// //       case 'pending':
// //         return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Pending</span>;
// //       case 'approved':
// //         return <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Approved</span>;
// //       case 'completed':
// //         return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold">Completed</span>;
// //       case 'rejected':
// //         return <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">Rejected</span>;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <div className="max-w-5xl mx-auto px-4 py-8">
// //         <h1 className="text-2xl font-bold mb-2">My Trips</h1>
// //         <p className="text-gray-600 mb-6">View and manage your business trip requests</p>
// //         <div className="space-y-4">
// //           {mockTrips.length === 0 ? (
// //             <div className="text-center text-gray-500 py-8">No trips found</div>
// //           ) : (
// //             mockTrips.map(trip => (
// //               <div key={trip.id} className="flex items-center justify-between bg-white rounded-lg shadow p-5 border">
// //                 <div className="flex items-center gap-4">
// //                   <div className="bg-red-50 rounded-lg p-3">
// //                     <span role="img" aria-label="plane">✈️</span>
// //                   </div>
// //                   <div>
// //                     <div className="font-bold text-lg">{trip.destination}</div>
// //                     <div className="text-sm text-gray-600">{trip.purpose}</div>
// //                     <div className="text-xs text-gray-500">
// //                       {formatDate(trip.start_date)} - {formatDate(trip.end_date)} • Advance: {formatCurrency(trip.advance_amount)}
// //                     </div>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-center gap-3">
// //                   {getStatusBadge(trip.status)}
// //                   <button
// //                     onClick={() => navigate(`/employee/trips/${trip.id}`)}
// //                     className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium"
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

// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { 
//   ArrowLeft,
//   Search,
//   Plane,
//   MapPin,
//   Calendar,
//   DollarSign,
//   FileText,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Filter
// } from 'lucide-react'
// import { tripAPI } from '@/services/api'
// import { Trip } from '@/types'
// import { useAuth } from '@/contexts/AuthContext'

// const getStatusBadge = (status: string) => {
//   const statusMap: Record<string, { variant: any; icon: any; label: string; color: string }> = {
//     active: { variant: 'default', icon: CheckCircle2, label: 'Active', color: 'bg-success text-success-foreground' },
//     awaiting_review: { variant: 'secondary', icon: Clock, label: 'Awaiting Review', color: 'bg-warning text-warning-foreground' },
//     under_review_area: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Area)', color: 'bg-blue-100 text-blue-800' },
//     under_review_regional: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Regional)', color: 'bg-purple-100 text-purple-800' },
//     completed: { variant: 'outline', icon: CheckCircle2, label: 'Completed', color: 'bg-gray-100 text-gray-800' },
//     cancelled: { variant: 'destructive', icon: XCircle, label: 'Cancelled', color: 'bg-destructive text-destructive-foreground' },
//   }
  
//   const status_info = statusMap[status] || statusMap.active
//   const Icon = status_info.icon
  
//   return (
//     <Badge className={status_info.color}>
//       <Icon className="w-3 h-3 mr-1" />
//       {status_info.label}
//     </Badge>
//   )
// }

// export default function MyTrips() {
//   const { user } = useAuth()
//   const navigate = useNavigate()

//   const [trips, setTrips] = useState<Trip[]>([])
//   const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
//   const [searchQuery, setSearchQuery] = useState('')
//   const [activeTab, setActiveTab] = useState('all')
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     fetchTrips()
//   }, [])

//   useEffect(() => {
//     filterTrips()
//   }, [searchQuery, activeTab, trips])

//   const fetchTrips = async () => {
//     try {
//       setIsLoading(true)
//       const response = await tripAPI.getAll()
//       setTrips(response.data.data || [])
//     } catch (error) {
//       console.error('Failed to fetch trips:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const filterTrips = () => {
//     let filtered = [...trips]

//     // Filter by tab
//     if (activeTab !== 'all') {
//       filtered = filtered.filter(trip => trip.status === activeTab)
//     }

//     // Filter by search query
//     if (searchQuery) {
//       filtered = filtered.filter(trip =>
//         trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         trip.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         trip.trip_number.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     }

//     setFilteredTrips(filtered)
//   }

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount)
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     })
//   }

//   const stats = {
//     total: trips.length,
//     active: trips.filter(t => t.status === 'active').length,
//     awaiting_review: trips.filter(t => t.status === 'awaiting_review').length,
//     under_review: trips.filter(t => t.status.includes('review')).length,
//     completed: trips.filter(t => t.status === 'completed').length,
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading trips...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-primary border-b shadow-soft">
//         <div className="container mx-auto px-4 py-6">
//           <Link
//             to="/employee/dashboard"
//             className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Link>
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">My Trips</h1>
//               <p className="text-sm text-white/80">Manage all your business trips</p>
//             </div>
//             <Button
//               onClick={() => navigate('/employee/trips/new')}
//               variant="secondary"
//               disabled={stats.active > 0}
//             >
//               <Plane className="w-4 h-4 mr-2" />
//               New Trip
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.total}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-success">{stats.active}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-warning">{stats.awaiting_review}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Review</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">{stats.under_review}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{stats.completed}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Search and Filter */}
//         <Card className="mb-6 shadow-soft">
//           <CardContent className="pt-6">
//             <div className="flex items-center gap-4">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by destination, purpose, or trip number..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Trips List with Tabs */}
//         <Card className="shadow-soft">
//           <Tabs value={activeTab} onValueChange={setActiveTab}>
//             <CardHeader>
//               <TabsList className="grid w-full grid-cols-6">
//                 <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
//                 <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
//                 <TabsTrigger value="awaiting_review">Awaiting ({stats.awaiting_review})</TabsTrigger>
//                 <TabsTrigger value="under_review_area">Area</TabsTrigger>
//                 <TabsTrigger value="under_review_regional">Regional</TabsTrigger>
//                 <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
//               </TabsList>
//             </CardHeader>

//             <CardContent>
//               <TabsContent value={activeTab} className="space-y-4 mt-0">
//                 {filteredTrips.length === 0 ? (
//                   <div className="text-center py-12">
//                     <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold mb-2">No trips found</h3>
//                     <p className="text-muted-foreground mb-6">
//                       {searchQuery
//                         ? 'Try adjusting your search'
//                         : activeTab === 'all'
//                         ? "You haven't created any trips yet"
//                         : `No ${activeTab.replace('_', ' ')} trips`}
//                     </p>
//                     {activeTab === 'all' && !searchQuery && (
//                       <Button onClick={() => navigate('/employee/trips/new')}>
//                         <Plane className="w-4 h-4 mr-2" />
//                         Create Your First Trip
//                       </Button>
//                     )}
//                   </div>
//                 ) : (
//                   filteredTrips.map((trip) => (
//                     <Card key={trip.trip_id} className="border hover:shadow-md transition-shadow">
//                       <CardContent className="p-6">
//                         <div className="flex items-start justify-between mb-4">
//                           <div className="flex items-start gap-4 flex-1">
//                             <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
//                               <MapPin className="w-6 h-6 text-primary" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div>
//                                   <h3 className="font-semibold text-lg mb-1">{trip.destination}</h3>
//                                   <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
//                                 </div>
//                                 {getStatusBadge(trip.status)}
//                               </div>
//                               <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                              
//                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                                 <div className="flex items-center gap-2">
//                                   <Calendar className="w-4 h-4 text-muted-foreground" />
//                                   <div>
//                                     <p className="text-xs text-muted-foreground">Start Date</p>
//                                     <p className="font-medium">{formatDate(trip.start_date)}</p>
//                                   </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-2">
//                                   <Calendar className="w-4 h-4 text-muted-foreground" />
//                                   <div>
//                                     <p className="text-xs text-muted-foreground">End Date</p>
//                                     <p className="font-medium">{formatDate(trip.end_date)}</p>
//                                   </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-2">
//                                   <Clock className="w-4 h-4 text-muted-foreground" />
//                                   <div>
//                                     <p className="text-xs text-muted-foreground">Duration</p>
//                                     <p className="font-medium">{trip.duration} days</p>
//                                   </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-2">
//                                   <DollarSign className="w-4 h-4 text-muted-foreground" />
//                                   <div>
//                                     <p className="text-xs text-muted-foreground">Advance</p>
//                                     <p className="font-medium">{formatCurrency(trip.total_advance || 0)}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center justify-end gap-2 pt-4 border-t">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => navigate(`/employee/trips/${trip.trip_id}`)}
//                           >
//                             View Details →
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </TabsContent>
//             </CardContent>
//           </Tabs>
//         </Card>
//       </div>
//     </div>
//   )
// }


// src/pages/employee/MyTrips.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Plane, ArrowLeft, Search, Filter, Calendar, DollarSign, 
  Eye, Trash2, CheckCircle2, Clock, XCircle, AlertCircle,
  FileText, TrendingUp
} from 'lucide-react'
import { tripAPI } from '@/services/api'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Trip = {
  trip_id: number
  trip_number: string
  destination: string
  purpose: string
  start_date: string
  end_date: string
  extended_end_date?: string | null
  status: string
  estimated_budget: number | null
  duration: number
  calculated_distance?: number | null
}

export default function MyTrips() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState<Trip[]>([])
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; trip: Trip | null }>({
    open: false,
    trip: null
  })
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  useEffect(() => {
    loadTrips()
  }, [])

  useEffect(() => {
    filterTrips()
  }, [trips, searchQuery, statusFilter])

  const loadTrips = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await tripAPI.getAll()
      if (res.data.success) {
        setTrips(res.data.data)
      }
    } catch (err: any) {
      console.error('Load trips error:', err)
      setError(err.response?.data?.message || 'Failed to load trips')
    } finally {
      setLoading(false)
    }
  }

  const filterTrips = () => {
    let filtered = [...trips]

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(t => t.status === statusFilter)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.destination.toLowerCase().includes(query) ||
        t.trip_number.toLowerCase().includes(query) ||
        t.purpose.toLowerCase().includes(query)
      )
    }

    setFilteredTrips(filtered)
  }

  const handleDelete = async () => {
    if (!deleteDialog.trip) return

    try {
      setDeleting(true)
      setError(null)

      // ✅ Call DELETE API
      const res = await tripAPI.delete(deleteDialog.trip.trip_id)

      if (res.data.success) {
        setSuccessMsg(`Trip ${deleteDialog.trip.trip_number} deleted successfully`)
        
        // ✅ Remove from state
        setTrips(prev => prev.filter(t => t.trip_id !== deleteDialog.trip!.trip_id))
        
        // Auto-hide success message after 3s
        setTimeout(() => setSuccessMsg(null), 3000)
      }
    } catch (err: any) {
      console.error('Delete trip error:', err)
      setError(err.response?.data?.message || 'Failed to delete trip')
    } finally {
      setDeleting(false)
      setDeleteDialog({ open: false, trip: null })
    }
  }

  const openDeleteDialog = (trip: Trip) => {
    setDeleteDialog({ open: true, trip })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any; label: string; color: string }> = {
      active: { variant: "default", icon: Clock, label: "Active", color: "text-blue-600" },
      awaiting_review: { variant: "secondary", icon: AlertCircle, label: "Awaiting Review", color: "text-amber-600" },
      under_review_regional: { variant: "secondary", icon: Clock, label: "Under Review", color: "text-purple-600" },
      completed: { variant: "default", icon: CheckCircle2, label: "Completed", color: "text-green-600" },
      cancelled: { variant: "destructive", icon: XCircle, label: "Cancelled", color: "text-red-600" }
    }
    const config = variants[status] || variants.active
    const Icon = config.icon
    return (
      <Badge variant={config.variant as any} className="gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    )
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    })
  }

  const formatRupiah = (amount: number | null) => {
    if (!amount) return 'N/A'
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading trips...</p>
        </div>
      </div>
    )
  }

  const statuses = [
    { value: 'all', label: 'All Trips', count: trips.length },
    { value: 'active', label: 'Active', count: trips.filter(t => t.status === 'active').length },
    { value: 'awaiting_review', label: 'Awaiting Review', count: trips.filter(t => t.status === 'awaiting_review').length },
    { value: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length },
    { value: 'cancelled', label: 'Cancelled', count: trips.filter(t => t.status === 'cancelled').length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container mx-auto px-4 py-6">
          <Link to="/employee/dashboard" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">My Trips</h1>
              <p className="text-white/80">Manage all your business trips</p>
            </div>
            <Button onClick={() => navigate('/employee/trips/new')} size="lg">
              <Plane className="h-4 w-4 mr-2" />
              New Trip
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Success Message */}
        {successMsg && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">{successMsg}</AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Filters */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by destination, trip number, or purpose..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {statuses.map(s => (
                <Button
                  key={s.value}
                  variant={statusFilter === s.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(s.value)}
                >
                  {s.label} ({s.count})
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Trips List */}
        <div className="space-y-4">
          {filteredTrips.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Plane className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'No trips match your filters' 
                    : 'No trips yet. Create your first trip!'}
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Button onClick={() => navigate('/employee/trips/new')}>
                    <Plane className="h-4 w-4 mr-2" />
                    Create Trip
                  </Button>
                )}
              </CardContent>
            </Card>
          ) : (
            filteredTrips.map(trip => (
              <Card key={trip.trip_id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="flex items-center gap-2">
                        <Plane className="h-5 w-5" />
                        {trip.destination}
                        {getStatusBadge(trip.status)}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        {trip.trip_number}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{formatRupiah(trip.estimated_budget)}</div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {trip.purpose}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <div className="font-medium text-foreground">{formatDate(trip.start_date)}</div>
                        <div className="text-xs">Start Date</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <div>
                        <div className="font-medium text-foreground">
                          {formatDate(trip.extended_end_date || trip.end_date)}
                          {trip.extended_end_date && (
                            <Badge variant="secondary" className="ml-2 text-xs">Extended</Badge>
                          )}
                        </div>
                        <div className="text-xs">End Date</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <div>
                        <div className="font-medium text-foreground">{trip.duration} days</div>
                        <div className="text-xs">Duration</div>
                      </div>
                    </div>

                    {trip.calculated_distance && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <div>
                          <div className="font-medium text-foreground">{trip.calculated_distance} km</div>
                          <div className="text-xs">Distance</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/employee/trips/${trip.trip_id}`)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>

                    {/* ✅ DELETE BUTTON - Only for cancelled trips */}
                    {trip.status === 'cancelled' && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => openDeleteDialog(trip)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* ✅ DELETE CONFIRMATION DIALOG */}
      <AlertDialog open={deleteDialog.open} onOpenChange={(open) => !deleting && setDeleteDialog({ open, trip: null })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip?</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to permanently delete this trip?</p>
              {deleteDialog.trip && (
                <div className="p-3 bg-muted rounded-md text-sm mt-3">
                  <div className="font-semibold">{deleteDialog.trip.destination}</div>
                  <div className="text-muted-foreground">{deleteDialog.trip.trip_number}</div>
                  <div className="text-xs text-red-600 mt-2">⚠️ This action cannot be undone</div>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Deleting...' : 'Delete Trip'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}