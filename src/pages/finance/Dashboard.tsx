// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Badge } from "@/components/ui/badge";
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // // import { 
// // //   Plane, 
// // //   CheckCircle2,
// // //   XCircle,
// // //   Clock,
// // //   DollarSign,
// // //   FileText,
// // //   TrendingUp
// // // } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";
// // // import { useAuth } from '@/contexts/AuthContext';

// // // // Mock data
// // // const pendingRequests = [
// // //   {
// // //     id: 1,
// // //     employee: "John Doe",
// // //     destination: "Jakarta",
// // //     purpose: "Client Meeting",
// // //     startDate: "2024-02-20",
// // //     endDate: "2024-02-22",
// // //     advance: 5000000,
// // //     estimatedCost: 7000000,
// // //   },
// // //   {
// // //     id: 2,
// // //     employee: "Jane Smith",
// // //     destination: "Surabaya",
// // //     purpose: "Network Installation",
// // //     startDate: "2024-02-25",
// // //     endDate: "2024-02-27",
// // //     advance: 3500000,
// // //     estimatedCost: 4500000,
// // //   },
// // // ];

// // // const approvedRequests = [
// // //   {
// // //     id: 3,
// // //     employee: "Mike Johnson",
// // //     destination: "Bandung",
// // //     purpose: "Training Session",
// // //     startDate: "2024-02-15",
// // //     endDate: "2024-02-17",
// // //     advance: 2500000,
// // //     approvedBy: "Finance Area",
// // //   },
// // // ];

// // // const FinanceDashboard = () => {
// // //   const navigate = useNavigate();
// // //   const { user, logout } = useAuth();

// // //   const stats = {
// // //     pendingApproval: pendingRequests.length,
// // //     approvedToday: 5,
// // //     totalAdvances: 15500000,
// // //     pendingSettlement: 3,
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       {/* Header */}
// // //       <header className="bg-gradient-primary border-b shadow-soft">
// // //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// // //           <div className="flex items-center gap-3">
// // //             <img 
// // //               src="/logo-telkom-akses.png" 
// // //               alt="Telkom Akses" 
// // //               className="h-10 w-auto bg-white rounded px-2 py-1"
// // //             />
// // //             <div>
// // //               <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
// // //               <p className="text-sm text-white/80">Telkom Akses Travel System</p>
// // //             </div>
// // //           </div>
// // //           <Button 
// // //             variant="secondary" 
// // //             size="sm"
// // //             onClick={() => {
// // //               localStorage.removeItem("userRole");
// // //               navigate("/");
// // //             }}
// // //           >
// // //             Logout
// // //           </Button>
// // //         </div>
// // //       </header>

// // //       <div className="container mx-auto px-4 py-8">
// // //         {/* Stats Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// // //           <Card>
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approval</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold text-warning">{stats.pendingApproval}</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground">Approved Today</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold text-success">{stats.approvedToday}</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground">Total Advances</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold">Rp {(stats.totalAdvances / 1000000).toFixed(1)}M</div>
// // //             </CardContent>
// // //           </Card>
// // //           <Card>
// // //             <CardHeader className="pb-3">
// // //               <CardTitle className="text-sm font-medium text-muted-foreground">Pending Settlement</CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-2xl font-bold text-accent">{stats.pendingSettlement}</div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* Main Content */}
// // //         <Card className="shadow-medium">
// // //           <CardHeader>
// // //             <CardTitle>Trip Requests</CardTitle>
// // //             <CardDescription>Review and manage employee business trip requests</CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <Tabs defaultValue="pending">
// // //               <TabsList>
// // //                 <TabsTrigger value="pending">
// // //                   <Clock className="w-4 h-4 mr-2" />
// // //                   Pending ({pendingRequests.length})
// // //                 </TabsTrigger>
// // //                 <TabsTrigger value="approved">
// // //                   <CheckCircle2 className="w-4 h-4 mr-2" />
// // //                   Approved
// // //                 </TabsTrigger>
// // //                 <TabsTrigger value="all">
// // //                   <FileText className="w-4 h-4 mr-2" />
// // //                   All Requests
// // //                 </TabsTrigger>
// // //               </TabsList>

// // //               <TabsContent value="pending" className="space-y-4 mt-4">
// // //                 {pendingRequests.map((request) => (
// // //                   <div 
// // //                     key={request.id}
// // //                     className="p-4 rounded-lg border bg-card hover:shadow-soft transition-shadow"
// // //                   >
// // //                     <div className="flex items-start justify-between mb-3">
// // //                       <div className="flex items-start gap-4 flex-1">
// // //                         <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
// // //                           <Plane className="w-6 h-6 text-warning" />
// // //                         </div>
// // //                         <div className="flex-1">
// // //                           <h3 className="font-semibold text-foreground mb-1">
// // //                             {request.employee} - {request.destination}
// // //                           </h3>
// // //                           <p className="text-sm text-muted-foreground mb-2">{request.purpose}</p>
// // //                           <div className="grid grid-cols-2 gap-4 text-sm">
// // //                             <div>
// // //                               <span className="text-muted-foreground">Period: </span>
// // //                               <span className="text-foreground">{request.startDate} - {request.endDate}</span>
// // //                             </div>
// // //                             <div>
// // //                               <span className="text-muted-foreground">Estimated: </span>
// // //                               <span className="text-foreground font-medium">Rp {request.estimatedCost.toLocaleString()}</span>
// // //                             </div>
// // //                             <div>
// // //                               <span className="text-muted-foreground">Advance Request: </span>
// // //                               <span className="text-accent font-medium">Rp {request.advance.toLocaleString()}</span>
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div className="flex gap-2 justify-end border-t pt-3">
// // //                       <Button variant="outline" size="sm">
// // //                         View Details
// // //                       </Button>
// // //                       <Button variant="destructive" size="sm">
// // //                         <XCircle className="w-4 h-4 mr-1" />
// // //                         Reject
// // //                       </Button>
// // //                       <Button size="sm" className="bg-success hover:bg-success/90">
// // //                         <CheckCircle2 className="w-4 h-4 mr-1" />
// // //                         Approve
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </TabsContent>

// // //               <TabsContent value="approved" className="space-y-4 mt-4">
// // //                 {approvedRequests.map((request) => (
// // //                   <div 
// // //                     key={request.id}
// // //                     className="p-4 rounded-lg border bg-card"
// // //                   >
// // //                     <div className="flex items-start justify-between">
// // //                       <div className="flex items-start gap-4 flex-1">
// // //                         <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
// // //                           <CheckCircle2 className="w-6 h-6 text-success" />
// // //                         </div>
// // //                         <div className="flex-1">
// // //                           <h3 className="font-semibold text-foreground mb-1">
// // //                             {request.employee} - {request.destination}
// // //                           </h3>
// // //                           <p className="text-sm text-muted-foreground mb-2">{request.purpose}</p>
// // //                           <div className="flex items-center gap-4 text-sm">
// // //                             <span className="text-muted-foreground">{request.startDate} - {request.endDate}</span>
// // //                             <span>•</span>
// // //                             <span className="text-muted-foreground">Advance: Rp {request.advance.toLocaleString()}</span>
// // //                             <span>•</span>
// // //                             <Badge variant="secondary" className="bg-success/10 text-success">
// // //                               {request.approvedBy}
// // //                             </Badge>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       <Button variant="outline" size="sm">
// // //                         View Details
// // //                       </Button>
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </TabsContent>

// // //               <TabsContent value="all" className="mt-4">
// // //                 <p className="text-center text-muted-foreground py-8">
// // //                   All requests view - coming soon
// // //                 </p>
// // //               </TabsContent>
// // //             </Tabs>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default FinanceDashboard;



// // import { useState, useEffect } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { 
// //   CheckCircle2,
// //   Clock,
// //   DollarSign,
// //   FileText,
// //   User,
// //   MapPin,
// //   Calendar,
// //   Eye
// // } from "lucide-react"
// // import { useAuth } from '@/contexts/AuthContext'
// // import { tripAPI } from '@/services/api'

// // interface Trip {
// //   trip_id: number
// //   trip_number: string
// //   destination: string
// //   purpose: string
// //   start_date: string
// //   end_date: string
// //   status: string
// //   total_advance: number
// //   total_expenses: number
// //   user: {
// //     name: string
// //     department: string
// //     position: string
// //   }
// // }

// // export default function Dashboard() {
// //   const navigate = useNavigate()
// //   const { user, logout } = useAuth()
// //   const [trips, setTrips] = useState<Trip[]>([])
// //   const [isLoading, setIsLoading] = useState(true)

// //   useEffect(() => {
// //     loadTrips()
// //   }, [])

// //   const loadTrips = async () => {
// //     try {
// //       setIsLoading(true)
// //       const response = await tripAPI.getAll()
// //       setTrips(response.data.data || [])
// //     } catch (error) {
// //       console.error('Failed to load trips:', error)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('id-ID', {
// //       style: 'currency',
// //       currency: 'IDR',
// //       minimumFractionDigits: 0
// //     }).format(amount)
// //   }

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('id-ID', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric'
// //     })
// //   }

// //   // Filter trips
// //   const pendingTrips = trips.filter(t => t.status === 'under_review_regional')
// //   const completedTrips = trips.filter(t => t.status === 'completed')
// //   const allReviewTrips = trips.filter(t => 
// //     ['under_review_regional', 'completed'].includes(t.status)
// //   )

// //   // Stats
// //   const stats = {
// //     pendingReview: pendingTrips.length,
// //     completedToday: completedTrips.filter(t => {
// //       const today = new Date().toDateString()
// //       return new Date(t.start_date).toDateString() === today
// //     }).length,
// //     totalAdvances: pendingTrips.reduce((sum, t) => sum + (t.total_advance || 0), 0),
// //     totalSettlements: completedTrips.length,
// //   }

// //   const getStatusBadge = (status: string) => {
// //     const statusConfig: Record<string, { variant: any; label: string; className: string }> = {
// //       under_review_regional: { 
// //         variant: 'secondary', 
// //         label: 'Under Review', 
// //         className: 'bg-orange-100 text-orange-800 border-orange-200' 
// //       },
// //       completed: { 
// //         variant: 'outline', 
// //         label: 'Completed', 
// //         className: 'bg-green-100 text-green-800 border-green-200' 
// //       },
// //     }
    
// //     const config = statusConfig[status] || statusConfig.under_review_regional
    
// //     return (
// //       <Badge variant={config.variant} className={config.className}>
// //         {config.label}
// //       </Badge>
// //     )
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
// //           <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <header className="bg-gradient-to-r from-primary/90 to-primary border-b shadow-sm">
// //         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
// //               <FileText className="h-5 w-5 text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
// //               <p className="text-sm text-white/80">Settlement Final Review & Approval</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             <div className="text-right">
// //               <p className="text-sm font-medium text-white">{user?.name}</p>
// //               <p className="text-xs text-white/70">{user?.role?.replace('_', ' ').toUpperCase()}</p>
// //             </div>
// //             <Button 
// //               variant="secondary" 
// //               size="sm"
// //               onClick={() => {
// //                 logout()
// //                 navigate('/login')
// //               }}
// //             >
// //               Logout
// //             </Button>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-4 py-8">
// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
// //           <Card className="shadow-sm">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
// //                 <Clock className="h-4 w-4" />
// //                 Pending Review
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-orange-600">{stats.pendingReview}</div>
// //               <p className="text-xs text-muted-foreground mt-1">Awaiting final approval</p>
// //             </CardContent>
// //           </Card>
          
// //           <Card className="shadow-sm">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
// //                 <CheckCircle2 className="h-4 w-4" />
// //                 Completed Today
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
// //               <p className="text-xs text-muted-foreground mt-1">Settlements approved</p>
// //             </CardContent>
// //           </Card>
          
// //           <Card className="shadow-sm">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
// //                 <DollarSign className="h-4 w-4" />
// //                 Pending Advances
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold">{formatCurrency(stats.totalAdvances)}</div>
// //               <p className="text-xs text-muted-foreground mt-1">Under review</p>
// //             </CardContent>
// //           </Card>
          
// //           <Card className="shadow-sm">
// //             <CardHeader className="pb-3">
// //               <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
// //                 <FileText className="h-4 w-4" />
// //                 Total Settlements
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-2xl font-bold text-blue-600">{stats.totalSettlements}</div>
// //               <p className="text-xs text-muted-foreground mt-1">All completed</p>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Main Content */}
// //         <Card className="shadow-sm">
// //           <CardHeader className="border-b">
// //             <CardTitle>Settlement Reviews</CardTitle>
// //             <CardDescription>Final review and approval of trip settlements</CardDescription>
// //           </CardHeader>
// //           <CardContent className="pt-6">
// //             <Tabs defaultValue="pending">
// //               <TabsList className="grid w-full grid-cols-3 mb-6">
// //                 <TabsTrigger value="pending" className="flex items-center gap-2">
// //                   <Clock className="w-4 h-4" />
// //                   Pending ({pendingTrips.length})
// //                 </TabsTrigger>
// //                 <TabsTrigger value="completed" className="flex items-center gap-2">
// //                   <CheckCircle2 className="w-4 h-4" />
// //                   Completed ({completedTrips.length})
// //                 </TabsTrigger>
// //                 <TabsTrigger value="all" className="flex items-center gap-2">
// //                   <FileText className="w-4 h-4" />
// //                   All ({allReviewTrips.length})
// //                 </TabsTrigger>
// //               </TabsList>

// //               {/* Pending Tab */}
// //               <TabsContent value="pending" className="space-y-4">
// //                 {pendingTrips.length === 0 ? (
// //                   <div className="text-center py-12">
// //                     <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
// //                     <p className="text-muted-foreground">No settlements pending review</p>
// //                   </div>
// //                 ) : (
// //                   pendingTrips.map((trip) => (
// //                     <div 
// //                       key={trip.trip_id}
// //                       className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
// //                     >
// //                       <div className="flex items-start justify-between mb-3">
// //                         <div className="flex items-start gap-4 flex-1">
// //                           <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
// //                             <Clock className="w-6 h-6 text-orange-600" />
// //                           </div>
// //                           <div className="flex-1">
// //                             <div className="flex items-center gap-2 mb-1">
// //                               <h3 className="font-semibold text-lg">{trip.trip_number}</h3>
// //                               {getStatusBadge(trip.status)}
// //                             </div>
// //                             <p className="text-sm text-muted-foreground mb-3">
// //                               <User className="inline h-3 w-3 mr-1" />
// //                               {trip.user.name} • {trip.user.department}
// //                             </p>
                            
// //                             <div className="grid grid-cols-2 gap-3 text-sm">
// //                               <div className="flex items-center gap-2">
// //                                 <MapPin className="h-4 w-4 text-muted-foreground" />
// //                                 <span className="font-medium">{trip.destination}</span>
// //                               </div>
// //                               <div className="flex items-center gap-2">
// //                                 <Calendar className="h-4 w-4 text-muted-foreground" />
// //                                 <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
// //                               </div>
// //                             </div>
                            
// //                             <div className="mt-3 pt-3 border-t grid grid-cols-2 gap-3 text-sm">
// //                               <div>
// //                                 <span className="text-muted-foreground">Advance: </span>
// //                                 <span className="font-semibold text-primary">{formatCurrency(trip.total_advance)}</span>
// //                               </div>
// //                               <div>
// //                                 <span className="text-muted-foreground">Expenses: </span>
// //                                 <span className="font-semibold text-green-600">{formatCurrency(trip.total_expenses)}</span>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
                      
// //                       <div className="flex gap-2 justify-end pt-3 border-t">
// //                         <Button 
// //                           variant="outline" 
// //                           size="sm"
// //                           onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
// //                         >
// //                           <Eye className="w-4 h-4 mr-2" />
// //                           Review Settlement
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </TabsContent>

// //               {/* Completed Tab */}
// //               <TabsContent value="completed" className="space-y-4">
// //                 {completedTrips.length === 0 ? (
// //                   <div className="text-center py-12">
// //                     <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
// //                     <p className="text-muted-foreground">No completed settlements yet</p>
// //                   </div>
// //                 ) : (
// //                   completedTrips.map((trip) => (
// //                     <div 
// //                       key={trip.trip_id}
// //                       className="p-4 rounded-lg border bg-card"
// //                     >
// //                       <div className="flex items-start justify-between">
// //                         <div className="flex items-start gap-4 flex-1">
// //                           <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
// //                             <CheckCircle2 className="w-6 h-6 text-green-600" />
// //                           </div>
// //                           <div className="flex-1">
// //                             <div className="flex items-center gap-2 mb-1">
// //                               <h3 className="font-semibold text-lg">{trip.trip_number}</h3>
// //                               {getStatusBadge(trip.status)}
// //                             </div>
// //                             <p className="text-sm text-muted-foreground mb-2">
// //                               {trip.user.name} • {trip.destination}
// //                             </p>
// //                             <div className="flex items-center gap-4 text-sm text-muted-foreground">
// //                               <span>{formatDate(trip.start_date)} - {formatDate(trip.end_date)}</span>
// //                               <span>•</span>
// //                               <span>Advance: {formatCurrency(trip.total_advance)}</span>
// //                               <span>•</span>
// //                               <span>Expenses: {formatCurrency(trip.total_expenses)}</span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                         <Button 
// //                           variant="outline" 
// //                           size="sm"
// //                           onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
// //                         >
// //                           <Eye className="w-4 h-4 mr-2" />
// //                           View Details
// //                         </Button>
// //                       </div>
// //                     </div>
// //                   ))
// //                 )}
// //               </TabsContent>

// //               {/* All Tab */}
// //               <TabsContent value="all" className="space-y-4">
// //                 {allReviewTrips.map((trip) => (
// //                   <div 
// //                     key={trip.trip_id}
// //                     className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
// //                   >
// //                     <div className="flex items-start justify-between">
// //                       <div className="flex items-start gap-4 flex-1">
// //                         <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
// //                           trip.status === 'completed' 
// //                             ? 'bg-green-100' 
// //                             : 'bg-orange-100'
// //                         }`}>
// //                           {trip.status === 'completed' ? (
// //                             <CheckCircle2 className="w-6 h-6 text-green-600" />
// //                           ) : (
// //                             <Clock className="w-6 h-6 text-orange-600" />
// //                           )}
// //                         </div>
// //                         <div className="flex-1">
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <h3 className="font-semibold">{trip.trip_number}</h3>
// //                             {getStatusBadge(trip.status)}
// //                           </div>
// //                           <p className="text-sm text-muted-foreground mb-2">
// //                             {trip.user.name} • {trip.destination}
// //                           </p>
// //                           <div className="flex items-center gap-4 text-sm text-muted-foreground">
// //                             <span>{formatDate(trip.start_date)}</span>
// //                             <span>•</span>
// //                             <span>Advance: {formatCurrency(trip.total_advance)}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <Button 
// //                         variant="outline" 
// //                         size="sm"
// //                         onClick={() => navigate(`/finance-regional/settlements/${trip.trip_id}`)}
// //                       >
// //                         <Eye className="w-4 h-4 mr-2" />
// //                         View
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </TabsContent>
// //             </Tabs>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   )
// // }







// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
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
//   TrendingUp  // ✅ NEW ICON
// } from "lucide-react"
// import { useAuth } from '@/contexts/AuthContext'
// import { tripAPI } from '@/services/api'

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

//   useEffect(() => {
//     loadTrips()
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

//   // ✅ Filter trips - ONLY settlements for Regional
//   const pendingTrips = trips.filter(t => t.status === 'under_review_regional')
//   const completedTrips = trips.filter(t => t.status === 'completed')
//   const allReviewTrips = trips.filter(t => 
//     ['under_review_regional', 'completed'].includes(t.status)
//   )

//   // ✅ FIXED STATS - Removed totalAdvances
//   const stats = {
//     pendingReview: pendingTrips.length,
//     completedToday: completedTrips.filter(t => {
//       const today = new Date().toDateString()
//       return new Date(t.start_date).toDateString() === today
//     }).length,
//     totalReviewed: allReviewTrips.length,  // ✅ NEW!
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
//         {/* ✅ HEADER WITH TELKOM LOGO */}
//   <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg">
//     <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         {/* ✅ LOGO TELKOM */}
//         <img 
//           src="/logo-telkom-akses.png" 
//           alt="Telkom Logo" 
//           className="h-10 w-auto"
//         />
//         <div>
//           <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
//           <p className="text-sm text-white/90">Settlement Final Review & Approval</p>
//         </div>
//       </div>
//       <div className="flex items-center gap-3">
//         <div className="text-right">
//           <p className="text-sm font-medium text-white">{user?.name}</p>
//           <p className="text-xs text-white/70 uppercase">{user?.role?.replace('_', ' ')}</p>
//         </div>
//         <Button 
//           variant="secondary" 
//           size="sm"
//           onClick={() => {
//             logout()
//             navigate('/login')
//           }}
//           className="bg-white text-red-600 hover:bg-red-50"
//         >
//           <LogOut className="h-4 w-4 mr-2" />
//           Logout
//         </Button>
//       </div>
//     </div>
//   </header>

//       <div className="container mx-auto px-4 py-8">
//         {/* ✅ FIXED STATS CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           {/* Card 1: Pending Review */}
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
          
//           {/* Card 2: Completed Today */}
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
          
//           {/* Card 3: Total Reviewed - ✅ REPLACED "Pending Advances" */}
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
          
//           {/* Card 4: Total Completed */}
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
  Settings
} from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import { tripAPI, notificationAPI } from '@/services/api'  // ✅ ADD notificationAPI!

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
  const [unreadNotifications, setUnreadNotifications] = useState(0)  // ✅ ADD THIS!

  useEffect(() => {
    loadTrips()
    loadNotifications()  // ✅ ADD THIS!
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

  // ✅ ADD THIS FUNCTION!
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

  const pendingTrips = trips.filter(t => t.status === 'under_review_regional')
  const completedTrips = trips.filter(t => t.status === 'completed')
  const allReviewTrips = trips.filter(t => 
    ['under_review_regional', 'completed'].includes(t.status)
  )

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
      {/* ✅ UPDATED HEADER WITH NOTIFICATION BELL */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/logo-telkom-akses.png" 
              alt="Telkom Logo" 
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Finance Regional Portal</h1>
              <p className="text-sm text-white/90">Settlement Final Review & Approval</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* ✅ NOTIFICATION BELL - NEW! */}
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

                  {/* ✅ TAMBAH SETTINGS BUTTON */}
            <Link to="/finance-regional/profile">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" title="Profile Settings">
                <Settings className="w-5 h-5" />
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

              {/* All Tab */}
              <TabsContent value="all" className="space-y-4">
                {allReviewTrips.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No settlements to review yet</p>
                  </div>
                ) : (
                  allReviewTrips.map((trip) => (
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
                              {trip.user.name} • {trip.destination}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span>{formatDate(trip.start_date)}</span>
                              <span>•</span>
                              <span>Advance: {formatCurrency(trip.total_advance)}</span>
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
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}