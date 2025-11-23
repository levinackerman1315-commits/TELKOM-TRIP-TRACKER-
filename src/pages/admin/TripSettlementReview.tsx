// import { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { tripAPI, receiptAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
// import { ConfirmDialog, AlertDialog } from '@/components/ConfirmDialog'
// import { RejectDialog } from '@/components/RejectDialog'

// interface UserType {
//   user_id: number
//   name: string
//   email: string
//   nik: string
//   department: string
//   position: string
// }

// interface TripType {
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
//   user: UserType
//   history?: any[]
//   extended_end_date?: string
//   extension_reason?: string
// }

// interface ReceiptType {
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

// export default function TripSettlementReview() {
//   const { id } = useParams<{ id: string }>()
//   const navigate = useNavigate()
//   const [trip, setTrip] = useState<TripType | null>(null)
//   const [receipts, setReceipts] = useState<ReceiptType[]>([])
//   const [isLoading, setIsLoading] = useState(true)
  
//   // Dialog states
//   const [showApproveDialog, setShowApproveDialog] = useState(false)
//   const [showRejectDialog, setShowRejectDialog] = useState(false)
//   const [showSuccessAlert, setShowSuccessAlert] = useState(false)
//   const [showErrorAlert, setShowErrorAlert] = useState(false)
//   const [alertMessage, setAlertMessage] = useState('')
//   const [isProcessing, setIsProcessing] = useState(false)
  
//   useEffect(() => {
//     if (id) loadData()
//   }, [id])

//   const loadData = async () => {
//     try {
//       setIsLoading(true)
//       const tripRes = await tripAPI.getById(Number(id))
      
//       console.log('=== API RESPONSE ===')
//       console.log('Full response:', tripRes)
//       console.log('Response.data:', tripRes.data)
//       console.log('Response.data.data:', tripRes.data.data)
      
//       // ✅ FIX: Akses data.data
//       setTrip(tripRes.data.data)
      
//       const receiptsRes = await receiptAPI.getAll({ trip_id: id })
//       setReceipts(receiptsRes.data.data || [])
//     } catch (error) {
//       console.error('Failed to load data:', error)
//       setAlertMessage('Failed to load trip details')
//       setShowErrorAlert(true)
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

//   const normalizeStatus = (status: string | undefined): string => {
//     if (!status) return ''
//     return status.toLowerCase().replace(/[\s-]/g, '_')
//   }

//   const canTakeAction = normalizeStatus(trip?.status) === 'awaiting_review'

//   useEffect(() => {
//     if (trip) {
//       console.log('=== STATUS CHECK ===')
//       console.log('Raw status:', trip.status)
//       console.log('Normalized:', normalizeStatus(trip.status))
//       console.log('Can take action:', canTakeAction)
//     }
//   }, [trip, canTakeAction])

//   const handleApproveConfirm = async () => {
//     try {
//       setIsProcessing(true)
//       await tripAPI.approveByArea(Number(id), {
//         notes: 'Approved by Finance Area'
//       })
//       setShowApproveDialog(false)
//       setAlertMessage('Settlement approved and forwarded to Finance Regional')
//       setShowSuccessAlert(true)
//       setTimeout(() => {
//         navigate('/finance-area/dashboard')
//       }, 2000)
//     } catch (error: any) {
//       console.error('Approve error:', error)
//       setAlertMessage(error.response?.data?.message || 'Failed to approve settlement')
//       setShowErrorAlert(true)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleRejectConfirm = async (reason: string) => {
//     try {
//       setIsProcessing(true)
//       await tripAPI.rejectSettlement(Number(id), {
//         rejection_reason: reason
//       })
//       setShowRejectDialog(false)
//       setAlertMessage('Settlement rejected successfully')
//       setShowSuccessAlert(true)
//       setTimeout(() => {
//         navigate('/finance-area/dashboard')
//       }, 2000)
//     } catch (error: any) {
//       console.error('Reject error:', error)
//       setAlertMessage(error.response?.data?.message || 'Failed to reject settlement')
//       setShowErrorAlert(true)
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const viewReceiptImage = async (receiptId: number) => {
//     try {
//       console.log('Downloading receipt:', receiptId)
//       const response = await receiptAPI.download(receiptId)
//       const blob = response.data
//       const url = window.URL.createObjectURL(blob)
//       window.open(url, '_blank')
//       setTimeout(() => window.URL.revokeObjectURL(url), 300000)
//     } catch (error: any) {
//       console.error('Failed to download receipt:', error)
//       setAlertMessage('Failed to view receipt image')
//       setShowErrorAlert(true)
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
//           <p className="mt-4 text-muted-foreground font-medium">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!trip) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <Card className="max-w-md">
//           <CardHeader>
//             <AlertCircle className="h-6 w-6 text-destructive mx-auto" />
//           </CardHeader>
//           <CardContent>
//             <p className="text-center">Trip not found</p>
//           </CardContent>
//           <CardFooter>
//             <Button onClick={() => navigate('/finance-area/dashboard')} className="w-full">
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
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => navigate('/finance-area/dashboard')}
//                 className="text-white hover:bg-white/10"
//               >
//                 <ArrowLeft className="h-5 w-5" />
//               </Button>
//               <div>
//                 <h1 className="text-2xl font-bold text-white">Settlement Review</h1>
//                 <p className="text-sm text-white/80">{trip.trip_number}</p>
//               </div>
//             </div>
            
//             {/* Buttons - Always Show */}
//             <div className="flex gap-3">
//               <Button
//                 onClick={() => setShowRejectDialog(true)}
//                 variant="outline"
//                 className="border-white text-white hover:bg-white/10"
//               >
//                 <XCircle className="w-4 h-4 mr-2" />
//                 Reject
//               </Button>
//               <Button
//                 onClick={() => setShowApproveDialog(true)}
//                 className="bg-green-500 hover:bg-green-600 text-white"
//               >
//                 <CheckCircle2 className="w-4 h-4 mr-2" />
//                 Approve
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column - Trip Info */}
//           <div className="space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Trip Information
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <label className="text-xs text-muted-foreground">Employee</label>
//                   <p className="font-semibold">{trip.user?.name || '-'}</p>
//                   <p className="text-sm text-muted-foreground">{trip.user?.email}</p>
//                 </div>
                
//                 <div>
//                   <label className="text-xs text-muted-foreground">Destination</label>
//                   <p className="font-medium">{trip.destination}</p>
//                 </div>
                
//                 <div>
//                   <label className="text-xs text-muted-foreground">Purpose</label>
//                   <p>{trip.purpose}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-xs text-muted-foreground">Start Date</label>
//                     <p className="font-medium">{formatDate(trip.start_date)}</p>
//                   </div>
//                   <div>
//                     <label className="text-xs text-muted-foreground">End Date</label>
//                     <p className="font-medium">{formatDate(trip.end_date)}</p>
//                   </div>
//                 </div>
                
//                 <div>
//                   <label className="text-xs text-muted-foreground">Duration</label>
//                   <p className="font-medium text-xl">{trip.duration} days</p>
//                 </div>
                
//                 <div>
//                   <label className="text-xs text-muted-foreground">Status</label>
//                   <Badge className="bg-yellow-100 text-yellow-800">{trip.status}</Badge>
//                 </div>
//               </CardContent>
//             </Card>
            
//             {/* Financial Summary */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <DollarSign className="h-5 w-5" />
//                   Financial Summary
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between">
//                   <span className="text-sm text-muted-foreground">Total Advance</span>
//                   <span className="font-bold">{formatCurrency(trip.total_advance || 0)}</span>
//                 </div>
                
//                 <div className="flex justify-between border-t pt-3">
//                   <span className="text-sm text-muted-foreground">Total Expenses</span>
//                   <span className="font-bold text-green-600">{formatCurrency(trip.total_expenses || 0)}</span>
//                 </div>
                
//                 <div className="flex justify-between border-t pt-3">
//                   <span className="font-semibold">Balance</span>
//                   <span className="font-bold text-orange-500">
//                     {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
//                   </span>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
          
//           {/* Right Column - Receipts */}
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
//                   <TabsContent value="receipts" className="space-y-4">
//                     {receipts.length === 0 ? (
//                       <div className="text-center py-12">
//                         <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                         <p className="text-muted-foreground">No receipts uploaded</p>
//                       </div>
//                     ) : (
//                       receipts.map(receipt => (
//                         <Card key={receipt.receipt_id} className="border">
//                           <CardContent className="p-4">
//                             <div className="flex justify-between mb-3">
//                               <div>
//                                 <p className="font-semibold">{receipt.receipt_number}</p>
//                                 <Badge variant="secondary" className="text-xs mt-1">
//                                   {getCategoryLabel(receipt.category)}
//                                 </Badge>
//                               </div>
//                               <Badge className={receipt.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
//                                 {receipt.is_verified ? 'Verified' : 'Pending'}
//                               </Badge>
//                             </div>
                            
//                             <div className="grid grid-cols-3 gap-4 text-sm mb-3">
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Amount</span>
//                                 <p className="font-medium">{formatCurrency(receipt.amount)}</p>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Merchant</span>
//                                 <p className="font-medium">{receipt.merchant_name}</p>
//                               </div>
//                               <div>
//                                 <span className="text-xs text-muted-foreground">Date</span>
//                                 <p className="font-medium">{formatDate(receipt.receipt_date)}</p>
//                               </div>
//                             </div>
                            
//                             {receipt.description && (
//                               <p className="text-sm text-muted-foreground mb-3 italic">"{receipt.description}"</p>
//                             )}
                            
//                             <div className="flex gap-2 border-t pt-3">
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => viewReceiptImage(receipt.receipt_id)}
//                               >
//                                 <Eye className="w-4 h-4 mr-2" />
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
//                               >
//                                 <Download className="w-4 h-4 mr-2" />
//                                 Download
//                               </Button>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       ))
//                     )}
//                   </TabsContent>
                  
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

//       {/* Dialogs */}
//       <ConfirmDialog
//         isOpen={showApproveDialog}
//         onClose={() => setShowApproveDialog(false)}
//         onConfirm={handleApproveConfirm}
//         title="Approve Settlement?"
//         message="Are you sure you want to approve this settlement?"
//         confirmText="Yes, Approve"
//         cancelText="Cancel"
//         type="success"
//         loading={isProcessing}
//       />

//       <RejectDialog
//         isOpen={showRejectDialog}
//         onClose={() => setShowRejectDialog(false)}
//         onConfirm={handleRejectConfirm}
//         loading={isProcessing}
//       />

//       <AlertDialog
//         isOpen={showSuccessAlert}
//         onClose={() => setShowSuccessAlert(false)}
//         title="Success!"
//         message={alertMessage}
//         type="success"
//       />

//       <AlertDialog
//         isOpen={showErrorAlert}
//         onClose={() => setShowErrorAlert(false)}
//         title="Error"
//         message={alertMessage}
//         type="error"
//       />
//     </div>
//   )
// }







import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { tripAPI, receiptAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
  Clock,
  Info
} from 'lucide-react'
import { TripStatusTracker } from '@/components/admin/TripStatusTracker'
import { ConfirmDialog, AlertDialog } from '@/components/ConfirmDialog'
import { RejectDialog } from '@/components/RejectDialog'

interface UserType {
  user_id: number
  name: string
  email: string
  nik: string
  department: string
  position: string
}

interface TripType {
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
  user: UserType
  history?: any[]
  extended_end_date?: string
  extension_reason?: string
}

interface ReceiptType {
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

export default function TripSettlementReview() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [trip, setTrip] = useState<TripType | null>(null)
  const [receipts, setReceipts] = useState<ReceiptType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Dialog states
  const [showApproveDialog, setShowApproveDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  useEffect(() => {
    if (id) loadData()
  }, [id])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const tripRes = await tripAPI.getById(Number(id))
      
      console.log('=== API RESPONSE ===')
      console.log('Trip data:', tripRes.data.data)
      console.log('Trip status:', tripRes.data.data?.status)
      
      setTrip(tripRes.data.data)
      
      const receiptsRes = await receiptAPI.getAll({ trip_id: id })
      setReceipts(receiptsRes.data.data || [])
    } catch (error) {
      console.error('Failed to load data:', error)
      setAlertMessage('Failed to load trip details')
      setShowErrorAlert(true)
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

  const normalizeStatus = (status: string | undefined): string => {
    if (!status) return ''
    return status.toLowerCase().replace(/[\s-]/g, '_')
  }

  const canTakeAction = normalizeStatus(trip?.status) === 'awaiting_review'

  const handleApproveConfirm = async () => {
    try {
      setIsProcessing(true)
      await tripAPI.approveByArea(Number(id), {
        notes: 'Approved by Finance Area - Physical receipts verified'
      })
      setShowApproveDialog(false)
      setAlertMessage('Settlement approved and forwarded to Finance Regional')
      setShowSuccessAlert(true)
      setTimeout(() => {
        navigate('/finance-area/dashboard')
      }, 2000)
    } catch (error: any) {
      console.error('Approve error:', error)
      setAlertMessage(error.response?.data?.message || 'Failed to approve settlement')
      setShowErrorAlert(true)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRejectConfirm = async (reason: string) => {
    try {
      setIsProcessing(true)
      await tripAPI.rejectSettlement(Number(id), {
        rejection_reason: reason
      })
      setShowRejectDialog(false)
      setAlertMessage('Settlement rejected and returned to employee')
      setShowSuccessAlert(true)
      setTimeout(() => {
        navigate('/finance-area/dashboard')
      }, 2000)
    } catch (error: any) {
      console.error('Reject error:', error)
      setAlertMessage(error.response?.data?.message || 'Failed to reject settlement')
      setShowErrorAlert(true)
    } finally {
      setIsProcessing(false)
    }
  }

  const viewReceiptImage = async (receiptId: number) => {
    try {
      console.log('Viewing receipt:', receiptId)
      const response = await receiptAPI.download(receiptId)
      const blob = response.data
      const url = window.URL.createObjectURL(blob)
      window.open(url, '_blank')
      setTimeout(() => window.URL.revokeObjectURL(url), 300000)
    } catch (error: any) {
      console.error('Failed to view receipt:', error)
      setAlertMessage('Failed to view receipt image')
      setShowErrorAlert(true)
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

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      active: { color: 'bg-blue-100 text-blue-800', label: 'Active' },
      awaiting_review: { color: 'bg-yellow-100 text-yellow-800', label: 'Awaiting Review' },
      under_review_regional: { color: 'bg-orange-100 text-orange-800', label: 'Under Review (Regional)' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      cancelled: { color: 'bg-gray-100 text-gray-800', label: 'Cancelled' },
    }
    const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={color}>{label}</Badge>
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <AlertCircle className="h-6 w-6 text-destructive mx-auto" />
          </CardHeader>
          <CardContent>
            <p className="text-center">Trip not found</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/finance-area/dashboard')} className="w-full">
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/finance-area/dashboard')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-white">Settlement Review</h1>
                <p className="text-sm text-white/80">{trip.trip_number}</p>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setShowRejectDialog(true)}
                disabled={!canTakeAction}
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Settlement
              </Button>
              <Button
                onClick={() => setShowApproveDialog(true)}
                disabled={!canTakeAction}
                className="bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve Settlement
              </Button>
            </div>
          </div>

          {/* Info Alert */}
          {canTakeAction && (
            <div className="bg-blue-500/20 border border-blue-300 rounded-lg p-3 flex items-start gap-3">
              <Info className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white">
                <p className="font-medium">Physical Receipt Verification Required</p>
                <p className="text-white/90 mt-1">
                  Please verify that the physical receipts match the uploaded images before approving this settlement.
                </p>
              </div>
            </div>
          )}

          {!canTakeAction && trip.status === 'under_review_regional' && (
            <div className="bg-orange-500/20 border border-orange-300 rounded-lg p-3 flex items-start gap-3">
              <Clock className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white">
                <p className="font-medium">Under Regional Review</p>
                <p className="text-white/90 mt-1">
                  This settlement has been approved by Finance Area and is now under review by Finance Regional.
                </p>
              </div>
            </div>
          )}

          {!canTakeAction && trip.status === 'completed' && (
            <div className="bg-green-500/20 border border-green-300 rounded-lg p-3 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-white mt-0.5 flex-shrink-0" />
              <div className="text-sm text-white">
                <p className="font-medium">Settlement Completed</p>
                <p className="text-white/90 mt-1">
                  This settlement has been fully approved and completed.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Trip Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Trip Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground">Employee</label>
                  <p className="font-semibold">{trip.user?.name || '-'}</p>
                  <p className="text-sm text-muted-foreground">{trip.user?.email}</p>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground">Destination</label>
                  <p className="font-medium">{trip.destination}</p>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground">Purpose</label>
                  <p>{trip.purpose}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-muted-foreground">Start Date</label>
                    <p className="font-medium">{formatDate(trip.start_date)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">End Date</label>
                    <p className="font-medium">{formatDate(trip.end_date)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground">Duration</label>
                  <p className="font-medium text-xl">{trip.duration} days</p>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground">Status</label>
                  <div className="mt-1">
                    {getStatusBadge(trip.status)}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Advance</span>
                  <span className="font-bold">{formatCurrency(trip.total_advance || 0)}</span>
                </div>
                
                <div className="flex justify-between border-t pt-3">
                  <span className="text-sm text-muted-foreground">Total Expenses</span>
                  <span className="font-bold text-green-600">{formatCurrency(trip.total_expenses || 0)}</span>
                </div>
                
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Balance</span>
                  <span className={`font-bold ${
                    (trip.total_advance || 0) - (trip.total_expenses || 0) > 0 
                      ? 'text-orange-500' 
                      : (trip.total_advance || 0) - (trip.total_expenses || 0) < 0
                      ? 'text-purple-600'
                      : 'text-gray-600'
                  }`}>
                    {formatCurrency((trip.total_advance || 0) - (trip.total_expenses || 0))}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Receipts & Status */}
          <div className="lg:col-span-2">
            <Card>
              <Tabs defaultValue="receipts">
                <CardHeader>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="receipts">Receipts ({receipts.length})</TabsTrigger>
                    <TabsTrigger value="status">Status Tracker</TabsTrigger>
                  </TabsList>
                </CardHeader>
                <CardContent>
                  <TabsContent value="receipts" className="space-y-4">
                    {receipts.length === 0 ? (
                      <div className="text-center py-12">
                        <ReceiptIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No receipts uploaded</p>
                      </div>
                    ) : (
                      receipts.map(receipt => (
                        <Card key={receipt.receipt_id} className="border">
                          <CardContent className="p-4">
                            <div className="flex justify-between mb-3">
                              <div>
                                <p className="font-semibold">{receipt.receipt_number}</p>
                                <Badge variant="secondary" className="text-xs mt-1">
                                  {getCategoryLabel(receipt.category)}
                                </Badge>
                              </div>
                              <Badge className={receipt.is_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                {receipt.is_verified ? 'Verified' : 'Pending'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                              <div>
                                <span className="text-xs text-muted-foreground">Amount</span>
                                <p className="font-medium">{formatCurrency(receipt.amount)}</p>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Merchant</span>
                                <p className="font-medium">{receipt.merchant_name}</p>
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground">Date</span>
                                <p className="font-medium">{formatDate(receipt.receipt_date)}</p>
                              </div>
                            </div>
                            
                            {receipt.description && (
                              <p className="text-sm text-muted-foreground mb-3 italic">"{receipt.description}"</p>
                            )}
                            
                            <div className="flex gap-2 border-t pt-3">
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
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="status">
                    <TripStatusTracker 
                      currentStatus={trip.status} 
                      history={trip.history || []} 
                    />
                  </TabsContent>
                </CardContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        isOpen={showApproveDialog}
        onClose={() => setShowApproveDialog(false)}
        onConfirm={handleApproveConfirm}
        title="Approve Settlement?"
        message="Have you verified the physical receipts? This will forward the settlement to Finance Regional for final approval."
        confirmText="Yes, Approve"
        cancelText="Cancel"
        type="success"
        loading={isProcessing}
      />

      <RejectDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        onConfirm={handleRejectConfirm}
        loading={isProcessing}
      />

      <AlertDialog
        isOpen={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}
        title="Success!"
        message={alertMessage}
        type="success"
      />

      <AlertDialog
        isOpen={showErrorAlert}
        onClose={() => setShowErrorAlert(false)}
        title="Error"
        message={alertMessage}
        type="error"
      />
    </div>
  )
}