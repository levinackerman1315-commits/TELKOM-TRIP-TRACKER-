// src/components/admin/AdvanceReviewDialog.tsx

import { useState } from 'react'
import { advanceAPI } from '@/services/api'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle2, XCircle } from 'lucide-react'

interface Advance {
  advance_id: number
  trip_id: number
  advance_number: string
  employee_name: string
  destination: string
  requested_amount: number
  status: string
  request_reason?: string
  created_at: string
}

interface Props {
  advance: Advance
  open: boolean
  onClose: () => void
}

export function AdvanceReviewDialog({ advance, open, onClose }: Props) {
  const [action, setAction] = useState<'approve' | 'reject' | null>(null)
  const [approvedAmount, setApprovedAmount] = useState(advance.requested_amount)
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleApprove = async () => {
    if (!approvedAmount || approvedAmount <= 0) {
      alert('Please enter a valid approved amount')
      return
    }

    setIsSubmitting(true)
    try {
      await advanceAPI.approveByArea(advance.advance_id, {
        approved_amount: approvedAmount,
        notes: notes || `Approved: ${formatCurrency(approvedAmount)}`
      })

      alert('Advance approved successfully!')
      onClose()
    } catch (error: any) {
      console.error('Failed to approve:', error)
      alert(error.response?.data?.message || 'Failed to approve advance')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!notes.trim()) {
      alert('Please provide a rejection reason')
      return
    }

    setIsSubmitting(true)
    try {
      await advanceAPI.reject(advance.advance_id, {
        rejection_reason: notes
      })

      alert('Advance rejected')
      onClose()
    } catch (error: any) {
      console.error('Failed to reject:', error)
      alert(error.response?.data?.message || 'Failed to reject advance')
    } finally {
      setIsSubmitting(false)
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Review Advance Request</DialogTitle>
          <DialogDescription>
            Review and approve or reject the advance payment request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Advance Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs text-muted-foreground">Advance Number</Label>
              <p className="font-medium">{advance.advance_number}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Request Date</Label>
              <p className="font-medium">{formatDate(advance.created_at)}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Employee</Label>
              <p className="font-medium">{advance.employee_name}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Destination</Label>
              <p className="font-medium">{advance.destination}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <Label className="text-xs text-muted-foreground">Requested Amount</Label>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(advance.requested_amount)}
            </p>
          </div>

          {advance.request_reason && (
            <div>
              <Label className="text-xs text-muted-foreground">Reason</Label>
              <p className="text-sm">{advance.request_reason}</p>
            </div>
          )}

          {/* Action Selection */}
          {!action && (
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setAction('approve')}
                className="flex-1"
                variant="default"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                onClick={() => setAction('reject')}
                className="flex-1"
                variant="destructive"
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          )}

          {/* Approve Form */}
          {action === 'approve' && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <Label htmlFor="approved_amount">Approved Amount *</Label>
                <Input
                  id="approved_amount"
                  type="number"
                  value={approvedAmount}
                  onChange={(e) => setApprovedAmount(Number(e.target.value))}
                  min={0}
                  max={advance.requested_amount}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum: {formatCurrency(advance.requested_amount)}
                </p>
              </div>

              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes or conditions..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Reject Form */}
          {action === 'reject' && (
            <div className="space-y-4 border-t pt-4">
              <div>
                <Label htmlFor="rejection_reason">Rejection Reason *</Label>
                <Textarea
                  id="rejection_reason"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain why this request is being rejected..."
                  rows={4}
                  required
                />
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          {action ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setAction(null)
                  setNotes('')
                  setApprovedAmount(advance.requested_amount)
                }}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={action === 'approve' ? handleApprove : handleReject}
                disabled={isSubmitting || (action === 'reject' && !notes.trim())}
                variant={action === 'approve' ? 'default' : 'destructive'}
              >
                {isSubmitting ? 'Processing...' : action === 'approve' ? 'Approve' : 'Reject'}
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}