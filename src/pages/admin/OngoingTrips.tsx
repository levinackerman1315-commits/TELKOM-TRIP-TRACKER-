import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Receipt, 
  FileText,
  Eye,
  AlertCircle,
  Loader2,
  User,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { tripAPI } from '@/services/api'

interface OngoingTrip {
  trip_id: number
  trip_number: string
  employee_name: string
  employee_nik: string
  destination: string
  start_date: string
  end_date: string
  duration: number
  estimated_budget: number
  
  total_advance_approved: number
  total_expenses: number
  balance: number
  
  receipt_count: number
  supporting_doc_count: number
  advance_count: number
  
  has_pending_advance: boolean
  status: string
}

export default function OngoingTrips() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState<OngoingTrip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'ending_soon' | 'over_budget' | 'no_advance'>('all')

  useEffect(() => {
    fetchOngoingTrips()
  }, [])

  const fetchOngoingTrips = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await tripAPI.getOngoing()
      setTrips(response.data.data)
    } catch (err: any) {
      console.error('Failed to fetch ongoing trips:', err)
      setError(err.response?.data?.message || 'Failed to load ongoing trips')
    } finally {
      setLoading(false)
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

  // Filter logic
  const getFilteredTrips = () => {
    let filtered = [...trips]
    
    switch (filter) {
      case 'ending_soon':
        filtered = filtered.filter(trip => {
          const endDate = new Date(trip.end_date)
          const today = new Date()
          const diffTime = endDate.getTime() - today.getTime()
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
          return diffDays >= 0 && diffDays <= 2
        })
        break
      case 'over_budget':
        filtered = filtered.filter(trip => trip.balance < 0)
        break
      case 'no_advance':
        filtered = filtered.filter(trip => trip.total_advance_approved === 0)
        break
      default:
        // 'all' - no filtering
        break
    }
    
    return filtered
  }

  const filteredTrips = getFilteredTrips()

  // Filter stats
  const filterStats = {
    all: trips.length,
    ending_soon: trips.filter(trip => {
      const endDate = new Date(trip.end_date)
      const today = new Date()
      const diffTime = endDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays >= 0 && diffDays <= 2
    }).length,
    over_budget: trips.filter(trip => trip.balance < 0).length,
    no_advance: trips.filter(trip => trip.total_advance_approved === 0).length,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading ongoing trips...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (trips.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No Ongoing Trips</h3>
            <p className="text-muted-foreground">
              There are currently no active trips in the system.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ongoing Trips</h2>
          <p className="text-muted-foreground">Monitor active business trips and expenses</p>
        </div>
        <Badge variant="outline" className="text-base px-4 py-2">
          {filteredTrips.length} Trip{filteredTrips.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="grid grid-cols-4 gap-4">
        <Card 
          className={`cursor-pointer transition-all ${filter === 'all' ? 'border-primary shadow-md bg-primary/5' : 'hover:shadow-md'}`}
          onClick={() => setFilter('all')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">All Trips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filterStats.all}</div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${filter === 'ending_soon' ? 'border-orange-600 shadow-md bg-orange-50' : 'hover:shadow-md'}`}
          onClick={() => setFilter('ending_soon')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ending Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{filterStats.ending_soon}</div>
            <p className="text-xs text-muted-foreground mt-1">≤ 2 days</p>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${filter === 'over_budget' ? 'border-red-600 shadow-md bg-red-50' : 'hover:shadow-md'}`}
          onClick={() => setFilter('over_budget')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Over Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{filterStats.over_budget}</div>
            <p className="text-xs text-muted-foreground mt-1">Exceeds estimated</p>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all ${filter === 'no_advance' ? 'border-blue-600 shadow-md bg-blue-50' : 'hover:shadow-md'}`}
          onClick={() => setFilter('no_advance')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">No Advance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{filterStats.no_advance}</div>
            <p className="text-xs text-muted-foreground mt-1">Not Request any Advance yet</p>
          </CardContent>
        </Card>
      </div>

      {/* Trips List */}
      <div className="grid gap-4">
        {filteredTrips.map((trip) => (
          <Card key={trip.trip_id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT: Trip Info (4 cols) */}
                <div className="lg:col-span-4 space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Trip Number</p>
                    <p className="font-mono text-sm font-semibold">{trip.trip_number}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <User className="h-3 w-3" /> Employee
                    </p>
                    <p className="font-semibold">{trip.employee_name}</p>
                    <p className="text-xs text-muted-foreground">NIK: {trip.employee_nik}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" /> Destination
                    </p>
                    <p className="font-medium">{trip.destination}</p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" /> Duration
                    </p>
                    <p className="text-sm">
                      {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {trip.duration} day{trip.duration !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* MIDDLE: Financial Summary (4 cols) */}
                <div className="lg:col-span-4 space-y-3 border-l border-r lg:px-6">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">
                    Financial Summary
                  </p>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Estimated:</span>
                    <span className="font-medium">{formatCurrency(trip.estimated_budget)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Approved Advance:</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(trip.total_advance_approved)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Expenses:</span>
                    <span className="font-semibold text-orange-600">
                      {formatCurrency(trip.total_expenses)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-3 border-t">
                    <span className="font-semibold">Balance:</span>
                    <div className="flex items-center gap-2">
                      {trip.balance < 0 ? (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      )}
                      <span className={`font-bold ${
                        trip.balance < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(Math.abs(trip.balance))}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground text-right pt-1">
                    {trip.balance < 0 ? (
                      <span className="text-red-600">↓ Reimburse to employee</span>
                    ) : trip.balance > 0 ? (
                      <span className="text-green-600">↑ Return to company</span>
                    ) : (
                      <span className="text-gray-600">⚖ Balanced</span>
                    )}
                  </div>

                  {/* Pending Alert */}
                  {trip.has_pending_advance && (
                    <Alert className="bg-amber-50 border-amber-200">
                      <AlertCircle className="h-3 w-3 text-amber-600" />
                      <AlertDescription className="text-xs text-amber-800">
                        Has pending advance request
                      </AlertDescription>
                    </Alert>
                  )}
                </div>

                {/* RIGHT: Files & Actions (4 cols) */}
                <div className="lg:col-span-4 space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground mb-3">
                    Files & Actions
                  </p>
                  
                  {/* File Counts */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Receipt className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Receipts</span>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        {trip.receipt_count}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Advances</span>
                      </div>
                      <Badge variant="outline" className="bg-white">
                        {trip.advance_count || 0}
                      </Badge>
                    </div>

                    {trip.supporting_doc_count > 0 && (
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-purple-600" />
                          <span className="text-sm font-medium">Supporting Docs</span>
                        </div>
                        <Badge variant="outline" className="bg-white">
                          {trip.supporting_doc_count}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate(`/finance-area/trips/${trip.trip_id}`)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Details
                  </Button>
                </div>

              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}