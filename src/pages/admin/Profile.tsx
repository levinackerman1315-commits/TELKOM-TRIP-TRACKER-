
// // import { useState, useEffect } from 'react';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { profileAPI } from '@/services/api';
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
// // import { useToast } from '@/components/ui/use-toast';
// // import { useNavigate } from 'react-router-dom';

// // // ✅ ROLE CONFIG - Dynamic title & dashboard route
// // const ROLE_CONFIG = {
// //   hr: {
// //     title: 'HR',
// //     dashboardRoute: '/hr/dashboard'
// //   },
// //   employee: {
// //     title: 'Employee',
// //     dashboardRoute: '/employee/dashboard'
// //   },
// //   finance_area: {
// //     title: 'Finance Area',
// //     dashboardRoute: '/finance-area/dashboard'
// //   },
// //   finance_regional: {
// //     title: 'Finance Regional',
// //     dashboardRoute: '/finance-regional/dashboard'
// //   }
// // };

// // export default function Profile() {
// //   const { user, updateUser } = useAuth();
// //   const { toast } = useToast();
// //   const navigate = useNavigate();
  
// //   const [profile, setProfile] = useState<any>(null);
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

// //   // ✅ DYNAMIC ROLE CONFIG
// //   const roleConfig = ROLE_CONFIG[user?.role as keyof typeof ROLE_CONFIG] || ROLE_CONFIG.employee;

// //   // Password state
// //   const [passwordData, setPasswordData] = useState({
// //     old_password: '',
// //     new_password: '',
// //     new_password_confirmation: ''
// //   });
// //   const [showOldPassword, setShowOldPassword] = useState(false);
// //   const [showNewPassword, setShowNewPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

// //   // Profile state
// //   const [profileData, setProfileData] = useState({
// //     phone: '',
// //     bank_account: '',
// //     bank_name: ''
// //   });

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   const fetchProfile = async () => {
// //     try {
// //       const response = await profileAPI.getProfile();
// //       if (response.data.success) {
// //         setProfile(response.data.user);
// //         setProfileData({
// //           phone: response.data.user.phone || '',
// //           bank_account: response.data.user.bank_account || '',
// //           bank_name: response.data.user.bank_name || ''
// //         });
// //       }
// //     } catch (error: any) {
// //       setMessage({ 
// //         type: 'error', 
// //         text: error.response?.data?.error || 'Failed to fetch profile' 
// //       });
// //     }
// //   };

// //   const handleChangePassword = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage(null);

// //     try {
// //       const response = await profileAPI.changePassword(passwordData);
// //       if (response.data.success) {
// //         setMessage({ type: 'success', text: 'Password changed successfully' });
// //         setPasswordData({
// //           old_password: '',
// //           new_password: '',
// //           new_password_confirmation: ''
// //         });
// //         toast({
// //           title: "Success",
// //           description: "Password changed successfully",
// //           variant: "default",
// //         });
// //       }
// //     } catch (error: any) {
// //       let errorMsg = 'Failed to change password';
      
// //       if (error.response?.data) {
// //         const errorData = error.response.data;
// //         if (errorData.errors) {
// //           const errorMessages = Object.values(errorData.errors).flat();
// //           errorMsg = Array.isArray(errorMessages) ? errorMessages.join('. ') : (errorMessages as string[]).toString();
// //         } else if (errorData.message) {
// //           errorMsg = errorData.message;
// //         }
// //       }
      
// //       setMessage({ type: 'error', text: errorMsg });
// //       toast({
// //         title: "Error",
// //         description: errorMsg,
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleUpdateProfile = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setMessage(null);

// //     try {
// //       const response = await profileAPI.updateProfile(profileData);
// //       if (response.data.success) {
// //         setMessage({ type: 'success', text: 'Profile updated successfully' });
// //         if (user) {
// //           updateUser({ ...user, ...response.data.user });
// //         }
// //         toast({
// //           title: "Success",
// //           description: "Profile updated successfully",
// //           variant: "default",
// //         });
// //       }
// //     } catch (error: any) {
// //       let errorMsg = 'Failed to update profile';
      
// //       if (error.response?.data) {
// //         const errorData = error.response.data;
// //         if (errorData.errors) {
// //           const errorMessages = Object.values(errorData.errors).flat();
// //           errorMsg = Array.isArray(errorMessages) ? errorMessages.join('. ') : (errorMessages as string[]).toString();
// //         } else if (errorData.message) {
// //           errorMsg = errorData.message;
// //         }
// //       }
      
// //       setMessage({ type: 'error', text: errorMsg });
// //       toast({
// //         title: "Error",
// //         description: errorMsg,
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!profile) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <Loader2 className="h-8 w-8 animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-6 space-y-6">
// //       {/* ============================================ */}
// //       {/* ✅ DYNAMIC HEADER - WORKS FOR ALL ROLES */}
// //       {/* ============================================ */}
// //       <div className="flex items-center gap-4">
// //         <Button
// //           variant="ghost"
// //           onClick={() => navigate(roleConfig.dashboardRoute)}
// //           className="flex items-center gap-2"
// //         >
// //           <ArrowLeft className="w-4 h-4" />
// //           Back to Dashboard
// //         </Button>
// //         <div className="flex-1">
// //           <h1 className="text-3xl font-bold">
// //             Profile Settings - {roleConfig.title}
// //           </h1>
// //           <p className="text-muted-foreground">Manage your account information and security</p>
// //         </div>
// //       </div>

// //       {/* Success/Error Message */}
// //       {message && (
// //         <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
// //           {message.type === 'success' ? 
// //             <CheckCircle2 className="h-4 w-4" /> : 
// //             <AlertCircle className="h-4 w-4" />
// //           }
// //           <AlertDescription>{message.text}</AlertDescription>
// //         </Alert>
// //       )}

// //       <div className="grid gap-6 md:grid-cols-2">
// //         {/* SECTION 1: PERSONAL INFORMATION */}
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Personal Information</CardTitle>
// //             <CardDescription>Your account details (read-only)</CardDescription>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <div className="grid grid-cols-2 gap-4">
// //               <div>
// //                 <Label>NIK</Label>
// //                 <Input value={profile.nik} readOnly className="bg-gray-50" />
// //               </div>
// //               <div>
// //                 <Label>Name</Label>
// //                 <Input value={profile.name} readOnly className="bg-gray-50" />
// //               </div>
// //               <div>
// //                 <Label>Email</Label>
// //                 <Input value={profile.email} readOnly className="bg-gray-50" />
// //               </div>
// //               <div>
// //                 <Label>Role</Label>
// //                 <Input 
// //                   value={profile.role?.replace('_', ' ').toUpperCase()} 
// //                   readOnly 
// //                   className="bg-gray-50" 
// //                 />
// //               </div>
// //               <div>
// //                 <Label>Department</Label>
// //                 <Input value={profile.department || 'N/A'} readOnly className="bg-gray-50" />
// //               </div>
// //               <div>
// //                 <Label>Position</Label>
// //                 <Input value={profile.position || 'N/A'} readOnly className="bg-gray-50" />
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* SECTION 2: CHANGE PASSWORD */}
// //         <Card>
// //           <CardHeader>
// //             <CardTitle>Change Password</CardTitle>
// //             <CardDescription>
// //               Password must be at least 8 characters with uppercase, lowercase, and numbers
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleChangePassword} className="space-y-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="old_password">Current Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="old_password"
// //                     type={showOldPassword ? 'text' : 'password'}
// //                     value={passwordData.old_password}
// //                     onChange={(e) => setPasswordData({...passwordData, old_password: e.target.value})}
// //                     required
// //                   />
// //                   <Button
// //                     type="button"
// //                     variant="ghost"
// //                     size="sm"
// //                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
// //                     onClick={() => setShowOldPassword(!showOldPassword)}
// //                   >
// //                     {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                   </Button>
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="new_password">New Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="new_password"
// //                     type={showNewPassword ? 'text' : 'password'}
// //                     value={passwordData.new_password}
// //                     onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
// //                     required
// //                     minLength={8}
// //                   />
// //                   <Button
// //                     type="button"
// //                     variant="ghost"
// //                     size="sm"
// //                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
// //                     onClick={() => setShowNewPassword(!showNewPassword)}
// //                   >
// //                     {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                   </Button>
// //                 </div>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="confirm_password">Confirm New Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="confirm_password"
// //                     type={showConfirmPassword ? 'text' : 'password'}
// //                     value={passwordData.new_password_confirmation}
// //                     onChange={(e) => setPasswordData({...passwordData, new_password_confirmation: e.target.value})}
// //                     required
// //                     minLength={8}
// //                   />
// //                   <Button
// //                     type="button"
// //                     variant="ghost"
// //                     size="sm"
// //                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
// //                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                   >
// //                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
// //                   </Button>
// //                 </div>
// //               </div>

// //               <Button type="submit" disabled={loading} className="w-full">
// //                 {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
// //                 Change Password
// //               </Button>
// //             </form>
// //           </CardContent>
// //         </Card>

// //         {/* SECTION 3: CONTACT & BANK INFORMATION */}
// //         <Card className="md:col-span-2">
// //           <CardHeader>
// //             <CardTitle>Contact & Bank Information</CardTitle>
// //             <CardDescription>Update your phone number and bank details</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <form onSubmit={handleUpdateProfile} className="space-y-4">
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <div className="space-y-2">
// //                   <Label htmlFor="phone">Phone Number</Label>
// //                   <Input
// //                     id="phone"
// //                     value={profileData.phone}
// //                     onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
// //                     placeholder="08123456789 or +628123456789"
// //                   />
// //                 </div>
                
// //                 <div className="space-y-2">
// //                   <Label htmlFor="bank_account">Bank Account Number</Label>
// //                   <Input
// //                     id="bank_account"
// //                     value={profileData.bank_account}
// //                     onChange={(e) => setProfileData({...profileData, bank_account: e.target.value})}
// //                     placeholder="1234567890"
// //                   />
// //                 </div>
                
// //                 <div className="space-y-2">
// //                   <Label htmlFor="bank_name">Bank Name</Label>
// //                   <Input
// //                     id="bank_name"
// //                     value={profileData.bank_name}
// //                     onChange={(e) => setProfileData({...profileData, bank_name: e.target.value})}
// //                     placeholder="BCA, Mandiri, BNI, etc."
// //                   />
// //                 </div>
// //               </div>

// //               <Button type="submit" disabled={loading}>
// //                 {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
// //                 Update Profile
// //               </Button>
// //             </form>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // }




// import { useState, useEffect } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { profileAPI } from '@/services/api';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
// import { useToast } from '@/components/ui/use-toast';
// import { useNavigate } from 'react-router-dom';

// // ✅ ROLE CONFIG - Dynamic title & dashboard route
// const ROLE_CONFIG = {
//   hr: {
//     title: 'HR',
//     dashboardRoute: '/hr/dashboard'
//   },
//   employee: {
//     title: 'Employee',
//     dashboardRoute: '/employee/dashboard'
//   },
//   finance_area: {
//     title: 'Finance Area',
//     dashboardRoute: '/finance-area/dashboard'
//   },
//   finance_regional: {
//     title: 'Finance Regional',
//     dashboardRoute: '/finance-regional/dashboard'
//   }
// };

// export default function Profile() {
//   const { user, updateUser } = useAuth();
//   const { toast } = useToast();
//   const navigate = useNavigate();
  
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

//   // ✅ DYNAMIC ROLE CONFIG
//   const roleConfig = ROLE_CONFIG[user?.role as keyof typeof ROLE_CONFIG] || ROLE_CONFIG.employee;

//   // Password state
//   const [passwordData, setPasswordData] = useState({
//     old_password: '',
//     new_password: '',
//     new_password_confirmation: ''
//   });
//   const [showOldPassword, setShowOldPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Profile state
//   const [profileData, setProfileData] = useState({
//     phone: '',
//     bank_account: '',
//     bank_name: ''
//   });

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await profileAPI.getProfile();
//       if (response.data.success) {
//         setProfile(response.data.user);
//         setProfileData({
//           phone: response.data.user.phone || '',
//           bank_account: response.data.user.bank_account || '',
//           bank_name: response.data.user.bank_name || ''
//         });
//       }
//     } catch (error: any) {
//       setMessage({ 
//         type: 'error', 
//         text: error.response?.data?.error || 'Failed to fetch profile' 
//       });
//     }
//   };

//   // ✅ NEW: Validate password before submit
//   const validatePassword = () => {
//     // Check if passwords match
//     if (passwordData.new_password !== passwordData.new_password_confirmation) {
//       setMessage({ 
//         type: 'error', 
//         text: 'New password and confirmation do not match' 
//       });
//       toast({
//         title: "Error",
//         description: "New password and confirmation do not match",
//         variant: "destructive",
//       });
//       return false;
//     }

//     // Check password strength (must match backend rules)
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
//     if (!passwordRegex.test(passwordData.new_password)) {
//       setMessage({ 
//         type: 'error', 
//         text: 'Password must be at least 8 characters with uppercase, lowercase, and numbers' 
//       });
//       toast({
//         title: "Error",
//         description: "Password must be at least 8 characters with uppercase, lowercase, and numbers",
//         variant: "destructive",
//       });
//       return false;
//     }

//     // Check if new password is same as old password
//     if (passwordData.old_password === passwordData.new_password) {
//       setMessage({ 
//         type: 'error', 
//         text: 'New password must be different from current password' 
//       });
//       toast({
//         title: "Error",
//         description: "New password must be different from current password",
//         variant: "destructive",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleChangePassword = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // ✅ Validate before submitting
//     if (!validatePassword()) {
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await profileAPI.changePassword(passwordData);
//       if (response.data.success) {
//         setMessage({ type: 'success', text: 'Password changed successfully' });
//         setPasswordData({
//           old_password: '',
//           new_password: '',
//           new_password_confirmation: ''
//         });
//         toast({
//           title: "Success",
//           description: "Password changed successfully",
//           variant: "default",
//         });
//       }
//     } catch (error: any) {
//       let errorMsg = 'Failed to change password';
      
//       if (error.response?.data) {
//         const errorData = error.response.data;
//         if (errorData.errors) {
//           const errorMessages = Object.values(errorData.errors).flat();
//           errorMsg = Array.isArray(errorMessages) ? errorMessages.join('. ') : String(errorMessages);
//         } else if (errorData.message) {
//           errorMsg = errorData.message;
//         }
//       }
      
//       setMessage({ type: 'error', text: errorMsg });
//       toast({
//         title: "Error",
//         description: errorMsg,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ NEW: Validate profile data before submit
//   const validateProfile = () => {
//     // Phone validation
//     if (profileData.phone && profileData.phone.trim() !== '') {
//       const phoneRegex = /^[0-9+\-\s()]+$/;
//       if (!phoneRegex.test(profileData.phone)) {
//         setMessage({ 
//           type: 'error', 
//           text: 'Phone number format is invalid. Use numbers, +, -, spaces, or ()' 
//         });
//         toast({
//           title: "Error",
//           description: "Phone number format is invalid",
//           variant: "destructive",
//         });
//         return false;
//       }

//       if (profileData.phone.length > 20) {
//         setMessage({ 
//           type: 'error', 
//           text: 'Phone number cannot exceed 20 characters' 
//         });
//         toast({
//           title: "Error",
//           description: "Phone number cannot exceed 20 characters",
//           variant: "destructive",
//         });
//         return false;
//       }
//     }

//     // Bank account validation
//     if (profileData.bank_account && profileData.bank_account.trim() !== '') {
//       const bankAccountRegex = /^[0-9]+$/;
//       if (!bankAccountRegex.test(profileData.bank_account)) {
//         setMessage({ 
//           type: 'error', 
//           text: 'Bank account must contain only numbers' 
//         });
//         toast({
//           title: "Error",
//           description: "Bank account must contain only numbers",
//           variant: "destructive",
//         });
//         return false;
//       }

//       if (profileData.bank_account.length > 30) {
//         setMessage({ 
//           type: 'error', 
//           text: 'Bank account cannot exceed 30 characters' 
//         });
//         toast({
//           title: "Error",
//           description: "Bank account cannot exceed 30 characters",
//           variant: "destructive",
//         });
//         return false;
//       }
//     }

//     // Bank name validation
//     if (profileData.bank_name && profileData.bank_name.length > 50) {
//       setMessage({ 
//         type: 'error', 
//         text: 'Bank name cannot exceed 50 characters' 
//       });
//       toast({
//         title: "Error",
//         description: "Bank name cannot exceed 50 characters",
//         variant: "destructive",
//       });
//       return false;
//     }

//     return true;
//   };

//   const handleUpdateProfile = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // ✅ Validate before submitting
//     if (!validateProfile()) {
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const response = await profileAPI.updateProfile(profileData);
//       if (response.data.success) {
//         setMessage({ type: 'success', text: 'Profile updated successfully' });
//         if (user) {
//           updateUser({ ...user, ...response.data.user });
//         }
//         toast({
//           title: "Success",
//           description: "Profile updated successfully",
//           variant: "default",
//         });
//       }
//     } catch (error: any) {
//       let errorMsg = 'Failed to update profile';
      
//       if (error.response?.data) {
//         const errorData = error.response.data;
//         if (errorData.errors) {
//           const errorMessages = Object.values(errorData.errors).flat();
//           errorMsg = Array.isArray(errorMessages) ? errorMessages.join('. ') : String(errorMessages);
//         } else if (errorData.message) {
//           errorMsg = errorData.message;
//         }
//       }
      
//       setMessage({ type: 'error', text: errorMsg });
//       toast({
//         title: "Error",
//         description: errorMsg,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!profile) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-6 space-y-6">
//       {/* ============================================ */}
//       {/* ✅ DYNAMIC HEADER - WORKS FOR ALL ROLES */}
//       {/* ============================================ */}
//       <div className="flex flex-col md:flex-row md:items-center gap-4">
//         <Button
//           variant="ghost"
//           onClick={() => navigate(roleConfig.dashboardRoute)}
//           className="flex items-center gap-2 self-start"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to Dashboard
//         </Button>
//         <div className="flex-1">
//           <h1 className="text-2xl md:text-3xl font-bold">
//             Profile Settings - {roleConfig.title}
//           </h1>
//           <p className="text-sm md:text-base text-muted-foreground">Manage your account information and security</p>
//         </div>
//       </div>

//       {/* Success/Error Message */}
//       {message && (
//         <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
//           {message.type === 'success' ? 
//             <CheckCircle2 className="h-4 w-4" /> : 
//             <AlertCircle className="h-4 w-4" />
//           }
//           <AlertDescription>{message.text}</AlertDescription>
//         </Alert>
//       )}

//       <div className="grid gap-6 md:grid-cols-2">
//         {/* SECTION 1: PERSONAL INFORMATION */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>Your account details (read-only)</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <Label className="text-xs md:text-sm">NIK</Label>
//                 <Input value={profile.nik} readOnly className="bg-gray-50" />
//               </div>
//               <div>
//                 <Label className="text-xs md:text-sm">Name</Label>
//                 <Input value={profile.name} readOnly className="bg-gray-50" />
//               </div>
//               <div className="sm:col-span-2">
//                 <Label className="text-xs md:text-sm">Email</Label>
//                 <Input value={profile.email} readOnly className="bg-gray-50" />
//               </div>
//               <div>
//                 <Label className="text-xs md:text-sm">Role</Label>
//                 <Input 
//                   value={profile.role?.replace('_', ' ').toUpperCase()} 
//                   readOnly 
//                   className="bg-gray-50" 
//                 />
//               </div>
//               <div>
//                 <Label className="text-xs md:text-sm">Department</Label>
//                 <Input value={profile.department || 'N/A'} readOnly className="bg-gray-50" />
//               </div>
//               <div className="sm:col-span-2">
//                 <Label className="text-xs md:text-sm">Position</Label>
//                 <Input value={profile.position || 'N/A'} readOnly className="bg-gray-50" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* SECTION 2: CHANGE PASSWORD */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Change Password</CardTitle>
//             <CardDescription>
//               Password must be at least 8 characters with uppercase, lowercase, and numbers
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleChangePassword} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="old_password" className="text-xs md:text-sm">Current Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="old_password"
//                     type={showOldPassword ? 'text' : 'password'}
//                     value={passwordData.old_password}
//                     onChange={(e) => setPasswordData({...passwordData, old_password: e.target.value})}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowOldPassword(!showOldPassword)}
//                   >
//                     {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="new_password" className="text-xs md:text-sm">New Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="new_password"
//                     type={showNewPassword ? 'text' : 'password'}
//                     value={passwordData.new_password}
//                     onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
//                     required
//                     minLength={8}
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                   >
//                     {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="confirm_password" className="text-xs md:text-sm">Confirm New Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="confirm_password"
//                     type={showConfirmPassword ? 'text' : 'password'}
//                     value={passwordData.new_password_confirmation}
//                     onChange={(e) => setPasswordData({...passwordData, new_password_confirmation: e.target.value})}
//                     required
//                     minLength={8}
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </Button>
//                 </div>
//               </div>

//               <Button type="submit" disabled={loading} className="w-full">
//                 {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
//                 Change Password
//               </Button>
//             </form>
//           </CardContent>
//         </Card>

//         {/* SECTION 3: CONTACT & BANK INFORMATION */}
//         <Card className="md:col-span-2">
//           <CardHeader>
//             <CardTitle>Contact & Bank Information</CardTitle>
//             <CardDescription>Update your phone number and bank details</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleUpdateProfile} className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number</Label>
//                   <Input
//                     id="phone"
//                     value={profileData.phone}
//                     onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
//                     placeholder="08123456789 or +628123456789"
//                     maxLength={20}
//                   />
//                   <p className="text-xs text-muted-foreground">Max 20 characters</p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="bank_account" className="text-xs md:text-sm">Bank Account Number</Label>
//                   <Input
//                     id="bank_account"
//                     value={profileData.bank_account}
//                     onChange={(e) => setProfileData({...profileData, bank_account: e.target.value})}
//                     placeholder="1234567890"
//                     maxLength={30}
//                   />
//                   <p className="text-xs text-muted-foreground">Numbers only, max 30 digits</p>
//                 </div>
                
//                 <div className="space-y-2">
//                   <Label htmlFor="bank_name" className="text-xs md:text-sm">Bank Name</Label>
//                   <Input
//                     id="bank_name"
//                     value={profileData.bank_name}
//                     onChange={(e) => setProfileData({...profileData, bank_name: e.target.value})}
//                     placeholder="BCA, Mandiri, BNI, etc."
//                     maxLength={50}
//                   />
//                   <p className="text-xs text-muted-foreground">Max 50 characters</p>
//                 </div>
//               </div>

//               <Button type="submit" disabled={loading} className="w-full md:w-auto">
//                 {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
//                 Update Profile
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }





import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { profileAPI } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// ✅ ROLE CONFIG - Dynamic title & dashboard route
const ROLE_CONFIG = {
  hr: {
    title: 'HR',
    dashboardRoute: '/hr/dashboard'
  },
  employee: {
    title: 'Employee',
    dashboardRoute: '/employee/dashboard'
  },
  finance_area: {
    title: 'Finance Area',
    dashboardRoute: '/finance-area/dashboard'
  },
  finance_regional: {
    title: 'Finance Regional',
    dashboardRoute: '/finance-regional/dashboard'
  }
};

export default function Profile() {
  const { user, updateUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // ✅ DYNAMIC ROLE CONFIG
  const roleConfig = ROLE_CONFIG[user?.role as keyof typeof ROLE_CONFIG] || ROLE_CONFIG.employee;

  // Password state
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Profile state
  const [profileData, setProfileData] = useState({
    phone: '',
    bank_account: '',
    bank_name: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await profileAPI.getProfile();
      if (response.data.success) {
        setProfile(response.data.user);
        setProfileData({
          phone: response.data.user.phone || '',
          bank_account: response.data.user.bank_account || '',
          bank_name: response.data.user.bank_name || ''
        });
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.error || 'Failed to fetch profile' 
      });
    }
  };

  // ✅ NEW: Validate password before submit
  const validatePassword = () => {
    // Check if passwords match
    if (passwordData.new_password !== passwordData.new_password_confirmation) {
      setMessage({ 
        type: 'error', 
        text: 'New password and confirmation do not match' 
      });
      toast({
        title: "Error",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return false;
    }

    // Check password strength (must match backend rules)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(passwordData.new_password)) {
      setMessage({ 
        type: 'error', 
        text: 'Password must be at least 8 characters with uppercase, lowercase, and numbers' 
      });
      toast({
        title: "Error",
        description: "Password must be at least 8 characters with uppercase, lowercase, and numbers",
        variant: "destructive",
      });
      return false;
    }

    // Check if new password is same as old password
    if (passwordData.old_password === passwordData.new_password) {
      setMessage({ 
        type: 'error', 
        text: 'New password must be different from current password' 
      });
      toast({
        title: "Error",
        description: "New password must be different from current password",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Validate before submitting
    if (!validatePassword()) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await profileAPI.changePassword(passwordData);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Password changed successfully' });
        setPasswordData({
          old_password: '',
          new_password: '',
          new_password_confirmation: ''
        });
        toast({
          title: "Success",
          description: "Password changed successfully",
          variant: "default",
        });
      }
    } catch (error: any) {
      let errorMsg = 'Failed to change password';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          errorMsg = Array.isArray(errorMessages) ? errorMessages.join('. ') : String(errorMessages);
        } else if (errorData.message) {
          errorMsg = errorData.message;
        }
      }
      
      setMessage({ type: 'error', text: errorMsg });
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Validate profile data before submit
  const validateProfile = () => {
    // Phone validation
    if (profileData.phone && profileData.phone.trim() !== '') {
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(profileData.phone)) {
        setMessage({ 
          type: 'error', 
          text: 'Phone number format is invalid. Use numbers, +, -, spaces, or ()' 
        });
        toast({
          title: "Error",
          description: "Phone number format is invalid",
          variant: "destructive",
        });
        return false;
      }

      if (profileData.phone.length > 20) {
        setMessage({ 
          type: 'error', 
          text: 'Phone number cannot exceed 20 characters' 
        });
        toast({
          title: "Error",
          description: "Phone number cannot exceed 20 characters",
          variant: "destructive",
        });
        return false;
      }
    }

    // Bank account validation
    if (profileData.bank_account && profileData.bank_account.trim() !== '') {
      const bankAccountRegex = /^[0-9]+$/;
      if (!bankAccountRegex.test(profileData.bank_account)) {
        setMessage({ 
          type: 'error', 
          text: 'Bank account must contain only numbers' 
        });
        toast({
          title: "Error",
          description: "Bank account must contain only numbers",
          variant: "destructive",
        });
        return false;
      }

      if (profileData.bank_account.length > 30) {
        setMessage({ 
          type: 'error', 
          text: 'Bank account cannot exceed 30 characters' 
        });
        toast({
          title: "Error",
          description: "Bank account cannot exceed 30 characters",
          variant: "destructive",
        });
        return false;
      }
    }

    // Bank name validation
    if (profileData.bank_name && profileData.bank_name.length > 50) {
      setMessage({ 
        type: 'error', 
        text: 'Bank name cannot exceed 50 characters' 
      });
      toast({
        title: "Error",
        description: "Bank name cannot exceed 50 characters",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Validate before submitting
    if (!validateProfile()) {
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await profileAPI.updateProfile(profileData);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        if (user) {
          updateUser({ ...user, ...response.data.user });
        }
        toast({
          title: "Success",
          description: "Profile updated successfully",
          variant: "default",
        });
      }
    } catch (error: any) {
      let errorMsg = 'Failed to update profile';
      
      if (error.response?.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat();
          errorMsg = Array.isArray(errorMessages) ? errorMessages.join('. ') : String(errorMessages);
        } else if (errorData.message) {
          errorMsg = errorData.message;
        }
      }
      
      setMessage({ type: 'error', text: errorMsg });
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATED: Loading Screen - ONLY THIS SECTION CHANGED
  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              Loading Profile - {roleConfig.title}
            </p>
            <p className="text-sm text-gray-500 mt-1">Please wait...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* ============================================ */}
      {/* ✅ DYNAMIC HEADER - WORKS FOR ALL ROLES */}
      {/* ============================================ */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate(roleConfig.dashboardRoute)}
          className="flex items-center gap-2 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold">
            Profile Settings - {roleConfig.title}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage your account information and security</p>
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
          {message.type === 'success' ? 
            <CheckCircle2 className="h-4 w-4" /> : 
            <AlertCircle className="h-4 w-4" />
          }
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* SECTION 1: PERSONAL INFORMATION */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your account details (read-only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs md:text-sm">NIK</Label>
                <Input value={profile.nik} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Name</Label>
                <Input value={profile.name} readOnly className="bg-gray-50" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs md:text-sm">Email</Label>
                <Input value={profile.email} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Role</Label>
                <Input 
                  value={profile.role?.replace('_', ' ').toUpperCase()} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              <div>
                <Label className="text-xs md:text-sm">Department</Label>
                <Input value={profile.department || 'N/A'} readOnly className="bg-gray-50" />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-xs md:text-sm">Position</Label>
                <Input value={profile.position || 'N/A'} readOnly className="bg-gray-50" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: CHANGE PASSWORD */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Password must be at least 8 characters with uppercase, lowercase, and numbers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="old_password" className="text-xs md:text-sm">Current Password</Label>
                <div className="relative">
                  <Input
                    id="old_password"
                    type={showOldPassword ? 'text' : 'password'}
                    value={passwordData.old_password}
                    onChange={(e) => setPasswordData({...passwordData, old_password: e.target.value})}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password" className="text-xs md:text-sm">New Password</Label>
                <div className="relative">
                  <Input
                    id="new_password"
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.new_password}
                    onChange={(e) => setPasswordData({...passwordData, new_password: e.target.value})}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm_password" className="text-xs md:text-sm">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.new_password_confirmation}
                    onChange={(e) => setPasswordData({...passwordData, new_password_confirmation: e.target.value})}
                    required
                    minLength={8}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* SECTION 3: CONTACT & BANK INFORMATION */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Contact & Bank Information</CardTitle>
            <CardDescription>Update your phone number and bank details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs md:text-sm">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    placeholder="08123456789 or +628123456789"
                    maxLength={20}
                  />
                  <p className="text-xs text-muted-foreground">Max 20 characters</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank_account" className="text-xs md:text-sm">Bank Account Number</Label>
                  <Input
                    id="bank_account"
                    value={profileData.bank_account}
                    onChange={(e) => setProfileData({...profileData, bank_account: e.target.value})}
                    placeholder="1234567890"
                    maxLength={30}
                  />
                  <p className="text-xs text-muted-foreground">Numbers only, max 30 digits</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bank_name" className="text-xs md:text-sm">Bank Name</Label>
                  <Input
                    id="bank_name"
                    value={profileData.bank_name}
                    onChange={(e) => setProfileData({...profileData, bank_name: e.target.value})}
                    placeholder="BCA, Mandiri, BNI, etc."
                    maxLength={50}
                  />
                  <p className="text-xs text-muted-foreground">Max 50 characters</p>
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}