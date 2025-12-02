
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
// //   Settings,
// //   Upload,
// //   User
// // } from 'lucide-react'
// // import { useAuth } from '@/contexts/AuthContext'
// // import BulkUpload from './BulkUpload'

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
// //   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all') // 🆕 NEW STATE
// //   const [loading, setLoading] = useState(true)
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null)
// //   const [showViewModal, setShowViewModal] = useState(false)
// //   const [showBulkUpload, setShowBulkUpload] = useState(false)

// //   useEffect(() => {
// //     fetchUsers()
// //   }, [])

// //   // ✅ UPDATED FILTER LOGIC - Works with both search & status
// //   useEffect(() => {
// //     let filtered = users

// //     // Apply search filter
// //     if (searchQuery.trim() !== '') {
// //       const query = searchQuery.toLowerCase()
// //       filtered = filtered.filter(user => 
// //         user.name.toLowerCase().includes(query) ||
// //         user.email.toLowerCase().includes(query) ||
// //         user.nik.toLowerCase().includes(query) ||
// //         user.department.toLowerCase().includes(query) ||
// //         user.position.toLowerCase().includes(query)
// //       )
// //     }

// //     // Apply status filter
// //     if (statusFilter === 'active') {
// //       filtered = filtered.filter(user => user.is_active)
// //     } else if (statusFilter === 'inactive') {
// //       filtered = filtered.filter(user => !user.is_active)
// //     }

// //     setFilteredUsers(filtered)
// //   }, [searchQuery, statusFilter, users]) // 🆕 Added statusFilter dependency

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

// //   const handleBulkUploadSuccess = () => {
// //     setShowBulkUpload(false)
// //     fetchUsers()
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex justify-between items-center">
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
            
// //             <div className="flex items-center gap-4">
// //               <Link to="/hr/profile">
// //                 <Button 
// //                   variant="ghost" 
// //                   size="icon" 
// //                   className="text-white hover:bg-white/20" 
// //                   title="Profile Settings"
// //                 >
// //                   <User className="w-5 h-5" />
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
// //               <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
// //               <Users className="h-5 w-5 text-gray-500" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-3xl font-bold">{stats.total_users}</div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
// //               <UserCheck className="h-5 w-5 text-green-600" />
// //             </CardHeader>
// //             <CardContent>
// //               <div className="text-3xl font-bold text-green-600">{stats.active_users}</div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader className="flex flex-row items-center justify-between pb-2">
// //               <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
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
// //               <div className="flex gap-2">
// //                 <Button 
// //                   onClick={() => setShowBulkUpload(true)}
// //                   variant="outline"
// //                   className="gap-2 border-green-600 text-green-600 hover:bg-green-50"
// //                 >
// //                   <Upload className="h-4 w-4" />
// //                   Upload Excel
// //                 </Button>
// //                 <Button 
// //                   onClick={() => navigate('/hr/users/create')}
// //                   className="gap-2 bg-red-600 hover:bg-red-700"
// //                 >
// //                   <Plus className="h-4 w-4" />
// //                   Create New User
// //                 </Button>
// //               </div>
// //             </div>
// //           </CardHeader>
// //           <CardContent>
// //             {/* 🆕 FILTERS - Search + Status */}
// //             <div className="mb-6 flex gap-4 items-center">
// //               {/* Search Bar */}
// //               <div className="flex-1 relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
// //                 <Input
// //                   type="text"
// //                   placeholder="Search by name, email, NIK, department, or position..."
// //                   value={searchQuery}
// //                   onChange={(e) => setSearchQuery(e.target.value)}
// //                   className="pl-10"
// //                 />
// //               </div>
              
// //               {/* 🆕 STATUS FILTER DROPDOWN */}
// //               <div className="w-48">
// //                 <select
// //                   value={statusFilter}
// //                   onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
// //                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-sm"
// //                 >
// //                   <option value="all">All Status ({stats.total_users})</option>
// //                   <option value="active">Active Only ({stats.active_users})</option>
// //                   <option value="inactive">Inactive Only ({stats.inactive_users})</option>
// //                 </select>
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
// //                   {searchQuery || statusFilter !== 'all' 
// //                     ? 'No users found matching your filters' 
// //                     : 'No users available'}
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

// //       {/* Bulk Upload Modal */}
// //       <BulkUpload 
// //         open={showBulkUpload}
// //         onClose={() => setShowBulkUpload(false)}
// //         onSuccess={handleBulkUploadSuccess}
// //       />
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
//   Upload,
//   User,
//   Download // ✅ NEW ICON
// } from 'lucide-react'
// import { useAuth } from '@/contexts/AuthContext'
// import BulkUpload from './BulkUpload'
// import * as XLSX from 'xlsx' // ✅ NEW IMPORT

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
//   const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
//   const [loading, setLoading] = useState(true)
//   const [selectedUser, setSelectedUser] = useState<User | null>(null)
//   const [showViewModal, setShowViewModal] = useState(false)
//   const [showBulkUpload, setShowBulkUpload] = useState(false)

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   useEffect(() => {
//     let filtered = users

//     // Apply search filter
//     if (searchQuery.trim() !== '') {
//       const query = searchQuery.toLowerCase()
//       filtered = filtered.filter(user => 
//         user.name.toLowerCase().includes(query) ||
//         user.email.toLowerCase().includes(query) ||
//         user.nik.toLowerCase().includes(query) ||
//         user.department.toLowerCase().includes(query) ||
//         user.position.toLowerCase().includes(query)
//       )
//     }

//     // Apply status filter
//     if (statusFilter === 'active') {
//       filtered = filtered.filter(user => user.is_active)
//     } else if (statusFilter === 'inactive') {
//       filtered = filtered.filter(user => !user.is_active)
//     }

//     setFilteredUsers(filtered)
//   }, [searchQuery, statusFilter, users])

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

//   // ✅ NEW: Export to Excel Function
//   const handleExportToExcel = () => {
//     try {
//       // Prepare data for export
//       const exportData = filteredUsers.map((user) => ({
//         'NIK': user.nik,
//         'Name': user.name,
//         'Email': user.email,
//         'Role': user.role,
//         'Department': user.department || '-',
//         'Position': user.position || '-',
//         'Phone': user.phone || '-',
//         'Status': user.is_active ? 'Active' : 'Inactive',
//         'Created At': new Date(user.created_at).toLocaleDateString('id-ID', {
//           day: '2-digit',
//           month: '2-digit',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         })
//       }))

//       // Create worksheet
//       const ws = XLSX.utils.json_to_sheet(exportData)

//       // Set column widths
//       const colWidths = [
//         { wch: 10 },  // NIK
//         { wch: 25 },  // Name
//         { wch: 30 },  // Email
//         { wch: 15 },  // Role
//         { wch: 20 },  // Department
//         { wch: 20 },  // Position
//         { wch: 15 },  // Phone
//         { wch: 10 },  // Status
//         { wch: 20 }   // Created At
//       ]
//       ws['!cols'] = colWidths

//       // Create workbook
//       const wb = XLSX.utils.book_new()
//       XLSX.utils.book_append_sheet(wb, ws, 'Users')

//       // Generate filename with timestamp
//       const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
//       const filename = `users_export_${timestamp}.xlsx`

//       // Save file
//       XLSX.writeFile(wb, filename)

//       // Show success message
//       alert(`✅ Successfully exported ${filteredUsers.length} users to ${filename}`)
//     } catch (error) {
//       console.error('Export failed:', error)
//       alert('❌ Failed to export data. Please try again.')
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-gradient-to-r from-red-600 to-red-700 border-b border-red-800 shadow-lg sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex justify-between items-center">
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
            
//             <div className="flex items-center gap-4">
//               <Link to="/hr/profile">
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   className="text-white hover:bg-white/20" 
//                   title="Profile Settings"
//                 >
//                   <User className="w-5 h-5" />
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
//               <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
//               <Users className="h-5 w-5 text-gray-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold">{stats.total_users}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
//               <UserCheck className="h-5 w-5 text-green-600" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-3xl font-bold text-green-600">{stats.active_users}</div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between pb-2">
//               <CardTitle className="text-sm font-medium text-gray-600">Inactive Users</CardTitle>
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
//               <div className="flex gap-2">
//                 {/* ✅ NEW: Export to Excel Button */}
//                 <Button 
//                   onClick={handleExportToExcel}
//                   variant="outline"
//                   className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
//                   disabled={filteredUsers.length === 0}
//                 >
//                   <Download className="h-4 w-4" />
//                   Export to Excel
//                 </Button>
                
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
//             {/* Filters - Search + Status */}
//             <div className="mb-6 flex gap-4 items-center">
//               {/* Search Bar */}
//               <div className="flex-1 relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                 <Input
//                   type="text"
//                   placeholder="Search by name, email, NIK, department, or position..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
              
//               {/* Status Filter Dropdown */}
//               <div className="w-48">
//                 <select
//                   value={statusFilter}
//                   onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-sm"
//                 >
//                   <option value="all">All Status ({stats.total_users})</option>
//                   <option value="active">Active Only ({stats.active_users})</option>
//                   <option value="inactive">Inactive Only ({stats.inactive_users})</option>
//                 </select>
//               </div>
//             </div>

//             {/* ✅ NEW: Export Info Banner (when filters active) */}
//             {(searchQuery || statusFilter !== 'all') && filteredUsers.length > 0 && (
//               <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
//                 <div className="flex items-center gap-2 text-sm text-blue-700">
//                   <Download className="h-4 w-4" />
//                   <span>
//                     Export will include <strong>{filteredUsers.length}</strong> filtered user{filteredUsers.length !== 1 ? 's' : ''}
//                     {searchQuery && ` matching "${searchQuery}"`}
//                     {statusFilter !== 'all' && ` (${statusFilter} only)`}
//                   </span>
//                 </div>
//                 <Button
//                   onClick={() => {
//                     setSearchQuery('')
//                     setStatusFilter('all')
//                   }}
//                   variant="ghost"
//                   size="sm"
//                   className="text-blue-600 hover:bg-blue-100 text-xs"
//                 >
//                   Clear Filters
//                 </Button>
//               </div>
//             )}

//             {/* Users Table */}
//             {loading ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">Loading users...</p>
//               </div>
//             ) : filteredUsers.length === 0 ? (
//               <div className="text-center py-8">
//                 <p className="text-gray-500">
//                   {searchQuery || statusFilter !== 'all' 
//                     ? 'No users found matching your filters' 
//                     : 'No users available'}
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

//       {/* Bulk Upload Modal */}
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
import { useToast } from '@/hooks/use-toast' // ✅ NEW
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
  User,
  Download
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import BulkUpload from './BulkUpload'
import * as XLSX from 'xlsx'

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
  const { toast } = useToast() // ✅ NEW
  
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [stats, setStats] = useState<Stats>({
    total_users: 0,
    active_users: 0,
    inactive_users: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [showBulkUpload, setShowBulkUpload] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

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
  }, [searchQuery, statusFilter, users])

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

  // ✅ UPDATED: Delete with Toast
  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return
    }

    try {
      const response = await userAPI.delete(userId)
      if (response.data.success) {
        toast({
          title: 'User Deleted',
          description: 'User has been deleted successfully',
        })
        fetchUsers()
      }
    } catch (error: any) {
      toast({
        title: 'Delete Failed',
        description: error.response?.data?.message || 'Failed to delete user',
        variant: 'destructive',
      })
    }
  }

  // ✅ UPDATED: Toggle Status with Toast
  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    const action = currentStatus ? 'deactivate' : 'activate'
    if (!window.confirm(`Are you sure you want to ${action} this user?`)) {
      return
    }

    try {
      const response = await userAPI.activate(userId)
      if (response.data.success) {
        toast({
          title: `User ${action === 'activate' ? 'Activated' : 'Deactivated'}`,
          description: `User has been ${action}d successfully`,
        })
        fetchUsers()
      }
    } catch (error: any) {
      toast({
        title: 'Action Failed',
        description: error.response?.data?.message || `Failed to ${action} user`,
        variant: 'destructive',
      })
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

  // ✅ UPDATED: Export with Toast
  const handleExportToExcel = () => {
    try {
      // Prepare data for export
      const exportData = filteredUsers.map((user) => ({
        'NIK': user.nik,
        'Name': user.name,
        'Email': user.email,
        'Role': user.role,
        'Department': user.department || '-',
        'Position': user.position || '-',
        'Phone': user.phone || '-',
        'Status': user.is_active ? 'Active' : 'Inactive',
        'Created At': new Date(user.created_at).toLocaleDateString('id-ID', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }))

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(exportData)

      // Set column widths
      const colWidths = [
        { wch: 10 },  // NIK
        { wch: 25 },  // Name
        { wch: 30 },  // Email
        { wch: 15 },  // Role
        { wch: 20 },  // Department
        { wch: 20 },  // Position
        { wch: 15 },  // Phone
        { wch: 10 },  // Status
        { wch: 20 }   // Created At
      ]
      ws['!cols'] = colWidths

      // Create workbook
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Users')

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
      const filename = `users_export_${timestamp}.xlsx`

      // Save file
      XLSX.writeFile(wb, filename)

      // ✅ CHANGED: Use toast instead of alert
      toast({
        title: 'Export Successful! ✅',
        description: `Successfully exported ${filteredUsers.length} user${filteredUsers.length !== 1 ? 's' : ''} to ${filename}`,
      })
    } catch (error) {
      console.error('Export failed:', error)
      
      // ✅ CHANGED: Use toast for error
      toast({
        title: 'Export Failed',
        description: 'Failed to export data. Please try again.',
        variant: 'destructive',
      })
    }
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
                {/* Export to Excel Button */}
                <Button 
                  onClick={handleExportToExcel}
                  variant="outline"
                  className="gap-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                  disabled={filteredUsers.length === 0}
                >
                  <Download className="h-4 w-4" />
                  Export to Excel
                </Button>
                
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
            {/* Filters - Search + Status */}
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
              
              {/* Status Filter Dropdown */}
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

            {/* Export Info Banner (when filters active) */}
            {(searchQuery || statusFilter !== 'all') && filteredUsers.length > 0 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <Download className="h-4 w-4" />
                  <span>
                    Export will include <strong>{filteredUsers.length}</strong> filtered user{filteredUsers.length !== 1 ? 's' : ''}
                    {searchQuery && ` matching "${searchQuery}"`}
                    {statusFilter !== 'all' && ` (${statusFilter} only)`}
                  </span>
                </div>
                <Button
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('all')
                  }}
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:bg-blue-100 text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            )}

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