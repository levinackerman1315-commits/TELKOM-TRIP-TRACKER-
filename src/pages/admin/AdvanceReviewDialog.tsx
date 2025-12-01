
import { useState, useEffect } from 'react'
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
import { CheckCircle2, XCircle, Eye, Download, Clock, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface Advance {
  id: number
  advance_id: number
  advance_number: string
  trip_id: number
  trip_number: string
  destination: string
  employee_id: number
  employee_name: string
  request_type: string
  requested_amount: number
  approved_amount?: number
  status: string
  request_reason?: string
  rejection_reason?: string
  notes?: string
  created_at: string
  supporting_document_path?: string
  supporting_document_name?: string
  approved_at_area?: string
  approved_at_regional?: string
  requested_at?: string
}

// ✅ Interface untuk Status History
interface StatusHistory {
  id: number
  advance_id: number
  old_status: string | null
  new_status: string
  changed_by: number
  changed_by_name?: string
  notes?: string
  changed_at: string
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
  const [error, setError] = useState<string | null>(null)
  
  // ✅ State untuk Status History
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  // ✅ Fetch status history saat dialog dibuka
  useEffect(() => {
    if (open) {
      fetchStatusHistory()
    }
  }, [open])

  const fetchStatusHistory = async () => {
    setLoadingHistory(true)
    try {
      // ✅ TODO: Ganti dengan endpoint API yang sesuai
      // const res = await advanceAPI.getStatusHistory(advance.id || advance.advance_id)
      // setStatusHistory(res.data)
      
      // ✅ SEMENTARA: Mock data untuk demo
      setStatusHistory([
        {
          id: 1,
          advance_id: advance.advance_id,
          old_status: null,
          new_status: 'pending',
          changed_by: advance.employee_id,
          changed_by_name: advance.employee_name,
          notes: 'Advance request created',
          changed_at: advance.created_at
        }
      ])
    } catch (error) {
      console.error('Failed to fetch status history:', error)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleApprove = async () => {
    if (!approvedAmount || approvedAmount <= 0) {
      setError('Please enter a valid approved amount')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await advanceAPI.approveByArea(advance.id || advance.advance_id, {
        approved_amount: approvedAmount,
        notes: notes || `Approved: ${formatCurrency(approvedAmount)}`
      })

      alert('Advance approved successfully!')
      onClose()
      
    } catch (error: any) {
      console.error('Failed to approve:', error)
      setError(error.response?.data?.message || 'Failed to approve advance')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    if (!notes.trim()) {
      setError('Please provide a rejection reason')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await advanceAPI.reject(advance.id || advance.advance_id, {
        rejection_reason: notes
      })

      alert('Advance rejected')
      onClose()
      
    } catch (error: any) {
      console.error('Failed to reject:', error)
      setError(error.response?.data?.message || 'Failed to reject advance')
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
    if (!dateString) return '-'
    
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string; label: string }> = {
      pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending' },
      approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved by Area' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' }
    }

    const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={color}>{label}</Badge>
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Advance Request</DialogTitle>
          <DialogDescription>
            Review and approve or reject the advance payment request
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
              {error}
            </div>
          )}

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
              <Label className="text-xs text-muted-foreground">Trip Number</Label>
              <p className="font-medium">{advance.trip_number}</p>
            </div>
            <div className="col-span-2">
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

          {/* Supporting Document Section */}
          {advance.supporting_document_path && (
            <div className="space-y-2 pt-4 border-t">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Supporting Document
              </Label>
              <div className="border rounded-lg p-3 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{advance.supporting_document_name || 'Document'}</p>
                      <p className="text-xs text-muted-foreground">Supporting document from employee</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.open(
                          `http://127.0.0.1:8000/storage/${advance.supporting_document_path}`,
                          '_blank'
                        );
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `http://127.0.0.1:8000/storage/${advance.supporting_document_path}`;
                        link.download = advance.supporting_document_name || 'document';
                        link.click();
                      }}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ✅ Status History Section */}
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Status History
            </Label>
            
            {loadingHistory ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                Loading history...
              </div>
            ) : statusHistory.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">
                No status history available
              </div>
            ) : (
              <div className="space-y-2">
                {statusHistory.map((history, index) => (
                  <div 
                    key={history.id}
                    className="border rounded-lg p-3 bg-muted/30 relative"
                  >
                    {/* Timeline Line */}
                    {index < statusHistory.length - 1 && (
                      <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-border"></div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {history.new_status === 'rejected' ? (
                          <XCircle className="w-5 h-5 text-red-600" />
                        ) : history.new_status === 'approved_area' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      
                      {/* Status Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {getStatusBadge(history.new_status)}
                          <span className="text-xs text-muted-foreground">
                            {formatDate(history.changed_at)}
                          </span>
                        </div>
                        
                        {history.changed_by_name && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                            <User className="w-3 h-3" />
                            <span>{history.changed_by_name}</span>
                          </div>
                        )}
                        
                        {history.notes && (
                          <p className="text-sm text-muted-foreground">
                            {history.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Selection */}
          {!action && advance.status === 'pending' && (
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
                  setError(null)
                }}
                disabled={isSubmitting}
              >
                Back
              </Button>
              <Button
                onClick={action === 'approve' ? handleApprove : handleReject}
                disabled={
                  isSubmitting || 
                  (action === 'reject' && !notes.trim()) ||
                  (action === 'approve' && (!approvedAmount || approvedAmount <= 0))
                }
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