// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { 
//   ArrowLeft, 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   FileText,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Receipt as ReceiptIcon,
//   Image as ImageIcon
// } from 'lucide-react'
// import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

// interface Trip {
//   trip_id: number
//   trip_number: string
//   destination: string
//   purpose: string
//   start_date: string
//   end_date: string
//   duration: number
//   status: string
//   total_advance: number
//   total_expenses: number
//   employee_name?: string
// }

// interface Receipt {
//   receipt_id: number
//   receipt_number: string
//   category: string
//   amount: number
//   merchant_name: string
//   receipt_date: string
//   description: string
//   receipt_image_url?: string
//   is_verified: boolean
// }

// export default function TripSettlementDetail() {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
  
//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [receipts, setReceipts] = useState<Receipt[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     if (id) loadData()
//   }, [id])

//   const loadData = async () => {
//     try {
//       setIsLoading(true)
      
//       const tripRes = await tripAPI.getById(Number(id))
//       setTrip(tripRes.data.data)
      
//       const receiptsRes = await receiptAPI.getAll({ trip_id: id })
//       setReceipts(receiptsRes.data.data || [])
      
//     } catch (error) {
//       console.error('Failed to load data:', error)
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
//       month: 'long',
//       year: 'numeric'
//     })
//   }

//   const canTakeAction = trip?.status === 'awaiting_review'

//   const handleApprove = async () => {
//     if (!window.confirm('Approve this settlement and forward to Finance Regional?')) return

//     try {
//       await tripAPI.approveByArea(Number(id), {
//         notes: 'Approved by Finance Area'
//       })
//       alert('Settlement approved and forwarded to Finance Regional')
//       navigate('/finance-area/dashboard')
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Failed to approve settlement')
//     }
//   }

//   const handleReject = async () => {
//     const reason = window.prompt('Please provide rejection reason:')
//     if (!reason) return

//     try {
//       await tripAPI.rejectSettlement(Number(id), {
//         rejection_reason: reason
//       })
//       alert('Settlement rejected')
//       navigate('/finance-area/dashboard')
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Failed to reject settlement')
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
//         <Card className="max-w-md">
//           <CardHeader>
//             <CardTitle>Trip Not Found</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground">Unable to load trip details.</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-primary border-b shadow-soft">
//         <div className="container mx-auto px-4 py-6">
//           <Link
//             to="/finance-area/dashboard"
//             className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Link>
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">Settlement Review</h1>
//               <p className="text-sm text-white/80">{trip.trip_number}</p>
//             </div>
//             {canTakeAction && (
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleReject}
//                   variant="destructive"
//                 >
//                   <XCircle className="w-4 h-4 mr-2" />
//                   Reject
//                 </Button>
//                 <Button
//                   onClick={handleApprove}
//                   variant="default"
//                 >
//                   <CheckCircle2 className="w-4 h-4 mr-2" />
//                   Approve
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Trip Info */}
//           <div className="space-y-6">
//             {/* Trip Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Trip Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground mb-1 block">Destination</label>
//                   <p className="font-semibold">{trip.destination}</p>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground mb-1 block">Purpose</label>
//                   <p className="text-sm">{trip.purpose}</p>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
//                     <p className="text-sm font-medium">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
//                     <p className="text-sm font-medium">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground mb-1 block">Duration</label>
//                   <p className="text-sm font-medium">{trip.duration} days</p>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Financial Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Financial Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Total Advance</span>
//                   <span className="text-sm font-semibold text-green-600">{formatCurrency(trip.total_advance)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Total Expenses</span>
//                   <span className="text-sm font-semibold text-blue-600">{formatCurrency(trip.total_expenses)}</span>
//                 </div>
//                 <div className="pt-3 border-t flex justify-between items-center">
//                   <span className="text-sm font-semibold">Balance</span>
//                   <span className={`text-sm font-bold ${
//                     trip.total_advance - trip.total_expenses > 0 
//                       ? 'text-yellow-600' 
//                       : trip.total_advance - trip.total_expenses < 0 
//                       ? 'text-purple-600' 
//                       : 'text-gray-600'
//                   }`}>
//                     {formatCurrency(trip.total_advance - trip.total_expenses)}
//                   </span>
//                 </div>
//                 <div className="text-xs text-muted-foreground">
//                   {trip.total_advance - trip.total_expenses > 0 && '⚠️ Refund required'}
//                   {trip.total_advance - trip.total_expenses < 0 && '💰 Reimbursement required'}
//                   {trip.total_advance - trip.total_expenses === 0 && '✅ Fully settled'}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Tabs */}
//           <div className="lg:col-span-2">
//             <Card>
//               <Tabs defaultValue="receipts">
//                 <CardHeader>
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="receipts">Receipts ({receipts.length})</TabsTrigger>
//                     <TabsTrigger value="status">Status Tracker</TabsTrigger>
//                   </TabsList>
//                 </CardHeader>

//                 <CardContent>
//                   {/* Receipts Tab */}
//                   <TabsContent value="receipts" className="space-y-4">
//                     {receipts.length === 0 ? (
//                       <div className="text-center py-8">
//                         <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                         <p className="text-muted-foreground">No receipts uploaded</p>
//                       </div>
//                     ) : (
//                       receipts.map(receipt => (
//                         <Card key={receipt.receipt_id} className="border">
//                           <CardContent className="p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div>
//                                 <p className="font-medium">{receipt.receipt_number}</p>
//                                 <p className="text-xs text-muted-foreground capitalize">{receipt.category}</p>
//                               </div>
//                               <Badge variant={receipt.is_verified ? 'default' : 'secondary'}>
//                                 {receipt.is_verified ? 'Verified' : 'Pending'}
//                               </Badge>
//                             </div>
                            
//                             <div className="space-y-2 text-sm mb-3">
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Amount</span>
//                                 <span className="font-semibold">{formatCurrency(receipt.amount)}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Merchant</span>
//                                 <span>{receipt.merchant_name}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Date</span>
//                                 <span>{formatDate(receipt.receipt_date)}</span>
//                               </div>
//                             </div>

//                             {receipt.description && (
//                               <p className="text-xs text-muted-foreground mb-3">{receipt.description}</p>
//                             )}

//                             {/* Receipt Image */}
//                             {receipt.receipt_image_url && (
//                               <div className="mt-3">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => window.open(receipt.receipt_image_url, '_blank')}
//                                 >
//                                   <ImageIcon className="w-4 h-4 mr-2" />
//                                   View Receipt Image
//                                 </Button>
//                               </div>
//                             )}
//                           </CardContent>
//                         </Card>
//                       ))
//                     )}
//                   </TabsContent>

//                   {/* Status Tracker Tab */}
//                   <TabsContent value="status">
//                     <TripStatusTracker 
//                       currentStatus={trip.status} 
//                       history={[]} 
//                     />
//                   </TabsContent>
//                 </CardContent>
//               </Tabs>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { 
//   ArrowLeft, 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   FileText,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Receipt as ReceiptIcon,
//   Image as ImageIcon,
//   User,
//   Eye
// } from 'lucide-react'
// import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

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
//   destination: string
//   purpose: string
//   start_date: string
//   end_date: string
//   duration: number
//   status: string
//   total_advance: number
//   total_expenses: number
//   user: User
//   history?: any[]
//   extended_end_date?: string
//   extension_reason?: string
// }

// interface Receipt {
//   receipt_id: number
//   receipt_number: string
//   category: string
//   amount: number
//   merchant_name: string
//   receipt_date: string
//   description: string
//   file_path: string
//   file_name: string
//   is_verified: boolean
//   verified_by?: number
//   verified_at?: string
// }

// export default function TripSettlementDetail() {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
  
//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [receipts, setReceipts] = useState<Receipt[]>([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     if (id) loadData()
//   }, [id])

//   const loadData = async () => {
//     try {
//       setIsLoading(true)
      
//       // ✅ FIX: Load trip dengan include user dan history
//       const tripRes = await tripAPI.getById(Number(id))
//       console.log('Trip data:', tripRes.data.data)
//       setTrip(tripRes.data.data)
      
//       // ✅ FIX: Load receipts untuk trip ini
//       const receiptsRes = await receiptAPI.getAll({ trip_id: id })
//       console.log('Receipts data:', receiptsRes.data.data)
//       setReceipts(receiptsRes.data.data || [])
      
//     } catch (error) {
//       console.error('Failed to load data:', error)
//       alert('Failed to load trip details')
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
//     if (!dateString) return '-'
//     try {
//       return new Date(dateString).toLocaleDateString('id-ID', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//       })
//     } catch {
//       return '-'
//     }
//   }

//   // ✅ FIX: Cek status untuk menentukan aksi
//   const canTakeAction = trip?.status === 'awaiting_review'

//   const handleApprove = async () => {
//     if (!window.confirm('Approve this settlement and forward to Finance Regional?')) return

//     try {
//       // ✅ FIX: Gunakan method yang benar dari API
//       await tripAPI.approveByRegional(Number(id), {
//         notes: 'Approved by Finance Area'
//       })
//       alert('Settlement approved and forwarded to Finance Regional')
//       navigate('/finance-area/dashboard')
//     } catch (error: any) {
//       console.error('Approve error:', error)
//       alert(error.response?.data?.message || 'Failed to approve settlement')
//     }
//   }

//   const handleReject = async () => {
//     const reason = window.prompt('Please provide rejection reason:')
//     if (!reason) return

//     try {
//       // ✅ FIX: Gunakan method yang benar dari API
//       await tripAPI.rejectSettlement(Number(id), {
//         rejection_reason: reason
//       })
//       alert('Settlement rejected')
//       navigate('/finance-area/dashboard')
//     } catch (error: any) {
//       console.error('Reject error:', error)
//       alert(error.response?.data?.message || 'Failed to reject settlement')
//     }
//   }

//   // ✅ FIX: Fungsi untuk melihat gambar receipt
//   const viewReceiptImage = async (receiptId: number) => {
//     try {
//       const response = await receiptAPI.download(receiptId)
//       const blob = new Blob([response.data])
//       const url = window.URL.createObjectURL(blob)
//       window.open(url, '_blank')
//     } catch (error) {
//       console.error('Failed to download receipt:', error)
//       alert('Failed to view receipt image')
//     }
//   }

//   // ✅ FIX: Get category label
//   const getCategoryLabel = (category: string) => {
//     const categoryMap: Record<string, string> = {
//       transportation: 'Transportation',
//       accommodation: 'Accommodation', 
//       meals: 'Meals',
//       communication: 'Communication',
//       entertainment: 'Entertainment',
//       supplies: 'Supplies',
//       other: 'Other',
//       fuel: 'Fuel',
//       meal: 'Meal',
//       parking: 'Parking',
//       toll: 'Toll'
//     }
//     return categoryMap[category] || category
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
//         <Card className="max-w-md">
//           <CardHeader>
//             <CardTitle>Trip Not Found</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <p className="text-muted-foreground">Unable to load trip details.</p>
//           </CardContent>
//           <CardFooter>
//             <Button onClick={() => navigate('/finance-area/dashboard')}>
//               Back to Dashboard
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-primary border-b shadow-soft">
//         <div className="container mx-auto px-4 py-6">
//           <Link
//             to="/finance-area/dashboard"
//             className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Dashboard
//           </Link>
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-white mb-1">Settlement Review</h1>
//               <p className="text-sm text-white/80">{trip.trip_number} - {trip.destination}</p>
//             </div>
//             {canTakeAction && (
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleReject}
//                   variant="destructive"
//                 >
//                   <XCircle className="w-4 h-4 mr-2" />
//                   Reject
//                 </Button>
//                 <Button
//                   onClick={handleApprove}
//                   variant="default"
//                 >
//                   <CheckCircle2 className="w-4 h-4 mr-2" />
//                   Approve
//                 </Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Trip Info */}
//           <div className="space-y-6">
//             {/* Trip Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Trip Information</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex items-center gap-2">
//                   <User className="h-4 w-4 text-muted-foreground" />
//                   <div>
//                     <p className="text-sm font-medium">{trip.user?.name}</p>
//                     <p className="text-xs text-muted-foreground">{trip.user?.department}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground mb-1 block">Destination</label>
//                   <p className="font-semibold">{trip.destination}</p>
//                 </div>
                
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground mb-1 block">Purpose</label>
//                   <p className="text-sm">{trip.purpose}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
//                     <p className="text-sm font-medium">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
//                     <p className="text-sm font-medium">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-sm font-medium text-muted-foreground mb-1 block">Duration</label>
//                   <p className="text-sm font-medium">{trip.duration} days</p>
//                 </div>

//                 {trip.extended_end_date && (
//                   <div className="pt-3 border-t">
//                     <label className="text-xs text-muted-foreground mb-1 block">Extended Until</label>
//                     <p className="text-sm font-medium text-warning">{formatDate(trip.extended_end_date)}</p>
//                     {trip.extension_reason && (
//                       <p className="text-xs text-muted-foreground mt-1">{trip.extension_reason}</p>
//                     )}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Financial Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Financial Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Total Advance</span>
//                   <span className="text-sm font-semibold text-primary">{formatCurrency(trip.total_advance || 0)}</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-sm text-muted-foreground">Total Expenses</span>
//                   <span className="text-sm font-semibold text-success">{formatCurrency(trip.total_expenses || 0)}</span>
//                 </div>
//                 <div className="pt-3 border-t flex justify-between items-center">
//                   <span className="text-sm font-semibold">Balance</span>
//                   <span className={`text-sm font-bold ${
//                     (trip.total_advance || 0) - (trip.total_expenses || 0) > 0 
//                       ? 'text-warning' 
//                       : (trip.total_advance || 0) - (trip.total_expenses || 0) < 0 
//                       ? 'text-purple-600' 
//                       : 'text-gray-600'
//                   }`}>
//                     {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
//                   </span>
//                 </div>
//                 <div className="text-xs text-muted-foreground">
//                   {(trip.total_advance || 0) - (trip.total_expenses || 0) > 0 && '⚠️ Refund required'}
//                   {(trip.total_advance || 0) - (trip.total_expenses || 0) < 0 && '💰 Reimbursement required'}
//                   {(trip.total_advance || 0) - (trip.total_expenses || 0) === 0 && '✅ Fully settled'}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Status Info */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-lg">Status</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Badge 
//                   variant={
//                     trip.status === 'awaiting_review' ? 'secondary' :
//                     trip.status === 'under_review_area' ? 'default' :
//                     trip.status === 'under_review_regional' ? 'default' :
//                     trip.status === 'completed' ? 'outline' : 'secondary'
//                   }
//                   className="text-base py-2 px-4"
//                 >
//                   {trip.status.replace(/_/g, ' ').toUpperCase()}
//                 </Badge>
                
//                 {trip.status === 'awaiting_review' && (
//                   <p className="text-sm text-muted-foreground mt-2">
//                     This trip is waiting for your review. Check receipts and financial summary before approving or rejecting.
//                   </p>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Tabs */}
//           <div className="lg:col-span-2">
//             <Card>
//               <Tabs defaultValue="receipts">
//                 <CardHeader>
//                   <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="receipts">Receipts ({receipts.length})</TabsTrigger>
//                     <TabsTrigger value="status">Status Tracker</TabsTrigger>
//                   </TabsList>
//                 </CardHeader>

//                 <CardContent>
//                   {/* Receipts Tab */}
//                   <TabsContent value="receipts" className="space-y-4">
//                     {receipts.length === 0 ? (
//                       <div className="text-center py-8">
//                         <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
//                         <p className="text-muted-foreground">No receipts uploaded</p>
//                       </div>
//                     ) : (
//                       receipts.map(receipt => (
//                         <Card key={receipt.receipt_id} className="border">
//                           <CardContent className="p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div>
//                                 <p className="font-medium">{receipt.receipt_number}</p>
//                                 <p className="text-xs text-muted-foreground capitalize">
//                                   {getCategoryLabel(receipt.category)}
//                                 </p>
//                               </div>
//                               <Badge variant={receipt.is_verified ? 'default' : 'secondary'}>
//                                 {receipt.is_verified ? 'Verified' : 'Pending Verification'}
//                               </Badge>
//                             </div>
                            
//                             <div className="space-y-2 text-sm mb-3">
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Amount</span>
//                                 <span className="font-semibold">{formatCurrency(receipt.amount)}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Merchant</span>
//                                 <span>{receipt.merchant_name}</span>
//                               </div>
//                               <div className="flex justify-between">
//                                 <span className="text-muted-foreground">Date</span>
//                                 <span>{formatDate(receipt.receipt_date)}</span>
//                               </div>
//                             </div>

//                             {receipt.description && (
//                               <p className="text-xs text-muted-foreground mb-3">{receipt.description}</p>
//                             )}

//                             {/* Receipt Image - FIXED */}
//                             {receipt.file_path && (
//                               <div className="mt-3">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => viewReceiptImage(receipt.receipt_id)}
//                                 >
//                                   <Eye className="w-4 h-4 mr-2" />
//                                   View Receipt
//                                 </Button>
//                               </div>
//                             )}
//                           </CardContent>
//                         </Card>
//                       ))
//                     )}
//                   </TabsContent>

//                   {/* Status Tracker Tab */}
//                   <TabsContent value="status">
//                     <TripStatusTracker 
//                       currentStatus={trip.status} 
//                       history={trip.history || []} 
//                     />
//                   </TabsContent>
//                 </CardContent>
//               </Tabs>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect } from 'react'
// import { useParams, useNavigate, Link } from 'react-router-dom'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { 
//   ArrowLeft, 
//   MapPin, 
//   Calendar, 
//   DollarSign, 
//   FileText,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Receipt as ReceiptIcon,
//   Image as ImageIcon,
//   User,
//   Eye,
//   Download,
//   Clock // ✅ SUDAH DITAMBAHKAN: Solusi untuk error Clock
// } from 'lucide-react'
// import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

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
//   destination: string
//   purpose: string
//   start_date: string
//   end_date: string
//   duration: number
//   status: string
//   total_advance: number
//   total_expenses: number
//   user: User
//   history?: any[]
//   extended_end_date?: string
//   extension_reason?: string
// }

// interface Receipt {
//   receipt_id: number
//   receipt_number: string
//   category: string
//   amount: number
//   merchant_name: string
//   receipt_date: string
//   description: string
//   file_path: string
//   file_name: string
//   is_verified: boolean
//   verified_by?: number
//   verified_at?: string
// }

// export default function TripSettlementDetail() {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [receipts, setReceipts] = useState<Receipt[]>([])
//   const [isLoading, setIsLoading] = useState(true)
  
//   useEffect(() => {
//     if (id) loadData()
//   }, [id])

//   const loadData = async () => {
//     try {
//       setIsLoading(true)
//       const tripRes = await tripAPI.getById(Number(id))
//       setTrip(tripRes.data.data)
      
//       const receiptsRes = await receiptAPI.getAll({ trip_id: id })
//       setReceipts(receiptsRes.data.data || [])
//     } catch (error) {
//       console.error('Failed to load data:', error)
//       alert('Failed to load trip details')
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
//     if (!dateString) return '-'
//     try {
//       return new Date(dateString).toLocaleDateString('id-ID', {
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//       })
//     } catch {
//       return '-'
//     }
//   }

//   // ✅ FIX: Cek status untuk menentukan aksi
//   const canTakeAction = trip?.status === 'awaiting_review'

//   // ✅ FIX: Approve untuk Finance Area (bukan Regional)
//   const handleApprove = async () => {
//     if (!window.confirm('Approve this settlement and forward to Finance Regional?')) return
//     try {
//       // ✅ PERBAIKAN: Ganti menjadi approveByArea sesuai dengan definisi di api.ts
//       await tripAPI.approveByArea(Number(id), {
//         notes: 'Approved by Finance Area'
//       })
//       alert('Settlement approved and forwarded to Finance Regional')
//       navigate('/finance-area/dashboard')
//     } catch (error: any) {
//       console.error('Approve error:', error)
//       alert(error.response?.data?.message || 'Failed to approve settlement: ' + error.message)
//     }
//   }

//   // ✅ FIX: Reject
//   const handleReject = async () => {
//     const reason = window.prompt('Please provide rejection reason:')
//     if (!reason) return
//     try {
//       // ✅ PERBAIKAN: Ganti menjadi rejectSettlement sesuai dengan definisi di api.ts
//       await tripAPI.rejectSettlement(Number(id), {
//         rejection_reason: reason
//       })
//       alert('Settlement rejected successfully')
//       navigate('/finance-area/dashboard')
//     } catch (error: any) {
//       console.error('Reject error:', error)
//       alert(error.response?.data?.message || 'Failed to reject settlement: ' + error.message)
//     }
//   }

//   // ✅ FIX: Download receipt dengan responseType blob yang benar
//   const viewReceiptImage = async (receiptId: number) => {
//     try {
//       const response = await receiptAPI.download(receiptId)
      
//       // Cek apakah ini gambar atau PDF
//       const contentType = response.headers['content-type'] || 'application/octet-stream'
//       const blob = new Blob([response.data], { type: contentType })
      
//       // Buat URL untuk blob
//       const url = window.URL.createObjectURL(blob)
      
//       // Buka di tab baru
//       window.open(url, '_blank')
      
//       // Bebaskan URL setelah 5 menit
//       setTimeout(() => {
//         window.URL.revokeObjectURL(url)
//       }, 300000)
//     } catch (error: any) {
//       console.error('Failed to download receipt:', error)
//       alert('Failed to view receipt image: ' + (error.response?.data?.message || error.message))
      
//       // Fallback: download langsung
//       if (error.response?.status === 401) {
//         localStorage.removeItem('token')
//         window.location.href = '/login'
//       }
//     }
//   }

//   // ✅ FIX: Category mapping yang lengkap
//   const getCategoryLabel = (category: string) => {
//     const categoryMap: Record<string, string> = {
//       // Backend format
//       fuel: 'Fuel',
//       meal: 'Meal',
//       accommodation: 'Accommodation',
//       transportation: 'Transportation',
//       parking: 'Parking',
//       toll: 'Toll',
//       other: 'Other',
//       // Frontend format (untuk kompatibilitas)
//       meals: 'Meals',
//       communication: 'Communication',
//       entertainment: 'Entertainment',
//       supplies: 'Supplies'
//     }
//     return categoryMap[category.toLowerCase()] || category
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto border"></div>
//           <p className="mt-4 text-muted-foreground font-medium">Loading trip settlement review...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!trip) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="max-w-md border border-border shadow-lg">
//           <CardHeader className="border-b border-border">
//             <div className="flex items-center justify-center mb-3">
//               <AlertCircle className="h-6 w-6 text-destructive" />
//             </div>
//             <CardTitle className="text-center text-xl font-bold text-foreground">Trip Not Found</CardTitle>
//           </CardHeader>
//           <CardContent className="py-6">
//             <p className="text-center text-muted-foreground mb-4">
//               Unable to load trip details. The trip may have been deleted or you don't have permission to access it.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Button 
//               onClick={() => navigate('/finance-area/dashboard')}
//               className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
//             >
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Back to Dashboard
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-primary/90 to-primary border-b shadow-sm">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between mb-6">
//             <div className="flex items-center space-x-4">
//               <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
//                 <FileText className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">Settlement Review</h1>
//                 <p className="text-sm text-white/80">{trip.trip_number} - {trip.destination}</p>
//               </div>
//             </div>
//             {canTakeAction && (
//               <div className="flex gap-3">
//                 <Button
//                   onClick={handleReject}
//                   variant="outline"
//                   className="border-destructive text-destructive hover:bg-destructive/10"
//                 >
//                   <XCircle className="w-4 h-4 mr-2" />
//                   Reject Settlement
//                 </Button>
//                 <Button
//                   onClick={handleApprove}
//                   className="bg-green-500 hover:bg-green-600 text-white"
//                 >
//                   <CheckCircle2 className="w-4 h-4 mr-2" />
//                   Approve Settlement
//                 </Button>
//               </div>
//             )}
//           </div>
          
//           {trip.status === 'awaiting_review' && (
//             <div className="bg-white/10 border border-white/20 rounded-lg p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="font-medium text-white">Action Required</p>
//                   <p className="text-sm text-white/80 mt-1">
//                     This trip settlement is awaiting your review. Please verify all receipts and financial summary before approving or rejecting.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Trip Info */}
//           <div className="space-y-6">
//             {/* Trip Information */}
//             <Card className="shadow-sm border-border">
//               <CardHeader className="border-b border-border pb-4">
//                 <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
//                   <User className="h-5 w-5 text-muted-foreground" />
//                   Trip Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-4">
//                 <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
//                   <User className="h-5 w-5 text-primary" />
//                   <div>
//                     <p className="font-semibold text-foreground">{trip.user?.name}</p>
//                     <p className="text-sm text-muted-foreground">{trip.user?.department} • {trip.user?.position}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Destination</label>
//                   <p className="font-medium text-lg text-foreground">{trip.destination}</p>
//                 </div>
                
//                 <div>
//                   <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Purpose</label>
//                   <p className="text-foreground">{trip.purpose}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Start Date</label>
//                     <p className="font-medium text-foreground">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">End Date</label>
//                     <p className="font-medium text-foreground">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Duration</label>
//                   <p className="font-medium text-2xl text-primary">{trip.duration} <span className="text-base font-normal text-muted-foreground">days</span></p>
//                 </div>
                
//                 {trip.extended_end_date && (
//                   <div className="pt-4 border-t border-border">
//                     <div className="flex items-start gap-2">
//                       <AlertCircle className="h-4 w-4 text-warning mt-1" />
//                       <div>
//                         <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Extended Until</label>
//                         <p className="font-medium text-warning">{formatDate(trip.extended_end_date)}</p>
//                         {trip.extension_reason && (
//                           <p className="text-sm text-muted-foreground mt-1">{trip.extension_reason}</p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
            
//             {/* Financial Summary */}
//             <Card className="shadow-sm border-border">
//               <CardHeader className="border-b border-border pb-4">
//                 <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
//                   <DollarSign className="h-5 w-5 text-muted-foreground" />
//                   Financial Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-4">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className="text-sm font-medium text-muted-foreground">Total Advance</span>
//                     <p className="text-xs text-muted-foreground">(Approved Panjar)</p>
//                   </div>
//                   <span className="text-lg font-bold text-primary">{formatCurrency(trip.total_advance || 0)}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center pt-3 border-t border-border">
//                   <div>
//                     <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
//                     <p className="text-xs text-muted-foreground">(Receipts Uploaded)</p>
//                   </div>
//                   <span className="text-lg font-bold text-success">{formatCurrency(trip.total_expenses || 0)}</span>
//                 </div>
                
//                 <div className="pt-4 border-t border-border">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-semibold text-foreground">Balance (Advance - Expenses)</span>
//                     <span className={`text-lg font-bold ${
//                       (trip.total_advance || 0) - (trip.total_expenses || 0) > 0 
//                         ? 'text-warning' 
//                         : (trip.total_advance || 0) - (trip.total_expenses || 0) < 0 
//                         ? 'text-purple-600' 
//                         : 'text-green-600'
//                     }`}>
//                       {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
//                     </span>
//                   </div>
//                   <div className="mt-2 text-center">
//                     {(trip.total_advance || 0) - (trip.total_expenses || 0) > 0 && (
//                       <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20">
//                         ⚠️ Employee must refund this amount
//                       </Badge>
//                     )}
//                     {(trip.total_advance || 0) - (trip.total_expenses || 0) < 0 && (
//                       <Badge variant="secondary" className="bg-purple-50/10 text-purple-600 hover:bg-purple-50/20">
//                         💰 Employee requires reimbursement
//                       </Badge>
//                     )}
//                     {(trip.total_advance || 0) - (trip.total_expenses || 0) === 0 && (
//                       <Badge variant="secondary" className="bg-green-50/10 text-green-600 hover:bg-green-50/20">
//                         ✅ Fully settled - No action needed
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Status Info */}
//             <Card className="shadow-sm border-border">
//               <CardHeader className="border-b border-border pb-4">
//                 <CardTitle className="text-lg font-bold text-foreground">Current Status</CardTitle>
//               </CardHeader>
//               <CardContent className="pt-4">
//                 <div className="text-center py-4">
//                   <Badge 
//                     variant={
//                       trip.status === 'awaiting_review' ? 'secondary' :
//                       trip.status === 'under_review_area' ? 'default' :
//                       trip.status === 'under_review_regional' ? 'default' :
//                       trip.status === 'completed' ? 'outline' : 'secondary'
//                     }
//                     className="text-base py-2 px-4 font-medium text-center block mx-auto mb-3"
//                   >
//                     {trip.status.replace(/_/g, ' ').toUpperCase()}
//                   </Badge>
                  
//                   <div className="space-y-3">
//                     {trip.status === 'awaiting_review' && (
//                       <>
//                         <p className="text-sm text-muted-foreground">
//                           This trip settlement is awaiting your review. Please verify all receipts and financial summary.
//                         </p>
//                         <div className="bg-blue-50/50 border border-blue-200 rounded-lg p-3 text-sm">
//                           <p className="text-blue-800 font-medium">Next Action:</p>
//                           <p className="text-blue-700 mt-1">Approve to forward to Finance Regional, or Reject to return to employee</p>
//                         </div>
//                       </>
//                     )}
                    
//                     {trip.status === 'under_review_regional' && (
//                       <p className="text-sm text-muted-foreground">
//                         This settlement has been approved by Finance Area and is now under Finance Regional review.
//                       </p>
//                     )}
                    
//                     {trip.status === 'completed' && (
//                       <p className="text-sm text-muted-foreground">
//                         This settlement has been completed and all financial transactions have been processed.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
          
//           {/* Right Column - Tabs */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-sm border-border">
//               <Tabs defaultValue="receipts">
//                 <CardHeader className="border-b border-border pb-4">
//                   <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-lg">
//                     <TabsTrigger 
//                       value="receipts" 
//                       className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
//                     >
//                       Receipts ({receipts.length})
//                     </TabsTrigger>
//                     <TabsTrigger 
//                       value="status" 
//                       className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium"
//                     >
//                       Status Tracker
//                     </TabsTrigger>
//                   </TabsList>
//                 </CardHeader>
//                 <CardContent className="pt-4">
//                   {/* Receipts Tab */}
//                   <TabsContent value="receipts" className="space-y-4">
//                     {receipts.length === 0 ? (
//                       <div className="text-center py-12">
//                         <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <ReceiptIcon className="h-8 w-8 text-muted-foreground" />
//                         </div>
//                         <h3 className="text-lg font-semibold mb-2 text-foreground">No receipts uploaded</h3>
//                         <p className="text-muted-foreground mb-6">
//                           Employee has not uploaded any receipts for this trip yet
//                         </p>
//                       </div>
//                     ) : (
//                       receipts.map(receipt => (
//                         <Card key={receipt.receipt_id} className={`border ${receipt.is_verified ? 'border-green-200' : 'border-border'}`}>
//                           <CardContent className="p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="space-y-1">
//                                 <div className="flex items-center gap-2">
//                                   <p className="font-semibold text-lg text-foreground">{receipt.receipt_number}</p>
//                                   <Badge variant="secondary" className="text-xs px-2 py-0.5">
//                                     {getCategoryLabel(receipt.category)}
//                                   </Badge>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground">{receipt.merchant_name}</p>
//                               </div>
//                               <Badge 
//                                 variant={receipt.is_verified ? 'default' : 'secondary'}
//                                 className={`text-xs px-3 py-1 ${
//                                   receipt.is_verified 
//                                     ? 'bg-green-100 text-green-800 border border-green-200' 
//                                     : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
//                                 }`}
//                               >
//                                 {receipt.is_verified ? (
//                                   <span className="flex items-center gap-1">
//                                     <CheckCircle2 className="h-3 w-3" />
//                                     Verified
//                                   </span>
//                                 ) : (
//                                   <span className="flex items-center gap-1">
//                                     <Clock className="h-3 w-3" />
//                                     Pending Verification
//                                   </span>
//                                 )}
//                               </Badge>
//                             </div>
                            
//                             <div className="grid grid-cols-3 gap-4 text-sm mb-3 border-b border-border pb-3">
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Amount</span>
//                                 <p className="font-medium text-foreground mt-1">{formatCurrency(receipt.amount)}</p>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Date</span>
//                                 <p className="font-medium text-foreground mt-1">{formatDate(receipt.receipt_date)}</p>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Status</span>
//                                 <p className="font-medium text-foreground mt-1">
//                                   {receipt.is_verified ? 'Verified' : 'Pending'}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             {receipt.description && (
//                               <p className="text-sm text-muted-foreground mb-3 italic">
//                                 "{receipt.description}"
//                               </p>
//                             )}
                            
//                             {/* Receipt Actions */}
//                             <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => viewReceiptImage(receipt.receipt_id)}
//                                 className="flex items-center gap-2"
//                               >
//                                 <Eye className="w-4 h-4" />
//                                 View Image
//                               </Button>
                              
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => {
//                                   const link = document.createElement('a')
//                                   link.href = `/api/receipts/${receipt.receipt_id}/download`
//                                   link.download = receipt.file_name || `receipt-${receipt.receipt_id}`
//                                   document.body.appendChild(link)
//                                   link.click()
//                                   document.body.removeChild(link)
//                                 }}
//                                 className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
//                               >
//                                 <Download className="w-4 h-4" />
//                                 Download
//                               </Button>
                              
//                               {receipt.is_verified && receipt.verified_at && (
//                                 <div className="flex items-center gap-1 text-xs text-green-600 ml-auto">
//                                   <CheckCircle2 className="w-3 h-3" />
//                                   <span>Verified on {new Date(receipt.verified_at).toLocaleDateString()}</span>
//                                 </div>
//                               )}
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))
//                     )}
//                   </TabsContent>
                  
//                   {/* Status Tracker Tab */}
//                   <TabsContent value="status">
//                     <div className="bg-muted/30 rounded-lg p-4">
//                       <TripStatusTracker 
//                         currentStatus={trip.status} 
//                         history={trip.history || []} 
//                       />
//                     </div>
//                   </TabsContent>
//                 </CardContent>
//               </Tabs>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { tripAPI, receiptAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  ArrowLeft, 
  DollarSign, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Receipt as ReceiptIcon,
  User,
  Eye,
  Download,
  Clock
} from 'lucide-react'
import { TripStatusTracker } from '@/components/employee/TripStatusTracker'

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
  destination: string
  purpose: string
  start_date: string
  end_date: string
  duration: number
  status: string
  total_advance: number
  total_expenses: number
  user: User
  history?: any[]
  extended_end_date?: string
  extension_reason?: string
}

interface Receipt {
  receipt_id: number
  receipt_number: string
  category: string
  amount: number
  merchant_name: string
  receipt_date: string
  description: string
  file_path: string
  file_name: string
  is_verified: boolean
  verified_by?: number
  verified_at?: string
}

export default function TripSettlementDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<Trip | null>(null)
  const [receipts, setReceipts] = useState<Receipt[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (id) loadData()
  }, [id])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const tripRes = await tripAPI.getById(Number(id))
      setTrip(tripRes.data.data)
      
      const receiptsRes = await receiptAPI.getAll({ trip_id: id })
      setReceipts(receiptsRes.data.data || [])
    } catch (error) {
      console.error('Failed to load data:', error)
      alert('Failed to load trip details')
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
    if (!dateString) return '-'
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    } catch {
      return '-'
    }
  }

  const canTakeAction = trip?.status === 'awaiting_review'

  const handleApprove = async () => {
    if (!window.confirm('Approve this settlement and forward to Finance Regional?')) return
    try {
      await tripAPI.approveByArea(Number(id), {
        notes: 'Approved by Finance Area'
      })
      alert('Settlement approved and forwarded to Finance Regional')
      navigate('/finance-area/dashboard')
    } catch (error: any) {
      console.error('Approve error:', error)
      alert(error.response?.data?.message || 'Failed to approve settlement')
    }
  }

  const handleReject = async () => {
    const reason = window.prompt('Please provide rejection reason:')
    if (!reason) return
    try {
      await tripAPI.rejectSettlement(Number(id), {
        rejection_reason: reason
      })
      alert('Settlement rejected successfully')
      navigate('/finance-area/dashboard')
    } catch (error: any) {
      console.error('Reject error:', error)
      alert(error.response?.data?.message || 'Failed to reject settlement')
    }
  }

  const viewReceiptImage = async (receiptId: number) => {
    try {
      const response = await receiptAPI.download(receiptId)
      const contentType = response.headers['content-type'] || 'application/octet-stream'
      const blob = new Blob([response.data], { type: contentType })
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
      setTimeout(() => window.URL.revokeObjectURL(url), 300000)
    } catch (error: any) {
      console.error('Failed to download receipt:', error)
      alert('Failed to view receipt image')
    }
  }

  const getCategoryLabel = (category: string) => {
    const categoryMap: Record<string, string> = {
      fuel: 'Fuel',
      meal: 'Meal',
      accommodation: 'Accommodation',
      transportation: 'Transportation',
      parking: 'Parking',
      toll: 'Toll',
      other: 'Other',
      meals: 'Meals',
      communication: 'Communication',
      entertainment: 'Entertainment',
      supplies: 'Supplies'
    }
    return categoryMap[category.toLowerCase()] || category
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading trip settlement review...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md border shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center justify-center mb-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-center text-xl font-bold">Trip Not Found</CardTitle>
          </CardHeader>
          <CardContent className="py-6">
            <p className="text-center text-muted-foreground mb-4">
              Unable to load trip details.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/finance-area/dashboard')}
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/90 to-primary border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Settlement Review</h1>
                <p className="text-sm text-white/80">{trip.trip_number} - {trip.destination}</p>
              </div>
            </div>
            {canTakeAction && (
              <div className="flex gap-3">
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Settlement
                </Button>
                <Button
                  onClick={handleApprove}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Approve Settlement
                </Button>
              </div>
            )}
          </div>
          
          {trip.status === 'awaiting_review' && (
            <div className="bg-white/10 border border-white/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Action Required</p>
                  <p className="text-sm text-white/80 mt-1">
                    This trip settlement is awaiting your review. Please verify all receipts and financial summary.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Trip Information */}
            <Card className="shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  Trip Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold">{trip.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{trip.user?.department} • {trip.user?.position}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Destination</label>
                  <p className="font-medium text-lg">{trip.destination}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Purpose</label>
                  <p>{trip.purpose}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Start Date</label>
                    <p className="font-medium">{formatDate(trip.start_date)}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">End Date</label>
                    <p className="font-medium">{formatDate(trip.end_date)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Duration</label>
                  <p className="font-medium text-2xl text-primary">{trip.duration} <span className="text-base font-normal text-muted-foreground">days</span></p>
                </div>
                
                {trip.extended_end_date && (
                  <div className="pt-4 border-t">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-warning mt-1" />
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Extended Until</label>
                        <p className="font-medium text-warning">{formatDate(trip.extended_end_date)}</p>
                        {trip.extension_reason && (
                          <p className="text-sm text-muted-foreground mt-1">{trip.extension_reason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Financial Summary */}
            <Card className="shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Total Advance</span>
                    <p className="text-xs text-muted-foreground">(Approved Panjar)</p>
                  </div>
                  <span className="text-lg font-bold text-primary">{formatCurrency(trip.total_advance || 0)}</span>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t">
                  <div>
                    <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
                    <p className="text-xs text-muted-foreground">(Receipts)</p>
                  </div>
                  <span className="text-lg font-bold text-success">{formatCurrency(trip.total_expenses || 0)}</span>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Balance</span>
                    <span className={`text-lg font-bold ${
                      (trip.total_advance || 0) - (trip.total_expenses || 0) > 0 
                        ? 'text-warning' 
                        : (trip.total_advance || 0) - (trip.total_expenses || 0) < 0 
                        ? 'text-purple-600' 
                        : 'text-green-600'
                    }`}>
                      {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
                    </span>
                  </div>
                  <div className="mt-2 text-center">
                    {(trip.total_advance || 0) - (trip.total_expenses || 0) > 0 && (
                      <Badge variant="secondary" className="bg-warning/10 text-warning">
                        ⚠️ Employee must refund
                      </Badge>
                    )}
                    {(trip.total_advance || 0) - (trip.total_expenses || 0) < 0 && (
                      <Badge variant="secondary" className="bg-purple-50/10 text-purple-600">
                        💰 Requires reimbursement
                      </Badge>
                    )}
                    {(trip.total_advance || 0) - (trip.total_expenses || 0) === 0 && (
                      <Badge variant="secondary" className="bg-green-50/10 text-green-600">
                        ✅ Fully settled
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <Tabs defaultValue="receipts">
                <CardHeader className="border-b pb-4">
                  <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-lg">
                    <TabsTrigger value="receipts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
                      Receipts ({receipts.length})
                    </TabsTrigger>
                    <TabsTrigger value="status" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
                      Status Tracker
                    </TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent className="pt-4">
                  <TabsContent value="receipts" className="space-y-4">
                    {receipts.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ReceiptIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No receipts uploaded</h3>
                        <p className="text-muted-foreground">Employee has not uploaded any receipts yet</p>
                      </div>
                    ) : (
                      receipts.map(receipt => (
                        <Card key={receipt.receipt_id} className={`border ${receipt.is_verified ? 'border-green-200' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold text-lg">{receipt.receipt_number}</p>
                                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                    {getCategoryLabel(receipt.category)}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{receipt.merchant_name}</p>
                              </div>
                              <Badge 
                                variant={receipt.is_verified ? 'default' : 'secondary'}
                                className={`text-xs px-3 py-1 ${
                                  receipt.is_verified 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}
                              >
                                {receipt.is_verified ? (
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Verified
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    Pending
                                  </span>
                                )}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm mb-3 border-b pb-3">
                              <div>
                                <span className="text-xs text-muted-foreground">Amount</span>
                                <p className="font-medium mt-1">{formatCurrency(receipt.amount)}</p>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Date</span>
                                <p className="font-medium mt-1">{formatDate(receipt.receipt_date)}</p>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Status</span>
                                <p className="font-medium mt-1">
                                  {receipt.is_verified ? 'Verified' : 'Pending'}
                                </p>
                              </div>
                            </div>
                            
                            {receipt.description && (
                              <p className="text-sm text-muted-foreground mb-3 italic">
                                "{receipt.description}"
                              </p>
                            )}
                            
                            {/* Receipt Actions */}
                            <div className="flex flex-wrap gap-2 pt-3 border-t">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => viewReceiptImage(receipt.receipt_id)}
                                className="flex items-center gap-2"
                              >
                                <Eye className="w-4 h-4" />
                                View Image
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const link = document.createElement('a')
                                  link.href = `/api/receipts/${receipt.receipt_id}/download`
                                  link.download = receipt.file_name || `receipt-${receipt.receipt_id}`
                                  document.body.appendChild(link)
                                  link.click()
                                  document.body.removeChild(link)
                                }}
                                className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </Button>
                              
                              {receipt.is_verified && receipt.verified_at && (
                                <div className="flex items-center gap-1 text-xs text-green-600 ml-auto">
                                  <CheckCircle2 className="w-3 h-3" />
                                  <span>Verified on {new Date(receipt.verified_at).toLocaleDateString('id-ID')}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  
                  {/* Status Tracker Tab */}
                  <TabsContent value="status">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <TripStatusTracker 
                        currentStatus={trip.status} 
                        history={trip.history || []} 
                      />
                    </div>
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}