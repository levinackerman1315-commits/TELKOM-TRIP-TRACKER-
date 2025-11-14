// import { useNavigate } from 'react-router-dom';
// import { mockTrips } from '@/data/mockTrips'; // Import mock data atau API

// export default function MyTrips() {
//   const navigate = useNavigate();

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

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case 'submitted':
//         return <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">Submitted</span>;
//       case 'pending':
//         return <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">Pending</span>;
//       case 'approved':
//         return <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-semibold">Approved</span>;
//       case 'completed':
//         return <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold">Completed</span>;
//       case 'rejected':
//         return <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold">Rejected</span>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-5xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-2">My Trips</h1>
//         <p className="text-gray-600 mb-6">View and manage your business trip requests</p>
//         <div className="space-y-4">
//           {mockTrips.length === 0 ? (
//             <div className="text-center text-gray-500 py-8">No trips found</div>
//           ) : (
//             mockTrips.map(trip => (
//               <div key={trip.id} className="flex items-center justify-between bg-white rounded-lg shadow p-5 border">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-red-50 rounded-lg p-3">
//                     <span role="img" aria-label="plane">✈️</span>
//                   </div>
//                   <div>
//                     <div className="font-bold text-lg">{trip.destination}</div>
//                     <div className="text-sm text-gray-600">{trip.purpose}</div>
//                     <div className="text-xs text-gray-500">
//                       {formatDate(trip.start_date)} - {formatDate(trip.end_date)} • Advance: {formatCurrency(trip.advance_amount)}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   {getStatusBadge(trip.status)}
//                   <button
//                     onClick={() => navigate(`/employee/trips/${trip.id}`)}
//                     className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  Search,
  Plane,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Filter
} from 'lucide-react'
import { tripAPI } from '@/services/api'
import { Trip } from '@/types'
import { useAuth } from '@/contexts/AuthContext'

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: any; icon: any; label: string; color: string }> = {
    active: { variant: 'default', icon: CheckCircle2, label: 'Active', color: 'bg-success text-success-foreground' },
    awaiting_review: { variant: 'secondary', icon: Clock, label: 'Awaiting Review', color: 'bg-warning text-warning-foreground' },
    under_review_area: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Area)', color: 'bg-blue-100 text-blue-800' },
    under_review_regional: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Regional)', color: 'bg-purple-100 text-purple-800' },
    completed: { variant: 'outline', icon: CheckCircle2, label: 'Completed', color: 'bg-gray-100 text-gray-800' },
    cancelled: { variant: 'destructive', icon: XCircle, label: 'Cancelled', color: 'bg-destructive text-destructive-foreground' },
  }
  
  const status_info = statusMap[status] || statusMap.active
  const Icon = status_info.icon
  
  return (
    <Badge className={status_info.color}>
      <Icon className="w-3 h-3 mr-1" />
      {status_info.label}
    </Badge>
  )
}

export default function MyTrips() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [trips, setTrips] = useState<Trip[]>([])
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTrips()
  }, [])

  useEffect(() => {
    filterTrips()
  }, [searchQuery, activeTab, trips])

  const fetchTrips = async () => {
    try {
      setIsLoading(true)
      const response = await tripAPI.getAll()
      setTrips(response.data.data || [])
    } catch (error) {
      console.error('Failed to fetch trips:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterTrips = () => {
    let filtered = [...trips]

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(trip => trip.status === activeTab)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(trip =>
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.trip_number.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredTrips(filtered)
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

  const stats = {
    total: trips.length,
    active: trips.filter(t => t.status === 'active').length,
    awaiting_review: trips.filter(t => t.status === 'awaiting_review').length,
    under_review: trips.filter(t => t.status.includes('review')).length,
    completed: trips.filter(t => t.status === 'completed').length,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trips...</p>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">My Trips</h1>
              <p className="text-sm text-white/80">Manage all your business trips</p>
            </div>
            <Button
              onClick={() => navigate('/employee/trips/new')}
              variant="secondary"
              disabled={stats.active > 0}
            >
              <Plane className="w-4 h-4 mr-2" />
              New Trip
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{stats.active}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Awaiting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{stats.awaiting_review}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.under_review}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6 shadow-soft">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by destination, purpose, or trip number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trips List with Tabs */}
        <Card className="shadow-soft">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
                <TabsTrigger value="awaiting_review">Awaiting ({stats.awaiting_review})</TabsTrigger>
                <TabsTrigger value="under_review_area">Area</TabsTrigger>
                <TabsTrigger value="under_review_regional">Regional</TabsTrigger>
                <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value={activeTab} className="space-y-4 mt-0">
                {filteredTrips.length === 0 ? (
                  <div className="text-center py-12">
                    <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No trips found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchQuery
                        ? 'Try adjusting your search'
                        : activeTab === 'all'
                        ? "You haven't created any trips yet"
                        : `No ${activeTab.replace('_', ' ')} trips`}
                    </p>
                    {activeTab === 'all' && !searchQuery && (
                      <Button onClick={() => navigate('/employee/trips/new')}>
                        <Plane className="w-4 h-4 mr-2" />
                        Create Your First Trip
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredTrips.map((trip) => (
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
                                {getStatusBadge(trip.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{trip.purpose}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">Start Date</p>
                                    <p className="font-medium">{formatDate(trip.start_date)}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-xs text-muted-foreground">End Date</p>
                                    <p className="font-medium">{formatDate(trip.end_date)}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
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
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 pt-4 border-t">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/employee/trips/${trip.trip_id}`)}
                          >
                            View Details →
                          </Button>
                        </div>
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
  )
}