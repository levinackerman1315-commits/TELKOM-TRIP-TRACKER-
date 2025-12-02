
// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { tripAPI, notificationAPI } from '@/services/api'
// import { useAuth } from '@/contexts/AuthContext'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { 
//   Plane, 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   Clock, 
//   CheckCircle2, 
//   XCircle, 
//   AlertCircle, 
//   LogOut, 
//   Bell,
//   Settings,
//   User,
//   TrendingUp,
//   Receipt as ReceiptIcon,
//   AlertTriangle,
//   Filter
// } from 'lucide-react'
// import AdvanceRequestsContent from './AdvanceRequestsContent'

// interface User {
//   user_id: number
//   name: string
//   email: string
//   nik: string
//   department: string
//   position: string
// }

// interface Trip {
//   trip_id: number
//   trip_number: string
//   user_id: number
//   destination: string
//   purpose: string
//   start_date: string
//   end_date: string
//   extended_end_date?: string
//   extension_reason?: string
//   duration: number
//   status: string
//   estimated_budget: number
//   total_advance: number
//   total_expenses: number
//   created_at: string
//   user?: User
// }

// export default function FinanceAreaDashboard() {
//   const navigate = useNavigate()
//   const { user, logout } = useAuth()
  
//   const [trips, setTrips] = useState<Trip[]>([])
//   const [activeTrips, setActiveTrips] = useState<Trip[]>([])
//   const [allTrips, setAllTrips] = useState<Trip[]>([])
//   const [filterStatus, setFilterStatus] = useState<string>('all')
//   const [isLoading, setIsLoading] = useState(true)
//   const [unreadNotifications, setUnreadNotifications] = useState(0)
  
//   // Filter states for Ongoing Trips
//   const [ongoingFilter, setOngoingFilter] = useState<string>('all')
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     loadTrips()
//     loadNotifications()
//   }, [])

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(amount)
//   }

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric'
//     })
//   }

//   // ✅ PINDAHKAN isTripEndingSoon KE SINI (sebelum digunakan)
//   const isTripEndingSoon = (endDate: string, extendedEndDate?: string) => {
//     const end = new Date(extendedEndDate || endDate)
//     const today = new Date()
//     const diffTime = end.getTime() - today.getTime()
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//     return diffDays >= 0 && diffDays <= 2
//   }

//   // Get budget status
//   const getBudgetStatus = (estimated: number, expenses: number) => {
//     if (expenses === 0) return { label: 'No Expenses', color: 'text-gray-600', icon: ReceiptIcon }
    
//     const percentage = (expenses / estimated) * 100
    
//     if (percentage > 100) {
//       return { label: 'Over Budget', color: 'text-red-600', icon: AlertTriangle }
//     } else if (percentage > 80) {
//       return { label: 'Near Limit', color: 'text-orange-600', icon: AlertCircle }
//     } else {
//       return { label: 'On Track', color: 'text-green-600', icon: CheckCircle2 }
//     }
//   }

//   const getStatusBadge = (status: string) => {
//     const statusMap: Record<string, { icon: any; label: string; color: string }> = {
//       active: { icon: Clock, label: 'Active', color: 'bg-blue-100 text-blue-800' },
//       awaiting_review: { icon: Clock, label: 'Awaiting Review', color: 'bg-yellow-100 text-yellow-800' },
//       under_review_regional: { icon: AlertCircle, label: 'Under Review (Regional)', color: 'bg-orange-100 text-orange-800' },
//       completed: { icon: CheckCircle2, label: 'Completed', color: 'bg-green-100 text-green-800' },
//       rejected: { icon: XCircle, label: 'Rejected', color: 'bg-red-100 text-red-800' },
//       cancelled: { icon: XCircle, label: 'Cancelled', color: 'bg-gray-100 text-gray-800' },
//     }

//     const { icon: Icon, label, color } = statusMap[status] || statusMap.active

//     return (
//       <Badge className={`gap-1 ${color}`}>
//         <Icon className="w-3 h-3" />
//         {label}
//       </Badge>
//     )
//   }

//   const loadTrips = async () => {
//     try {
//       setIsLoading(true)
//       const response = await tripAPI.getAll()
//       const fetchedTrips = response.data.data || []
      
//       setAllTrips(fetchedTrips)
      
//       // For settlements tab
//       const tripsToReview = fetchedTrips.filter((t: Trip) => 
//         ['awaiting_review', 'under_review_regional', 'completed'].includes(t.status)
//       )
//       setTrips(tripsToReview)
      
//       // For ongoing trips tab
//       const ongoingTrips = fetchedTrips.filter((t: Trip) => t.status === 'active')
//       setActiveTrips(ongoingTrips)
//     } catch (error) {
//       console.error('Failed to load trips:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const loadNotifications = async () => {
//     try {
//       const response = await notificationAPI.getUnreadCount()
//       setUnreadNotifications(response.data.data.unread_count || 0)
//     } catch (error) {
//       console.log('Notifications not available')
//     }
//   }

//   const filteredTrips = filterStatus === 'all' 
//     ? trips 
//     : trips.filter(t => t.status === filterStatus)

//   // Filter for Ongoing Trips
//   const filteredOngoingTrips = activeTrips.filter(trip => {
//     // Search filter
//     const matchesSearch = searchQuery === '' || 
//       trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trip.trip_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trip.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       trip.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    
//     // Status filter
//     const matchesFilter = ongoingFilter === 'all' || 
//       (ongoingFilter === 'ending_soon' && isTripEndingSoon(trip.end_date, trip.extended_end_date)) ||
//       (ongoingFilter === 'over_budget' && trip.total_expenses > trip.estimated_budget) ||
//       (ongoingFilter === 'no_advance' && trip.total_advance === 0) ||
//       (ongoingFilter === 'extended' && trip.extended_end_date)
    
//     return matchesSearch && matchesFilter
//   })

//   const stats = {
//     all: trips.length,
//     awaiting_review: trips.filter(t => t.status === 'awaiting_review').length,
//     under_review_regional: trips.filter(t => t.status === 'under_review_regional').length,
//     completed: trips.filter(t => t.status === 'completed').length,
//   }

//   // Stats for Ongoing Trips
//   const ongoingStats = {
//     totalActive: activeTrips.length,
//     totalEstimated: activeTrips.reduce((sum, t) => sum + (Number(t.estimated_budget) || 0), 0),
//     totalAdvanced: activeTrips.reduce((sum, t) => sum + (Number(t.total_advance) || 0), 0),
//     totalExpenses: activeTrips.reduce((sum, t) => sum + (Number(t.total_expenses) || 0), 0),
//     endingSoon: activeTrips.filter(t => isTripEndingSoon(t.end_date, t.extended_end_date)).length,
//     overBudget: activeTrips.filter(t => t.total_expenses > t.estimated_budget).length,
//     noAdvance: activeTrips.filter(t => t.total_advance === 0).length,
//     extended: activeTrips.filter(t => t.extended_end_date).length,
//   }

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
//               onError={(e) => { e.currentTarget.style.display = 'none' }}
//             />
//             <div>
//               <h1 className="text-xl font-bold text-white">Finance Area Portal</h1>
//               <p className="text-sm text-white/90">Telkom Akses Business Trip Tracker</p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3">
//             {/* Notification Bell */}
//             <Link to="/finance-area/notifications" className="relative">
//               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Notifications">
//                 <Bell className="w-5 h-5" />
//               </Button>
//               {unreadNotifications > 0 && (
//                 <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
//                   {unreadNotifications}
//                 </span>
//               )}
//             </Link>

//             {/* Profile Settings */}
//             <Link to="/finance-area/profile">
//               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
//                 <User className="w-5 h-5" />
//               </Button>
//             </Link>

//             {/* Finance Settings */}
//             <Link to="/finance-area/settings">
//               <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Finance Settings">
//                 <Settings className="w-5 h-5" />
//               </Button>
//             </Link>

//             {/* User Info & Logout */}
//             <div className="text-right">
//               <p className="text-sm font-medium text-white">{user?.name}</p>
//               <p className="text-xs text-white/70">{user?.role?.replace('_', ' ').toUpperCase()}</p>
//             </div>
//             <Button 
//               variant="secondary" 
//               size="sm"
//               onClick={() => {
//                 logout()
//                 navigate('/login')
//               }}
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container max-w-7xl mx-auto px-4 py-8">
//         <Tabs defaultValue="advances" className="space-y-6">
//           <TabsList className="grid w-full max-w-2xl grid-cols-3">
//             <TabsTrigger value="advances">Advance Requests</TabsTrigger>
//             <TabsTrigger value="ongoing">Ongoing Trips</TabsTrigger>  
//             <TabsTrigger value="settlements">Trip Settlements</TabsTrigger>
//           </TabsList>

//           {/* Tab 1: Advance Requests */}
//           <TabsContent value="advances">
//             <AdvanceRequestsContent />
//           </TabsContent>

//           {/* Tab 2: Ongoing Trips */}
//           <TabsContent value="ongoing">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-foreground mb-2">Ongoing Trips</h2>
//               <p className="text-muted-foreground">Monitor active trips and their budgets in real-time</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//                     <Clock className="w-4 h-4" />
//                     Active Trips
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-blue-600">{ongoingStats.totalActive}</div>
//                   <p className="text-xs text-muted-foreground mt-1">Currently ongoing</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//                     <TrendingUp className="w-4 h-4" />
//                     Total Estimated
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{formatCurrency(ongoingStats.totalEstimated)}</div>
//                   <p className="text-xs text-muted-foreground mt-1">Budget allocated</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//                     <DollarSign className="w-4 h-4" />
//                     Total Advanced
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-green-600">{formatCurrency(ongoingStats.totalAdvanced)}</div>
//                   <p className="text-xs text-muted-foreground mt-1">Disbursed</p>
//                 </CardContent>
//               </Card>

//               <Card>
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
//                     <ReceiptIcon className="w-4 h-4" />
//                     Total Expenses
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-orange-600">{formatCurrency(ongoingStats.totalExpenses)}</div>
//                   <p className="text-xs text-muted-foreground mt-1">Receipts uploaded</p>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Ongoing Trips Filter Section */}
//             <div className="flex flex-col sm:flex-row gap-4 mb-6">
//               <div className="flex-1">
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search by destination, trip number, employee, or purpose..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="flex gap-2">
//                 <select
//                   value={ongoingFilter}
//                   onChange={(e) => setOngoingFilter(e.target.value)}
//                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="all">All Trips</option>
//                   <option value="ending_soon">Ending Soon ({ongoingStats.endingSoon})</option>
//                   <option value="over_budget">Over Budget ({ongoingStats.overBudget})</option>
//                   <option value="no_advance">No Advance ({ongoingStats.noAdvance})</option>
//                   <option value="extended">Extended ({ongoingStats.extended})</option>
//                 </select>
                
//                 <Button
//                   variant="outline"
//                   onClick={() => {
//                     setSearchQuery('')
//                     setOngoingFilter('all')
//                   }}
//                   className="flex items-center gap-2"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Clear
//                 </Button>
//               </div>
//             </div>

//             {isLoading && (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//                 <p className="text-muted-foreground">Loading ongoing trips...</p>
//               </div>
//             )}

//             {!isLoading && (
//               <div className="space-y-4">
//                 {filteredOngoingTrips.length === 0 ? (
//                   <Card>
//                     <CardContent className="p-12 text-center">
//                       <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                       <p className="text-xl font-semibold text-muted-foreground mb-2">
//                         {activeTrips.length === 0 ? 'No Ongoing Trips' : 'No trips match your filters'}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {activeTrips.length === 0 
//                           ? 'All trips are either completed or not started yet' 
//                           : 'Try adjusting your search or filter criteria'
//                         }
//                       </p>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   filteredOngoingTrips.map(trip => {
//                     const budgetStatus = getBudgetStatus(trip.estimated_budget || 0, trip.total_expenses || 0)
//                     const budgetUsagePercent = trip.estimated_budget > 0 
//                       ? ((trip.total_expenses / trip.estimated_budget) * 100) 
//                       : 0
//                     const BudgetIcon = budgetStatus.icon

//                     return (
//                       <Card key={trip.trip_id} className="hover:shadow-md transition-shadow">
//                         <CardContent className="p-6">
//                           <div className="flex items-start justify-between mb-4">
//                             <div className="flex items-start gap-4 flex-1">
//                               <div className="bg-blue-50 rounded-lg p-3">
//                                 <Plane className="h-6 w-6 text-blue-600" />
//                               </div>
//                               <div className="flex-1">
//                                 <div className="flex items-start justify-between mb-2">
//                                   <div>
//                                     <h3 className="font-bold text-lg">{trip.destination}</h3>
//                                     <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
//                                   </div>
//                                   <div className="flex gap-2">
//                                     {getStatusBadge(trip.status)}
//                                     {trip.extended_end_date && (
//                                       <Badge className="bg-purple-100 text-purple-800">
//                                         <Calendar className="w-3 h-3 mr-1" />
//                                         Extended
//                                       </Badge>
//                                     )}
//                                     {isTripEndingSoon(trip.end_date, trip.extended_end_date) && (
//                                       <Badge className="bg-orange-100 text-orange-800">
//                                         <AlertCircle className="w-3 h-3 mr-1" />
//                                         Ending Soon
//                                       </Badge>
//                                     )}
//                                   </div>
//                                 </div>
                                
//                                 <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                                
//                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
//                                   <div className="flex items-center gap-2">
//                                     <MapPin className="w-4 h-4 text-muted-foreground" />
//                                     <div>
//                                       <p className="text-xs text-muted-foreground">Employee</p>
//                                       <p className="font-medium">{trip.user?.name || '-'}</p>
//                                     </div>
//                                   </div>
                                  
//                                   <div className="flex items-center gap-2">
//                                     <Calendar className="w-4 h-4 text-muted-foreground" />
//                                     <div>
//                                       <p className="text-xs text-muted-foreground">Duration</p>
//                                       <p className="font-medium">
//                                         {formatDate(trip.start_date)} - {formatDate(trip.extended_end_date || trip.end_date)}
//                                       </p>
//                                       <p className="text-xs text-muted-foreground">
//                                         ({trip.duration} days{trip.extended_end_date ? ' + extended' : ''})
//                                       </p>
//                                     </div>
//                                   </div>
                                  
//                                   <div className="flex items-center gap-2">
//                                     <BudgetIcon className={`w-4 h-4 ${budgetStatus.color}`} />
//                                     <div>
//                                       <p className="text-xs text-muted-foreground">Budget Status</p>
//                                       <p className={`font-medium ${budgetStatus.color}`}>{budgetStatus.label}</p>
//                                     </div>
//                                   </div>
                                  
//                                   {/* ✅ CHANGED: From "Remaining" to "Estimated Budget" */}
//                                   <div className="flex items-center gap-2">
//                                     <TrendingUp className="w-4 h-4 text-blue-600" />
//                                     <div>
//                                       <p className="text-xs text-muted-foreground">Estimated Budget</p>
//                                       <p className="font-medium text-blue-600">
//                                         {formatCurrency(trip.estimated_budget || 0)}
//                                       </p>
//                                       <p className="text-xs text-muted-foreground">Budget limit</p>
//                                     </div>
//                                   </div>
//                                 </div>

//                                 {/* ✅ UPDATED: Budget Breakdown - More Clear */}
//                                 <div className="bg-muted rounded-lg p-4 space-y-2">
//                                   <div className="flex justify-between items-center text-sm">
//                                     <span className="text-muted-foreground">💰 Estimated Budget (Limit):</span>
//                                     <span className="font-semibold text-blue-600">{formatCurrency(trip.estimated_budget || 0)}</span>
//                                   </div>
//                                   <div className="flex justify-between items-center text-sm">
//                                     <span className="text-muted-foreground">💵 Advanced (Money Given):</span>
//                                     <span className={trip.total_advance > 0 ? 'text-green-600 font-medium' : 'text-gray-500'}>
//                                       {trip.total_advance > 0 ? formatCurrency(trip.total_advance) : 'No advance'}
//                                     </span>
//                                   </div>
//                                   <div className="flex justify-between items-center text-sm">
//                                     <span className="text-muted-foreground">🧾 Expenses (Receipts):</span>
//                                     <span className={trip.total_expenses > 0 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
//                                       {trip.total_expenses > 0 ? formatCurrency(trip.total_expenses) : 'No receipts yet'}
//                                     </span>
//                                   </div>
                                  
//                                   {/* ✅ NEW: Budget Usage Progress instead of "Remaining" */}
//                                   <div className="border-t border-border pt-2 space-y-1">
//                                     <div className="flex justify-between items-center text-sm">
//                                       <span className="font-medium">📊 Budget Usage:</span>
//                                       <span className={`font-bold ${
//                                         budgetUsagePercent > 100 ? 'text-red-600' : 
//                                         budgetUsagePercent > 80 ? 'text-orange-600' : 
//                                         'text-green-600'
//                                       }`}>
//                                         {budgetUsagePercent.toFixed(1)}%
//                                         {budgetUsagePercent > 100 && ` (Over by ${formatCurrency(trip.total_expenses - trip.estimated_budget)})`}
//                                       </span>
//                                     </div>
//                                     <div className="w-full bg-gray-200 rounded-full h-2">
//                                       <div
//                                         className={`h-2 rounded-full transition-all ${
//                                           budgetUsagePercent > 100 ? 'bg-red-500' :
//                                           budgetUsagePercent > 80 ? 'bg-orange-500' :
//                                           'bg-green-500'
//                                         }`}
//                                         style={{
//                                           width: `${Math.min(budgetUsagePercent, 100)}%`
//                                         }}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>

//                                 {/* Warnings */}
//                                 {trip.total_advance === 0 && (
//                                   <div className="mt-3 text-xs text-blue-600 bg-blue-50 p-2 rounded flex items-center gap-2">
//                                     <AlertCircle className="w-3 h-3 flex-shrink-0" />
//                                     <span>ℹ️ No advance disbursed yet - employee may request advance or use personal funds</span>
//                                   </div>
//                                 )}
//                                 {trip.total_expenses > trip.estimated_budget && (
//                                   <div className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded flex items-center gap-1">
//                                     <AlertTriangle className="w-3 h-3 flex-shrink-0" />
//                                     <span>⚠️ Warning: Expenses exceed estimated budget by {formatCurrency(trip.total_expenses - trip.estimated_budget)}</span>
//                                   </div>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
                          
//                           <div className="flex justify-end">
//                             <Button
//                               onClick={() => navigate(`/finance-area/ongoing-trips/${trip.trip_id}`)}
//                             >
//                               View Details
//                             </Button>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     )
//                   })
//                 )}
//               </div>
//             )}
//           </TabsContent>

//           {/* Tab 3: Trip Settlements */}
//           <TabsContent value="settlements">
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold text-foreground mb-2">Trip Settlement Management</h2>
//               <p className="text-muted-foreground">Review and approve trip settlements</p>
//             </div>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//               <Card 
//                 className={`cursor-pointer transition-all ${filterStatus === 'all' ? 'border-primary shadow-md' : ''}`}
//                 onClick={() => setFilterStatus('all')}
//               >
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">All Trips</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{stats.all}</div>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className={`cursor-pointer transition-all ${filterStatus === 'awaiting_review' ? 'border-yellow-600 shadow-md' : ''}`}
//                 onClick={() => setFilterStatus('awaiting_review')}
//               >
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting Review</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-yellow-600">{stats.awaiting_review}</div>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className={`cursor-pointer transition-all ${filterStatus === 'under_review_regional' ? 'border-orange-600 shadow-md' : ''}`}
//                 onClick={() => setFilterStatus('under_review_regional')}
//               >
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">Regional Review</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-orange-600">{stats.under_review_regional}</div>
//                 </CardContent>
//               </Card>

//               <Card 
//                 className={`cursor-pointer transition-all ${filterStatus === 'completed' ? 'border-green-600 shadow-md' : ''}`}
//                 onClick={() => setFilterStatus('completed')}
//               >
//                 <CardHeader className="pb-3">
//                   <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
//                 </CardContent>
//               </Card>
//             </div>

//             {isLoading && (
//               <div className="text-center py-12">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//                 <p className="text-muted-foreground">Loading trips...</p>
//               </div>
//             )}

//             {!isLoading && (
//               <div className="space-y-4">
//                 {filteredTrips.length === 0 ? (
//                   <Card>
//                     <CardContent className="p-12 text-center">
//                       <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                       <p className="text-muted-foreground">No trips found</p>
//                     </CardContent>
//                   </Card>
//                 ) : (
//                   filteredTrips.map(trip => (
//                     <Card key={trip.trip_id} className="hover:shadow-md transition-shadow">
//                       <CardContent className="p-6">
//                         <div className="flex items-start justify-between">
//                           <div className="flex items-start gap-4 flex-1">
//                             <div className="bg-red-50 rounded-lg p-3">
//                               <Plane className="h-6 w-6 text-red-600" />
//                             </div>
//                             <div className="flex-1">
//                               <div className="flex items-start justify-between mb-2">
//                                 <div>
//                                   <h3 className="font-bold text-lg">{trip.destination}</h3>
//                                   <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
//                                 </div>
//                                 {getStatusBadge(trip.status)}
//                               </div>
//                               <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                              
//                               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
//                                 <div className="flex items-center gap-2">
//                                   <MapPin className="w-4 h-4 text-muted-foreground" />
//                                   <div>
//                                     <p className="text-xs text-muted-foreground">Employee</p>
//                                     <p className="font-medium">{trip.user?.name || '-'}</p>
//                                   </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-2">
//                                   <Calendar className="w-4 h-4 text-muted-foreground" />
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
                                
//                                 <div className="flex items-center gap-2">
//                                   <DollarSign className="w-4 h-4 text-muted-foreground" />
//                                   <div>
//                                     <p className="text-xs text-muted-foreground">Expenses</p>
//                                     <p className="font-medium">{formatCurrency(trip.total_expenses || 0)}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
                          
//                           <Button
//                             onClick={() => navigate(`/finance-area/trips/${trip.trip_id}`)}
//                             className="ml-4"
//                           >
//                             View Details
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </div>
//             )}
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   )
// }




// src/pages/finance-area/Dashboard.tsx
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { tripAPI, notificationAPI } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plane, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  LogOut, 
  Bell,
  Settings,
  User,
  TrendingUp,
  Receipt as ReceiptIcon,
  AlertTriangle,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import AdvanceRequestsContent from './AdvanceRequestsContent'

interface User {
  user_id: number
  name: string
  email: string
  nik: string
  department: string
  position: string
}

interface Trip {
  trip_id: number
  trip_number: string
  user_id: number
  destination: string
  purpose: string
  start_date: string
  end_date: string
  extended_end_date?: string
  extension_reason?: string
  duration: number
  status: string
  estimated_budget: number
  total_advance: number
  total_expenses: number
  created_at: string
  user?: User
}

export default function FinanceAreaDashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  
  const [trips, setTrips] = useState<Trip[]>([])
  const [activeTrips, setActiveTrips] = useState<Trip[]>([])
  const [allTrips, setAllTrips] = useState<Trip[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  
  // Filter states for Ongoing Trips
  const [ongoingFilter, setOngoingFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  // ✅ NEW: Pagination for Ongoing Trips
  const [ongoingCurrentPage, setOngoingCurrentPage] = useState(1)
  const ongoingItemsPerPage = 15

  // ✅ NEW: Filter & Pagination for Settlements
  const [settlementSearchQuery, setSettlementSearchQuery] = useState('')
  const [settlementDateFilter, setSettlementDateFilter] = useState<string>('30')
  const [settlementCurrentPage, setSettlementCurrentPage] = useState(1)
  const settlementItemsPerPage = 10

  useEffect(() => {
    loadTrips()
    loadNotifications()
  }, [])

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

  const isTripEndingSoon = (endDate: string, extendedEndDate?: string) => {
    const end = new Date(extendedEndDate || endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 2
  }

  const getBudgetStatus = (estimated: number, expenses: number) => {
    if (expenses === 0) return { label: 'No Expenses', color: 'text-gray-600', icon: ReceiptIcon }
    
    const percentage = (expenses / estimated) * 100
    
    if (percentage > 100) {
      return { label: 'Over Budget', color: 'text-red-600', icon: AlertTriangle }
    } else if (percentage > 80) {
      return { label: 'Near Limit', color: 'text-orange-600', icon: AlertCircle }
    } else {
      return { label: 'On Track', color: 'text-green-600', icon: CheckCircle2 }
    }
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: any; label: string; color: string }> = {
      active: { icon: Clock, label: 'Active', color: 'bg-blue-100 text-blue-800' },
      awaiting_review: { icon: Clock, label: 'Awaiting Review', color: 'bg-yellow-100 text-yellow-800' },
      under_review_regional: { icon: AlertCircle, label: 'Under Review (Regional)', color: 'bg-orange-100 text-orange-800' },
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

  const loadTrips = async () => {
    try {
      setIsLoading(true)
      const response = await tripAPI.getAll()
      const fetchedTrips = response.data.data || []
      
      setAllTrips(fetchedTrips)
      
      const tripsToReview = fetchedTrips.filter((t: Trip) => 
        ['awaiting_review', 'under_review_regional', 'completed'].includes(t.status)
      )
      setTrips(tripsToReview)
      
      const ongoingTrips = fetchedTrips.filter((t: Trip) => t.status === 'active')
      setActiveTrips(ongoingTrips)
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

  // ✅ EXISTING: Filter for Ongoing Trips (kept as is)
  const filteredOngoingTrips = activeTrips.filter(trip => {
    const matchesSearch = searchQuery === '' || 
      trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.trip_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.purpose.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesFilter = ongoingFilter === 'all' || 
      (ongoingFilter === 'ending_soon' && isTripEndingSoon(trip.end_date, trip.extended_end_date)) ||
      (ongoingFilter === 'over_budget' && trip.total_expenses > trip.estimated_budget) ||
      (ongoingFilter === 'no_advance' && trip.total_advance === 0) ||
      (ongoingFilter === 'extended' && trip.extended_end_date)
    
    return matchesSearch && matchesFilter
  })

  // ✅ NEW: Pagination for Ongoing Trips
  const getPaginatedOngoingTrips = (trips: Trip[]) => {
    const startIndex = (ongoingCurrentPage - 1) * ongoingItemsPerPage
    const endIndex = startIndex + ongoingItemsPerPage
    return trips.slice(startIndex, endIndex)
  }

  const paginatedOngoingTrips = getPaginatedOngoingTrips(filteredOngoingTrips)
  const ongoingTotalPages = Math.ceil(filteredOngoingTrips.length / ongoingItemsPerPage)

  // ✅ NEW: Filter logic for Settlements
  const getFilteredSettlements = () => {
    let filtered = filterStatus === 'all' 
      ? trips 
      : trips.filter(t => t.status === filterStatus)

    // Date Filter
    if (settlementDateFilter !== 'all') {
      const days = parseInt(settlementDateFilter)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      
      filtered = filtered.filter(trip => {
        const tripDate = new Date(trip.start_date)
        return tripDate >= cutoffDate
      })
    }

    // Search Filter
    if (settlementSearchQuery.trim()) {
      const query = settlementSearchQuery.toLowerCase()
      filtered = filtered.filter(trip =>
        trip.trip_number.toLowerCase().includes(query) ||
        trip.destination.toLowerCase().includes(query) ||
        trip.user?.name.toLowerCase().includes(query) ||
        trip.purpose.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  // ✅ NEW: Pagination for Settlements
  const getPaginatedSettlements = (trips: Trip[]) => {
    const startIndex = (settlementCurrentPage - 1) * settlementItemsPerPage
    const endIndex = startIndex + settlementItemsPerPage
    return trips.slice(startIndex, endIndex)
  }

  const filteredSettlements = getFilteredSettlements()
  const paginatedSettlements = getPaginatedSettlements(filteredSettlements)
  const settlementTotalPages = Math.ceil(filteredSettlements.length / settlementItemsPerPage)

  // ✅ NEW: Reset pagination when filters change
  useEffect(() => {
    setOngoingCurrentPage(1)
  }, [searchQuery, ongoingFilter])

  useEffect(() => {
    setSettlementCurrentPage(1)
  }, [settlementSearchQuery, settlementDateFilter, filterStatus])

  const stats = {
    all: trips.length,
    awaiting_review: trips.filter(t => t.status === 'awaiting_review').length,
    under_review_regional: trips.filter(t => t.status === 'under_review_regional').length,
    completed: trips.filter(t => t.status === 'completed').length,
  }

  const ongoingStats = {
    totalActive: activeTrips.length,
    totalEstimated: activeTrips.reduce((sum, t) => sum + (Number(t.estimated_budget) || 0), 0),
    totalAdvanced: activeTrips.reduce((sum, t) => sum + (Number(t.total_advance) || 0), 0),
    totalExpenses: activeTrips.reduce((sum, t) => sum + (Number(t.total_expenses) || 0), 0),
    endingSoon: activeTrips.filter(t => isTripEndingSoon(t.end_date, t.extended_end_date)).length,
    overBudget: activeTrips.filter(t => t.total_expenses > t.estimated_budget).length,
    noAdvance: activeTrips.filter(t => t.total_advance === 0).length,
    extended: activeTrips.filter(t => t.extended_end_date).length,
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
          
          <div className="flex items-center gap-3">
            <Link to="/finance-area/notifications" className="relative">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Notifications">
                <Bell className="w-5 h-5" />
              </Button>
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {unreadNotifications}
                </span>
              )}
            </Link>

            <Link to="/finance-area/profile">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            <Link to="/finance-area/settings">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Finance Settings">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>

            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-white/70">{user?.role?.replace('_', ' ').toUpperCase()}</p>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => {
                logout()
                navigate('/login')
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="advances" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="advances">Advance Requests</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing Trips</TabsTrigger>  
            <TabsTrigger value="settlements">Trip Settlements</TabsTrigger>
          </TabsList>

          {/* Tab 1: Advance Requests */}
          <TabsContent value="advances">
            <AdvanceRequestsContent />
          </TabsContent>

          {/* Tab 2: Ongoing Trips */}
          <TabsContent value="ongoing">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Ongoing Trips</h2>
              <p className="text-muted-foreground">Monitor active trips and their budgets in real-time</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Active Trips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{ongoingStats.totalActive}</div>
                  <p className="text-xs text-muted-foreground mt-1">Currently ongoing</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Total Estimated
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(ongoingStats.totalEstimated)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Budget allocated</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Total Advanced
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{formatCurrency(ongoingStats.totalAdvanced)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Disbursed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <ReceiptIcon className="w-4 h-4" />
                    Total Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{formatCurrency(ongoingStats.totalExpenses)}</div>
                  <p className="text-xs text-muted-foreground mt-1">Receipts uploaded</p>
                </CardContent>
              </Card>
            </div>

         {/* Filter Section - IMPROVED */}
<div className="flex flex-col sm:flex-row gap-4 mb-6">
  <div className="flex-1">
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search by destination, trip number, employee, or purpose..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  </div>
  
  <div className="flex gap-2">
    <select
      value={ongoingFilter}
      onChange={(e) => setOngoingFilter(e.target.value)}
      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="all">All Trips</option>
      <option value="ending_soon">Ending Soon ({ongoingStats.endingSoon})</option>
      <option value="over_budget">Over Budget ({ongoingStats.overBudget})</option>
      <option value="no_advance">No Advance ({ongoingStats.noAdvance})</option>
      <option value="extended">Extended ({ongoingStats.extended})</option>
    </select>
    
    <Button
      variant="outline"
      onClick={() => {
        setSearchQuery('')
        setOngoingFilter('all')
      }}
      className="flex items-center gap-2"
    >
      <Filter className="w-4 h-4" />
      Clear
    </Button>
  </div>
</div>

            {/* ✅ NEW: Results Info */}
            {!isLoading && filteredOngoingTrips.length > 0 && (
              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <p>
                  Showing {filteredOngoingTrips.length === 0 ? 0 : (ongoingCurrentPage - 1) * ongoingItemsPerPage + 1}-
                  {Math.min(ongoingCurrentPage * ongoingItemsPerPage, filteredOngoingTrips.length)} of {filteredOngoingTrips.length} trips
                </p>
                {ongoingTotalPages > 1 && (
                  <p className="text-xs">
                    Page {ongoingCurrentPage} of {ongoingTotalPages}
                  </p>
                )}
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading ongoing trips...</p>
              </div>
            )}

            {!isLoading && (
              <div className="space-y-4">
                {filteredOngoingTrips.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-xl font-semibold text-muted-foreground mb-2">
                        {activeTrips.length === 0 ? 'No Ongoing Trips' : 'No trips match your filters'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activeTrips.length === 0 
                          ? 'All trips are either completed or not started yet' 
                          : 'Try adjusting your search or filter criteria'
                        }
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* ✅ CHANGED: Use paginatedOngoingTrips */}
                    {paginatedOngoingTrips.map(trip => {
                      const budgetStatus = getBudgetStatus(trip.estimated_budget || 0, trip.total_expenses || 0)
                      const budgetUsagePercent = trip.estimated_budget > 0 
                        ? ((trip.total_expenses / trip.estimated_budget) * 100) 
                        : 0
                      const BudgetIcon = budgetStatus.icon

                      return (
                        <Card key={trip.trip_id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-start gap-4 flex-1">
                                <div className="bg-blue-50 rounded-lg p-3">
                                  <Plane className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-2">
                                    <div>
                                      <h3 className="font-bold text-lg">{trip.destination}</h3>
                                      <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
                                    </div>
                                    <div className="flex gap-2">
                                      {getStatusBadge(trip.status)}
                                      {trip.extended_end_date && (
                                        <Badge className="bg-purple-100 text-purple-800">
                                          <Calendar className="w-3 h-3 mr-1" />
                                          Extended
                                        </Badge>
                                      )}
                                      {isTripEndingSoon(trip.end_date, trip.extended_end_date) && (
                                        <Badge className="bg-orange-100 text-orange-800">
                                          <AlertCircle className="w-3 h-3 mr-1" />
                                          Ending Soon
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-4 h-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-xs text-muted-foreground">Employee</p>
                                        <p className="font-medium">{trip.user?.name || '-'}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-muted-foreground" />
                                      <div>
                                        <p className="text-xs text-muted-foreground">Duration</p>
                                        <p className="font-medium">
                                          {formatDate(trip.start_date)} - {formatDate(trip.extended_end_date || trip.end_date)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          ({trip.duration} days{trip.extended_end_date ? ' + extended' : ''})
                                        </p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <BudgetIcon className={`w-4 h-4 ${budgetStatus.color}`} />
                                      <div>
                                        <p className="text-xs text-muted-foreground">Budget Status</p>
                                        <p className={`font-medium ${budgetStatus.color}`}>{budgetStatus.label}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <TrendingUp className="w-4 h-4 text-blue-600" />
                                      <div>
                                        <p className="text-xs text-muted-foreground">Estimated Budget</p>
                                        <p className="font-medium text-blue-600">
                                          {formatCurrency(trip.estimated_budget || 0)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">Budget limit</p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Budget Breakdown */}
                                  <div className="bg-muted rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-muted-foreground">💰 Estimated Budget (Limit):</span>
                                      <span className="font-semibold text-blue-600">{formatCurrency(trip.estimated_budget || 0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-muted-foreground">💵 Advanced (Money Given):</span>
                                      <span className={trip.total_advance > 0 ? 'text-green-600 font-medium' : 'text-gray-500'}>
                                        {trip.total_advance > 0 ? formatCurrency(trip.total_advance) : 'No advance'}
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-muted-foreground">🧾 Expenses (Receipts):</span>
                                      <span className={trip.total_expenses > 0 ? 'text-orange-600 font-medium' : 'text-gray-500'}>
                                        {trip.total_expenses > 0 ? formatCurrency(trip.total_expenses) : 'No receipts yet'}
                                      </span>
                                    </div>
                                    
                                    <div className="border-t border-border pt-2 space-y-1">
                                      <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium">📊 Budget Usage:</span>
                                        <span className={`font-bold ${
                                          budgetUsagePercent > 100 ? 'text-red-600' : 
                                          budgetUsagePercent > 80 ? 'text-orange-600' : 
                                          'text-green-600'
                                        }`}>
                                          {budgetUsagePercent.toFixed(1)}%
                                          {budgetUsagePercent > 100 && ` (Over by ${formatCurrency(trip.total_expenses - trip.estimated_budget)})`}
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                          className={`h-2 rounded-full transition-all ${
                                            budgetUsagePercent > 100 ? 'bg-red-500' :
                                            budgetUsagePercent > 80 ? 'bg-orange-500' :
                                            'bg-green-500'
                                          }`}
                                          style={{
                                            width: `${Math.min(budgetUsagePercent, 100)}%`
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Warnings */}
                                  {trip.total_advance === 0 && (
                                    <div className="mt-3 flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                      <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
<div className="text-xs text-yellow-800">
<p className="font-semibold">No advance disbursed</p>
<p>This trip hasn't received any advance payment yet.</p>
</div>
</div>
)}
</div>
</div>
</div>
<div className="flex gap-2 justify-end pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/finance-area/ongoing-trips/${trip.trip_id}`)}
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}

                {/* ✅ NEW: Pagination Controls for Ongoing Trips */}
                {ongoingTotalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOngoingCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={ongoingCurrentPage === 1}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, ongoingTotalPages) }, (_, i) => {
                        let pageNum
                        if (ongoingTotalPages <= 5) {
                          pageNum = i + 1
                        } else if (ongoingCurrentPage <= 3) {
                          pageNum = i + 1
                        } else if (ongoingCurrentPage >= ongoingTotalPages - 2) {
                          pageNum = ongoingTotalPages - 4 + i
                        } else {
                          pageNum = ongoingCurrentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={ongoingCurrentPage === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setOngoingCurrentPage(pageNum)}
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
                      onClick={() => setOngoingCurrentPage(prev => Math.min(ongoingTotalPages, prev + 1))}
                      disabled={ongoingCurrentPage === ongoingTotalPages}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </TabsContent>

      {/* Tab 3: Trip Settlements */}
      <TabsContent value="settlements">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Trip Settlements</h2>
          <p className="text-muted-foreground">Review and approve settlements after Finance Area verification</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('all')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">All Settlements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.all}</div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('awaiting_review')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Awaiting Review
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.awaiting_review}</div>
              <p className="text-xs text-muted-foreground mt-1">Needs your review</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('under_review_regional')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Under Review (Regional)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.under_review_regional}</div>
              <p className="text-xs text-muted-foreground mt-1">With Finance Regional</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setFilterStatus('completed')}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <p className="text-xs text-muted-foreground mt-1">Fully approved</p>
            </CardContent>
          </Card>
        </div>

        {/* ✅ NEW: Filter Controls for Settlements */}
        <Card className="bg-gray-50 border-gray-200 mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search trip number, employee, destination..."
                  value={settlementSearchQuery}
                  onChange={(e) => setSettlementSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Date Filter */}
              <Select value={settlementDateFilter} onValueChange={setSettlementDateFilter}>
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

              {/* Clear Filters Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setSettlementSearchQuery('')
                  setSettlementDateFilter('30')
                  setFilterStatus('all')
                }}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>

            {/* Active Filters Info */}
            {(settlementSearchQuery || settlementDateFilter !== '30' || filterStatus !== 'all') && (
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">Active filters:</span>
                {settlementSearchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    Search: "{settlementSearchQuery}"
                  </Badge>
                )}
                {settlementDateFilter !== '30' && (
                  <Badge variant="secondary">
                    {settlementDateFilter === 'all' ? 'All time' : `Last ${settlementDateFilter} days`}
                  </Badge>
                )}
                {filterStatus !== 'all' && (
                  <Badge variant="secondary">
                    Status: {filterStatus.replace('_', ' ')}
                  </Badge>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ✅ NEW: Results Info */}
        {!isLoading && filteredSettlements.length > 0 && (
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <p>
              Showing {filteredSettlements.length === 0 ? 0 : (settlementCurrentPage - 1) * settlementItemsPerPage + 1}-
              {Math.min(settlementCurrentPage * settlementItemsPerPage, filteredSettlements.length)} of {filteredSettlements.length} settlements
            </p>
            {settlementTotalPages > 1 && (
              <p className="text-xs">
                Page {settlementCurrentPage} of {settlementTotalPages}
              </p>
            )}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading settlements...</p>
          </div>
        )}

        {!isLoading && (
          <div className="space-y-4">
            {filteredSettlements.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-semibold text-muted-foreground mb-2">
                    {trips.length === 0 ? 'No Settlements' : 'No settlements match your filters'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {trips.length === 0 
                      ? 'Trip settlements will appear here once trips are completed and submitted' 
                      : 'Try adjusting your search or filter criteria'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* ✅ CHANGED: Use paginatedSettlements */}
                {paginatedSettlements.map(trip => (
                  <Card key={trip.trip_id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            trip.status === 'completed' ? 'bg-green-100' :
                            trip.status === 'under_review_regional' ? 'bg-orange-100' :
                            'bg-yellow-100'
                          }`}>
                            {trip.status === 'completed' ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : trip.status === 'under_review_regional' ? (
                              <AlertCircle className="w-6 h-6 text-orange-600" />
                            ) : (
                              <Clock className="w-6 h-6 text-yellow-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{trip.destination}</h3>
                                <p className="text-sm text-muted-foreground">{trip.trip_number}</p>
                              </div>
                              {getStatusBadge(trip.status)}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Employee</p>
                                  <p className="font-medium">{trip.user?.name || '-'}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Date</p>
                                  <p className="font-medium">{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Advance</p>
                                  <p className="font-medium text-green-600">{formatCurrency(trip.total_advance || 0)}</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <ReceiptIcon className="w-4 h-4 text-orange-600" />
                                <div>
                                  <p className="text-xs text-muted-foreground">Expenses</p>
                                  <p className="font-medium text-orange-600">{formatCurrency(trip.total_expenses || 0)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 justify-end pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/finance-area/settlements/${trip.trip_id}`)}
                        >
                          Review Settlement
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* ✅ NEW: Pagination Controls for Settlements */}
                {settlementTotalPages > 1 && (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSettlementCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={settlementCurrentPage === 1}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: Math.min(5, settlementTotalPages) }, (_, i) => {
                        let pageNum
                        if (settlementTotalPages <= 5) {
                          pageNum = i + 1
                        } else if (settlementCurrentPage <= 3) {
                          pageNum = i + 1
                        } else if (settlementCurrentPage >= settlementTotalPages - 2) {
                          pageNum = settlementTotalPages - 4 + i
                        } else {
                          pageNum = settlementCurrentPage - 2 + i
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={settlementCurrentPage === pageNum ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSettlementCurrentPage(pageNum)}
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
                      onClick={() => setSettlementCurrentPage(prev => Math.min(settlementTotalPages, prev + 1))}
                      disabled={settlementCurrentPage === settlementTotalPages}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </TabsContent>
    </Tabs>
  </div>
</div>
  )
}