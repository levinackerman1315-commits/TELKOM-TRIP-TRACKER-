// // // // // import { useState, useEffect } from 'react'
// // // // // import { useNavigate } from 'react-router-dom'
// // // // // import { userAPI, authAPI } from '@/services/api'
// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Input } from '@/components/ui/input'
// // // // // import { Badge } from '@/components/ui/badge'
// // // // // import { 
// // // // //   Users, 
// // // // //   UserCheck, 
// // // // //   UserX, 
// // // // //   LogOut, 
// // // // //   Search,
// // // // //   Plus,
// // // // //   Edit,
// // // // //   Trash2,
// // // // //   CheckCircle,
// // // // //   XCircle
// // // // // } from 'lucide-react'
// // // // // import { useAuth } from '@/contexts/AuthContext'

// // // // // interface User {
// // // // //   user_id: number
// // // // //   nik: string
// // // // //   name: string
// // // // //   email: string
// // // // //   role: string
// // // // //   department: string
// // // // //   position: string
// // // // //   is_active: number
// // // // //   created_at: string
// // // // // }

// // // // // interface Statistics {
// // // // //   total_users: number
// // // // //   active_users: number
// // // // //   inactive_users: number
// // // // //   by_role: {
// // // // //     employee: number
// // // // //     finance_area: number
// // // // //     finance_regional: number
// // // // //     hr: number
// // // // //   }
// // // // // }

// // // // // const Dashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user: currentUser, logout } = useAuth()
// // // // //   const [statistics, setStatistics] = useState<Statistics | null>(null)
// // // // //   const [users, setUsers] = useState<User[]>([])
// // // // //   const [loading, setLoading] = useState(true)
// // // // //   const [searchQuery, setSearchQuery] = useState('')
// // // // //   const [filterRole, setFilterRole] = useState('all')
// // // // //   const [filterStatus, setFilterStatus] = useState('all')

// // // // //   useEffect(() => {
// // // // //     fetchData()
// // // // //   }, [filterRole, filterStatus])

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       setLoading(true)
// // // // //       const [statsRes, usersRes] = await Promise.all([
// // // // //         userAPI.getStatistics(),
// // // // //         userAPI.getAll({ 
// // // // //           role: filterRole !== 'all' ? filterRole : undefined,
// // // // //           is_active: filterStatus !== 'all' ? (filterStatus === 'active' ? 1 : 0) : undefined
// // // // //         })
// // // // //       ])

// // // // //       setStatistics(statsRes.data.statistics)
// // // // //       setUsers(usersRes.data.users.data || usersRes.data.users)
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch data:', error)
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const handleLogout = async () => {
// // // // //     try {
// // // // //       await authAPI.logout()
// // // // //       logout()
// // // // //       navigate('/login')
// // // // //     } catch (error) {
// // // // //       console.error('Logout error:', error)
// // // // //       logout()
// // // // //       navigate('/login')
// // // // //     }
// // // // //   }

// // // // //   const handleDelete = async (userId: number, userName: string) => {
// // // // //     if (!window.confirm(`Are you sure you want to deactivate user: ${userName}?`)) return

// // // // //     try {
// // // // //       await userAPI.delete(userId)
// // // // //       fetchData()
// // // // //     } catch (error) {
// // // // //       console.error('Failed to delete user:', error)
// // // // //       alert('Failed to delete user')
// // // // //     }
// // // // //   }

// // // // //   const handleActivate = async (userId: number, userName: string) => {
// // // // //     if (!window.confirm(`Reactivate user: ${userName}?`)) return

// // // // //     try {
// // // // //       await userAPI.activate(userId)
// // // // //       fetchData()
// // // // //     } catch (error) {
// // // // //       console.error('Failed to activate user:', error)
// // // // //       alert('Failed to activate user')
// // // // //     }
// // // // //   }

// // // // //   const filteredUsers = users.filter(user => 
// // // // //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //     user.nik.toLowerCase().includes(searchQuery.toLowerCase())
// // // // //   )

// // // // //   const getRoleBadge = (role: string) => {
// // // // //     const badges: Record<string, { color: string; label: string }> = {
// // // // //       employee: { color: 'bg-blue-100 text-blue-800', label: 'Employee' },
// // // // //       finance_area: { color: 'bg-purple-100 text-purple-800', label: 'Finance Area' },
// // // // //       finance_regional: { color: 'bg-orange-100 text-orange-800', label: 'Finance Regional' },
// // // // //       hr: { color: 'bg-green-100 text-green-800', label: 'HR' }
// // // // //     }
// // // // //     const badge = badges[role] || { color: 'bg-gray-100 text-gray-800', label: role }
// // // // //     return <Badge className={badge.color}>{badge.label}</Badge>
// // // // //   }

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex items-center justify-center min-h-screen">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       {/* Header */}
// // // // //       <header className="bg-white shadow-sm border-b sticky top-0 z-10">
// // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // // //           <div className="flex justify-between items-center">
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
// // // // //               <p className="text-sm text-gray-600 mt-1">User Account Management</p>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-4">
// // // // //               <div className="text-right">
// // // // //                 <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
// // // // //                 <p className="text-xs text-gray-500 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
// // // // //               </div>
// // // // //               <Button 
// // // // //                 onClick={handleLogout} 
// // // // //                 variant="outline" 
// // // // //                 size="sm"
// // // // //                 className="gap-2"
// // // // //               >
// // // // //                 <LogOut className="h-4 w-4" />
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // //         {/* Statistics Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
// // // // //               <Users className="h-4 w-4 text-gray-400" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{statistics?.total_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
// // // // //               <UserCheck className="h-4 w-4 text-green-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{statistics?.active_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
// // // // //               <UserX className="h-4 w-4 text-red-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-red-600">{statistics?.inactive_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Employees</CardTitle>
// // // // //               <Users className="h-4 w-4 text-blue-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{statistics?.by_role.employee || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* User Management Section */}
// // // // //         <Card>
// // // // //           <CardHeader>
// // // // //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //               <div>
// // // // //                 <CardTitle>User Management</CardTitle>
// // // // //                 <p className="text-sm text-gray-600 mt-1">Manage all user accounts</p>
// // // // //               </div>
// // // // //               <Button 
// // // // //                 onClick={() => navigate('/hr/users/new')}
// // // // //                 className="gap-2 bg-red-600 hover:bg-red-700"
// // // // //               >
// // // // //                 <Plus className="h-4 w-4" />
// // // // //                 Create New User
// // // // //               </Button>
// // // // //             </div>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {/* Filters */}
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// // // // //               <div className="relative">
// // // // //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // //                 <Input
// // // // //                   placeholder="Search by name, email, or NIK..."
// // // // //                   value={searchQuery}
// // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // //                   className="pl-10"
// // // // //                 />
// // // // //               </div>

// // // // //               <select
// // // // //                 value={filterRole}
// // // // //                 onChange={(e) => setFilterRole(e.target.value)}
// // // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm"
// // // // //               >
// // // // //                 <option value="all">All Roles</option>
// // // // //                 <option value="employee">Employee</option>
// // // // //                 <option value="finance_area">Finance Area</option>
// // // // //                 <option value="finance_regional">Finance Regional</option>
// // // // //                 <option value="hr">HR</option>
// // // // //               </select>

// // // // //               <select
// // // // //                 value={filterStatus}
// // // // //                 onChange={(e) => setFilterStatus(e.target.value)}
// // // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm"
// // // // //               >
// // // // //                 <option value="all">All Status</option>
// // // // //                 <option value="active">Active</option>
// // // // //                 <option value="inactive">Inactive</option>
// // // // //               </select>
// // // // //             </div>

// // // // //             {/* Users Table */}
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="w-full">
// // // // //                 <thead className="bg-gray-50 border-b">
// // // // //                   <tr>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// // // // //                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody className="divide-y divide-gray-200">
// // // // //                   {filteredUsers.length === 0 ? (
// // // // //                     <tr>
// // // // //                       <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
// // // // //                         No users found
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ) : (
// // // // //                     filteredUsers.map((user) => (
// // // // //                       <tr key={user.user_id} className="hover:bg-gray-50">
// // // // //                         <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.nik}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
// // // // //                         <td className="px-4 py-3 text-sm">{getRoleBadge(user.role)}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.department || '-'}</td>
// // // // //                         <td className="px-4 py-3 text-sm">
// // // // //                           {user.is_active ? (
// // // // //                             <Badge className="bg-green-100 text-green-800 gap-1">
// // // // //                               <CheckCircle className="h-3 w-3" />
// // // // //                               Active
// // // // //                             </Badge>
// // // // //                           ) : (
// // // // //                             <Badge className="bg-red-100 text-red-800 gap-1">
// // // // //                               <XCircle className="h-3 w-3" />
// // // // //                               Inactive
// // // // //                             </Badge>
// // // // //                           )}
// // // // //                         </td>
// // // // //                         <td className="px-4 py-3 text-sm text-right">
// // // // //                           <div className="flex justify-end gap-2">
// // // // //                             <Button
// // // // //                               onClick={() => navigate(`/hr/users/${user.user_id}`)}
// // // // //                               variant="ghost"
// // // // //                               size="sm"
// // // // //                               className="h-8 w-8 p-0"
// // // // //                             >
// // // // //                               <Edit className="h-4 w-4" />
// // // // //                             </Button>
// // // // //                             {user.is_active ? (
// // // // //                               <Button
// // // // //                                 onClick={() => handleDelete(user.user_id, user.name)}
// // // // //                                 variant="ghost"
// // // // //                                 size="sm"
// // // // //                                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// // // // //                                 disabled={user.user_id === currentUser?.user_id}
// // // // //                               >
// // // // //                                 <Trash2 className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             ) : (
// // // // //                               <Button
// // // // //                                 onClick={() => handleActivate(user.user_id, user.name)}
// // // // //                                 variant="ghost"
// // // // //                                 size="sm"
// // // // //                                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
// // // // //                               >
// // // // //                                 <CheckCircle className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))
// // // // //                   )}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default Dashboard




// // // // // import { useState, useEffect } from 'react'
// // // // // import { useNavigate } from 'react-router-dom'
// // // // // import { userAPI, authAPI } from '@/services/api'
// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Input } from '@/components/ui/input'
// // // // // import { Badge } from '@/components/ui/badge'
// // // // // import { 
// // // // //   Users, 
// // // // //   UserCheck, 
// // // // //   UserX, 
// // // // //   LogOut, 
// // // // //   Search,
// // // // //   Plus,
// // // // //   Edit,
// // // // //   Trash2,
// // // // //   CheckCircle,
// // // // //   XCircle,
// // // // //   Eye
// // // // // } from 'lucide-react'
// // // // // import { useAuth } from '@/contexts/AuthContext'

// // // // // interface User {
// // // // //   user_id: number
// // // // //   nik: string
// // // // //   name: string
// // // // //   email: string
// // // // //   role: string
// // // // //   department: string
// // // // //   position: string
// // // // //   is_active: number
// // // // //   created_at: string
// // // // // }

// // // // // interface Statistics {
// // // // //   total_users: number
// // // // //   active_users: number
// // // // //   inactive_users: number
// // // // //   by_role: {
// // // // //     employee: number
// // // // //     finance_area: number
// // // // //     finance_regional: number
// // // // //     hr: number
// // // // //   }
// // // // // }

// // // // // const Dashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user: currentUser, logout } = useAuth()
// // // // //   const [statistics, setStatistics] = useState<Statistics | null>(null)
// // // // //   const [users, setUsers] = useState<User[]>([])
// // // // //   const [loading, setLoading] = useState(true)
// // // // //   const [searchQuery, setSearchQuery] = useState('')
// // // // //   const [filterRole, setFilterRole] = useState('all')
// // // // //   const [filterStatus, setFilterStatus] = useState('all')

// // // // //   useEffect(() => {
// // // // //     fetchData()
// // // // //   }, [filterRole, filterStatus])

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       setLoading(true)
// // // // //       const [statsRes, usersRes] = await Promise.all([
// // // // //         userAPI.getStatistics(),
// // // // //         userAPI.getAll({ 
// // // // //           role: filterRole !== 'all' ? filterRole : undefined,
// // // // //           is_active: filterStatus !== 'all' ? (filterStatus === 'active' ? 1 : 0) : undefined
// // // // //         })
// // // // //       ])

// // // // //       setStatistics(statsRes.data.statistics)
// // // // //       setUsers(usersRes.data.users.data || usersRes.data.users)
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch data:', error)
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const handleLogout = async () => {
// // // // //     try {
// // // // //       await authAPI.logout()
// // // // //       logout()
// // // // //       navigate('/login')
// // // // //     } catch (error) {
// // // // //       console.error('Logout error:', error)
// // // // //       logout()
// // // // //       navigate('/login')
// // // // //     }
// // // // //   }

// // // // //   const handleDelete = async (userId: number, userName: string) => {
// // // // //     if (!window.confirm(`Are you sure you want to deactivate user: ${userName}?`)) return

// // // // //     try {
// // // // //       await userAPI.delete(userId)
// // // // //       fetchData()
// // // // //     } catch (error) {
// // // // //       console.error('Failed to delete user:', error)
// // // // //       alert('Failed to delete user')
// // // // //     }
// // // // //   }

// // // // //   const handleActivate = async (userId: number, userName: string) => {
// // // // //     if (!window.confirm(`Reactivate user: ${userName}?`)) return

// // // // //     try {
// // // // //       await userAPI.activate(userId)
// // // // //       fetchData()
// // // // //     } catch (error) {
// // // // //       console.error('Failed to activate user:', error)
// // // // //       alert('Failed to activate user')
// // // // //     }
// // // // //   }

// // // // //   const filteredUsers = users.filter(user => 
// // // // //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //     user.nik.toLowerCase().includes(searchQuery.toLowerCase())
// // // // //   )

// // // // //   const getRoleBadge = (role: string) => {
// // // // //     const badges: Record<string, { color: string; label: string }> = {
// // // // //       employee: { color: 'bg-blue-100 text-blue-800', label: 'Employee' },
// // // // //       finance_area: { color: 'bg-purple-100 text-purple-800', label: 'Finance Area' },
// // // // //       finance_regional: { color: 'bg-orange-100 text-orange-800', label: 'Finance Regional' },
// // // // //       hr: { color: 'bg-green-100 text-green-800', label: 'HR' }
// // // // //     }
// // // // //     const badge = badges[role] || { color: 'bg-gray-100 text-gray-800', label: role }
// // // // //     return <Badge className={badge.color}>{badge.label}</Badge>
// // // // //   }

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex items-center justify-center min-h-screen">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       {/* Header */}
// // // // //       <header className="bg-white shadow-sm border-b sticky top-0 z-10">
// // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // // //           <div className="flex justify-between items-center">
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold text-gray-900">HR Management</h1>
// // // // //               <p className="text-sm text-gray-600 mt-1">User Account Management</p>
// // // // //             </div>
// // // // //             <div className="flex items-center gap-4">
// // // // //               <div className="text-right">
// // // // //                 <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
// // // // //                 <p className="text-xs text-gray-500 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
// // // // //               </div>
// // // // //               <Button 
// // // // //                 onClick={handleLogout} 
// // // // //                 variant="outline" 
// // // // //                 size="sm"
// // // // //                 className="gap-2"
// // // // //               >
// // // // //                 <LogOut className="h-4 w-4" />
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // //         {/* Statistics Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
// // // // //               <Users className="h-4 w-4 text-gray-400" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{statistics?.total_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
// // // // //               <UserCheck className="h-4 w-4 text-green-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{statistics?.active_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
// // // // //               <UserX className="h-4 w-4 text-red-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-red-600">{statistics?.inactive_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Employees</CardTitle>
// // // // //               <Users className="h-4 w-4 text-blue-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{statistics?.by_role.employee || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* User Management Section */}
// // // // //         <Card>
// // // // //           <CardHeader>
// // // // //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //               <div>
// // // // //                 <CardTitle>User Management</CardTitle>
// // // // //                 <p className="text-sm text-gray-600 mt-1">Manage all user accounts</p>
// // // // //               </div>
// // // // //               <Button 
// // // // //                 onClick={() => navigate('/hr/users/create')}  // ✅ FIX: Ganti dari '/hr/users/new'
// // // // //                 className="gap-2 bg-red-600 hover:bg-red-700"
// // // // //               >
// // // // //                 <Plus className="h-4 w-4" />
// // // // //                 Create New User
// // // // //               </Button>
// // // // //             </div>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {/* Filters */}
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// // // // //               <div className="relative">
// // // // //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // //                 <Input
// // // // //                   placeholder="Search by name, email, or NIK..."
// // // // //                   value={searchQuery}
// // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // //                   className="pl-10"
// // // // //                 />
// // // // //               </div>

// // // // //               <select
// // // // //                 value={filterRole}
// // // // //                 onChange={(e) => setFilterRole(e.target.value)}
// // // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // // // //               >
// // // // //                 <option value="all">All Roles</option>
// // // // //                 <option value="employee">Employee</option>
// // // // //                 <option value="finance_area">Finance Area</option>
// // // // //                 <option value="finance_regional">Finance Regional</option>
// // // // //                 <option value="hr">HR</option>
// // // // //               </select>

// // // // //               <select
// // // // //                 value={filterStatus}
// // // // //                 onChange={(e) => setFilterStatus(e.target.value)}
// // // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // // // //               >
// // // // //                 <option value="all">All Status</option>
// // // // //                 <option value="active">Active</option>
// // // // //                 <option value="inactive">Inactive</option>
// // // // //               </select>
// // // // //             </div>

// // // // //             {/* Users Table */}
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="w-full">
// // // // //                 <thead className="bg-gray-50 border-b">
// // // // //                   <tr>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// // // // //                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody className="divide-y divide-gray-200">
// // // // //                   {filteredUsers.length === 0 ? (
// // // // //                     <tr>
// // // // //                       <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
// // // // //                         No users found
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ) : (
// // // // //                     filteredUsers.map((user) => (
// // // // //                       <tr key={user.user_id} className="hover:bg-gray-50">
// // // // //                         <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.nik}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
// // // // //                         <td className="px-4 py-3 text-sm">{getRoleBadge(user.role)}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.department || '-'}</td>
// // // // //                         <td className="px-4 py-3 text-sm">
// // // // //                           {user.is_active ? (
// // // // //                             <Badge className="bg-green-100 text-green-800 gap-1">
// // // // //                               <CheckCircle className="h-3 w-3" />
// // // // //                               Active
// // // // //                             </Badge>
// // // // //                           ) : (
// // // // //                             <Badge className="bg-red-100 text-red-800 gap-1">
// // // // //                               <XCircle className="h-3 w-3" />
// // // // //                               Inactive
// // // // //                             </Badge>
// // // // //                           )}
// // // // //                         </td>
// // // // //                         <td className="px-4 py-3 text-sm text-right">
// // // // //                           <div className="flex justify-end gap-2">
// // // // //                             {/* ✅ FIX: Button View untuk melihat detail */}
// // // // //                             <Button
// // // // //                               onClick={() => navigate(`/hr/users/${user.user_id}`)}
// // // // //                               variant="ghost"
// // // // //                               size="sm"
// // // // //                               className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
// // // // //                               title="View Details"
// // // // //                             >
// // // // //                               <Eye className="h-4 w-4" />
// // // // //                             </Button>
                            
// // // // //                             {/* ✅ FIX: Button Edit untuk edit user */}
// // // // //                             <Button
// // // // //                               onClick={() => navigate(`/hr/users/edit/${user.user_id}`)}
// // // // //                               variant="ghost"
// // // // //                               size="sm"
// // // // //                               className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700"
// // // // //                               title="Edit User"
// // // // //                             >
// // // // //                               <Edit className="h-4 w-4" />
// // // // //                             </Button>
                            
// // // // //                             {user.is_active ? (
// // // // //                               <Button
// // // // //                                 onClick={() => handleDelete(user.user_id, user.name)}
// // // // //                                 variant="ghost"
// // // // //                                 size="sm"
// // // // //                                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// // // // //                                 disabled={user.user_id === currentUser?.user_id}
// // // // //                                 title="Deactivate User"
// // // // //                               >
// // // // //                                 <Trash2 className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             ) : (
// // // // //                               <Button
// // // // //                                 onClick={() => handleActivate(user.user_id, user.name)}
// // // // //                                 variant="ghost"
// // // // //                                 size="sm"
// // // // //                                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
// // // // //                                 title="Activate User"
// // // // //                               >
// // // // //                                 <CheckCircle className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))
// // // // //                   )}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default Dashboard



// // // // // import { useState, useEffect } from 'react'
// // // // // import { useNavigate } from 'react-router-dom'
// // // // // import { userAPI, authAPI } from '@/services/api'
// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Input } from '@/components/ui/input'
// // // // // import { Badge } from '@/components/ui/badge'
// // // // // import { 
// // // // //   Users, 
// // // // //   UserCheck, 
// // // // //   UserX, 
// // // // //   LogOut, 
// // // // //   Search,
// // // // //   Plus,
// // // // //   Edit,
// // // // //   Trash2,
// // // // //   CheckCircle,
// // // // //   XCircle,
// // // // //   Eye
// // // // // } from 'lucide-react'
// // // // // import { useAuth } from '@/contexts/AuthContext'

// // // // // interface User {
// // // // //   user_id: number
// // // // //   nik: string
// // // // //   name: string
// // // // //   email: string
// // // // //   role: string
// // // // //   department: string
// // // // //   position: string
// // // // //   is_active: number
// // // // //   created_at: string
// // // // // }

// // // // // interface Statistics {
// // // // //   total_users: number
// // // // //   active_users: number
// // // // //   inactive_users: number
// // // // //   by_role: {
// // // // //     employee: number
// // // // //     finance_area: number
// // // // //     finance_regional: number
// // // // //     hr: number
// // // // //   }
// // // // // }

// // // // // const Dashboard = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { user: currentUser, logout } = useAuth()
// // // // //   const [statistics, setStatistics] = useState<Statistics | null>(null)
// // // // //   const [users, setUsers] = useState<User[]>([])
// // // // //   const [loading, setLoading] = useState(true)
// // // // //   const [searchQuery, setSearchQuery] = useState('')
// // // // //   const [filterRole, setFilterRole] = useState('all')
// // // // //   const [filterStatus, setFilterStatus] = useState('all')

// // // // //   useEffect(() => {
// // // // //     fetchData()
// // // // //   }, [filterRole, filterStatus])

// // // // //   const fetchData = async () => {
// // // // //     try {
// // // // //       setLoading(true)
// // // // //       const [statsRes, usersRes] = await Promise.all([
// // // // //         userAPI.getStatistics(),
// // // // //         userAPI.getAll({ 
// // // // //           role: filterRole !== 'all' ? filterRole : undefined,
// // // // //           is_active: filterStatus !== 'all' ? (filterStatus === 'active' ? 1 : 0) : undefined
// // // // //         })
// // // // //       ])

// // // // //       setStatistics(statsRes.data.statistics)
// // // // //       setUsers(usersRes.data.users.data || usersRes.data.users)
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch data:', error)
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const handleLogout = async () => {
// // // // //     try {
// // // // //       await authAPI.logout()
// // // // //       logout()
// // // // //       navigate('/login')
// // // // //     } catch (error) {
// // // // //       console.error('Logout error:', error)
// // // // //       logout()
// // // // //       navigate('/login')
// // // // //     }
// // // // //   }

// // // // //   const handleDelete = async (userId: number, userName: string) => {
// // // // //     if (!window.confirm(`Are you sure you want to deactivate user: ${userName}?`)) return

// // // // //     try {
// // // // //       await userAPI.delete(userId)
// // // // //       fetchData()
// // // // //     } catch (error) {
// // // // //       console.error('Failed to delete user:', error)
// // // // //       alert('Failed to delete user')
// // // // //     }
// // // // //   }

// // // // //   const handleActivate = async (userId: number, userName: string) => {
// // // // //     if (!window.confirm(`Reactivate user: ${userName}?`)) return

// // // // //     try {
// // // // //       await userAPI.activate(userId)
// // // // //       fetchData()
// // // // //     } catch (error) {
// // // // //       console.error('Failed to activate user:', error)
// // // // //       alert('Failed to activate user')
// // // // //     }
// // // // //   }

// // // // //   const filteredUsers = users.filter(user => 
// // // // //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // // //     user.nik.toLowerCase().includes(searchQuery.toLowerCase())
// // // // //   )

// // // // //   const getRoleBadge = (role: string) => {
// // // // //     const badges: Record<string, { color: string; label: string }> = {
// // // // //       employee: { color: 'bg-blue-100 text-blue-800', label: 'Employee' },
// // // // //       finance_area: { color: 'bg-purple-100 text-purple-800', label: 'Finance Area' },
// // // // //       finance_regional: { color: 'bg-orange-100 text-orange-800', label: 'Finance Regional' },
// // // // //       hr: { color: 'bg-green-100 text-green-800', label: 'HR' }
// // // // //     }
// // // // //     const badge = badges[role] || { color: 'bg-gray-100 text-gray-800', label: role }
// // // // //     return <Badge className={badge.color}>{badge.label}</Badge>
// // // // //   }

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="flex items-center justify-center min-h-screen">
// // // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       {/* ✅ UPDATED HEADER - RED NAVBAR WITH TELKOM LOGO */}
// // // // //       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
// // // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // // //           <div className="flex justify-between items-center">
// // // // //             {/* Left: Logo + Title */}
// // // // //             <div className="flex items-center gap-4">
// // // // //               <img 
// // // // //                 src="/logo-telkom-akses.png" 
// // // // //                 alt="Telkom Akses" 
// // // // //                 className="h-12 w-auto"
// // // // //                 onError={(e) => { 
// // // // //                   e.currentTarget.src = '/placeholder.svg'
// // // // //                 }}
// // // // //               />
// // // // //               <div>
// // // // //                 <h1 className="text-2xl font-bold text-white tracking-tight">HR Management</h1>
// // // // //                 <p className="text-sm text-white/90 font-medium mt-1">User Account Management</p>
// // // // //               </div>
// // // // //             </div>
            
// // // // //             {/* Right: User Info + Logout */}
// // // // //             <div className="flex items-center gap-4">
// // // // //               <div className="text-right">
// // // // //                 <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
// // // // //                 <p className="text-xs text-white/70 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
// // // // //               </div>
// // // // //               <Button 
// // // // //                 onClick={handleLogout} 
// // // // //                 variant="secondary"
// // // // //                 size="sm"
// // // // //                 className="gap-2 bg-white text-red-600 hover:bg-red-50"
// // // // //               >
// // // // //                 <LogOut className="h-4 w-4" />
// // // // //                 Logout
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // //         {/* Statistics Cards */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
// // // // //               <Users className="h-4 w-4 text-gray-400" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold">{statistics?.total_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
// // // // //               <UserCheck className="h-4 w-4 text-green-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-green-600">{statistics?.active_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
// // // // //               <UserX className="h-4 w-4 text-red-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-red-600">{statistics?.inactive_users || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>

// // // // //           <Card>
// // // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // // //               <CardTitle className="text-sm font-medium text-gray-600">Employees</CardTitle>
// // // // //               <Users className="h-4 w-4 text-blue-600" />
// // // // //             </CardHeader>
// // // // //             <CardContent>
// // // // //               <div className="text-2xl font-bold text-blue-600">{statistics?.by_role.employee || 0}</div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </div>

// // // // //         {/* User Management Section */}
// // // // //         <Card>
// // // // //           <CardHeader>
// // // // //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // // //               <div>
// // // // //                 <CardTitle>User Management</CardTitle>
// // // // //                 <p className="text-sm text-gray-600 mt-1">Manage all user accounts</p>
// // // // //               </div>
// // // // //               <Button 
// // // // //                 onClick={() => navigate('/hr/users/create')}
// // // // //                 className="gap-2 bg-red-600 hover:bg-red-700"
// // // // //               >
// // // // //                 <Plus className="h-4 w-4" />
// // // // //                 Create New User
// // // // //               </Button>
// // // // //             </div>
// // // // //           </CardHeader>
// // // // //           <CardContent>
// // // // //             {/* Filters */}
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// // // // //               <div className="relative">
// // // // //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // // //                 <Input
// // // // //                   placeholder="Search by name, email, or NIK..."
// // // // //                   value={searchQuery}
// // // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // // //                   className="pl-10"
// // // // //                 />
// // // // //               </div>

// // // // //               <select
// // // // //                 value={filterRole}
// // // // //                 onChange={(e) => setFilterRole(e.target.value)}
// // // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // // // //               >
// // // // //                 <option value="all">All Roles</option>
// // // // //                 <option value="employee">Employee</option>
// // // // //                 <option value="finance_area">Finance Area</option>
// // // // //                 <option value="finance_regional">Finance Regional</option>
// // // // //                 <option value="hr">HR</option>
// // // // //               </select>

// // // // //               <select
// // // // //                 value={filterStatus}
// // // // //                 onChange={(e) => setFilterStatus(e.target.value)}
// // // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // // // //               >
// // // // //                 <option value="all">All Status</option>
// // // // //                 <option value="active">Active</option>
// // // // //                 <option value="inactive">Inactive</option>
// // // // //               </select>
// // // // //             </div>

// // // // //             {/* Users Table */}
// // // // //             <div className="overflow-x-auto">
// // // // //               <table className="w-full">
// // // // //                 <thead className="bg-gray-50 border-b">
// // // // //                   <tr>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
// // // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// // // // //                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
// // // // //                   </tr>
// // // // //                 </thead>
// // // // //                 <tbody className="divide-y divide-gray-200">
// // // // //                   {filteredUsers.length === 0 ? (
// // // // //                     <tr>
// // // // //                       <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
// // // // //                         No users found
// // // // //                       </td>
// // // // //                     </tr>
// // // // //                   ) : (
// // // // //                     filteredUsers.map((user) => (
// // // // //                       <tr key={user.user_id} className="hover:bg-gray-50">
// // // // //                         <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.nik}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
// // // // //                         <td className="px-4 py-3 text-sm">{getRoleBadge(user.role)}</td>
// // // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.department || '-'}</td>
// // // // //                         <td className="px-4 py-3 text-sm">
// // // // //                           {user.is_active ? (
// // // // //                             <Badge className="bg-green-100 text-green-800 gap-1">
// // // // //                               <CheckCircle className="h-3 w-3" />
// // // // //                               Active
// // // // //                             </Badge>
// // // // //                           ) : (
// // // // //                             <Badge className="bg-red-100 text-red-800 gap-1">
// // // // //                               <XCircle className="h-3 w-3" />
// // // // //                               Inactive
// // // // //                             </Badge>
// // // // //                           )}
// // // // //                         </td>
// // // // //                         <td className="px-4 py-3 text-sm text-right">
// // // // //                           <div className="flex justify-end gap-2">
// // // // //                             <Button
// // // // //                               onClick={() => navigate(`/hr/users/${user.user_id}`)}
// // // // //                               variant="ghost"
// // // // //                               size="sm"
// // // // //                               className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
// // // // //                               title="View Details"
// // // // //                             >
// // // // //                               <Eye className="h-4 w-4" />
// // // // //                             </Button>
                            
// // // // //                             <Button
// // // // //                               onClick={() => navigate(`/hr/users/edit/${user.user_id}`)}
// // // // //                               variant="ghost"
// // // // //                               size="sm"
// // // // //                               className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700"
// // // // //                               title="Edit User"
// // // // //                             >
// // // // //                               <Edit className="h-4 w-4" />
// // // // //                             </Button>
                            
// // // // //                             {user.is_active ? (
// // // // //                               <Button
// // // // //                                 onClick={() => handleDelete(user.user_id, user.name)}
// // // // //                                 variant="ghost"
// // // // //                                 size="sm"
// // // // //                                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// // // // //                                 disabled={user.user_id === currentUser?.user_id}
// // // // //                                 title="Deactivate User"
// // // // //                               >
// // // // //                                 <Trash2 className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             ) : (
// // // // //                               <Button
// // // // //                                 onClick={() => handleActivate(user.user_id, user.name)}
// // // // //                                 variant="ghost"
// // // // //                                 size="sm"
// // // // //                                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
// // // // //                                 title="Activate User"
// // // // //                               >
// // // // //                                 <CheckCircle className="h-4 w-4" />
// // // // //                               </Button>
// // // // //                             )}
// // // // //                           </div>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))
// // // // //                   )}
// // // // //                 </tbody>
// // // // //               </table>
// // // // //             </div>
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default Dashboard






// // // // import { useState, useEffect } from 'react'
// // // // import { useNavigate } from 'react-router-dom'
// // // // import { userAPI, authAPI } from '@/services/api'
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // import { Button } from '@/components/ui/button'
// // // // import { Input } from '@/components/ui/input'
// // // // import { Badge } from '@/components/ui/badge'
// // // // import { 
// // // //   Users, 
// // // //   UserCheck, 
// // // //   UserX, 
// // // //   LogOut, 
// // // //   Search,
// // // //   Plus,
// // // //   Edit,
// // // //   Trash2,
// // // //   CheckCircle,
// // // //   XCircle,
// // // //   Eye,
// // // //   Settings
// // // // } from 'lucide-react'
// // // // import { useAuth } from '@/contexts/AuthContext'
// // // // import { Link } from 'react-router-dom' // ✅ TAMBAH INI

// // // // interface User {
// // // //   user_id: number
// // // //   nik: string
// // // //   name: string
// // // //   email: string
// // // //   role: string
// // // //   department: string
// // // //   position: string
// // // //   is_active: number
// // // //   created_at: string
// // // // }

// // // // interface Statistics {
// // // //   total_users: number
// // // //   active_users: number
// // // //   inactive_users: number
// // // //   by_role: {
// // // //     employee: number
// // // //     finance_area: number
// // // //     finance_regional: number
// // // //     hr: number
// // // //   }
// // // // }

// // // // const Dashboard = () => {
// // // //   const navigate = useNavigate()
// // // //   const { user: currentUser, logout } = useAuth()
// // // //   const [statistics, setStatistics] = useState<Statistics | null>(null)
// // // //   const [users, setUsers] = useState<User[]>([])
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [searchQuery, setSearchQuery] = useState('')
// // // //   const [filterRole, setFilterRole] = useState('all')
// // // //   const [filterStatus, setFilterStatus] = useState('all')

// // // //   useEffect(() => {
// // // //     fetchData()
// // // //   }, [filterRole, filterStatus])

// // // //   const fetchData = async () => {
// // // //     try {
// // // //       setLoading(true)
// // // //       const [statsRes, usersRes] = await Promise.all([
// // // //         userAPI.getStatistics(),
// // // //         userAPI.getAll({ 
// // // //           role: filterRole !== 'all' ? filterRole : undefined,
// // // //           is_active: filterStatus !== 'all' ? (filterStatus === 'active' ? 1 : 0) : undefined
// // // //         })
// // // //       ])

// // // //       setStatistics(statsRes.data.statistics)
// // // //       setUsers(usersRes.data.users.data || usersRes.data.users)
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch data:', error)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const handleLogout = async () => {
// // // //     try {
// // // //       await authAPI.logout()
// // // //       logout()
// // // //       navigate('/login')
// // // //     } catch (error) {
// // // //       console.error('Logout error:', error)
// // // //       logout()
// // // //       navigate('/login')
// // // //     }
// // // //   }

// // // //   const handleDelete = async (userId: number, userName: string) => {
// // // //     if (!window.confirm(`Are you sure you want to deactivate user: ${userName}?`)) return

// // // //     try {
// // // //       await userAPI.delete(userId)
// // // //       fetchData()
// // // //     } catch (error) {
// // // //       console.error('Failed to delete user:', error)
// // // //       alert('Failed to delete user')
// // // //     }
// // // //   }

// // // //   const handleActivate = async (userId: number, userName: string) => {
// // // //     if (!window.confirm(`Reactivate user: ${userName}?`)) return

// // // //     try {
// // // //       await userAPI.activate(userId)
// // // //       fetchData()
// // // //     } catch (error) {
// // // //       console.error('Failed to activate user:', error)
// // // //       alert('Failed to activate user')
// // // //     }
// // // //   }

// // // //   const filteredUsers = users.filter(user => 
// // // //     user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //     user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
// // // //     user.nik.toLowerCase().includes(searchQuery.toLowerCase())
// // // //   )

// // // //   const getRoleBadge = (role: string) => {
// // // //     const badges: Record<string, { color: string; label: string }> = {
// // // //       employee: { color: 'bg-blue-100 text-blue-800', label: 'Employee' },
// // // //       finance_area: { color: 'bg-purple-100 text-purple-800', label: 'Finance Area' },
// // // //       finance_regional: { color: 'bg-orange-100 text-orange-800', label: 'Finance Regional' },
// // // //       hr: { color: 'bg-green-100 text-green-800', label: 'HR' }
// // // //     }
// // // //     const badge = badges[role] || { color: 'bg-gray-100 text-gray-800', label: role }
// // // //     return <Badge className={badge.color}>{badge.label}</Badge>
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* ✅ UPDATED HEADER - RED NAVBAR WITH TELKOM LOGO */}
// // // //       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
// // // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // //           <div className="flex justify-between items-center">
// // // //             {/* Left: Logo + Title */}
// // // //             <div className="flex items-center gap-4">
// // // //               <img 
// // // //                 src="/logo-telkom-akses.png" 
// // // //                 alt="Telkom Akses" 
// // // //                 className="h-12 w-auto"
// // // //                 onError={(e) => { 
// // // //                   e.currentTarget.src = '/placeholder.svg'
// // // //                 }}
// // // //               />
// // // //               <div>
// // // //                 <h1 className="text-2xl font-bold text-white tracking-tight">HR Management</h1>
// // // //                 <p className="text-sm text-white/90 font-medium mt-1">User Account Management</p>
// // // //               </div>
// // // //             </div>
            
// // // //             {/* Right: User Info + Logout */}
// // // //             <div className="flex items-center gap-4">
// // // //               <div className="text-right">
// // // //                 <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
// // // //                 <p className="text-xs text-white/70 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
// // // //               </div>
// // // //               <Button 
// // // //                 onClick={handleLogout} 
// // // //                 variant="secondary"
// // // //                 size="sm"
// // // //                 className="gap-2 bg-white text-red-600 hover:bg-red-50"
// // // //               >
// // // //                 <LogOut className="h-4 w-4" />
// // // //                 Logout
// // // //               </Button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         {/* Statistics Cards */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
// // // //           <Card>
// // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // //               <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
// // // //               <Users className="h-4 w-4 text-gray-400" />
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold">{statistics?.total_users || 0}</div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card>
// // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // //               <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
// // // //               <UserCheck className="h-4 w-4 text-green-600" />
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-green-600">{statistics?.active_users || 0}</div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card>
// // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // //               <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
// // // //               <UserX className="h-4 w-4 text-red-600" />
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-red-600">{statistics?.inactive_users || 0}</div>
// // // //             </CardContent>
// // // //           </Card>

// // // //           <Card>
// // // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // // //               <CardTitle className="text-sm font-medium text-gray-600">Employees</CardTitle>
// // // //               <Users className="h-4 w-4 text-blue-600" />
// // // //             </CardHeader>
// // // //             <CardContent>
// // // //               <div className="text-2xl font-bold text-blue-600">{statistics?.by_role.employee || 0}</div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </div>

// // // //         {/* User Management Section */}
// // // //         <Card>
// // // //           <CardHeader>
// // // //             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// // // //               <div>
// // // //                 <CardTitle>User Management</CardTitle>
// // // //                 <p className="text-sm text-gray-600 mt-1">Manage all user accounts</p>
// // // //               </div>
// // // //               <Button 
// // // //                 onClick={() => navigate('/hr/users/create')}
// // // //                 className="gap-2 bg-red-600 hover:bg-red-700"
// // // //               >
// // // //                 <Plus className="h-4 w-4" />
// // // //                 Create New User
// // // //               </Button>
// // // //             </div>
// // // //           </CardHeader>
// // // //           <CardContent>
// // // //             {/* Filters */}
// // // //             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
// // // //               <div className="relative">
// // // //                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
// // // //                 <Input
// // // //                   placeholder="Search by name, email, or NIK..."
// // // //                   value={searchQuery}
// // // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // // //                   className="pl-10"
// // // //                 />
// // // //               </div>

// // // //               <select
// // // //                 value={filterRole}
// // // //                 onChange={(e) => setFilterRole(e.target.value)}
// // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // // //               >
// // // //                 <option value="all">All Roles</option>
// // // //                 <option value="employee">Employee</option>
// // // //                 <option value="finance_area">Finance Area</option>
// // // //                 <option value="finance_regional">Finance Regional</option>
// // // //                 <option value="hr">HR</option>
// // // //               </select>

// // // //               <select
// // // //                 value={filterStatus}
// // // //                 onChange={(e) => setFilterStatus(e.target.value)}
// // // //                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // // //               >
// // // //                 <option value="all">All Status</option>
// // // //                 <option value="active">Active</option>
// // // //                 <option value="inactive">Inactive</option>
// // // //               </select>
// // // //             </div>

// // // //             {/* Users Table */}
// // // //             <div className="overflow-x-auto">
// // // //               <table className="w-full">
// // // //                 <thead className="bg-gray-50 border-b">
// // // //                   <tr>
// // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIK</th>
// // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
// // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
// // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
// // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
// // // //                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
// // // //                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
// // // //                   </tr>
// // // //                 </thead>
// // // //                 <tbody className="divide-y divide-gray-200">
// // // //                   {filteredUsers.length === 0 ? (
// // // //                     <tr>
// // // //                       <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
// // // //                         No users found
// // // //                       </td>
// // // //                     </tr>
// // // //                   ) : (
// // // //                     filteredUsers.map((user) => (
// // // //                       <tr key={user.user_id} className="hover:bg-gray-50">
// // // //                         <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.nik}</td>
// // // //                         <td className="px-4 py-3 text-sm text-gray-900">{user.name}</td>
// // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
// // // //                         <td className="px-4 py-3 text-sm">{getRoleBadge(user.role)}</td>
// // // //                         <td className="px-4 py-3 text-sm text-gray-600">{user.department || '-'}</td>
// // // //                         <td className="px-4 py-3 text-sm">
// // // //                           {user.is_active ? (
// // // //                             <Badge className="bg-green-100 text-green-800 gap-1">
// // // //                               <CheckCircle className="h-3 w-3" />
// // // //                               Active
// // // //                             </Badge>
// // // //                           ) : (
// // // //                             <Badge className="bg-red-100 text-red-800 gap-1">
// // // //                               <XCircle className="h-3 w-3" />
// // // //                               Inactive
// // // //                             </Badge>
// // // //                           )}
// // // //                         </td>
// // // //                         <td className="px-4 py-3 text-sm text-right">
// // // //                           <div className="flex justify-end gap-2">
// // // //                             <Button
// // // //                               onClick={() => navigate(`/hr/users/${user.user_id}`)}
// // // //                               variant="ghost"
// // // //                               size="sm"
// // // //                               className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700"
// // // //                               title="View Details"
// // // //                             >
// // // //                               <Eye className="h-4 w-4" />
// // // //                             </Button>
                            
// // // //                             <Button
// // // //                               onClick={() => navigate(`/hr/users/edit/${user.user_id}`)}
// // // //                               variant="ghost"
// // // //                               size="sm"
// // // //                               className="h-8 w-8 p-0 text-gray-600 hover:text-gray-700"
// // // //                               title="Edit User"
// // // //                             >
// // // //                               <Edit className="h-4 w-4" />
// // // //                             </Button>
                            
// // // //                             {user.is_active ? (
// // // //                               <Button
// // // //                                 onClick={() => handleDelete(user.user_id, user.name)}
// // // //                                 variant="ghost"
// // // //                                 size="sm"
// // // //                                 className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
// // // //                                 disabled={user.user_id === currentUser?.user_id}
// // // //                                 title="Deactivate User"
// // // //                               >
// // // //                                 <Trash2 className="h-4 w-4" />
// // // //                               </Button>
// // // //                             ) : (
// // // //                               <Button
// // // //                                 onClick={() => handleActivate(user.user_id, user.name)}
// // // //                                 variant="ghost"
// // // //                                 size="sm"
// // // //                                 className="h-8 w-8 p-0 text-green-600 hover:text-green-700"
// // // //                                 title="Activate User"
// // // //                               >
// // // //                                 <CheckCircle className="h-4 w-4" />
// // // //                               </Button>
// // // //                             )}
// // // //                           </div>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))
// // // //                   )}
// // // //                 </tbody>
// // // //               </table>
// // // //             </div>
// // // //           </CardContent>
// // // //         </Card>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default Dashboard




// // // import { useState, useEffect } from 'react'
// // // import { useNavigate, Link } from 'react-router-dom'
// // // import { userAPI, authAPI } from '@/services/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Input } from '@/components/ui/input'
// // // import { Badge } from '@/components/ui/badge'
// // // import { 
// // //   Users, 
// // //   UserCheck, 
// // //   UserX, 
// // //   LogOut, 
// // //   Search,
// // //   Plus,
// // //   Edit,
// // //   Trash2,
// // //   CheckCircle,
// // //   XCircle,
// // //   Eye,
// // //   Settings
// // // } from 'lucide-react'
// // // import { useAuth } from '@/contexts/AuthContext'

// // // interface User {
// // //   id: number
// // //   nik: string
// // //   name: string
// // //   email: string
// // //   role: string
// // //   department: string
// // //   position: string
// // //   phone: string
// // //   is_active: boolean
// // //   created_at: string
// // // }

// // // interface Stats {
// // //   total_users: number
// // //   active_users: number
// // //   inactive_users: number
// // // }

// // // const Dashboard = () => {
// // //   const navigate = useNavigate()
// // //   const { user: currentUser, logout } = useAuth()
  
// // //   const [users, setUsers] = useState<User[]>([])
// // //   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
// // //   const [stats, setStats] = useState<Stats>({
// // //     total_users: 0,
// // //     active_users: 0,
// // //     inactive_users: 0
// // //   })
// // //   const [searchQuery, setSearchQuery] = useState('')
// // //   const [loading, setLoading] = useState(true)
// // //   const [selectedUser, setSelectedUser] = useState<User | null>(null)
// // //   const [showViewModal, setShowViewModal] = useState(false)

// // //   useEffect(() => {
// // //     fetchUsers()
// // //   }, [])

// // //   useEffect(() => {
// // //     if (searchQuery.trim() === '') {
// // //       setFilteredUsers(users)
// // //     } else {
// // //       const query = searchQuery.toLowerCase()
// // //       const filtered = users.filter(user => 
// // //         user.name.toLowerCase().includes(query) ||
// // //         user.email.toLowerCase().includes(query) ||
// // //         user.nik.toLowerCase().includes(query) ||
// // //         user.department.toLowerCase().includes(query) ||
// // //         user.position.toLowerCase().includes(query)
// // //       )
// // //       setFilteredUsers(filtered)
// // //     }
// // //   }, [searchQuery, users])

// // //   const fetchUsers = async () => {
// // //     try {
// // //       setLoading(true)
// // //       // ✅ FIXED: Ganti getAllUsers() jadi getAll()
// // //       const response = await userAPI.getAll()
      
// // //       if (response.data.success) {
// // //         const usersData = response.data.users || []
// // //         setUsers(usersData)
// // //         setFilteredUsers(usersData)
        
// // //         const active = usersData.filter((u: User) => u.is_active).length
// // //         setStats({
// // //           total_users: usersData.length,
// // //           active_users: active,
// // //           inactive_users: usersData.length - active
// // //         })
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Failed to fetch users:', error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleLogout = async () => {
// // //     try {
// // //       await authAPI.logout()
// // //       logout()
// // //       navigate('/login')
// // //     } catch (error) {
// // //       console.error('Logout failed:', error)
// // //       logout()
// // //       navigate('/login')
// // //     }
// // //   }

// // //   const handleDeleteUser = async (userId: number) => {
// // //     if (!window.confirm('Are you sure you want to delete this user?')) {
// // //       return
// // //     }

// // //     try {
// // //       const response = await userAPI.delete(userId)
// // //       if (response.data.success) {
// // //         alert('User deleted successfully')
// // //         fetchUsers()
// // //       }
// // //     } catch (error: any) {
// // //       alert(error.response?.data?.message || 'Failed to delete user')
// // //     }
// // //   }

// // //   const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
// // //     const action = currentStatus ? 'deactivate' : 'activate'
// // //     if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
// // //       return
// // //     }

// // //     try {
// // //       // ✅ FIXED: Gunakan activate() method yang ada di api.ts
// // //       const response = await userAPI.activate(userId)
// // //       if (response.data.success) {
// // //         alert(`User ${action}d successfully`)
// // //         fetchUsers()
// // //       }
// // //     } catch (error: any) {
// // //       alert(error.response?.data?.message || `Failed to ${action} user`)
// // //     }
// // //   }

// // //   const handleViewUser = (user: User) => {
// // //     setSelectedUser(user)
// // //     setShowViewModal(true)
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* ============================================ */}
// // //       {/* HEADER WITH SETTINGS BUTTON */}
// // //       {/* ============================================ */}
// // //       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // //           <div className="flex justify-between items-center">
// // //             {/* Left: Logo + Title */}
// // //             <div className="flex items-center gap-4">
// // //               <img 
// // //                 src="/logo-telkom-akses.png" 
// // //                 alt="Telkom Akses" 
// // //                 className="h-12 w-auto"
// // //                 onError={(e) => { 
// // //                   e.currentTarget.src = '/placeholder.svg'
// // //                 }}
// // //               />
// // //               <div>
// // //                 <h1 className="text-2xl font-bold text-white tracking-tight">HR Management</h1>
// // //                 <p className="text-sm text-white/90 font-medium mt-1">User Account Management</p>
// // //               </div>
// // //             </div>
            
// // //             {/* Right: Settings + User Info + Logout */}
// // //             <div className="flex items-center gap-4">
// // //               {/* ✅ SETTINGS BUTTON - NAVIGATES TO /hr/profile */}
// // //               <Link to="/hr/profile">
// // //                 <Button 
// // //                   variant="ghost" 
// // //                   size="icon" 
// // //                   className="text-white hover:bg-white/20" 
// // //                   title="Profile Settings"
// // //                 >
// // //                   <Settings className="w-5 h-5" />
// // //                 </Button>
// // //               </Link>

// // //               <div className="text-right">
// // //                 <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
// // //                 <p className="text-xs text-white/70 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
// // //               </div>
// // //               <Button 
// // //                 onClick={handleLogout} 
// // //                 variant="secondary"
// // //                 size="sm"
// // //                 className="gap-2 bg-white text-red-600 hover:bg-red-50"
// // //               >
// // //                 <LogOut className="h-4 w-4" />
// // //                 Logout
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* Main Content */}
// // //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         {/* Stats Cards */}
// // //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// // //           <Card>
// // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // //               <CardTitle className="text-sm font-medium text-gray-600">
// // //                 Total Users
// // //               </CardTitle>
// // //               <Users className="h-5 w-5 text-gray-500" />
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-3xl font-bold">{stats.total_users}</div>
// // //             </CardContent>
// // //           </Card>

// // //           <Card>
// // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // //               <CardTitle className="text-sm font-medium text-gray-600">
// // //                 Active Users
// // //               </CardTitle>
// // //               <UserCheck className="h-5 w-5 text-green-600" />
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-3xl font-bold text-green-600">{stats.active_users}</div>
// // //             </CardContent>
// // //           </Card>

// // //           <Card>
// // //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// // //               <CardTitle className="text-sm font-medium text-gray-600">
// // //                 Inactive Users
// // //               </CardTitle>
// // //               <UserX className="h-5 w-5 text-red-600" />
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="text-3xl font-bold text-red-600">{stats.inactive_users}</div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>

// // //         {/* User Management Section */}
// // //         <Card>
// // //           <CardHeader>
// // //             <div className="flex justify-between items-center">
// // //               <div>
// // //                 <CardTitle>User Management</CardTitle>
// // //                 <p className="text-sm text-gray-500 mt-1">Manage all system users</p>
// // //               </div>
// // //               <Button 
// // //                 onClick={() => navigate('/hr/users/create')}
// // //                 className="gap-2 bg-red-600 hover:bg-red-700"
// // //               >
// // //                 <Plus className="h-4 w-4" />
// // //                 Create New User
// // //               </Button>
// // //             </div>
// // //           </CardHeader>
// // //           <CardContent>
// // //             {/* Search Bar */}
// // //             <div className="mb-6">
// // //               <div className="relative">
// // //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// // //                 <Input
// // //                   type="text"
// // //                   placeholder="Search by name, email, NIK, department, or position..."
// // //                   value={searchQuery}
// // //                   onChange={(e) => setSearchQuery(e.target.value)}
// // //                   className="pl-10"
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* Users Table */}
// // //             {loading ? (
// // //               <div className="text-center py-8">
// // //                 <p className="text-gray-500">Loading users...</p>
// // //               </div>
// // //             ) : filteredUsers.length === 0 ? (
// // //               <div className="text-center py-8">
// // //                 <p className="text-gray-500">
// // //                   {searchQuery ? 'No users found matching your search' : 'No users available'}
// // //                 </p>
// // //               </div>
// // //             ) : (
// // //               <div className="overflow-x-auto">
// // //                 <table className="w-full">
// // //                   <thead>
// // //                     <tr className="border-b">
// // //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">NIK</th>
// // //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
// // //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Email</th>
// // //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Role</th>
// // //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Department</th>
// // //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
// // //                       <th className="text-center py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody>
// // //                     {filteredUsers.map((user) => (
// // //                       <tr key={user.id} className="border-b hover:bg-gray-50">
// // //                         <td className="py-3 px-4 text-sm">{user.nik}</td>
// // //                         <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
// // //                         <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
// // //                         <td className="py-3 px-4 text-sm">
// // //                           <Badge variant="outline">{user.role}</Badge>
// // //                         </td>
// // //                         <td className="py-3 px-4 text-sm">{user.department}</td>
// // //                         <td className="py-3 px-4">
// // //                           {user.is_active ? (
// // //                             <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
// // //                               <CheckCircle className="h-3 w-3 mr-1" />
// // //                               Active
// // //                             </Badge>
// // //                           ) : (
// // //                             <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
// // //                               <XCircle className="h-3 w-3 mr-1" />
// // //                               Inactive
// // //                             </Badge>
// // //                           )}
// // //                         </td>
// // //                         <td className="py-3 px-4">
// // //                           <div className="flex justify-center gap-2">
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => handleViewUser(user)}
// // //                               title="View Details"
// // //                             >
// // //                               <Eye className="h-4 w-4" />
// // //                             </Button>
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => navigate(`/hr/users/edit/${user.id}`)}
// // //                               title="Edit User"
// // //                             >
// // //                               <Edit className="h-4 w-4" />
// // //                             </Button>
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => handleToggleStatus(user.id, user.is_active)}
// // //                               title={user.is_active ? 'Deactivate' : 'Activate'}
// // //                             >
// // //                               {user.is_active ? (
// // //                                 <XCircle className="h-4 w-4 text-red-600" />
// // //                               ) : (
// // //                                 <CheckCircle className="h-4 w-4 text-green-600" />
// // //                               )}
// // //                             </Button>
// // //                             <Button
// // //                               size="sm"
// // //                               variant="ghost"
// // //                               onClick={() => handleDeleteUser(user.id)}
// // //                               title="Delete User"
// // //                             >
// // //                               <Trash2 className="h-4 w-4 text-red-600" />
// // //                             </Button>
// // //                           </div>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>
// // //             )}
// // //           </CardContent>
// // //         </Card>
// // //       </main>

// // //       {/* View User Modal */}
// // //       {showViewModal && selectedUser && (
// // //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// // //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// // //             <CardHeader>
// // //               <div className="flex justify-between items-start">
// // //                 <div>
// // //                   <CardTitle>User Details</CardTitle>
// // //                   <p className="text-sm text-gray-500 mt-1">Complete user information</p>
// // //                 </div>
// // //                 <Button
// // //                   variant="ghost"
// // //                   size="sm"
// // //                   onClick={() => setShowViewModal(false)}
// // //                 >
// // //                   ✕
// // //                 </Button>
// // //               </div>
// // //             </CardHeader>
// // //             <CardContent>
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">NIK</p>
// // //                   <p className="text-base">{selectedUser.nik}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Name</p>
// // //                   <p className="text-base">{selectedUser.name}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Email</p>
// // //                   <p className="text-base">{selectedUser.email}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Phone</p>
// // //                   <p className="text-base">{selectedUser.phone || 'N/A'}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Role</p>
// // //                   <p className="text-base">{selectedUser.role}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Department</p>
// // //                   <p className="text-base">{selectedUser.department}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Position</p>
// // //                   <p className="text-base">{selectedUser.position}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-sm font-semibold text-gray-600">Status</p>
// // //                   {selectedUser.is_active ? (
// // //                     <Badge className="bg-green-100 text-green-700">Active</Badge>
// // //                   ) : (
// // //                     <Badge className="bg-red-100 text-red-700">Inactive</Badge>
// // //                   )}
// // //                 </div>
// // //                 <div className="col-span-2">
// // //                   <p className="text-sm font-semibold text-gray-600">Created At</p>
// // //                   <p className="text-base">{new Date(selectedUser.created_at).toLocaleString()}</p>
// // //                 </div>
// // //               </div>
// // //               <div className="mt-6 flex justify-end gap-2">
// // //                 <Button
// // //                   variant="outline"
// // //                   onClick={() => setShowViewModal(false)}
// // //                 >
// // //                   Close
// // //                 </Button>
// // //                 <Button
// // //                   onClick={() => {
// // //                     setShowViewModal(false)
// // //                     navigate(`/hr/users/edit/${selectedUser.id}`)
// // //                   }}
// // //                   className="bg-red-600 hover:bg-red-700"
// // //                 >
// // //                   <Edit className="h-4 w-4 mr-2" />
// // //                   Edit User
// // //                 </Button>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // export default Dashboard





// // import { useState, useEffect } from 'react'
// // import { useNavigate, Link } from 'react-router-dom'
// // import { userAPI, authAPI } from '@/services/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Badge } from '@/components/ui/badge'
// // import { 
// //   Users, 
// //   UserCheck, 
// //   UserX, 
// //   LogOut, 
// //   Search,
// //   Plus,
// //   Edit,
// //   Trash2,
// //   CheckCircle,
// //   XCircle,
// //   Eye,
// //   Settings
// // } from 'lucide-react'
// // import { useAuth } from '@/contexts/AuthContext'

// // // ✅ FIX: Interface menggunakan user_id, bukan id
// // interface User {
// //   user_id: number
// //   nik: string
// //   name: string
// //   email: string
// //   role: string
// //   department: string
// //   position: string
// //   phone: string
// //   is_active: boolean
// //   created_at: string
// // }

// // interface Stats {
// //   total_users: number
// //   active_users: number
// //   inactive_users: number
// // }

// // const Dashboard = () => {
// //   const navigate = useNavigate()
// //   const { user: currentUser, logout } = useAuth()
  
// //   const [users, setUsers] = useState<User[]>([])
// //   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
// //   const [stats, setStats] = useState<Stats>({
// //     total_users: 0,
// //     active_users: 0,
// //     inactive_users: 0
// //   })
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [loading, setLoading] = useState(true)
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null)
// //   const [showViewModal, setShowViewModal] = useState(false)

// //   useEffect(() => {
// //     fetchUsers()
// //   }, [])

// //   useEffect(() => {
// //     if (searchQuery.trim() === '') {
// //       setFilteredUsers(users)
// //     } else {
// //       const query = searchQuery.toLowerCase()
// //       const filtered = users.filter(user => 
// //         user.name.toLowerCase().includes(query) ||
// //         user.email.toLowerCase().includes(query) ||
// //         user.nik.toLowerCase().includes(query) ||
// //         user.department.toLowerCase().includes(query) ||
// //         user.position.toLowerCase().includes(query)
// //       )
// //       setFilteredUsers(filtered)
// //     }
// //   }, [searchQuery, users])

// //   const fetchUsers = async () => {
// //     try {
// //       setLoading(true)
// //       const response = await userAPI.getAll()
      
// //       if (response.data.success) {
// //         const usersData = response.data.users || []
// //         setUsers(usersData)
// //         setFilteredUsers(usersData)
        
// //         const active = usersData.filter((u: User) => u.is_active).length
// //         setStats({
// //           total_users: usersData.length,
// //           active_users: active,
// //           inactive_users: usersData.length - active
// //         })
// //       }
// //     } catch (error: any) {
// //       console.error('Failed to fetch users:', error)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const handleLogout = async () => {
// //     try {
// //       await authAPI.logout()
// //       logout()
// //       navigate('/login')
// //     } catch (error) {
// //       console.error('Logout failed:', error)
// //       logout()
// //       navigate('/login')
// //     }
// //   }

// //   const handleDeleteUser = async (userId: number) => {
// //     if (!window.confirm('Are you sure you want to delete this user?')) {
// //       return
// //     }

// //     try {
// //       const response = await userAPI.delete(userId)
// //       if (response.data.success) {
// //         alert('User deleted successfully')
// //         fetchUsers()
// //       }
// //     } catch (error: any) {
// //       alert(error.response?.data?.message || 'Failed to delete user')
// //     }
// //   }

// //   const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
// //     const action = currentStatus ? 'deactivate' : 'activate'
// //     if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
// //       return
// //     }

// //     try {
// //       const response = await userAPI.activate(userId)
// //       if (response.data.success) {
// //         alert(`User ${action}d successfully`)
// //         fetchUsers()
// //       }
// //     } catch (error: any) {
// //       alert(error.response?.data?.message || `Failed to ${action} user`)
// //     }
// //   }

// //   const handleViewUser = (user: User) => {
// //     setSelectedUser(user)
// //     setShowViewModal(true)
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* ============================================ */}
// //       {/* HEADER WITH SETTINGS BUTTON */}
// //       {/* ============================================ */}
// //       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex justify-between items-center">
// //             {/* Left: Logo + Title */}
// //             <div className="flex items-center gap-4">
// //               <img 
// //                 src="/logo-telkom-akses.png" 
// //                 alt="Telkom Akses" 
// //                 className="h-12 w-auto"
// //                 onError={(e) => { 
// //                   e.currentTarget.src = '/placeholder.svg'
// //                 }}
// //               />
// //               <div>
// //                 <h1 className="text-2xl font-bold text-white tracking-tight">HR Management</h1>
// //                 <p className="text-sm text-white/90 font-medium mt-1">User Account Management</p>
// //               </div>
// //             </div>
            
// //             {/* Right: Settings + User Info + Logout */}
// //             <div className="flex items-center gap-4">
// //               {/* ✅ SETTINGS BUTTON - NAVIGATES TO /hr/profile */}
// //               <Link to="/hr/profile">
// //                 <Button 
// //                   variant="ghost" 
// //                   size="icon" 
// //                   className="text-white hover:bg-white/20" 
// //                   title="Profile Settings"
// //                 >
// //                   <Settings className="w-5 h-5" />
// //                 </Button>
// //               </Link>

// //               <div className="text-right">
// //                 <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
// //                 <p className="text-xs text-white/70 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
// //               </div>
// //               <Button 
// //                 onClick={handleLogout} 
// //                 variant="secondary"
// //                 size="sm"
// //                 className="gap-2 bg-white text-red-600 hover:bg-red-50"
// //               >
// //                 <LogOut className="h-4 w-4" />
// //                 Logout
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       {/* Main Content */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Stats Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <CardTitle className="text-sm font-medium text-gray-600">
// //                 Total Users
// //               </CardTitle>
// //               <Users className="h-5 w-5 text-gray-500" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-3xl font-bold">{stats.total_users}</div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <CardTitle className="text-sm font-medium text-gray-600">
// //                 Active Users
// //               </CardTitle>
// //               <UserCheck className="h-5 w-5 text-green-600" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-3xl font-bold text-green-600">{stats.active_users}</div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <CardTitle className="text-sm font-medium text-gray-600">
// //                 Inactive Users
// //               </CardTitle>
// //               <UserX className="h-5 w-5 text-red-600" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-3xl font-bold text-red-600">{stats.inactive_users}</div>
// //             </CardContent>
// //           </Card>
// //         </div>

// //         {/* User Management Section */}
// //         <Card>
// //           <CardHeader>
// //             <div className="flex justify-between items-center">
// //               <div>
// //                 <CardTitle>User Management</CardTitle>
// //                 <p className="text-sm text-gray-500 mt-1">Manage all system users</p>
// //               </div>
// //               <Button 
// //                 onClick={() => navigate('/hr/users/create')}
// //                 className="gap-2 bg-red-600 hover:bg-red-700"
// //               >
// //                 <Plus className="h-4 w-4" />
// //                 Create New User
// //               </Button>
// //             </div>
// //           </CardHeader>
// //           <CardContent>
// //             {/* Search Bar */}
// //             <div className="mb-6">
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// //                 <Input
// //                   type="text"
// //                   placeholder="Search by name, email, NIK, department, or position..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="pl-10"
// //                 />
// //               </div>
// //             </div>

// //             {/* Users Table */}
// //             {loading ? (
// //               <div className="text-center py-8">
// //                 <p className="text-gray-500">Loading users...</p>
// //               </div>
// //             ) : filteredUsers.length === 0 ? (
// //               <div className="text-center py-8">
// //                 <p className="text-gray-500">
// //                   {searchQuery ? 'No users found matching your search' : 'No users available'}
// //                 </p>
// //               </div>
// //             ) : (
// //               <div className="overflow-x-auto">
// //                 <table className="w-full">
// //                   <thead>
// //                     <tr className="border-b">
// //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">NIK</th>
// //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
// //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Email</th>
// //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Role</th>
// //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Department</th>
// //                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
// //                       <th className="text-center py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {filteredUsers.map((user) => (
// //                       // ✅ FIX: key menggunakan user.user_id
// //                       <tr key={user.user_id} className="border-b hover:bg-gray-50">
// //                         <td className="py-3 px-4 text-sm">{user.nik}</td>
// //                         <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
// //                         <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
// //                         <td className="py-3 px-4 text-sm">
// //                           <Badge variant="outline">{user.role}</Badge>
// //                         </td>
// //                         <td className="py-3 px-4 text-sm">{user.department}</td>
// //                         <td className="py-3 px-4">
// //                           {user.is_active ? (
// //                             <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
// //                               <CheckCircle className="h-3 w-3 mr-1" />
// //                               Active
// //                             </Badge>
// //                           ) : (
// //                             <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
// //                               <XCircle className="h-3 w-3 mr-1" />
// //                               Inactive
// //                             </Badge>
// //                           )}
// //                         </td>
// //                         <td className="py-3 px-4">
// //                           <div className="flex justify-center gap-2">
// //                             <Button
// //                               size="sm"
// //                               variant="ghost"
// //                               onClick={() => handleViewUser(user)}
// //                               title="View Details"
// //                             >
// //                               <Eye className="h-4 w-4" />
// //                             </Button>
// //                             {/* ✅ FIX: Semua user.id diganti user.user_id */}
// //                             <Button
// //                               size="sm"
// //                               variant="ghost"
// //                               onClick={() => navigate(`/hr/users/edit/${user.user_id}`)}
// //                               title="Edit User"
// //                             >
// //                               <Edit className="h-4 w-4" />
// //                             </Button>
// //                             <Button
// //                               size="sm"
// //                               variant="ghost"
// //                               onClick={() => handleToggleStatus(user.user_id, user.is_active)}
// //                               title={user.is_active ? 'Deactivate' : 'Activate'}
// //                             >
// //                               {user.is_active ? (
// //                                 <XCircle className="h-4 w-4 text-red-600" />
// //                               ) : (
// //                                 <CheckCircle className="h-4 w-4 text-green-600" />
// //                               )}
// //                             </Button>
// //                             <Button
// //                               size="sm"
// //                               variant="ghost"
// //                               onClick={() => handleDeleteUser(user.user_id)}
// //                               title="Delete User"
// //                             >
// //                               <Trash2 className="h-4 w-4 text-red-600" />
// //                             </Button>
// //                           </div>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </main>

// //       {/* View User Modal */}
// //       {showViewModal && selectedUser && (
// //         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
// //           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
// //             <CardHeader>
// //               <div className="flex justify-between items-start">
// //                 <div>
// //                   <CardTitle>User Details</CardTitle>
// //                   <p className="text-sm text-gray-500 mt-1">Complete user information</p>
// //                 </div>
// //                 <Button
// //                   variant="ghost"
// //                   size="sm"
// //                   onClick={() => setShowViewModal(false)}
// //                 >
// //                   ✕
// //                 </Button>
// //               </div>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">NIK</p>
// //                   <p className="text-base">{selectedUser.nik}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Name</p>
// //                   <p className="text-base">{selectedUser.name}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Email</p>
// //                   <p className="text-base">{selectedUser.email}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Phone</p>
// //                   <p className="text-base">{selectedUser.phone || 'N/A'}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Role</p>
// //                   <p className="text-base">{selectedUser.role}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Department</p>
// //                   <p className="text-base">{selectedUser.department}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Position</p>
// //                   <p className="text-base">{selectedUser.position}</p>
// //                 </div>
// //                 <div>
// //                   <p className="text-sm font-semibold text-gray-600">Status</p>
// //                   {selectedUser.is_active ? (
// //                     <Badge className="bg-green-100 text-green-700">Active</Badge>
// //                   ) : (
// //                     <Badge className="bg-red-100 text-red-700">Inactive</Badge>
// //                   )}
// //                 </div>
// //                 <div className="col-span-2">
// //                   <p className="text-sm font-semibold text-gray-600">Created At</p>
// //                   <p className="text-base">{new Date(selectedUser.created_at).toLocaleString()}</p>
// //                 </div>
// //               </div>
// //               <div className="mt-6 flex justify-end gap-2">
// //                 <Button
// //                   variant="outline"
// //                   onClick={() => setShowViewModal(false)}
// //                 >
// //                   Close
// //                 </Button>
// //                 {/* ✅ FIX: selectedUser.id diganti selectedUser.user_id */}
// //                 <Button
// //                   onClick={() => {
// //                     setShowViewModal(false)
// //                     navigate(`/hr/users/edit/${selectedUser.user_id}`)
// //                   }}
// //                   className="bg-red-600 hover:bg-red-700"
// //                 >
// //                   <Edit className="h-4 w-4 mr-2" />
// //                   Edit User
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // export default Dashboard






// import { useState, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { userAPI, authAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Badge } from '@/components/ui/badge'
// import { 
//   Users, 
//   UserCheck, 
//   UserX, 
//   LogOut, 
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   CheckCircle,
//   XCircle,
//   Eye,
//   Settings,
//   Upload
// } from 'lucide-react'
// import { useAuth } from '@/contexts/AuthContext'
// import BulkUpload from './BulkUpload'

// // ✅ FIX: Interface menggunakan user_id, bukan id
// interface User {
//   user_id: number
//   nik: string
//   name: string
//   email: string
//   role: string
//   department: string
//   position: string
//   phone: string
//   is_active: boolean
//   created_at: string
// }

// interface Stats {
//   total_users: number
//   active_users: number
//   inactive_users: number
// }

// const Dashboard = () => {
//   const navigate = useNavigate()
//   const { user: currentUser, logout } = useAuth()
  
//   const [users, setUsers] = useState<User[]>([])
//   const [filteredUsers, setFilteredUsers] = useState<User[]>([])
//   const [stats, setStats] = useState<Stats>({
//     total_users: 0,
//     active_users: 0,
//     inactive_users: 0
//   })
//   const [searchQuery, setSearchQuery] = useState('')
//   const [loading, setLoading] = useState(true)
//   const [selectedUser, setSelectedUser] = useState<User | null>(null)
//   const [showViewModal, setShowViewModal] = useState(false)
//   const [showBulkUpload, setShowBulkUpload] = useState(false)

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     if (searchQuery.trim() === '') {
//       setFilteredUsers(users)
//     } else {
//       const query = searchQuery.toLowerCase()
//       const filtered = users.filter(user => 
//         user.name.toLowerCase().includes(query) ||
//         user.email.toLowerCase().includes(query) ||
//         user.nik.toLowerCase().includes(query) ||
//         user.department.toLowerCase().includes(query) ||
//         user.position.toLowerCase().includes(query)
//       )
//       setFilteredUsers(filtered)
//     }
//   }, [searchQuery, users])

//   const fetchUsers = async () => {
//     try {
//       setLoading(true)
//       const response = await userAPI.getAll()
      
//       if (response.data.success) {
//         const usersData = response.data.users || []
//         setUsers(usersData)
//         setFilteredUsers(usersData)
        
//         const active = usersData.filter((u: User) => u.is_active).length
//         setStats({
//           total_users: usersData.length,
//           active_users: active,
//           inactive_users: usersData.length - active
//         })
//       }
//     } catch (error: any) {
//       console.error('Failed to fetch users:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleLogout = async () => {
//     try {
//       await authAPI.logout()
//       logout()
//       navigate('/login')
//     } catch (error) {
//       console.error('Logout failed:', error)
//       logout()
//       navigate('/login')
//     }
//   }

//   const handleDeleteUser = async (userId: number) => {
//     if (!window.confirm('Are you sure you want to delete this user?')) {
//       return
//     }

//     try {
//       const response = await userAPI.delete(userId)
//       if (response.data.success) {
//         alert('User deleted successfully')
//         fetchUsers()
//       }
//     } catch (error: any) {
//       alert(error.response?.data?.message || 'Failed to delete user')
//     }
//   }

//   const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
//     const action = currentStatus ? 'deactivate' : 'activate'
//     if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
//       return
//     }

//     try {
//       const response = await userAPI.activate(userId)
//       if (response.data.success) {
//         alert(`User ${action}d successfully`)
//         fetchUsers()
//       }
//     } catch (error: any) {
//       alert(error.response?.data?.message || `Failed to ${action} user`)
//     }
//   }

//   const handleViewUser = (user: User) => {
//     setSelectedUser(user)
//     setShowViewModal(true)
//   }

//   const handleBulkUploadSuccess = () => {
//     setShowBulkUpload(false)
//     fetchUsers()
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* ============================================ */}
//       {/* HEADER WITH SETTINGS BUTTON */}
//       {/* ============================================ */}
//       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
//             {/* Left: Logo + Title */}
//             <div className="flex items-center gap-4">
//               <img 
//                 src="/logo-telkom-akses.png" 
//                 alt="Telkom Akses" 
//                 className="h-12 w-auto"
//                 onError={(e) => { 
//                   e.currentTarget.src = '/placeholder.svg'
//                 }}
//               />
//               <div>
//                 <h1 className="text-2xl font-bold text-white tracking-tight">HR Management</h1>
//                 <p className="text-sm text-white/90 font-medium mt-1">User Account Management</p>
//               </div>
//             </div>
            
//             {/* Right: Settings + User Info + Logout */}
//             <div className="flex items-center gap-4">
//               {/* ✅ SETTINGS BUTTON - NAVIGATES TO /hr/profile */}
//               <Link to="/hr/profile">
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="text-white hover:bg-white/20" 
//                   title="Profile Settings"
//                 >
//                   <Settings className="w-5 h-5" />
//                 </Button>
//               </Link>

//               <div className="text-right">
//                 <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
//                 <p className="text-xs text-white/70 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
//               </div>
//               <Button 
//                 onClick={handleLogout} 
//                 variant="secondary"
//                 size="sm"
//                 className="gap-2 bg-white text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="h-4 w-4" />
//                 Logout
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">
//                 Total Users
//               </CardTitle>
//               <Users className="h-5 w-5 text-gray-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{stats.total_users}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">
//                 Active Users
//               </CardTitle>
//               <UserCheck className="h-5 w-5 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-green-600">{stats.active_users}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">
//                 Inactive Users
//               </CardTitle>
//               <UserX className="h-5 w-5 text-red-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-red-600">{stats.inactive_users}</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* User Management Section */}
//         <Card>
//           <CardHeader>
//             <div className="flex justify-between items-center">
//               <div>
//                 <CardTitle>User Management</CardTitle>
//                 <p className="text-sm text-gray-500 mt-1">Manage all system users</p>
//               </div>
//               {/* 🆕 UPDATED: Two buttons side by side */}
//               <div className="flex gap-2">
//                 <Button 
//                   onClick={() => setShowBulkUpload(true)}
//                   variant="outline"
//                   className="gap-2 border-green-600 text-green-600 hover:bg-green-50"
//                 >
//                   <Upload className="h-4 w-4" />
//                   Upload Excel
//                 </Button>
//                 <Button 
//                   onClick={() => navigate('/hr/users/create')}
//                   className="gap-2 bg-red-600 hover:bg-red-700"
//                 >
//                   <Plus className="h-4 w-4" />
//                   Create New User
//                 </Button>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             {/* Search Bar */}
//             <div className="mb-6">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   type="text"
//                   placeholder="Search by name, email, NIK, department, or position..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>

//             {/* Users Table */}
//             {loading ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">Loading users...</p>
//               </div>
//             ) : filteredUsers.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">
//                   {searchQuery ? 'No users found matching your search' : 'No users available'}
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead>
//                     <tr className="border-b">
//                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">NIK</th>
//                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
//                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Email</th>
//                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Role</th>
//                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Department</th>
//                       <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
//                       <th className="text-center py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUsers.map((user) => (
//                       <tr key={user.user_id} className="border-b hover:bg-gray-50">
//                         <td className="py-3 px-4 text-sm">{user.nik}</td>
//                         <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
//                         <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
//                         <td className="py-3 px-4 text-sm">
//                           <Badge variant="outline">{user.role}</Badge>
//                         </td>
//                         <td className="py-3 px-4 text-sm">{user.department}</td>
//                         <td className="py-3 px-4">
//                           {user.is_active ? (
//                             <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
//                               <CheckCircle className="h-3 w-3 mr-1" />
//                               Active
//                             </Badge>
//                           ) : (
//                             <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
//                               <XCircle className="h-3 w-3 mr-1" />
//                               Inactive
//                             </Badge>
//                           )}
//                         </td>
//                         <td className="py-3 px-4">
//                           <div className="flex justify-center gap-2">
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => handleViewUser(user)}
//                               title="View Details"
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => navigate(`/hr/users/edit/${user.user_id}`)}
//                               title="Edit User"
//                             >
//                               <Edit className="h-4 w-4" />
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => handleToggleStatus(user.user_id, user.is_active)}
//                               title={user.is_active ? 'Deactivate' : 'Activate'}
//                             >
//                               {user.is_active ? (
//                                 <XCircle className="h-4 w-4 text-red-600" />
//                               ) : (
//                                 <CheckCircle className="h-4 w-4 text-green-600" />
//                               )}
//                             </Button>
//                             <Button
//                               size="sm"
//                               variant="ghost"
//                               onClick={() => handleDeleteUser(user.user_id)}
//                               title="Delete User"
//                             >
//                               <Trash2 className="h-4 w-4 text-red-600" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </main>

//       {/* View User Modal */}
//       {showViewModal && selectedUser && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
//             <CardHeader>
//               <div className="flex justify-between items-start">
//                 <div>
//                   <CardTitle>User Details</CardTitle>
//                   <p className="text-sm text-gray-500 mt-1">Complete user information</p>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => setShowViewModal(false)}
//                 >
//                   ✕
//                 </Button>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">NIK</p>
//                   <p className="text-base">{selectedUser.nik}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Name</p>
//                   <p className="text-base">{selectedUser.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Email</p>
//                   <p className="text-base">{selectedUser.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Phone</p>
//                   <p className="text-base">{selectedUser.phone || 'N/A'}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Role</p>
//                   <p className="text-base">{selectedUser.role}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Department</p>
//                   <p className="text-base">{selectedUser.department}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Position</p>
//                   <p className="text-base">{selectedUser.position}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-gray-600">Status</p>
//                   {selectedUser.is_active ? (
//                     <Badge className="bg-green-100 text-green-700">Active</Badge>
//                   ) : (
//                     <Badge className="bg-red-100 text-red-700">Inactive</Badge>
//                   )}
//                 </div>
//                 <div className="col-span-2">
//                   <p className="text-sm font-semibold text-gray-600">Created At</p>
//                   <p className="text-base">{new Date(selectedUser.created_at).toLocaleString()}</p>
//                 </div>
//               </div>
//               <div className="mt-6 flex justify-end gap-2">
//                 <Button
//                   variant="outline"
//                   onClick={() => setShowViewModal(false)}
//                 >
//                   Close
//                 </Button>
//                 <Button
//                   onClick={() => {
//                     setShowViewModal(false)
//                     navigate(`/hr/users/edit/${selectedUser.user_id}`)
//                   }}
//                   className="bg-red-600 hover:bg-red-700"
//                 >
//                   <Edit className="h-4 w-4 mr-2" />
//                   Edit User
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}

//       {/* 🆕 Bulk Upload Modal */}
//       <BulkUpload 
//         open={showBulkUpload}
//         onClose={() => setShowBulkUpload(false)}
//         onSuccess={handleBulkUploadSuccess}
//       />
//     </div>
//   )
// }

// export default Dashboard







import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
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
  XCircle,
  Eye,
  Settings,
  Upload,
  User
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import BulkUpload from './BulkUpload'

interface User {
  user_id: number
  nik: string
  name: string
  email: string
  role: string
  department: string
  position: string
  phone: string
  is_active: boolean
  created_at: string
}

interface Stats {
  total_users: number
  active_users: number
  inactive_users: number
}

const Dashboard = () => {
  const navigate = useNavigate()
  const { user: currentUser, logout } = useAuth()
  
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    total_users: 0,
    active_users: 0,
    inactive_users: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all') // 🆕 NEW STATE
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  // ✅ UPDATED FILTER LOGIC - Works with both search & status
  useEffect(() => {
    let filtered = users

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.nik.toLowerCase().includes(query) ||
        user.department.toLowerCase().includes(query) ||
        user.position.toLowerCase().includes(query)
      )
    }

    // Apply status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(user => user.is_active)
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(user => !user.is_active)
    }

    setFilteredUsers(filtered)
  }, [searchQuery, statusFilter, users]) // 🆕 Added statusFilter dependency

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await userAPI.getAll()
      
      if (response.data.success) {
        const usersData = response.data.users || []
        setUsers(usersData)
        setFilteredUsers(usersData)
        
        const active = usersData.filter((u: User) => u.is_active).length
        setStats({
          total_users: usersData.length,
          active_users: active,
          inactive_users: usersData.length - active
        })
      }
    } catch (error: any) {
      console.error('Failed to fetch users:', error)
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
      console.error('Logout failed:', error)
      logout()
      navigate('/login')
    }
  }

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await userAPI.delete(userId)
      if (response.data.success) {
        alert('User deleted successfully')
        fetchUsers()
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete user')
    }
  }

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    const action = currentStatus ? 'deactivate' : 'activate'
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return
    }

    try {
      const response = await userAPI.activate(userId)
      if (response.data.success) {
        alert(`User ${action}d successfully`)
        fetchUsers()
      }
    } catch (error: any) {
      alert(error.response?.data?.message || `Failed to ${action} user`)
    }
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setShowViewModal(true)
  }

  const handleBulkUploadSuccess = () => {
    setShowBulkUpload(false)
    fetchUsers()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img 
                src="/logo-telkom-akses.png" 
                alt="Telkom Akses" 
                className="h-12 w-auto"
                onError={(e) => { 
                  e.currentTarget.src = '/placeholder.svg'
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">HR Management</h1>
                <p className="text-sm text-white/90 font-medium mt-1">User Account Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link to="/hr/profile">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-white/20" 
                  title="Profile Settings"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              <div className="text-right">
                <p className="text-sm font-semibold text-white">{currentUser?.name}</p>
                <p className="text-xs text-white/70 uppercase">{currentUser?.role?.replace('_', ' ')}</p>
              </div>
              <Button 
                onClick={handleLogout} 
                variant="secondary"
                size="sm"
                className="gap-2 bg-white text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total_users}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
              <UserCheck className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.active_users}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
              <UserX className="h-5 w-5 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{stats.inactive_users}</div>
            </CardContent>
          </Card>
        </div>

        {/* User Management Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>User Management</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Manage all system users</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setShowBulkUpload(true)}
                  variant="outline"
                  className="gap-2 border-green-600 text-green-600 hover:bg-green-50"
                >
                  <Upload className="h-4 w-4" />
                  Upload Excel
                </Button>
                <Button 
                  onClick={() => navigate('/hr/users/create')}
                  className="gap-2 bg-red-600 hover:bg-red-700"
                >
                  <Plus className="h-4 w-4" />
                  Create New User
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* 🆕 FILTERS - Search + Status */}
            <div className="mb-6 flex gap-4 items-center">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search by name, email, NIK, department, or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* 🆕 STATUS FILTER DROPDOWN */}
              <div className="w-48">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-sm"
                >
                  <option value="all">All Status ({stats.total_users})</option>
                  <option value="active">Active Only ({stats.active_users})</option>
                  <option value="inactive">Inactive Only ({stats.inactive_users})</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            {loading ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Loading users...</p>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'No users found matching your filters' 
                    : 'No users available'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">NIK</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Department</th>
                      <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
                      <th className="text-center py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.user_id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">{user.nik}</td>
                        <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4 text-sm">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="py-3 px-4 text-sm">{user.department}</td>
                        <td className="py-3 px-4">
                          {user.is_active ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              <XCircle className="h-3 w-3 mr-1" />
                              Inactive
                            </Badge>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleViewUser(user)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => navigate(`/hr/users/edit/${user.user_id}`)}
                              title="Edit User"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggleStatus(user.user_id, user.is_active)}
                              title={user.is_active ? 'Deactivate' : 'Activate'}
                            >
                              {user.is_active ? (
                                <XCircle className="h-4 w-4 text-red-600" />
                              ) : (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteUser(user.user_id)}
                              title="Delete User"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>User Details</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Complete user information</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowViewModal(false)}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">NIK</p>
                  <p className="text-base">{selectedUser.nik}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Name</p>
                  <p className="text-base">{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Email</p>
                  <p className="text-base">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Phone</p>
                  <p className="text-base">{selectedUser.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Role</p>
                  <p className="text-base">{selectedUser.role}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Department</p>
                  <p className="text-base">{selectedUser.department}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Position</p>
                  <p className="text-base">{selectedUser.position}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  {selectedUser.is_active ? (
                    <Badge className="bg-green-100 text-green-700">Active</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700">Inactive</Badge>
                  )}
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-semibold text-gray-600">Created At</p>
                  <p className="text-base">{new Date(selectedUser.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowViewModal(false)
                    navigate(`/hr/users/edit/${selectedUser.user_id}`)
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit User
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bulk Upload Modal */}
      <BulkUpload 
        open={showBulkUpload}
        onClose={() => setShowBulkUpload(false)}
        onSuccess={handleBulkUploadSuccess}
      />
    </div>
  )
}

export default Dashboard