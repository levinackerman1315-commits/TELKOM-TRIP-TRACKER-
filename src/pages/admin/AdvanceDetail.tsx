// src/pages/admin/AdvanceDetail.tsx

import { useState, useEffect } from 'react'
import { advanceAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { AdvanceReviewDialog } from '@/components/admin/AdvanceReviewDialog'
import { AdvanceHistoryTimeline } from '@/components/admin/AdvanceHistoryTimeline'
import { Advance } from '@/types/advance' // ✅ Import dari types
import { 
  ArrowLeft, 
  DollarSign, 
  Calendar, 
  MapPin, 
  User, 
  FileText, 
  Eye, 
  Download,
  AlertCircle 
} from 'lucide-react'

export default function AdvanceDetail() {
  // Get advance_id from URL
  const advanceId = window.location.pathname.split('/').pop()
  
  const [advance, setAdvance] = useState<Advance | null>(null)
  const [showReviewDialog, setShowReviewDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (advanceId) {
      loadAdvance()
    }
  }, [advanceId])

  const loadAdvance = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const res = await advanceAPI.getById(Number(advanceId))
      const advanceData = res.data.data || res.data
      setAdvance(advanceData)
    } catch (error: any) {
      console.error('Failed to load advance:', error)
      setError(error.response?.data?.message || 'Failed to load advance details')
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
    
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
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
      pending: { color: 'bg-blue-100 text-blue-800', label: 'Pending Review' },
      approved_area: { color: 'bg-green-100 text-green-800', label: 'Approved by Area' },
      approved_regional: { color: 'bg-green-100 text-green-800', label: 'Approved by Regional' },
      completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
    }

    const { color, label } = statusMap[status] || { color: 'bg-gray-100 text-gray-800', label: status }
    return <Badge className={`${color} text-sm px-3 py-1`}>{label}</Badge>
  }

  const goBack = () => {
    window.history.back()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading advance details...</p>
        </div>
      </div>
    )
  }

  if (error || !advance) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error || 'Advance not found'}</p>
          <Button onClick={goBack}>Back to List</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={goBack}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </Button>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Advance Request</h1>
            <p className="text-muted-foreground">{advance.advance_number}</p>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(advance.status)}
            {advance.status === 'pending' && (
              <Button onClick={() => setShowReviewDialog(true)}>
                Review Request
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Main Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Advance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Advance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground">Advance Number</Label>
                  <p className="font-medium">{advance.advance_number}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Request Type</Label>
                  <Badge variant={advance.request_type === 'initial' ? 'default' : 'secondary'}>
                    {advance.request_type === 'initial' ? 'Initial' : 'Additional'}
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Request Date</Label>
                  <p className="font-medium">{formatDateTime(advance.created_at)}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <p className="font-medium">{getStatusBadge(advance.status)}</p>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-muted-foreground">Requested Amount</Label>
                    <p className="text-2xl font-bold text-primary">
                      {formatCurrency(advance.requested_amount)}
                    </p>
                  </div>
                  {advance.approved_amount && (
                    <div>
                      <Label className="text-xs text-muted-foreground">Approved Amount</Label>
                      <p className="text-2xl font-bold text-green-600">
                        {formatCurrency(advance.approved_amount)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {advance.request_reason && (
                <div className="border-t pt-4">
                  <Label className="text-xs text-muted-foreground">Request Reason</Label>
                  <p className="text-sm mt-1 bg-muted/50 rounded p-3">
                    {advance.request_reason}
                  </p>
                </div>
              )}

              {advance.rejection_reason && (
                <div className="border-t pt-4">
                  <Label className="text-xs text-muted-foreground text-red-600">Rejection Reason</Label>
                  <p className="text-sm mt-1 bg-red-50 border border-red-200 rounded p-3 text-red-800">
                    {advance.rejection_reason}
                  </p>
                </div>
              )}

              {advance.notes && (
                <div className="border-t pt-4">
                  <Label className="text-xs text-muted-foreground">Notes</Label>
                  <p className="text-sm mt-1 bg-muted/50 rounded p-3">
                    {advance.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Supporting Document */}
          {advance.supporting_document_path && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Supporting Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-4 bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{advance.supporting_document_name || 'Document'}</p>
                        <p className="text-xs text-muted-foreground">
                          Supporting document from employee
                        </p>
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
              </CardContent>
            </Card>
          )}

          {/* Status History */}
          <Card>
            <CardHeader>
              <CardTitle>Status History</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvanceHistoryTimeline 
                advanceId={advance.advance_id || advance.id}
                showTitle={false}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Trip & Employee Info */}
        <div className="space-y-6">
          {/* Trip Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="w-5 h-5" />
                Trip Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Trip Number</Label>
                <p className="font-medium">{advance.trip_number}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Destination</Label>
                <p className="font-medium">{advance.destination}</p>
              </div>
              {advance.trip && (
                <>
                  <div>
                    <Label className="text-xs text-muted-foreground">Purpose</Label>
                    <p className="text-sm">{advance.trip.purpose}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Duration</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div className="text-sm">
                        <p>{formatDate(advance.trip.start_date)}</p>
                        <p className="text-muted-foreground">to</p>
                        <p>{formatDate(advance.trip.end_date)}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">Trip Status</Label>
                    <Badge variant="outline" className="mt-1">
                      {advance.trip.status}
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Employee Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5" />
                Employee Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-muted-foreground">Employee Name</Label>
                <p className="font-medium">{advance.employee_name}</p>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Employee ID</Label>
                <p className="font-medium">{advance.employee_id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          {advance.status === 'pending' && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-800 mb-4">
                  This advance request is awaiting your review.
                </p>
                <Button 
                  onClick={() => setShowReviewDialog(true)}
                  className="w-full"
                >
                  Review & Approve
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Review Dialog */}
      {showReviewDialog && (
        <AdvanceReviewDialog
          advance={advance}
          open={showReviewDialog}
          onClose={() => {
            setShowReviewDialog(false)
            loadAdvance() // Refresh data after review
          }}
        />
      )}
    </div>
  )
}