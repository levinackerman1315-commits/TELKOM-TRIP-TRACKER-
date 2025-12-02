
// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { 
//   ArrowLeft, 
//   DollarSign, 
//   FileText,
//   Clock,
//   Receipt as ReceiptIcon,
//   CreditCard,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Calendar,
//   PlusCircle,
//   Info 
// } from 'lucide-react'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Trip, Advance, Receipt } from '@/types'
// import { AdvanceStatusTracker } from '@/components/employee/AdvanceStatusTracker'
// import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

// const getStatusBadge = (status: string, isCurrentlyExtended: boolean) => {
//   // ✅ Show extended badge if trip has been extended
//   if (isCurrentlyExtended) {
//     return (
//       <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 gap-1">
//         <Calendar className="w-3 h-3" />
//         Extended
//       </Badge>
//     )
//   }

//   const statusMap: Record<string, { variant: any; icon: any; label: string }> = {
//     active: { variant: 'default', icon: CheckCircle2, label: 'Active' },
//     awaiting_review: { variant: 'secondary', icon: Clock, label: 'Awaiting Review' },
//     under_review_regional: { variant: 'secondary', icon: AlertCircle, label: 'Under Review (Regional)' },
//     completed: { variant: 'outline', icon: CheckCircle2, label: 'Completed' },
//     cancelled: { variant: 'destructive', icon: XCircle, label: 'Cancelled' },
//   }
  
//   const status_info = statusMap[status] || statusMap.active
//   const Icon = status_info.icon
  
//   return (
//     <Badge variant={status_info.variant} className="gap-1">
//       <Icon className="w-3 h-3" />
//       {status_info.label}
//     </Badge>
//   )
// }

// const getAdvanceStatusBadge = (status: string) => {
//   const statusMap: Record<string, { color: string; label: string }> = {
//     pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
//     approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved by Area' },
//     approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved by Regional' },
//     completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
//     rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
//     voided: { color: 'bg-gray-100 text-gray-800', label: 'Voided' },
//   }
  
//   const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
  
//   return <Badge className={color}>{label}</Badge>
// }

// export default function TripDetail() {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()

//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [advances, setAdvances] = useState<Advance[]>([])
//   const [receipts, setReceipts] = useState<Receipt[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isCancellingExtension, setIsCancellingExtension] = useState(false)
  
//   const [showSubmitModal, setShowSubmitModal] = useState(false)
//   const [submitModalData, setSubmitModalData] = useState({
//     balance: 0,
//     approvedTotal: 0,
//     receiptsTotal: 0
//   })

//   useEffect(() => {
//     if (id) {
//       fetchTripDetail()
//     }
//   }, [id])

//   const fetchTripDetail = async () => {
//     try {
//       setIsLoading(true)
      
//       const tripResponse = await tripAPI.getById(Number(id))
//       setTrip(tripResponse.data.data)

//       const advancesResponse = await tripAPI.getAdvances(Number(id))
//       setAdvances(advancesResponse.data.data || [])

//       const receiptsResponse = await receiptAPI.getAll({ trip_id: id })
//       setReceipts(receiptsResponse.data.data || [])

//     } catch (error: any) {
//       console.error('Failed to fetch trip detail:', error)
//       if (error.response?.status === 404) {
//         setTrip(null)
//       }
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
//     try {
//       if (!dateString) return 'Invalid Date';
//       const date = new Date(dateString)
//       if (isNaN(date.getTime())) {
//         return 'Invalid Date'
//       }
//       return date.toLocaleDateString('id-ID', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//       })
//     } catch (error) {
//       return 'Invalid Date'
//     }
//   }

//   const handleCancelTrip = async () => {
//     if (!window.confirm('Are you sure you want to cancel this trip? All pending advances will be deleted.')) {
//       return
//     }

//     try {
//       await tripAPI.cancel(Number(id))
//       alert('Trip cancelled successfully')
//       navigate('/employee/dashboard')
//     } catch (error: any) {
//       console.error('Failed to cancel trip:', error)
//       const errorMessage = error.response?.data?.message || 'Failed to cancel trip'
//       alert(errorMessage)
//     }
//   }

//   const handleSubmitForReview = async () => {
//     try {
//       await tripAPI.submit(Number(id))
//       alert('Trip submitted for review successfully')
//       fetchTripDetail()
//     } catch (error: any) {
//       console.error('Failed to submit trip:', error)
//       alert(error.response?.data?.message || 'Failed to submit trip')
//     }
//   }

//   const handleCancelExtension = async () => {
//     if (!window.confirm('Are you sure you want to cancel the trip extension?')) {
//       return
//     }

//     try {
//       setIsCancellingExtension(true)
//       const response = await tripAPI.cancelExtension(Number(id))
      
//       if (response.success) {
//         alert('Extension cancelled successfully!')
//         fetchTripDetail()
//       } else {
//         alert(response.message || 'Failed to cancel extension')
//       }
//     } catch (error: any) {
//       console.error('Error cancelling extension:', error)
//       alert(error.response?.data?.message || 'Failed to cancel extension')
//     } finally {
//       setIsCancellingExtension(false)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading trip detail...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!trip) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-2">Trip Not Found</h2>
//           <p className="text-muted-foreground mb-4">The trip you're looking for doesn't exist.</p>
//           <Button onClick={() => navigate('/employee/dashboard')}>
//             Back to Dashboard
//           </Button>
//         </div>
//       </div>
//     )
//   }

//   // ===== FINANCIAL CALCULATIONS =====
//   const requestedAdvanceTotal = advances
//     .filter(a => !['rejected', 'voided'].includes(a.status))
//     .reduce((sum, a) => sum + Number(a.requested_amount || 0), 0)

//   const approvedAdvanceTotal = advances
//     .filter(a => ['approved_area', 'completed'].includes(a.status))
//     .reduce((sum, a) => sum + Number(a.approved_amount || 0), 0)

//   const totalReceipts = receipts.reduce((sum, r) => sum + Number(r.amount || 0), 0)
//   const balance = approvedAdvanceTotal - totalReceipts
//   const estimatedBudget = trip.estimated_budget || 0

//   // ===== DATE CALCULATIONS =====
//   const currentDate = new Date()
//   currentDate.setHours(0, 0, 0, 0)

//   const startDate = new Date(trip.start_date)
//   startDate.setHours(0, 0, 0, 0)

//   const originalEndDate = new Date(trip.end_date)
//   originalEndDate.setHours(0, 0, 0, 0)

//   const extendedEndDate = trip.extended_end_date ? new Date(trip.extended_end_date) : null
//   if (extendedEndDate) extendedEndDate.setHours(0, 0, 0, 0)

//   const hasBeenExtended = !!trip.extended_end_date
//   const isCurrentlyExtended = hasBeenExtended && extendedEndDate && currentDate < extendedEndDate

//   const activeEndDate = extendedEndDate || originalEndDate

//   const isTripStarted = currentDate >= startDate
//   const isTripEnded = currentDate > activeEndDate

//   // ===== BUTTON STATES =====
//   const canRequestAdvance = trip.status === 'active' && (!isTripEnded || isCurrentlyExtended)
//   const canUploadReceipt = trip.status === 'active' && isTripEnded && !isCurrentlyExtended
//   const canRequestExtension = trip.status === 'active' && !(isTripEnded && !isCurrentlyExtended && receipts.length > 0)
//   const canCancelExtension = trip.status === 'active' && isCurrentlyExtended
//   const canSubmitForReview = trip.status === 'active' && isTripEnded && !isCurrentlyExtended && receipts.length > 0
//   const canCancelTrip = trip.status === 'active' 

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
//           <div className="flex items-start justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">{trip.destination}</h1>
//               <p className="text-sm text-white/80">Trip #{trip.trip_number}</p>
//             </div>
//             {getStatusBadge(trip.status, isCurrentlyExtended)}
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="space-y-6">
//             {/* Trip Information Card */}
//             <Card className="shadow-soft">
//               <CardHeader>
//                 <CardTitle className="text-lg">Trip Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
//                     <FileText className="h-4 w-4" />
//                     Purpose
//                   </label>
//                   <p className="text-sm">{trip.purpose}</p>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
//                     <p className="text-sm font-medium">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground mb-1 block">
//                       {hasBeenExtended ? 'Extended End Date' : 'End Date'}
//                     </label>
//                     <p className="text-sm font-medium">{formatDate(trip.extended_end_date || trip.end_date)}</p>
//                     {hasBeenExtended && (
//                       <p className="text-xs text-purple-600 mt-1">
//                         Original: {formatDate(trip.end_date)}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
//                     <Clock className="h-4 w-4" />
//                     Duration
//                   </label>
//                   <p className="text-sm font-medium">{trip.duration} days</p>
//                   {hasBeenExtended && trip.extended_end_date && (
//                     <p className="text-xs text-purple-600 mt-1">
//                       + {Math.ceil((new Date(trip.extended_end_date).getTime() - new Date(trip.end_date).getTime()) / (1000 * 60 * 60 * 24))} days extended
//                     </p>
//                   )}
//                 </div>

//                 {trip.extended_end_date && (
//                   <div className="pt-3 border-t">
//                     <label className="text-xs text-muted-foreground mb-1 block">Trip Extended Until</label>
//                     <p className="text-sm font-medium text-warning">{formatDate(trip.extended_end_date)}</p>
//                     {trip.extension_reason && (
//                       <p className="text-xs text-muted-foreground mt-1">{trip.extension_reason}</p>
//                     )}
                    
//                     {canCancelExtension && (
//                       <Button 
//                         variant="outline" 
//                         size="sm"
//                         onClick={handleCancelExtension}
//                         disabled={isCancellingExtension}
//                         className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 w-full"
//                       >
//                         {isCancellingExtension ? (
//                           <>
//                             <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
//                             Cancelling...
//                           </>
//                         ) : (
//                           <>
//                             <XCircle className="w-4 h-4 mr-2" />
//                             Cancel Extension
//                           </>
//                         )}
//                       </Button>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Financial Summary Card */}
//             <Card className="shadow-soft">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <DollarSign className="h-5 w-5" />
//                   Financial Summary
//                 </CardTitle>
//                 <CardDescription>Overview of budget, advances, and expenses</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Estimated Budget</span>
//                   <span className="text-sm font-semibold">{formatCurrency(estimatedBudget)}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Requested Advance Total</span>
//                   <span className="text-sm font-semibold text-warning">{formatCurrency(requestedAdvanceTotal)}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Approved Advance Total</span>
//                   <span className="text-sm font-semibold text-primary">{formatCurrency(approvedAdvanceTotal)}</span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Total Expenses</span>
//                   <span className="text-sm font-semibold text-success">{formatCurrency(totalReceipts)}</span>
//                 </div>

//                 <div className="pt-3 border-t flex justify-between items-center">
//                   <span className="text-sm font-semibold">Balance (Approved - Expenses)</span>
//                   <span className={`text-sm font-bold ${
//                     balance > 0 
//                       ? 'text-warning'
//                       : balance < 0 
//                       ? 'text-purple-600'
//                       : 'text-muted-foreground'
//                   }`}>
//                     {formatCurrency(balance)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Remaining Budget (Est - Expenses)</span>
//                   <span className="text-sm font-semibold">
//                     {formatCurrency(Math.max(estimatedBudget - totalReceipts, 0))}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Actions Card */}
//             <Card className="shadow-soft">
//               <CardHeader>
//                 <CardTitle className="text-lg">Actions</CardTitle>
//                 <CardDescription>
//                   {trip.status === 'completed' 
//                     ? 'Trip completed successfully.' 
//                     : trip.status === 'cancelled'
//                     ? 'Trip was cancelled.'
//                     : trip.status === 'awaiting_review'
//                     ? 'Your trip is being reviewed by Finance Area.'
//                     : trip.status === 'under_review_regional'
//                     ? 'Trip is under review by Finance Regional. Please wait for approval.'
//                     : hasBeenExtended
//                     ? isCurrentlyExtended
//                       ? 'Trip is extended. You can request additional advances during extension.'
//                       : 'Extension period ended. Upload receipts to complete settlement.'
//                     : isTripEnded 
//                     ? 'Trip has ended. Upload receipts and submit for review.' 
//                     : 'Manage your trip activities'
//                   }
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {/* ===== SCENARIO ALERTS ===== */}
                
//                 {/* SCENARIO: Currently Extended */}
//                 {trip.status === 'active' && isCurrentlyExtended && (
//                   <Alert className="mb-4 bg-purple-50 border-purple-200">
//                     <Calendar className="h-4 w-4 text-purple-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-purple-900 mb-2">🔄 Trip Extended</p>
//                       <div className="text-sm text-purple-800 space-y-1">
//                         <p>
//                           <strong>Original End:</strong> {formatDate(trip.end_date)}
//                         </p>
//                         <p>
//                           <strong>Extended Until:</strong> {formatDate(trip.extended_end_date!)}
//                         </p>
//                         {trip.extension_reason && (
//                           <p className="mt-2">
//                             <strong>Reason:</strong> {trip.extension_reason}
//                           </p>
//                         )}
//                         <p className="mt-2 text-xs">
//                           💰 You can request additional advances during extension.
//                         </p>
//                         <p className="text-xs">
//                           📸 Receipt upload locked until extension end date.
//                         </p>
//                       </div>
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* SCENARIO 1: Trip Ended - No Advance */}
//                 {trip.status === 'active' && isTripEnded && !isCurrentlyExtended && advances.length === 0 && (
//                   <Alert className="mb-4 bg-yellow-50 border-yellow-200">
//                     <Info className="h-4 w-4 text-yellow-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-yellow-900 mb-2">💡 No Advance Requested</p>
//                       <p className="text-sm text-yellow-800">
//                         You didn't request advance. After uploading receipts and approval, 
//                         you will receive <strong>full reimbursement</strong>.
//                       </p>
//                       <p className="text-xs text-yellow-700 mt-2">
//                         💰 Upload receipts now to start reimbursement.
//                       </p>
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* SCENARIO 2: Trip Active - No Advance Yet */}
//                 {trip.status === 'active' && !isTripEnded && !isCurrentlyExtended && isTripStarted && advances.length === 0 && (
//                   <Alert className="mb-4 bg-blue-50 border-blue-200">
//                     <Info className="h-4 w-4 text-blue-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-blue-900 mb-2">💡 Advance Reminder</p>
//                       <p className="text-sm text-blue-800">
//                         No advance requested yet. Request before trip ends if needed.
//                       </p>
//                       <p className="text-xs text-blue-700 mt-2">
//                         ℹ️ Or use personal funds and get full reimbursement later.
//                       </p>
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* SCENARIO 3: Advance Balance Low */}
//                 {trip.status === 'active' && !isTripEnded && !isCurrentlyExtended && approvedAdvanceTotal > 0 && 
//                 totalReceipts > 0 && (approvedAdvanceTotal - totalReceipts) < (approvedAdvanceTotal * 0.2) && (
//                   <Alert className="mb-4 bg-orange-50 border-orange-200">
//                     <AlertCircle className="h-4 w-4 text-orange-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-orange-900 mb-2">⚠️ Balance Running Low</p>
//                       <p className="text-sm text-orange-800">
//                         Remaining: <strong>{formatCurrency(approvedAdvanceTotal - totalReceipts)}</strong>
//                       </p>
//                       <p className="text-xs text-orange-700 mt-2">
//                         Request additional advance if needed.
//                       </p>
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* SCENARIO 4: Ready to Submit */}
//                 {trip.status === 'active' && isTripEnded && !isCurrentlyExtended && receipts.length > 0 && (
//                   <Alert className="mb-4 bg-green-50 border-green-200">
//                     <CheckCircle2 className="h-4 w-4 text-green-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-green-900 mb-2">✅ Ready for Review</p>
//                       <p className="text-sm text-green-800">
//                         {receipts.length} receipt(s) uploaded. Ready to submit!
//                       </p>
//                       {balance < 0 && (
//                         <p className="text-xs text-green-700 mt-2">
//                           💰 Reimbursement: <strong>{formatCurrency(Math.abs(balance))}</strong>
//                         </p>
//                       )}
//                       {balance > 0 && (
//                         <p className="text-xs text-green-700 mt-2">
//                           💸 Return: <strong>{formatCurrency(balance)}</strong>
//                         </p>
//                       )}
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* SCENARIO 5: No Receipts Warning */}
//                 {trip.status === 'active' && isTripEnded && !isCurrentlyExtended && receipts.length === 0 && advances.length > 0 && (
//                   <Alert className="mb-4 bg-red-50 border-red-200">
//                     <AlertCircle className="h-4 w-4 text-red-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-red-900 mb-2">⚠️ No Receipts Uploaded</p>
//                       <p className="text-sm text-red-800">
//                         Trip ended but no receipts uploaded yet.
//                       </p>
//                       <p className="text-xs text-red-700 mt-2">
//                         📸 Upload receipts to complete settlement.
//                       </p>
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* SCENARIO 6: Can Extend */}
//                 {trip.status === 'active' && isTripEnded && !isCurrentlyExtended && receipts.length === 0 && (
//                   <Alert className="mb-4 bg-indigo-50 border-indigo-200">
//                     <Calendar className="h-4 w-4 text-indigo-600" />
//                     <AlertDescription>
//                       <p className="font-semibold text-indigo-900 mb-2">⏳ Trip Ended</p>
//                       <p className="text-sm text-indigo-800">
//                         Extend if more time needed, or upload receipts to finish.
//                       </p>
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* ===== ACTION BUTTONS ===== */}

//             // ✅ SOLUSI TERBAIK - Check sebelum ke form

// {(trip.status === 'completed' || trip.status === 'cancelled') && (
//   <div>
//     <Button
//       onClick={async () => {
//         try {
//           // ✅ Check dulu apakah ada trip aktif
//           const response = await tripAPI.getAll()
//           const allTrips = (response.data.data || []) as Trip[]
          
//           const activeTrip = allTrips.find(t => 
//             !['completed', 'cancelled'].includes(t.status)
//           )
          
//           if (activeTrip) {
//             // ⚠️ Ada trip aktif - Show detailed alert
//             const confirmMsg = `⚠️ You already have an active trip!\n\n` +
//               `Trip: ${activeTrip.trip_number}\n` +
//               `Destination: ${activeTrip.destination}\n` +
//               `Status: ${activeTrip.status}\n\n` +
//               `Complete this trip first before starting a new one.\n\n` +
//               `Go to active trip now?`
            
//             if (window.confirm(confirmMsg)) {
//               navigate(`/employee/trips/${activeTrip.trip_id}`)
//             }
//           } else {
//             // ✅ Tidak ada trip aktif - Boleh create
//             navigate('/employee/trips/new')
//           }
//         } catch (error) {
//           console.error('Failed to check trips:', error)
//           // ⚠️ Kalau error check, tetap boleh navigate (fail-safe)
//           navigate('/employee/trips/new')
//         }
//       }}
//       className={`w-full ${
//         trip.status === 'completed' 
//           ? 'bg-green-600 hover:bg-green-700' 
//           : 'bg-red-600 hover:bg-red-700'
//       }`}
//     >
//       <PlusCircle className="w-4 h-4 mr-2" />
//       Start New Trip
//     </Button>
    
//     <p className="text-xs text-muted-foreground mt-2 text-center">
//       ℹ️ You can only have one active trip at a time
//     </p>
//   </div>
// )}
//                 {trip.status === 'active' && (
//                   <>
//                     {/* Request Advance Button */}
//                     <div>
//                       <Button
//                         onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}
//                         className="w-full"
//                         variant="default"
//                         disabled={!canRequestAdvance}
//                       >
//                         <CreditCard className="w-4 h-4 mr-2" />
//                         Request Advance
//                         {isCurrentlyExtended && (
//                           <span className="ml-2 text-xs">(Extended)</span>
//                         )}
//                       </Button>
//                     </div>

//                     {/* Upload Receipt Button */}
//                     <Button
//                       onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}
//                       className="w-full"
//                       variant="outline"
//                       disabled={!canUploadReceipt}
//                     >
//                       <ReceiptIcon className="w-4 mr-2" />
//                       Upload Receipt
//                       {isCurrentlyExtended && (
//                         <span className="ml-2 text-xs text-purple-600">(Locked)</span>
//                       )}
//                     </Button>

//                     {/* Extend Trip Button */}
//                     <Button
//                       onClick={() => navigate(`/employee/trips/${trip.trip_id}/extension`)}
//                       className="w-full"
//                       variant="outline"
//                       disabled={!canRequestExtension}
//                     >
//                       <Calendar className="w-4 h-4 mr-2" />
//                       Extend Trip
//                       {hasBeenExtended && (
//                         <span className="ml-2 text-xs">(Extend Again)</span>
//                       )}
//                     </Button>

//                     {!canRequestExtension && isTripEnded && !isCurrentlyExtended && receipts.length > 0 && (
//                       <p className="text-xs text-warning mt-1 flex items-center gap-1">
//                         <AlertCircle className="w-3 h-3" />
//                         Cannot extend after uploading receipts
//                       </p>
//                     )}

//                     {/* Submit for Review Button */}
//                     <div>
//                       <Button
//                         onClick={() => {
//                           const approvedTotal = advances
//                             .filter(a => ['approved_area', 'completed'].includes(a.status))
//                             .reduce((sum, a) => sum + Number(a.approved_amount || 0), 0)
                          
//                           const receiptsTotal = receipts
//                             .reduce((sum, r) => sum + Number(r.amount || 0), 0)
                          
//                           const balance = approvedTotal - receiptsTotal
                          
//                           setSubmitModalData({ balance, approvedTotal, receiptsTotal })
//                           setShowSubmitModal(true)
//                         }}
//                         className="w-full"
//                         variant="secondary"
//                         disabled={!canSubmitForReview}
// >
// <CheckCircle2 className="w-4 h-4 mr-2" />
// Submit for Review
// </Button>
// {!canSubmitForReview && (
//                     <>
//                       {!isTripEnded && (
//                         <p className="text-xs text-muted-foreground mt-1">
//                           Available after {formatDate(activeEndDate.toISOString())}
//                         </p>
//                       )}
//                       {isTripEnded && !isCurrentlyExtended && receipts.length === 0 && (
//                         <p className="text-xs text-warning mt-1 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           Upload receipts first
//                         </p>
//                       )}
//                       {isCurrentlyExtended && (
//                         <p className="text-xs text-warning mt-1 flex items-center gap-1">
//                           <AlertCircle className="w-3 h-3" />
//                           Cancel extension first
//                         </p>
//                       )}
//                     </>
//                   )}
//                 </div>

//                 {/* Cancel Trip Button */}
//                 <Button
//                   onClick={handleCancelTrip}
//                   className="w-full"
//                   variant="destructive"
//                   disabled={!canCancelTrip}
//                 >
//                   <XCircle className="w-4 h-4 mr-2" />
//                   Cancel Trip
//                 </Button>
//               </>
//             )}

//             {trip.status === 'awaiting_review' && (
//               <div className="space-y-3">
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <div className="flex items-start gap-3">
//                     <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                     <div className="flex-1">
//                       <p className="font-medium text-blue-900 mb-2">✅ Submitted for Review</p>
                      
//                       <div className="bg-white rounded-lg p-3 border border-blue-200 mb-3">
//                         <p className="font-semibold text-blue-900 text-sm mb-2">📋 Next Steps:</p>
//                         <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
//                           <li>Bring <strong>physical receipts</strong> to Finance Area office</li>
//                           <li>Finance will verify receipts against photos</li>
//                           <li>Wait for approval notification</li>
//                         </ol>
//                       </div>

//                       <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
//                         <p className="text-xs text-yellow-800">
//                           ⚠️ <strong>Important:</strong> Physical receipts must be submitted to Finance Area
//                         </p>
//                       </div>

//                       <p className="text-xs text-muted-foreground mt-2">
//                         ℹ️ You cannot make changes while under review
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {trip.status === 'under_review_regional' && (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex items-start gap-3">
//                   <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="font-medium text-yellow-900">Under Regional Review</p>
//                     <p className="text-sm text-yellow-700 mt-1">
//                       Finance Regional reviewing for final approval.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>

//       {/* Right Column - Tabs */}
//       <div className="lg:col-span-2">
//         <Card className="shadow-soft">
//           <Tabs defaultValue="overview" className="w-full">
//             <CardHeader>
//               <TabsList className="grid w-full grid-cols-3">
//                 <TabsTrigger value="overview">Overview</TabsTrigger>
//                 <TabsTrigger value="advances">Advances ({advances.length})</TabsTrigger>
//                 <TabsTrigger value="receipts">Receipts ({receipts.length})</TabsTrigger>
//               </TabsList>
//             </CardHeader>

//             <CardContent>
//               {/* Overview Tab */}
//               <TabsContent value="overview" className="space-y-6">
//                 <div>
//                   <h4 className="font-semibold mb-3">Advance Status Tracker</h4>
//                   <AdvanceStatusTracker 
//                     advances={advances}
//                     tripStatus={trip.status}
//                     tripExtended={isCurrentlyExtended}
//                     extensionDate={trip.extended_end_date}
//                   />
//                 </div>

//                 <div>
//                   <h4 className="font-semibold mb-3">Trip Status Tracker</h4>
//                   <TripStatusTracker 
//                     currentStatus={trip.status} 
//                     history={trip.history || []}
//                   />
//                 </div>
//               </TabsContent>

//               {/* Advances Tab */}
//               <TabsContent value="advances" className="space-y-4">
//                 {advances.length === 0 ? (
//                   <div className="text-center py-8">
//                     <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                     <p className="text-muted-foreground mb-4">No advances yet</p>
//                     {canRequestAdvance && (
//                       <Button onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}>
//                         Request Advance
//                       </Button>
//                     )}
//                   </div>
//                 ) : (
//                   advances.map((advance) => (
//                     <Card key={advance.advance_id} className="border">
//                       <CardContent className="p-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <p className="font-medium">{advance.advance_number}</p>
//                             <p className="text-xs text-muted-foreground capitalize">{advance.request_type} Request</p>
//                           </div>
//                           {getAdvanceStatusBadge(advance.status)}
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-3 text-sm">
//                           <div>
//                             <p className="text-muted-foreground">Requested</p>
//                             <p className="font-semibold">{formatCurrency(advance.requested_amount)}</p>
//                           </div>
//                           {advance.approved_amount && (
//                             <div>
//                               <p className="text-muted-foreground">Approved</p>
//                               <p className="font-semibold text-success">{formatCurrency(advance.approved_amount)}</p>
//                             </div>
//                           )}
//                         </div>

//                         {advance.request_reason && (
//                           <p className="text-xs text-muted-foreground mt-2">{advance.request_reason}</p>
//                         )}
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </TabsContent>

//               {/* Receipts Tab */}
//               <TabsContent value="receipts" className="space-y-4">
//                 {receipts.length === 0 ? (
//                   <div className="text-center py-8">
//                     <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                     <p className="text-muted-foreground mb-4">No receipts yet</p>
//                     {canUploadReceipt && (
//                       <Button onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}>
//                         Upload Receipt
//                       </Button>
//                     )}
//                   </div>
//                 ) : (
//                   receipts.map((receipt) => (
//                     <Card key={receipt.receipt_id} className="border">
//                       <CardContent className="p-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <div>
//                             <p className="font-medium">{receipt.receipt_number}</p>
//                             <p className="text-xs text-muted-foreground capitalize">{receipt.category}</p>
//                           </div>
//                           <Badge variant={receipt.is_verified ? 'default' : 'secondary'}>
//                             {receipt.is_verified ? 'Verified' : 'Pending'}
//                           </Badge>
//                         </div>
                        
//                         <div className="space-y-2 text-sm">
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Amount</span>
//                             <span className="font-semibold">{formatCurrency(receipt.amount)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="text-muted-foreground">Date</span>
//                             <span>{formatDate(receipt.receipt_date)}</span>
//                           </div>
//                           {receipt.merchant_name && (
//                             <div className="flex justify-between">
//                               <span className="text-muted-foreground">Merchant</span>
//                               <span>{receipt.merchant_name}</span>
//                             </div>
//                           )}
//                         </div>

//                         {receipt.description && (
//                           <p className="text-xs text-muted-foreground mt-2">{receipt.description}</p>
//                         )}
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
//   </div>

//   {/* Submit Confirmation Modal */}
//   {showSubmitModal && (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
//         <div className="px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             {submitModalData.balance !== 0 ? (
//               <>
//                 <AlertCircle className="w-5 h-5 text-yellow-600" />
//                 Balance Check Before Submission
//               </>
//             ) : (
//               <>
//                 <CheckCircle2 className="w-5 h-5 text-green-600" />
//                 Confirm Submission
//               </>
//             )}
//           </h3>
//         </div>

//         <div className="px-6 py-4 space-y-4">
//           <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//             <p className="text-sm font-semibold text-gray-700 mb-3">📊 Summary:</p>
            
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600">Approved Advance:</span>
//               <span className="font-semibold text-green-600">
//                 {formatCurrency(submitModalData.approvedTotal)}
//               </span>
//             </div>
            
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600">Total Receipts:</span>
//               <span className="font-semibold text-blue-600">
//                 {formatCurrency(submitModalData.receiptsTotal)}
//               </span>
//             </div>
            
//             <div className="border-t pt-2 mt-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm font-semibold text-gray-700">
//                   {submitModalData.balance > 0 ? 'Remaining:' : 
//                    submitModalData.balance < 0 ? 'Over Budget:' : 'Balance:'}
//                 </span>
//                 <span className={`font-bold ${
//                   submitModalData.balance > 0 ? 'text-yellow-600' :
//                   submitModalData.balance < 0 ? 'text-red-600' :
//                   'text-green-600'
//                 }`}>
//                   {submitModalData.balance === 0 ? 'Exact Match ✅' :
//                    formatCurrency(Math.abs(submitModalData.balance))}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {submitModalData.balance > 0 && (
//             <Alert className="bg-yellow-50 border-yellow-200">
//               <AlertCircle className="h-4 w-4 text-yellow-600" />
//               <AlertDescription className="text-sm text-yellow-800">
//                 <p className="font-semibold mb-2">⚠️ You have {formatCurrency(submitModalData.balance)} remaining</p>
//                 <p className="text-xs mb-1">This could mean:</p>
//                 <ul className="text-xs space-y-1 ml-4 list-disc">
//                   <li>Leftover money to return to company</li>
//                   <li>Missing receipts to upload</li>
//                 </ul>
//               </AlertDescription>
//             </Alert>
//           )}

//           {submitModalData.balance < 0 && (
//             <Alert className="bg-red-50 border-red-200">
//               <AlertCircle className="h-4 w-4 text-red-600" />
//               <AlertDescription className="text-sm text-red-800">
//                 <p className="font-semibold mb-2">⚠️ You spent {formatCurrency(Math.abs(submitModalData.balance))} more than your advance</p>
//                 <p className="text-xs">This is okay if you used personal money for business expenses.</p>
//               </AlertDescription>
//             </Alert>
//           )}

//           {submitModalData.balance === 0 && (
//             <Alert className="bg-green-50 border-green-200">
//               <CheckCircle2 className="h-4 w-4 text-green-600" />
//               <AlertDescription className="text-sm text-green-800">
//                 <p className="font-semibold">✅ Perfect balance! Advance matches receipts exactly.</p>
//               </AlertDescription>
//             </Alert>
//           )}

//           <div className="bg-blue-50 border border-blue-200 rounded p-3">
//             <p className="text-xs text-blue-800">
//               ℹ️ <strong>After submission:</strong> You cannot upload more receipts or make changes. 
//               Please bring physical receipts to Finance Area for verification.
//             </p>
//           </div>
//         </div>

//         <div className="px-6 py-4 border-t flex gap-3">
//           <Button
//             onClick={() => setShowSubmitModal(false)}
//             variant="outline"
//             className="flex-1"
//           >
//             Go Back
//           </Button>
//           <Button
//             onClick={async () => {
//               setShowSubmitModal(false)
//               await handleSubmitForReview()
//             }}
//             className="flex-1"
//           >
//             Submit Anyway
//           </Button>
//         </div>
//       </div>
//     </div>
//   )}
// </div>
//   )}





import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft,
  ArrowRight, 
  DollarSign, 
  FileText,
  Clock,
  Receipt as ReceiptIcon,
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Calendar,
  PlusCircle,
  Info,
  MapPin
} from 'lucide-react'
import { tripAPI, receiptAPI } from '@/services/api'
import { Trip, Advance, Receipt } from '@/types'
import { AdvanceStatusTracker } from '@/components/employee/AdvanceStatusTracker'
import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

const getStatusBadge = (status: string, isCurrentlyExtended: boolean) => {
  if (isCurrentlyExtended) {
    return (
      <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 gap-1">
        <Calendar className="w-3 h-3" />
        Extended
      </Badge>
    )
  }

  const statusMap: Record<string, { variant: any; icon: any; label: string }> = {
    active: { variant: 'default', icon: CheckCircle2, label: 'Active' },
    awaiting_review: { variant: 'secondary', icon: Clock, label: 'Awaiting Review' },
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
    pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved by Area' },
    approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved by Regional' },
    completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
    rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
    voided: { color: 'bg-gray-100 text-gray-800', label: 'Voided' },
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
  const [isCancellingExtension, setIsCancellingExtension] = useState(false)
  
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [submitModalData, setSubmitModalData] = useState({
    balance: 0,
    approvedTotal: 0,
    receiptsTotal: 0
  })

  // ✅ NEW: State untuk modal active trip
  const [showActiveTripModal, setShowActiveTripModal] = useState(false)
  const [activeTripData, setActiveTripData] = useState<Trip | null>(null)

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

      const advancesResponse = await tripAPI.getAdvances(Number(id))
      setAdvances(advancesResponse.data.data || [])

      const receiptsResponse = await receiptAPI.getAll({ trip_id: id })
      setReceipts(receiptsResponse.data.data || [])

    } catch (error: any) {
      console.error('Failed to fetch trip detail:', error)
      if (error.response?.status === 404) {
        setTrip(null)
      }
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
    try {
      if (!dateString) return 'Invalid Date';
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        return 'Invalid Date'
      }
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch (error) {
      return 'Invalid Date'
    }
  }

  const handleCancelTrip = async () => {
    if (!window.confirm('Are you sure you want to cancel this trip? All pending advances will be deleted.')) {
      return
    }

    try {
      await tripAPI.cancel(Number(id))
      alert('Trip cancelled successfully')
      navigate('/employee/dashboard')
    } catch (error: any) {
      console.error('Failed to cancel trip:', error)
      const errorMessage = error.response?.data?.message || 'Failed to cancel trip'
      alert(errorMessage)
    }
  }

  const handleSubmitForReview = async () => {
    try {
      await tripAPI.submit(Number(id))
      alert('Trip submitted for review successfully')
      fetchTripDetail()
    } catch (error: any) {
      console.error('Failed to submit trip:', error)
      alert(error.response?.data?.message || 'Failed to submit trip')
    }
  }

  const handleCancelExtension = async () => {
    if (!window.confirm('Are you sure you want to cancel the trip extension?')) {
      return
    }

    try {
      setIsCancellingExtension(true)
      const response = await tripAPI.cancelExtension(Number(id))
      
      if (response.success) {
        alert('Extension cancelled successfully!')
        fetchTripDetail()
      } else {
        alert(response.message || 'Failed to cancel extension')
      }
    } catch (error: any) {
      console.error('Error cancelling extension:', error)
      alert(error.response?.data?.message || 'Failed to cancel extension')
    } finally {
      setIsCancellingExtension(false)
    }
  }

  // ✅ NEW: Handler untuk check active trip
  const handleStartNewTrip = async () => {
    try {
      const response = await tripAPI.getAll()
      const allTrips = (response.data.data || []) as Trip[]
      
      const activeTrip = allTrips.find(t => 
        !['completed', 'cancelled'].includes(t.status)
      )
      
      if (activeTrip) {
        // Ada trip aktif - show modal
        setActiveTripData(activeTrip)
        setShowActiveTripModal(true)
      } else {
        // Tidak ada trip aktif - boleh create
        navigate('/employee/trips/new')
      }
    } catch (error) {
      console.error('Failed to check trips:', error)
      // Fail-safe: tetap navigate jika error
      navigate('/employee/trips/new')
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

  // ===== FINANCIAL CALCULATIONS =====
  const requestedAdvanceTotal = advances
    .filter(a => !['rejected', 'voided'].includes(a.status))
    .reduce((sum, a) => sum + Number(a.requested_amount || 0), 0)

  const approvedAdvanceTotal = advances
    .filter(a => ['approved_area', 'completed'].includes(a.status))
    .reduce((sum, a) => sum + Number(a.approved_amount || 0), 0)

  const totalReceipts = receipts.reduce((sum, r) => sum + Number(r.amount || 0), 0)
  const balance = approvedAdvanceTotal - totalReceipts
  const estimatedBudget = trip.estimated_budget || 0

  // ===== DATE CALCULATIONS =====
  const currentDate = new Date()
  currentDate.setHours(0, 0, 0, 0)

  const startDate = new Date(trip.start_date)
  startDate.setHours(0, 0, 0, 0)

  const originalEndDate = new Date(trip.end_date)
  originalEndDate.setHours(0, 0, 0, 0)

  const extendedEndDate = trip.extended_end_date ? new Date(trip.extended_end_date) : null
  if (extendedEndDate) extendedEndDate.setHours(0, 0, 0, 0)

  const hasBeenExtended = !!trip.extended_end_date
  const isCurrentlyExtended = hasBeenExtended && extendedEndDate && currentDate < extendedEndDate

  const activeEndDate = extendedEndDate || originalEndDate

  const isTripStarted = currentDate >= startDate
  const isTripEnded = currentDate > activeEndDate

  // ===== BUTTON STATES =====
  const canRequestAdvance = trip.status === 'active' && (!isTripEnded || isCurrentlyExtended)
  const canUploadReceipt = trip.status === 'active' && isTripEnded && !isCurrentlyExtended
  const canRequestExtension = trip.status === 'active' && !(isTripEnded && !isCurrentlyExtended && receipts.length > 0)
  const canCancelExtension = trip.status === 'active' && isCurrentlyExtended
  const canSubmitForReview = trip.status === 'active' && isTripEnded && !isCurrentlyExtended && receipts.length > 0
  const canCancelTrip = trip.status === 'active'

  return (
    <>
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
              {getStatusBadge(trip.status, isCurrentlyExtended)}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Trip Information Card */}
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
                      <label className="text-xs text-muted-foreground mb-1 block">
                        {hasBeenExtended ? 'Extended End Date' : 'End Date'}
                      </label>
                      <p className="text-sm font-medium">{formatDate(trip.extended_end_date || trip.end_date)}</p>
                      {hasBeenExtended && (
                        <p className="text-xs text-purple-600 mt-1">
                          Original: {formatDate(trip.end_date)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-1">
                      <Clock className="h-4 w-4" />
                      Duration
                    </label>
                    <p className="text-sm font-medium">{trip.duration} days</p>
                    {hasBeenExtended && trip.extended_end_date && (
                      <p className="text-xs text-purple-600 mt-1">
                        + {Math.ceil((new Date(trip.extended_end_date).getTime() - new Date(trip.end_date).getTime()) / (1000 * 60 * 60 * 24))} days extended
                      </p>
                    )}
                  </div>

                  {trip.extended_end_date && (
                    <div className="pt-3 border-t">
                      <label className="text-xs text-muted-foreground mb-1 block">Trip Extended Until</label>
                      <p className="text-sm font-medium text-warning">{formatDate(trip.extended_end_date)}</p>
                      {trip.extension_reason && (
                        <p className="text-xs text-muted-foreground mt-1">{trip.extension_reason}</p>
                      )}
                      
                      {canCancelExtension && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleCancelExtension}
                          disabled={isCancellingExtension}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-2 w-full"
                        >
                          {isCancellingExtension ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancel Extension
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Financial Summary Card */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
                    <span className="text-sm text-muted-foreground">Total Expenses</span>
                    <span className="text-sm font-semibold text-success">{formatCurrency(totalReceipts)}</span>
                  </div>

                  <div className="pt-3 border-t flex justify-between items-center">
                    <span className="text-sm font-semibold">Balance (Approved - Expenses)</span>
                    <span className={`text-sm font-bold ${
                      balance > 0 
                        ? 'text-warning'
                        : balance < 0 
                        ? 'text-purple-600'
                        : 'text-muted-foreground'
                    }`}>
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

              {/* Actions Card */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                  <CardDescription>
                    {trip.status === 'completed' 
                      ? 'Trip completed successfully.' 
                      : trip.status === 'cancelled'
                      ? 'Trip was cancelled.'
                      : trip.status === 'awaiting_review'
                      ? 'Your trip is being reviewed by Finance Area.'
                      : trip.status === 'under_review_regional'
                      ? 'Trip is under review by Finance Regional. Please wait for approval.'
                      : hasBeenExtended
                      ? isCurrentlyExtended
                        ? 'Trip is extended. You can request additional advances during extension.'
                        : 'Extension period ended. Upload receipts to complete settlement.'
                      : isTripEnded 
                      ? 'Trip has ended. Upload receipts and submit for review.' 
                      : 'Manage your trip activities'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {/* ===== SCENARIO ALERTS ===== */}
                  
                  {/* SCENARIO: Currently Extended */}
                  {trip.status === 'active' && isCurrentlyExtended && (
                    <Alert className="mb-4 bg-purple-50 border-purple-200">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <AlertDescription>
                        <p className="font-semibold text-purple-900 mb-2">🔄 Trip Extended</p>
                        <div className="text-sm text-purple-800 space-y-1">
                          <p>
                            <strong>Original End:</strong> {formatDate(trip.end_date)}
                          </p>
                          <p>
                            <strong>Extended Until:</strong> {formatDate(trip.extended_end_date!)}
                          </p>
                          {trip.extension_reason && (
                            <p className="mt-2">
                              <strong>Reason:</strong> {trip.extension_reason}
                            </p>
                          )}
                          <p className="mt-2 text-xs">
                            💰 You can request additional advances during extension.
                          </p>
                          <p className="text-xs">
                            📸 Receipt upload locked until extension end date.
                          </p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Other scenario alerts... */}
                  {trip.status === 'active' && isTripEnded && !isCurrentlyExtended && advances.length === 0 && (
                    <Alert className="mb-4 bg-yellow-50 border-yellow-200">
                      <Info className="h-4 w-4 text-yellow-600" />
                      <AlertDescription>
                        <p className="font-semibold text-yellow-900 mb-2">💡 No Advance Requested</p>
                        <p className="text-sm text-yellow-800">
                          You didn't request advance. After uploading receipts and approval, 
                          you will receive <strong>full reimbursement</strong>.
                        </p>
                        <p className="text-xs text-yellow-700 mt-2">
                          💰 Upload receipts now to start reimbursement.
                        </p>
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* ===== ACTION BUTTONS ===== */}

                  {/* ✅ UPDATED: Start New Trip Button */}
                  {(trip.status === 'completed' || trip.status === 'cancelled') && (
                    <div>
                      <Button
                        onClick={handleStartNewTrip}
                        className={`w-full ${
                          trip.status === 'completed' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-red-600 hover:bg-red-700'
                        }`}
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Start New Trip
                      </Button>
                      
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        ℹ️ You can only have one active trip at a time
                      </p>
                    </div>
                  )}

                  {/* Active Trip Action Buttons */}
                  {trip.status === 'active' && (
                    <>
                      {/* Request Advance Button */}
                      <div>
                        <Button
                          onClick={() => navigate(`/employee/advances/new?trip_id=${trip.trip_id}`)}
                          className="w-full"
                          variant="default"
                          disabled={!canRequestAdvance}
                        >
                          <CreditCard className="w-4 h-4 mr-2" />
                          Request Advance
                          {isCurrentlyExtended && (
                            <span className="ml-2 text-xs">(Extended)</span>
                          )}
                        </Button>
                      </div>

                      {/* Upload Receipt Button */}
                      <Button
                        onClick={() => navigate(`/employee/receipts/new?trip_id=${trip.trip_id}`)}
                        className="w-full"
                        variant="outline"
                        disabled={!canUploadReceipt}
                      >
                        <ReceiptIcon className="w-4 mr-2" />
                        Upload Receipt
                        {isCurrentlyExtended && (
                          <span className="ml-2 text-xs text-purple-600">(Locked)</span>
                        )}
                      </Button>

                      {/* Extend Trip Button */}
                      <Button
                        onClick={() => navigate(`/employee/trips/${trip.trip_id}/extension`)}
                        className="w-full"
                        variant="outline"
                        disabled={!canRequestExtension}
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Extend Trip
                        {hasBeenExtended && (
                          <span className="ml-2 text-xs">(Extend Again)</span>
                        )}
                      </Button>

                      {!canRequestExtension && isTripEnded && !isCurrentlyExtended && receipts.length > 0 && (
                        <p className="text-xs text-warning mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Cannot extend after uploading receipts
                        </p>
                      )}

                      {/* Submit for Review Button */}
                      <div>
                        <Button
                          onClick={() => {
                            const approvedTotal = advances
                              .filter(a => ['approved_area', 'completed'].includes(a.status))
                              .reduce((sum, a) => sum + Number(a.approved_amount || 0), 0)
                            
                            const receiptsTotal = receipts
                              .reduce((sum, r) => sum + Number(r.amount || 0), 0)
                            
                            const balance = approvedTotal - receiptsTotal
                            
                            setSubmitModalData({ balance, approvedTotal, receiptsTotal })
                            setShowSubmitModal(true)
                          }}
                          className="w-full"
                          variant="secondary"
                          disabled={!canSubmitForReview}
                        >
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Submit for Review
                        </Button>
                        {!canSubmitForReview && (
                          <>
                            {!isTripEnded && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Available after {formatDate(activeEndDate.toISOString())}
                              </p>
                            )}
                            {isTripEnded && !isCurrentlyExtended && receipts.length === 0 && (
                              <p className="text-xs text-warning mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Upload receipts first
                              </p>
                            )}
                            {isCurrentlyExtended && (
                              <p className="text-xs text-warning mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                Cancel extension first
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* Cancel Trip Button */}
                      <Button
                        onClick={handleCancelTrip}
                        className="w-full"
                        variant="destructive"
                        disabled={!canCancelTrip}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Trip
                      </Button>
                    </>
                  )}

                  {/* Awaiting Review Status */}
                  {trip.status === 'awaiting_review' && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-medium text-blue-900 mb-2">✅ Submitted for Review</p>
                            
                            <div className="bg-white rounded-lg p-3 border border-blue-200 mb-3">
                              <p className="font-semibold text-blue-900 text-sm mb-2">📋 Next Steps:</p>
                              <ol className="text-sm text-blue-800 space-y-1.5 list-decimal list-inside">
                                <li>Bring <strong>physical receipts</strong> to Finance Area office</li>
                                <li>Finance will verify receipts against photos</li>
                                <li>Wait for approval notification</li>
                              </ol>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                              <p className="text-xs text-yellow-800">
                                ⚠️ <strong>Important:</strong> Physical receipts must be submitted to Finance Area
                              </p>
                            </div>

                            <p className="text-xs text-muted-foreground mt-2">
                              ℹ️ You cannot make changes while under review
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Under Review Regional Status */}
                  {trip.status === 'under_review_regional' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-yellow-900">Under Regional Review</p>
                          <p className="text-sm text-yellow-700 mt-1">
                            Finance Regional reviewing for final approval.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
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
                        <h4 className="font-semibold mb-3">Advance Status Tracker</h4>
                        <AdvanceStatusTracker 
                          advances={advances}
                          tripStatus={trip.status}
                          tripExtended={isCurrentlyExtended}
                          extensionDate={trip.extended_end_date}
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Trip Status Tracker</h4>
                        <TripStatusTracker 
                          currentStatus={trip.status} 
                          history={trip.history || []}
                        />
                      </div>
                    </TabsContent>

                    {/* Advances Tab */}
                    <TabsContent value="advances" className="space-y-4">
                      {advances.length === 0 ? (
                        <div className="text-center py-8">
                          <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-muted-foreground mb-4">No advances yet</p>
                          {canRequestAdvance && (
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
                          {canUploadReceipt && (
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

                              {receipt.description && (
                                <p className="text-xs text-muted-foreground mt-2">{receipt.description}</p>
                              )}
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

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {submitModalData.balance !== 0 ? (
                    <>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      Balance Check Before Submission
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Confirm Submission
                    </>
                  )}
                </h3>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-3">📊 Summary:</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Approved Advance:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(submitModalData.approvedTotal)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Receipts:</span>
                    <span className="font-semibold text-blue-600">
                      {formatCurrency(submitModalData.receiptsTotal)}
                    </span>
                  </div>
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {submitModalData.balance > 0 ? 'Remaining:' : 
                         submitModalData.balance < 0 ? 'Over Budget:' : 'Balance:'}
                      </span>
                      <span className={`font-bold ${
                        submitModalData.balance > 0 ? 'text-yellow-600' :
                        submitModalData.balance < 0 ? 'text-red-600' :
                        'text-green-600'
                      }`}>
                        {submitModalData.balance === 0 ? 'Exact Match ✅' :
                         formatCurrency(Math.abs(submitModalData.balance))}
                      </span>
                    </div>
                  </div>
                </div>

                {submitModalData.balance > 0 && (
                  <Alert className="bg-yellow-50 border-yellow-200">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-sm text-yellow-800">
                      <p className="font-semibold mb-2">⚠️ You have {formatCurrency(submitModalData.balance)} remaining</p>
                      <p className="text-xs mb-1">This could mean:</p>
                      <ul className="text-xs space-y-1 ml-4 list-disc">
                        <li>Leftover money to return to company</li>
                        <li>Missing receipts to upload</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {submitModalData.balance < 0 && (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-sm text-red-800">
                      <p className="font-semibold mb-2">⚠️ You spent {formatCurrency(Math.abs(submitModalData.balance))} more than your advance</p>
                      <p className="text-xs">This is okay if you used personal money for business expenses.</p>
                    </AlertDescription>
                  </Alert>
                )}

                {submitModalData.balance === 0 && (
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-sm text-green-800">
                      <p className="font-semibold">✅ Perfect balance! Advance matches receipts exactly.</p>
                    </AlertDescription>
                  </Alert>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <p className="text-xs text-blue-800">
                    ℹ️ <strong>After submission:</strong> You cannot upload more receipts or make changes. 
                    Please bring physical receipts to Finance Area for verification.
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 border-t flex gap-3">
                <Button
                  onClick={() => setShowSubmitModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={async () => {
                    setShowSubmitModal(false)
                    await handleSubmitForReview()
                  }}
                  className="flex-1"
                >
                  Submit Anyway
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ✅ NEW: Active Trip Warning Modal */}
      {showActiveTripModal && activeTripData && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
            {/* Header dengan gradient merah */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-xl">
              <div className="flex items-center gap-3 text-white">
                <div className="bg-white/20 p-3 rounded-full">
                  <AlertCircle className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Active Trip Found</h3>
                  <p className="text-red-100 text-sm">Complete your current trip first</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              {/* Warning Message */}
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-800 font-medium">
                  ⚠️ You already have an active trip running
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Please complete or cancel it before starting a new one
                </p>
              </div>

              {/* Trip Details Card */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                  <span className="text-xs font-semibold text-gray-500 uppercase">Current Trip</span>
                  <Badge 
                    className={`
                      ${activeTripData.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      ${activeTripData.status === 'awaiting_review' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${activeTripData.status === 'under_review_regional' ? 'bg-blue-100 text-blue-800' : ''}
                    `}
                  >
                    {activeTripData.status === 'active' && '🟢 Active'}
                    {activeTripData.status === 'awaiting_review' && '🟡 Awaiting Review'}
                    {activeTripData.status === 'under_review_regional' && '🔵 Under Review'}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Trip Number</p>
                    <p className="font-semibold text-gray-900">{activeTripData.trip_number}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-semibold text-gray-900 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {activeTripData.destination}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Start Date</p>
                      <p className="text-sm font-medium text-gray-700">{formatDate(activeTripData.start_date)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="text-sm font-medium text-gray-700">
                        {formatDate(activeTripData.extended_end_date || activeTripData.end_date)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-800">
                  You can only have <strong>one active trip</strong> at a time. This ensures proper tracking and approval workflow.
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-xl flex gap-3">
              <Button
                onClick={() => setShowActiveTripModal(false)}
                variant="outline"
                className="flex-1 border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowActiveTripModal(false)
                  navigate(`/employee/trips/${activeTripData.trip_id}`)
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Active Trip
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}