import { useState } from 'react'
import { XCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface RejectDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  loading?: boolean
  title?: string
  message?: string
}

export const RejectDialog = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = 'Reject Settlement',
  message = 'Please provide a reason for rejecting this settlement. The employee will see this message.'
}: RejectDialogProps) => {
  const [reason, setReason] = useState('')

  if (!isOpen) return null

  const handleConfirm = () => {
    if (!reason.trim()) {
      alert('Please provide a rejection reason')
      return
    }
    onConfirm(reason)
  }

  const handleClose = () => {
    setReason('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {title}
            </h3>
          </div>

          {/* Message */}
          <p className="text-gray-600 mb-4">
            {message}
          </p>

          {/* Textarea */}
          <div className="mb-6">
            <Label htmlFor="rejection-reason" className="text-sm font-medium text-gray-700 mb-2 block">
              Rejection Reason *
            </Label>
            <Textarea
              id="rejection-reason"
              placeholder="e.g., Missing receipts, incorrect amounts, incomplete documentation..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              disabled={loading}
              className="w-full resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              This reason will be visible to the employee
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button
              onClick={handleClose}
              variant="outline"
              disabled={loading}
              className="min-w-24"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={loading || !reason.trim()}
              className="min-w-24 bg-red-600 hover:bg-red-700 text-white"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Rejecting...
                </span>
              ) : (
                'Reject Settlement'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}