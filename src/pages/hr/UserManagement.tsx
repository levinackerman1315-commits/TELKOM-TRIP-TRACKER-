// import { useState, useEffect } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import { userAPI } from '@/services/api'
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { ArrowLeft, Save, Loader2 } from 'lucide-react'

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
//   bank_account: string
//   bank_name: string
// }

// const UserManagement = () => {
//   const navigate = useNavigate()
//   const { id } = useParams()
//   const isEdit = !!id

//   const [loading, setLoading] = useState(false)
//   const [submitting, setSubmitting] = useState(false)
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
//     bank_account: '',
//     bank_name: ''
//   })

//   useEffect(() => {
//     if (isEdit) {
//       fetchUser()
//     }
//   }, [id])

//   const fetchUser = async () => {
//     try {
//       setLoading(true)
//       const response = await userAPI.getById(Number(id))
//       const user = response.data.user
//       setFormData({
//         nik: user.nik || '',
//         name: user.name || '',
//         email: user.email || '',
//         password: '', // Don't populate password
//         phone: user.phone || '',
//         role: user.role || 'employee',
//         department: user.department || '',
//         position: user.position || '',
//         office_location: user.office_location || '',
//         area_code: user.area_code || '',
//         bank_account: user.bank_account || '',
//         bank_name: user.bank_name || ''
//       })
//     } catch (error) {
//       console.error('Failed to fetch user:', error)
//       alert('Failed to fetch user data')
//       navigate('/hr/dashboard')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validation
//     if (!formData.nik || !formData.name || !formData.email || !formData.role) {
//       alert('Please fill in all required fields (NIK, Name, Email, Role)')
//       return
//     }

//     if (!isEdit && !formData.password) {
//       alert('Password is required for new users')
//       return
//     }

//     if (formData.password && formData.password.length < 6) {
//       alert('Password must be at least 6 characters')
//       return
//     }

//     try {
//       setSubmitting(true)

//       // Prepare data (remove password if empty for edit)
//       const submitData = { ...formData }
//       if (isEdit && !submitData.password) {
//         delete (submitData as any).password
//       }

//       if (isEdit) {
//         await userAPI.update(Number(id), submitData)
//         alert('User updated successfully!')
//       } else {
//         await userAPI.create(submitData)
//         alert('User created successfully!')
//       }

//       navigate('/hr/dashboard')
//     } catch (error: any) {
//       console.error('Failed to save user:', error)
//       const errorMessage = error.response?.data?.message || error.message || 'Failed to save user'
//       alert(errorMessage)
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
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center gap-4">
//             <Button
//               onClick={() => navigate('/hr/dashboard')}
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
//                 <div className="space-y-2">
//                   <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
//                   <Input
//                     id="nik"
//                     name="nik"
//                     value={formData.nik}
//                     onChange={handleChange}
//                     placeholder="e.g., EMP001"
//                     required
//                     disabled={isEdit}
//                   />
//                 </div>

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

//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="john@telkomakses.co.id"
//                     required
//                   />
//                 </div>

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
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="081234567890"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
//                   <select
//                     id="role"
//                     name="role"
//                     value={formData.role}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
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
//                   onClick={() => navigate('/hr/dashboard')}
//                   variant="outline"
//                   disabled={submitting}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   className="gap-2 bg-red-600 hover:bg-red-700"
//                   disabled={submitting}
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

// export default UserManagement




import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { userAPI } from '@/services/api'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

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
  regional: string  // ✅ TAMBAH INI
  bank_account: string
  bank_name: string
}

const UserManagement = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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
    regional: '',  // ✅ TAMBAH INI
    bank_account: '',
    bank_name: ''
  })

  useEffect(() => {
    if (isEdit && id) {
      fetchUser(Number(id))  // ✅ FIX: PASS PARAMETER
    }
  }, [id, isEdit])

  const fetchUser = async (userId: number) => {
    try {
      setLoading(true)
      const response = await userAPI.getById(userId)
      
      // ✅ FIX: Ambil dari response.data.user 
      const user = response.data.user || response.data

      setFormData({
        nik: user.nik || '',
        name: user.name || '',
        email: user.email || '',
        password: '', // Don't populate password
        phone: user.phone || '',
        role: user.role || 'employee',
        department: user.department || '',
        position: user.position || '',
        office_location: user.office_location || '',
        area_code: user.area_code || '',
        regional: user.regional || '', // ✅ TAMBAH INI
        bank_account: user.bank_account || '',
        bank_name: user.bank_name || ''
      })
    } catch (error) {
      console.error('Failed to fetch user:', error)
      alert('Failed to fetch user data.')
      navigate('/hr/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.nik || !formData.name || !formData.email || !formData.role) {
      alert('Please fill in all required fields (NIK, Name, Email, Role)')
      return
    }

    if (!isEdit && !formData.password) {
      alert('Password is required for new users')
      return
    }

    if (formData.password && formData.password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }

    try {
      setSubmitting(true)

      // Prepare data (remove password if empty for edit)
      const submitData = { ...formData }
      if (isEdit && !submitData.password) {
        delete (submitData as any).password
      }

      if (isEdit) {
        await userAPI.update(Number(id), submitData)
        alert('User updated successfully!')
      } else {
        await userAPI.create(submitData)
        alert('User created successfully!')
      }

      navigate('/hr/dashboard')
    } catch (error: any) {
      console.error('Failed to save user:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save user'
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
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
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                <div className="space-y-2">
                  <Label htmlFor="nik">NIK <span className="text-red-500">*</span></Label>
                  <Input
                    id="nik"
                    name="nik"
                    value={formData.nik}
                    onChange={handleChange}
                    placeholder="e.g., EMP001"
                    required
                    disabled={isEdit}
                  />
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@telkomakses.co.id"
                    required
                  />
                </div>

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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="081234567890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role <span className="text-red-500">*</span></Label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                  {/* ✅ TAMBAH INPUT REGIONAL */}
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
                  onClick={() => navigate('/hr/dashboard')}
                  variant="outline"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gap-2 bg-red-600 hover:bg-red-700"
                  disabled={submitting}
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

export default UserManagement