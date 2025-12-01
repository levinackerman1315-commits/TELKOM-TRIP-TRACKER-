
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripAPI, receiptAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ArrowLeft,
  Plane,
  MapPin,
  Calendar,
  DollarSign,
  User as UserIcon,
  Briefcase,
  Clock,
  TrendingUp,
  Receipt as ReceiptIcon,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  Wallet,
  Info
} from 'lucide-react'

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

interface Receipt {
  receipt_id: number
  trip_id: number
  category: string
  amount: number
  receipt_date: string
  description: string
  file_path: string
  status: string
  created_at: string
}

export default function OngoingTripDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [trip, setTrip] = useState<Trip | null>(null)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null)
  const [imageLoading, setImageLoading] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [receiptImageUrl, setReceiptImageUrl] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      loadTripDetail()
    }
  }, [id])

  useEffect(() => {
    // Reset image states when modal closes
    if (!selectedReceipt && receiptImageUrl) {
      window.URL.revokeObjectURL(receiptImageUrl)
      setReceiptImageUrl(null)
    }
  }, [selectedReceipt])

  const loadTripDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const tripResponse = await tripAPI.getById(parseInt(id!))
      const tripData = tripResponse.data.data
      setTrip(tripData)

      try {
        const receiptsResponse = await receiptAPI.getAll({ trip_id: parseInt(id!) })
        if (receiptsResponse?.data?.data) {
          setReceipts(Array.isArray(receiptsResponse.data.data) ? receiptsResponse.data.data : [])
        } else {
          setReceipts([])
        }
      } catch (receiptError) {
        console.log('No receipts found:', receiptError)
        setReceipts([])
      }
    } catch (err: any) {
      console.error('Failed to load trip detail:', err)
      setError('Failed to load trip details')
    } finally {
      setIsLoading(false)
    }
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
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewReceipt = async (receipt: Receipt) => {
    try {
      setSelectedReceipt(receipt)
      setImageLoading(true)
      setImageError(false)
      setReceiptImageUrl(null)
      
      // ✅ Download image as blob via API (same as TripSettlementReview)
      const response = await receiptAPI.download(receipt.receipt_id)
      const blob = response.data
      const imageUrl = window.URL.createObjectURL(blob)
      
      setReceiptImageUrl(imageUrl)
      setImageLoading(false)
    } catch (error) {
      console.error('Failed to load receipt:', error)
      setImageError(true)
      setImageLoading(false)
    }
  }

  const handleCloseModal = () => {
    // Cleanup blob URL
    if (receiptImageUrl) {
      window.URL.revokeObjectURL(receiptImageUrl)
    }
    setSelectedReceipt(null)
    setReceiptImageUrl(null)
    setImageLoading(false)
    setImageError(false)
  }

  const isTripExtended = trip?.extended_end_date ? true : false

  const isTripEndingSoon = (endDate: string, extendedEndDate?: string) => {
    const end = new Date(extendedEndDate || endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 2
  }

  const advanceAmount = Number(trip?.total_advance) || 0
  const spentAmount = Number(trip?.total_expenses) || 0
  const cashRemaining = advanceAmount - spentAmount
  const estimatedBudget = Number(trip?.estimated_budget) || 0
  const budgetUsagePercent = estimatedBudget > 0 ? (spentAmount / estimatedBudget) * 100 : 0

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Trip not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/finance-area')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Plane className="h-6 w-6" />
              {trip.trip_number}
            </h1>
            <p className="text-sm text-muted-foreground">Ongoing Trip Monitoring</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Active Trip
          </Badge>
          {isTripExtended && (
            <Badge className="bg-purple-100 text-purple-800">
              <Calendar className="w-3 h-3 mr-1" />
              Extended
            </Badge>
          )}
        </div>
      </div>

      {/* Extended Trip Alert */}
      {isTripExtended && (
        <Alert className="bg-purple-50 border-purple-200">
          <Calendar className="h-4 w-4 text-purple-600" />
          <AlertDescription>
            <p className="font-semibold text-purple-900 mb-2">🔄 Trip Has Been Extended</p>
            <div className="text-sm text-purple-800 space-y-1">
              <p><strong>Original End Date:</strong> {formatDate(trip.end_date)}</p>
              <p><strong>New End Date:</strong> {formatDate(trip.extended_end_date!)}</p>
              {trip.extension_reason && (
                <p className="mt-2"><strong>Reason:</strong> {trip.extension_reason}</p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Trip Ending Soon Alert */}
      {isTripEndingSoon(trip.end_date, trip.extended_end_date) && (
        <Alert className="bg-orange-50 border-orange-200">
          <Clock className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>⏰ Trip Ending Soon!</strong> This trip will end on{' '}
            <strong>{formatDate(trip.extended_end_date || trip.end_date)}</strong>. 
            Employee should prepare receipts for settlement.
          </AlertDescription>
        </Alert>
      )}

      {/* Over Budget Warning */}
      {spentAmount > estimatedBudget && (
        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>⚠️ Over Budget!</strong> Actual expenses ({formatCurrency(spentAmount)}) 
            exceeded estimated budget ({formatCurrency(estimatedBudget)}) by{' '}
            <strong>{formatCurrency(spentAmount - estimatedBudget)}</strong>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column - Trip & Employee Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Trip Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Trip Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{trip.destination}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Purpose</p>
                      <p className="font-medium">{trip.purpose}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Trip Period</p>
                      <p className="font-medium">
                        {formatDate(trip.start_date)} - {formatDate(trip.extended_end_date || trip.end_date)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ({trip.duration} days{isTripExtended ? ' + extended' : ''})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Created At</p>
                      <p className="font-medium">{formatDateTime(trip.created_at)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Information Card */}
          {trip.user && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserIcon className="h-5 w-5" />
                  Employee Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{trip.user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">NIK</p>
                      <p className="font-medium">{trip.user.nik}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Department</p>
                      <p className="font-medium">{trip.user.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-medium">{trip.user.position}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Receipts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ReceiptIcon className="h-5 w-5" />
                Uploaded Receipts
                <Badge variant="secondary" className="ml-2">
                  {receipts.length} {receipts.length === 1 ? 'receipt' : 'receipts'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {receipts.length === 0 ? (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription>
                    No receipts uploaded yet. Employee can upload receipts during or after the trip.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  {receipts.map((receipt) => (
                    <div
                      key={receipt.receipt_id}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {receipt.category}
                            </Badge>
                            <Badge
                              variant={receipt.status === 'approved' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {receipt.status}
                            </Badge>
                          </div>
                          <p className="font-semibold text-lg text-blue-600">
                            {formatCurrency(receipt.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {receipt.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            📅 {formatDate(receipt.receipt_date)} • Uploaded: {formatDateTime(receipt.created_at)}
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewReceipt(receipt)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Budget Breakdown */}
        <div className="space-y-6">
          {/* Budget Reference Card */}
          <Card className="border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                Budget Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Budget (Limit)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(estimatedBudget)}
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget Usage</span>
                  <span className="font-medium">{budgetUsagePercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      budgetUsagePercent > 100
                        ? 'bg-red-500'
                        : budgetUsagePercent > 80
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(budgetUsagePercent, 100)}%` }}
                  />
                </div>
              </div>

              {budgetUsagePercent > 100 && (
                <Alert className="bg-red-50 border-red-200 py-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-xs text-red-800">
                    Over budget by {formatCurrency(spentAmount - estimatedBudget)}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Cash Flow Card (PRIMARY) */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Wallet className="h-4 w-4 text-green-600" />
                Cash Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Advanced */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Advanced (Money Given)</p>
                <p className="text-xl font-bold text-green-700">
                  {advanceAmount > 0 ? formatCurrency(advanceAmount) : 'None'}
                </p>
              </div>

              {/* Spent */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Spent (Receipts)</p>
                <p className="text-xl font-bold text-gray-900">
                  {spentAmount > 0 ? formatCurrency(spentAmount) : 'None'}
                </p>
              </div>

              <div className="border-t border-green-200 pt-4">
                {advanceAmount === 0 && spentAmount === 0 && (
                  <Alert className="bg-blue-50 border-blue-200 py-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-xs text-blue-800">
                      No advance disbursed yet. Employee may request advance or use personal funds.
                    </AlertDescription>
                  </Alert>
                )}

                {advanceAmount > 0 && spentAmount === 0 && (
                  <Alert className="bg-blue-50 border-blue-200 py-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-xs text-blue-800">
                      <strong>Advance Money Available: {formatCurrency(advanceAmount)}</strong>
                      <br />
                      ℹ️ No expenses recorded yet
                    </AlertDescription>
                  </Alert>
                )}

                {cashRemaining > 0 && spentAmount > 0 && (
                  <Alert className="bg-green-50 border-green-200 py-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-xs text-green-800">
                      <strong>Advance Money Available: {formatCurrency(cashRemaining)}</strong>
                      <br />
                      {cashRemaining < advanceAmount * 0.2 && '⚠️ Advance running low - may need additional'}
                      {cashRemaining >= advanceAmount * 0.2 && '✅ Advance still available for expenses'}
                    </AlertDescription>
                  </Alert>
                )}

                {cashRemaining === 0 && advanceAmount > 0 && (
                  <Alert className="bg-gray-50 border-gray-200 py-2">
                    <CheckCircle2 className="h-4 w-4 text-gray-600" />
                    <AlertDescription className="text-xs text-gray-800">
                      <strong>All advance money has been used</strong>
                      <br />
                      ✅ No settlement needed for advance
                    </AlertDescription>
                  </Alert>
                )}

                {cashRemaining < 0 && (
                  <Alert className="bg-orange-50 border-orange-200 py-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-xs text-orange-800">
                      <strong>Used Personal Funds: {formatCurrency(Math.abs(cashRemaining))}</strong>
                      <br />
                      💰 Employee will receive reimbursement
                    </AlertDescription>
                  </Alert>
                )}

                {advanceAmount === 0 && spentAmount > 0 && (
                  <Alert className="bg-orange-50 border-orange-200 py-2">
                    <DollarSign className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-xs text-orange-800">
                      <strong>No Advance Given</strong>
                      <br />
                      💰 Employee used personal funds. Will receive {formatCurrency(spentAmount)} reimbursement.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ✅ Receipt Image Modal - WITH BLOB URL */}
      {selectedReceipt && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Sticky */}
            <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{selectedReceipt.category}</h3>
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(selectedReceipt.amount)} • {formatDate(selectedReceipt.receipt_date)}
                </p>
                {selectedReceipt.description && (
                  <p className="text-xs text-muted-foreground mt-1">{selectedReceipt.description}</p>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCloseModal}
                className="ml-4"
              >
                <span className="text-xl">×</span>
              </Button>
            </div>

            {/* Image Container - Scrollable */}
            <div className="p-4 bg-gray-50 overflow-auto max-h-[calc(90vh-120px)]">
              <div className="flex items-center justify-center min-h-[400px] relative">
                {/* Loading Spinner */}
                {imageLoading && !imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-sm text-muted-foreground">Loading image...</p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {imageError && (
                  <div className="text-center p-8 bg-red-50 rounded-lg border border-red-200">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-red-700 mb-2">Failed to load image</p>
                    <p className="text-sm text-red-600 mb-4">
                      The receipt image could not be loaded
                    </p>
                    <p className="text-xs text-muted-foreground font-mono bg-white p-2 rounded border">
                      Receipt ID: {selectedReceipt.receipt_id}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => handleViewReceipt(selectedReceipt)}
                    >
                      Try Again
                    </Button>
                  </div>
                )}

                {/* ✅ Image - Using Blob URL */}
                {!imageError && receiptImageUrl && (
                  <img
                    src={receiptImageUrl}
                    alt={`Receipt - ${selectedReceipt.category}`}
                    className="max-w-full h-auto rounded border shadow-lg"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}