// // // import { useState, useEffect } from 'react'
// // // import { advanceAPI } from '@/services/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Badge } from '@/components/ui/badge'
// // // import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'

// // // // ✅ UBAH NAMA COMPONENT DARI AdvanceRequests JADI AdvanceRequestsContent
// // // export default function AdvanceRequestsContent() {
// // //   const [advances, setAdvances] = useState([])
// // //   const [selectedAdvance, setSelectedAdvance] = useState(null)
// // //   const [showDialog, setShowDialog] = useState(false)

// // //   useEffect(() => {
// // //     loadAdvances()
// // //   }, [])

// // //   const loadAdvances = async () => {
// // //     try {
// // //       const res = await advanceAPI.getAll({ status: 'requested' })
// // //       setAdvances(res.data)
// // //     } catch (error) {
// // //       console.error(error)
// // //     }
// // //   }

// // //   const formatCurrency = (amount) => {
// // //     return new Intl.NumberFormat('id-ID', {
// // //       style: 'currency',
// // //       currency: 'IDR',
// // //       minimumFractionDigits: 0
// // //     }).format(amount)
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       {/* Stats */}
// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <Card>
// // //           <CardHeader className="pb-3">
// // //             <CardTitle className="text-sm font-medium text-muted-foreground">
// // //               Pending Requests
// // //             </CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold">{advances.length}</div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       {/* List */}
// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>Advance Requests</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           <div className="overflow-x-auto">
// // //             <table className="w-full">
// // //               <thead className="border-b">
// // //                 <tr>
// // //                   <th className="text-left p-3 text-sm font-medium">Trip</th>
// // //                   <th className="text-left p-3 text-sm font-medium">Employee</th>
// // //                   <th className="text-left p-3 text-sm font-medium">Destination</th>
// // //                   <th className="text-right p-3 text-sm font-medium">Requested</th>
// // //                   <th className="text-left p-3 text-sm font-medium">Date</th>
// // //                   <th className="text-left p-3 text-sm font-medium">Status</th>
// // //                   <th className="text-left p-3 text-sm font-medium">Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y">
// // //                 {advances.map(adv => (
// // //                   <tr key={adv.id} className="hover:bg-muted/50">
// // //                     <td className="p-3 font-medium">{adv.trip_number}</td>
// // //                     <td className="p-3">{adv.employee_name}</td>
// // //                     <td className="p-3">{adv.destination}</td>
// // //                     <td className="p-3 text-right font-semibold">
// // //                       {formatCurrency(adv.requested_amount)}
// // //                     </td>
// // //                     <td className="p-3 text-sm text-muted-foreground">
// // //                       {new Date(adv.created_at).toLocaleDateString('id-ID')}
// // //                     </td>
// // //                     <td className="p-3">
// // //                       <Badge variant="outline">Pending</Badge>
// // //                     </td>
// // //                     <td className="p-3">
// // //                       <Button
// // //                         size="sm"
// // //                         onClick={() => {
// // //                           setSelectedAdvance(adv)
// // //                           setShowDialog(true)
// // //                         }}
// // //                       >
// // //                         Review
// // //                       </Button>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </CardContent>
// // //       </Card>

// // //       {/* Review Dialog */}
// // //       {selectedAdvance && (
// // //         <AdvanceReviewDialog
// // //           advance={selectedAdvance}
// // //           open={showDialog}
// // //           onClose={() => {
// // //             setShowDialog(false)
// // //             setSelectedAdvance(null)
// // //             loadAdvances()
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // import { useState, useEffect } from 'react'
// // // import { advanceAPI } from '@/services/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Badge } from '@/components/ui/badge'
// // // import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'

// // // // ✅ INTERFACE SESUAI DENGAN LARAVEL BACKEND
// // // interface Advance {
// // //   id: number
// // //   trip_id: number
// // //   trip_number: string
// // //   employee_id: number
// // //   employee_name: string
// // //   destination: string
// // //   requested_amount: number
// // //   approved_amount?: number
// // //   status: 'requested' | 'approved_area' | 'approved_regional' | 'transferred' | 'rejected'
// // //   notes?: string
// // //   requested_at: string
// // //   created_at: string
// // //   updated_at: string
// // // }

// // // export default function AdvanceRequestsContent() {
// // //   const [advances, setAdvances] = useState<Advance[]>([])
// // //   const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
// // //   const [showDialog, setShowDialog] = useState(false)
// // //   const [isLoading, setIsLoading] = useState(true)

// // //   useEffect(() => {
// // //     loadAdvances()
// // //   }, [])

// // //   const loadAdvances = async () => {
// // //     setIsLoading(true)
// // //     try {
// // //       const res = await advanceAPI.getAll({ status: 'pending' })
// // //       const advancesData = res.data.data || res.data
// // //       setAdvances(advancesData)
// // //     } catch (error: any) {
// // //       console.error('Failed to load advances:', error)
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const formatCurrency = (amount: number) => {
// // //     return new Intl.NumberFormat('id-ID', {
// // //       style: 'currency',
// // //       currency: 'IDR',
// // //       minimumFractionDigits: 0
// // //     }).format(amount)
// // //   }

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // //       day: '2-digit',
// // //       month: 'short',
// // //       year: 'numeric'
// // //     })
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="mb-8">
// // //         <h2 className="text-3xl font-bold text-foreground mb-2">Advance Requests</h2>
// // //         <p className="text-muted-foreground">Review and approve advance payment requests</p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <Card>
// // //           <CardHeader className="pb-3">
// // //             <CardTitle className="text-sm font-medium text-muted-foreground">
// // //               Pending Requests
// // //             </CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold text-blue-600">{advances.length}</div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>Advance Requests List</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           {isLoading ? (
// // //             <div className="text-center py-12">
// // //               <p className="text-muted-foreground">Loading...</p>
// // //             </div>
// // //           ) : advances.length === 0 ? (
// // //             <div className="text-center py-12">
// // //               <p className="text-muted-foreground">No pending advance requests</p>
// // //             </div>
// // //           ) : (
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full">
// // //                 <thead className="border-b">
// // //                   <tr>
// // //                     <th className="text-left p-3 text-sm font-medium">Trip</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Employee</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Destination</th>
// // //                     <th className="text-right p-3 text-sm font-medium">Requested</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Date</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Status</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y">
// // //                   {advances.map(adv => (
// // //                     <tr key={adv.id} className="hover:bg-muted/50">
// // //                       <td className="p-3 font-medium">{adv.trip_number}</td>
// // //                       <td className="p-3">{adv.employee_name}</td>
// // //                       <td className="p-3">{adv.destination}</td>
// // //                       <td className="p-3 text-right font-semibold">
// // //                         {formatCurrency(adv.requested_amount)}
// // //                       </td>
// // //                       <td className="p-3 text-sm text-muted-foreground">
// // //                         {formatDate(adv.created_at)}
// // //                       </td>
// // //                       <td className="p-3">
// // //                         <Badge variant="outline">Pending</Badge>
// // //                       </td>
// // //                       <td className="p-3">
// // //                         <Button
// // //                           size="sm"
// // //                           onClick={() => {
// // //                             setSelectedAdvance(adv)
// // //                             setShowDialog(true)
// // //                           }}
// // //                         >
// // //                           Review
// // //                         </Button>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           )}
// // //         </CardContent>
// // //       </Card>

// // //       {selectedAdvance && (
// // //         <AdvanceReviewDialog
// // //           advance={selectedAdvance}
// // //           open={showDialog}
// // //           onClose={() => {
// // //             setShowDialog(false)
// // //             setSelectedAdvance(null)
// // //             loadAdvances()
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   )
// // // }


// // // import { useState, useEffect } from 'react'
// // // import { advanceAPI } from '@/services/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Badge } from '@/components/ui/badge'
// // // import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog' // Pastikan path benar

// // // // ✅ INTERFACE SESUAI DENGAN LARAVEL BACKEND
// // // interface Advance {
// // //   id: number
// // //   trip_id: number
// // //   trip_number: string
// // //   employee_id: number
// // //   employee_name: string
// // //   destination: string
// // //   requested_amount: number
// // //   approved_amount?: number
// // //   status: 'pending' | 'approved_area' | 'approved_regional' | 'transferred' | 'rejected' // <- Diperbarui
// // //   notes?: string
// // //   requested_at: string
// // //   created_at: string
// // //   updated_at: string
// // // }

// // // export default function AdvanceRequestsContent() {
// // //   const [advances, setAdvances] = useState<Advance[]>([])
// // //   const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
// // //   const [showDialog, setShowDialog] = useState(false)
// // //   const [isLoading, setIsLoading] = useState(true)

// // //   useEffect(() => {
// // //     loadAdvances()
// // //   }, [])

// // //   const loadAdvances = async () => {
// // //     setIsLoading(true)
// // //     try {
// // //       // ✅ Mengambil data dengan filter status 'pending'
// // //       const res = await advanceAPI.getAll({ status: 'pending' })
// // //       const advancesData = res.data.data || res.data
// // //       setAdvances(advancesData)
// // //     } catch (error: any) {
// // //       console.error('Failed to load advances:', error)
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const formatCurrency = (amount: number) => {
// // //     return new Intl.NumberFormat('id-ID', {
// // //       style: 'currency',
// // //       currency: 'IDR',
// // //       minimumFractionDigits: 0
// // //     }).format(amount)
// // //   }

// // //   const formatDate = (dateString: string) => {
// // //     return new Date(dateString).toLocaleDateString('id-ID', {
// // //       day: '2-digit',
// // //       month: 'short',
// // //       year: 'numeric'
// // //     })
// // //   }

// // //   // Fungsi untuk menampilkan badge status
// // //   const getAdvanceStatusBadge = (status: string) => {
// // //     const statusMap: Record<string, { color: string; label: string }> = {
// // //       pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
// // //       approved_area: { color: 'bg-blue-100 text-blue-800', label: 'Approved by Area' },
// // //       approved_regional: { color: 'bg-purple-100 text-purple-800', label: 'Approved by Regional' },
// // //       transferred: { color: 'bg-green-100 text-green-800', label: 'Transferred' },
// // //       rejected: { color: 'bg-destructive text-destructive-foreground', label: 'Rejected' },
// // //     }

// // //     const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }

// // //     return <Badge className={color}>{label}</Badge>
// // //   }

// // //   return (
// // //     <div className="space-y-6">
// // //       <div className="mb-8">
// // //         <h2 className="text-3xl font-bold text-foreground mb-2">Advance Requests</h2>
// // //         <p className="text-muted-foreground">Review and approve advance payment requests</p>
// // //       </div>

// // //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// // //         <Card>
// // //           <CardHeader className="pb-3">
// // //             <CardTitle className="text-sm font-medium text-muted-foreground">
// // //               Pending Requests
// // //             </CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="text-2xl font-bold text-blue-600">{advances.length}</div>
// // //           </CardContent>
// // //         </Card>
// // //       </div>

// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>Advance Requests List</CardTitle>
// // //         </CardHeader>
// // //         <CardContent>
// // //           {isLoading ? (
// // //             <div className="text-center py-12">
// // //               <p className="text-muted-foreground">Loading...</p>
// // //             </div>
// // //           ) : advances.length === 0 ? (
// // //             <div className="text-center py-12">
// // //               <p className="text-muted-foreground">No pending advance requests</p>
// // //             </div>
// // //           ) : (
// // //             <div className="overflow-x-auto">
// // //               <table className="w-full">
// // //                 <thead className="border-b">
// // //                   <tr>
// // //                     <th className="text-left p-3 text-sm font-medium">Trip</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Employee</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Destination</th>
// // //                     <th className="text-right p-3 text-sm font-medium">Requested</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Date</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Status</th>
// // //                     <th className="text-left p-3 text-sm font-medium">Actions</th>
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="divide-y">
// // //                   {advances.map(adv => (
// // //                     <tr key={adv.id} className="hover:bg-muted/50">
// // //                       <td className="p-3 font-medium">{adv.trip_number}</td>
// // //                       <td className="p-3">{adv.employee_name}</td>
// // //                       <td className="p-3">{adv.destination}</td>
// // //                       <td className="p-3 text-right font-semibold">
// // //                         {formatCurrency(adv.requested_amount)}
// // //                       </td>
// // //                       <td className="p-3 text-sm text-muted-foreground">
// // //                         {formatDate(adv.created_at)}
// // //                       </td>
// // //                       <td className="p-3">
// // //                         {/* ✅ Badge status dinamis */}
// // //                         {getAdvanceStatusBadge(adv.status)}
// // //                       </td>
// // //                       <td className="p-3">
// // //                         <Button
// // //                           size="sm"
// // //                           onClick={() => {
// // //                             setSelectedAdvance(adv)
// // //                             setShowDialog(true)
// // //                           }}
// // //                         >
// // //                           Review
// // //                         </Button>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>
// // //           )}
// // //         </CardContent>
// // //       </Card>

// // //       {selectedAdvance && (
// // //         <AdvanceReviewDialog
// // //           advance={selectedAdvance}
// // //           open={showDialog}
// // //           onClose={() => {
// // //             setShowDialog(false)
// // //             setSelectedAdvance(null)
// // //             loadAdvances() // Refresh data setelah review
// // //           }}
// // //         />
// // //       )}
// // //     </div>
// // //   )
// // // }


// // // src/pages/admin/AdvanceRequestsContent.tsx

// // import { useState, useEffect } from 'react'
// // import { advanceAPI } from '@/services/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Badge } from '@/components/ui/badge'
// // import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'

// // // ✅ FIXED: Interface sesuai backend response
// // interface Advance {
// //   // Primary fields
// //   id: number
// //   advance_id: number
// //   advance_number: string
// //   trip_id: number
// //   request_type: string
// //   requested_amount: number
// //   approved_amount?: number
// //   status: 'pending' | 'approved_area' | 'approved_regional' | 'transferred' | 'rejected'
// //   request_reason?: string
// //   rejection_reason?: string
// //   notes?: string
  
// //   // Timestamps
// //   requested_at: string
// //   approved_at_area?: string
// //   approved_at_regional?: string
// //   transfer_date?: string
// //   transfer_reference?: string
// //   created_at: string
// //   updated_at: string
  
// //   // ✅ Computed fields dari backend
// //   trip_number: string
// //   destination: string
// //   employee_id: number
// //   employee_name: string
// // }

// // export default function AdvanceRequestsContent() {
// //   const [advances, setAdvances] = useState<Advance[]>([])
// //   const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
// //   const [showDialog, setShowDialog] = useState(false)
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     loadAdvances()
// //   }, [])

// //   const loadAdvances = async () => {
// //     setIsLoading(true)
// //     setError(null)
    
// //     try {
// //       console.log('Fetching advances with status=pending...')
      
// //       const res = await advanceAPI.getAll({ status: 'pending' })
// //       console.log('API Response:', res.data)
      
// //       // ✅ Handle different response structures
// //       const advancesData = res.data.data || res.data || []
      
// //       console.log('Advances Data:', advancesData)
// //       console.log('Total advances:', advancesData.length)
      
// //       setAdvances(advancesData)
      
// //     } catch (error: any) {
// //       console.error('Failed to load advances:', error)
// //       console.error('Error response:', error.response?.data)
      
// //       setError(error.response?.data?.message || 'Failed to load advances')
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
// //     if (!dateString) return '-'
    
// //     return new Date(dateString).toLocaleDateString('id-ID', {
// //       day: '2-digit',
// //       month: 'short',
// //       year: 'numeric'
// //     })
// //   }

// //   const getAdvanceStatusBadge = (status: string) => {
// //     const statusMap: Record<string, { color: string; label: string }> = {
// //       pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
// //       approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved by Area' },
// //       approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved by Regional' },
// //       transferred: { color: 'bg-green-100 text-green-800', label: 'Transferred' },
// //       rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
// //     }

// //     const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }

// //     return <Badge className={color}>{label}</Badge>
// //   }

// //   return (
// //     <div className="space-y-6">
// //       {/* Header */}
// //       <div className="mb-8">
// //         <h2 className="text-3xl font-bold text-foreground mb-2">Advance Requests</h2>
// //         <p className="text-muted-foreground">Review and approve advance payment requests</p>
// //       </div>

// //       {/* Stats Card */}
// //       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //         <Card>
// //           <CardHeader className="pb-3">
// //             <CardTitle className="text-sm font-medium text-muted-foreground">
// //               Pending Requests
// //             </CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="text-2xl font-bold text-blue-600">{advances.length}</div>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Advance Requests Table */}
// //       <Card>
// //         <CardHeader>
// //           <CardTitle>Advance Requests List</CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           {/* Loading State */}
// //           {isLoading && (
// //             <div className="text-center py-12">
// //               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
// //               <p className="text-muted-foreground">Loading advances...</p>
// //             </div>
// //           )}

// //           {/* Error State */}
// //           {error && !isLoading && (
// //             <div className="text-center py-12">
// //               <p className="text-red-600 mb-4">{error}</p>
// //               <Button onClick={loadAdvances}>Retry</Button>
// //             </div>
// //           )}

// //           {/* Empty State */}
// //           {!isLoading && !error && advances.length === 0 && (
// //             <div className="text-center py-12">
// //               <p className="text-muted-foreground">No pending advance requests</p>
// //             </div>
// //           )}

// //           {/* Table */}
// //           {!isLoading && !error && advances.length > 0 && (
// //             <div className="overflow-x-auto">
// //               <table className="w-full">
// //                 <thead className="border-b">
// //                   <tr>
// //                     <th className="text-left p-3 text-sm font-medium">Trip</th>
// //                     <th className="text-left p-3 text-sm font-medium">Employee</th>
// //                     <th className="text-left p-3 text-sm font-medium">Destination</th>
// //                     <th className="text-right p-3 text-sm font-medium">Requested</th>
// //                     <th className="text-left p-3 text-sm font-medium">Date</th>
// //                     <th className="text-left p-3 text-sm font-medium">Status</th>
// //                     <th className="text-left p-3 text-sm font-medium">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y">
// //                   {advances.map(adv => (
// //                     <tr key={adv.id || adv.advance_id} className="hover:bg-muted/50">
// //                       <td className="p-3 font-medium">{adv.trip_number || '-'}</td>
// //                       <td className="p-3">{adv.employee_name || '-'}</td>
// //                       <td className="p-3">{adv.destination || '-'}</td>
// //                       <td className="p-3 text-right font-semibold">
// //                         {formatCurrency(adv.requested_amount)}
// //                       </td>
// //                       <td className="p-3 text-sm text-muted-foreground">
// //                         {formatDate(adv.created_at)}
// //                       </td>
// //                       <td className="p-3">
// //                         {getAdvanceStatusBadge(adv.status)}
// //                       </td>
// //                       <td className="p-3">
// //                         <Button
// //                           size="sm"
// //                           onClick={() => {
// //                             console.log('Selected advance:', adv)
// //                             setSelectedAdvance(adv)
// //                             setShowDialog(true)
// //                           }}
// //                         >
// //                           Review
// //                         </Button>
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </CardContent>
// //       </Card>

// //       {/* Review Dialog */}
// //       {selectedAdvance && (
// //         <AdvanceReviewDialog
// //           advance={selectedAdvance}
// //           open={showDialog}
// //           onClose={() => {
// //             setShowDialog(false)
// //             setSelectedAdvance(null)
// //             loadAdvances() // Refresh data
// //           }}
// //         />
// //       )}
// //     </div>
// //   )
// // }


// // src/pages/admin/AdvanceRequestsContent.tsx

// import { useState, useEffect } from 'react'
// import { advanceAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
// import { Input } from '@/components/ui/input'
// import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'
// import { Advance, AdvanceStats } from '@/types/advance' // ✅ Import dari types
// import { 
//   Search, 
//   DollarSign, 
//   CheckCircle, 
//   XCircle, 
//   FileText,
//   Eye,
//   AlertCircle
// } from 'lucide-react'

// export default function AdvanceRequestsContent() {
//   const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'history'>('pending')
//   const [advances, setAdvances] = useState<Advance[]>([])
//   const [filteredAdvances, setFilteredAdvances] = useState<Advance[]>([])
//   const [stats, setStats] = useState<AdvanceStats>({
//     total: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0
//   })
//   const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
//   const [showReviewDialog, setShowReviewDialog] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState('')

//   useEffect(() => {
//     loadAdvances()
//   }, [])

//   useEffect(() => {
//     filterAdvances()
//   }, [advances, activeTab, searchQuery])

//   const loadAdvances = async () => {
//     setIsLoading(true)
//     try {
//       const res = await advanceAPI.getAll()
//       const advancesData = res.data.data || res.data
//       setAdvances(advancesData)
      
//       // Calculate stats
//       const newStats: AdvanceStats = {
//         total: advancesData.length,
//         pending: advancesData.filter((a: Advance) => a.status === 'pending').length,
//         approved: advancesData.filter((a: Advance) => 
//           ['approved_area', 'approved_regional', 'completed'].includes(a.status)
//         ).length,
//         rejected: advancesData.filter((a: Advance) => a.status === 'rejected').length
//       }
//       setStats(newStats)
//     } catch (error) {
//       console.error('Failed to load advances:', error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const filterAdvances = () => {
//     let filtered = advances

//     // Filter by tab
//     if (activeTab === 'pending') {
//       filtered = filtered.filter(a => a.status === 'pending')
//     } else if (activeTab === 'history') {
//       filtered = filtered.filter(a => 
//         ['approved_area', 'approved_regional', 'completed', 'rejected'].includes(a.status)
//       )
//     }
//     // 'all' tab shows everything

//     // Filter by search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter(a =>
//         a.advance_number?.toLowerCase().includes(query) ||
//         a.employee_name?.toLowerCase().includes(query) ||
//         a.trip_number?.toLowerCase().includes(query) ||
//         a.destination?.toLowerCase().includes(query)
//       )
//     }

//     setFilteredAdvances(filtered)
//   }

//   const handleReview = (advance: Advance) => {
//     setSelectedAdvance(advance)
//     setShowReviewDialog(true)
//   }

//   const handleViewDetail = (advanceId: number) => {
//     // ✅ FIX: Pakai navigate dari react-router
//     window.location.href = `/finance-area/advances/${advanceId}`
    
//     // ATAU kalau pakai useNavigate:
//     // navigate(`/finance-area/advances/${advanceId}`)
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
    
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     })
//   }

//   const getStatusBadge = (status: string) => {
//     const statusMap: Record<string, { color: string; label: string }> = {
//       pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
//       approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved (Area)' },
//       approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved (Regional)' },
//       completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
//       rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
//     }

//     const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
//     return <Badge className={`${color} text-xs`}>{label}</Badge>
//   }

//   if (isLoading) {
//     return (
//       <div className="text-center py-12">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//         <p className="text-muted-foreground">Loading advance requests...</p>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight">Advance Requests</h2>
//         <p className="text-muted-foreground">
//           Review and approve advance payment requests from employees
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
//             <AlertCircle className="h-4 w-4 text-blue-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
//             <p className="text-xs text-muted-foreground">Awaiting review</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Approved</CardTitle>
//             <CheckCircle className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
//             <p className="text-xs text-muted-foreground">Approved advances</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Rejected</CardTitle>
//             <XCircle className="h-4 w-4 text-red-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
//             <p className="text-xs text-muted-foreground">Rejected requests</p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
//             <FileText className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.total}</div>
//             <p className="text-xs text-muted-foreground">All advances</p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tabs & Content */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle>Advance Requests List</CardTitle>
//             <div className="flex items-center gap-2">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search by number, employee, trip..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-9 w-[300px]"
//                 />
//               </div>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
//             <TabsList>
//               <TabsTrigger value="pending">
//                 Pending ({stats.pending})
//               </TabsTrigger>
//               <TabsTrigger value="all">
//                 All ({stats.total})
//               </TabsTrigger>
//               <TabsTrigger value="history">
//                 History ({stats.approved + stats.rejected})
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value={activeTab} className="mt-4">
//               {filteredAdvances.length === 0 ? (
//                 <div className="text-center py-12">
//                   <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
//                   <p className="text-muted-foreground">
//                     {searchQuery ? 'No advances found matching your search' : 'No advances found'}
//                   </p>
//                 </div>
//               ) : (
//                 <div className="border rounded-lg overflow-hidden">
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead className="bg-muted/50">
//                         <tr>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             No
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Advance Number
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Employee
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Trip
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Type
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Requested
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Status
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Date
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Document
//                           </th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
//                             Actions
//                           </th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y">
//                         {filteredAdvances.map((advance, index) => (
//                           <tr 
//                             key={advance.id || advance.advance_id}
//                             className="hover:bg-muted/30 transition-colors"
//                           >
//                             <td className="px-4 py-3 text-sm">{index + 1}</td>
//                             <td className="px-4 py-3">
//                               <div>
//                                 <p className="text-sm font-medium">
//                                   {advance.advance_number}
//                                 </p>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               <div className="flex items-center gap-2">
//                                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
//                                   <span className="text-xs font-medium text-primary">
//                                     {advance.employee_name?.charAt(0).toUpperCase()}
//                                   </span>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm font-medium">{advance.employee_name}</p>
//                                   <p className="text-xs text-muted-foreground">ID: {advance.employee_id}</p>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               <div>
//                                 <p className="text-sm font-medium">{advance.trip_number}</p>
//                                 <p className="text-xs text-muted-foreground">{advance.destination}</p>
//                               </div>
//                             </td>
//                             <td className="px-4 py-3">
//                               <Badge variant={advance.request_type === 'initial' ? 'default' : 'secondary'}>
//                                 {advance.request_type === 'initial' ? 'Initial' : 'Additional'}
//                               </Badge>
//                             </td>
//                             <td className="px-4 py-3">
//                               <p className="text-sm font-semibold">
//                                 {formatCurrency(advance.requested_amount)}
//                               </p>
//                             </td>
//                             <td className="px-4 py-3">
//                               {getStatusBadge(advance.status)}
//                             </td>
//                             <td className="px-4 py-3">
//                               <p className="text-sm">{formatDate(advance.created_at)}</p>
//                             </td>
//                             <td className="px-4 py-3">
//                               <div className="flex gap-2">
//                                 <Button
//                                   variant="outline"
//                                   size="sm"
//                                   onClick={() => handleViewDetail(advance.advance_id || advance.id)}
//                                 >
//                                   <Eye className="w-4 h-4 mr-1" />
//                                   View
//                                 </Button>
//                                 {advance.status === 'pending' && (
//                                   <Button
//                                     size="sm"
//                                     onClick={() => handleReview(advance)}
//                                   >
//                                     Review
//                                   </Button>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>

//       {/* Review Dialog */}
//       {showReviewDialog && selectedAdvance && (
//         <AdvanceReviewDialog
//           advance={selectedAdvance}
//           open={showReviewDialog}
//           onClose={() => {
//             setShowReviewDialog(false)
//             setSelectedAdvance(null)
//             loadAdvances() // Refresh data after review
//           }}
//         />
//       )}
//     </div>
//   )
// }



// src/pages/admin/AdvanceRequestsContent.tsx

import { useState, useEffect } from 'react'
import { advanceAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'
import { Advance, AdvanceStats } from '@/types/advance'
import { Search, DollarSign, Clock, CheckCircle, XCircle, FileText } from 'lucide-react'

export default function AdvanceRequestsContent() {
  const [activeTab, setActiveTab] = useState<'pending' | 'all' | 'history'>('pending')
  const [advances, setAdvances] = useState<Advance[]>([])
  const [filteredAdvances, setFilteredAdvances] = useState<Advance[]>([])
  const [stats, setStats] = useState<AdvanceStats>({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAdvances()
  }, [])

  useEffect(() => {
    filterAdvances()
  }, [activeTab, advances, searchQuery])

  const loadAdvances = async () => {
    setIsLoading(true)
    try {
      const res = await advanceAPI.getAll()
      const advancesData = res.data.data || res.data || []
      setAdvances(advancesData)
      
      // Calculate stats
      const pendingCount = advancesData.filter((a: Advance) => a.status === 'pending').length
      const approvedCount = advancesData.filter((a: Advance) => 
        ['approved_area', 'approved_regional', 'completed'].includes(a.status)
      ).length
      const rejectedCount = advancesData.filter((a: Advance) => a.status === 'rejected').length
      
      setStats({
        pending: pendingCount,
        approved: approvedCount,
        rejected: rejectedCount,
        total: advancesData.length
      })
    } catch (error) {
      console.error('Failed to load advances:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAdvances = () => {
    let filtered = [...advances]

    // Filter by tab
    if (activeTab === 'pending') {
      filtered = filtered.filter(a => a.status === 'pending')
    } else if (activeTab === 'history') {
      filtered = filtered.filter(a => ['approved_area', 'approved_regional', 'completed', 'rejected'].includes(a.status))
    }
    // 'all' tab tidak filter

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(a => 
        a.advance_number?.toLowerCase().includes(query) ||
        a.employee_name?.toLowerCase().includes(query) ||
        a.trip_number?.toLowerCase().includes(query) ||
        a.destination?.toLowerCase().includes(query)
      )
    }

    setFilteredAdvances(filtered)
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
      approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
    }
    const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={`${color} text-xs`}>{label}</Badge>
  }

  const handleReview = (advance: Advance) => {
    setSelectedAdvance(advance)
    setShowReviewDialog(true)
  }

  const handleViewDetail = (advanceId: number) => {
    window.location.href = `/finance-area/advances/${advanceId}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Advance Requests</h2>
        <p className="text-muted-foreground">
          Review and approve advance payment requests from employees
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.pending}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Advance Requests</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by number, employee, trip..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="all">
                All Requests ({stats.total})
              </TabsTrigger>
              <TabsTrigger value="history">
                History
              </TabsTrigger>
            </TabsList>

            {/* Table Content */}
            <TabsContent value={activeTab} className="space-y-4">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading advances...</p>
                </div>
              ) : filteredAdvances.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {searchQuery ? 'No advances found matching your search' : 'No advances found'}
                  </p>
                </div>
              ) : (
                <div className="border rounded-lg">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          No
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Advance Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Employee
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Trip
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Type
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                          Requested
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium text-muted-foreground uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredAdvances.map((advance, index) => (
                        <tr 
                          key={advance.advance_id} 
                          className="hover:bg-muted/50 transition-colors"
                        >
                          <td className="px-4 py-3 text-sm">{index + 1}</td>
                          <td className="px-4 py-3">
                            <div className="font-medium text-sm">{advance.advance_number}</div>
                            <div className="text-xs text-muted-foreground">{advance.destination}</div>
                          </td>
                          <td className="px-4 py-3 text-sm">{advance.employee_name}</td>
                          <td className="px-4 py-3 text-sm">{advance.trip_number}</td>
                          <td className="px-4 py-3">
                            <Badge variant={advance.request_type === 'initial' ? 'default' : 'secondary'} className="text-xs">
                              {advance.request_type === 'initial' ? 'Initial' : 'Additional'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-right font-medium text-sm">
                            {formatCurrency(advance.requested_amount)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {getStatusBadge(advance.status)}
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">
                            {formatDate(advance.created_at)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewDetail(advance.advance_id || advance.id)}
                              >
                                View
                              </Button>
                              {advance.status === 'pending' && (
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() => handleReview(advance)}
                                >
                                  Review
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      {showReviewDialog && selectedAdvance && (
        <AdvanceReviewDialog
          advance={selectedAdvance}
          open={showReviewDialog}
          onClose={() => {
            setShowReviewDialog(false)
            setSelectedAdvance(null)
            loadAdvances() // Refresh data
          }}
        />
      )}
    </div>
  )
}