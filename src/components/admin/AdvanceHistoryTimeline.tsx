
// src/components/admin/AdvanceHistoryTimeline.tsx

import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, Clock, User, AlertCircle } from 'lucide-react'
import { StatusHistory } from '@/types/advance'
import { advanceAPI } from '@/services/api' // ✅ Import advanceAPI

interface Props {
  advanceId: number
  statusHistory?: StatusHistory[]
  showTitle?: boolean
}

export function AdvanceHistoryTimeline({ 
  advanceId, 
  statusHistory: externalHistory,
  showTitle = true 
}: Props) {
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>(externalHistory || [])
  const [loading, setLoading] = useState(!externalHistory)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (externalHistory) {
      setStatusHistory(externalHistory)
      setLoading(false)
      return
    }

    fetchStatusHistory()
  }, [advanceId, externalHistory])

  const fetchStatusHistory = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // ✅ Call API backend
      const res = await advanceAPI.getStatusHistory(advanceId)
      
      if (res.data.success) {
        setStatusHistory(res.data.data || [])
      } else {
        setError('Failed to load status history')
      }
      
    } catch (err: any) {
      console.error('Failed to fetch status history:', err)
      setError(err.response?.data?.message || 'Failed to load status history')
    } finally {
      setLoading(false)
    }
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
      approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved by Regional' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      voided: { color: 'bg-gray-100 text-gray-800', label: 'Voided' }
    }

    const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={color}>{label}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'rejected':
      case 'voided':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'approved_area':
      case 'approved_regional':
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="space-y-3">
      {showTitle && (
        <Label className="text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Status History
        </Label>
      )}
      
      {loading ? (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          Loading history...
        </div>
      ) : error ? (
        <div className="text-center py-6">
          <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
          <p className="text-sm text-amber-700 mb-2">{error}</p>
          <p className="text-xs text-muted-foreground">
            Please check backend API connection
          </p>
        </div>
      ) : statusHistory.length === 0 ? (
        <div className="text-center py-6 text-sm text-muted-foreground">
          <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p>No status history available</p>
          <p className="text-xs mt-1">History will appear after status changes</p>
        </div>
      ) : (
        <div className="space-y-2">
          {statusHistory.map((history, index) => (
            <div 
              key={history.id}
              className="border rounded-lg p-3 bg-muted/30 relative hover:bg-muted/50 transition-colors"
            >
              {index < statusHistory.length - 1 && (
                <div className="absolute left-8 top-12 bottom-0 w-0.5 bg-border"></div>
              )}
              
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 relative z-10">
                  {getStatusIcon(history.new_status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    {getStatusBadge(history.new_status)}
                    <span className="text-xs text-muted-foreground">
                      {formatDate(history.changed_at)}
                    </span>
                  </div>
                  
                  {history.changed_by_name && (
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                      <User className="w-3 h-3" />
                      <span>by {history.changed_by_name}</span>
                    </div>
                  )}
                  
                  {history.notes && (
                    <p className="text-sm text-muted-foreground mt-1 bg-background/50 rounded px-2 py-1">
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
  )
}