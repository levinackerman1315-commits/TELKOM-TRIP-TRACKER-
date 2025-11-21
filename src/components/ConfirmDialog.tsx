import { AlertCircle, CheckCircle2, XCircle, AlertTriangle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  type?: 'danger' | 'warning' | 'success' | 'info'
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false
}: ConfirmDialogProps) => {
  if (!isOpen) return null

  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <XCircle className="w-12 h-12 text-red-600" />
      case 'warning':
        return <AlertTriangle className="w-12 h-12 text-amber-600" />
      case 'success':
        return <CheckCircle2 className="w-12 h-12 text-green-600" />
      case 'info':
        return <AlertCircle className="w-12 h-12 text-blue-600" />
    }
  }

  const getConfirmButtonClass = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white'
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 text-white'
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white'
      case 'info':
        return 'bg-blue-600 hover:bg-blue-700 text-white'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          disabled={loading}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            {getIcon()}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onClose}
              variant="outline"
              disabled={loading}
              className="min-w-24"
            >
              {cancelText}
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className={`min-w-24 ${getConfirmButtonClass()}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                confirmText
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ===================================================================
// SUCCESS/ERROR ALERT DIALOG (Auto Close)
// ===================================================================

interface AlertDialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type: 'success' | 'error'
}

export const AlertDialog = ({
  isOpen,
  onClose,
  title,
  message,
  type
}: AlertDialogProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Content */}
        <div className="p-6 text-center">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            {type === 'success' ? (
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600" />
            )}
          </div>

          {/* Title */}
          <h3 className={`text-xl font-bold mb-2 ${
            type === 'success' ? 'text-green-900' : 'text-red-900'
          }`}>
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* OK Button */}
          <Button
            onClick={onClose}
            className={`min-w-32 ${
              type === 'success' 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-red-600 hover:bg-red-700'
            } text-white`}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  )
}