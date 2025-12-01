

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Edit, CheckCircle, XCircle } from 'lucide-react'

interface User {
  user_id: number
  nik: string
  name: string
  email: string
  phone: string
  role: string
  department: string
  position: string
  office_location: string
  area_code: string
  regional: string
  bank_account: string
  bank_name: string
  is_active: number
  created_at: string
  updated_at: string
  last_login: string
}

const UserDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      // ✅ Validasi ID sebelum fetch
      const userId = Number(id)
      if (!isNaN(userId) && userId > 0) {
        fetchUser(userId)
      } else {
        console.error('Invalid user ID:', id)
        alert('Invalid user ID')
        navigate('/hr/dashboard')
      }
    }
  }, [id, navigate])

  const fetchUser = async (userId: number) => {
    try {
      setLoading(true)
      const response = await userAPI.getById(userId)
      setUser(response.data.user || response.data)
    } catch (error) {
      console.error('Failed to fetch user:', error)
      alert('Failed to fetch user data')
      navigate('/hr/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const getRoleBadge = (role: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      employee: { color: 'bg-blue-100 text-blue-800', label: 'Employee' },
      finance_area: { color: 'bg-purple-100 text-purple-800', label: 'Finance Area' },
      finance_regional: { color: 'bg-orange-100 text-orange-800', label: 'Finance Regional' },
      hr: { color: 'bg-green-100 text-green-800', label: 'HR' }
    }
    const badge = badges[role] || { color: 'bg-gray-100 text-gray-800', label: role }
    return <Badge className={badge.color}>{badge.label}</Badge>
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">User not found</p>
          <Button onClick={() => navigate('/hr/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/hr/dashboard')}
                variant="ghost"
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
                <p className="text-sm text-gray-600 mt-1">View user account information</p>
              </div>
            </div>
            <Button
              onClick={() => navigate(`/hr/users/edit/${id}`)}  // ✅ FIX: Pindah 'edit' ke depan!
              className="gap-2 bg-red-600 hover:bg-red-700"
            >
              <Edit className="h-4 w-4" />
              Edit User
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Basic Information</CardTitle>
              {user.is_active ? (
                <Badge className="bg-green-100 text-green-800 gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Active
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800 gap-1">
                  <XCircle className="h-3 w-3" />
                  Inactive
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">NIK</p>
                <p className="font-medium">{user.nik}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">{user.phone || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Role</p>
                <div className="mt-1">{getRoleBadge(user.role)}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Department</p>
                <p className="font-medium">{user.department || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Position</p>
                <p className="font-medium">{user.position || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Office Location</p>
                <p className="font-medium">{user.office_location || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Area Code</p>
                <p className="font-medium">{user.area_code || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Regional</p>
                <p className="font-medium">{user.regional || '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bank Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bank Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-medium">{user.bank_name || '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-medium">{user.bank_account || '-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Information */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Account Created</p>
                <p className="font-medium">{formatDate(user.created_at)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">{formatDate(user.updated_at)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Login</p>
                <p className="font-medium">{formatDate(user.last_login)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserDetail