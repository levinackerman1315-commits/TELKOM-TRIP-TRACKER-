import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userAPI, authAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  UserCheck, 
  UserX, 
  LogOut, 
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface User {
  user_id: number
  nik: string
  name: string
  email: string
  role: string
  department: string
  position: string
  is_active: number
  created_at: string
}

interface Statistics {
  total_users: number
  active_users: number
  inactive_users: number
  by_role: {
    employee: number
    finance_area: number
    finance_regional: number
    hr: number
  }
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { user: currentUser, logout } = useAuth()
  const [statistics, setStatistics] = useState<Statistics | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchData()
  }, [filterRole, filterStatus])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [statsRes, usersRes] = await Promise.all([
        userAPI.getStatistics(),
        userAPI.getAll({ 
          role: filterRole !== 'all' ? filterRole : undefined,
          is_active: filterStatus !== 'all' ? (filterStatus === 'active' ? 1 : 0) : undefined
        })
      ])

      setStatistics(statsRes.data.statistics)
      setUsers(usersRes.data.users.data || usersRes.data.users)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      logout()
      navigate('/login')
    }
  }

  const handleDelete = async (userId: number, userName: string) => {
    if (!window.confirm(`Are you sure you want to deactivate user: ${userName}?`)) return

    try {
      await userAPI.delete(userId)
      fetchData()
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Failed to delete user')
    }
  }

  const handleActivate = async (userId: number, userName: string) => {
    if (!window.confirm(`Reactivate user: ${userName}?`)) return

    try {
      await userAPI.activate(userId)
      fetchData()
    } catch (error) {
      console.error('Failed to activate user:', error)
      alert('Failed to activate user')
    }
  }

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.nik.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
              <p className="text-sm text-gray-600 mt-1">User Account Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
                <p className="text-xs text-gray-500 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="outline" 
                size="sm"
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{statistics?.total_users || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <UserCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{statistics?.active_users || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{statistics?.inactive_users || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Employees</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{statistics?.by_role.employee || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-gray-600 mt-1">Manage all user accounts</p>
              </div>
              <Button 
                onClick={() => navigate('/hr/users/new')}
                className="gap-2 bg-red-600 hover:bg-red-700"
              >
                <Plus className="h-4 w-4" />
                Create New User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email, or NIK..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Roles</option>
                <option value="employee">Employee</option>
                <option value="finance_area">Finance Area</option>
                <option value="finance_regional">Finance Regional</option>
                <option value="hr">HR</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No users found
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.user_id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.nik}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3 text-sm">{getRoleBadge(user.role)}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.department || '-'}</td>
                        <td className="px-4 py-3 text-sm">
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
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              onClick={() => navigate(`/hr/users/${user.user_id}`)}
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {user.is_active ? (
                              <Button
                                onClick={() => handleDelete(user.user_id, user.name)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                disabled={user.user_id === currentUser?.user_id}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button
                                onClick={() => handleActivate(user.user_id, user.name)}
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard