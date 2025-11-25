// // // // // import { useState, useEffect } from 'react'
// // // // // import { useNavigate, useParams } from 'react-router-dom'
// // // // // import { userAPI } from '@/services/api'
// // // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // // import { Button } from '@/components/ui/button'
// // // // // import { Input } from '@/components/ui/input'
// // // // // import { Label } from '@/components/ui/label'
// // // // // import { ArrowLeft, Save, Loader2 } from 'lucide-react'

// // // // // interface UserFormData {
// // // // //   nik: string
// // // // //   name: string
// // // // //   email: string
// // // // //   password: string
// // // // //   phone: string
// // // // //   role: string
// // // // //   department: string
// // // // //   position: string
// // // // //   office_location: string
// // // // //   area_code: string
// // // // //   bank_account: string
// // // // //   bank_name: string
// // // // // }

// // // // // const UserManagement = () => {
// // // // //   const navigate = useNavigate()
// // // // //   const { id } = useParams()
// // // // //   const isEdit = !!id

// // // // //   const [loading, setLoading] = useState(false)
// // // // //   const [submitting, setSubmitting] = useState(false)
// // // // //   const [formData, setFormData] = useState<UserFormData>({
// // // // //     nik: '',
// // // // //     name: '',
// // // // //     email: '',
// // // // //     password: '',
// // // // //     phone: '',
// // // // //     role: 'employee',
// // // // //     department: '',
// // // // //     position: '',
// // // // //     office_location: '',
// // // // //     area_code: '',
// // // // //     bank_account: '',
// // // // //     bank_name: ''
// // // // //   })

// // // // //   useEffect(() => {
// // // // //     if (isEdit) {
// // // // //       fetchUser()
// // // // //     }
// // // // //   }, [id])

// // // // //   const fetchUser = async () => {
// // // // //     try {
// // // // //       setLoading(true)
// // // // //       const response = await userAPI.getById(Number(id))
// // // // //       const user = response.data.user
// // // // //       setFormData({
// // // // //         nik: user.nik || '',
// // // // //         name: user.name || '',
// // // // //         email: user.email || '',
// // // // //         password: '', // Don't populate password
// // // // //         phone: user.phone || '',
// // // // //         role: user.role || 'employee',
// // // // //         department: user.department || '',
// // // // //         position: user.position || '',
// // // // //         office_location: user.office_location || '',
// // // // //         area_code: user.area_code || '',
// // // // //         bank_account: user.bank_account || '',
// // // // //         bank_name: user.bank_name || ''
// // // // //       })
// // // // //     } catch (error) {
// // // // //       console.error('Failed to fetch user:', error)
// // // // //       alert('Failed to fetch user data')
// // // // //       navigate('/hr/dashboard')
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// // // // //     const { name, value } = e.target
// // // // //     setFormData(prev => ({ ...prev, [name]: value }))
// // // // //   }

// // // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // // //     e.preventDefault()

// // // // //     // Validation
// // // // //     if (!formData.nik || !formData.name || !formData.email || !formData.role) {
// // // // //       alert('Please fill in all required fields (NIK, Name, Email, Role)')
// // // // //       return
// // // // //     }

// // // // //     if (!isEdit && !formData.password) {
// // // // //       alert('Password is required for new users')
// // // // //       return
// // // // //     }

// // // // //     if (formData.password && formData.password.length < 6) {
// // // // //       alert('Password must be at least 6 characters')
// // // // //       return
// // // // //     }

// // // // //     try {
// // // // //       setSubmitting(true)

// // // // //       // Prepare data (remove password if empty for edit)
// // // // //       const submitData = { ...formData }
// // // // //       if (isEdit && !submitData.password) {
// // // // //         delete (submitData as any).password
// // // // //       }

// // // // //       if (isEdit) {
// // // // //         await userAPI.update(Number(id), submitData)
// // // // //         alert('User updated successfully!')
// // // // //       } else {
// // // // //         await userAPI.create(submitData)
// // // // //         alert('User created successfully!')
// // // // //       }

// // // // //       navigate('/hr/dashboard')
// // // // //     } catch (error: any) {
// // // // //       console.error('Failed to save user:', error)
// // // // //       const errorMessage = error.response?.data?.message || error.message || 'Failed to save user'
// // // // //       alert(errorMessage)
// // // // //     } finally {
// // // // //       setSubmitting(false)
// // // // //     }
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
// // // // //       <header className="bg-white shadow-sm border-b">
// // // // //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // // //           <div className="flex items-center gap-4">
// // // // //             <Button
// // // // //               onClick={() => navigate('/hr/dashboard')}
// // // // //               variant="ghost"
// // // // //               size="sm"
// // // // //               className="gap-2"
// // // // //             >
// // // // //               <ArrowLeft className="h-4 w-4" />
// // // // //               Back
// // // // //             </Button>
// // // // //             <div>
// // // // //               <h1 className="text-2xl font-bold text-gray-900">
// // // // //                 {isEdit ? 'Edit User' : 'Create New User'}
// // // // //               </h1>
// // // // //               <p className="text-sm text-gray-600 mt-1">
// // // // //                 {isEdit ? 'Update user account information' : 'Add a new user to the system'}
// // // // //               </p>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // // //         <form onSubmit={handleSubmit}>
// // // // //           <Card>
// // // // //             <CardHeader>
// // // // //               <CardTitle>User Information</CardTitle>
// // // // //             </CardHeader>
// // // // //             <CardContent className="space-y-6">
// // // // //               {/* Basic Information */}
// // // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                 <div className="space-y-2">
// // // // //                   <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
// // // // //                   <Input
// // // // //                     id="nik"
// // // // //                     name="nik"
// // // // //                     value={formData.nik}
// // // // //                     onChange={handleChange}
// // // // //                     placeholder="e.g., EMP001"
// // // // //                     required
// // // // //                     disabled={isEdit}
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
// // // // //                   <Input
// // // // //                     id="name"
// // // // //                     name="name"
// // // // //                     value={formData.name}
// // // // //                     onChange={handleChange}
// // // // //                     placeholder="John Doe"
// // // // //                     required
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
// // // // //                   <Input
// // // // //                     id="email"
// // // // //                     name="email"
// // // // //                     type="email"
// // // // //                     value={formData.email}
// // // // //                     onChange={handleChange}
// // // // //                     placeholder="john@telkomakses.co.id"
// // // // //                     required
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <Label htmlFor="password">
// // // // //                     Password {isEdit ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
// // // // //                   </Label>
// // // // //                   <Input
// // // // //                     id="password"
// // // // //                     name="password"
// // // // //                     type="password"
// // // // //                     value={formData.password}
// // // // //                     onChange={handleChange}
// // // // //                     placeholder="••••••••"
// // // // //                     required={!isEdit}
// // // // //                     minLength={6}
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <Label htmlFor="phone">Phone</Label>
// // // // //                   <Input
// // // // //                     id="phone"
// // // // //                     name="phone"
// // // // //                     value={formData.phone}
// // // // //                     onChange={handleChange}
// // // // //                     placeholder="081234567890"
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="space-y-2">
// // // // //                   <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
// // // // //                   <select
// // // // //                     id="role"
// // // // //                     name="role"
// // // // //                     value={formData.role}
// // // // //                     onChange={handleChange}
// // // // //                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
// // // // //                     required
// // // // //                   >
// // // // //                     <option value="employee">Employee</option>
// // // // //                     <option value="finance_area">Finance Area</option>
// // // // //                     <option value="finance_regional">Finance Regional</option>
// // // // //                     <option value="hr">HR</option>
// // // // //                   </select>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Employment Information */}
// // // // //               <div className="border-t pt-6">
// // // // //                 <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="department">Department</Label>
// // // // //                     <Input
// // // // //                       id="department"
// // // // //                       name="department"
// // // // //                       value={formData.department}
// // // // //                       onChange={handleChange}
// // // // //                       placeholder="IT Department"
// // // // //                     />
// // // // //                   </div>

// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="position">Position</Label>
// // // // //                     <Input
// // // // //                       id="position"
// // // // //                       name="position"
// // // // //                       value={formData.position}
// // // // //                       onChange={handleChange}
// // // // //                       placeholder="Software Engineer"
// // // // //                     />
// // // // //                   </div>

// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="office_location">Office Location</Label>
// // // // //                     <Input
// // // // //                       id="office_location"
// // // // //                       name="office_location"
// // // // //                       value={formData.office_location}
// // // // //                       onChange={handleChange}
// // // // //                       placeholder="Jakarta HQ"
// // // // //                     />
// // // // //                   </div>

// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="area_code">Area Code</Label>
// // // // //                     <Input
// // // // //                       id="area_code"
// // // // //                       name="area_code"
// // // // //                       value={formData.area_code}
// // // // //                       onChange={handleChange}
// // // // //                       placeholder="JKT"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Bank Information */}
// // // // //               <div className="border-t pt-6">
// // // // //                 <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="bank_name">Bank Name</Label>
// // // // //                     <Input
// // // // //                       id="bank_name"
// // // // //                       name="bank_name"
// // // // //                       value={formData.bank_name}
// // // // //                       onChange={handleChange}
// // // // //                       placeholder="Bank Mandiri"
// // // // //                     />
// // // // //                   </div>

// // // // //                   <div className="space-y-2">
// // // // //                     <Label htmlFor="bank_account">Bank Account Number</Label>
// // // // //                     <Input
// // // // //                       id="bank_account"
// // // // //                       name="bank_account"
// // // // //                       value={formData.bank_account}
// // // // //                       onChange={handleChange}
// // // // //                       placeholder="1234567890"
// // // // //                     />
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               {/* Action Buttons */}
// // // // //               <div className="flex justify-end gap-4 pt-6 border-t">
// // // // //                 <Button
// // // // //                   type="button"
// // // // //                   onClick={() => navigate('/hr/dashboard')}
// // // // //                   variant="outline"
// // // // //                   disabled={submitting}
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </Button>
// // // // //                 <Button
// // // // //                   type="submit"
// // // // //                   className="gap-2 bg-red-600 hover:bg-red-700"
// // // // //                   disabled={submitting}
// // // // //                 >
// // // // //                   {submitting ? (
// // // // //                     <>
// // // // //                       <Loader2 className="h-4 w-4 animate-spin" />
// // // // //                       Saving...
// // // // //                     </>
// // // // //                   ) : (
// // // // //                     <>
// // // // //                       <Save className="h-4 w-4" />
// // // // //                       {isEdit ? 'Update User' : 'Create User'}
// // // // //                     </>
// // // // //                   )}
// // // // //                 </Button>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </form>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // export default UserManagement




// // // // import { useState, useEffect } from 'react'
// // // // import { useNavigate, useParams } from 'react-router-dom'
// // // // import { userAPI } from '@/services/api'
// // // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // // import { Button } from '@/components/ui/button'
// // // // import { Input } from '@/components/ui/input'
// // // // import { Label } from '@/components/ui/label'
// // // // import { ArrowLeft, Save, Loader2 } from 'lucide-react'

// // // // interface UserFormData {
// // // //   nik: string
// // // //   name: string
// // // //   email: string
// // // //   password: string
// // // //   phone: string
// // // //   role: string
// // // //   department: string
// // // //   position: string
// // // //   office_location: string
// // // //   area_code: string
// // // //   regional: string  // ✅ TAMBAH INI
// // // //   bank_account: string
// // // //   bank_name: string
// // // // }

// // // // const UserManagement = () => {
// // // //   const navigate = useNavigate()
// // // //   const { id } = useParams()
// // // //   const isEdit = !!id

// // // //   const [loading, setLoading] = useState(false)
// // // //   const [submitting, setSubmitting] = useState(false)
// // // //   const [formData, setFormData] = useState<UserFormData>({
// // // //     nik: '',
// // // //     name: '',
// // // //     email: '',
// // // //     password: '',
// // // //     phone: '',
// // // //     role: 'employee',
// // // //     department: '',
// // // //     position: '',
// // // //     office_location: '',
// // // //     area_code: '',
// // // //     regional: '',  // ✅ TAMBAH INI
// // // //     bank_account: '',
// // // //     bank_name: ''
// // // //   })

// // // //   useEffect(() => {
// // // //     if (isEdit && id) {
// // // //       fetchUser(Number(id))  // ✅ FIX: PASS PARAMETER
// // // //     }
// // // //   }, [id, isEdit])

// // // //   const fetchUser = async (userId: number) => {
// // // //     try {
// // // //       setLoading(true)
// // // //       const response = await userAPI.getById(userId)
      
// // // //       // ✅ FIX: Ambil dari response.data.user 
// // // //       const user = response.data.user || response.data

// // // //       setFormData({
// // // //         nik: user.nik || '',
// // // //         name: user.name || '',
// // // //         email: user.email || '',
// // // //         password: '', // Don't populate password
// // // //         phone: user.phone || '',
// // // //         role: user.role || 'employee',
// // // //         department: user.department || '',
// // // //         position: user.position || '',
// // // //         office_location: user.office_location || '',
// // // //         area_code: user.area_code || '',
// // // //         regional: user.regional || '', // ✅ TAMBAH INI
// // // //         bank_account: user.bank_account || '',
// // // //         bank_name: user.bank_name || ''
// // // //       })
// // // //     } catch (error) {
// // // //       console.error('Failed to fetch user:', error)
// // // //       alert('Failed to fetch user data.')
// // // //       navigate('/hr/dashboard')
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// // // //     const { name, value } = e.target
// // // //     setFormData(prev => ({ ...prev, [name]: value }))
// // // //   }

// // // //   const handleSubmit = async (e: React.FormEvent) => {
// // // //     e.preventDefault()

// // // //     // Validation
// // // //     if (!formData.nik || !formData.name || !formData.email || !formData.role) {
// // // //       alert('Please fill in all required fields (NIK, Name, Email, Role)')
// // // //       return
// // // //     }

// // // //     if (!isEdit && !formData.password) {
// // // //       alert('Password is required for new users')
// // // //       return
// // // //     }

// // // //     if (formData.password && formData.password.length < 6) {
// // // //       alert('Password must be at least 6 characters')
// // // //       return
// // // //     }

// // // //     try {
// // // //       setSubmitting(true)

// // // //       // Prepare data (remove password if empty for edit)
// // // //       const submitData = { ...formData }
// // // //       if (isEdit && !submitData.password) {
// // // //         delete (submitData as any).password
// // // //       }

// // // //       if (isEdit) {
// // // //         await userAPI.update(Number(id), submitData)
// // // //         alert('User updated successfully!')
// // // //       } else {
// // // //         await userAPI.create(submitData)
// // // //         alert('User created successfully!')
// // // //       }

// // // //       navigate('/hr/dashboard')
// // // //     } catch (error: any) {
// // // //       console.error('Failed to save user:', error)
// // // //       const errorMessage = error.response?.data?.message || error.message || 'Failed to save user'
// // // //       alert(errorMessage)
// // // //     } finally {
// // // //       setSubmitting(false)
// // // //     }
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
// // // //       {/* Header */}
// // // //       <header className="bg-white shadow-sm border-b">
// // // //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // // //           <div className="flex items-center gap-4">
// // // //             <Button
// // // //               onClick={() => navigate('/hr/dashboard')}
// // // //               variant="ghost"
// // // //               size="sm"
// // // //               className="gap-2"
// // // //             >
// // // //               <ArrowLeft className="h-4 w-4" />
// // // //               Back
// // // //             </Button>
// // // //             <div>
// // // //               <h1 className="text-2xl font-bold text-gray-900">
// // // //                 {isEdit ? 'Edit User' : 'Create New User'}
// // // //               </h1>
// // // //               <p className="text-sm text-gray-600 mt-1">
// // // //                 {isEdit ? 'Update user account information' : 'Add a new user to the system'}
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         <form onSubmit={handleSubmit}>
// // // //           <Card>
// // // //             <CardHeader>
// // // //               <CardTitle>User Information</CardTitle>
// // // //             </CardHeader>
// // // //             <CardContent className="space-y-6">
// // // //               {/* Basic Information */}
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                 <div className="space-y-2">
// // // //                   <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
// // // //                   <Input
// // // //                     id="nik"
// // // //                     name="nik"
// // // //                     value={formData.nik}
// // // //                     onChange={handleChange}
// // // //                     placeholder="e.g., EMP001"
// // // //                     required
// // // //                     disabled={isEdit}
// // // //                   />
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
// // // //                   <Input
// // // //                     id="name"
// // // //                     name="name"
// // // //                     value={formData.name}
// // // //                     onChange={handleChange}
// // // //                     placeholder="John Doe"
// // // //                     required
// // // //                   />
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
// // // //                   <Input
// // // //                     id="email"
// // // //                     name="email"
// // // //                     type="email"
// // // //                     value={formData.email}
// // // //                     onChange={handleChange}
// // // //                     placeholder="john@telkomakses.co.id"
// // // //                     required
// // // //                   />
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <Label htmlFor="password">
// // // //                     Password {isEdit ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
// // // //                   </Label>
// // // //                   <Input
// // // //                     id="password"
// // // //                     name="password"
// // // //                     type="password"
// // // //                     value={formData.password}
// // // //                     onChange={handleChange}
// // // //                     placeholder="••••••••"
// // // //                     required={!isEdit}
// // // //                     minLength={6}
// // // //                   />
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <Label htmlFor="phone">Phone</Label>
// // // //                   <Input
// // // //                     id="phone"
// // // //                     name="phone"
// // // //                     value={formData.phone}
// // // //                     onChange={handleChange}
// // // //                     placeholder="081234567890"
// // // //                   />
// // // //                 </div>

// // // //                 <div className="space-y-2">
// // // //                   <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
// // // //                   <select
// // // //                     id="role"
// // // //                     name="role"
// // // //                     value={formData.role}
// // // //                     onChange={handleChange}
// // // //                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
// // // //                     required
// // // //                   >
// // // //                     <option value="employee">Employee</option>
// // // //                     <option value="finance_area">Finance Area</option>
// // // //                     <option value="finance_regional">Finance Regional</option>
// // // //                     <option value="hr">HR</option>
// // // //                   </select>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Employment Information */}
// // // //               <div className="border-t pt-6">
// // // //                 <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
// // // //                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="department">Department</Label>
// // // //                     <Input
// // // //                       id="department"
// // // //                       name="department"
// // // //                       value={formData.department}
// // // //                       onChange={handleChange}
// // // //                       placeholder="IT Department"
// // // //                     />
// // // //                   </div>

// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="position">Position</Label>
// // // //                     <Input
// // // //                       id="position"
// // // //                       name="position"
// // // //                       value={formData.position}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Software Engineer"
// // // //                     />
// // // //                   </div>

// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="office_location">Office Location</Label>
// // // //                     <Input
// // // //                       id="office_location"
// // // //                       name="office_location"
// // // //                       value={formData.office_location}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Jakarta HQ"
// // // //                     />
// // // //                   </div>

// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="area_code">Area Code</Label>
// // // //                     <Input
// // // //                       id="area_code"
// // // //                       name="area_code"
// // // //                       value={formData.area_code}
// // // //                       onChange={handleChange}
// // // //                       placeholder="JKT"
// // // //                     />
// // // //                   </div>

// // // //                   {/* ✅ TAMBAH INPUT REGIONAL */}
// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="regional">Regional</Label>
// // // //                     <Input
// // // //                       id="regional"
// // // //                       name="regional"
// // // //                       value={formData.regional}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Jakarta"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Bank Information */}
// // // //               <div className="border-t pt-6">
// // // //                 <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="bank_name">Bank Name</Label>
// // // //                     <Input
// // // //                       id="bank_name"
// // // //                       name="bank_name"
// // // //                       value={formData.bank_name}
// // // //                       onChange={handleChange}
// // // //                       placeholder="Bank Mandiri"
// // // //                     />
// // // //                   </div>

// // // //                   <div className="space-y-2">
// // // //                     <Label htmlFor="bank_account">Bank Account Number</Label>
// // // //                     <Input
// // // //                       id="bank_account"
// // // //                       name="bank_account"
// // // //                       value={formData.bank_account}
// // // //                       onChange={handleChange}
// // // //                       placeholder="1234567890"
// // // //                     />
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               {/* Action Buttons */}
// // // //               <div className="flex justify-end gap-4 pt-6 border-t">
// // // //                 <Button
// // // //                   type="button"
// // // //                   onClick={() => navigate('/hr/dashboard')}
// // // //                   variant="outline"
// // // //                   disabled={submitting}
// // // //                 >
// // // //                   Cancel
// // // //                 </Button>
// // // //                 <Button
// // // //                   type="submit"
// // // //                   className="gap-2 bg-red-600 hover:bg-red-700"
// // // //                   disabled={submitting}
// // // //                 >
// // // //                   {submitting ? (
// // // //                     <>
// // // //                       <Loader2 className="h-4 w-4 animate-spin" />
// // // //                       Saving...
// // // //                     </>
// // // //                   ) : (
// // // //                     <>
// // // //                       <Save className="h-4 w-4" />
// // // //                       {isEdit ? 'Update User' : 'Create User'}
// // // //                     </>
// // // //                   )}
// // // //                 </Button>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </form>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // export default UserManagement




// // // import { useState, useEffect } from 'react'
// // // import { useNavigate, useParams } from 'react-router-dom'
// // // import { userAPI } from '@/services/api'
// // // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // // import { Button } from '@/components/ui/button'
// // // import { Input } from '@/components/ui/input'
// // // import { Label } from '@/components/ui/label'
// // // import { ArrowLeft, Save, Loader2 } from 'lucide-react'

// // // interface UserFormData {
// // //   nik: string
// // //   name: string
// // //   email: string
// // //   password: string
// // //   phone: string
// // //   role: string
// // //   department: string
// // //   position: string
// // //   office_location: string
// // //   area_code: string
// // //   regional: string
// // //   bank_account: string
// // //   bank_name: string
// // // }

// // // const UserManagement = () => {
// // //   const navigate = useNavigate()
// // //   const { id } = useParams()
// // //   const isEdit = !!id

// // //   const [loading, setLoading] = useState(false)
// // //   const [submitting, setSubmitting] = useState(false)
// // //   const [formData, setFormData] = useState<UserFormData>({
// // //     nik: '',
// // //     name: '',
// // //     email: '',
// // //     password: '',
// // //     phone: '',
// // //     role: 'employee',
// // //     department: '',
// // //     position: '',
// // //     office_location: '',
// // //     area_code: '',
// // //     regional: '',
// // //     bank_account: '',
// // //     bank_name: ''
// // //   })

// // //   useEffect(() => {
// // //     if (isEdit && id) {
// // //       // ✅ Validasi ID sebelum fetch
// // //       const userId = Number(id)
// // //       if (!isNaN(userId) && userId > 0) {
// // //         fetchUser(userId)
// // //       } else {
// // //         console.error('Invalid user ID for edit:', id)
// // //         alert('Invalid user ID')
// // //         navigate('/hr/dashboard')
// // //       }
// // //     }
// // //   }, [id, isEdit, navigate])

// // //   const fetchUser = async (userId: number) => {
// // //     try {
// // //       setLoading(true)
// // //       const response = await userAPI.getById(userId)
      
// // //       // ✅ Ambil dari response.data.user atau response.data
// // //       const user = response.data.user || response.data

// // //       setFormData({
// // //         nik: user.nik || '',
// // //         name: user.name || '',
// // //         email: user.email || '',
// // //         password: '', // Don't populate password
// // //         phone: user.phone || '',
// // //         role: user.role || 'employee',
// // //         department: user.department || '',
// // //         position: user.position || '',
// // //         office_location: user.office_location || '',
// // //         area_code: user.area_code || '',
// // //         regional: user.regional || '',
// // //         bank_account: user.bank_account || '',
// // //         bank_name: user.bank_name || ''
// // //       })
// // //     } catch (error) {
// // //       console.error('Failed to fetch user:', error)
// // //       alert('Failed to fetch user data.')
// // //       navigate('/hr/dashboard')
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({ ...prev, [name]: value }))
// // //   }

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault()

// // //     // Validation
// // //     if (!formData.nik || !formData.name || !formData.email || !formData.role) {
// // //       alert('Please fill in all required fields (NIK, Name, Email, Role)')
// // //       return
// // //     }

// // //     if (!isEdit && !formData.password) {
// // //       alert('Password is required for new users')
// // //       return
// // //     }

// // //     if (formData.password && formData.password.length < 6) {
// // //       alert('Password must be at least 6 characters')
// // //       return
// // //     }

// // //     try {
// // //       setSubmitting(true)

// // //       // Prepare data (remove password if empty for edit)
// // //       const submitData = { ...formData }
// // //       if (isEdit && !submitData.password) {
// // //         delete (submitData as any).password
// // //       }

// // //       if (isEdit) {
// // //         await userAPI.update(Number(id), submitData)
// // //         alert('User updated successfully!')
// // //       } else {
// // //         await userAPI.create(submitData)
// // //         alert('User created successfully!')
// // //       }

// // //       navigate('/hr/dashboard')
// // //     } catch (error: any) {
// // //       console.error('Failed to save user:', error)
// // //       const errorMessage = error.response?.data?.message || error.message || 'Failed to save user'
// // //       alert(errorMessage)
// // //     } finally {
// // //       setSubmitting(false)
// // //     }
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* Header */}
// // //       <header className="bg-white shadow-sm border-b">
// // //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// // //           <div className="flex items-center gap-4">
// // //             <Button
// // //               onClick={() => navigate('/hr/dashboard')}
// // //               variant="ghost"
// // //               size="sm"
// // //               className="gap-2"
// // //             >
// // //               <ArrowLeft className="h-4 w-4" />
// // //               Back
// // //             </Button>
// // //             <div>
// // //               <h1 className="text-2xl font-bold text-gray-900">
// // //                 {isEdit ? 'Edit User' : 'Create New User'}
// // //               </h1>
// // //               <p className="text-sm text-gray-600 mt-1">
// // //                 {isEdit ? 'Update user account information' : 'Add a new user to the system'}
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // //         <form onSubmit={handleSubmit}>
// // //           <Card>
// // //             <CardHeader>
// // //               <CardTitle>User Information</CardTitle>
// // //             </CardHeader>
// // //             <CardContent className="space-y-6">
// // //               {/* Basic Information */}
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
// // //                   <Input
// // //                     id="nik"
// // //                     name="nik"
// // //                     value={formData.nik}
// // //                     onChange={handleChange}
// // //                     placeholder="e.g., EMP001"
// // //                     required
// // //                     disabled={isEdit}
// // //                   />
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
// // //                   <Input
// // //                     id="name"
// // //                     name="name"
// // //                     value={formData.name}
// // //                     onChange={handleChange}
// // //                     placeholder="John Doe"
// // //                     required
// // //                   />
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
// // //                   <Input
// // //                     id="email"
// // //                     name="email"
// // //                     type="email"
// // //                     value={formData.email}
// // //                     onChange={handleChange}
// // //                     placeholder="john@telkomakses.co.id"
// // //                     required
// // //                   />
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="password">
// // //                     Password {isEdit ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
// // //                   </Label>
// // //                   <Input
// // //                     id="password"
// // //                     name="password"
// // //                     type="password"
// // //                     value={formData.password}
// // //                     onChange={handleChange}
// // //                     placeholder="••••••••"
// // //                     required={!isEdit}
// // //                     minLength={6}
// // //                   />
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="phone">Phone</Label>
// // //                   <Input
// // //                     id="phone"
// // //                     name="phone"
// // //                     value={formData.phone}
// // //                     onChange={handleChange}
// // //                     placeholder="081234567890"
// // //                   />
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
// // //                   <select
// // //                     id="role"
// // //                     name="role"
// // //                     value={formData.role}
// // //                     onChange={handleChange}
// // //                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// // //                     required
// // //                   >
// // //                     <option value="employee">Employee</option>
// // //                     <option value="finance_area">Finance Area</option>
// // //                     <option value="finance_regional">Finance Regional</option>
// // //                     <option value="hr">HR</option>
// // //                   </select>
// // //                 </div>
// // //               </div>

// // //               {/* Employment Information */}
// // //               <div className="border-t pt-6">
// // //                 <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="department">Department</Label>
// // //                     <Input
// // //                       id="department"
// // //                       name="department"
// // //                       value={formData.department}
// // //                       onChange={handleChange}
// // //                       placeholder="IT Department"
// // //                     />
// // //                   </div>

// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="position">Position</Label>
// // //                     <Input
// // //                       id="position"
// // //                       name="position"
// // //                       value={formData.position}
// // //                       onChange={handleChange}
// // //                       placeholder="Software Engineer"
// // //                     />
// // //                   </div>

// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="office_location">Office Location</Label>
// // //                     <Input
// // //                       id="office_location"
// // //                       name="office_location"
// // //                       value={formData.office_location}
// // //                       onChange={handleChange}
// // //                       placeholder="Jakarta HQ"
// // //                     />
// // //                   </div>

// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="area_code">Area Code</Label>
// // //                     <Input
// // //                       id="area_code"
// // //                       name="area_code"
// // //                       value={formData.area_code}
// // //                       onChange={handleChange}
// // //                       placeholder="JKT"
// // //                     />
// // //                   </div>

// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="regional">Regional</Label>
// // //                     <Input
// // //                       id="regional"
// // //                       name="regional"
// // //                       value={formData.regional}
// // //                       onChange={handleChange}
// // //                       placeholder="Jakarta"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Bank Information */}
// // //               <div className="border-t pt-6">
// // //                 <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="bank_name">Bank Name</Label>
// // //                     <Input
// // //                       id="bank_name"
// // //                       name="bank_name"
// // //                       value={formData.bank_name}
// // //                       onChange={handleChange}
// // //                       placeholder="Bank Mandiri"
// // //                     />
// // //                   </div>

// // //                   <div className="space-y-2">
// // //                     <Label htmlFor="bank_account">Bank Account Number</Label>
// // //                     <Input
// // //                       id="bank_account"
// // //                       name="bank_account"
// // //                       value={formData.bank_account}
// // //                       onChange={handleChange}
// // //                       placeholder="1234567890"
// // //                     />
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               {/* Action Buttons */}
// // //               <div className="flex justify-end gap-4 pt-6 border-t">
// // //                 <Button
// // //                   type="button"
// // //                   onClick={() => navigate('/hr/dashboard')}
// // //                   variant="outline"
// // //                   disabled={submitting}
// // //                 >
// // //                   Cancel
// // //                 </Button>
// // //                 <Button
// // //                   type="submit"
// // //                   className="gap-2 bg-red-600 hover:bg-red-700"
// // //                   disabled={submitting}
// // //                 >
// // //                   {submitting ? (
// // //                     <>
// // //                       <Loader2 className="h-4 w-4 animate-spin" />
// // //                       Saving...
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <Save className="h-4 w-4" />
// // //                       {isEdit ? 'Update User' : 'Create User'}
// // //                     </>
// // //                   )}
// // //                 </Button>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // export default UserManagement





// // import { useState, useEffect, useCallback } from 'react'
// // import { useNavigate, useParams } from 'react-router-dom'
// // import { userAPI } from '@/services/api'
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// // import { Button } from '@/components/ui/button'
// // import { Input } from '@/components/ui/input'
// // import { Label } from '@/components/ui/label'
// // import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'

// // interface UserFormData {
// //   nik: string
// //   name: string
// //   email: string
// //   password: string
// //   phone: string
// //   role: string
// //   department: string
// //   position: string
// //   office_location: string
// //   area_code: string
// //   regional: string
// //   bank_account: string
// //   bank_name: string
// // }

// // interface FormErrors {
// //   nik?: string
// //   name?: string
// //   email?: string
// //   password?: string
// //   phone?: string
// //   role?: string
// // }

// // const UserManagement = () => {
// //   const navigate = useNavigate()
// //   const { id } = useParams()
// //   const isEdit = !!id

// //   const [loading, setLoading] = useState(false)
// //   const [submitting, setSubmitting] = useState(false)
// //   const [checking, setChecking] = useState({ nik: false, email: false })
// //   const [formData, setFormData] = useState<UserFormData>({
// //     nik: '',
// //     name: '',
// //     email: '',
// //     password: '',
// //     phone: '',
// //     role: 'employee',
// //     department: '',
// //     position: '',
// //     office_location: '',
// //     area_code: '',
// //     regional: '',
// //     bank_account: '',
// //     bank_name: ''
// //   })
// //   const [errors, setErrors] = useState<FormErrors>({})

// //   useEffect(() => {
// //     if (isEdit && id) {
// //       const userId = Number(id)
// //       if (!isNaN(userId) && userId > 0) {
// //         fetchUser(userId)
// //       } else {
// //         console.error('Invalid user ID for edit:', id)
// //         alert('Invalid user ID')
// //         navigate('/hr/dashboard')
// //       }
// //     }
// //   }, [id, isEdit, navigate])

// //   const fetchUser = async (userId: number) => {
// //     try {
// //       setLoading(true)
// //       const response = await userAPI.getById(userId)
// //       const user = response.data.user || response.data

// //       setFormData({
// //         nik: user.nik || '',
// //         name: user.name || '',
// //         email: user.email || '',
// //         password: '',
// //         phone: user.phone || '',
// //         role: user.role || 'employee',
// //         department: user.department || '',
// //         position: user.position || '',
// //         office_location: user.office_location || '',
// //         area_code: user.area_code || '',
// //         regional: user.regional || '',
// //         bank_account: user.bank_account || '',
// //         bank_name: user.bank_name || ''
// //       })
// //     } catch (error) {
// //       console.error('Failed to fetch user:', error)
// //       alert('Failed to fetch user data.')
// //       navigate('/hr/dashboard')
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // ✅ Validation Functions
// //   const validateNIK = (nik: string): string => {
// //     if (!nik) return 'NIK is required'
// //     if (nik.length < 3 || nik.length > 20) return 'NIK must be 3-20 characters'
// //     if (!/^[A-Za-z0-9]+$/.test(nik)) return 'NIK must contain only letters and numbers'
// //     return ''
// //   }

// //   const validateEmail = (email: string): string => {
// //     if (!email) return 'Email is required'
// //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
// //     if (!email.endsWith('@telkomakses.co.id')) return 'Email must use @telkomakses.co.id domain'
// //     return ''
// //   }

// //   const validatePhone = (phone: string): string => {
// //     if (!phone) return ''
// //     const cleaned = phone.replace(/\D/g, '')
// //     if (!/^(08\d{8,11}|628\d{8,11})$/.test(cleaned)) {
// //       return 'Phone must start with 08 or 628 (10-13 digits)'
// //     }
// //     return ''
// //   }

// //   const validatePassword = (password: string): string => {
// //     if (!isEdit && !password) return 'Password is required for new users'
// //     if (password && password.length < 6) return 'Password must be at least 6 characters'
// //     return ''
// //   }

// //   // ✅ Debounced Check NIK Availability
// //   const checkNikAvailability = useCallback(
// //     debounce(async (nik: string) => {
// //       if (!nik || validateNIK(nik)) return

// //       try {
// //         setChecking(prev => ({ ...prev, nik: true }))
// //         const response = await userAPI.checkNik(nik, isEdit ? Number(id) : undefined)
        
// //         if (!response.data.available) {
// //           setErrors(prev => ({ ...prev, nik: 'NIK already taken' }))
// //         } else {
// //           setErrors(prev => ({ ...prev, nik: '' }))
// //         }
// //       } catch (error) {
// //         console.error('Failed to check NIK:', error)
// //       } finally {
// //         setChecking(prev => ({ ...prev, nik: false }))
// //       }
// //     }, 500),
// //     [isEdit, id]
// //   )

// //   // ✅ Debounced Check Email Availability
// //   const checkEmailAvailability = useCallback(
// //     debounce(async (email: string) => {
// //       if (!email || validateEmail(email)) return

// //       try {
// //         setChecking(prev => ({ ...prev, email: true }))
// //         const response = await userAPI.checkEmail(email, isEdit ? Number(id) : undefined)
        
// //         if (!response.data.available) {
// //           setErrors(prev => ({ ...prev, email: 'Email already taken' }))
// //         } else {
// //           setErrors(prev => ({ ...prev, email: '' }))
// //         }
// //       } catch (error) {
// //         console.error('Failed to check email:', error)
// //       } finally {
// //         setChecking(prev => ({ ...prev, email: false }))
// //       }
// //     }, 500),
// //     [isEdit, id]
// //   )

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({ ...prev, [name]: value }))

// //     // ✅ Real-time validation
// //     let error = ''
// //     switch (name) {
// //       case 'nik':
// //         error = validateNIK(value)
// //         setErrors(prev => ({ ...prev, nik: error }))
// //         if (!error && !isEdit) checkNikAvailability(value)
// //         break
// //       case 'email':
// //         error = validateEmail(value)
// //         setErrors(prev => ({ ...prev, email: error }))
// //         if (!error) checkEmailAvailability(value)
// //         break
// //       case 'phone':
// //         error = validatePhone(value)
// //         setErrors(prev => ({ ...prev, phone: error }))
// //         break
// //       case 'password':
// //         error = validatePassword(value)
// //         setErrors(prev => ({ ...prev, password: error }))
// //         break
// //     }
// //   }

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     // ✅ Final validation before submit
// //     const newErrors: FormErrors = {
// //       nik: validateNIK(formData.nik),
// //       email: validateEmail(formData.email),
// //       phone: validatePhone(formData.phone),
// //       password: validatePassword(formData.password),
// //     }

// //     setErrors(newErrors)

// //     const hasErrors = Object.values(newErrors).some(error => error !== '')
// //     if (hasErrors) {
// //       alert('Please fix all errors before submitting')
// //       return
// //     }

// //     if (!formData.name || !formData.role) {
// //       alert('Please fill in all required fields')
// //       return
// //     }

// //     try {
// //       setSubmitting(true)

// //       // ✅ Prepare data
// //       const submitData = { ...formData }
      
// //       // ✅ Auto-format phone: 08xxx → +628xxx
// //       if (submitData.phone) {
// //         const cleaned = submitData.phone.replace(/\D/g, '')
// //         if (cleaned.startsWith('08')) {
// //           submitData.phone = '+62' + cleaned.substring(1)
// //         } else if (cleaned.startsWith('628')) {
// //           submitData.phone = '+' + cleaned
// //         }
// //       }

// //       // ✅ Remove password if empty for edit
// //       if (isEdit && !submitData.password) {
// //         delete (submitData as any).password
// //       }

// //       if (isEdit) {
// //         await userAPI.update(Number(id), submitData)
// //         alert('User updated successfully!')
// //       } else {
// //         await userAPI.create(submitData)
// //         alert('User created successfully!')
// //       }

// //       navigate('/hr/dashboard')
// //     } catch (error: any) {
// //       console.error('Failed to save user:', error)
// //       const errorMessage = error.response?.data?.message || error.message || 'Failed to save user'
// //       alert(errorMessage)
// //     } finally {
// //       setSubmitting(false)
// //     }
// //   }

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <header className="bg-white shadow-sm border-b">
// //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //           <div className="flex items-center gap-4">
// //             <Button
// //               onClick={() => navigate('/hr/dashboard')}
// //               variant="ghost"
// //               size="sm"
// //               className="gap-2"
// //             >
// //               <ArrowLeft className="h-4 w-4" />
// //               Back
// //             </Button>
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">
// //                 {isEdit ? 'Edit User' : 'Create New User'}
// //               </h1>
// //               <p className="text-sm text-gray-600 mt-1">
// //                 {isEdit ? 'Update user account information' : 'Add a new user to the system'}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </header>

// //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         <form onSubmit={handleSubmit}>
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>User Information</CardTitle>
// //             </CardHeader>
// //             <CardContent className="space-y-6">
// //               {/* Basic Information */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 {/* NIK Field */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
// //                   <div className="relative">
// //                     <Input
// //                       id="nik"
// //                       name="nik"
// //                       value={formData.nik}
// //                       onChange={handleChange}
// //                       placeholder="e.g., EMP001"
// //                       required
// //                       disabled={isEdit}
// //                       className={errors.nik ? 'border-red-500' : ''}
// //                     />
// //                     {checking.nik && (
// //                       <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
// //                     )}
// //                     {!checking.nik && formData.nik && !errors.nik && !isEdit && (
// //                       <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
// //                     )}
// //                   </div>
// //                   {errors.nik && (
// //                     <p className="text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.nik}
// //                     </p>
// //                   )}
// //                   <p className="text-xs text-gray-500">3-20 characters, letters and numbers only</p>
// //                 </div>

// //                 {/* Name Field */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
// //                   <Input
// //                     id="name"
// //                     name="name"
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     placeholder="John Doe"
// //                     required
// //                   />
// //                 </div>

// //                 {/* Email Field */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
// //                   <div className="relative">
// //                     <Input
// //                       id="email"
// //                       name="email"
// //                       type="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       placeholder="john@telkomakses.co.id"
// //                       required
// //                       className={errors.email ? 'border-red-500' : ''}
// //                     />
// //                     {checking.email && (
// //                       <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
// //                     )}
// //                     {!checking.email && formData.email && !errors.email && (
// //                       <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
// //                     )}
// //                   </div>
// //                   {errors.email && (
// //                     <p className="text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.email}
// //                     </p>
// //                   )}
// //                   <p className="text-xs text-gray-500">Must use @telkomakses.co.id domain</p>
// //                 </div>

// //                 {/* Password Field */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="password">
// //                     Password {isEdit ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
// //                   </Label>
// //                   <Input
// //                     id="password"
// //                     name="password"
// //                     type="password"
// //                     value={formData.password}
// //                     onChange={handleChange}
// //                     placeholder="••••••••"
// //                     required={!isEdit}
// //                     minLength={6}
// //                     className={errors.password ? 'border-red-500' : ''}
// //                   />
// //                   {errors.password && (
// //                     <p className="text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.password}
// //                     </p>
// //                   )}
// //                   <p className="text-xs text-gray-500">Minimum 6 characters</p>
// //                 </div>

// //                 {/* Phone Field */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="phone">Phone</Label>
// //                   <Input
// //                     id="phone"
// //                     name="phone"
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                     placeholder="081234567890"
// //                     className={errors.phone ? 'border-red-500' : ''}
// //                   />
// //                   {errors.phone && (
// //                     <p className="text-sm text-red-600 flex items-center gap-1">
// //                       <AlertCircle className="h-3 w-3" />
// //                       {errors.phone}
// //                     </p>
// //                   )}
// //                   <p className="text-xs text-gray-500">Format: 08xxx or +628xxx (10-13 digits)</p>
// //                 </div>

// //                 {/* Role Field */}
// //                 <div className="space-y-2">
// //                   <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
// //                   <select
// //                     id="role"
// //                     name="role"
// //                     value={formData.role}
// //                     onChange={handleChange}
// //                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
// //                     required
// //                   >
// //                     <option value="employee">Employee</option>
// //                     <option value="finance_area">Finance Area</option>
// //                     <option value="finance_regional">Finance Regional</option>
// //                     <option value="hr">HR</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Employment Information */}
// //               <div className="border-t pt-6">
// //                 <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="department">Department</Label>
// //                     <Input
// //                       id="department"
// //                       name="department"
// //                       value={formData.department}
// //                       onChange={handleChange}
// //                       placeholder="IT Department"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="position">Position</Label>
// //                     <Input
// //                       id="position"
// //                       name="position"
// //                       value={formData.position}
// //                       onChange={handleChange}
// //                       placeholder="Software Engineer"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="office_location">Office Location</Label>
// //                     <Input
// //                       id="office_location"
// //                       name="office_location"
// //                       value={formData.office_location}
// //                       onChange={handleChange}
// //                       placeholder="Jakarta HQ"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="area_code">Area Code</Label>
// //                     <Input
// //                       id="area_code"
// //                       name="area_code"
// //                       value={formData.area_code}
// //                       onChange={handleChange}
// //                       placeholder="JKT"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="regional">Regional</Label>
// //                     <Input
// //                       id="regional"
// //                       name="regional"
// //                       value={formData.regional}
// //                       onChange={handleChange}
// //                       placeholder="Jakarta"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Bank Information */}
// //               <div className="border-t pt-6">
// //                 <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <div className="space-y-2">
// //                     <Label htmlFor="bank_name">Bank Name</Label>
// //                     <Input
// //                       id="bank_name"
// //                       name="bank_name"
// //                       value={formData.bank_name}
// //                       onChange={handleChange}
// //                       placeholder="Bank Mandiri"
// //                     />
// //                   </div>

// //                   <div className="space-y-2">
// //                     <Label htmlFor="bank_account">Bank Account Number</Label>
// //                     <Input
// //                       id="bank_account"
// //                       name="bank_account"
// //                       value={formData.bank_account}
// //                       onChange={handleChange}
// //                       placeholder="1234567890"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex justify-end gap-4 pt-6 border-t">
// //                 <Button
// //                   type="button"
// //                   onClick={() => navigate('/hr/dashboard')}
// //                   variant="outline"
// //                   disabled={submitting}
// //                 >
// //                   Cancel
// //                 </Button>
// //                 <Button
// //                   type="submit"
// //                   className="gap-2 bg-red-600 hover:bg-red-700"
// //                   disabled={submitting || checking.nik || checking.email}
// //                 >
// //                   {submitting ? (
// //                     <>
// //                       <Loader2 className="h-4 w-4 animate-spin" />
// //                       Saving...
// //                     </>
// //                   ) : (
// //                     <>
// //                       <Save className="h-4 w-4" />
// //                       {isEdit ? 'Update User' : 'Create User'}
// //                     </>
// //                   )}
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </form>
// //       </div>
// //     </div>
// //   )
// // }

// // // ✅ Debounce utility function
// // function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
// //   let timeout: NodeJS.Timeout
// //   return function executedFunction(...args: Parameters<T>) {
// //     const later = () => {
// //       clearTimeout(timeout)
// //       func(...args)
// //     }
// //     clearTimeout(timeout)
// //     timeout = setTimeout(later, wait)
// //   }
// // }

// // export default UserManagement





// import { useState, useEffect, useCallback } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { userAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
// import { ConfirmDialog, AlertDialog } from '@/components/ConfirmDialog'

// interface UserFormData {
//   nik: string
//   name: string
//   email: string
//   password: string
//   phone: string
//   role: string
//   department: string
//   position: string
//   office_location: string
//   area_code: string
//   regional: string
//   bank_account: string
//   bank_name: string
// }

// interface FormErrors {
//   nik?: string
//   name?: string
//   email?: string
//   password?: string
//   phone?: string
//   role?: string
// }

// const UserManagement = () => {
//   const navigate = useNavigate()
//   const { id } = useParams()
//   const isEdit = !!id

//   const [loading, setLoading] = useState(false)
//   const [submitting, setSubmitting] = useState(false)
//   const [checking, setChecking] = useState({ nik: false, email: false })
//   const [formData, setFormData] = useState<UserFormData>({
//     nik: '',
//     name: '',
//     email: '',
//     password: '',
//     phone: '',
//     role: 'employee',
//     department: '',
//     position: '',
//     office_location: '',
//     area_code: '',
//     regional: '',
//     bank_account: '',
//     bank_name: ''
//   })
//   const [errors, setErrors] = useState<FormErrors>({})

//   // ✅ Dialog States
//   const [cancelDialog, setCancelDialog] = useState(false)
//   const [submitDialog, setSubmitDialog] = useState(false)
//   const [successDialog, setSuccessDialog] = useState({ open: false, message: '' })
//   const [errorDialog, setErrorDialog] = useState({ open: false, message: '' })

//   useEffect(() => {
//     if (isEdit && id) {
//       const userId = Number(id)
//       if (!isNaN(userId) && userId > 0) {
//         fetchUser(userId)
//       } else {
//         console.error('Invalid user ID for edit:', id)
//         setErrorDialog({
//           open: true,
//           message: 'Invalid user ID. Please try again.'
//         })
//         setTimeout(() => navigate('/hr/dashboard'), 2000)
//       }
//     }
//   }, [id, isEdit, navigate])

//   const fetchUser = async (userId: number) => {
//     try {
//       setLoading(true)
//       const response = await userAPI.getById(userId)
//       const user = response.data.user || response.data

//       setFormData({
//         nik: user.nik || '',
//         name: user.name || '',
//         email: user.email || '',
//         password: '',
//         phone: user.phone || '',
//         role: user.role || 'employee',
//         department: user.department || '',
//         position: user.position || '',
//         office_location: user.office_location || '',
//         area_code: user.area_code || '',
//         regional: user.regional || '',
//         bank_account: user.bank_account || '',
//         bank_name: user.bank_name || ''
//       })
//     } catch (error) {
//       console.error('Failed to fetch user:', error)
//       setErrorDialog({
//         open: true,
//         message: 'Failed to fetch user data. Please try again.'
//       })
//       setTimeout(() => navigate('/hr/dashboard'), 2000)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const validateNIK = (nik: string): string => {
//     if (!nik) return 'NIK is required'
//     if (nik.length < 3 || nik.length > 20) return 'NIK must be 3-20 characters'
//     if (!/^[A-Za-z0-9]+$/.test(nik)) return 'NIK must contain only letters and numbers'
//     return ''
//   }

//   const validateEmail = (email: string): string => {
//     if (!email) return 'Email is required'
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
//     if (!email.endsWith('@telkomakses.co.id')) return 'Email must use @telkomakses.co.id domain'
//     return ''
//   }

//   const validatePhone = (phone: string): string => {
//     if (!phone) return ''
//     const cleaned = phone.replace(/\D/g, '')
//     if (!/^(08\d{8,11}|628\d{8,11})$/.test(cleaned)) {
//       return 'Phone must start with 08 or 628 (10-13 digits)'
//     }
//     return ''
//   }

//   const validatePassword = (password: string): string => {
//     if (!isEdit && !password) return 'Password is required for new users'
//     if (password && password.length < 6) return 'Password must be at least 6 characters'
//     return ''
//   }

//   const checkNikAvailability = useCallback(
//     debounce(async (nik: string) => {
//       if (!nik || validateNIK(nik)) return

//       try {
//         setChecking(prev => ({ ...prev, nik: true }))
//         const response = await userAPI.checkNik(nik, isEdit ? Number(id) : undefined)
        
//         if (!response.data.available) {
//           setErrors(prev => ({ ...prev, nik: 'NIK already taken' }))
//         } else {
//           setErrors(prev => ({ ...prev, nik: '' }))
//         }
//       } catch (error) {
//         console.error('Failed to check NIK:', error)
//       } finally {
//         setChecking(prev => ({ ...prev, nik: false }))
//       }
//     }, 500),
//     [isEdit, id]
//   )

//   const checkEmailAvailability = useCallback(
//     debounce(async (email: string) => {
//       if (!email || validateEmail(email)) return

//       try {
//         setChecking(prev => ({ ...prev, email: true }))
//         const response = await userAPI.checkEmail(email, isEdit ? Number(id) : undefined)
        
//         if (!response.data.available) {
//           setErrors(prev => ({ ...prev, email: 'Email already taken' }))
//         } else {
//           setErrors(prev => ({ ...prev, email: '' }))
//         }
//       } catch (error) {
//         console.error('Failed to check email:', error)
//       } finally {
//         setChecking(prev => ({ ...prev, email: false }))
//       }
//     }, 500),
//     [isEdit, id]
//   )

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))

//     let error = ''
//     switch (name) {
//       case 'nik':
//         error = validateNIK(value)
//         setErrors(prev => ({ ...prev, nik: error }))
//         if (!error && !isEdit) checkNikAvailability(value)
//         break
//       case 'email':
//         error = validateEmail(value)
//         setErrors(prev => ({ ...prev, email: error }))
//         if (!error) checkEmailAvailability(value)
//         break
//       case 'phone':
//         error = validatePhone(value)
//         setErrors(prev => ({ ...prev, phone: error }))
//         break
//       case 'password':
//         error = validatePassword(value)
//         setErrors(prev => ({ ...prev, password: error }))
//         break
//     }
//   }

//   // ✅ Handle Cancel with Confirmation
//   const handleCancel = () => {
//     setCancelDialog(true)
//   }

//   const confirmCancel = () => {
//     setCancelDialog(false)
//     navigate('/hr/dashboard')
//   }

//   // ✅ Handle Submit with Confirmation
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     const newErrors: FormErrors = {
//       nik: validateNIK(formData.nik),
//       email: validateEmail(formData.email),
//       phone: validatePhone(formData.phone),
//       password: validatePassword(formData.password),
//     }

//     setErrors(newErrors)

//     const hasErrors = Object.values(newErrors).some(error => error !== '')
//     if (hasErrors) {
//       setErrorDialog({
//         open: true,
//         message: 'Please fix all validation errors before submitting.'
//       })
//       return
//     }

//     if (!formData.name || !formData.role) {
//       setErrorDialog({
//         open: true,
//         message: 'Please fill in all required fields (Name and Role).'
//       })
//       return
//     }

//     setSubmitDialog(true)
//   }

//   const confirmSubmit = async () => {
//     try {
//       setSubmitting(true)
//       setSubmitDialog(false)

//       const submitData = { ...formData }
      
//       // Auto-format phone
//       if (submitData.phone) {
//         const cleaned = submitData.phone.replace(/\D/g, '')
//         if (cleaned.startsWith('08')) {
//           submitData.phone = '+62' + cleaned.substring(1)
//         } else if (cleaned.startsWith('628')) {
//           submitData.phone = '+' + cleaned
//         }
//       }

//       // Remove empty password for edit
//       if (isEdit && !submitData.password) {
//         delete (submitData as any).password
//       }

//       if (isEdit) {
//         await userAPI.update(Number(id), submitData)
//         setSuccessDialog({
//           open: true,
//           message: 'User updated successfully!'
//         })
//       } else {
//         await userAPI.create(submitData)
//         setSuccessDialog({
//           open: true,
//           message: 'User created successfully!'
//         })
//       }

//       setTimeout(() => navigate('/hr/dashboard'), 1500)
//     } catch (error: any) {
//       console.error('Failed to save user:', error)
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to save user. Please try again.'
//       setErrorDialog({
//         open: true,
//         message: errorMessage
//       })
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" />
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Cancel Confirmation Dialog */}
//       <ConfirmDialog
//         isOpen={cancelDialog}
//         onClose={() => setCancelDialog(false)}
//         onConfirm={confirmCancel}
//         title="Discard Changes?"
//         message="Are you sure you want to cancel? All unsaved changes will be lost."
//         type="warning"
//         confirmText="Yes, Discard"
//         cancelText="No, Keep Editing"
//       />

//       {/* Submit Confirmation Dialog */}
//       <ConfirmDialog
//         isOpen={submitDialog}
//         onClose={() => setSubmitDialog(false)}
//         onConfirm={confirmSubmit}
//         title={isEdit ? 'Update User?' : 'Create User?'}
//         message={
//           isEdit 
//             ? 'Are you sure you want to update this user account?' 
//             : 'Are you sure you want to create this new user account?'
//         }
//         type="info"
//         confirmText={isEdit ? 'Yes, Update' : 'Yes, Create'}
//         cancelText="Cancel"
//         loading={submitting}
//       />

//       {/* Success Alert */}
//       <AlertDialog
//         isOpen={successDialog.open}
//         onClose={() => setSuccessDialog({ open: false, message: '' })}
//         title="Success!"
//         message={successDialog.message}
//         type="success"
//       />

//       {/* Error Alert */}
//       <AlertDialog
//         isOpen={errorDialog.open}
//         onClose={() => setErrorDialog({ open: false, message: '' })}
//         title="Error"
//         message={errorDialog.message}
//         type="error"
//       />

//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-4">
//             <Button
//               onClick={handleCancel}
//               variant="ghost"
//               size="sm"
//               className="gap-2"
//             >
//               <ArrowLeft className="h-4 w-4" />
//               Back
//             </Button>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">
//                 {isEdit ? 'Edit User' : 'Create New User'}
//               </h1>
//               <p className="text-sm text-gray-600 mt-1">
//                 {isEdit ? 'Update user account information' : 'Add a new user to the system'}
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <form onSubmit={handleSubmit}>
//           <Card>
//             <CardHeader>
//               <CardTitle>User Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Basic Information */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* NIK Field */}
//                 <div className="space-y-2">
//                   <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
//                   <div className="relative">
//                     <Input
//                       id="nik"
//                       name="nik"
//                       value={formData.nik}
//                       onChange={handleChange}
//                       placeholder="e.g., EMP001"
//                       required
//                       disabled={isEdit}
//                       className={errors.nik ? 'border-red-500' : ''}
//                     />
//                     {checking.nik && (
//                       <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
//                     )}
//                     {!checking.nik && formData.nik && !errors.nik && !isEdit && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
//                     )}
//                   </div>
//                   {errors.nik && (
//                     <p className="text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.nik}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500">3-20 characters, letters and numbers only</p>
//                 </div>

//                 {/* Name Field */}
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>

//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
//                   <div className="relative">
//                     <Input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="john@telkomakses.co.id"
//                       required
//                       className={errors.email ? 'border-red-500' : ''}
//                     />
//                     {checking.email && (
//                       <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
//                     )}
//                     {!checking.email && formData.email && !errors.email && (
//                       <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
//                     )}
//                   </div>
//                   {errors.email && (
//                     <p className="text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.email}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500">Must use @telkomakses.co.id domain</p>
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                   <Label htmlFor="password">
//                     Password {isEdit ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
//                   </Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     placeholder="••••••••"
//                     required={!isEdit}
//                     minLength={6}
//                     className={errors.password ? 'border-red-500' : ''}
//                   />
//                   {errors.password && (
//                     <p className="text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.password}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500">Minimum 6 characters</p>
//                 </div>

//                 {/* Phone Field */}
//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="081234567890"
//                     className={errors.phone ? 'border-red-500' : ''}
//                   />
//                   {errors.phone && (
//                     <p className="text-sm text-red-600 flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.phone}
//                     </p>
//                   )}
//                   <p className="text-xs text-gray-500">Format: 08xxx or +628xxx (10-13 digits)</p>
//                 </div>

//                 {/* Role Field */}
//                 <div className="space-y-2">
//                   <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
//                   <select
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//                     required
//                   >
//                     <option value="employee">Employee</option>
//                     <option value="finance_area">Finance Area</option>
//                     <option value="finance_regional">Finance Regional</option>
//                     <option value="hr">HR</option>
//                   </select>
//                 </div>
//               </div>

//               {/* Employment Information */}
//               <div className="border-t pt-6">
//                 <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="department">Department</Label>
//                     <Input
//                       id="department"
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       placeholder="IT Department"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="position">Position</Label>
//                     <Input
//                       id="position"
//                       name="position"
//                       value={formData.position}
//                       onChange={handleChange}
//                       placeholder="Software Engineer"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="office_location">Office Location</Label>
//                     <Input
//                       id="office_location"
//                       name="office_location"
//                       value={formData.office_location}
//                       onChange={handleChange}
//                       placeholder="Jakarta HQ"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="area_code">Area Code</Label>
//                     <Input
//                       id="area_code"
//                       name="area_code"
//                       value={formData.area_code}
//                       onChange={handleChange}
//                       placeholder="JKT"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="regional">Regional</Label>
//                     <Input
//                       id="regional"
//                       name="regional"
//                       value={formData.regional}
//                       onChange={handleChange}
//                       placeholder="Jakarta"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Bank Information */}
//               <div className="border-t pt-6">
//                 <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="bank_name">Bank Name</Label>
//                     <Input
//                       id="bank_name"
//                       name="bank_name"
//                       value={formData.bank_name}
//                       onChange={handleChange}
//                       placeholder="Bank Mandiri"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bank_account">Bank Account Number</Label>
//                     <Input
//                       id="bank_account"
//                       name="bank_account"
//                       value={formData.bank_account}
//                       onChange={handleChange}
//                       placeholder="1234567890"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex justify-end gap-4 pt-6 border-t">
//                 <Button
//                   type="button"
//                   onClick={handleCancel}
//                   variant="outline"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="gap-2 bg-red-600 hover:bg-red-700"
//                   disabled={submitting || checking.nik || checking.email}
//                 >
//                   {submitting ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4" />
//                       {isEdit ? 'Update User' : 'Create User'}
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </form>
//       </div>
//     </div>
//   )
// }

// function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
//   let timeout: NodeJS.Timeout
//   return function executedFunction(...args: Parameters<T>) {
//     const later = () => {
//       clearTimeout(timeout)
//       func(...args)
//     }
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//   }
// }

// export default UserManagement





import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react'
import { ConfirmDialog, AlertDialog } from '@/components/ConfirmDialog'

interface UserFormData {
  nik: string
  name: string
  email: string
  password: string
  phone: string
  role: string
  department: string
  position: string
  office_location: string
  area_code: string
  regional: string
  bank_account: string
  bank_name: string
}

interface FormErrors {
  nik?: string
  name?: string
  email?: string
  password?: string
  phone?: string
  role?: string
}

const UserManagement = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  
  // ✅ FIX: Better ID validation
  const isEdit = !!id
  const userId = id ? parseInt(id, 10) : null

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [checking, setChecking] = useState({ nik: false, email: false })
  const [formData, setFormData] = useState<UserFormData>({
    nik: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'employee',
    department: '',
    position: '',
    office_location: '',
    area_code: '',
    regional: '',
    bank_account: '',
    bank_name: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  // Dialog States
  const [cancelDialog, setCancelDialog] = useState(false)
  const [submitDialog, setSubmitDialog] = useState(false)
  const [successDialog, setSuccessDialog] = useState({ open: false, message: '' })
  const [errorDialog, setErrorDialog] = useState({ open: false, message: '' })

  useEffect(() => {
    // ✅ FIX: Better validation for edit mode
    if (isEdit) {
      console.log('Edit mode detected. ID from URL:', id, 'Parsed userId:', userId)
      
      if (!userId || isNaN(userId) || userId <= 0) {
        console.error('Invalid user ID:', { id, userId })
        setErrorDialog({
          open: true,
          message: `Invalid user ID: "${id}". Please return to the dashboard and try again.`
        })
        setTimeout(() => navigate('/hr/dashboard'), 2000)
        return
      }
      
      fetchUser(userId)
    }
  }, [id, userId, isEdit, navigate])

  const fetchUser = async (uid: number) => {
    try {
      setLoading(true)
      console.log('Fetching user with ID:', uid)
      
      const response = await userAPI.getById(uid)
      console.log('User data received:', response.data)
      
      const user = response.data.user || response.data

      setFormData({
        nik: user.nik || '',
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        role: user.role || 'employee',
        department: user.department || '',
        position: user.position || '',
        office_location: user.office_location || '',
        area_code: user.area_code || '',
        regional: user.regional || '',
        bank_account: user.bank_account || '',
        bank_name: user.bank_name || ''
      })
    } catch (error: any) {
      console.error('Failed to fetch user:', error)
      const errorMsg = error.response?.data?.message || 'Failed to fetch user data. Please try again.'
      setErrorDialog({
        open: true,
        message: errorMsg
      })
      setTimeout(() => navigate('/hr/dashboard'), 2000)
    } finally {
      setLoading(false)
    }
  }

  const validateNIK = (nik: string): string => {
    if (!nik) return 'NIK is required'
    // ✅ UPDATED: 6-8 characters validation
    if (nik.length < 6 || nik.length > 8) return 'NIK must be 6-8 characters'
    if (!/^[A-Za-z0-9]+$/.test(nik)) return 'NIK must contain only letters and numbers'
    return ''
  }

  const validateEmail = (email: string): string => {
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format'
    if (!email.endsWith('@telkomakses.co.id')) return 'Email must use @telkomakses.co.id domain'
    return ''
  }

  const validatePhone = (phone: string): string => {
    if (!phone) return ''
    const cleaned = phone.replace(/\D/g, '')
    if (!/^(08\d{8,11}|628\d{8,11})$/.test(cleaned)) {
      return 'Phone must start with 08 or 628 (10-13 digits)'
    }
    return ''
  }

  const validatePassword = (password: string): string => {
    if (!isEdit && !password) return 'Password is required for new users'
    if (password && password.length < 6) return 'Password must be at least 6 characters'
    return ''
  }

  const checkNikAvailability = useCallback(
    debounce(async (nik: string) => {
      if (!nik || validateNIK(nik)) return

      try {
        setChecking(prev => ({ ...prev, nik: true }))
        const response = await userAPI.checkNik(nik, userId || undefined)
        
        if (!response.data.available) {
          setErrors(prev => ({ ...prev, nik: 'NIK already taken' }))
        } else {
          setErrors(prev => ({ ...prev, nik: '' }))
        }
      } catch (error) {
        console.error('Failed to check NIK:', error)
      } finally {
        setChecking(prev => ({ ...prev, nik: false }))
      }
    }, 500),
    [isEdit, userId]
  )

  const checkEmailAvailability = useCallback(
    debounce(async (email: string) => {
      if (!email || validateEmail(email)) return

      try {
        setChecking(prev => ({ ...prev, email: true }))
        const response = await userAPI.checkEmail(email, userId || undefined)
        
        if (!response.data.available) {
          setErrors(prev => ({ ...prev, email: 'Email already taken' }))
        } else {
          setErrors(prev => ({ ...prev, email: '' }))
        }
      } catch (error) {
        console.error('Failed to check email:', error)
      } finally {
        setChecking(prev => ({ ...prev, email: false }))
      }
    }, 500),
    [isEdit, userId]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    let error = ''
    switch (name) {
      case 'nik':
        error = validateNIK(value)
        setErrors(prev => ({ ...prev, nik: error }))
        if (!error && !isEdit) checkNikAvailability(value)
        break
      case 'email':
        error = validateEmail(value)
        setErrors(prev => ({ ...prev, email: error }))
        if (!error) checkEmailAvailability(value)
        break
      case 'phone':
        error = validatePhone(value)
        setErrors(prev => ({ ...prev, phone: error }))
        break
      case 'password':
        error = validatePassword(value)
        setErrors(prev => ({ ...prev, password: error }))
        break
    }
  }

  const handleCancel = () => {
    setCancelDialog(true)
  }

  const confirmCancel = () => {
    setCancelDialog(false)
    navigate('/hr/dashboard')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = {
      nik: validateNIK(formData.nik),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
    }

    setErrors(newErrors)

    const hasErrors = Object.values(newErrors).some(error => error !== '')
    if (hasErrors) {
      setErrorDialog({
        open: true,
        message: 'Please fix all validation errors before submitting.'
      })
      return
    }

    if (!formData.name || !formData.role) {
      setErrorDialog({
        open: true,
        message: 'Please fill in all required fields (Name and Role).'
      })
      return
    }

    setSubmitDialog(true)
  }

  const confirmSubmit = async () => {
    try {
      setSubmitting(true)
      setSubmitDialog(false)

      const submitData = { ...formData }
      
      // Auto-format phone
      if (submitData.phone) {
        const cleaned = submitData.phone.replace(/\D/g, '')
        if (cleaned.startsWith('08')) {
          submitData.phone = '+62' + cleaned.substring(1)
        } else if (cleaned.startsWith('628')) {
          submitData.phone = '+' + cleaned
        }
      }

      // Remove empty password for edit
      if (isEdit && !submitData.password) {
        delete (submitData as any).password
      }

      if (isEdit && userId) {
        console.log('Updating user:', userId, submitData)
        await userAPI.update(userId, submitData)
        setSuccessDialog({
          open: true,
          message: 'User updated successfully!'
        })
      } else {
        console.log('Creating user:', submitData)
        await userAPI.create(submitData)
        setSuccessDialog({
          open: true,
          message: 'User created successfully!'
        })
      }

      setTimeout(() => navigate('/hr/dashboard'), 1500)
    } catch (error: any) {
      console.error('Failed to save user:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save user. Please try again.'
      setErrorDialog({
        open: true,
        message: errorMessage
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={cancelDialog}
        onClose={() => setCancelDialog(false)}
        onConfirm={confirmCancel}
        title="Discard Changes?"
        message="Are you sure you want to cancel? All unsaved changes will be lost."
        type="warning"
        confirmText="Yes, Discard"
        cancelText="No, Keep Editing"
      />

      {/* Submit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={submitDialog}
        onClose={() => setSubmitDialog(false)}
        onConfirm={confirmSubmit}
        title={isEdit ? 'Update User?' : 'Create User?'}
        message={
          isEdit 
            ? 'Are you sure you want to update this user account?' 
            : 'Are you sure you want to create this new user account?'
        }
        type="info"
        confirmText={isEdit ? 'Yes, Update' : 'Yes, Create'}
        cancelText="Cancel"
        loading={submitting}
      />

      {/* Success Alert */}
      <AlertDialog
        isOpen={successDialog.open}
        onClose={() => setSuccessDialog({ open: false, message: '' })}
        title="Success!"
        message={successDialog.message}
        type="success"
      />

      {/* Error Alert */}
      <AlertDialog
        isOpen={errorDialog.open}
        onClose={() => setErrorDialog({ open: false, message: '' })}
        title="Error"
        message={errorDialog.message}
        type="error"
      />

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleCancel}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEdit ? 'Edit User' : 'Create New User'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {isEdit ? 'Update user account information' : 'Add a new user to the system'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* NIK Field */}
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      id="nik"
                      name="nik"
                      value={formData.nik}
                      onChange={handleChange}
                      placeholder="e.g., EMP001 or 123456"
                      required
                      disabled={isEdit}
                      maxLength={8}
                      className={errors.nik ? 'border-red-500' : ''}
                    />
                    {checking.nik && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                    )}
                    {!checking.nik && formData.nik && !errors.nik && !isEdit && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    )}
                  </div>
                  {errors.nik && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.nik}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">6-8 characters, letters and numbers only</p>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@telkomakses.co.id"
                      required
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {checking.email && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                    )}
                    {!checking.email && formData.email && !errors.email && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-600" />
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">Must use @telkomakses.co.id domain</p>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password {isEdit ? '(leave blank to keep current)' : <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required={!isEdit}
                    minLength={6}
                    className={errors.password ? 'border-red-500' : ''}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">Minimum 6 characters</p>
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="081234567890"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">Format: 08xxx or +628xxx (10-13 digits)</p>
                </div>

                {/* Role Field */}
                <div className="space-y-2">
                  <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="employee">Employee</option>
                    <option value="finance_area">Finance Area</option>
                    <option value="finance_regional">Finance Regional</option>
                    <option value="hr">HR</option>
                  </select>
                </div>
              </div>

              {/* Employment Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Employment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      placeholder="IT Department"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="position">Position</Label>
                    <Input
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder="Software Engineer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="office_location">Office Location</Label>
                    <Input
                      id="office_location"
                      name="office_location"
                      value={formData.office_location}
                      onChange={handleChange}
                      placeholder="Jakarta HQ"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area_code">Area Code</Label>
                    <Input
                      id="area_code"
                      name="area_code"
                      value={formData.area_code}
                      onChange={handleChange}
                      placeholder="JKT"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="regional">Regional</Label>
                    <Input
                      id="regional"
                      name="regional"
                      value={formData.regional}
                      onChange={handleChange}
                      placeholder="Jakarta"
                    />
                  </div>
                </div>
              </div>

              {/* Bank Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bank_name">Bank Name</Label>
                    <Input
                      id="bank_name"
                      name="bank_name"
                      value={formData.bank_name}
                      onChange={handleChange}
                      placeholder="Bank Mandiri"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bank_account">Bank Account Number</Label>
                    <Input
                      id="bank_account"
                      name="bank_account"
                      value={formData.bank_account}
                      onChange={handleChange}
                      placeholder="1234567890"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gap-2 bg-red-600 hover:bg-red-700"
                  disabled={submitting || checking.nik || checking.email}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {isEdit ? 'Update User' : 'Create User'}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}

function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default UserManagement