// import { useState } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Textarea } from '@/components/ui/textarea'
// import { Label } from '@/components/ui/label'
// import { advanceAPI } from '@/services/api'
// import { useToast } from '@/hooks/use-toast'

// // ✅ INTERFACE UNTUK ADVANCE DATA
// interface Advance {
//   id: number  // ← UBAH DARI string JADI number (sesuai api.ts)
//   trip_number: string
//   employee_name: string
//   destination: string
//   requested_amount: number
//   created_at: string
//   status: 'requested' | 'approved_area' | 'transferred' | 'rejected'
// }

// // ✅ INTERFACE UNTUK PROPS
// interface AdvanceReviewDialogProps {
//   advance: Advance
//   open: boolean
//   onClose: () => void
// }

// export function AdvanceReviewDialog({ advance, open, onClose }: AdvanceReviewDialogProps) {
//   const [action, setAction] = useState<'approve' | 'reject'>('approve')
//   const [approvedAmount, setApprovedAmount] = useState<string>(advance.requested_amount.toString())
//   const [notes, setNotes] = useState<string>('')
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const { toast } = useToast()

//   const handleSubmit = async () => {
//     setIsLoading(true)
//     try {
//       if (action === 'approve') {
//         // ✅ GUNAKAN approveByArea (sesuai api.ts)
//         await advanceAPI.approveByArea(advance.id, {
//           approved_amount: parseFloat(approvedAmount),
//           notes
//         })
//         toast({ 
//           title: 'Success', 
//           description: 'Advance approved successfully' 
//         })
//       } else {
//         // Validasi: reject harus ada notes
//         if (!notes.trim()) {
//           toast({ 
//             title: 'Error', 
//             description: 'Please provide a reason for rejection',
//             variant: 'destructive'
//           })
//           setIsLoading(false)
//           return
//         }
        
//         await advanceAPI.reject(advance.id, { notes })
//         toast({ 
//           title: 'Success', 
//           description: 'Advance rejected' 
//         })
//       }
//       onClose()
//     } catch (error: any) {
//       toast({ 
//         title: 'Error', 
//         description: error?.response?.data?.message || 'Failed to process request',
//         variant: 'destructive'
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const formatCurrency = (amount: number): string => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0
//     }).format(amount)
//   }

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-md">
//         <DialogHeader>
//           <DialogTitle>Review Advance Request</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           {/* Trip Info */}
//           <div className="p-3 bg-muted rounded-lg space-y-1">
//             <p className="text-sm text-muted-foreground">Trip Details</p>
//             <p className="font-semibold">{advance.trip_number}</p>
//             <p className="text-sm">{advance.destination}</p>
//             <p className="text-xs text-muted-foreground mt-1">
//               Employee: {advance.employee_name}
//             </p>
//           </div>

//           {/* Requested Amount */}
//           <div>
//             <Label>Requested Amount</Label>
//             <p className="text-2xl font-bold text-primary">
//               {formatCurrency(advance.requested_amount)}
//             </p>
//             <p className="text-xs text-muted-foreground mt-1">
//               Requested on {new Date(advance.created_at).toLocaleDateString('id-ID', {
//                 day: 'numeric',
//                 month: 'long',
//                 year: 'numeric'
//               })}
//             </p>
//           </div>

//           {/* Action Tabs */}
//           <div className="flex gap-2">
//             <Button
//               type="button"
//               variant={action === 'approve' ? 'default' : 'outline'}
//               onClick={() => setAction('approve')}
//               className="flex-1"
//             >
//               Approve
//             </Button>
//             <Button
//               type="button"
//               variant={action === 'reject' ? 'destructive' : 'outline'}
//               onClick={() => setAction('reject')}
//               className="flex-1"
//             >
//               Reject
//             </Button>
//           </div>

//           {/* Approved Amount (only if approve) */}
//           {action === 'approve' && (
//             <div className="space-y-2">
//               <Label htmlFor="approved_amount">
//                 Approved Amount <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 id="approved_amount"
//                 type="number"
//                 value={approvedAmount}
//                 onChange={(e) => setApprovedAmount(e.target.value)}
//                 min="0"
//                 step="100000"
//                 placeholder="Enter approved amount"
//               />
//               <p className="text-xs text-muted-foreground">
//                 You can adjust the amount if needed
//               </p>
//             </div>
//           )}

//           {/* Notes */}
//           <div className="space-y-2">
//             <Label htmlFor="notes">
//               Notes {action === 'reject' && <span className="text-red-500">*</span>}
//             </Label>
//             <Textarea
//               id="notes"
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={3}
//               placeholder={action === 'approve' 
//                 ? 'Add notes (optional)...' 
//                 : 'Reason for rejection (required)...'
//               }
//             />
//             {action === 'reject' && !notes.trim() && (
//               <p className="text-xs text-red-500">
//                 Rejection reason is required
//               </p>
//             )}
//           </div>
//         </div>

//         <DialogFooter>
//           <Button 
//             type="button"
//             variant="outline" 
//             onClick={onClose} 
//             disabled={isLoading}
//           >
//             Cancel
//           </Button>
//           <Button
//             type="button"
//             onClick={handleSubmit}
//             disabled={isLoading || (action === 'reject' && !notes.trim()) || (action === 'approve' && !approvedAmount)}
//             variant={action === 'approve' ? 'default' : 'destructive'}
//           >
//             {isLoading ? 'Processing...' : action === 'approve' ? 'Approve Request' : 'Reject Request'}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { advanceAPI } from '@/services/api'
import { useToast } from '@/hooks/use-toast'

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
  status: 'requested' | 'approved_area' | 'approved_regional' | 'transferred' | 'rejected'
  notes?: string
  requested_at: string
  created_at: string
  updated_at: string
}

interface AdvanceReviewDialogProps {
  advance: Advance
  open: boolean
  onClose: () => void
}

export function AdvanceReviewDialog({ advance, open, onClose }: AdvanceReviewDialogProps) {
  const [action, setAction] = useState<'approve' | 'reject'>('approve')
  const [approvedAmount, setApprovedAmount] = useState<string>(advance.requested_amount.toString())
  const [notes, setNotes] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    // Validasi input
    if (action === 'reject' && !notes.trim()) {
      toast({ 
        title: 'Error', 
        description: 'Please provide a reason for rejection',
        variant: 'destructive'
      })
      return
    }

    if (action === 'approve' && (!approvedAmount || parseFloat(approvedAmount) <= 0)) {
      toast({ 
        title: 'Error', 
        description: 'Please enter a valid approved amount',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    try {
      if (action === 'approve') {
        // ✅ Sesuai dengan Laravel API endpoint
        await advanceAPI.approveByArea(advance.id, {
          approved_amount: parseFloat(approvedAmount),
          notes: notes || undefined
        })
        toast({ 
          title: 'Success', 
          description: `Advance approved with amount ${formatCurrency(parseFloat(approvedAmount))}`,
        })
      } else {
        await advanceAPI.reject(advance.id, { 
          notes,
          rejected_by: 'finance_area'
        })
        toast({ 
          title: 'Success', 
          description: 'Advance request rejected' 
        })
      }
      onClose()
    } catch (error: any) {
      console.error('Error processing advance:', error)
      toast({ 
        title: 'Error', 
        description: error?.response?.data?.message || 'Failed to process request',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Review Advance Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Trip Info */}
          <div className="p-3 bg-muted rounded-lg space-y-1">
            <p className="text-sm text-muted-foreground">Trip Details</p>
            <p className="font-semibold">{advance.trip_number}</p>
            <p className="text-sm">{advance.destination}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Employee: {advance.employee_name}
            </p>
          </div>

          {/* Requested Amount */}
          <div>
            <Label>Requested Amount</Label>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(advance.requested_amount)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Requested on {formatDate(advance.created_at)}
            </p>
          </div>

          {/* Action Tabs */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={action === 'approve' ? 'default' : 'outline'}
              onClick={() => setAction('approve')}
              className="flex-1"
            >
              Approve
            </Button>
            <Button
              type="button"
              variant={action === 'reject' ? 'destructive' : 'outline'}
              onClick={() => setAction('reject')}
              className="flex-1"
            >
              Reject
            </Button>
          </div>

          {/* Approved Amount (only if approve) */}
          {action === 'approve' && (
            <div className="space-y-2">
              <Label htmlFor="approved_amount">
                Approved Amount <span className="text-red-500">*</span>
              </Label>
              <Input
                id="approved_amount"
                type="number"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
                min="0"
                step="100000"
                placeholder="Enter approved amount"
              />
              <p className="text-xs text-muted-foreground">
                You can adjust the amount based on budget or policy
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              Notes {action === 'reject' && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder={action === 'approve' 
                ? 'Add notes (optional)...' 
                : 'Please provide reason for rejection...'
              }
            />
            {action === 'reject' && !notes.trim() && (
              <p className="text-xs text-red-500">
                Rejection reason is required
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button"
            variant="outline" 
            onClick={onClose} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading || 
              (action === 'reject' && !notes.trim()) || 
              (action === 'approve' && (!approvedAmount || parseFloat(approvedAmount) <= 0))
            }
            variant={action === 'approve' ? 'default' : 'destructive'}
          >
            {isLoading ? 'Processing...' : action === 'approve' ? 'Approve Request' : 'Reject Request'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}