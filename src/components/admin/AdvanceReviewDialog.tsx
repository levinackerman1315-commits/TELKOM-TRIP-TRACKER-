
// src/components/admin/AdvanceReviewDialog.tsx

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { advanceAPI } from '@/services/api'
import { Advance } from '@/types/advance' // ✅ Import dari types

interface AdvanceReviewDialogProps {
  advance: Advance // ✅ Pakai interface dari types
  open: boolean
  onClose: () => void
}

export function AdvanceReviewDialog({ advance, open, onClose }: AdvanceReviewDialogProps) {
  const [action, setAction] = useState<'approve' | 'reject'>('approve')
  const [approvedAmount, setApprovedAmount] = useState<string>(advance.requested_amount.toString())
  const [notes, setNotes] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    // Validasi input
    if (action === 'reject' && !notes.trim()) {
      setError('Please provide a reason for rejection')
      return
    }

    if (action === 'approve' && (!approvedAmount || parseFloat(approvedAmount) <= 0)) {
      setError('Please enter a valid approved amount')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      if (action === 'approve') {
        await advanceAPI.approveByArea(advance.id || advance.advance_id, {
          approved_amount: parseFloat(approvedAmount),
          notes: notes || undefined
        })
        alert('Advance approved successfully!')
      } else {
        await advanceAPI.reject(advance.id || advance.advance_id, { 
          rejection_reason: notes.trim()
        })
        alert('Advance request rejected')
      }
      onClose()
    } catch (error: any) {
      console.error('Error processing advance:', error)
      setError(error?.response?.data?.message || 'Failed to process request')
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
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
              {error}
            </div>
          )}

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

          {/* Request Reason */}
          {advance.request_reason && (
            <div>
              <Label className="text-xs text-muted-foreground">Request Reason</Label>
              <p className="text-sm bg-muted/50 rounded p-2 mt-1">
                {advance.request_reason}
              </p>
            </div>
          )}

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
                Maximum: {formatCurrency(advance.requested_amount)}
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">
              {action === 'approve' ? 'Notes (Optional)' : 'Rejection Reason'} 
              {action === 'reject' && <span className="text-red-500">*</span>}
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