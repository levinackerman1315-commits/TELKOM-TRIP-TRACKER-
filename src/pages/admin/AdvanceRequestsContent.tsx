
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