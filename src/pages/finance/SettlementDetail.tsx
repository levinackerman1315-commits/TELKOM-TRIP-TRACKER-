// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { 
//   ArrowLeft, 
//   DollarSign, 
//   FileText,
//   CheckCircle2,
//   XCircle,
//   AlertCircle,
//   Receipt as ReceiptIcon,
//   User,
//   Eye,
//   Download,
//   Clock
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

// export default function SettlementDetail() {
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

//   // ✅ Cek apakah Finance Regional bisa approve
//   const canTakeAction = trip?.status === 'under_review_regional'

//   // ✅ Approve Settlement (Finance Regional)
//   const handleApprove = async () => {
//     if (!window.confirm('Approve this settlement and mark as completed?')) return
//     try {
//       await tripAPI.approveSettlementRegional(Number(id), {
//         notes: 'Approved by Finance Regional'
//       })
//       alert('Settlement approved and completed successfully')
//       navigate('/finance/dashboard')
//     } catch (error: any) {
//       console.error('Approve error:', error)
//       alert(error.response?.data?.message || 'Failed to approve settlement')
//     }
//   }

//   // ✅ Reject Settlement (Finance Regional)
//   const handleReject = async () => {
//     const reason = window.prompt('Please provide rejection reason:')
//     if (!reason) return
//     try {
//       await tripAPI.rejectSettlement(Number(id), {
//         rejection_reason: reason
//       })
//       alert('Settlement rejected and returned to employee')
//       navigate('/finance/dashboard')
//     } catch (error: any) {
//       console.error('Reject error:', error)
//       alert(error.response?.data?.message || 'Failed to reject settlement')
//     }
//   }

//   const viewReceiptImage = async (receiptId: number) => {
//     try {
//       const response = await receiptAPI.download(receiptId)
//       const contentType = response.headers['content-type'] || 'application/octet-stream'
//       const blob = new Blob([response.data], { type: contentType })
//       const url = window.URL.createObjectURL(blob)
//       window.open(url, '_blank')
//       setTimeout(() => window.URL.revokeObjectURL(url), 300000)
//     } catch (error: any) {
//       console.error('Failed to download receipt:', error)
//       alert('Failed to view receipt image')
//     }
//   }

//   const getCategoryLabel = (category: string) => {
//     const categoryMap: Record<string, string> = {
//       fuel: 'Fuel',
//       meal: 'Meal',
//       accommodation: 'Accommodation',
//       transportation: 'Transportation',
//       parking: 'Parking',
//       toll: 'Toll',
//       other: 'Other',
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
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground font-medium">Loading settlement review...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!trip) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="max-w-md border shadow-lg">
//           <CardHeader className="border-b">
//             <div className="flex items-center justify-center mb-3">
//               <AlertCircle className="h-6 w-6 text-destructive" />
//             </div>
//             <CardTitle className="text-center text-xl font-bold">Trip Not Found</CardTitle>
//           </CardHeader>
//           <CardContent className="py-6">
//             <p className="text-center text-muted-foreground mb-4">
//               Unable to load trip details.
//             </p>
//           </CardContent>
//           <CardFooter>
//             <Button 
//               onClick={() => navigate('/finance/dashboard')}
//               className="w-full"
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
//                 <h1 className="text-2xl font-bold text-white">Settlement Final Review</h1>
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
//                   Approve & Complete
//                 </Button>
//               </div>
//             )}
//           </div>
          
//           {trip.status === 'under_review_regional' && (
//             <div className="bg-white/10 border border-white/20 rounded-lg p-4">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="font-medium text-white">Final Review Required</p>
//                   <p className="text-sm text-white/80 mt-1">
//                     This settlement has been approved by Finance Area and is awaiting your final approval. Please verify all details before completing.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {trip.status === 'completed' && (
//             <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
//               <div className="flex items-start gap-3">
//                 <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
//                 <div>
//                   <p className="font-medium text-white">Settlement Completed</p>
//                   <p className="text-sm text-white/80 mt-1">
//                     This settlement has been completed and all financial transactions have been processed.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column */}
//           <div className="space-y-6">
//             {/* Trip Information */}
//             <Card className="shadow-sm">
//               <CardHeader className="border-b pb-4">
//                 <CardTitle className="text-lg font-bold flex items-center gap-2">
//                   <User className="h-5 w-5 text-muted-foreground" />
//                   Trip Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-4">
//                 <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
//                   <User className="h-5 w-5 text-primary" />
//                   <div>
//                     <p className="font-semibold">{trip.user?.name}</p>
//                     <p className="text-sm text-muted-foreground">{trip.user?.department} • {trip.user?.position}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Destination</label>
//                   <p className="font-medium text-lg">{trip.destination}</p>
//                 </div>
                
//                 <div>
//                   <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Purpose</label>
//                   <p>{trip.purpose}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Start Date</label>
//                     <p className="font-medium">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">End Date</label>
//                     <p className="font-medium">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-xs font-medium text-muted-foreground uppercase mb-1.5 block">Duration</label>
//                   <p className="font-medium text-2xl text-primary">{trip.duration} <span className="text-base font-normal text-muted-foreground">days</span></p>
//                 </div>
                
//                 {trip.extended_end_date && (
//                   <div className="pt-4 border-t">
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
//             <Card className="shadow-sm">
//               <CardHeader className="border-b pb-4">
//                 <CardTitle className="text-lg font-bold flex items-center gap-2">
//                   <DollarSign className="h-5 w-5 text-muted-foreground" />
//                   Financial Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4 pt-4">
//                 <div className="flex justify-between items-center">
//                   <div>
//                     <span className="text-sm font-medium text-muted-foreground">Total Advance</span>
//                     <p className="text-xs text-muted-foreground">(Approved by Finance Area)</p>
//                   </div>
//                   <span className="text-lg font-bold text-primary">{formatCurrency(trip.total_advance || 0)}</span>
//                 </div>
                
//                 <div className="flex justify-between items-center pt-3 border-t">
//                   <div>
//                     <span className="text-sm font-medium text-muted-foreground">Total Expenses</span>
//                     <p className="text-xs text-muted-foreground">(Receipts Uploaded)</p>
//                   </div>
//                   <span className="text-lg font-bold text-success">{formatCurrency(trip.total_expenses || 0)}</span>
//                 </div>
                
//                 <div className="pt-4 border-t">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-semibold">Balance</span>
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
//                       <Badge variant="secondary" className="bg-warning/10 text-warning">
//                         ⚠️ Employee must refund
//                       </Badge>
//                     )}
//                     {(trip.total_advance || 0) - (trip.total_expenses || 0) < 0 && (
//                       <Badge variant="secondary" className="bg-purple-50/10 text-purple-600">
//                         💰 Requires reimbursement
//                       </Badge>
//                     )}
//                     {(trip.total_advance || 0) - (trip.total_expenses || 0) === 0 && (
//                       <Badge variant="secondary" className="bg-green-50/10 text-green-600">
//                         ✅ Fully settled
//                       </Badge>
//                     )}
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
          
//           {/* Right Column */}
//           <div className="lg:col-span-2">
//             <Card className="shadow-sm">
//               <Tabs defaultValue="receipts">
//                 <CardHeader className="border-b pb-4">
//                   <TabsList className="grid w-full grid-cols-2 bg-muted/30 p-1 rounded-lg">
//                     <TabsTrigger value="receipts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
//                       Receipts ({receipts.length})
//                     </TabsTrigger>
//                     <TabsTrigger value="status" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-medium">
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
//                         <h3 className="text-lg font-semibold mb-2">No receipts uploaded</h3>
//                         <p className="text-muted-foreground">Employee has not uploaded any receipts yet</p>
//                       </div>
//                     ) : (
//                       receipts.map(receipt => (
//                         <Card key={receipt.receipt_id} className={`border ${receipt.is_verified ? 'border-green-200' : ''}`}>
//                           <CardContent className="p-4">
//                             <div className="flex items-start justify-between mb-3">
//                               <div className="space-y-1">
//                                 <div className="flex items-center gap-2">
//                                   <p className="font-semibold text-lg">{receipt.receipt_number}</p>
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
//                                     Pending
//                                   </span>
//                                 )}
//                               </Badge>
//                             </div>
                            
//                             <div className="grid grid-cols-3 gap-4 text-sm mb-3 border-b pb-3">
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Amount</span>
//                                 <p className="font-medium mt-1">{formatCurrency(receipt.amount)}</p>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Date</span>
//                                 <p className="font-medium mt-1">{formatDate(receipt.receipt_date)}</p>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Status</span>
//                                 <p className="font-medium mt-1">
//                                   {receipt.is_verified ? 'Verified' : 'Pending'}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             {receipt.description && (
//                               <p className="text-sm text-muted-foreground mb-3 italic">
//                                 "{receipt.description}"
//                               </p>
//                             )}
                            
//                             <div className="flex flex-wrap gap-2 pt-3 border-t">
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
//                                   <span>Verified on {new Date(receipt.verified_at).toLocaleDateString('id-ID')}</span>
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
import { useParams, useNavigate } from 'react-router-dom'
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

export default function SettlementDetail() {
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

  // ✅ Cek apakah Finance Regional bisa approve
  const canTakeAction = trip?.status === 'under_review_regional'

  // ✅ Approve Settlement (Finance Regional)
  const handleApprove = async () => {
    if (!window.confirm('Approve this settlement and mark as completed?')) return
    try {
      // ✅ FIX: Pakai method yang benar!
      await tripAPI.approveSettlementRegional(Number(id), {
        notes: 'Approved by Finance Regional'
      })
      alert('Settlement approved and completed successfully')
      navigate('/finance-regional/dashboard')
    } catch (error: any) {
      console.error('Approve error:', error)
      alert(error.response?.data?.message || 'Failed to approve settlement')
    }
  }

  // ✅ Reject Settlement (Finance Regional)
  const handleReject = async () => {
    const reason = window.prompt('Please provide rejection reason:')
    if (!reason) return
    try {
      await tripAPI.rejectSettlement(Number(id), {
        rejection_reason: reason
      })
      alert('Settlement rejected and returned to employee')
      navigate('/finance-regional/dashboard')
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
          <p className="mt-4 text-muted-foreground font-medium">Loading settlement review...</p>
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
              onClick={() => navigate('/finance-regional/dashboard')}
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
                <h1 className="text-2xl font-bold text-white">Settlement Final Review</h1>
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
                  Approve & Complete
                </Button>
              </div>
            )}
          </div>
          
          {trip.status === 'under_review_regional' && (
            <div className="bg-white/10 border border-white/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Final Review Required</p>
                  <p className="text-sm text-white/80 mt-1">
                    This settlement has been approved by Finance Area and is awaiting your final approval.
                  </p>
                </div>
              </div>
            </div>
          )}

          {trip.status === 'completed' && (
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Settlement Completed</p>
                  <p className="text-sm text-white/80 mt-1">
                    This settlement has been completed.
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
                    <p className="text-xs text-muted-foreground">(Approved)</p>
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
                  {/* Receipts Tab */}
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
                                onClick={async () => {
                                  try {
                                    const response = await receiptAPI.download(receipt.receipt_id)
                                    const contentType = response.headers['content-type'] || 'application/octet-stream'
                                    const blob = new Blob([response.data], { type: contentType })
                                    const url = window.URL.createObjectURL(blob)
                                    const link = document.createElement('a')
                                    link.href = url
                                    link.download = receipt.file_name || `receipt-${receipt.receipt_id}.jpg`
                                    document.body.appendChild(link)
                                    link.click()
                                    document.body.removeChild(link)
                                    window.URL.revokeObjectURL(url)
                                  } catch (error: any) {
                                    console.error('Failed to download receipt:', error)
                                    alert('Failed to download receipt')
                                  }
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