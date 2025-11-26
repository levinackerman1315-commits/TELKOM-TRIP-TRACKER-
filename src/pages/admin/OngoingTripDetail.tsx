// // // import { useState, useEffect } from 'react'
// // // import { useParams, useNavigate, Link } from 'react-router-dom'
// // // import { tripAPI, receiptAPI } from '@/services/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Badge } from '@/components/ui/badge'
// // // import { Alert, AlertDescription } from '@/components/ui/alert'
// // // import {
// // //   ArrowLeft,
// // //   Plane,
// // //   MapPin,
// // //   Calendar,
// // //   DollarSign,
// // //   User as UserIcon,
// // //   Briefcase,
// // //   Building2,
// // //   Clock,
// // //   TrendingUp,
// // //   Receipt as ReceiptIcon,
// // //   AlertCircle,
// // //   CheckCircle2,
// // //   AlertTriangle,
// // //   FileText,
// // //   Eye,
// // //   Download
// // // } from 'lucide-react'

// // // interface User {
// // //   user_id: number
// // //   name: string
// // //   email: string
// // //   nik: string
// // //   department: string
// // //   position: string
// // // }

// // // interface Trip {
// // //   trip_id: number
// // //   trip_number: string
// // //   user_id: number
// // //   destination: string
// // //   purpose: string
// // //   start_date: string
// // //   end_date: string
// // //   duration: number
// // //   status: string
// // //   estimated_budget: number
// // //   total_advance: number
// // //   total_expenses: number
// // //   created_at: string
// // //   user?: User
// // // }

// // // interface Receipt {
// // //   receipt_id: number
// // //   trip_id: number
// // //   category: string
// // //   amount: number
// // //   receipt_date: string
// // //   description: string
// // //   file_path: string
// // //   status: string
// // //   created_at: string
// // // }

// // // export default function OngoingTripDetail() {
// // //   const { id } = useParams<{ id: string }>()
// // //   const navigate = useNavigate()

// // //   const [trip, setTrip] = useState<Trip | null>(null)
// // //   const [receipts, setReceipts] = useState<Receipt[]>([])
// // //   const [isLoading, setIsLoading] = useState(true)
// // //   const [error, setError] = useState<string | null>(null)

// // //   useEffect(() => {
// // //     if (id) {
// // //       loadTripDetail()
// // //     }
// // //   }, [id])

// // //   const loadTripDetail = async () => {
// // //     try {
// // //       setIsLoading(true)
// // //       setError(null)

// // //       // Load trip data
// // //       const tripResponse = await tripAPI.getById(parseInt(id!))
// // //       const tripData = tripResponse.data.data
// // //       setTrip(tripData)

// // //       // Load receipts data using getAll with trip_id filter
// // //       try {
// // //         const receiptsResponse = await receiptAPI.getAll({ trip_id: parseInt(id!) })
// // //         if (receiptsResponse?.data?.data) {
// // //           setReceipts(Array.isArray(receiptsResponse.data.data) ? receiptsResponse.data.data : [])
// // //         } else {
// // //           setReceipts([])
// // //         }
// // //       } catch (receiptError) {
// // //         console.log('No receipts found or error loading receipts:', receiptError)
// // //         setReceipts([])
// // //       }
// // //     } catch (err: any) {
// // //       console.error('Failed to load trip detail:', err)
// // //       setError('Failed to load trip details')
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const formatCurrency = (amount: number) => {
// // //     return new Intl.NumberFormat('id-ID', {
// // //       style: 'currency',
// // //       currency: 'IDR',
// // //       minimumFractionDigits: 0,
// // //     }).format(amount)
// // //   }

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // //       day: 'numeric',
// // //       month: 'long',
// // //       year: 'numeric'
// // //     })
// // //   }

// // //   const formatDateTime = (dateString: string) => {
// // //     return new Date(dateString).toLocaleString('id-ID', {
// // //       day: 'numeric',
// // //       month: 'short',
// // //       year: 'numeric',
// // //       hour: '2-digit',
// // //       minute: '2-digit'
// // //     })
// // //   }

// // //   // Check if trip is ending soon
// // //   const isTripEndingSoon = (endDate: string) => {
// // //     const end = new Date(endDate)
// // //     const today = new Date()
// // //     const diffTime = end.getTime() - today.getTime()
// // //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// // //     return diffDays >= 0 && diffDays <= 2
// // //   }

// // //   // Get budget status
// // //   const getBudgetStatus = (estimated: number, expenses: number) => {
// // //     if (expenses === 0) return { label: 'No Expenses Yet', color: 'text-gray-600', bgColor: 'bg-gray-50', icon: ReceiptIcon }
    
// // //     const percentage = (expenses / estimated) * 100
    
// // //     if (percentage > 100) {
// // //       return { label: 'Over Budget', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertTriangle }
// // //     } else if (percentage > 80) {
// // //       return { label: 'Near Limit', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle }
// // //     } else {
// // //       return { label: 'On Track', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle2 }
// // //     }
// // //   }

// // //   const handleViewReceipt = (receipt: Receipt) => {
// // //     // Open receipt in new tab
// // //     window.open(`${import.meta.env.VITE_API_BASE_URL}/${receipt.file_path}`, '_blank')
// // //   }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="container max-w-7xl mx-auto py-8 flex items-center justify-center min-h-screen">
// // //         <div className="text-center">
// // //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
// // //           <p className="text-muted-foreground">Loading trip details...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   if (error || !trip) {
// // //     return (
// // //       <div className="container max-w-7xl mx-auto py-8">
// // //         <Button
// // //           variant="ghost"
// // //           onClick={() => navigate('/finance-area')}
// // //           className="mb-6"
// // //         >
// // //           <ArrowLeft className="mr-2 h-4 w-4" />
// // //           Back to Dashboard
// // //         </Button>

// // //         <Alert variant="destructive">
// // //           <AlertCircle className="h-4 w-4" />
// // //           <AlertDescription>
// // //             {error || 'Trip not found'}
// // //           </AlertDescription>
// // //         </Alert>
// // //       </div>
// // //     )
// // //   }

// // //   const budgetStatus = getBudgetStatus(Number(trip.estimated_budget) || 0, Number(trip.total_expenses) || 0)
// // //   const remaining = (Number(trip.estimated_budget) || 0) - (Number(trip.total_expenses) || 0)
// // //   const BudgetIcon = budgetStatus.icon

// // //   return (
// // //     <div className="container max-w-7xl mx-auto py-8">
// // //       {/* Header */}
// // //       <div className="flex items-center justify-between mb-6">
// // //         <Button
// // //           variant="ghost"
// // //           onClick={() => navigate('/finance-area')}
// // //         >
// // //           <ArrowLeft className="mr-2 h-4 w-4" />
// // //           Back to Dashboard
// // //         </Button>

// // //         <Badge className="bg-blue-100 text-blue-800">
// // //           <Clock className="w-3 h-3 mr-1" />
// // //           Monitoring Mode (Read-Only)
// // //         </Badge>
// // //       </div>

// // //       {/* Page Title */}
// // //       <div className="mb-8">
// // //         <div className="flex items-start justify-between">
// // //           <div>
// // //             <h1 className="text-3xl font-bold mb-2">Ongoing Trip Detail</h1>
// // //             <p className="text-muted-foreground">{trip.trip_number}</p>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <Badge className="bg-blue-100 text-blue-800">
// // //               <Clock className="w-3 h-3 mr-1" />
// // //               Active
// // //             </Badge>
// // //             {isTripEndingSoon(trip.end_date) && (
// // //               <Badge className="bg-orange-100 text-orange-800">
// // //                 <AlertCircle className="w-3 h-3 mr-1" />
// // //                 Ending Soon
// // //               </Badge>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Budget Status Alert */}
// // //       {trip.total_expenses > trip.estimated_budget && (
// // //         <Alert variant="destructive" className="mb-6">
// // //           <AlertTriangle className="h-4 w-4" />
// // //           <AlertDescription>
// // //             <span className="font-semibold">Budget Exceeded!</span> Expenses have exceeded the estimated budget by {formatCurrency(Number(trip.total_expenses) - Number(trip.estimated_budget))}.
// // //           </AlertDescription>
// // //         </Alert>
// // //       )}

// // //       {trip.total_advance === 0 && (
// // //         <Alert className="mb-6 bg-blue-50 border-blue-200">
// // //           <AlertCircle className="h-4 w-4 text-blue-600" />
// // //           <AlertDescription className="text-blue-800">
// // //             <span className="font-semibold">No Advance Requested.</span> Employee is using personal funds for this trip.
// // //           </AlertDescription>
// // //         </Alert>
// // //       )}

// // //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //         {/* Left Column - Trip Info */}
// // //         <div className="lg:col-span-2 space-y-6">
// // //           {/* Trip Information Card */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <Plane className="h-5 w-5" />
// // //                 Trip Information
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-6">
// // //               {/* Destination */}
// // //               <div className="flex items-start gap-3">
// // //                 <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
// // //                 <div className="flex-1">
// // //                   <p className="text-sm text-muted-foreground">Destination</p>
// // //                   <p className="font-semibold text-lg">{trip.destination}</p>
// // //                 </div>
// // //               </div>

// // //               {/* Purpose */}
// // //               <div className="flex items-start gap-3">
// // //                 <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
// // //                 <div className="flex-1">
// // //                   <p className="text-sm text-muted-foreground">Purpose</p>
// // //                   <p className="font-medium">{trip.purpose}</p>
// // //                 </div>
// // //               </div>

// // //               {/* Dates */}
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div className="flex items-start gap-3">
// // //                   <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
// // //                   <div>
// // //                     <p className="text-sm text-muted-foreground">Start Date</p>
// // //                     <p className="font-medium">{formatDate(trip.start_date)}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex items-start gap-3">
// // //                   <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
// // //                   <div>
// // //                     <p className="text-sm text-muted-foreground">End Date</p>
// // //                     <p className="font-medium">{formatDate(trip.end_date)}</p>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Duration */}
// // //               <div className="flex items-start gap-3">
// // //                 <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground">Duration</p>
// // //                   <p className="font-medium">{trip.duration} days</p>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Employee Information Card */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <UserIcon className="h-5 w-5" />
// // //                 Employee Information
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-4">
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground">Name</p>
// // //                   <p className="font-medium">{trip.user?.name || '-'}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground">NIK</p>
// // //                   <p className="font-medium">{trip.user?.nik || '-'}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground">Email</p>
// // //                   <p className="font-medium text-sm">{trip.user?.email || '-'}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm text-muted-foreground">Position</p>
// // //                   <p className="font-medium">{trip.user?.position || '-'}</p>
// // //                 </div>
// // //                 <div className="col-span-2">
// // //                   <p className="text-sm text-muted-foreground">Department</p>
// // //                   <p className="font-medium">{trip.user?.department || '-'}</p>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Receipts Card */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center justify-between">
// // //                 <span className="flex items-center gap-2">
// // //                   <ReceiptIcon className="h-5 w-5" />
// // //                   Receipts ({receipts.length})
// // //                 </span>
// // //                 {receipts.length > 0 && (
// // //                   <Badge variant="secondary">{receipts.length} uploaded</Badge>
// // //                 )}
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               {receipts.length === 0 ? (
// // //                 <div className="text-center py-12">
// // //                   <ReceiptIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
// // //                   <p className="text-muted-foreground">No receipts uploaded yet</p>
// // //                   <p className="text-sm text-muted-foreground mt-1">
// // //                     Employee will upload receipts during or after the trip
// // //                   </p>
// // //                 </div>
// // //               ) : (
// // //                 <div className="space-y-3">
// // //                   {receipts.map((receipt) => (
// // //                     <div
// // //                       key={receipt.receipt_id}
// // //                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// // //                     >
// // //                       <div className="flex items-start gap-3 flex-1">
// // //                         <div className="bg-blue-50 rounded p-2">
// // //                           <FileText className="h-5 w-5 text-blue-600" />
// // //                         </div>
// // //                         <div className="flex-1">
// // //                           <p className="font-medium">{receipt.category}</p>
// // //                           <p className="text-sm text-muted-foreground">{receipt.description}</p>
// // //                           <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
// // //                             <span>📅 {formatDate(receipt.receipt_date)}</span>
// // //                             <span>💰 {formatCurrency(Number(receipt.amount))}</span>
// // //                             <span>🕐 {formatDateTime(receipt.created_at)}</span>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       <Button
// // //                         variant="outline"
// // //                         size="sm"
// // //                         onClick={() => handleViewReceipt(receipt)}
// // //                       >
// // //                         <Eye className="h-4 w-4 mr-2" />
// // //                         View
// // //                       </Button>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* Right Column - Budget Info */}
// // //         <div className="space-y-6">
// // //           {/* Budget Status Card */}
// // //           <Card className={budgetStatus.bgColor}>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <BudgetIcon className={`h-5 w-5 ${budgetStatus.color}`} />
// // //                 Budget Status
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-center py-4">
// // //                 <p className={`text-3xl font-bold ${budgetStatus.color}`}>
// // //                   {budgetStatus.label}
// // //                 </p>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Budget Breakdown Card */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <DollarSign className="h-5 w-5" />
// // //                 Budget Breakdown
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-4">
// // //               {/* Estimated Budget */}
// // //               <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
// // //                 <div className="flex items-center gap-2">
// // //                   <TrendingUp className="h-4 w-4 text-blue-600" />
// // //                   <span className="text-sm font-medium">Estimated Budget</span>
// // //                 </div>
// // //                 <span className="font-bold text-blue-600">
// // //                   {formatCurrency(Number(trip.estimated_budget) || 0)}
// // //                 </span>
// // //               </div>

// // //               {/* Advanced */}
// // //               <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
// // //                 <div className="flex items-center gap-2">
// // //                   <DollarSign className="h-4 w-4 text-green-600" />
// // //                   <span className="text-sm font-medium">Advanced</span>
// // //                 </div>
// // //                 <span className={`font-bold ${trip.total_advance > 0 ? 'text-green-600' : 'text-gray-500'}`}>
// // //                   {trip.total_advance > 0 ? formatCurrency(Number(trip.total_advance)) : 'No advance'}
// // //                 </span>
// // //               </div>

// // //               {/* Receipts Uploaded */}
// // //               <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
// // //                 <div className="flex items-center gap-2">
// // //                   <ReceiptIcon className="h-4 w-4 text-orange-600" />
// // //                   <span className="text-sm font-medium">Receipts Uploaded</span>
// // //                 </div>
// // //                 <span className={`font-bold ${trip.total_expenses > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
// // //                   {trip.total_expenses > 0 ? formatCurrency(Number(trip.total_expenses)) : 'No receipts'}
// // //                 </span>
// // //               </div>

// // //               {/* Remaining Budget */}
// // //               <div className={`flex items-center justify-between p-3 rounded-lg border-2 ${
// // //                 remaining < 0 ? 'bg-red-50 border-red-200' : 
// // //                 remaining < (Number(trip.estimated_budget) * 0.2) ? 'bg-orange-50 border-orange-200' : 
// // //                 'bg-green-50 border-green-200'
// // //               }`}>
// // //                 <div className="flex items-center gap-2">
// // //                   <DollarSign className={`h-4 w-4 ${
// // //                     remaining < 0 ? 'text-red-600' : 
// // //                     remaining < (Number(trip.estimated_budget) * 0.2) ? 'text-orange-600' : 
// // //                     'text-green-600'
// // //                   }`} />
// // //                   <span className="text-sm font-medium">Budget Remaining</span>
// // //                 </div>
// // //                 <div className="text-right">
// // //                   <span className={`font-bold text-lg ${
// // //                     remaining < 0 ? 'text-red-600' : 
// // //                     remaining < (Number(trip.estimated_budget) * 0.2) ? 'text-orange-600' : 
// // //                     'text-green-600'
// // //                   }`}>
// // //                     {formatCurrency(Math.abs(remaining))}
// // //                   </span>
// // //                   {remaining < 0 && (
// // //                     <p className="text-xs text-red-600 font-medium">(Over Budget)</p>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Budget Usage Percentage */}
// // //               <div className="pt-4 border-t">
// // //                 <div className="flex justify-between items-center mb-2">
// // //                   <span className="text-sm text-muted-foreground">Budget Used</span>
// // //                   <span className="text-sm font-bold">
// // //                     {trip.estimated_budget > 0 
// // //                       ? ((Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100).toFixed(1) 
// // //                       : 0}%
// // //                   </span>
// // //                 </div>
// // //                 <div className="w-full bg-gray-200 rounded-full h-2">
// // //                   <div
// // //                     className={`h-2 rounded-full transition-all ${
// // //                       (Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100 > 100 ? 'bg-red-600' :
// // //                       (Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100 > 80 ? 'bg-orange-600' :
// // //                       'bg-green-600'
// // //                     }`}
// // //                     style={{
// // //                       width: `${Math.min(((Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100), 100)}%`
// // //                     }}
// // //                   />
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Trip Timeline Card */}
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle className="flex items-center gap-2">
// // //                 <Clock className="h-5 w-5" />
// // //                 Trip Timeline
// // //               </CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-3">
// // //               <div className="flex items-center gap-3 text-sm">
// // //                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600"></div>
// // //                 <div className="flex-1">
// // //                   <p className="font-medium">Trip Started</p>
// // //                   <p className="text-xs text-muted-foreground">{formatDate(trip.start_date)}</p>
// // //                 </div>
// // //               </div>
              
// // //               <div className="flex items-center gap-3 text-sm">
// // //                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
// // //                 <div className="flex-1">
// // //                   <p className="font-medium">Currently Ongoing</p>
// // //                   <p className="text-xs text-muted-foreground">
// // //                     {Math.ceil((new Date(trip.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
// // //                   </p>
// // //                 </div>
// // //               </div>

// // //               <div className="flex items-center gap-3 text-sm">
// // //                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-300"></div>
// // //                 <div className="flex-1">
// // //                   <p className="font-medium">Expected End</p>
// // //                   <p className="text-xs text-muted-foreground">{formatDate(trip.end_date)}</p>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>

// // //           {/* Info Card */}
// // //           <Card className="bg-blue-50 border-blue-200">
// // //             <CardContent className="pt-6">
// // //               <div className="flex items-start gap-3">
// // //                 <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
// // //                 <div className="text-sm text-blue-800">
// // //                   <p className="font-semibold mb-1">Monitoring Mode</p>
// // //                   <p>This is a read-only view. Trip is still ongoing and no actions can be taken until the employee completes the trip and submits for settlement.</p>
// // //                 </div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }




// // import { useState, useEffect } from 'react'
// // import { useParams, useNavigate, Link } from 'react-router-dom'
// // import { tripAPI, receiptAPI } from '@/services/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Badge } from '@/components/ui/badge'
// // import { Alert, AlertDescription } from '@/components/ui/alert'
// // import {
// //   ArrowLeft,
// //   Plane,
// //   MapPin,
// //   Calendar,
// //   DollarSign,
// //   User as UserIcon,
// //   Briefcase,
// //   Building2,
// //   Clock,
// //   TrendingUp,
// //   Receipt as ReceiptIcon,
// //   AlertCircle,
// //   CheckCircle2,
// //   AlertTriangle,
// //   FileText,
// //   Eye,
// //   Download
// // } from 'lucide-react'

// // interface User {
// //   user_id: number
// //   name: string
// //   email: string
// //   nik: string
// //   department: string
// //   position: string
// // }

// // interface Trip {
// //   trip_id: number
// //   trip_number: string
// //   user_id: number
// //   destination: string
// //   purpose: string
// //   start_date: string
// //   end_date: string
// //   duration: number
// //   status: string
// //   estimated_budget: number
// //   total_advance: number
// //   total_expenses: number
// //   created_at: string
// //   user?: User
// // }

// // interface Receipt {
// //   receipt_id: number
// //   trip_id: number
// //   category: string
// //   amount: number
// //   receipt_date: string
// //   description: string
// //   file_path: string
// //   status: string
// //   created_at: string
// // }

// // export default function OngoingTripDetail() {
// //   const { id } = useParams<{ id: string }>()
// //   const navigate = useNavigate()

// //   const [trip, setTrip] = useState<Trip | null>(null)
// //   const [receipts, setReceipts] = useState<Receipt[]>([])
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     if (id) {
// //       loadTripDetail()
// //     }
// //   }, [id])

// //   const loadTripDetail = async () => {
// //     try {
// //       setIsLoading(true)
// //       setError(null)

// //       // Load trip data
// //       const tripResponse = await tripAPI.getById(parseInt(id!))
// //       const tripData = tripResponse.data.data
// //       setTrip(tripData)

// //       // Load receipts data using getAll with trip_id filter
// //       try {
// //         const receiptsResponse = await receiptAPI.getAll({ trip_id: parseInt(id!) })
// //         if (receiptsResponse?.data?.data) {
// //           setReceipts(Array.isArray(receiptsResponse.data.data) ? receiptsResponse.data.data : [])
// //         } else {
// //           setReceipts([])
// //         }
// //       } catch (receiptError) {
// //         console.log('No receipts found or error loading receipts:', receiptError)
// //         setReceipts([])
// //       }
// //     } catch (err: any) {
// //       console.error('Failed to load trip detail:', err)
// //       setError('Failed to load trip details')
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const formatCurrency = (amount: number) => {
// //     return new Intl.NumberFormat('id-ID', {
// //       style: 'currency',
// //       currency: 'IDR',
// //       minimumFractionDigits: 0,
// //     }).format(amount)
// //   }

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('id-ID', {
// //       day: 'numeric',
// //       month: 'long',
// //       year: 'numeric'
// //     })
// //   }

// //   const formatDateTime = (dateString: string) => {
// //     return new Date(dateString).toLocaleString('id-ID', {
// //       day: 'numeric',
// //       month: 'short',
// //       year: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     })
// //   }

// //   // Check if trip is ending soon
// //   const isTripEndingSoon = (endDate: string) => {
// //     const end = new Date(endDate)
// //     const today = new Date()
// //     const diffTime = end.getTime() - today.getTime()
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
// //     return diffDays >= 0 && diffDays <= 2
// //   }

// //   // Get budget status
// //   const getBudgetStatus = (estimated: number, expenses: number) => {
// //     if (expenses === 0) return { label: 'No Expenses Yet', color: 'text-gray-600', bgColor: 'bg-gray-50', icon: ReceiptIcon }
    
// //     const percentage = (expenses / estimated) * 100
    
// //     if (percentage > 100) {
// //       return { label: 'Over Budget', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertTriangle }
// //     } else if (percentage > 80) {
// //       return { label: 'Near Limit', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: AlertCircle }
// //     } else {
// //       return { label: 'On Track', color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle2 }
// //     }
// //   }

// //   const handleViewReceipt = (receipt: Receipt) => {
// //     // Open receipt in new tab
// //     window.open(`${import.meta.env.VITE_API_BASE_URL}/${receipt.file_path}`, '_blank')
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="container max-w-7xl mx-auto py-8 flex items-center justify-center min-h-screen">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
// //           <p className="text-muted-foreground">Loading trip details...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error || !trip) {
// //     return (
// //       <div className="container max-w-7xl mx-auto py-8">
// //         <Button
// //           variant="ghost"
// //           onClick={() => navigate('/finance-area')}
// //           className="mb-6"
// //         >
// //           <ArrowLeft className="mr-2 h-4 w-4" />
// //           Back to Dashboard
// //         </Button>

// //         <Alert variant="destructive">
// //           <AlertCircle className="h-4 w-4" />
// //           <AlertDescription>
// //             {error || 'Trip not found'}
// //           </AlertDescription>
// //         </Alert>
// //       </div>
// //     )
// //   }

// //   const budgetStatus = getBudgetStatus(Number(trip.estimated_budget) || 0, Number(trip.total_expenses) || 0)
// //   const remaining = (Number(trip.estimated_budget) || 0) - (Number(trip.total_expenses) || 0)
// //   const BudgetIcon = budgetStatus.icon

// //   return (
// //     <div className="container max-w-7xl mx-auto py-8">
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-6">
// //         <Button
// //           variant="ghost"
// //           onClick={() => navigate('/finance-area')}
// //         >
// //           <ArrowLeft className="mr-2 h-4 w-4" />
// //           Back to Dashboard
// //         </Button>

// //         <Badge className="bg-blue-100 text-blue-800">
// //           <Clock className="w-3 h-3 mr-1" />
// //           Monitoring Mode (Read-Only)
// //         </Badge>
// //       </div>

// //       {/* Page Title */}
// //       <div className="mb-8">
// //         <div className="flex items-start justify-between">
// //           <div>
// //             <h1 className="text-3xl font-bold mb-2">Ongoing Trip Detail</h1>
// //             <p className="text-muted-foreground">{trip.trip_number}</p>
// //           </div>
// //           <div className="flex gap-2">
// //             <Badge className="bg-blue-100 text-blue-800">
// //               <Clock className="w-3 h-3 mr-1" />
// //               Active
// //             </Badge>
// //             {isTripEndingSoon(trip.end_date) && (
// //               <Badge className="bg-orange-100 text-orange-800">
// //                 <AlertCircle className="w-3 h-3 mr-1" />
// //                 Ending Soon
// //               </Badge>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Budget Status Alert */}
// //       {trip.total_expenses > trip.estimated_budget && (
// //         <Alert variant="destructive" className="mb-6">
// //           <AlertTriangle className="h-4 w-4" />
// //           <AlertDescription>
// //             <span className="font-semibold">Budget Exceeded!</span> Expenses have exceeded the estimated budget by {formatCurrency(Number(trip.total_expenses) - Number(trip.estimated_budget))}.
// //           </AlertDescription>
// //         </Alert>
// //       )}

// //       {trip.total_advance === 0 && (
// //         <Alert className="mb-6 bg-blue-50 border-blue-200">
// //           <AlertCircle className="h-4 w-4 text-blue-600" />
// //           <AlertDescription className="text-blue-800">
// //             <span className="font-semibold">No Advance Disbursed Yet.</span> Employee may request advance or use personal funds during the trip.
// //           </AlertDescription>
// //         </Alert>
// //       )}

// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //         {/* Left Column - Trip Info */}
// //         <div className="lg:col-span-2 space-y-6">
// //           {/* Trip Information Card */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Plane className="h-5 w-5" />
// //                 Trip Information
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               {/* Destination */}
// //               <div className="flex items-start gap-3">
// //                 <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                 <div className="flex-1">
// //                   <p className="text-sm text-muted-foreground">Destination</p>
// //                   <p className="font-semibold text-lg">{trip.destination}</p>
// //                 </div>
// //               </div>

// //               {/* Purpose */}
// //               <div className="flex items-start gap-3">
// //                 <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                 <div className="flex-1">
// //                   <p className="text-sm text-muted-foreground">Purpose</p>
// //                   <p className="font-medium">{trip.purpose}</p>
// //                 </div>
// //               </div>

// //               {/* Dates */}
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div className="flex items-start gap-3">
// //                   <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                   <div>
// //                     <p className="text-sm text-muted-foreground">Start Date</p>
// //                     <p className="font-medium">{formatDate(trip.start_date)}</p>
// //                   </div>
// //                 </div>
// //                 <div className="flex items-start gap-3">
// //                   <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                   <div>
// //                     <p className="text-sm text-muted-foreground">End Date</p>
// //                     <p className="font-medium">{formatDate(trip.end_date)}</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Duration */}
// //               <div className="flex items-start gap-3">
// //                 <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Duration</p>
// //                   <p className="font-medium">{trip.duration} days</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Employee Information Card */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <UserIcon className="h-5 w-5" />
// //                 Employee Information
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-4">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Name</p>
// //                   <p className="font-medium">{trip.user?.name || '-'}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">NIK</p>
// //                   <p className="font-medium">{trip.user?.nik || '-'}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Email</p>
// //                   <p className="font-medium text-sm">{trip.user?.email || '-'}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm text-muted-foreground">Position</p>
// //                   <p className="font-medium">{trip.user?.position || '-'}</p>
// //                 </div>
// //                 <div className="col-span-2">
// //                   <p className="text-sm text-muted-foreground">Department</p>
// //                   <p className="font-medium">{trip.user?.department || '-'}</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Receipts Card */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center justify-between">
// //                 <span className="flex items-center gap-2">
// //                   <ReceiptIcon className="h-5 w-5" />
// //                   Receipts ({receipts.length})
// //                 </span>
// //                 {receipts.length > 0 && (
// //                   <Badge variant="secondary">{receipts.length} uploaded</Badge>
// //                 )}
// //               </CardTitle>
// //               <p className="text-sm text-muted-foreground mt-2">
// //                 Receipts uploaded during the trip. Final verification will be done after trip completion.
// //               </p>
// //             </CardHeader>
// //             <CardContent>
// //               {receipts.length === 0 ? (
// //                 <div className="text-center py-12">
// //                   <ReceiptIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
// //                   <p className="text-muted-foreground">No receipts uploaded yet</p>
// //                   <p className="text-sm text-muted-foreground mt-1">
// //                     Employee will upload receipts during or after the trip
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div className="space-y-3">
// //                   {receipts.map((receipt) => (
// //                     <div
// //                       key={receipt.receipt_id}
// //                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
// //                     >
// //                       <div className="flex items-start gap-3 flex-1">
// //                         <div className="bg-blue-50 rounded p-2">
// //                           <FileText className="h-5 w-5 text-blue-600" />
// //                         </div>
// //                         <div className="flex-1">
// //                           <p className="font-medium">{receipt.category}</p>
// //                           <p className="text-sm text-muted-foreground">{receipt.description}</p>
// //                           <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
// //                             <span>📅 {formatDate(receipt.receipt_date)}</span>
// //                             <span>💰 {formatCurrency(Number(receipt.amount))}</span>
// //                             <span>🕐 {formatDateTime(receipt.created_at)}</span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         onClick={() => handleViewReceipt(receipt)}
// //                       >
// //                         <Eye className="h-4 w-4 mr-2" />
// //                         View
// //                       </Button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               )}
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* Right Column - Budget Info */}
// //         <div className="space-y-6">
// //           {/* Budget Status Card */}
// //           <Card className={budgetStatus.bgColor}>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <BudgetIcon className={`h-5 w-5 ${budgetStatus.color}`} />
// //                 Budget Status
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-center py-4">
// //                 <p className={`text-3xl font-bold ${budgetStatus.color}`}>
// //                   {budgetStatus.label}
// //                 </p>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Budget Breakdown Card */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <DollarSign className="h-5 w-5" />
// //                 Budget Breakdown
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-4">
// //               {/* Estimated Budget */}
// //               <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
// //                 <div className="flex items-center gap-2">
// //                   <TrendingUp className="h-4 w-4 text-blue-600" />
// //                   <span className="text-sm font-medium">Estimated Budget</span>
// //                 </div>
// //                 <span className="font-bold text-blue-600">
// //                   {formatCurrency(Number(trip.estimated_budget) || 0)}
// //                 </span>
// //               </div>

// //               {/* Advanced */}
// //               <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
// //                 <div className="flex items-center gap-2">
// //                   <DollarSign className="h-4 w-4 text-green-600" />
// //                   <span className="text-sm font-medium">Advanced</span>
// //                 </div>
// //                 <span className={`font-bold ${trip.total_advance > 0 ? 'text-green-600' : 'text-gray-500'}`}>
// //                   {trip.total_advance > 0 ? formatCurrency(Number(trip.total_advance)) : 'No advance'}
// //                 </span>
// //               </div>

// //               {/* Receipts Uploaded */}
// //               <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
// //                 <div className="flex items-center gap-2">
// //                   <ReceiptIcon className="h-4 w-4 text-orange-600" />
// //                   <span className="text-sm font-medium">Receipts Uploaded</span>
// //                 </div>
// //                 <span className={`font-bold ${trip.total_expenses > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
// //                   {trip.total_expenses > 0 ? formatCurrency(Number(trip.total_expenses)) : 'No receipts'}
// //                 </span>
// //               </div>

// //               {/* Remaining Budget */}
// //               <div className={`flex items-center justify-between p-3 rounded-lg border-2 ${
// //                 remaining < 0 ? 'bg-red-50 border-red-200' : 
// //                 remaining < (Number(trip.estimated_budget) * 0.2) ? 'bg-orange-50 border-orange-200' : 
// //                 'bg-green-50 border-green-200'
// //               }`}>
// //                 <div className="flex items-center gap-2">
// //                   <DollarSign className={`h-4 w-4 ${
// //                     remaining < 0 ? 'text-red-600' : 
// //                     remaining < (Number(trip.estimated_budget) * 0.2) ? 'text-orange-600' : 
// //                     'text-green-600'
// //                   }`} />
// //                   <span className="text-sm font-medium">Budget Remaining</span>
// //                 </div>
// //                 <div className="text-right">
// //                   <span className={`font-bold text-lg ${
// //                     remaining < 0 ? 'text-red-600' : 
// //                     remaining < (Number(trip.estimated_budget) * 0.2) ? 'text-orange-600' : 
// //                     'text-green-600'
// //                   }`}>
// //                     {formatCurrency(Math.abs(remaining))}
// //                   </span>
// //                   {remaining < 0 && (
// //                     <p className="text-xs text-red-600 font-medium">(Over Budget)</p>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Budget Usage Percentage */}
// //               <div className="pt-4 border-t">
// //                 <div className="flex justify-between items-center mb-2">
// //                   <span className="text-sm text-muted-foreground">Budget Used</span>
// //                   <span className="text-sm font-bold">
// //                     {trip.estimated_budget > 0 
// //                       ? ((Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100).toFixed(1) 
// //                       : 0}%
// //                   </span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 rounded-full h-2">
// //                   <div
// //                     className={`h-2 rounded-full transition-all ${
// //                       (Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100 > 100 ? 'bg-red-600' :
// //                       (Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100 > 80 ? 'bg-orange-600' :
// //                       'bg-green-600'
// //                     }`}
// //                     style={{
// //                       width: `${Math.min(((Number(trip.total_expenses) / Number(trip.estimated_budget)) * 100), 100)}%`
// //                     }}
// //                   />
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Trip Timeline Card */}
// //           <Card>
// //             <CardHeader>
// //               <CardTitle className="flex items-center gap-2">
// //                 <Clock className="h-5 w-5" />
// //                 Trip Timeline
// //               </CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-3">
// //               <div className="flex items-center gap-3 text-sm">
// //                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600"></div>
// //                 <div className="flex-1">
// //                   <p className="font-medium">Trip Started</p>
// //                   <p className="text-xs text-muted-foreground">{formatDate(trip.start_date)}</p>
// //                 </div>
// //               </div>
              
// //               <div className="flex items-center gap-3 text-sm">
// //                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
// //                 <div className="flex-1">
// //                   <p className="font-medium">Currently Ongoing</p>
// //                   <p className="text-xs text-muted-foreground">
// //                     {Math.ceil((new Date(trip.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
// //                   </p>
// //                 </div>
// //               </div>

// //               <div className="flex items-center gap-3 text-sm">
// //                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-300"></div>
// //                 <div className="flex-1">
// //                   <p className="font-medium">Expected End</p>
// //                   <p className="text-xs text-muted-foreground">{formatDate(trip.end_date)}</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           {/* Info Card */}
// //           <Card className="bg-blue-50 border-blue-200">
// //             <CardContent className="pt-6">
// //               <div className="flex items-start gap-3">
// //                 <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
// //                 <div className="text-sm text-blue-800">
// //                   <p className="font-semibold mb-1">Monitoring Mode</p>
// //                   <p>This is a read-only view. Trip is still ongoing and no actions can be taken until the employee completes the trip and submits for settlement.</p>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }



// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Alert, AlertDescription } from '@/components/ui/alert'
// import {
//   ArrowLeft,
//   Plane,
//   MapPin,
//   Calendar,
//   DollarSign,
//   User as UserIcon,
//   Briefcase,
//   Building2,
//   Clock,
//   TrendingUp,
//   Receipt as ReceiptIcon,
//   AlertCircle,
//   CheckCircle2,
//   AlertTriangle,
//   FileText,
//   Eye,
//   Download,
//   Wallet,
//   Info
// } from 'lucide-react'

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
//   duration: number
//   status: string
//   estimated_budget: number
//   total_advance: number
//   total_expenses: number
//   created_at: string
//   user?: User
// }

// interface Receipt {
//   receipt_id: number
//   trip_id: number
//   category: string
//   amount: number
//   receipt_date: string
//   description: string
//   file_path: string
//   status: string
//   created_at: string
// }

// export default function OngoingTripDetail() {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()

//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [receipts, setReceipts] = useState<Receipt[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     if (id) {
//       loadTripDetail()
//     }
//   }, [id])

//   const loadTripDetail = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)

//       // Load trip data
//       const tripResponse = await tripAPI.getById(parseInt(id!))
//       const tripData = tripResponse.data.data
//       setTrip(tripData)

//       // Load receipts data
//       try {
//         const receiptsResponse = await receiptAPI.getAll({ trip_id: parseInt(id!) })
//         if (receiptsResponse?.data?.data) {
//           setReceipts(Array.isArray(receiptsResponse.data.data) ? receiptsResponse.data.data : [])
//         } else {
//           setReceipts([])
//         }
//       } catch (receiptError) {
//         console.log('No receipts found:', receiptError)
//         setReceipts([])
//       }
//     } catch (err: any) {
//       console.error('Failed to load trip detail:', err)
//       setError('Failed to load trip details')
//     } finally {
//       setIsLoading(false)
//     }
//   }

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
//       month: 'long',
//       year: 'numeric'
//     })
//   }

//   const formatDateTime = (dateString: string) => {
//     return new Date(dateString).toLocaleString('id-ID', {
//       day: 'numeric',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     })
//   }

//   // Check if trip is ending soon
//   const isTripEndingSoon = (endDate: string) => {
//     const end = new Date(endDate)
//     const today = new Date()
//     const diffTime = end.getTime() - today.getTime()
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
//     return diffDays >= 0 && diffDays <= 2
//   }

//   // Calculate cash flow (advance vs spent)
//   const advanceAmount = Number(trip?.total_advance) || 0
//   const spentAmount = Number(trip?.total_expenses) || 0
//   const cashRemaining = advanceAmount - spentAmount
//   const estimatedBudget = Number(trip?.estimated_budget) || 0
  
//   // Budget status based on estimated budget
//   const budgetUsagePercent = estimatedBudget > 0 ? (spentAmount / estimatedBudget) * 100 : 0
//   const isOverBudget = spentAmount > estimatedBudget

//   const handleViewReceipt = (receipt: Receipt) => {
//     window.open(`${import.meta.env.VITE_API_BASE_URL}/${receipt.file_path}`, '_blank')
//   }

//   if (isLoading) {
//     return (
//       <div className="container max-w-7xl mx-auto py-8 flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
//           <p className="text-muted-foreground">Loading trip details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error || !trip) {
//     return (
//       <div className="container max-w-7xl mx-auto py-8">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/finance-area')}
//           className="mb-6"
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Dashboard
//         </Button>

//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>
//             {error || 'Trip not found'}
//           </AlertDescription>
//         </Alert>
//       </div>
//     )
//   }

//   return (
//     <div className="container max-w-7xl mx-auto py-8">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <Button
//           variant="ghost"
//           onClick={() => navigate('/finance-area')}
//         >
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Dashboard
//         </Button>

//         <Badge className="bg-blue-100 text-blue-800">
//           <Clock className="w-3 h-3 mr-1" />
//           Monitoring Mode (Read-Only)
//         </Badge>
//       </div>

//       {/* Page Title */}
//       <div className="mb-8">
//         <div className="flex items-start justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Ongoing Trip Detail</h1>
//             <p className="text-muted-foreground">{trip.trip_number}</p>
//           </div>
//           <div className="flex gap-2">
//             <Badge className="bg-blue-100 text-blue-800">
//               <Clock className="w-3 h-3 mr-1" />
//               Active
//             </Badge>
//             {isTripEndingSoon(trip.end_date) && (
//               <Badge className="bg-orange-100 text-orange-800">
//                 <AlertCircle className="w-3 h-3 mr-1" />
//                 Ending Soon
//               </Badge>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Alerts */}
//       {isOverBudget && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertTriangle className="h-4 w-4" />
//           <AlertDescription>
//             <span className="font-semibold">Budget Exceeded!</span> Expenses have exceeded the estimated budget by {formatCurrency(spentAmount - estimatedBudget)}.
//           </AlertDescription>
//         </Alert>
//       )}

//       {advanceAmount === 0 && (
//         <Alert className="mb-6 bg-blue-50 border-blue-200">
//           <AlertCircle className="h-4 w-4 text-blue-600" />
//           <AlertDescription className="text-blue-800">
//             <span className="font-semibold">No Advance Disbursed Yet.</span> Employee may request advance or use personal funds during the trip.
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Column - Trip Info */}
//         <div className="lg:col-span-2 space-y-6">
//           {/* Trip Information Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Plane className="h-5 w-5" />
//                 Trip Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="flex items-start gap-3">
//                 <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-muted-foreground">Destination</p>
//                   <p className="font-semibold text-lg">{trip.destination}</p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
//                 <div className="flex-1">
//                   <p className="text-sm text-muted-foreground">Purpose</p>
//                   <p className="font-medium">{trip.purpose}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="flex items-start gap-3">
//                   <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Start Date</p>
//                     <p className="font-medium">{formatDate(trip.start_date)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">End Date</p>
//                     <p className="font-medium">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
//                 <div>
//                   <p className="text-sm text-muted-foreground">Duration</p>
//                   <p className="font-medium">{trip.duration} days</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Employee Information Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <UserIcon className="h-5 w-5" />
//                 Employee Information
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Name</p>
//                   <p className="font-medium">{trip.user?.name || '-'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">NIK</p>
//                   <p className="font-medium">{trip.user?.nik || '-'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <p className="font-medium text-sm">{trip.user?.email || '-'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Position</p>
//                   <p className="font-medium">{trip.user?.position || '-'}</p>
//                 </div>
//                 <div className="col-span-2">
//                   <p className="text-sm text-muted-foreground">Department</p>
//                   <p className="font-medium">{trip.user?.department || '-'}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Receipts Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 <span className="flex items-center gap-2">
//                   <ReceiptIcon className="h-5 w-5" />
//                   Receipts ({receipts.length})
//                 </span>
//                 {receipts.length > 0 && (
//                   <Badge variant="secondary">{receipts.length} uploaded</Badge>
//                 )}
//               </CardTitle>
//               <p className="text-sm text-muted-foreground mt-2">
//                 Receipts uploaded during the trip. Final verification will be done after trip completion.
//               </p>
//             </CardHeader>
//             <CardContent>
//               {receipts.length === 0 ? (
//                 <div className="text-center py-12">
//                   <ReceiptIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//                   <p className="text-muted-foreground">No receipts uploaded yet</p>
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Employee will upload receipts during or after the trip
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {receipts.map((receipt) => (
//                     <div
//                       key={receipt.receipt_id}
//                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
//                     >
//                       <div className="flex items-start gap-3 flex-1">
//                         <div className="bg-blue-50 rounded p-2">
//                           <FileText className="h-5 w-5 text-blue-600" />
//                         </div>
//                         <div className="flex-1">
//                           <p className="font-medium">{receipt.category}</p>
//                           <p className="text-sm text-muted-foreground">{receipt.description}</p>
//                           <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
//                             <span>📅 {formatDate(receipt.receipt_date)}</span>
//                             <span>💰 {formatCurrency(Number(receipt.amount))}</span>
//                             <span>🕐 {formatDateTime(receipt.created_at)}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => handleViewReceipt(receipt)}
//                       >
//                         <Eye className="h-4 w-4 mr-2" />
//                         View
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Right Column - Financial Info */}
//         <div className="space-y-6">
//           {/* Budget Reference Card (Simple) */}
//           <Card className="bg-gray-50 border-gray-200">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2 text-base">
//                 <TrendingUp className="h-4 w-4" />
//                 Budget Reference
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Estimated Budget (Limit)</span>
//                   <span className="font-medium">{formatCurrency(estimatedBudget)}</span>
//                 </div>
                
//                 <div className="pt-3 border-t">
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-sm text-muted-foreground">Budget Usage</span>
//                     <span className={`text-sm font-bold ${
//                       isOverBudget ? 'text-red-600' : 
//                       budgetUsagePercent > 80 ? 'text-orange-600' : 
//                       'text-green-600'
//                     }`}>
//                       {budgetUsagePercent.toFixed(1)}%
//                     </span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className={`h-2 rounded-full transition-all ${
//                         isOverBudget ? 'bg-red-600' :
//                         budgetUsagePercent > 80 ? 'bg-orange-600' :
//                         'bg-green-600'
//                       }`}
//                       style={{
//                         width: `${Math.min(budgetUsagePercent, 100)}%`
//                       }}
//                     />
//                   </div>
//                 </div>

//                 {isOverBudget && (
//                   <Alert className="mt-3 bg-red-50 border-red-200">
//                     <AlertTriangle className="h-3 w-3 text-red-600" />
//                     <AlertDescription className="text-xs text-red-800">
//                       Over by {formatCurrency(spentAmount - estimatedBudget)}
//                     </AlertDescription>
//                   </Alert>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Cash Flow Card (Main Focus) */}
//           <Card className="border-2 border-green-200">
//             <CardHeader className="bg-green-50">
//               <CardTitle className="flex items-center gap-2">
//                 <Wallet className="h-5 w-5 text-green-700" />
//                 Cash Flow
//               </CardTitle>
//               <p className="text-xs text-green-700 mt-1">
//                 Tracks actual money flow (advances & expenses)
//               </p>
//             </CardHeader>
//             <CardContent className="space-y-4 pt-6">
//               {/* Advanced (Real Money Given) */}
//               <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
//                 <div className="flex items-center gap-2">
//                   <DollarSign className="h-4 w-4 text-green-600" />
//                   <div>
//                     <span className="text-sm font-medium block">Advanced</span>
//                     <span className="text-xs text-green-700">Money given to employee</span>
//                   </div>
//                 </div>
//                 <span className={`font-bold text-lg ${advanceAmount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
//                   {advanceAmount > 0 ? formatCurrency(advanceAmount) : 'None'}
//                 </span>
//               </div>

//               {/* Spent (Receipts) */}
//               <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
//                 <div className="flex items-center gap-2">
//                   <ReceiptIcon className="h-4 w-4 text-orange-600" />
//                   <div>
//                     <span className="text-sm font-medium block">Spent</span>
//                     <span className="text-xs text-orange-700">Total expenses (receipts)</span>
//                   </div>
//                 </div>
//                 <span className={`font-bold text-lg ${spentAmount > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
//                   {spentAmount > 0 ? formatCurrency(spentAmount) : 'None'}
//                 </span>
//               </div>

//               {/* Cash Remaining */}
//               <div className={`p-4 rounded-lg border-2 ${
//                 advanceAmount === 0 ? 'bg-gray-50 border-gray-200' :
//                 cashRemaining < 0 ? 'bg-purple-50 border-purple-200' : 
//                 cashRemaining < (advanceAmount * 0.2) ? 'bg-yellow-50 border-yellow-200' : 
//                 'bg-green-50 border-green-200'
//               }`}>
//                 <div className="flex items-center justify-between mb-2">
//                   <div className="flex items-center gap-2">
//                     <Wallet className={`h-4 w-4 ${
//                       advanceAmount === 0 ? 'text-gray-600' :
//                       cashRemaining < 0 ? 'text-purple-600' : 
//                       cashRemaining < (advanceAmount * 0.2) ? 'text-yellow-600' : 
//                       'text-green-600'
//                     }`} />
//                     <span className="text-sm font-semibold">
//                       {advanceAmount === 0 ? 'No Advance Given' : cashRemaining < 0 ? 'Used Personal Funds' : 'Advance Money Available'}
//                     </span>
//                   </div>
//                 </div>
                
//                 {advanceAmount > 0 && (
//                   <>
//                     <div className="text-right">
//                       <span className={`font-bold text-2xl ${
//                         cashRemaining < 0 ? 'text-purple-600' : 
//                         cashRemaining < (advanceAmount * 0.2) ? 'text-yellow-600' : 
//                         'text-green-600'
//                       }`}>
//                         {formatCurrency(Math.abs(cashRemaining))}
//                       </span>
//                     </div>
                    
//                     {cashRemaining < 0 && (
//                       <p className="text-xs text-purple-700 mt-2">
//                         💰 Employee will receive <strong>{formatCurrency(Math.abs(cashRemaining))}</strong> reimbursement after approval
//                       </p>
//                     )}
                    
//                     {cashRemaining > 0 && cashRemaining < (advanceAmount * 0.2) && (
//                       <p className="text-xs text-yellow-700 mt-2">
//                         ⚠️ Advance balance running low - employee may need additional advance
//                       </p>
//                     )}
                    
//                     {cashRemaining > 0 && cashRemaining >= (advanceAmount * 0.2) && (
//                       <p className="text-xs text-green-700 mt-2">
//                         ✅ Unused advance - <strong>{formatCurrency(cashRemaining)}</strong> to be returned to company after trip
//                       </p>
//                     )}
//                   </>
//                 )}

//                 {advanceAmount === 0 && spentAmount > 0 && (
//                   <p className="text-xs text-gray-700 mt-2">
//                     💰 Employee used personal funds. Will receive <strong>{formatCurrency(spentAmount)}</strong> reimbursement after approval.
//                   </p>
//                 )}

//                 {advanceAmount === 0 && spentAmount === 0 && (
//                   <p className="text-xs text-gray-700 mt-2">
//                     ℹ️ No advance given yet. Employee may request advance or use personal funds.
//                   </p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Trip Timeline Card */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Clock className="h-5 w-5" />
//                 Trip Timeline
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <div className="flex items-center gap-3 text-sm">
//                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600"></div>
//                 <div className="flex-1">
//                   <p className="font-medium">Trip Started</p>
//                   <p className="text-xs text-muted-foreground">{formatDate(trip.start_date)}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-3 text-sm">
//                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
//                 <div className="flex-1">
//                   <p className="font-medium">Currently Ongoing</p>
//                   <p className="text-xs text-muted-foreground">
//                     {Math.ceil((new Date(trip.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-3 text-sm">
//                 <div className="flex-shrink-0 w-2 h-2 rounded-full bg-gray-300"></div>
//                 <div className="flex-1">
//                   <p className="font-medium">Expected End</p>
//                   <p className="text-xs text-muted-foreground">{formatDate(trip.end_date)}</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Info Card */}
//           <Card className="bg-blue-50 border-blue-200">
//             <CardContent className="pt-6">
//               <div className="flex items-start gap-3">
//                 <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
//                 <div className="text-sm text-blue-800">
//                   <p className="font-semibold mb-1">Monitoring Mode</p>
//                   <p>This is a read-only view. Trip is still ongoing and no actions can be taken until the employee completes the trip and submits for settlement.</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }




import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
  Building2,
  Clock,
  TrendingUp,
  Receipt as ReceiptIcon,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Eye,
  Download,
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

  useEffect(() => {
    if (id) {
      loadTripDetail()
    }
  }, [id])

  const loadTripDetail = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Load trip data
      const tripResponse = await tripAPI.getById(parseInt(id!))
      const tripData = tripResponse.data.data
      setTrip(tripData)

      // Load receipts data
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

  // ✅ NEW: Check if trip is extended
  const isTripExtended = trip?.extended_end_date ? true : false

  // Check if trip is ending soon (using extended date if available)
  const isTripEndingSoon = (endDate: string, extendedEndDate?: string) => {
    const end = new Date(extendedEndDate || endDate)
    const today = new Date()
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 2
  }

  // Calculate cash flow (advance vs spent)
  const advanceAmount = Number(trip?.total_advance) || 0
  const spentAmount = Number(trip?.total_expenses) || 0
  const cashRemaining = advanceAmount - spentAmount
  const estimatedBudget = Number(trip?.estimated_budget) || 0
  
  // Budget status based on estimated budget
  const budgetUsagePercent = estimatedBudget > 0 ? (spentAmount / estimatedBudget) * 100 : 0
  const isOverBudget = spentAmount > estimatedBudget

  const handleViewReceipt = (receipt: Receipt) => {
    window.open(`${import.meta.env.VITE_API_BASE_URL}/${receipt.file_path}`, '_blank')
  }

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trip details...</p>
        </div>
      </div>
    )
  }

  if (error || !trip) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/finance-area')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Trip not found'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container max-w-7xl mx-auto py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/finance-area')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="flex items-center gap-2">
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Monitoring Mode (Read-Only)
          </Badge>
          
          {/* ✅ NEW: Extended Badge */}
          {isTripExtended && (
            <Badge className="bg-purple-100 text-purple-800">
              <Calendar className="w-3 h-3 mr-1" />
              Extended
            </Badge>
          )}
        </div>
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Ongoing Trip Detail</h1>
            <p className="text-muted-foreground">{trip.trip_number}</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Clock className="w-3 h-3 mr-1" />
              Active
            </Badge>
            {isTripEndingSoon(trip.end_date, trip.extended_end_date) && (
              <Badge className="bg-orange-100 text-orange-800">
                <AlertCircle className="w-3 h-3 mr-1" />
                Ending Soon
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Alerts */}
      
      {/* ✅ NEW: Trip Extended Alert - PRIORITY ALERT */}
      {isTripExtended && (
        <Alert className="mb-6 bg-purple-50 border-purple-200">
          <Calendar className="h-4 w-4 text-purple-600" />
          <AlertDescription>
            <p className="font-semibold text-purple-900 mb-2">🔄 Trip Has Been Extended</p>
            <div className="text-sm text-purple-800 space-y-1">
              <p>
                <strong>Original End Date:</strong> {formatDate(trip.end_date)}
              </p>
              <p>
                <strong>New End Date:</strong> {formatDate(trip.extended_end_date!)}
              </p>
              {trip.extension_reason && (
                <p className="mt-2">
                  <strong>Reason:</strong> {trip.extension_reason}
                </p>
              )}
              <p className="mt-2 text-xs">
                ℹ️ Employee can request additional advance during extension period.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {isOverBudget && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <span className="font-semibold">Budget Exceeded!</span> Expenses have exceeded the estimated budget by {formatCurrency(spentAmount - estimatedBudget)}.
          </AlertDescription>
        </Alert>
      )}

      {advanceAmount === 0 && (
        <Alert className="mb-6 bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <span className="font-semibold">No Advance Disbursed Yet.</span> Employee may request advance or use personal funds during the trip.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Trip Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Trip Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Trip Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-semibold text-lg">{trip.destination}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Purpose</p>
                  <p className="font-medium">{trip.purpose}</p>
                </div>
              </div>

              {/* ✅ UPDATED: Show both original and extended dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{formatDate(trip.start_date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isTripExtended ? 'Extended End Date' : 'End Date'}
                    </p>
                    <p className="font-medium">{formatDate(trip.extended_end_date || trip.end_date)}</p>
                    {isTripExtended && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Original: {formatDate(trip.end_date)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{trip.duration} days</p>
                  {isTripExtended && trip.extended_end_date && (
                    <p className="text-xs text-purple-600 mt-1">
                      + {Math.ceil((new Date(trip.extended_end_date).getTime() - new Date(trip.end_date).getTime()) / (1000 * 60 * 60 * 24))} days extended
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{trip.user?.name || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NIK</p>
                  <p className="font-medium">{trip.user?.nik || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{trip.user?.email || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Position</p>
                  <p className="font-medium">{trip.user?.position || '-'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{trip.user?.department || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Receipts Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ReceiptIcon className="h-5 w-5" />
                  Receipts ({receipts.length})
                </span>
                {receipts.length > 0 && (
                  <Badge variant="secondary">{receipts.length} uploaded</Badge>
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Receipts uploaded during the trip. Final verification will be done after trip completion.
              </p>
            </CardHeader>
            <CardContent>
              {receipts.length === 0 ? (
                <div className="text-center py-12">
                  <ReceiptIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No receipts uploaded yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Employee will upload receipts during or after the trip
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {receipts.map((receipt) => (
                    <div
                      key={receipt.receipt_id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-blue-50 rounded p-2">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{receipt.category}</p>
                          <p className="text-sm text-muted-foreground">{receipt.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>📅 {formatDate(receipt.receipt_date)}</span>
                            <span>💰 {formatCurrency(Number(receipt.amount))}</span>
                            <span>🕐 {formatDateTime(receipt.created_at)}</span>
                          </div>
                        </div>
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
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Financial Info */}
        <div className="space-y-6">
          {/* Budget Reference Card (Simple) */}
          <Card className="bg-gray-50 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4" />
                Budget Reference
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Estimated Budget (Limit)</span>
                  <span className="font-medium">{formatCurrency(estimatedBudget)}</span>
                </div>
                
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">Budget Usage</span>
                    <span className={`text-sm font-bold ${
                      isOverBudget ? 'text-red-600' : 
                      budgetUsagePercent > 80 ? 'text-orange-600' : 
                      'text-green-600'
                    }`}>
                      {budgetUsagePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isOverBudget ? 'bg-red-600' :
                        budgetUsagePercent > 80 ? 'bg-orange-600' :
                        'bg-green-600'
                      }`}
                      style={{
                        width: `${Math.min(budgetUsagePercent, 100)}%`
                      }}
                    />
                  </div>
                </div>

                {isOverBudget && (
                  <Alert className="mt-3 bg-red-50 border-red-200">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                    <AlertDescription className="text-xs text-red-800">
                      Over by {formatCurrency(spentAmount - estimatedBudget)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Card (Main Focus) */}
          <Card className="border-2 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-green-700" />
                Cash Flow
              </CardTitle>
              <p className="text-xs text-green-700 mt-1">
                Tracks actual money flow (advances & expenses)
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {/* Advanced (Real Money Given) */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <div>
                    <span className="text-sm font-medium block">Advanced</span>
                    <span className="text-xs text-green-700">Money given to employee</span>
                  </div>
                </div>
                <span className={`font-bold text-lg ${advanceAmount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {advanceAmount > 0 ? formatCurrency(advanceAmount) : 'None'}
                </span>
              </div>

              {/* Spent (Receipts) */}
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2">
                  <ReceiptIcon className="h-4 w-4 text-orange-600" />
                  <div>
                    <span className="text-sm font-medium block">Spent</span>
                    <span className="text-xs text-orange-700">Total expenses (receipts)</span>
                  </div>
                </div>
                <span className={`font-bold text-lg ${spentAmount > 0 ? 'text-orange-600' : 'text-gray-500'}`}>
                  {spentAmount > 0 ? formatCurrency(spentAmount) : 'None'}
                </span>
              </div>

              {/* Cash Remaining */}
              <div className={`p-4 rounded-lg border-2 ${
                advanceAmount === 0 ? 'bg-gray-50 border-gray-200' :
                cashRemaining < 0 ? 'bg-purple-50 border-purple-200' : 
                cashRemaining < (advanceAmount * 0.2) ? 'bg-yellow-50 border-yellow-200' : 
                'bg-green-50 border-green-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wallet className={`h-4 w-4 ${
                      advanceAmount === 0 ? 'text-gray-600' :
                      cashRemaining < 0 ? 'text-purple-600' : 
                      cashRemaining < (advanceAmount * 0.2) ? 'text-yellow-600' : 
                      'text-green-600'
                    }`} />
                    <span className="text-sm font-semibold">
                      {advanceAmount === 0 ? 'No Advance Given' : cashRemaining < 0 ? 'Used Personal Funds' : 'Advance Money Available'}
                    </span>
                  </div>
                </div>
                
                {advanceAmount > 0 && (
                  <>
                    <div className="text-right">
                      <span className={`font-bold text-2xl ${
                        cashRemaining < 0 ? 'text-purple-600' : 
                        cashRemaining < (advanceAmount * 0.2) ? 'text-yellow-600' : 
                        'text-green-600'
                      }`}>
                        {formatCurrency(Math.abs(cashRemaining))}
                      </span>
                    </div>
                    
                    {cashRemaining < 0 && (
                      <p className="text-xs text-purple-700 mt-2">
                        💰 Employee will receive <strong>{formatCurrency(Math.abs(cashRemaining))}</strong> reimbursement after approval
                      </p>
                    )}
                    
                    {cashRemaining > 0 && cashRemaining < (advanceAmount * 0.2) && (
                      <p className="text-xs text-yellow-700 mt-2">
                        ⚠️ Advance balance running low - employee may need additional advance
                      </p>
                    )}
                    
                    {cashRemaining > 0 && cashRemaining >= (advanceAmount * 0.2) && (
                      <p className="text-xs text-green-700 mt-2">
                        ✅ Unused advance - <strong>{formatCurrency(cashRemaining)}</strong> to be returned to company after trip
                      </p>
                    )}
                  </>
                )}

                {advanceAmount === 0 && spentAmount > 0 && (
                  <p className="text-xs text-gray-700 mt-2">
                    💰 Employee used personal funds. Will receive <strong>{formatCurrency(spentAmount)}</strong> reimbursement after approval.
                  </p>
                )}

                {advanceAmount === 0 && spentAmount === 0 && (
                  <p className="text-xs text-gray-700 mt-2">
                    ℹ️ No advance given yet. Employee may request advance or use personal funds.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trip Timeline Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Trip Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600"></div>
                <div className="flex-1">
                  <p className="font-medium">Trip Started</p>
                  <p className="text-xs text-muted-foreground">{formatDate(trip.start_date)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                <div className="flex-1">
                  <p className="font-medium">Currently Ongoing</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.ceil((new Date(trip.extended_end_date || trip.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
                  </p>
                </div>
              </div>

              {/* ✅ NEW: Show extension info in timeline */}
              {isTripExtended && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-600"></div>
                  <div className="flex-1">
                    <p className="font-medium text-purple-600">Extended Period</p>
                    <p className="text-xs text-purple-700">
                      Original end: {formatDate(trip.end_date)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-sm">
                <div className={`flex-shrink-0 w-2 h-2 rounded-full ${isTripExtended ? 'bg-purple-600' : 'bg-gray-300'}`}></div>
                <div className="flex-1">
                  <p className="font-medium">{isTripExtended ? 'Extended End' : 'Expected End'}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(trip.extended_end_date || trip.end_date)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-semibold mb-1">Monitoring Mode</p>
                  <p>This is a read-only view. Trip is still ongoing and no actions can be taken until the employee completes the trip and submits for settlement.</p>
                  {isTripExtended && (
                    <p className="mt-2 text-xs">
                      ℹ️ Trip has been extended. Employee can still request additional advance during the extended period.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}