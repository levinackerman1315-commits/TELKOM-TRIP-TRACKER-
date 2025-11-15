// import { useState, useEffect } from 'react'
// import { advanceAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'

// // ✅ UBAH NAMA COMPONENT DARI AdvanceRequests JADI AdvanceRequestsContent
// export default function AdvanceRequestsContent() {
//   const [advances, setAdvances] = useState([])
//   const [selectedAdvance, setSelectedAdvance] = useState(null)
//   const [showDialog, setShowDialog] = useState(false)

//   useEffect(() => {
//     loadAdvances()
//   }, [])

//   const loadAdvances = async () => {
//     try {
//       const res = await advanceAPI.getAll({ status: 'requested' })
//       setAdvances(res.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount)
//   }

//   return (
//     <div className="space-y-6">
//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Pending Requests
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{advances.length}</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* List */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Advance Requests</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="border-b">
//                 <tr>
//                   <th className="text-left p-3 text-sm font-medium">Trip</th>
//                   <th className="text-left p-3 text-sm font-medium">Employee</th>
//                   <th className="text-left p-3 text-sm font-medium">Destination</th>
//                   <th className="text-right p-3 text-sm font-medium">Requested</th>
//                   <th className="text-left p-3 text-sm font-medium">Date</th>
//                   <th className="text-left p-3 text-sm font-medium">Status</th>
//                   <th className="text-left p-3 text-sm font-medium">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y">
//                 {advances.map(adv => (
//                   <tr key={adv.id} className="hover:bg-muted/50">
//                     <td className="p-3 font-medium">{adv.trip_number}</td>
//                     <td className="p-3">{adv.employee_name}</td>
//                     <td className="p-3">{adv.destination}</td>
//                     <td className="p-3 text-right font-semibold">
//                       {formatCurrency(adv.requested_amount)}
//                     </td>
//                     <td className="p-3 text-sm text-muted-foreground">
//                       {new Date(adv.created_at).toLocaleDateString('id-ID')}
//                     </td>
//                     <td className="p-3">
//                       <Badge variant="outline">Pending</Badge>
//                     </td>
//                     <td className="p-3">
//                       <Button
//                         size="sm"
//                         onClick={() => {
//                           setSelectedAdvance(adv)
//                           setShowDialog(true)
//                         }}
//                       >
//                         Review
//                       </Button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Review Dialog */}
//       {selectedAdvance && (
//         <AdvanceReviewDialog
//           advance={selectedAdvance}
//           open={showDialog}
//           onClose={() => {
//             setShowDialog(false)
//             setSelectedAdvance(null)
//             loadAdvances()
//           }}
//         />
//       )}
//     </div>
//   )
// }

// import { useState, useEffect } from 'react'
// import { advanceAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Badge } from '@/components/ui/badge'
// import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'

// // ✅ INTERFACE SESUAI DENGAN LARAVEL BACKEND
// interface Advance {
//   id: number
//   trip_id: number
//   trip_number: string
//   employee_id: number
//   employee_name: string
//   destination: string
//   requested_amount: number
//   approved_amount?: number
//   status: 'requested' | 'approved_area' | 'approved_regional' | 'transferred' | 'rejected'
//   notes?: string
//   requested_at: string
//   created_at: string
//   updated_at: string
// }

// export default function AdvanceRequestsContent() {
//   const [advances, setAdvances] = useState<Advance[]>([])
//   const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
//   const [showDialog, setShowDialog] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     loadAdvances()
//   }, [])

//   const loadAdvances = async () => {
//     setIsLoading(true)
//     try {
//       const res = await advanceAPI.getAll({ status: 'pending' })
//       const advancesData = res.data.data || res.data
//       setAdvances(advancesData)
//     } catch (error: any) {
//       console.error('Failed to load advances:', error)
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
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric'
//     })
//   }

//   return (
//     <div className="space-y-6">
//       <div className="mb-8">
//         <h2 className="text-3xl font-bold text-foreground mb-2">Advance Requests</h2>
//         <p className="text-muted-foreground">Review and approve advance payment requests</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="pb-3">
//             <CardTitle className="text-sm font-medium text-muted-foreground">
//               Pending Requests
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold text-blue-600">{advances.length}</div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>Advance Requests List</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">Loading...</p>
//             </div>
//           ) : advances.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No pending advance requests</p>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="border-b">
//                   <tr>
//                     <th className="text-left p-3 text-sm font-medium">Trip</th>
//                     <th className="text-left p-3 text-sm font-medium">Employee</th>
//                     <th className="text-left p-3 text-sm font-medium">Destination</th>
//                     <th className="text-right p-3 text-sm font-medium">Requested</th>
//                     <th className="text-left p-3 text-sm font-medium">Date</th>
//                     <th className="text-left p-3 text-sm font-medium">Status</th>
//                     <th className="text-left p-3 text-sm font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y">
//                   {advances.map(adv => (
//                     <tr key={adv.id} className="hover:bg-muted/50">
//                       <td className="p-3 font-medium">{adv.trip_number}</td>
//                       <td className="p-3">{adv.employee_name}</td>
//                       <td className="p-3">{adv.destination}</td>
//                       <td className="p-3 text-right font-semibold">
//                         {formatCurrency(adv.requested_amount)}
//                       </td>
//                       <td className="p-3 text-sm text-muted-foreground">
//                         {formatDate(adv.created_at)}
//                       </td>
//                       <td className="p-3">
//                         <Badge variant="outline">Pending</Badge>
//                       </td>
//                       <td className="p-3">
//                         <Button
//                           size="sm"
//                           onClick={() => {
//                             setSelectedAdvance(adv)
//                             setShowDialog(true)
//                           }}
//                         >
//                           Review
//                         </Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {selectedAdvance && (
//         <AdvanceReviewDialog
//           advance={selectedAdvance}
//           open={showDialog}
//           onClose={() => {
//             setShowDialog(false)
//             setSelectedAdvance(null)
//             loadAdvances()
//           }}
//         />
//       )}
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { advanceAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog' // Pastikan path benar

// ✅ INTERFACE SESUAI DENGAN LARAVEL BACKEND
interface Advance {
  id: number
  trip_id: number
  trip_number: string
  employee_id: number
  employee_name: string
  destination: string
  requested_amount: number
  approved_amount?: number
  status: 'pending' | 'approved_area' | 'approved_regional' | 'transferred' | 'rejected' // <- Diperbarui
  notes?: string
  requested_at: string
  created_at: string
  updated_at: string
}

export default function AdvanceRequestsContent() {
  const [advances, setAdvances] = useState<Advance[]>([])
  const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAdvances()
  }, [])

  const loadAdvances = async () => {
    setIsLoading(true)
    try {
      // ✅ Mengambil data dengan filter status 'pending'
      const res = await advanceAPI.getAll({ status: 'pending' })
      const advancesData = res.data.data || res.data
      setAdvances(advancesData)
    } catch (error: any) {
      console.error('Failed to load advances:', error)
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
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  // Fungsi untuk menampilkan badge status
  const getAdvanceStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      approved_area: { color: 'bg-blue-100 text-blue-800', label: 'Approved by Area' },
      approved_regional: { color: 'bg-purple-100 text-purple-800', label: 'Approved by Regional' },
      transferred: { color: 'bg-green-100 text-green-800', label: 'Transferred' },
      rejected: { color: 'bg-destructive text-destructive-foreground', label: 'Rejected' },
    }

    const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }

    return <Badge className={color}>{label}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Advance Requests</h2>
        <p className="text-muted-foreground">Review and approve advance payment requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{advances.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advance Requests List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : advances.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No pending advance requests</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b">
                  <tr>
                    <th className="text-left p-3 text-sm font-medium">Trip</th>
                    <th className="text-left p-3 text-sm font-medium">Employee</th>
                    <th className="text-left p-3 text-sm font-medium">Destination</th>
                    <th className="text-right p-3 text-sm font-medium">Requested</th>
                    <th className="text-left p-3 text-sm font-medium">Date</th>
                    <th className="text-left p-3 text-sm font-medium">Status</th>
                    <th className="text-left p-3 text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {advances.map(adv => (
                    <tr key={adv.id} className="hover:bg-muted/50">
                      <td className="p-3 font-medium">{adv.trip_number}</td>
                      <td className="p-3">{adv.employee_name}</td>
                      <td className="p-3">{adv.destination}</td>
                      <td className="p-3 text-right font-semibold">
                        {formatCurrency(adv.requested_amount)}
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {formatDate(adv.created_at)}
                      </td>
                      <td className="p-3">
                        {/* ✅ Badge status dinamis */}
                        {getAdvanceStatusBadge(adv.status)}
                      </td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedAdvance(adv)
                            setShowDialog(true)
                          }}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedAdvance && (
        <AdvanceReviewDialog
          advance={selectedAdvance}
          open={showDialog}
          onClose={() => {
            setShowDialog(false)
            setSelectedAdvance(null)
            loadAdvances() // Refresh data setelah review
          }}
        />
      )}
    </div>
  )
}