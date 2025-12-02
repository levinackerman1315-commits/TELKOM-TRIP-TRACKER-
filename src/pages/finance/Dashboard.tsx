
// // src/pages/finance-regional/Dashboard.tsx
// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { 
//   CheckCircle2,
//   Clock,
//   FileText,
//   User,
//   MapPin,
//   Calendar,
//   Eye,
//   LogOut,
//   TrendingUp,
//   Bell,
//   Settings
// } from "lucide-react"
// import { useAuth } from '@/contexts/AuthContext'
// import { tripAPI, notificationAPI } from '@/services/api'  // ✅ ADD notificationAPI!

// interface Trip {
//   trip_id: number
//   trip_number: string
//   destination: string
//   purpose: string
//   start_date: string
//   end_date: string
//   status: string
//   total_advance: number
//   total_expenses: number
//   user: {
//     name: string
//     department: string
//     position: string
//   }
// }

// export default function FinanceRegionalDashboard() {
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()
//   const [trips, setTrips] = useState<Trip[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [unreadNotifications, setUnreadNotifications] = useState(0)  // ✅ ADD THIS!

//   useEffect(() => {
//     loadTrips()
//     loadNotifications()  // ✅ ADD THIS!
//   }, [])

//   const loadTrips = async () => {
//     try {
//       setIsLoading(true)
//       const response = await tripAPI.getAll()
//       setTrips(response.data.data || [])
//     } catch (error) {
//       console.error('Failed to load trips:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   // ✅ ADD THIS FUNCTION!
//   const loadNotifications = async () => {
//     try {
//       const response = await notificationAPI.getUnreadCount()
//       setUnreadNotifications(response.data.data.unread_count || 0)
//     } catch (error) {
//       console.log('Notifications not available')
//     }
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

//   const pendingTrips = trips.filter(t => t.status === 'under_review_regional')
//   const completedTrips = trips.filter(t => t.status === 'completed')
//   const allReviewTrips = trips.filter(t => 
//     ['under_review_regional', 'completed'].includes(t.status)
//   )

//   const stats = {
//     pendingReview: pendingTrips.length,
//     completedToday: completedTrips.filter(t => {
//       const today = new Date().toDateString()
//       return new Date(t.start_date).toDateString() === today
//     }).length,
//     totalReviewed: allReviewTrips.length,
//     totalSettlements: completedTrips.length,
//   }

//   const getStatusBadge = (status: string) => {
//     const statusConfig: Record<string, { variant: any; label: string; className: string }> = {
//       under_review_regional: { 
//         variant: 'secondary', 
//         label: 'Under Review', 
//         className: 'bg-orange-100 text-orange-800 border-orange-200' 
//       },
//       completed: { 
//         variant: 'outline', 
//         label: 'Completed', 
//         className: 'bg-green-100 text-green-800 border-green-200' 
//       },
//     }
    
//     const config = statusConfig[status] || statusConfig.under_review_regional
    
//     return (
//       <Badge variant={config.variant} className={config.className}>
//         {config.label}
//       </Badge>
//     )
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ✅ UPDATED HEADER WITH NOTIFICATION BELL */}
//       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <img 
//               src="/logo-telkom-akses.png" 
//               alt="Telkom Logo" 
//               className="h-10 w-auto"
//             />
//             <div>
//               <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
//               <p className="text-sm text-white/90">Settlement Final Review & Approval</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {/* ✅ NOTIFICATION BELL - NEW! */}
//             <Link to="/finance-regional/notifications" className="relative">
//               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
//                 <Bell className="w-5 h-5" />
//               </Button>
//               {unreadNotifications > 0 && (
//                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-yellow-500 rounded-full">
//                   {unreadNotifications}
//                 </span>
//               )}
//             </Link>

//                   {/* ✅ TAMBAH SETTINGS BUTTON */}
//             <Link to="/finance-regional/profile">
//               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
//                 <User className="w-5 h-5" />
//               </Button>
//             </Link>


//             <div className="text-right">
//               <p className="text-sm font-medium text-white">{user?.name}</p>
//               <p className="text-xs text-white/70 uppercase">{user?.role?.replace('_', ' ')}</p>
//             </div>
//             <Button 
//               variant="secondary" 
//               size="sm"
//               onClick={() => {
//                 logout()
//                 navigate('/login')
//               }}
//               className="bg-white text-red-600 hover:bg-red-50"
//             >
//               <LogOut className="h-4 w-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                 <Clock className="h-4 w-4" />
//                 Pending Review
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-orange-600">{stats.pendingReview}</div>
//               <p className="text-xs text-gray-500 mt-1">Awaiting final approval</p>
//             </CardContent>
//           </Card>
          
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                 <CheckCircle2 className="h-4 w-4" />
//                 Completed Today
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
//               <p className="text-xs text-gray-500 mt-1">Settlements approved</p>
//             </CardContent>
//           </Card>
          
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                 <TrendingUp className="h-4 w-4" />
//                 Total Reviewed
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-blue-600">{stats.totalReviewed}</div>
//               <p className="text-xs text-gray-500 mt-1">All settlements</p>
//             </CardContent>
//           </Card>
          
//           <Card className="shadow-sm hover:shadow-md transition-shadow">
//             <CardHeader className="pb-3">
//               <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
//                 <FileText className="h-4 w-4" />
//                 Total Completed
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-purple-600">{stats.totalSettlements}</div>
//               <p className="text-xs text-gray-500 mt-1">All time</p>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Main Content */}
//         <Card className="shadow-sm">
//           <CardHeader className="border-b">
//             <CardTitle>Settlement Reviews</CardTitle>
//             <CardDescription>Final review and approval of trip settlements (after Finance Area approval)</CardDescription>
//           </CardHeader>
//           <CardContent className="pt-6">
//             <Tabs defaultValue="pending">
//               <TabsList className="grid w-full grid-cols-3 mb-6">
//                 <TabsTrigger value="pending" className="flex items-center gap-2">
//                   <Clock className="w-4 h-4" />
//                   Pending ({pendingTrips.length})
//                 </TabsTrigger>
//                 <TabsTrigger value="completed" className="flex items-center gap-2">
//                   <CheckCircle2 className="w-4 h-4" />
//                   Completed ({completedTrips.length})
//                 </TabsTrigger>
//                 <TabsTrigger value="all" className="flex items-center gap-2">
//                   <FileText className="w-4 h-4" />
//                   All ({allReviewTrips.length})
//                 </TabsTrigger>
//               </TabsList>

//               {/* Pending Tab */}
//               <TabsContent value="pending" className="space-y-4">
//                 {pendingTrips.length === 0 ? (
//                   <div className="text-center py-12">
//                     <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                     <p className="text-gray-500 font-medium">No settlements pending review</p>
//                     <p className="text-sm text-gray-400 mt-1">Settlements will appear here after Finance Area approval</p>
//                   </div>
//                 ) : (
//                   pendingTrips.map((trip) => (
//                     <div 
//                       key={trip.trip_id}
//                       className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-start gap-4 flex-1">
//                           <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
//                             <Clock className="w-6 h-6 text-orange-600" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h3 className="font-semibold text-lg">{trip.trip_number}</h3>
//                               {getStatusBadge(trip.status)}
//                             </div>
//                             <p className="text-sm text-gray-600 mb-3">
//                               <User className="inline h-3 w-3 mr-1" />
//                               {trip.user.name} • {trip.user.department}
//                             </p>
                            
//                             <div className="grid grid-cols-2 gap-3 text-sm">
//                               <div className="flex items-center gap-2">
//                                 <MapPin className="h-4 w-4 text-gray-400" />
//                                 <span className="font-medium">{trip.destination}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <Calendar className="h-4 w-4 text-gray-400" />
//                                 <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
//                               </div>
//                             </div>
                            
//                             <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-3 text-sm">
//                               <div>
//                                 <span className="text-gray-500">Advance: </span>
//                                 <span className="font-semibold text-red-600">{formatCurrency(trip.total_advance)}</span>
//                               </div>
//                               <div>
//                                 <span className="text-gray-500">Expenses: </span>
//                                 <span className="font-semibold text-green-600">{formatCurrency(trip.total_expenses)}</span>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex gap-2 justify-end pt-3 border-t">
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
//                         >
//                           <Eye className="w-4 h-4 mr-2" />
//                           Review Settlement
//                         </Button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </TabsContent>

//               {/* Completed Tab */}
//               <TabsContent value="completed" className="space-y-4">
//                 {completedTrips.length === 0 ? (
//                   <div className="text-center py-12">
//                     <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                     <p className="text-gray-500">No completed settlements yet</p>
//                   </div>
//                 ) : (
//                   completedTrips.map((trip) => (
//                     <div 
//                       key={trip.trip_id}
//                       className="p-4 rounded-lg border bg-white"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-start gap-4 flex-1">
//                           <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
//                             <CheckCircle2 className="w-6 h-6 text-green-600" />
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h3 className="font-semibold text-lg">{trip.trip_number}</h3>
//                               {getStatusBadge(trip.status)}
//                             </div>
//                             <p className="text-sm text-gray-600 mb-2">
//                               {trip.user.name} • {trip.destination}
//                             </p>
//                             <div className="flex items-center gap-4 text-sm text-gray-500">
//                               <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
//                               <span>•</span>
//                               <span>Advance: {formatCurrency(trip.total_advance)}</span>
//                               <span>•</span>
//                               <span>Expenses: {formatCurrency(trip.total_expenses)}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
//                         >
//                           <Eye className="w-4 h-4 mr-2" />
//                           View Details
//                         </Button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </TabsContent>

//               {/* All Tab */}
//               <TabsContent value="all" className="space-y-4">
//                 {allReviewTrips.length === 0 ? (
//                   <div className="text-center py-12">
//                     <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
//                     <p className="text-gray-500">No settlements to review yet</p>
//                   </div>
//                 ) : (
//                   allReviewTrips.map((trip) => (
//                     <div 
//                       key={trip.trip_id}
//                       className="p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="flex items-start gap-4 flex-1">
//                           <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
//                             trip.status === 'completed' 
//                               ? 'bg-green-100' 
//                               : 'bg-orange-100'
//                           }`}>
//                             {trip.status === 'completed' ? (
//                               <CheckCircle2 className="w-6 h-6 text-green-600" />
//                             ) : (
//                               <Clock className="w-6 h-6 text-orange-600" />
//                             )}
//                           </div>
//                           <div className="flex-1">
//                             <div className="flex items-center gap-2 mb-1">
//                               <h3 className="font-semibold">{trip.trip_number}</h3>
//                               {getStatusBadge(trip.status)}
//                             </div>
//                             <p className="text-sm text-gray-600 mb-2">
//                               {trip.user.name} • {trip.destination}
//                             </p>
//                             <div className="flex items-center gap-4 text-sm text-gray-500">
//                               <span>{formatDate(trip.start_date)}</span>
//                               <span>•</span>
//                               <span>Advance: {formatCurrency(trip.total_advance)}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <Button 
//                           variant="outline" 
//                           size="sm"
//                           onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
//                         >
//                           <Eye className="w-4 h-4 mr-2" />
//                           View
//                         </Button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }




// src/pages/finance-regional/Dashboard.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  CheckCircle2,
  Clock,
  FileText,
  User,
  MapPin,
  Calendar,
  Eye,
  LogOut,
  TrendingUp,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import { tripAPI, notificationAPI } from '@/services/api'

interface Trip {
  trip_id: number
  trip_number: string
  destination: string
  purpose: string
  start_date: string
  end_date: string
  status: string
  total_advance: number
  total_expenses: number
  user: {
    name: string
    department: string
    position: string
  }
}

export default function FinanceRegionalDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [trips, setTrips] = useState<Trip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  // ✅ Filter & Pagination States for "All" Tab
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('30')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    loadTrips()
    loadNotifications()
  }, [])

  const loadTrips = async () => {
    try {
      setIsLoading(true)
      const response = await tripAPI.getAll()
      setTrips(response.data.data || [])
    } catch (error) {
      console.error('Failed to load trips:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadNotifications = async () => {
    try {
      const response = await notificationAPI.getUnreadCount()
      setUnreadNotifications(response.data.data.unread_count || 0)
    } catch (error) {
      console.log('Notifications not available')
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

  // ✅ Filter Logic for "All" Tab
  const getFilteredTrips = () => {
    let filtered = allReviewTrips

    // Date Filter
    if (dateFilter !== 'all') {
      const days = parseInt(dateFilter)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      
      filtered = filtered.filter(trip => {
        const tripDate = new Date(trip.start_date)
        return tripDate >= cutoffDate
      })
    }

    // Status Filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(trip => trip.status === statusFilter)
    }

    // Search Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(trip =>
        trip.trip_number.toLowerCase().includes(query) ||
        trip.user.name.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.user.department.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  // ✅ Pagination Logic
  const getPaginatedTrips = (trips: Trip[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return trips.slice(startIndex, endIndex)
  }

  const pendingTrips = trips.filter(t => t.status === 'under_review_regional')
  const completedTrips = trips.filter(t => t.status === 'completed')
  const allReviewTrips = trips.filter(t => 
    ['under_review_regional', 'completed'].includes(t.status)
  )

  const filteredTrips = getFilteredTrips()
  const paginatedTrips = getPaginatedTrips(filteredTrips)
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage)

  const stats = {
    pendingReview: pendingTrips.length,
    completedToday: completedTrips.filter(t => {
      const today = new Date().toDateString()
      return new Date(t.start_date).toDateString() === today
    }).length,
    totalReviewed: allReviewTrips.length,
    totalSettlements: completedTrips.length,
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { variant: any; label: string; className: string }> = {
      under_review_regional: { 
        variant: 'secondary', 
        label: 'Under Review', 
        className: 'bg-orange-100 text-orange-800 border-orange-200' 
      },
      completed: { 
        variant: 'outline', 
        label: 'Completed', 
        className: 'bg-green-100 text-green-800 border-green-200' 
      },
    }
    
    const config = statusConfig[status] || statusConfig.under_review_regional
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    )
  }

  // ✅ Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, statusFilter, dateFilter])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-telkom-akses.png" 
              alt="Telkom Logo" 
              className="h-10 w-auto bg-white rounded px-2 py-1"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div>
              <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
              <p className="text-sm text-white/90">Settlement Final Review & Approval</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <Link to="/finance-regional/notifications" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Bell className="w-5 h-5" />
              </Button>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-yellow-500 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </Link>

            {/* Profile Button */}
            <Link to="/finance-regional/profile">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/70 uppercase">{user?.role?.replace('_', ' ')}</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="bg-white text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingReview}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting final approval</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Completed Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
              <p className="text-xs text-gray-500 mt-1">Settlements approved</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Total Reviewed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.totalReviewed}</div>
              <p className="text-xs text-gray-500 mt-1">All settlements</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Total Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.totalSettlements}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-sm">
          <CardHeader className="border-b">
            <CardTitle>Settlement Reviews</CardTitle>
            <CardDescription>Final review and approval of trip settlements (after Finance Area approval)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="pending">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="pending" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Pending ({pendingTrips.length})
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Completed ({completedTrips.length})
                </TabsTrigger>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  All ({allReviewTrips.length})
                </TabsTrigger>
              </TabsList>

              {/* Pending Tab */}
              <TabsContent value="pending" className="space-y-4">
                {pendingTrips.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No settlements pending review</p>
                    <p className="text-sm text-gray-400 mt-1">Settlements will appear here after Finance Area approval</p>
                  </div>
                ) : (
                  pendingTrips.map((trip) => (
                    <div 
                      key={trip.trip_id}
                      className="p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{trip.trip_number}</h3>
                              {getStatusBadge(trip.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                              <User className="inline h-3 w-3 mr-1" />
                              {trip.user.name} • {trip.user.department}
                            </p>
                            
                            <div className="grid grid-cols-2 gap-3 text-sm">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">{trip.destination}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">Advance: </span>
                                <span className="font-semibold text-red-600">{formatCurrency(trip.total_advance)}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Expenses: </span>
                                <span className="font-semibold text-green-600">{formatCurrency(trip.total_expenses)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 justify-end pt-3 border-t">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Review Settlement
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              {/* Completed Tab */}
              <TabsContent value="completed" className="space-y-4">
                {completedTrips.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No completed settlements yet</p>
                  </div>
                ) : (
                  completedTrips.map((trip) => (
                    <div 
                      key={trip.trip_id}
                      className="p-4 rounded-lg border bg-white"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{trip.trip_number}</h3>
                              {getStatusBadge(trip.status)}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {trip.user.name} • {trip.destination}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
                              <span>•</span>
                              <span>Advance: {formatCurrency(trip.total_advance)}</span>
                              <span>•</span>
                              <span>Expenses: {formatCurrency(trip.total_expenses)}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              {/* ✅ All Tab - WITH FILTERS & PAGINATION */}
              <TabsContent value="all" className="space-y-4">
                {/* Filter Controls */}
                <Card className="bg-gray-50 border-gray-200">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search trip, employee, destination..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>

                      {/* Status Filter */}
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="under_review_regional">Pending Review</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Date Filter */}
                      <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Filter by date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">Last 7 days</SelectItem>
                          <SelectItem value="30">Last 30 days</SelectItem>
                          <SelectItem value="90">Last 3 months</SelectItem>
                          <SelectItem value="all">All time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Active Filters Info */}
                    {(searchQuery || statusFilter !== 'all' || dateFilter !== '30') && (
                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                        <span className="font-medium">Active filters:</span>
                        {searchQuery && (
                          <Badge variant="secondary" className="gap-1">
                            Search: "{searchQuery}"
                          </Badge>
                        )}
                        {statusFilter !== 'all' && (
                          <Badge variant="secondary">
                            {statusFilter === 'under_review_regional' ? 'Pending' : 'Completed'}
                          </Badge>
                        )}
                        {dateFilter !== '30' && (
                          <Badge variant="secondary">
                            {dateFilter === 'all' ? 'All time' : `Last ${dateFilter} days`}
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSearchQuery('')
                            setStatusFilter('all')
                            setDateFilter('30')
                          }}
                          className="text-xs"
                        >
                          Clear all
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Results Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <p>
                    Showing {filteredTrips.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(currentPage * itemsPerPage, filteredTrips.length)} of {filteredTrips.length} settlements
                  </p>
                  {filteredTrips.length > itemsPerPage && (
                    <p className="text-xs">
                      Page {currentPage} of {totalPages}
                    </p>
                  )}
                </div>

                {/* Trip List */}
                {filteredTrips.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No settlements found</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {searchQuery || statusFilter !== 'all' || dateFilter !== '30'
                        ? 'Try adjusting your filters'
                        : 'Settlements will appear here after Finance Area approval'
                      }
                    </p>
                  </div>
                ) : (
                  <>
                    {paginatedTrips.map((trip) => (
                      <div 
                        key={trip.trip_id}
                        className="p-4 rounded-lg border bg-white hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              trip.status === 'completed' 
                                ? 'bg-green-100' 
                                : 'bg-orange-100'
                            }`}>
                              {trip.status === 'completed' ? (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              ) : (
                                <Clock className="w-6 h-6 text-orange-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{trip.trip_number}</h3>
                                {getStatusBadge(trip.status)}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {trip.user.name} • {trip.user.department} • {trip.destination}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{formatDate(trip.start_date)}</span>
                                <span>•</span>
                                <span>Advance: {formatCurrency(trip.total_advance)}</span>
                                <span>•</span>
                                <span>Expenses: {formatCurrency(trip.total_expenses)}</span>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    ))}

                    {/* ✅ Pagination Controls */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-between pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>

                        <div className="flex items-center gap-2">
                          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            let pageNum
                            if (totalPages <= 5) {
                              pageNum = i + 1
                            } else if (currentPage <= 3) {
                              pageNum = i + 1
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i
                            } else {
                              pageNum = currentPage - 2 + i
                            }

                            return (
                              <Button
                                key={pageNum}
                                variant={currentPage === pageNum ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className="w-10"
                              >
                                {pageNum}
                              </Button>
                            )
                          })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="gap-1"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}