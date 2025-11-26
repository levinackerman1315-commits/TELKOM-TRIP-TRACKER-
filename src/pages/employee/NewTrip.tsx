// // // // import { useState, FormEvent } from 'react';
// // // // import { useNavigate, Link } from 'react-router-dom';
// // // // import { tripAPI } from '@/services/api';
// // // // import { useAuth } from '@/contexts/AuthContext';

// // // // export default function NewTrip() {
// // // //   const { user } = useAuth();
// // // //   const navigate = useNavigate();

// // // //   const [formData, setFormData] = useState({
// // // //     destination: '',
// // // //     purpose: '',
// // // //     start_date: '',
// // // //     end_date: '',
// // // //     estimated_budget: ''
// // // //   });

// // // //   const [errors, setErrors] = useState<Record<string, string>>({});
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [successMessage, setSuccessMessage] = useState('');

// // // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData(prev => ({
// // // //       ...prev,
// // // //       [name]: value
// // // //     }));
// // // //     // Clear error when user types
// // // //     if (errors[name]) {
// // // //       setErrors(prev => ({
// // // //         ...prev,
// // // //         [name]: ''
// // // //       }));
// // // //     }
// // // //   };

// // // //   const validateForm = () => {
// // // //     const newErrors: Record<string, string> = {};

// // // //     if (!formData.destination.trim()) {
// // // //       newErrors.destination = 'Destination is required';
// // // //     }

// // // //     if (!formData.purpose.trim()) {
// // // //       newErrors.purpose = 'Purpose is required';
// // // //     }

// // // //     if (!formData.start_date) {
// // // //       newErrors.start_date = 'Start date is required';
// // // //     }

// // // //     if (!formData.end_date) {
// // // //       newErrors.end_date = 'End date is required';
// // // //     }

// // // //     if (formData.start_date && formData.end_date) {
// // // //       const startDate = new Date(formData.start_date);
// // // //       const endDate = new Date(formData.end_date);
      
// // // //       if (endDate < startDate) {
// // // //         newErrors.end_date = 'End date must be after start date';
// // // //       }

// // // //       // Check if start date is not in the past
// // // //       const today = new Date();
// // // //       today.setHours(0, 0, 0, 0);
// // // //       if (startDate < today) {
// // // //         newErrors.start_date = 'Start date cannot be in the past';
// // // //       }
// // // //     }

// // // //     if (formData.estimated_budget && parseFloat(formData.estimated_budget) <= 0) {
// // // //       newErrors.estimated_budget = 'Budget must be greater than 0';
// // // //     }

// // // //     setErrors(newErrors);
// // // //     return Object.keys(newErrors).length === 0;
// // // //   };

// // // //   const handleSubmit = async (e: FormEvent) => {
// // // //     e.preventDefault();
    
// // // //     if (!validateForm()) {
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);
// // // //     setSuccessMessage('');

// // // //     try {
// // // //       const payload = {
// // // //         destination: formData.destination,
// // // //         purpose: formData.purpose,
// // // //         start_date: formData.start_date,
// // // //         end_date: formData.end_date,
// // // //         estimated_budget: formData.estimated_budget ? parseFloat(formData.estimated_budget) : null
// // // //       };

// // // //       const response = await tripAPI.create(payload);
      
// // // //       setSuccessMessage('Trip created successfully!');
      
// // // //       // Redirect to trip detail after 1.5 seconds
// // // //       setTimeout(() => {
// // // //         navigate(`/employee/trips/${response.data.data.trip_id}`);
// // // //       }, 1500);

// // // //     } catch (error: any) {
// // // //       console.error('Failed to create trip:', error);
      
// // // //       if (error.response?.data?.errors) {
// // // //         setErrors(error.response.data.errors);
// // // //       } else {
// // // //         setErrors({
// // // //           submit: error.response?.data?.message || 'Failed to create trip. Please try again.'
// // // //         });
// // // //       }
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const calculateDuration = () => {
// // // //     if (formData.start_date && formData.end_date) {
// // // //       const start = new Date(formData.start_date);
// // // //       const end = new Date(formData.end_date);
// // // //       const diffTime = Math.abs(end.getTime() - start.getTime());
// // // //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
// // // //       return diffDays;
// // // //     }
// // // //     return 0;
// // // //   };

// // // //   const duration = calculateDuration();

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       {/* Header */}
// // // //       <div className="bg-white shadow">
// // // //         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
// // // //           <div className="flex items-center justify-between">
// // // //             <div>
// // // //               <h1 className="text-3xl font-bold text-gray-900">Create New Trip</h1>
// // // //               <p className="mt-1 text-sm text-gray-500">
// // // //                 Fill in the details for your business trip
// // // //               </p>
// // // //             </div>
// // // //             <Link
// // // //               to="/employee/dashboard"
// // // //               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
// // // //             >
// // // //               ← Back
// // // //             </Link>
// // // //           </div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// // // //         {/* Success Message */}
// // // //         {successMessage && (
// // // //           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
// // // //             <div className="flex items-center">
// // // //               <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
// // // //                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
// // // //               </svg>
// // // //               <p className="text-sm text-green-800 font-medium">{successMessage}</p>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Error Message */}
// // // //         {errors.submit && (
// // // //           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
// // // //             <p className="text-sm text-red-600">{errors.submit}</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Form */}
// // // //         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
// // // //           <div className="p-6 space-y-6">
// // // //             {/* Employee Info */}
// // // //             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
// // // //               <h3 className="font-semibold text-blue-900 mb-2">Employee Information</h3>
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // // //                 <div>
// // // //                   <span className="text-blue-700">Name:</span>
// // // //                   <span className="ml-2 text-blue-900 font-medium">{user?.name}</span>
// // // //                 </div>
// // // //                 <div>
// // // //                   <span className="text-blue-700">NIK:</span>
// // // //                   <span className="ml-2 text-blue-900 font-medium">{user?.nik}</span>
// // // //                 </div>
// // // //                 <div>
// // // //                   <span className="text-blue-700">Department:</span>
// // // //                   <span className="ml-2 text-blue-900 font-medium">{user?.department}</span>
// // // //                 </div>
// // // //                 <div>
// // // //                   <span className="text-blue-700">Position:</span>
// // // //                   <span className="ml-2 text-blue-900 font-medium">{user?.position}</span>
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {/* Destination */}
// // // //             <div>
// // // //               <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Destination <span className="text-red-500">*</span>
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 id="destination"
// // // //                 name="destination"
// // // //                 value={formData.destination}
// // // //                 onChange={handleChange}
// // // //                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
// // // //                   errors.destination ? 'border-red-500' : 'border-gray-300'
// // // //                 }`}
// // // //                 placeholder="e.g., Jakarta, Surabaya, Bandung"
// // // //                 disabled={isLoading}
// // // //               />
// // // //               {errors.destination && (
// // // //                 <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
// // // //               )}
// // // //             </div>

// // // //             {/* Purpose */}
// // // //             <div>
// // // //               <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Purpose of Trip <span className="text-red-500">*</span>
// // // //               </label>
// // // //               <textarea
// // // //                 id="purpose"
// // // //                 name="purpose"
// // // //                 value={formData.purpose}
// // // //                 onChange={handleChange}
// // // //                 rows={4}
// // // //                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
// // // //                   errors.purpose ? 'border-red-500' : 'border-gray-300'
// // // //                 }`}
// // // //                 placeholder="Describe the purpose of your business trip..."
// // // //                 disabled={isLoading}
// // // //               />
// // // //               {errors.purpose && (
// // // //                 <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
// // // //               )}
// // // //             </div>

// // // //             {/* Dates */}
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //               <div>
// // // //                 <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                   Start Date <span className="text-red-500">*</span>
// // // //                 </label>
// // // //                 <input
// // // //                   type="date"
// // // //                   id="start_date"
// // // //                   name="start_date"
// // // //                   value={formData.start_date}
// // // //                   onChange={handleChange}
// // // //                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
// // // //                     errors.start_date ? 'border-red-500' : 'border-gray-300'
// // // //                   }`}
// // // //                   disabled={isLoading}
// // // //                 />
// // // //                 {errors.start_date && (
// // // //                   <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
// // // //                 )}
// // // //               </div>

// // // //               <div>
// // // //                 <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                   End Date <span className="text-red-500">*</span>
// // // //                 </label>
// // // //                 <input
// // // //                   type="date"
// // // //                   id="end_date"
// // // //                   name="end_date"
// // // //                   value={formData.end_date}
// // // //                   onChange={handleChange}
// // // //                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
// // // //                     errors.end_date ? 'border-red-500' : 'border-gray-300'
// // // //                   }`}
// // // //                   disabled={isLoading}
// // // //                 />
// // // //                 {errors.end_date && (
// // // //                   <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             {/* Duration Display */}
// // // //             {duration > 0 && (
// // // //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
// // // //                 <p className="text-sm text-gray-700">
// // // //                   <span className="font-semibold">Trip Duration:</span>
// // // //                   <span className="ml-2 text-blue-600 font-bold">{duration} day{duration > 1 ? 's' : ''}</span>
// // // //                 </p>
// // // //               </div>
// // // //             )}

// // // //             {/* Estimated Budget */}
// // // //             <div>
// // // //               <label htmlFor="estimated_budget" className="block text-sm font-medium text-gray-700 mb-2">
// // // //                 Estimated Budget (Optional)
// // // //               </label>
// // // //               <div className="relative">
// // // //                 <span className="absolute left-4 top-3 text-gray-500">Rp</span>
// // // //                 <input
// // // //                   type="number"
// // // //                   id="estimated_budget"
// // // //                   name="estimated_budget"
// // // //                   value={formData.estimated_budget}
// // // //                   onChange={handleChange}
// // // //                   className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
// // // //                     errors.estimated_budget ? 'border-red-500' : 'border-gray-300'
// // // //                   }`}
// // // //                   placeholder="0"
// // // //                   min="0"
// // // //                   step="1000"
// // // //                   disabled={isLoading}
// // // //                 />
// // // //               </div>
// // // //               {errors.estimated_budget && (
// // // //                 <p className="mt-1 text-sm text-red-600">{errors.estimated_budget}</p>
// // // //               )}
// // // //               <p className="mt-1 text-xs text-gray-500">
// // // //                 This is just an estimate. You can request advance (panjar) after creating the trip.
// // // //               </p>
// // // //             </div>
// // // //           </div>

// // // //           {/* Form Actions */}
// // // //           <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex items-center justify-between border-t border-gray-200">
// // // //             <Link
// // // //               to="/employee/dashboard"
// // // //               className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
// // // //             >
// // // //               Cancel
// // // //             </Link>
// // // //             <button
// // // //               type="submit"
// // // //               disabled={isLoading}
// // // //               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
// // // //             >
// // // //               {isLoading ? (
// // // //                 <span className="flex items-center">
// // // //                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
// // // //                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
// // // //                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
// // // //                   </svg>
// // // //                   Creating Trip...
// // // //                 </span>
// // // //               ) : (
// // // //                 'Create Trip'
// // // //               )}
// // // //             </button>
// // // //           </div>
// // // //         </form>

// // // //         {/* Help Text */}
// // // //         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
// // // //           <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
// // // //             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
// // // //               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
// // // //             </svg>
// // // //             What happens next?
// // // //           </h4>
// // // //           <ul className="text-sm text-blue-800 space-y-1 ml-7">
// // // //             <li>• Your trip will be created with status "Active"</li>
// // // //             <li>• You can request advance (panjar) for initial or additional funds</li>
// // // //             <li>• Upload receipts/bon during your trip</li>
// // // //             <li>• Submit for review when trip is completed</li>
// // // //             <li>• Settlement will be processed by Finance</li>
// // // //           </ul>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }


// // // import { useState, FormEvent } from 'react'
// // // import { useNavigate, Link } from 'react-router-dom'
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { Badge } from "@/components/ui/badge"
// // // import { 
// // //   ArrowLeft, 
// // //   MapPin, 
// // //   FileText, 
// // //   Calendar, 
// // //   DollarSign,
// // //   Info,
// // //   CheckCircle2,
// // //   AlertCircle,
// // //   Loader2
// // // } from 'lucide-react'
// // // import { tripAPI } from '@/services/api'
// // // import { useAuth } from '@/contexts/AuthContext'

// // // export default function NewTrip() {
// // //   const { user } = useAuth()
// // //   const navigate = useNavigate()

// // //   const [formData, setFormData] = useState({
// // //     destination: '',
// // //     purpose: '',
// // //     start_date: '',
// // //     end_date: '',
// // //     estimated_budget: ''
// // //   })

// // //   const [errors, setErrors] = useState<Record<string, string>>({})
// // //   const [isLoading, setIsLoading] = useState(false)
// // //   const [successMessage, setSuccessMessage] = useState('')

// // //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))
// // //     // Clear error when user types
// // //     if (errors[name]) {
// // //       setErrors(prev => ({
// // //         ...prev,
// // //         [name]: ''
// // //       }))
// // //     }
// // //   }

// // //   const validateForm = () => {
// // //     const newErrors: Record<string, string> = {}

// // //     if (!formData.destination.trim()) {
// // //       newErrors.destination = 'Destination is required'
// // //     }

// // //     if (!formData.purpose.trim()) {
// // //       newErrors.purpose = 'Purpose is required'
// // //     }

// // //     if (!formData.start_date) {
// // //       newErrors.start_date = 'Start date is required'
// // //     }

// // //     if (!formData.end_date) {
// // //       newErrors.end_date = 'End date is required'
// // //     }

// // //     if (formData.start_date && formData.end_date) {
// // //       const startDate = new Date(formData.start_date)
// // //       const endDate = new Date(formData.end_date)
      
// // //       if (endDate < startDate) {
// // //         newErrors.end_date = 'End date must be after start date'
// // //       }

// // //       // Check if start date is not in the past
// // //       const today = new Date()
// // //       today.setHours(0, 0, 0, 0)
// // //       if (startDate < today) {
// // //         newErrors.start_date = 'Start date cannot be in the past'
// // //       }
// // //     }

// // //     if (formData.estimated_budget && parseFloat(formData.estimated_budget) <= 0) {
// // //       newErrors.estimated_budget = 'Budget must be greater than 0'
// // //     }

// // //     setErrors(newErrors)
// // //     return Object.keys(newErrors).length === 0
// // //   }

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault()
    
// // //     if (!validateForm()) {
// // //       return
// // //     }

// // //     setIsLoading(true)
// // //     setSuccessMessage('')

// // //     try {
// // //       const payload = {
// // //         destination: formData.destination,
// // //         purpose: formData.purpose,
// // //         start_date: formData.start_date,
// // //         end_date: formData.end_date,
// // //         estimated_budget: formData.estimated_budget ? parseFloat(formData.estimated_budget) : null
// // //       }

// // //       const response = await tripAPI.create(payload)
      
// // //       setSuccessMessage('Trip created successfully!')
      
// // //       // Redirect to trip detail after 1.5 seconds
// // //       setTimeout(() => {
// // //         navigate(`/employee/trips/${response.data.data.trip_id}`)
// // //       }, 1500)

// // //     } catch (error: any) {
// // //       console.error('Failed to create trip:', error)
      
// // //       if (error.response?.data?.errors) {
// // //         setErrors(error.response.data.errors)
// // //       } else {
// // //         setErrors({
// // //           submit: error.response?.data?.message || 'Failed to create trip. Please try again.'
// // //         })
// // //       }
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const calculateDuration = () => {
// // //     if (formData.start_date && formData.end_date) {
// // //       const start = new Date(formData.start_date)
// // //       const end = new Date(formData.end_date)
// // //       const diffTime = Math.abs(end.getTime() - start.getTime())
// // //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end date
// // //       return diffDays
// // //     }
// // //     return 0
// // //   }

// // //   const duration = calculateDuration()

// // //   return (
// // //     <div className="min-h-screen bg-background">
// // //       {/* Header */}
// // //       <div className="bg-gradient-primary border-b shadow-soft">
// // //         <div className="container max-w-4xl mx-auto px-4 py-6">
// // //           <Link
// // //             to="/employee/dashboard"
// // //             className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
// // //           >
// // //             <ArrowLeft className="h-4 w-4" />
// // //             Back to Dashboard
// // //           </Link>
// // //           <div>
// // //             <h1 className="text-2xl font-bold text-white mb-1">Create New Trip</h1>
// // //             <p className="text-sm text-white/80">Fill in the details for your business trip</p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <div className="container max-w-4xl mx-auto px-4 py-8">
// // //         {/* Success Message */}
// // //         {successMessage && (
// // //           <Alert className="mb-6 border-success bg-success/10">
// // //             <CheckCircle2 className="h-4 w-4 text-success" />
// // //             <AlertDescription className="text-success font-medium">
// // //               {successMessage}
// // //             </AlertDescription>
// // //           </Alert>
// // //         )}

// // //         {/* Error Message */}
// // //         {errors.submit && (
// // //           <Alert variant="destructive" className="mb-6">
// // //             <AlertCircle className="h-4 w-4" />
// // //             <AlertDescription>{errors.submit}</AlertDescription>
// // //           </Alert>
// // //         )}

// // //         {/* Form */}
// // //         <form onSubmit={handleSubmit}>
// // //           <Card className="shadow-soft mb-6">
// // //             <CardHeader>
// // //               <CardTitle>Trip Information</CardTitle>
// // //               <CardDescription>Provide the details of your business trip</CardDescription>
// // //             </CardHeader>
            
// // //             <CardContent className="space-y-6">
// // //               {/* Employee Info */}
// // //               <Card className="bg-primary/5 border-primary/20">
// // //                 <CardHeader className="pb-3">
// // //                   <CardTitle className="text-base">Employee Information</CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
// // //                   <div className="flex justify-between">
// // //                     <span className="text-muted-foreground">Name:</span>
// // //                     <span className="font-medium">{user?.name}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-muted-foreground">NIK:</span>
// // //                     <span className="font-medium">{user?.nik}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-muted-foreground">Department:</span>
// // //                     <span className="font-medium">{user?.department}</span>
// // //                   </div>
// // //                   <div className="flex justify-between">
// // //                     <span className="text-muted-foreground">Position:</span>
// // //                     <span className="font-medium">{user?.position}</span>
// // //                   </div>
// // //                 </CardContent>
// // //               </Card>

// // //               {/* Destination */}
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="destination" className="flex items-center gap-2">
// // //                   <MapPin className="h-4 w-4" />
// // //                   Destination <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   id="destination"
// // //                   name="destination"
// // //                   value={formData.destination}
// // //                   onChange={handleChange}
// // //                   placeholder="e.g., Jakarta, Surabaya, Bandung"
// // //                   disabled={isLoading}
// // //                   className={errors.destination ? 'border-destructive' : ''}
// // //                 />
// // //                 {errors.destination && (
// // //                   <p className="text-sm text-destructive">{errors.destination}</p>
// // //                 )}
// // //               </div>

// // //               {/* Purpose */}
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="purpose" className="flex items-center gap-2">
// // //                   <FileText className="h-4 w-4" />
// // //                   Purpose of Trip <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Textarea
// // //                   id="purpose"
// // //                   name="purpose"
// // //                   value={formData.purpose}
// // //                   onChange={handleChange}
// // //                   rows={4}
// // //                   placeholder="Describe the purpose of your business trip..."
// // //                   disabled={isLoading}
// // //                   className={errors.purpose ? 'border-destructive' : ''}
// // //                 />
// // //                 {errors.purpose && (
// // //                   <p className="text-sm text-destructive">{errors.purpose}</p>
// // //                 )}
// // //               </div>

// // //               {/* Dates */}
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="start_date" className="flex items-center gap-2">
// // //                     <Calendar className="h-4 w-4" />
// // //                     Start Date <span className="text-destructive">*</span>
// // //                   </Label>
// // //                   <Input
// // //                     type="date"
// // //                     id="start_date"
// // //                     name="start_date"
// // //                     value={formData.start_date}
// // //                     onChange={handleChange}
// // //                     disabled={isLoading}
// // //                     className={errors.start_date ? 'border-destructive' : ''}
// // //                   />
// // //                   {errors.start_date && (
// // //                     <p className="text-sm text-destructive">{errors.start_date}</p>
// // //                   )}
// // //                 </div>

// // //                 <div className="space-y-2">
// // //                   <Label htmlFor="end_date" className="flex items-center gap-2">
// // //                     <Calendar className="h-4 w-4" />
// // //                     End Date <span className="text-destructive">*</span>
// // //                   </Label>
// // //                   <Input
// // //                     type="date"
// // //                     id="end_date"
// // //                     name="end_date"
// // //                     value={formData.end_date}
// // //                     onChange={handleChange}
// // //                     disabled={isLoading}
// // //                     className={errors.end_date ? 'border-destructive' : ''}
// // //                   />
// // //                   {errors.end_date && (
// // //                     <p className="text-sm text-destructive">{errors.end_date}</p>
// // //                   )}
// // //                 </div>
// // //               </div>

// // //               {/* Duration Display */}
// // //               {duration > 0 && (
// // //                 <Alert className="bg-primary/5 border-primary/20">
// // //                   <Info className="h-4 w-4 text-primary" />
// // //                   <AlertDescription className="text-primary">
// // //                     <span className="font-semibold">Trip Duration:</span>
// // //                     <Badge variant="default" className="ml-2">
// // //                       {duration} day{duration > 1 ? 's' : ''}
// // //                     </Badge>
// // //                   </AlertDescription>
// // //                 </Alert>
// // //               )}

// // //               {/* Estimated Budget */}
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="estimated_budget" className="flex items-center gap-2">
// // //                   <DollarSign className="h-4 w-4" />
// // //                   Estimated Budget (Optional)
// // //                 </Label>
// // //                 <div className="relative">
// // //                   <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// // //                   <Input
// // //                     type="number"
// // //                     id="estimated_budget"
// // //                     name="estimated_budget"
// // //                     value={formData.estimated_budget}
// // //                     onChange={handleChange}
// // //                     placeholder="0"
// // //                     min="0"
// // //                     step="1000"
// // //                     disabled={isLoading}
// // //                     className={`pl-10 ${errors.estimated_budget ? 'border-destructive' : ''}`}
// // //                   />
// // //                 </div>
// // //                 {errors.estimated_budget && (
// // //                   <p className="text-sm text-destructive">{errors.estimated_budget}</p>
// // //                 )}
// // //                 <p className="text-xs text-muted-foreground">
// // //                   This is just an estimate. You can request advance (panjar) after creating the trip.
// // //                 </p>
// // //               </div>
// // //             </CardContent>

// // //             <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
// // //               <Button
// // //                 type="button"
// // //                 variant="outline"
// // //                 onClick={() => navigate('/employee/dashboard')}
// // //                 disabled={isLoading}
// // //               >
// // //                 Cancel
// // //               </Button>
// // //               <Button
// // //                 type="submit"
// // //                 disabled={isLoading}
// // //               >
// // //                 {isLoading ? (
// // //                   <>
// // //                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
// // //                     Creating Trip...
// // //                   </>
// // //                 ) : (
// // //                   'Create Trip'
// // //                 )}
// // //               </Button>
// // //             </CardFooter>
// // //           </Card>
// // //         </form>

// // //         {/* Help Text */}
// // //         <Card className="bg-primary/5 border-primary/20 shadow-soft">
// // //           <CardHeader>
// // //             <CardTitle className="text-base flex items-center gap-2">
// // //               <Info className="h-5 w-5" />
// // //               What happens next?
// // //             </CardTitle>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <ul className="space-y-2 text-sm">
// // //               <li className="flex items-start gap-2">
// // //                 <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
// // //                 <span>Your trip will be created with status "Active"</span>
// // //               </li>
// // //               <li className="flex items-start gap-2">
// // //                 <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
// // //                 <span>You can request advance (panjar) for initial or additional funds</span>
// // //               </li>
// // //               <li className="flex items-start gap-2">
// // //                 <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
// // //                 <span>Upload receipts/bon during your trip</span>
// // //               </li>
// // //               <li className="flex items-start gap-2">
// // //                 <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
// // //                 <span>Submit for review when trip is completed</span>
// // //               </li>
// // //               <li className="flex items-start gap-2">
// // //                 <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
// // //                 <span>Settlement will be processed by Finance</span>
// // //               </li>
// // //             </ul>
// // //           </CardContent>
// // //         </Card>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // // src/pages/employee/NewTrip.tsx - BAGIAN IMPORT YANG BENAR
// // // import { useState, FormEvent } from 'react'
// // // import { useNavigate, Link } from 'react-router-dom'
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { ArrowLeft, Info, MapPin, Navigation } from 'lucide-react'
// // // import { tripAPI } from '@/services/api'

// // // // ✅ IMPORT YANG BENAR!
// // // import { searchLocations, calculateDistance, metersToKm, estimateBudget } from '@/services/locationAPI'
// // // import { LocationSuggestion } from '@/types'  // ← Import dari @/types
// // // interface TripFormData {
// // //   destination: string
// // //   purpose: string
// // //   start_date: string
// // //   end_date: string
// // //   estimated_budget: string
// // //   notes: string
// // // }

// // // export default function NewTrip() {
// // //   const navigate = useNavigate()
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState<string | null>(null)
  
// // //   // ✅ NEW: State untuk OpenStreetMap
// // //   const [startLocation, setStartLocation] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [destination, setDestination] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [showStartSuggestions, setShowStartSuggestions] = useState(false)
// // //   const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
// // //   const [distance, setDistance] = useState(0) // in km
// // //   const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)

// // //   const [formData, setFormData] = useState<TripFormData>({
// // //     destination: '',
// // //     purpose: '',
// // //     start_date: '',
// // //     end_date: '',
// // //     estimated_budget: '',
// // //     notes: ''
// // //   })

// // //   // ✅ NEW: Search start location
// // //   const handleSearchStartLocation = async (query: string) => {
// // //     setStartLocation({ ...startLocation, name: query })
    
// // //     if (query.length > 2) {
// // //       const results = await searchLocations(query)
// // //       setStartSuggestions(results)
// // //       setShowStartSuggestions(true)
// // //     } else {
// // //       setStartSuggestions([])
// // //       setShowStartSuggestions(false)
// // //     }
// // //   }
  
// // //   // ✅ NEW: Select start location
// // //   const handleSelectStartLocation = (location: LocationSuggestion) => {
// // //     setStartLocation({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setStartSuggestions([])
// // //     setShowStartSuggestions(false)
    
// // //     // Auto-calculate distance if destination is already set
// // //     if (destination.lat !== 0 && destination.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon),
// // //         destination.lat,
// // //         destination.lon
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ NEW: Search destination
// // //   const handleSearchDestination = async (query: string) => {
// // //     setDestination({ ...destination, name: query })
// // //     setFormData(prev => ({ ...prev, destination: query }))
    
// // //     if (query.length > 2) {
// // //       const results = await searchLocations(query)
// // //       setDestSuggestions(results)
// // //       setShowDestSuggestions(true)
// // //     } else {
// // //       setDestSuggestions([])
// // //       setShowDestSuggestions(false)
// // //     }
// // //   }
  
// // //   // ✅ NEW: Select destination
// // //   const handleSelectDestination = (location: LocationSuggestion) => {
// // //     setDestination({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setFormData(prev => ({ ...prev, destination: location.display_name }))
// // //     setDestSuggestions([])
// // //     setShowDestSuggestions(false)
    
// // //     // Auto-calculate distance if start location is already set
// // //     if (startLocation.lat !== 0 && startLocation.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         startLocation.lat,
// // //         startLocation.lon,
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon)
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ NEW: Calculate distance & estimated budget
// // //   const calculateDistanceAndBudget = async (
// // //     startLat: number,
// // //     startLon: number,
// // //     endLat: number,
// // //     endLon: number
// // //   ) => {
// // //     try {
// // //       setIsCalculatingDistance(true)
      
// // //       const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
// // //       if (route) {
// // //         const distKm = metersToKm(route.distance)
// // //         setDistance(distKm)
        
// // //         const budget = estimateBudget(distKm)
// // //         setFormData(prev => ({
// // //           ...prev,
// // //           estimated_budget: budget.toString(),
// // //         }))
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to calculate distance:', error)
// // //       setError('Failed to calculate distance. Please enter budget manually.')
// // //     } finally {
// // //       setIsCalculatingDistance(false)
// // //     }
// // //   }

// // //   const handleChange = (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // //   ) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))
// // //   }

// // //   const validateForm = (): boolean => {
// // //     if (!formData.destination.trim()) {
// // //       setError('Destination is required')
// // //       return false
// // //     }
// // //     if (!formData.purpose.trim()) {
// // //       setError('Purpose is required')
// // //       return false
// // //     }
// // //     if (!formData.start_date) {
// // //       setError('Start date is required')
// // //       return false
// // //     }
// // //     if (!formData.end_date) {
// // //       setError('End date is required')
// // //       return false
// // //     }
// // //     if (new Date(formData.end_date) < new Date(formData.start_date)) {
// // //       setError('End date must be after start date')
// // //       return false
// // //     }
// // //     if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
// // //       setError('Estimated budget must be greater than 0')
// // //       return false
// // //     }
// // //     return true
// // //   }

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault()
// // //     setError(null)

// // //     if (!validateForm()) {
// // //       return
// // //     }

// // //     try {
// // //       setIsSubmitting(true)

// // //       const tripData = {
// // //         ...formData,
// // //         estimated_budget: parseFloat(formData.estimated_budget),
// // //         // ✅ NEW: Tambahkan koordinat lokasi (optional)
// // //         start_location_name: startLocation.name || null,
// // //         start_location_lat: startLocation.lat || null,
// // //         start_location_lon: startLocation.lon || null,
// // //         destination_lat: destination.lat || null,
// // //         destination_lon: destination.lon || null,
// // //         calculated_distance: distance || null,
// // //       }

// // //       await tripAPI.create(tripData)
// // //       navigate('/employee/trips')
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <div className="container max-w-2xl mx-auto py-8">
// // //       <Button
// // //         variant="ghost"
// // //         className="mb-6"
// // //         onClick={() => navigate('/employee/trips')}
// // //       >
// // //         <ArrowLeft className="mr-2 h-4 w-4" />
// // //         Back to Trips
// // //       </Button>

// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>New Trip Request</CardTitle>
// // //           <CardDescription>
// // //             Fill in the details of your upcoming business trip
// // //           </CardDescription>
// // //         </CardHeader>

// // //         <form onSubmit={handleSubmit}>
// // //           <CardContent className="space-y-6">
// // //             {error && (
// // //               <Alert variant="destructive">
// // //                 <AlertDescription>{error}</AlertDescription>
// // //               </Alert>
// // //             )}

// // //             {/* ✅ NEW: Start Location - Autocomplete */}
// // //             <div className="space-y-2">
// // //               <Label htmlFor="start_location">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Start Location
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="start_location"
// // //                   value={startLocation.name}
// // //                   onChange={(e) => handleSearchStartLocation(e.target.value)}
// // //                   placeholder="e.g., Telkom Pontianak"
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showStartSuggestions && startSuggestions.length > 0 && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg">
// // //                     <CardContent className="p-2">
// // //                       {startSuggestions.map((location) => (
// // //                         <div
// // //                           key={location.place_id}
// // //                           className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
// // //                           onClick={() => handleSelectStartLocation(location)}
// // //                         >
// // //                           <p className="font-medium">{location.display_name}</p>
// // //                         </div>
// // //                       ))}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //               <p className="text-xs text-muted-foreground">
// // //                 Select your starting point for automatic distance calculation
// // //               </p>
// // //             </div>

// // //             {/* ✅ NEW: Destination - Autocomplete */}
// // //             <div className="space-y-2">
// // //               <Label htmlFor="destination">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Destination <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="destination"
// // //                   name="destination"
// // //                   value={formData.destination}
// // //                   onChange={(e) => handleSearchDestination(e.target.value)}
// // //                   placeholder="e.g., Sanggau"
// // //                   required
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showDestSuggestions && destSuggestions.length > 0 && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg">
// // //                     <CardContent className="p-2">
// // //                       {destSuggestions.map((location) => (
// // //                         <div
// // //                           key={location.place_id}
// // //                           className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
// // //                           onClick={() => handleSelectDestination(location)}
// // //                         >
// // //                           <p className="font-medium">{location.display_name}</p>
// // //                         </div>
// // //                       ))}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* ✅ NEW: Distance Info (Auto-calculated) */}
// // //             {distance > 0 && (
// // //               <Alert className="bg-blue-50 border-blue-200">
// // //                 <Info className="h-4 w-4 text-blue-600" />
// // //                 <AlertDescription>
// // //                   <p className="font-medium text-blue-900">
// // //                     📍 Distance: {distance} km
// // //                   </p>
// // //                   <p className="text-sm text-blue-700">
// // //                     Estimated budget calculated automatically (Rp 5.000/km)
// // //                   </p>
// // //                 </AlertDescription>
// // //               </Alert>
// // //             )}

// // //             <div className="space-y-2">
// // //               <Label htmlFor="purpose">
// // //                 Purpose <span className="text-destructive">*</span>
// // //               </Label>
// // //               <Textarea
// // //                 id="purpose"
// // //                 name="purpose"
// // //                 value={formData.purpose}
// // //                 onChange={handleChange}
// // //                 placeholder="Brief description of the trip purpose"
// // //                 required
// // //                 rows={3}
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="start_date">
// // //                   Start Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="start_date"
// // //                   name="start_date"
// // //                   value={formData.start_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="end_date">
// // //                   End Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="end_date"
// // //                   name="end_date"
// // //                   value={formData.end_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={formData.start_date || new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* ✅ UPDATED: Estimated Budget (Auto-filled, editable) */}
// // //             <div className="space-y-2">
// // //               <Label htmlFor="estimated_budget">
// // //                 Estimated Budget <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// // //                 <Input
// // //                   type="number"
// // //                   id="estimated_budget"
// // //                   name="estimated_budget"
// // //                   value={formData.estimated_budget}
// // //                   onChange={handleChange}
// // //                   className="pl-10"
// // //                   placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
// // //                   required
// // //                   min="1"
// // //                   disabled={isCalculatingDistance}
// // //                 />
// // //               </div>
// // //               {isCalculatingDistance && (
// // //                 <p className="text-xs text-muted-foreground">
// // //                   🔄 Calculating distance and budget...
// // //                 </p>
// // //               )}
// // //               <p className="text-xs text-muted-foreground">
// // //                 {distance > 0 
// // //                   ? "Budget calculated automatically. You can adjust if needed."
// // //                   : "Enter estimated budget or select locations for automatic calculation"
// // //                 }
// // //               </p>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="notes">Additional Notes</Label>
// // //               <Textarea
// // //                 id="notes"
// // //                 name="notes"
// // //                 value={formData.notes}
// // //                 onChange={handleChange}
// // //                 placeholder="Any additional information (optional)"
// // //                 rows={3}
// // //               />
// // //             </div>
// // //           </CardContent>

// // //           <CardFooter className="flex justify-end space-x-4">
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               onClick={() => navigate('/employee/trips')}
// // //               disabled={isSubmitting}
// // //             >
// // //               Cancel
// // //             </Button>
// // //             <Button type="submit" disabled={isSubmitting}>
// // //               {isSubmitting ? 'Submitting...' : 'Submit Trip Request'}
// // //             </Button>
// // //           </CardFooter>
// // //         </form>
// // //       </Card>
// // //     </div>
// // //   )
// // // }

// // // import { useState, FormEvent, useRef, useEffect } from 'react'
// // // import { useNavigate, Link } from 'react-router-dom'
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { ArrowLeft, Info, MapPin, Navigation } from 'lucide-react'
// // // import { tripAPI } from '@/services/api'

// // // // ✅ IMPORT YANG BENAR!
// // // import { searchLocations, calculateDistance, metersToKm, estimateBudget } from '@/services/locationAPI'
// // // import { LocationSuggestion } from '@/types'  // ← Import dari @/types

// // // interface TripFormData {
// // //   destination: string
// // //   purpose: string
// // //   start_date: string
// // //   end_date: string
// // //   estimated_budget: string
// // //   notes: string
// // // }

// // // export default function NewTrip() {
// // //   const navigate = useNavigate()
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState<string | null>(null)
  
// // //   // ✅ NEW: State untuk OpenStreetMap
// // //   const [startLocation, setStartLocation] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [destination, setDestination] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [showStartSuggestions, setShowStartSuggestions] = useState(false)
// // //   const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
// // //   const [distance, setDistance] = useState(0) // in km
// // //   const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)

// // //   // ✅ NEW: State untuk loading search
// // //   const [isSearchingStart, setIsSearchingStart] = useState(false)
// // //   const [isSearchingDest, setIsSearchingDest] = useState(false)

// // //   const [formData, setFormData] = useState<TripFormData>({
// // //     destination: '',
// // //     purpose: '',
// // //     start_date: '',
// // //     end_date: '',
// // //     estimated_budget: '',
// // //     notes: ''
// // //   })

// // //   // ✅ NEW: Ref untuk debounce
// // //   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

// // //   // ✅ NEW: Ref untuk click outside
// // //   const startLocationRef = useRef<HTMLDivElement>(null)
// // //   const destinationRef = useRef<HTMLDivElement>(null)

// // //   // ✅ NEW: Close suggestions ketika klik di luar
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
// // //         setShowStartSuggestions(false)
// // //       }
// // //       if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
// // //         setShowDestSuggestions(false)
// // //       }
// // //     }

// // //     document.addEventListener('mousedown', handleClickOutside)
// // //     return () => {
// // //       document.removeEventListener('mousedown', handleClickOutside)
// // //     }
// // //   }, [])

// // //   // ✅ NEW: Search start location dengan DEBOUNCE
// // //   const handleSearchStartLocation = async (query: string) => {
// // //     setStartLocation({ ...startLocation, name: query })
    
// // //     // Clear timeout sebelumnya
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current)
// // //     }
    
// // //     if (query.length > 2) {
// // //       setIsSearchingStart(true)
// // //       // Debounce 500ms
// // //       searchTimeoutRef.current = setTimeout(async () => {
// // //         try {
// // //           const results = await searchLocations(query)
// // //           setStartSuggestions(results)
// // //           setShowStartSuggestions(true)
// // //         } catch (error) {
// // //           console.error('Search error:', error)
// // //           setStartSuggestions([])
// // //         } finally {
// // //           setIsSearchingStart(false)
// // //         }
// // //       }, 500)
// // //     } else {
// // //       setStartSuggestions([])
// // //       setShowStartSuggestions(false)
// // //       setIsSearchingStart(false)
// // //     }
// // //   }
  
// // //   // ✅ NEW: Select start location
// // //   const handleSelectStartLocation = (location: LocationSuggestion) => {
// // //     setStartLocation({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setStartSuggestions([])
// // //     setShowStartSuggestions(false)
    
// // //     // Auto-calculate distance if destination is already set
// // //     if (destination.lat !== 0 && destination.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon),
// // //         destination.lat,
// // //         destination.lon
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ NEW: Search destination dengan DEBOUNCE
// // //   const handleSearchDestination = async (query: string) => {
// // //     setDestination({ ...destination, name: query })
// // //     setFormData(prev => ({ ...prev, destination: query }))
    
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current)
// // //     }
    
// // //     if (query.length > 2) {
// // //       setIsSearchingDest(true)
// // //       searchTimeoutRef.current = setTimeout(async () => {
// // //         try {
// // //           const results = await searchLocations(query)
// // //           setDestSuggestions(results)
// // //           setShowDestSuggestions(true)
// // //         } catch (error) {
// // //           console.error('Search error:', error)
// // //           setDestSuggestions([])
// // //         } finally {
// // //           setIsSearchingDest(false)
// // //         }
// // //       }, 500)
// // //     } else {
// // //       setDestSuggestions([])
// // //       setShowDestSuggestions(false)
// // //       setIsSearchingDest(false)
// // //     }
// // //   }
  
// // //   // ✅ NEW: Select destination
// // //   const handleSelectDestination = (location: LocationSuggestion) => {
// // //     setDestination({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setFormData(prev => ({ ...prev, destination: location.display_name }))
// // //     setDestSuggestions([])
// // //     setShowDestSuggestions(false)
    
// // //     // Auto-calculate distance if start location is already set
// // //     if (startLocation.lat !== 0 && startLocation.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         startLocation.lat,
// // //         startLocation.lon,
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon)
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ NEW: Calculate distance & estimated budget dengan VALIDASI
// // //   const calculateDistanceAndBudget = async (
// // //     startLat: number,
// // //     startLon: number,
// // //     endLat: number,
// // //     endLon: number
// // //   ) => {
// // //     try {
// // //       setIsCalculatingDistance(true)
// // //       setError(null)
      
// // //       const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
// // //       if (route) {
// // //         const distKm = metersToKm(route.distance)
        
// // //         // ✅ VALIDASI: Cek apakah jarak realistic
// // //         if (distKm > 5000) { // Jika > 5000 km, kemungkinan error
// // //           setError('Jarak terhitung tidak realistic. Silakan pilih lokasi yang lebih spesifik.')
// // //           setDistance(0)
// // //           setFormData(prev => ({
// // //             ...prev,
// // //             estimated_budget: '',
// // //           }))
// // //           return
// // //         }
        
// // //         setDistance(distKm)
        
// // //         const budget = estimateBudget(distKm)
// // //         setFormData(prev => ({
// // //           ...prev,
// // //           estimated_budget: budget.toString(),
// // //         }))
// // //       } else {
// // //         setError('Gagal menghitung jarak. Silakan masukkan budget manual.')
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to calculate distance:', error)
// // //       setError('Gagal menghitung jarak. Silakan masukkan budget manual.')
// // //     } finally {
// // //       setIsCalculatingDistance(false)
// // //     }
// // //   }

// // //   const handleChange = (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // //   ) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))
// // //   }

// // //   const validateForm = (): boolean => {
// // //     if (!formData.destination.trim()) {
// // //       setError('Destination is required')
// // //       return false
// // //     }
// // //     if (!formData.purpose.trim()) {
// // //       setError('Purpose is required')
// // //       return false
// // //     }
// // //     if (!formData.start_date) {
// // //       setError('Start date is required')
// // //       return false
// // //     }
// // //     if (!formData.end_date) {
// // //       setError('End date is required')
// // //       return false
// // //     }
// // //     if (new Date(formData.end_date) < new Date(formData.start_date)) {
// // //       setError('End date must be after start date')
// // //       return false
// // //     }
// // //     if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
// // //       setError('Estimated budget must be greater than 0')
// // //       return false
// // //     }
// // //     return true
// // //   }

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault()
// // //     setError(null)

// // //     if (!validateForm()) {
// // //       return
// // //     }

// // //     try {
// // //       setIsSubmitting(true)

// // //       const tripData = {
// // //         ...formData,
// // //         estimated_budget: parseFloat(formData.estimated_budget),
// // //         // ✅ NEW: Tambahkan koordinat lokasi (optional)
// // //         start_location_name: startLocation.name || null,
// // //         start_location_lat: startLocation.lat || null,
// // //         start_location_lon: startLocation.lon || null,
// // //         destination_lat: destination.lat || null,
// // //         destination_lon: destination.lon || null,
// // //         calculated_distance: distance || null,
// // //       }

// // //       await tripAPI.create(tripData)
// // //       navigate('/employee/trips')
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <div className="container max-w-2xl mx-auto py-8">
// // //       <Button
// // //         variant="ghost"
// // //         className="mb-6"
// // //         onClick={() => navigate('/employee/trips')}
// // //       >
// // //         <ArrowLeft className="mr-2 h-4 w-4" />
// // //         Back to Trips
// // //       </Button>

// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>New Trip Request</CardTitle>
// // //           <CardDescription>
// // //             Fill in the details of your upcoming business trip
// // //           </CardDescription>
// // //         </CardHeader>

// // //         <form onSubmit={handleSubmit}>
// // //           <CardContent className="space-y-6">
// // //             {error && (
// // //               <Alert variant="destructive">
// // //                 <AlertDescription>{error}</AlertDescription>
// // //               </Alert>
// // //             )}

// // //             {/* ✅ NEW: Start Location - Autocomplete */}
// // //             <div className="space-y-2" ref={startLocationRef}>
// // //               <Label htmlFor="start_location">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Start Location
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="start_location"
// // //                   value={startLocation.name}
// // //                   onChange={(e) => handleSearchStartLocation(e.target.value)}
// // //                   placeholder="e.g., Telkom Pontianak"
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showStartSuggestions && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg">
// // //                     <CardContent className="p-2">
// // //                       {isSearchingStart ? (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           🔍 Mencari lokasi...
// // //                         </div>
// // //                       ) : startSuggestions.length > 0 ? (
// // //                         startSuggestions.map((location) => (
// // //                           <div
// // //                             key={location.place_id}
// // //                             className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
// // //                             onClick={() => handleSelectStartLocation(location)}
// // //                           >
// // //                             <p className="font-medium">{location.display_name}</p>
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           ❌ Lokasi tidak ditemukan
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //               <p className="text-xs text-muted-foreground">
// // //                 Select your starting point for automatic distance calculation
// // //               </p>
// // //             </div>

// // //             {/* ✅ NEW: Destination - Autocomplete */}
// // //             <div className="space-y-2" ref={destinationRef}>
// // //               <Label htmlFor="destination">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Destination <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="destination"
// // //                   name="destination"
// // //                   value={formData.destination}
// // //                   onChange={(e) => handleSearchDestination(e.target.value)}
// // //                   placeholder="e.g., Sanggau"
// // //                   required
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showDestSuggestions && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg">
// // //                     <CardContent className="p-2">
// // //                       {isSearchingDest ? (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           🔍 Mencari lokasi...
// // //                         </div>
// // //                       ) : destSuggestions.length > 0 ? (
// // //                         destSuggestions.map((location) => (
// // //                           <div
// // //                             key={location.place_id}
// // //                             className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
// // //                             onClick={() => handleSelectDestination(location)}
// // //                           >
// // //                             <p className="font-medium">{location.display_name}</p>
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           ❌ Lokasi tidak ditemukan
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* ✅ NEW: Distance Info (Auto-calculated) */}
// // //             {distance > 0 && (
// // //               <Alert className="bg-blue-50 border-blue-200">
// // //                 <Info className="h-4 w-4 text-blue-600" />
// // //                 <AlertDescription>
// // //                   <p className="font-medium text-blue-900">
// // //                     📍 Distance: {distance} km
// // //                   </p>
// // //                   <p className="text-sm text-blue-700">
// // //                     Estimated budget calculated automatically (Rp 5.000/km)
// // //                   </p>
// // //                 </AlertDescription>
// // //               </Alert>
// // //             )}

// // //             <div className="space-y-2">
// // //               <Label htmlFor="purpose">
// // //                 Purpose <span className="text-destructive">*</span>
// // //               </Label>
// // //               <Textarea
// // //                 id="purpose"
// // //                 name="purpose"
// // //                 value={formData.purpose}
// // //                 onChange={handleChange}
// // //                 placeholder="Brief description of the trip purpose"
// // //                 required
// // //                 rows={3}
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="start_date">
// // //                   Start Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="start_date"
// // //                   name="start_date"
// // //                   value={formData.start_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="end_date">
// // //                   End Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="end_date"
// // //                   name="end_date"
// // //                   value={formData.end_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={formData.start_date || new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* ✅ UPDATED: Estimated Budget (Auto-filled, editable) */}
// // //             <div className="space-y-2">
// // //               <Label htmlFor="estimated_budget">
// // //                 Estimated Budget <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// // //                 <Input
// // //                   type="number"
// // //                   id="estimated_budget"
// // //                   name="estimated_budget"
// // //                   value={formData.estimated_budget}
// // //                   onChange={handleChange}
// // //                   className="pl-10"
// // //                   placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
// // //                   required
// // //                   min="1"
// // //                   disabled={isCalculatingDistance}
// // //                 />
// // //               </div>
// // //               {isCalculatingDistance && (
// // //                 <p className="text-xs text-muted-foreground">
// // //                   🔄 Calculating distance and budget...
// // //                 </p>
// // //               )}
// // //               <p className="text-xs text-muted-foreground">
// // //                 {distance > 0 
// // //                   ? "Budget calculated automatically. You can adjust if needed."
// // //                   : "Enter estimated budget or select locations for automatic calculation"
// // //                 }
// // //               </p>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="notes">Additional Notes</Label>
// // //               <Textarea
// // //                 id="notes"
// // //                 name="notes"
// // //                 value={formData.notes}
// // //                 onChange={handleChange}
// // //                 placeholder="Any additional information (optional)"
// // //                 rows={3}
// // //               />
// // //             </div>
// // //           </CardContent>

// // //           <CardFooter className="flex justify-end space-x-4">
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               onClick={() => navigate('/employee/trips')}
// // //               disabled={isSubmitting}
// // //             >
// // //               Cancel
// // //             </Button>
// // //             <Button type="submit" disabled={isSubmitting}>
// // //               {isSubmitting ? 'Submitting...' : 'Submit Trip Request'}
// // //             </Button>
// // //           </CardFooter>
// // //         </form>
// // //       </Card>
// // //     </div>
// // //   )
// // // }


// // // import { useState, FormEvent, useRef, useEffect } from 'react'
// // // import { useNavigate, Link } from 'react-router-dom'
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { ArrowLeft, Info, MapPin, Navigation } from 'lucide-react'
// // // import { tripAPI } from '@/services/api'

// // // // ✅ IMPORT YANG BENAR!
// // // import { searchLocations, calculateDistance, metersToKm, estimateBudget } from '@/services/locationAPI'
// // // import { LocationSuggestion } from '@/types'

// // // interface TripFormData {
// // //   destination: string
// // //   purpose: string
// // //   start_date: string
// // //   end_date: string
// // //   estimated_budget: string
// // //   notes: string
// // // }

// // // export default function NewTrip() {
// // //   const navigate = useNavigate()
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState<string | null>(null)
  
// // //   // ✅ State untuk OpenStreetMap
// // //   const [startLocation, setStartLocation] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [destination, setDestination] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [showStartSuggestions, setShowStartSuggestions] = useState(false)
// // //   const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
// // //   const [distance, setDistance] = useState(0)
// // //   const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
// // //   const [isSearchingStart, setIsSearchingStart] = useState(false)
// // //   const [isSearchingDest, setIsSearchingDest] = useState(false)

// // //   const [formData, setFormData] = useState<TripFormData>({
// // //     destination: '',
// // //     purpose: '',
// // //     start_date: '',
// // //     end_date: '',
// // //     estimated_budget: '',
// // //     notes: ''
// // //   })

// // //   // ✅ Ref untuk debounce dan click outside
// // //   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
// // //   const startLocationRef = useRef<HTMLDivElement>(null)
// // //   const destinationRef = useRef<HTMLDivElement>(null)

// // //   // ✅ Close suggestions ketika klik di luar
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
// // //         setShowStartSuggestions(false)
// // //       }
// // //       if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
// // //         setShowDestSuggestions(false)
// // //       }
// // //     }

// // //     document.addEventListener('mousedown', handleClickOutside)
// // //     return () => {
// // //       document.removeEventListener('mousedown', handleClickOutside)
// // //     }
// // //   }, [])

// // //   // ✅ Search start location dengan DEBOUNCE
// // //   const handleSearchStartLocation = async (query: string) => {
// // //     setStartLocation({ ...startLocation, name: query })
    
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current)
// // //     }
    
// // //     if (query.length > 2) {
// // //       setIsSearchingStart(true)
// // //       searchTimeoutRef.current = setTimeout(async () => {
// // //         try {
// // //           const results = await searchLocations(query)
// // //           setStartSuggestions(results)
// // //           setShowStartSuggestions(true)
// // //         } catch (error) {
// // //           console.error('Search error:', error)
// // //           setStartSuggestions([])
// // //         } finally {
// // //           setIsSearchingStart(false)
// // //         }
// // //       }, 500)
// // //     } else {
// // //       setStartSuggestions([])
// // //       setShowStartSuggestions(false)
// // //       setIsSearchingStart(false)
// // //     }
// // //   }
  
// // //   // ✅ Select start location
// // //   const handleSelectStartLocation = (location: LocationSuggestion) => {
// // //     setStartLocation({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setStartSuggestions([])
// // //     setShowStartSuggestions(false)
    
// // //     if (destination.lat !== 0 && destination.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon),
// // //         destination.lat,
// // //         destination.lon
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ Search destination dengan DEBOUNCE
// // //   const handleSearchDestination = async (query: string) => {
// // //     setDestination({ ...destination, name: query })
// // //     setFormData(prev => ({ ...prev, destination: query }))
    
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current)
// // //     }
    
// // //     if (query.length > 2) {
// // //       setIsSearchingDest(true)
// // //       searchTimeoutRef.current = setTimeout(async () => {
// // //         try {
// // //           const results = await searchLocations(query)
// // //           setDestSuggestions(results)
// // //           setShowDestSuggestions(true)
// // //         } catch (error) {
// // //           console.error('Search error:', error)
// // //           setDestSuggestions([])
// // //         } finally {
// // //           setIsSearchingDest(false)
// // //         }
// // //       }, 500)
// // //     } else {
// // //       setDestSuggestions([])
// // //       setShowDestSuggestions(false)
// // //       setIsSearchingDest(false)
// // //     }
// // //   }
  
// // //   // ✅ Select destination
// // //   const handleSelectDestination = (location: LocationSuggestion) => {
// // //     setDestination({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setFormData(prev => ({ ...prev, destination: location.display_name }))
// // //     setDestSuggestions([])
// // //     setShowDestSuggestions(false)
    
// // //     if (startLocation.lat !== 0 && startLocation.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         startLocation.lat,
// // //         startLocation.lon,
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon)
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ Calculate distance & estimated budget dengan VALIDASI
// // //   const calculateDistanceAndBudget = async (
// // //     startLat: number,
// // //     startLon: number,
// // //     endLat: number,
// // //     endLon: number
// // //   ) => {
// // //     try {
// // //       setIsCalculatingDistance(true)
// // //       setError(null)
      
// // //       const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
// // //       if (route) {
// // //         const distKm = metersToKm(route.distance)
        
// // //         // ✅ VALIDASI: Cek apakah jarak realistic
// // //         if (distKm > 5000) {
// // //           setError('Jarak terhitung tidak realistic. Silakan pilih lokasi yang lebih spesifik.')
// // //           setDistance(0)
// // //           setFormData(prev => ({
// // //             ...prev,
// // //             estimated_budget: '',
// // //           }))
// // //           return
// // //         }
        
// // //         setDistance(distKm)
        
// // //         const budget = estimateBudget(distKm)
// // //         setFormData(prev => ({
// // //           ...prev,
// // //           estimated_budget: budget.toString(),
// // //         }))
// // //       } else {
// // //         setError('Gagal menghitung jarak. Silakan masukkan budget manual.')
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to calculate distance:', error)
// // //       setError('Gagal menghitung jarak. Silakan masukkan budget manual.')
// // //     } finally {
// // //       setIsCalculatingDistance(false)
// // //     }
// // //   }

// // //   const handleChange = (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // //   ) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))
// // //   }

// // //   const validateForm = (): boolean => {
// // //     if (!formData.destination.trim()) {
// // //       setError('Destination is required')
// // //       return false
// // //     }
// // //     if (!formData.purpose.trim()) {
// // //       setError('Purpose is required')
// // //       return false
// // //     }
// // //     if (!formData.start_date) {
// // //       setError('Start date is required')
// // //       return false
// // //     }
// // //     if (!formData.end_date) {
// // //       setError('End date is required')
// // //       return false
// // //     }
// // //     if (new Date(formData.end_date) < new Date(formData.start_date)) {
// // //       setError('End date must be after start date')
// // //       return false
// // //     }
// // //     if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
// // //       setError('Estimated budget must be greater than 0')
// // //       return false
// // //     }
// // //     return true
// // //   }

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault()
// // //     setError(null)

// // //     if (!validateForm()) {
// // //       return
// // //     }

// // //     try {
// // //       setIsSubmitting(true)

// // //       const tripData = {
// // //         ...formData,
// // //         estimated_budget: parseFloat(formData.estimated_budget),
// // //         start_location_name: startLocation.name || null,
// // //         start_location_lat: startLocation.lat || null,
// // //         start_location_lon: startLocation.lon || null,
// // //         destination_lat: destination.lat || null,
// // //         destination_lon: destination.lon || null,
// // //         calculated_distance: distance || null,
// // //       }

// // //       // ✅ FIX: Kembali ke halaman trips (bukan trip detail)
// // //       await tripAPI.create(tripData)
// // //       navigate('/employee/trips') // ← INI YANG DIPERBAIKI!
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <div className="container max-w-2xl mx-auto py-8">
// // //       <Button
// // //         variant="ghost"
// // //         className="mb-6"
// // //         onClick={() => navigate('/employee/trips')}
// // //       >
// // //         <ArrowLeft className="mr-2 h-4 w-4" />
// // //         Back to Trips
// // //       </Button>

// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>New Trip Request</CardTitle>
// // //           <CardDescription>
// // //             Fill in the details of your upcoming business trip
// // //           </CardDescription>
// // //         </CardHeader>

// // //         <form onSubmit={handleSubmit}>
// // //           <CardContent className="space-y-6">
// // //             {error && (
// // //               <Alert variant="destructive">
// // //                 <AlertDescription>{error}</AlertDescription>
// // //               </Alert>
// // //             )}

// // //             {/* Start Location - Autocomplete */}
// // //             <div className="space-y-2" ref={startLocationRef}>
// // //               <Label htmlFor="start_location">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Start Location
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="start_location"
// // //                   value={startLocation.name}
// // //                   onChange={(e) => handleSearchStartLocation(e.target.value)}
// // //                   placeholder="e.g., Jl. Teuku Umar No.2, Pontianak"
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showStartSuggestions && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg">
// // //                     <CardContent className="p-2">
// // //                       {isSearchingStart ? (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           🔍 Mencari lokasi...
// // //                         </div>
// // //                       ) : startSuggestions.length > 0 ? (
// // //                         startSuggestions.map((location) => (
// // //                           <div
// // //                             key={location.place_id}
// // //                             className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
// // //                             onClick={() => handleSelectStartLocation(location)}
// // //                           >
// // //                             <p className="font-medium">{location.display_name}</p>
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           ❌ Lokasi tidak ditemukan
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //               <p className="text-xs text-muted-foreground">
// // //                 Select your starting point for automatic distance calculation
// // //               </p>
// // //             </div>

// // //             {/* Destination - Autocomplete */}
// // //             <div className="space-y-2" ref={destinationRef}>
// // //               <Label htmlFor="destination">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Destination <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="destination"
// // //                   name="destination"
// // //                   value={formData.destination}
// // //                   onChange={(e) => handleSearchDestination(e.target.value)}
// // //                   placeholder="e.g., Sanggau, Kalimantan Barat"
// // //                   required
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showDestSuggestions && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg">
// // //                     <CardContent className="p-2">
// // //                       {isSearchingDest ? (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           🔍 Mencari lokasi...
// // //                         </div>
// // //                       ) : destSuggestions.length > 0 ? (
// // //                         destSuggestions.map((location) => (
// // //                           <div
// // //                             key={location.place_id}
// // //                             className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
// // //                             onClick={() => handleSelectDestination(location)}
// // //                           >
// // //                             <p className="font-medium">{location.display_name}</p>
// // //                           </div>
// // //                         ))
// // //                       ) : (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           ❌ Lokasi tidak ditemukan
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             {/* Distance Info (Auto-calculated) */}
// // //             {distance > 0 && (
// // //               <Alert className="bg-blue-50 border-blue-200">
// // //                 <Info className="h-4 w-4 text-blue-600" />
// // //                 <AlertDescription>
// // //                   <p className="font-medium text-blue-900">
// // //                     📍 Distance: {distance} km
// // //                   </p>
// // //                   <p className="text-sm text-blue-700">
// // //                     Estimated budget calculated automatically (Rp 5.000/km)
// // //                   </p>
// // //                 </AlertDescription>
// // //               </Alert>
// // //             )}

// // //             <div className="space-y-2">
// // //               <Label htmlFor="purpose">
// // //                 Purpose <span className="text-destructive">*</span>
// // //               </Label>
// // //               <Textarea
// // //                 id="purpose"
// // //                 name="purpose"
// // //                 value={formData.purpose}
// // //                 onChange={handleChange}
// // //                 placeholder="Brief description of the trip purpose"
// // //                 required
// // //                 rows={3}
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="start_date">
// // //                   Start Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="start_date"
// // //                   name="start_date"
// // //                   value={formData.start_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="end_date">
// // //                   End Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="end_date"
// // //                   name="end_date"
// // //                   value={formData.end_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={formData.start_date || new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* ✅ FIX: Estimated Budget DISABLED */}
// // //             <div className="space-y-2">
// // //               <Label htmlFor="estimated_budget">
// // //                 Estimated Budget <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// // //                 <Input
// // //                   type="number"
// // //                   id="estimated_budget"
// // //                   name="estimated_budget"
// // //                   value={formData.estimated_budget}
// // //                   onChange={handleChange}
// // //                   className="pl-10"
// // //                   placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
// // //                   required
// // //                   min="1"
// // //                   disabled={true} // ✅ SELALU DISABLED SEPERTI PERMINTAAN
// // //                 />
// // //               </div>
// // //               {isCalculatingDistance && (
// // //                 <p className="text-xs text-muted-foreground">
// // //                   🔄 Calculating distance and budget...
// // //                 </p>
// // //               )}
// // //               <p className="text-xs text-muted-foreground">
// // //                 {distance > 0 
// // //                   ? "Budget calculated automatically based on distance"
// // //                   : "Select locations for automatic budget calculation"
// // //                 }
// // //               </p>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="notes">Additional Notes</Label>
// // //               <Textarea
// // //                 id="notes"
// // //                 name="notes"
// // //                 value={formData.notes}
// // //                 onChange={handleChange}
// // //                 placeholder="Any additional information (optional)"
// // //                 rows={3}
// // //               />
// // //             </div>
// // //           </CardContent>

// // //           <CardFooter className="flex justify-end space-x-4">
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               onClick={() => navigate('/employee/trips')}
// // //               disabled={isSubmitting}
// // //             >
// // //               Cancel
// // //             </Button>
// // //             <Button type="submit" disabled={isSubmitting}>
// // //               {isSubmitting ? 'Submitting...' : 'Create Trip Request'}
// // //             </Button>
// // //           </CardFooter>
// // //         </form>
// // //       </Card>
// // //     </div>
// // //   )
// // // }

// // // import { useState, FormEvent, useRef, useEffect } from 'react'
// // // import { useNavigate, Link } from 'react-router-dom'
// // // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { ArrowLeft, Info, MapPin, Navigation, CheckCircle2, XCircle } from 'lucide-react'
// // // import { tripAPI } from '@/services/api'

// // // // ✅ IMPORT YANG BENAR!
// // // import { searchLocations, calculateDistance, metersToKm, estimateBudget } from '@/services/locationAPI'
// // // import { LocationSuggestion } from '@/types'

// // // interface TripFormData {
// // //   destination: string
// // //   purpose: string
// // //   start_date: string
// // //   end_date: string
// // //   estimated_budget: string
// // //   notes: string
// // // }

// // // export default function NewTrip() {
// // //   const navigate = useNavigate()
// // //   const [isSubmitting, setIsSubmitting] = useState(false)
// // //   const [error, setError] = useState<string | null>(null)
  
// // //   // ✅ State untuk OpenStreetMap
// // //   const [startLocation, setStartLocation] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [destination, setDestination] = useState({
// // //     name: '',
// // //     lat: 0,
// // //     lon: 0,
// // //   })
  
// // //   const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
// // //   const [showStartSuggestions, setShowStartSuggestions] = useState(false)
// // //   const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
// // //   const [distance, setDistance] = useState(0)
// // //   const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
// // //   const [isSearchingStart, setIsSearchingStart] = useState(false)
// // //   const [isSearchingDest, setIsSearchingDest] = useState(false)

// // //   // ✅ State untuk validasi lokasi
// // //   const [isStartLocationValid, setIsStartLocationValid] = useState(false)
// // //   const [isDestinationValid, setIsDestinationValid] = useState(false)

// // //   const [formData, setFormData] = useState<TripFormData>({
// // //     destination: '',
// // //     purpose: '',
// // //     start_date: '',
// // //     end_date: '',
// // //     estimated_budget: '',
// // //     notes: ''
// // //   })

// // //   // ✅ Ref untuk debounce dan click outside
// // //   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
// // //   const startLocationRef = useRef<HTMLDivElement>(null)
// // //   const destinationRef = useRef<HTMLDivElement>(null)

// // //   // ✅ Close suggestions ketika klik di luar
// // //   useEffect(() => {
// // //     const handleClickOutside = (event: MouseEvent) => {
// // //       if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
// // //         setShowStartSuggestions(false)
// // //       }
// // //       if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
// // //         setShowDestSuggestions(false)
// // //       }
// // //     }

// // //     document.addEventListener('mousedown', handleClickOutside)
// // //     return () => {
// // //       document.removeEventListener('mousedown', handleClickOutside)
// // //     }
// // //   }, [])

// // //   // ✅ Validasi ketika memilih lokasi
// // //   const validateSelectedLocation = (location: LocationSuggestion, type: 'start' | 'destination'): boolean => {
// // //     // Cek apakah lokasi cukup spesifik
// // //     const hasGoodDetail = location.display_name && 
// // //                          (location.display_name.includes('Jl.') || 
// // //                           location.display_name.includes('Jalan') ||
// // //                           location.display_name.includes('Kota') ||
// // //                           location.display_name.includes('Kecamatan') ||
// // //                           location.display_name.split(',').length >= 2)
    
// // //     if (!hasGoodDetail) {
// // //       setError(`Lokasi ${type === 'start' ? 'awal' : 'tujuan'} terlalu umum. Pilih lokasi yang lebih spesifik.`)
// // //       return false
// // //     }
    
// // //     return true
// // //   }

// // //   // ✅ Search start location dengan DEBOUNCE
// // //   const handleSearchStartLocation = async (query: string) => {
// // //     setStartLocation({ ...startLocation, name: query })
// // //     setIsStartLocationValid(false)
    
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current)
// // //     }
    
// // //     if (query.length > 2) {
// // //       setIsSearchingStart(true)
// // //       searchTimeoutRef.current = setTimeout(async () => {
// // //         try {
// // //           const results = await searchLocations(query)
// // //           setStartSuggestions(results)
// // //           setShowStartSuggestions(true)
// // //         } catch (error) {
// // //           console.error('Search error:', error)
// // //           setStartSuggestions([])
// // //         } finally {
// // //           setIsSearchingStart(false)
// // //         }
// // //       }, 500)
// // //     } else {
// // //       setStartSuggestions([])
// // //       setShowStartSuggestions(false)
// // //       setIsSearchingStart(false)
// // //     }
// // //   }
  
// // //   // ✅ Select start location dengan validasi
// // //   const handleSelectStartLocation = (location: LocationSuggestion) => {
// // //     if (!validateSelectedLocation(location, 'start')) {
// // //       return
// // //     }
    
// // //     setStartLocation({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setStartSuggestions([])
// // //     setShowStartSuggestions(false)
// // //     setIsStartLocationValid(true)
// // //     setError(null) // Clear error
    
// // //     if (destination.lat !== 0 && destination.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon),
// // //         destination.lat,
// // //         destination.lon
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ Search destination dengan DEBOUNCE
// // //   const handleSearchDestination = async (query: string) => {
// // //     setDestination({ ...destination, name: query })
// // //     setFormData(prev => ({ ...prev, destination: query }))
// // //     setIsDestinationValid(false)
    
// // //     if (searchTimeoutRef.current) {
// // //       clearTimeout(searchTimeoutRef.current)
// // //     }
    
// // //     if (query.length > 2) {
// // //       setIsSearchingDest(true)
// // //       searchTimeoutRef.current = setTimeout(async () => {
// // //         try {
// // //           const results = await searchLocations(query)
// // //           setDestSuggestions(results)
// // //           setShowDestSuggestions(true)
// // //         } catch (error) {
// // //           console.error('Search error:', error)
// // //           setDestSuggestions([])
// // //         } finally {
// // //           setIsSearchingDest(false)
// // //         }
// // //       }, 500)
// // //     } else {
// // //       setDestSuggestions([])
// // //       setShowDestSuggestions(false)
// // //       setIsSearchingDest(false)
// // //     }
// // //   }
  
// // //   // ✅ Select destination dengan validasi
// // //   const handleSelectDestination = (location: LocationSuggestion) => {
// // //     if (!validateSelectedLocation(location, 'destination')) {
// // //       return
// // //     }
    
// // //     setDestination({
// // //       name: location.display_name,
// // //       lat: parseFloat(location.lat),
// // //       lon: parseFloat(location.lon),
// // //     })
// // //     setFormData(prev => ({ ...prev, destination: location.display_name }))
// // //     setDestSuggestions([])
// // //     setShowDestSuggestions(false)
// // //     setIsDestinationValid(true)
// // //     setError(null) // Clear error
    
// // //     if (startLocation.lat !== 0 && startLocation.lon !== 0) {
// // //       calculateDistanceAndBudget(
// // //         startLocation.lat,
// // //         startLocation.lon,
// // //         parseFloat(location.lat),
// // //         parseFloat(location.lon)
// // //       )
// // //     }
// // //   }
  
// // //   // ✅ Calculate distance & estimated budget dengan VALIDASI LENGKAP
// // //   const calculateDistanceAndBudget = async (
// // //     startLat: number,
// // //     startLon: number,
// // //     endLat: number,
// // //     endLon: number
// // //   ) => {
// // //     try {
// // //       setIsCalculatingDistance(true)
// // //       setError(null)
      
// // //       // ✅ Validasi koordinat tidak sama
// // //       if (startLat === endLat && startLon === endLon) {
// // //         setError('Lokasi awal dan tujuan tidak boleh sama')
// // //         setDistance(0)
// // //         setFormData(prev => ({ ...prev, estimated_budget: '' }))
// // //         return
// // //       }
      
// // //       const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
// // //       if (route) {
// // //         const distKm = metersToKm(route.distance)
        
// // //         // ✅ VALIDASI: Cek apakah jarak realistic
// // //         if (distKm < 1) {
// // //           setError('Jarak terlalu dekat. Pastikan lokasi awal dan tujuan berbeda.')
// // //           setDistance(0)
// // //           setFormData(prev => ({ ...prev, estimated_budget: '' }))
// // //           return
// // //         }
        
// // //         if (distKm > 5000) {
// // //           setError('Jarak terhitung tidak realistic. Silakan pilih lokasi yang lebih spesifik.')
// // //           setDistance(0)
// // //           setFormData(prev => ({ ...prev, estimated_budget: '' }))
// // //           return
// // //         }
        
// // //         setDistance(distKm)
        
// // //         const budget = estimateBudget(distKm)
// // //         setFormData(prev => ({
// // //           ...prev,
// // //           estimated_budget: budget.toString(),
// // //         }))
// // //       } else {
// // //         setError('Gagal menghitung jarak. Silakan coba pilih lokasi lain.')
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to calculate distance:', error)
// // //       setError('Gagal menghitung jarak. Silakan coba lagi atau hubungi administrator.')
// // //     } finally {
// // //       setIsCalculatingDistance(false)
// // //     }
// // //   }

// // //   const handleChange = (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // //   ) => {
// // //     const { name, value } = e.target
// // //     setFormData(prev => ({
// // //       ...prev,
// // //       [name]: value
// // //     }))
// // //   }

// // //   // ✅ Validasi form LENGKAP
// // //   const validateForm = (): boolean => {
// // //     if (!formData.destination.trim()) {
// // //       setError('Destination is required')
// // //       return false
// // //     }
    
// // //     // ✅ Validasi tambahan: pastikan destination sudah dipilih dari dropdown
// // //     if (!isDestinationValid) {
// // //       setError('Silakan pilih destination dari daftar suggestions')
// // //       return false
// // //     }
    
// // //     if (!formData.purpose.trim()) {
// // //       setError('Purpose is required')
// // //       return false
// // //     }
// // //     if (!formData.start_date) {
// // //       setError('Start date is required')
// // //       return false
// // //     }
// // //     if (!formData.end_date) {
// // //       setError('End date is required')
// // //       return false
// // //     }
// // //     if (new Date(formData.end_date) < new Date(formData.start_date)) {
// // //       setError('End date must be after start date')
// // //       return false
// // //     }
// // //     if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
// // //       setError('Estimated budget must be greater than 0')
// // //       return false
// // //     }
    
// // //     // ✅ Validasi budget realistic
// // //     const budget = parseFloat(formData.estimated_budget)
// // //     if (budget > 100000000) { // Rp 100 juta
// // //       setError('Estimated budget seems too high. Please check the amount.')
// // //       return false
// // //     }
    
// // //     return true
// // //   }

// // //   const handleSubmit = async (e: FormEvent) => {
// // //     e.preventDefault()
// // //     setError(null)

// // //     if (!validateForm()) {
// // //       return
// // //     }

// // //     try {
// // //       setIsSubmitting(true)

// // //       const tripData = {
// // //         ...formData,
// // //         estimated_budget: parseFloat(formData.estimated_budget),
// // //         start_location_name: startLocation.name || null,
// // //         start_location_lat: startLocation.lat || null,
// // //         start_location_lon: startLocation.lon || null,
// // //         destination_lat: destination.lat || null,
// // //         destination_lon: destination.lon || null,
// // //         calculated_distance: distance || null,
// // //       }

// // //       // ✅ Kembali ke halaman trips (bukan trip detail)
// // //       await tripAPI.create(tripData)
// // //       navigate('/employee/trips')
// // //     } catch (err: any) {
// // //       setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
// // //     } finally {
// // //       setIsSubmitting(false)
// // //     }
// // //   }

// // //   return (
// // //     <div className="container max-w-2xl mx-auto py-8">
// // //       <Button
// // //         variant="ghost"
// // //         className="mb-6"
// // //         onClick={() => navigate('/employee/dashboard')}
// // //       >
// // //         <ArrowLeft className="mr-2 h-4 w-4" />
// // //         Back to Dashboard
// // //       </Button>

// // //       <Card>
// // //         <CardHeader>
// // //           <CardTitle>New Trip Request</CardTitle>
// // //           <CardDescription>
// // //             Fill in the details of your upcoming business trip
// // //           </CardDescription>
// // //         </CardHeader>

// // //         <form onSubmit={handleSubmit}>
// // //           <CardContent className="space-y-6">
// // //             {error && (
// // //               <Alert variant="destructive">
// // //                 <XCircle className="h-4 w-4 mr-2" />
// // //                 <AlertDescription>{error}</AlertDescription>
// // //               </Alert>
// // //             )}

// // //             {/* ✅ Start Location - dengan indicator validasi */}
// // //             <div className="space-y-2" ref={startLocationRef}>
// // //               <Label htmlFor="start_location">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Start Location
// // //                 {isStartLocationValid && (
// // //                   <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
// // //                 )}
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="start_location"
// // //                   value={startLocation.name}
// // //                   onChange={(e) => handleSearchStartLocation(e.target.value)}
// // //                   placeholder="e.g., Jl. Teuku Umar No.2, Pontianak"
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showStartSuggestions && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
// // //                     <CardContent className="p-2">
// // //                       {isSearchingStart ? (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
// // //                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
// // //                           Mencari lokasi...
// // //                         </div>
// // //                       ) : startSuggestions.length > 0 ? (
// // //                         <>
// // //                           <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
// // //                             Pilih lokasi dari daftar:
// // //                           </div>
// // //                           {startSuggestions.map((location) => (
// // //                             <div
// // //                               key={location.place_id}
// // //                               className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
// // //                               onClick={() => handleSelectStartLocation(location)}
// // //                             >
// // //                               <p className="font-medium">{location.display_name}</p>
// // //                               <p className="text-xs text-muted-foreground mt-1">
// // //                                 📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
// // //                               </p>
// // //                             </div>
// // //                           ))}
// // //                         </>
// // //                       ) : (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           ❌ Lokasi tidak ditemukan. Coba ketik nama jalan yang lebih spesifik.
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //               <p className="text-xs text-muted-foreground">
// // //                 {isStartLocationValid 
// // //                   ? "✅ Lokasi awal telah dipilih" 
// // //                   : "Pilih titik awal untuk perhitungan jarak otomatis"
// // //                 }
// // //               </p>
// // //             </div>

// // //             {/* ✅ Destination - dengan indicator validasi */}
// // //             <div className="space-y-2" ref={destinationRef}>
// // //               <Label htmlFor="destination">
// // //                 <MapPin className="inline h-4 w-4 mr-1" />
// // //                 Destination <span className="text-destructive">*</span>
// // //                 {isDestinationValid && (
// // //                   <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
// // //                 )}
// // //               </Label>
// // //               <div className="relative">
// // //                 <Input
// // //                   id="destination"
// // //                   name="destination"
// // //                   value={formData.destination}
// // //                   onChange={(e) => handleSearchDestination(e.target.value)}
// // //                   placeholder="e.g., Sanggau, Kalimantan Barat"
// // //                   required
// // //                   className="pr-10"
// // //                 />
// // //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// // //                 {showDestSuggestions && (
// // //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
// // //                     <CardContent className="p-2">
// // //                       {isSearchingDest ? (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
// // //                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
// // //                           Mencari lokasi...
// // //                         </div>
// // //                       ) : destSuggestions.length > 0 ? (
// // //                         <>
// // //                           <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
// // //                             Pilih lokasi dari daftar:
// // //                           </div>
// // //                           {destSuggestions.map((location) => (
// // //                             <div
// // //                               key={location.place_id}
// // //                               className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
// // //                               onClick={() => handleSelectDestination(location)}
// // //                             >
// // //                               <p className="font-medium">{location.display_name}</p>
// // //                               <p className="text-xs text-muted-foreground mt-1">
// // //                                 📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
// // //                               </p>
// // //                             </div>
// // //                           ))}
// // //                         </>
// // //                       ) : (
// // //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// // //                           ❌ Lokasi tidak ditemukan. Coba ketik nama kota/kabupaten yang lebih spesifik.
// // //                         </div>
// // //                       )}
// // //                     </CardContent>
// // //                   </Card>
// // //                 )}
// // //               </div>
// // //               <p className="text-xs text-muted-foreground">
// // //                 {isDestinationValid 
// // //                   ? "✅ Lokasi tujuan telah dipilih" 
// // //                   : "Pilih lokasi tujuan dari daftar suggestions"
// // //                 }
// // //               </p>
// // //             </div>

// // //             {/* ✅ Distance Info (Auto-calculated) */}
// // //             {distance > 0 && (
// // //               <Alert className="bg-blue-50 border-blue-200">
// // //                 <Info className="h-4 w-4 text-blue-600" />
// // //                 <AlertDescription>
// // //                   <p className="font-medium text-blue-900">
// // //                     📍 Distance: {distance} km
// // //                   </p>
// // //                   <p className="text-sm text-blue-700">
// // //                     Estimated budget calculated automatically (Rp 5.000/km)
// // //                   </p>
// // //                 </AlertDescription>
// // //               </Alert>
// // //             )}

// // //             <div className="space-y-2">
// // //               <Label htmlFor="purpose">
// // //                 Purpose <span className="text-destructive">*</span>
// // //               </Label>
// // //               <Textarea
// // //                 id="purpose"
// // //                 name="purpose"
// // //                 value={formData.purpose}
// // //                 onChange={handleChange}
// // //                 placeholder="Brief description of the trip purpose"
// // //                 required
// // //                 rows={3}
// // //               />
// // //             </div>

// // //             <div className="grid grid-cols-2 gap-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="start_date">
// // //                   Start Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="start_date"
// // //                   name="start_date"
// // //                   value={formData.start_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>

// // //               <div className="space-y-2">
// // //                 <Label htmlFor="end_date">
// // //                   End Date <span className="text-destructive">*</span>
// // //                 </Label>
// // //                 <Input
// // //                   type="date"
// // //                   id="end_date"
// // //                   name="end_date"
// // //                   value={formData.end_date}
// // //                   onChange={handleChange}
// // //                   required
// // //                   min={formData.start_date || new Date().toISOString().split('T')[0]}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* ✅ Estimated Budget DISABLED */}
// // //             <div className="space-y-2">
// // //               <Label htmlFor="estimated_budget">
// // //                 Estimated Budget <span className="text-destructive">*</span>
// // //               </Label>
// // //               <div className="relative">
// // //                 <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// // //                 <Input
// // //                   type="number"
// // //                   id="estimated_budget"
// // //                   name="estimated_budget"
// // //                   value={formData.estimated_budget}
// // //                   onChange={handleChange}
// // //                   className="pl-10"
// // //                   placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
// // //                   required
// // //                   min="1"
// // //                   disabled={true} // ✅ SELALU DISABLED
// // //                 />
// // //               </div>
// // //               {isCalculatingDistance && (
// // //                 <p className="text-xs text-muted-foreground flex items-center gap-1">
// // //                   <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
// // //                   Calculating distance and budget...
// // //                 </p>
// // //               )}
// // //               <p className="text-xs text-muted-foreground">
// // //                 {distance > 0 
// // //                   ? "💰 Budget calculated automatically based on distance"
// // //                   : "📍 Select locations for automatic budget calculation"
// // //                 }
// // //               </p>
// // //             </div>

// // //             <div className="space-y-2">
// // //               <Label htmlFor="notes">Additional Notes</Label>
// // //               <Textarea
// // //                 id="notes"
// // //                 name="notes"
// // //                 value={formData.notes}
// // //                 onChange={handleChange}
// // //                 placeholder="Any additional information (optional)"
// // //                 rows={3}
// // //               />
// // //             </div>
// // //           </CardContent>

// // //           <CardFooter className="flex justify-end space-x-4">
// // //             <Button
// // //               type="button"
// // //               variant="outline"
// // //               onClick={() => navigate('/employee/trips')}
// // //               disabled={isSubmitting}
// // //             >
// // //               Cancel
// // //             </Button>
// // //             <Button type="submit" disabled={isSubmitting}>
// // //               {isSubmitting ? (
// // //                 <>
// // //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// // //                   Submitting...
// // //                 </>
// // //               ) : (
// // //                 'Create Trip Request'
// // //               )}
// // //             </Button>
// // //           </CardFooter>
// // //         </form>
// // //       </Card>
// // //     </div>
// // //   )
// // // }


// // import { useState, FormEvent, useRef, useEffect } from 'react'
// // import { useNavigate, Link } from 'react-router-dom'
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import { ArrowLeft, Info, MapPin, Navigation, CheckCircle2, XCircle } from 'lucide-react'
// // import { tripAPI } from '@/services/api'

// // // ✅ IMPORT YANG BENAR!
// // import { searchLocations, calculateDistance, metersToKm, estimateBudget } from '@/services/locationAPI'
// // import { LocationSuggestion } from '@/types'

// // interface TripFormData {
// //   destination: string
// //   purpose: string
// //   start_date: string
// //   end_date: string
// //   estimated_budget: string
// //   notes: string
// // }

// // export default function NewTrip() {
// //   const navigate = useNavigate()
// //   const [isSubmitting, setIsSubmitting] = useState(false)
// //   const [error, setError] = useState<string | null>(null)
// //   const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
// //   // ✅ State untuk OpenStreetMap
// //   const [startLocation, setStartLocation] = useState({
// //     name: '',
// //     lat: 0,
// //     lon: 0,
// //   })
  
// //   const [destination, setDestination] = useState({
// //     name: '',
// //     lat: 0,
// //     lon: 0,
// //   })
  
// //   const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
// //   const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
// //   const [showStartSuggestions, setShowStartSuggestions] = useState(false)
// //   const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
// //   const [distance, setDistance] = useState(0)
// //   const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
// //   const [isSearchingStart, setIsSearchingStart] = useState(false)
// //   const [isSearchingDest, setIsSearchingDest] = useState(false)

// //   // ✅ State untuk validasi lokasi
// //   const [isStartLocationValid, setIsStartLocationValid] = useState(false)
// //   const [isDestinationValid, setIsDestinationValid] = useState(false)

// //   const [formData, setFormData] = useState<TripFormData>({
// //     destination: '',
// //     purpose: '',
// //     start_date: '',
// //     end_date: '',
// //     estimated_budget: '',
// //     notes: ''
// //   })

// //   // ✅ Ref untuk debounce dan click outside
// //   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
// //   const startLocationRef = useRef<HTMLDivElement>(null)
// //   const destinationRef = useRef<HTMLDivElement>(null)

// //   // ✅ Close suggestions ketika klik di luar
// //   useEffect(() => {
// //     const handleClickOutside = (event: MouseEvent) => {
// //       if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
// //         setShowStartSuggestions(false)
// //       }
// //       if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
// //         setShowDestSuggestions(false)
// //       }
// //     }

// //     document.addEventListener('mousedown', handleClickOutside)
// //     return () => {
// //       document.removeEventListener('mousedown', handleClickOutside)
// //     }
// //   }, [])

// //   // ✅ Validasi ketika memilih lokasi
// //   const validateSelectedLocation = (location: LocationSuggestion, type: 'start' | 'destination'): boolean => {
// //     // Cek apakah lokasi cukup spesifik
// //     const hasGoodDetail = location.display_name && 
// //                          (location.display_name.includes('Jl.') || 
// //                           location.display_name.includes('Jalan') ||
// //                           location.display_name.includes('Kota') ||
// //                           location.display_name.includes('Kecamatan') ||
// //                           location.display_name.split(',').length >= 2)
    
// //     if (!hasGoodDetail) {
// //       setError(`Lokasi ${type === 'start' ? 'awal' : 'tujuan'} terlalu umum. Pilih lokasi yang lebih spesifik.`)
// //       return false
// //     }
    
// //     return true
// //   }

// //   // ✅ Search start location dengan DEBOUNCE
// //   const handleSearchStartLocation = async (query: string) => {
// //     setStartLocation({ ...startLocation, name: query })
// //     setIsStartLocationValid(false)
    
// //     if (searchTimeoutRef.current) {
// //       clearTimeout(searchTimeoutRef.current)
// //     }
    
// //     if (query.length > 2) {
// //       setIsSearchingStart(true)
// //       searchTimeoutRef.current = setTimeout(async () => {
// //         try {
// //           const results = await searchLocations(query)
// //           setStartSuggestions(results)
// //           setShowStartSuggestions(true)
// //         } catch (error) {
// //           console.error('Search error:', error)
// //           setStartSuggestions([])
// //         } finally {
// //           setIsSearchingStart(false)
// //         }
// //       }, 500)
// //     } else {
// //       setStartSuggestions([])
// //       setShowStartSuggestions(false)
// //       setIsSearchingStart(false)
// //     }
// //   }
  
// //   // ✅ Select start location dengan validasi
// //   const handleSelectStartLocation = (location: LocationSuggestion) => {
// //     if (!validateSelectedLocation(location, 'start')) {
// //       return
// //     }
    
// //     setStartLocation({
// //       name: location.display_name,
// //       lat: parseFloat(location.lat),
// //       lon: parseFloat(location.lon),
// //     })
// //     setStartSuggestions([])
// //     setShowStartSuggestions(false)
// //     setIsStartLocationValid(true)
// //     setError(null) // Clear error
    
// //     if (destination.lat !== 0 && destination.lon !== 0) {
// //       calculateDistanceAndBudget(
// //         parseFloat(location.lat),
// //         parseFloat(location.lon),
// //         destination.lat,
// //         destination.lon
// //       )
// //     }
// //   }
  
// //   // ✅ Search destination dengan DEBOUNCE
// //   const handleSearchDestination = async (query: string) => {
// //     setDestination({ ...destination, name: query })
// //     setFormData(prev => ({ ...prev, destination: query }))
// //     setIsDestinationValid(false)
    
// //     if (searchTimeoutRef.current) {
// //       clearTimeout(searchTimeoutRef.current)
// //     }
    
// //     if (query.length > 2) {
// //       setIsSearchingDest(true)
// //       searchTimeoutRef.current = setTimeout(async () => {
// //         try {
// //           const results = await searchLocations(query)
// //           setDestSuggestions(results)
// //           setShowDestSuggestions(true)
// //         } catch (error) {
// //           console.error('Search error:', error)
// //           setDestSuggestions([])
// //         } finally {
// //           setIsSearchingDest(false)
// //         }
// //       }, 500)
// //     } else {
// //       setDestSuggestions([])
// //       setShowDestSuggestions(false)
// //       setIsSearchingDest(false)
// //     }
// //   }
  
// //   // ✅ Select destination dengan validasi
// //   const handleSelectDestination = (location: LocationSuggestion) => {
// //     if (!validateSelectedLocation(location, 'destination')) {
// //       return
// //     }
    
// //     setDestination({
// //       name: location.display_name,
// //       lat: parseFloat(location.lat),
// //       lon: parseFloat(location.lon),
// //     })
// //     setFormData(prev => ({ ...prev, destination: location.display_name }))
// //     setDestSuggestions([])
// //     setShowDestSuggestions(false)
// //     setIsDestinationValid(true)
// //     setError(null) // Clear error
    
// //     if (startLocation.lat !== 0 && startLocation.lon !== 0) {
// //       calculateDistanceAndBudget(
// //         startLocation.lat,
// //         startLocation.lon,
// //         parseFloat(location.lat),
// //         parseFloat(location.lon)
// //       )
// //     }
// //   }
  
// //   // ✅ Calculate distance & estimated budget dengan VALIDASI LENGKAP
// //   const calculateDistanceAndBudget = async (
// //     startLat: number,
// //     startLon: number,
// //     endLat: number,
// //     endLon: number
// //   ) => {
// //     try {
// //       setIsCalculatingDistance(true)
// //       setError(null)
      
// //       // ✅ Validasi koordinat tidak sama
// //       if (startLat === endLat && startLon === endLon) {
// //         setError('Lokasi awal dan tujuan tidak boleh sama')
// //         setDistance(0)
// //         setFormData(prev => ({ ...prev, estimated_budget: '' }))
// //         return
// //       }
      
// //       const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
// //       if (route) {
// //         const distKm = metersToKm(route.distance)
        
// //         // ✅ VALIDASI: Cek apakah jarak realistic
// //         if (distKm < 1) {
// //           setError('Jarak terlalu dekat. Pastikan lokasi awal dan tujuan berbeda.')
// //           setDistance(0)
// //           setFormData(prev => ({ ...prev, estimated_budget: '' }))
// //           return
// //         }
        
// //         if (distKm > 5000) {
// //           setError('Jarak terhitung tidak realistic. Silakan pilih lokasi yang lebih spesifik.')
// //           setDistance(0)
// //           setFormData(prev => ({ ...prev, estimated_budget: '' }))
// //           return
// //         }
        
// //         setDistance(distKm)
        
// //         const budget = estimateBudget(distKm)
// //         setFormData(prev => ({
// //           ...prev,
// //           estimated_budget: budget.toString(),
// //         }))
// //       } else {
// //         setError('Gagal menghitung jarak. Silakan coba pilih lokasi lain.')
// //       }
// //     } catch (error) {
// //       console.error('Failed to calculate distance:', error)
// //       setError('Gagal menghitung jarak. Silakan coba lagi atau hubungi administrator.')
// //     } finally {
// //       setIsCalculatingDistance(false)
// //     }
// //   }

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: value
// //     }))
// //   }

// //   // ✅ Validasi form LENGKAP
// //   const validateForm = (): boolean => {
// //     if (!formData.destination.trim()) {
// //       setError('Destination is required')
// //       return false
// //     }
    
// //     // ✅ Validasi tambahan: pastikan destination sudah dipilih dari dropdown
// //     if (!isDestinationValid) {
// //       setError('Silakan pilih destination dari daftar suggestions')
// //       return false
// //     }
    
// //     if (!formData.purpose.trim()) {
// //       setError('Purpose is required')
// //       return false
// //     }
// //     if (!formData.start_date) {
// //       setError('Start date is required')
// //       return false
// //     }
// //     if (!formData.end_date) {
// //       setError('End date is required')
// //       return false
// //     }
// //     if (new Date(formData.end_date) < new Date(formData.start_date)) {
// //       setError('End date must be after start date')
// //       return false
// //     }
// //     if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
// //       setError('Estimated budget must be greater than 0')
// //       return false
// //     }
    
// //     // ✅ Validasi budget realistic
// //     const budget = parseFloat(formData.estimated_budget)
// //     if (budget > 100000000) { // Rp 100 juta
// //       setError('Estimated budget seems too high. Please check the amount.')
// //       return false
// //     }
    
// //     return true
// //   }

// //   const handleSubmit = async (e: FormEvent) => {
// //     e.preventDefault()
// //     setError(null)
// //     setSuccessMessage(null)

// //     if (!validateForm()) {
// //       return
// //     }

// //     try {
// //       setIsSubmitting(true)

// //       const tripData = {
// //         ...formData,
// //         estimated_budget: parseFloat(formData.estimated_budget),
// //         start_location_name: startLocation.name || null,
// //         start_location_lat: startLocation.lat || null,
// //         start_location_lon: startLocation.lon || null,
// //         destination_lat: destination.lat || null,
// //         destination_lon: destination.lon || null,
// //         calculated_distance: distance || null,
// //       }

// //       const response = await tripAPI.create(tripData)
      
// //       // ✅ TAMPILKAN SUKSES MESSAGE
// //       setSuccessMessage('Trip created successfully! Redirecting to trip details...')
      
// //       // ✅ REDIRECT KE TRIP DETAIL SETELAH 1.5 DETIK
// //       setTimeout(() => {
// //         navigate(`/employee/trips/${response.data.data.trip_id}`)
// //       }, 1500)

// //     } catch (err: any) {
// //       setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
// //       setIsSubmitting(false)
// //     }
// //   }

// //   return (
// //     <div className="container max-w-2xl mx-auto py-8">
// //       <Button
// //         variant="ghost"
// //         className="mb-6"
// //         onClick={() => navigate('/employee/trips')}
// //       >
// //         <ArrowLeft className="mr-2 h-4 w-4" />
// //         Back to Trips
// //       </Button>

// //       <Card>
// //         <CardHeader>
// //           <CardTitle>New Trip Request</CardTitle>
// //           <CardDescription>
// //             Fill in the details of your upcoming business trip
// //           </CardDescription>
// //         </CardHeader>

// //         <form onSubmit={handleSubmit}>
// //           <CardContent className="space-y-6">
// //             {error && (
// //               <Alert variant="destructive">
// //                 <XCircle className="h-4 w-4 mr-2" />
// //                 <AlertDescription>{error}</AlertDescription>
// //               </Alert>
// //             )}

// //             {successMessage && (
// //               <Alert className="bg-green-50 border-green-200">
// //                 <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
// //                 <AlertDescription className="text-green-800">
// //                   {successMessage}
// //                 </AlertDescription>
// //               </Alert>
// //             )}

// //             {/* ✅ Start Location - dengan indicator validasi */}
// //             <div className="space-y-2" ref={startLocationRef}>
// //               <Label htmlFor="start_location">
// //                 <MapPin className="inline h-4 w-4 mr-1" />
// //                 Start Location
// //                 {isStartLocationValid && (
// //                   <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
// //                 )}
// //               </Label>
// //               <div className="relative">
// //                 <Input
// //                   id="start_location"
// //                   value={startLocation.name}
// //                   onChange={(e) => handleSearchStartLocation(e.target.value)}
// //                   placeholder="e.g., Jl. Teuku Umar No.2, Pontianak"
// //                   className="pr-10"
// //                 />
// //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// //                 {showStartSuggestions && (
// //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
// //                     <CardContent className="p-2">
// //                       {isSearchingStart ? (
// //                         <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
// //                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
// //                           Mencari lokasi...
// //                         </div>
// //                       ) : startSuggestions.length > 0 ? (
// //                         <>
// //                           <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
// //                             Pilih lokasi dari daftar:
// //                           </div>
// //                           {startSuggestions.map((location) => (
// //                             <div
// //                               key={location.place_id}
// //                               className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
// //                               onClick={() => handleSelectStartLocation(location)}
// //                             >
// //                               <p className="font-medium">{location.display_name}</p>
// //                               <p className="text-xs text-muted-foreground mt-1">
// //                                 📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </>
// //                       ) : (
// //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// //                           ❌ Lokasi tidak ditemukan. Coba ketik nama jalan yang lebih spesifik.
// //                         </div>
// //                       )}
// //                     </CardContent>
// //                   </Card>
// //                 )}
// //               </div>
// //               <p className="text-xs text-muted-foreground">
// //                 {isStartLocationValid 
// //                   ? "✅ Lokasi awal telah dipilih" 
// //                   : "Pilih titik awal untuk perhitungan jarak otomatis"
// //                 }
// //               </p>
// //             </div>

// //             {/* ✅ Destination - dengan indicator validasi */}
// //             <div className="space-y-2" ref={destinationRef}>
// //               <Label htmlFor="destination">
// //                 <MapPin className="inline h-4 w-4 mr-1" />
// //                 Destination <span className="text-destructive">*</span>
// //                 {isDestinationValid && (
// //                   <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
// //                 )}
// //               </Label>
// //               <div className="relative">
// //                 <Input
// //                   id="destination"
// //                   name="destination"
// //                   value={formData.destination}
// //                   onChange={(e) => handleSearchDestination(e.target.value)}
// //                   placeholder="e.g., Sanggau, Kalimantan Barat"
// //                   required
// //                   className="pr-10"
// //                 />
// //                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
// //                 {showDestSuggestions && (
// //                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
// //                     <CardContent className="p-2">
// //                       {isSearchingDest ? (
// //                         <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
// //                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
// //                           Mencari lokasi...
// //                         </div>
// //                       ) : destSuggestions.length > 0 ? (
// //                         <>
// //                           <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
// //                             Pilih lokasi dari daftar:
// //                           </div>
// //                           {destSuggestions.map((location) => (
// //                             <div
// //                               key={location.place_id}
// //                               className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
// //                               onClick={() => handleSelectDestination(location)}
// //                             >
// //                               <p className="font-medium">{location.display_name}</p>
// //                               <p className="text-xs text-muted-foreground mt-1">
// //                                 📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </>
// //                       ) : (
// //                         <div className="px-3 py-2 text-sm text-muted-foreground">
// //                           ❌ Lokasi tidak ditemukan. Coba ketik nama kota/kabupaten yang lebih spesifik.
// //                         </div>
// //                       )}
// //                     </CardContent>
// //                   </Card>
// //                 )}
// //               </div>
// //               <p className="text-xs text-muted-foreground">
// //                 {isDestinationValid 
// //                   ? "✅ Lokasi tujuan telah dipilih" 
// //                   : "Pilih lokasi tujuan dari daftar suggestions"
// //                 }
// //               </p>
// //             </div>

// //             {/* ✅ Distance Info (Auto-calculated) */}
// //             {distance > 0 && (
// //               <Alert className="bg-blue-50 border-blue-200">
// //                 <Info className="h-4 w-4 text-blue-600" />
// //                 <AlertDescription>
// //                   <p className="font-medium text-blue-900">
// //                     📍 Distance: {distance} km
// //                   </p>
// //                   <p className="text-sm text-blue-700">
// //                     Estimated budget calculated automatically (Rp 5.000/km)
// //                   </p>
// //                 </AlertDescription>
// //               </Alert>
// //             )}

// //             <div className="space-y-2">
// //               <Label htmlFor="purpose">
// //                 Purpose <span className="text-destructive">*</span>
// //               </Label>
// //               <Textarea
// //                 id="purpose"
// //                 name="purpose"
// //                 value={formData.purpose}
// //                 onChange={handleChange}
// //                 placeholder="Brief description of the trip purpose"
// //                 required
// //                 rows={3}
// //               />
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="start_date">
// //                   Start Date <span className="text-destructive">*</span>
// //                 </Label>
// //                 <Input
// //                   type="date"
// //                   id="start_date"
// //                   name="start_date"
// //                   value={formData.start_date}
// //                   onChange={handleChange}
// //                   required
// //                   min={new Date().toISOString().split('T')[0]}
// //                 />
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="end_date">
// //                   End Date <span className="text-destructive">*</span>
// //                 </Label>
// //                 <Input
// //                   type="date"
// //                   id="end_date"
// //                   name="end_date"
// //                   value={formData.end_date}
// //                   onChange={handleChange}
// //                   required
// //                   min={formData.start_date || new Date().toISOString().split('T')[0]}
// //                 />
// //               </div>
// //             </div>

// //             {/* ✅ Estimated Budget DISABLED */}
// //             <div className="space-y-2">
// //               <Label htmlFor="estimated_budget">
// //                 Estimated Budget <span className="text-destructive">*</span>
// //               </Label>
// //               <div className="relative">
// //                 <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// //                 <Input
// //                   type="number"
// //                   id="estimated_budget"
// //                   name="estimated_budget"
// //                   value={formData.estimated_budget}
// //                   onChange={handleChange}
// //                   className="pl-10"
// //                   placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
// //                   required
// //                   min="1"
// //                   disabled={true} // ✅ SELALU DISABLED
// //                 />
// //               </div>
// //               {isCalculatingDistance && (
// //                 <p className="text-xs text-muted-foreground flex items-center gap-1">
// //                   <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
// //                   Calculating distance and budget...
// //                 </p>
// //               )}
// //               <p className="text-xs text-muted-foreground">
// //                 {distance > 0 
// //                   ? "💰 Budget calculated automatically based on distance"
// //                   : "📍 Select locations for automatic budget calculation"
// //                 }
// //               </p>
// //             </div>

// //             <div className="space-y-2">
// //               <Label htmlFor="notes">Additional Notes</Label>
// //               <Textarea
// //                 id="notes"
// //                 name="notes"
// //                 value={formData.notes}
// //                 onChange={handleChange}
// //                 placeholder="Any additional information (optional)"
// //                 rows={3}
// //               />
// //             </div>
// //           </CardContent>

// //           <CardFooter className="flex justify-end space-x-4">
// //             <Button
// //               type="button"
// //               variant="outline"
// //               onClick={() => navigate('/employee/trips')}
// //               disabled={isSubmitting}
// //             >
// //               Cancel
// //             </Button>
// //             <Button type="submit" disabled={isSubmitting || successMessage !== null}>
// //               {isSubmitting ? (
// //                 <>
// //                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
// //                   Creating Trip...
// //                 </>
// //               ) : successMessage ? (
// //                 <>
// //                   <CheckCircle2 className="h-4 w-4 mr-2" />
// //                   Redirecting...
// //                 </>
// //               ) : (
// //                 'Create Trip Request'
// //               )}
// //             </Button>
// //           </CardFooter>
// //         </form>
// //       </Card>
// //     </div>
// //   )
// // }




// import { useState, FormEvent, useRef, useEffect } from 'react'
// import { useNavigate, Link } from 'react-router-dom'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { ArrowLeft, Info, MapPin, Navigation, CheckCircle2, XCircle } from 'lucide-react'
// import { tripAPI } from '@/services/api'

// // ✅ IMPORT YANG BENAR!
// import { searchLocations, calculateDistance, metersToKm } from '@/services/locationAPI'
// import { LocationSuggestion } from '@/types'

// interface TripFormData {
//   destination: string
//   purpose: string
//   start_date: string
//   end_date: string
//   estimated_budget: string
//   notes: string
// }

// export default function NewTrip() {
//   const navigate = useNavigate()
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [error, setError] = useState<string | null>(null)
//   const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
//   // ✅ State untuk OpenStreetMap
//   const [startLocation, setStartLocation] = useState({
//     name: '',
//     lat: 0,
//     lon: 0,
//   })
  
//   const [destination, setDestination] = useState({
//     name: '',
//     lat: 0,
//     lon: 0,
//   })
  
//   const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
//   const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
//   const [showStartSuggestions, setShowStartSuggestions] = useState(false)
//   const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
//   const [distance, setDistance] = useState(0)
//   const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
//   const [isSearchingStart, setIsSearchingStart] = useState(false)
//   const [isSearchingDest, setIsSearchingDest] = useState(false)

//   // ✅ State untuk validasi lokasi
//   const [isStartLocationValid, setIsStartLocationValid] = useState(false)
//   const [isDestinationValid, setIsDestinationValid] = useState(false)

//   const [formData, setFormData] = useState<TripFormData>({
//     destination: '',
//     purpose: '',
//     start_date: '',
//     end_date: '',
//     estimated_budget: '',
//     notes: ''
//   })

//   // ✅ Ref untuk debounce dan click outside
//   const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
//   const startLocationRef = useRef<HTMLDivElement>(null)
//   const destinationRef = useRef<HTMLDivElement>(null)

//   // ✅ Close suggestions ketika klik di luar
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
//         setShowStartSuggestions(false)
//       }
//       if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
//         setShowDestSuggestions(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   // ✅✅✅ RECALCULATE BUDGET SAAT DATE BERUBAH ✅✅✅
//   useEffect(() => {
//     if (
//       startLocation.lat !== 0 && 
//       startLocation.lon !== 0 && 
//       destination.lat !== 0 && 
//       destination.lon !== 0 &&
//       formData.start_date &&
//       formData.end_date &&
//       distance > 0
//     ) {
//       // Recalculate budget dengan tanggal baru
//       const startDate = new Date(formData.start_date)
//       const endDate = new Date(formData.end_date)
//       const timeDiff = endDate.getTime() - startDate.getTime()
//       const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
//       const numberOfDays = daysDiff > 0 ? daysDiff : 1
      
//       // ✅ FORMULA BENAR: distance * 5000 * number_of_days
//       const pricePerKm = 5000
//       const totalBudget = Math.round(distance * pricePerKm * numberOfDays)
      
//       console.log('🔄 Recalculating budget on date change:', {
//         distance: distance,
//         numberOfDays: numberOfDays,
//         totalBudget: totalBudget
//       })
      
//       setFormData(prev => ({
//         ...prev,
//         estimated_budget: totalBudget.toString(),
//       }))
//     }
//   }, [formData.start_date, formData.end_date, distance, startLocation, destination])

//   // ✅ Validasi ketika memilih lokasi
//   const validateSelectedLocation = (location: LocationSuggestion, type: 'start' | 'destination'): boolean => {
//     // Cek apakah lokasi cukup spesifik
//     const hasGoodDetail = location.display_name && 
//                          (location.display_name.includes('Jl.') || 
//                           location.display_name.includes('Jalan') ||
//                           location.display_name.includes('Kota') ||
//                           location.display_name.includes('Kecamatan') ||
//                           location.display_name.split(',').length >= 2)
    
//     if (!hasGoodDetail) {
//       setError(`Lokasi ${type === 'start' ? 'awal' : 'tujuan'} terlalu umum. Pilih lokasi yang lebih spesifik.`)
//       return false
//     }
    
//     return true
//   }

//   // ✅ Search start location dengan DEBOUNCE
//   const handleSearchStartLocation = async (query: string) => {
//     setStartLocation({ ...startLocation, name: query })
//     setIsStartLocationValid(false)
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current)
//     }
    
//     if (query.length > 2) {
//       setIsSearchingStart(true)
//       searchTimeoutRef.current = setTimeout(async () => {
//         try {
//           const results = await searchLocations(query)
//           setStartSuggestions(results)
//           setShowStartSuggestions(true)
//         } catch (error) {
//           console.error('Search error:', error)
//           setStartSuggestions([])
//         } finally {
//           setIsSearchingStart(false)
//         }
//       }, 500)
//     } else {
//       setStartSuggestions([])
//       setShowStartSuggestions(false)
//       setIsSearchingStart(false)
//     }
//   }
  
//   // ✅ Select start location dengan validasi
//   const handleSelectStartLocation = (location: LocationSuggestion) => {
//     if (!validateSelectedLocation(location, 'start')) {
//       return
//     }
    
//     setStartLocation({
//       name: location.display_name,
//       lat: parseFloat(location.lat),
//       lon: parseFloat(location.lon),
//     })
//     setStartSuggestions([])
//     setShowStartSuggestions(false)
//     setIsStartLocationValid(true)
//     setError(null)
    
//     if (destination.lat !== 0 && destination.lon !== 0) {
//       calculateDistanceAndBudget(
//         parseFloat(location.lat),
//         parseFloat(location.lon),
//         destination.lat,
//         destination.lon
//       )
//     }
//   }
  
//   // ✅ Search destination dengan DEBOUNCE
//   const handleSearchDestination = async (query: string) => {
//     setDestination({ ...destination, name: query })
//     setFormData(prev => ({ ...prev, destination: query }))
//     setIsDestinationValid(false)
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current)
//     }
    
//     if (query.length > 2) {
//       setIsSearchingDest(true)
//       searchTimeoutRef.current = setTimeout(async () => {
//         try {
//           const results = await searchLocations(query)
//           setDestSuggestions(results)
//           setShowDestSuggestions(true)
//         } catch (error) {
//           console.error('Search error:', error)
//           setDestSuggestions([])
//         } finally {
//           setIsSearchingDest(false)
//         }
//       }, 500)
//     } else {
//       setDestSuggestions([])
//       setShowDestSuggestions(false)
//       setIsSearchingDest(false)
//     }
//   }
  
//   // ✅ Select destination dengan validasi
//   const handleSelectDestination = (location: LocationSuggestion) => {
//     if (!validateSelectedLocation(location, 'destination')) {
//       return
//     }
    
//     setDestination({
//       name: location.display_name,
//       lat: parseFloat(location.lat),
//       lon: parseFloat(location.lon),
//     })
//     setFormData(prev => ({ ...prev, destination: location.display_name }))
//     setDestSuggestions([])
//     setShowDestSuggestions(false)
//     setIsDestinationValid(true)
//     setError(null)
    
//     if (startLocation.lat !== 0 && startLocation.lon !== 0) {
//       calculateDistanceAndBudget(
//         startLocation.lat,
//         startLocation.lon,
//         parseFloat(location.lat),
//         parseFloat(location.lon)
//       )
//     }
//   }
  
//   // ✅✅✅ CALCULATE DISTANCE & BUDGET - FORMULA BARU! ✅✅✅
//   const calculateDistanceAndBudget = async (
//     startLat: number,
//     startLon: number,
//     endLat: number,
//     endLon: number
//   ) => {
//     try {
//       setIsCalculatingDistance(true)
//       setError(null)
      
//       // ✅ Validasi koordinat tidak sama
//       if (startLat === endLat && startLon === endLon) {
//         setError('Lokasi awal dan tujuan tidak boleh sama')
//         setDistance(0)
//         setFormData(prev => ({ ...prev, estimated_budget: '' }))
//         return
//       }
      
//       const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
//       if (route) {
//         const distKm = metersToKm(route.distance)
        
//         // ✅ VALIDASI: Cek apakah jarak realistic
//         if (distKm < 1) {
//           setError('Jarak terlalu dekat. Pastikan lokasi awal dan tujuan berbeda.')
//           setDistance(0)
//           setFormData(prev => ({ ...prev, estimated_budget: '' }))
//           return
//         }
        
//         if (distKm > 5000) {
//           setError('Jarak terhitung tidak realistic. Silakan pilih lokasi yang lebih spesifik.')
//           setDistance(0)
//           setFormData(prev => ({ ...prev, estimated_budget: '' }))
//           return
//         }
        
//         setDistance(distKm)
        
//         // ✅✅✅ NEW FORMULA - HITUNG JUMLAH HARI! ✅✅✅
//         // Cek apakah start_date dan end_date sudah diisi
//         if (!formData.start_date || !formData.end_date) {
//           // Kalau belum ada tanggal, pakai default 1 hari
//           const pricePerKm = 5000
//           const budget = Math.round(distKm * pricePerKm * 1)
          
//           setFormData(prev => ({
//             ...prev,
//             estimated_budget: budget.toString(),
//           }))
//           return
//         }
        
//         // Hitung jumlah hari
//         const startDate = new Date(formData.start_date)
//         const endDate = new Date(formData.end_date)
//         const timeDiff = endDate.getTime() - startDate.getTime()
//         const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
//         const numberOfDays = daysDiff > 0 ? daysDiff : 1
        
//         // ✅ FORMULA BENAR: distance * 5000 * number_of_days
//         const pricePerKm = 5000 // Rp 5000 per km
//         const totalBudget = Math.round(distKm * pricePerKm * numberOfDays)
        
//         console.log('🧮 Budget Calculation:', {
//           distance: distKm,
//           pricePerKm: pricePerKm,
//           numberOfDays: numberOfDays,
//           totalBudget: totalBudget
//         })
        
//         setFormData(prev => ({
//           ...prev,
//           estimated_budget: totalBudget.toString(),
//         }))
//       } else {
//         setError('Gagal menghitung jarak. Silakan coba pilih lokasi lain.')
//       }
//     } catch (error) {
//       console.error('Failed to calculate distance:', error)
//       setError('Gagal menghitung jarak. Silakan coba lagi atau hubungi administrator.')
//     } finally {
//       setIsCalculatingDistance(false)
//     }
//   }

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }))
//   }

//   // ✅ Validasi form LENGKAP
//   const validateForm = (): boolean => {
//     if (!formData.destination.trim()) {
//       setError('Destination is required')
//       return false
//     }
    
//     if (!isDestinationValid) {
//       setError('Silakan pilih destination dari daftar suggestions')
//       return false
//     }
    
//     if (!formData.purpose.trim()) {
//       setError('Purpose is required')
//       return false
//     }
//     if (!formData.start_date) {
//       setError('Start date is required')
//       return false
//     }
//     if (!formData.end_date) {
//       setError('End date is required')
//       return false
//     }
//     if (new Date(formData.end_date) < new Date(formData.start_date)) {
//       setError('End date must be after start date')
//       return false
//     }
//     if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
//       setError('Estimated budget must be greater than 0')
//       return false
//     }
    
//     const budget = parseFloat(formData.estimated_budget)
//     if (budget > 100000000) {
//       setError('Estimated budget seems too high. Please check the amount.')
//       return false
//     }
    
//     return true
//   }

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault()
//     setError(null)
//     setSuccessMessage(null)

//     if (!validateForm()) {
//       return
//     }

//     try {
//       setIsSubmitting(true)

//       const tripData = {
//         ...formData,
//         estimated_budget: parseFloat(formData.estimated_budget),
//         start_location_name: startLocation.name || null,
//         start_location_lat: startLocation.lat || null,
//         start_location_lon: startLocation.lon || null,
//         destination_lat: destination.lat || null,
//         destination_lon: destination.lon || null,
//         calculated_distance: distance || null,
//       }

//       const response = await tripAPI.create(tripData)
      
//       setSuccessMessage('Trip created successfully! Redirecting to trip details...')
      
//       setTimeout(() => {
//         navigate(`/employee/trips/${response.data.data.trip_id}`)
//       }, 1500)

//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
//       setIsSubmitting(false)
//     }
//   }

//   // ✅ Helper function untuk hitung days
//   const calculateDays = (): number => {
//     if (!formData.start_date || !formData.end_date) return 0
//     const startDate = new Date(formData.start_date)
//     const endDate = new Date(formData.end_date)
//     const timeDiff = endDate.getTime() - startDate.getTime()
//     const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
//     return daysDiff > 0 ? daysDiff : 1
//   }

//   return (
//     <div className="container max-w-2xl mx-auto py-8">
//       <Button
//         variant="ghost"
//         className="mb-6"
//         onClick={() => navigate('/employee/trips')}
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Trips
//       </Button>

//       <Card>
//         <CardHeader>
//           <CardTitle>New Trip Request</CardTitle>
//           <CardDescription>
//             Fill in the details of your upcoming business trip
//           </CardDescription>
//         </CardHeader>

//         <form onSubmit={handleSubmit}>
//           <CardContent className="space-y-6">
//             {error && (
//               <Alert variant="destructive">
//                 <XCircle className="h-4 w-4 mr-2" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             {successMessage && (
//               <Alert className="bg-green-50 border-green-200">
//                 <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
//                 <AlertDescription className="text-green-800">
//                   {successMessage}
//                 </AlertDescription>
//               </Alert>
//             )}

//             {/* ✅ Start Location */}
//             <div className="space-y-2" ref={startLocationRef}>
//               <Label htmlFor="start_location">
//                 <MapPin className="inline h-4 w-4 mr-1" />
//                 Start Location
//                 {isStartLocationValid && (
//                   <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
//                 )}
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="start_location"
//                   value={startLocation.name}
//                   onChange={(e) => handleSearchStartLocation(e.target.value)}
//                   placeholder="e.g., Jl. Teuku Umar No.2, Pontianak"
//                   className="pr-10"
//                 />
//                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
//                 {showStartSuggestions && (
//                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
//                     <CardContent className="p-2">
//                       {isSearchingStart ? (
//                         <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//                           Mencari lokasi...
//                         </div>
//                       ) : startSuggestions.length > 0 ? (
//                         <>
//                           <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
//                             Pilih lokasi dari daftar:
//                           </div>
//                           {startSuggestions.map((location) => (
//                             <div
//                               key={location.place_id}
//                               className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
//                               onClick={() => handleSelectStartLocation(location)}
//                             >
//                               <p className="font-medium">{location.display_name}</p>
//                               <p className="text-xs text-muted-foreground mt-1">
//                                 📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
//                               </p>
//                             </div>
//                           ))}
//                         </>
//                       ) : (
//                         <div className="px-3 py-2 text-sm text-muted-foreground">
//                           ❌ Lokasi tidak ditemukan. Coba ketik nama jalan yang lebih spesifik.
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 {isStartLocationValid 
//                   ? "✅ Lokasi awal telah dipilih" 
//                   : "Pilih titik awal untuk perhitungan jarak otomatis"
//                 }
//               </p>
//             </div>

//             {/* ✅ Destination */}
//             <div className="space-y-2" ref={destinationRef}>
//               <Label htmlFor="destination">
//                 <MapPin className="inline h-4 w-4 mr-1" />
//                 Destination <span className="text-destructive">*</span>
//                 {isDestinationValid && (
//                   <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
//                 )}
//               </Label>
//               <div className="relative">
//                 <Input
//                   id="destination"
//                   name="destination"
//                   value={formData.destination}
//                   onChange={(e) => handleSearchDestination(e.target.value)}
//                   placeholder="e.g., Sanggau, Kalimantan Barat"
//                   required
//                   className="pr-10"
//                 />
//                 <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
//                 {showDestSuggestions && (
//                   <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
//                     <CardContent className="p-2">
//                       {isSearchingDest ? (
//                         <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
//                           <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
//                           Mencari lokasi...
//                         </div>
//                       ) : destSuggestions.length > 0 ? (
//                         <>
//                           <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
//                             Pilih lokasi dari daftar:
//                           </div>
//                           {destSuggestions.map((location) => (
//                             <div
//                               key={location.place_id}
//                               className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
//                               onClick={() => handleSelectDestination(location)}
//                             >
//                               <p className="font-medium">{location.display_name}</p>
//                               <p className="text-xs text-muted-foreground mt-1">
//                                 📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
//                               </p>
//                             </div>
//                           ))}
//                         </>
//                       ) : (
//                         <div className="px-3 py-2 text-sm text-muted-foreground">
//                           ❌ Lokasi tidak ditemukan. Coba ketik nama kota/kabupaten yang lebih spesifik.
//                         </div>
//                       )}
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 {isDestinationValid 
//                   ? "✅ Lokasi tujuan telah dipilih" 
//                   : "Pilih lokasi tujuan dari daftar suggestions"
//                 }
//               </p>
//             </div>

//             {/* ✅✅✅ UPDATED DISTANCE INFO - TAMPILKAN FORMULA! ✅✅✅ */}
//             {distance > 0 && (
//               <Alert className="bg-blue-50 border-blue-200">
//                 <Info className="h-4 w-4 text-blue-600" />
//                 <AlertDescription>
//                   <p className="font-medium text-blue-900">
//                     📍 Distance: {distance} km
//                   </p>
//                   {formData.start_date && formData.end_date ? (
//                     <div className="text-sm text-blue-700 mt-2 space-y-1">
//                       <p>🗓️ Duration: {calculateDays()} day(s)</p>
//                       <p className="font-mono text-xs bg-blue-100 p-2 rounded mt-1">
//                         💰 Budget = {distance} km × Rp 5,000 × {calculateDays()} day(s)
//                         <br />
//                         <span className="font-bold">
//                           = Rp {parseInt(formData.estimated_budget || '0').toLocaleString('id-ID')}
//                         </span>
//                       </p>
//                     </div>
//                   ) : (
//                     <p className="text-sm text-blue-700 mt-1">
//                       💰 Select dates to calculate budget with trip duration
//                     </p>
//                   )}
//                 </AlertDescription>
//               </Alert>
//             )}

//             <div className="space-y-2">
//               <Label htmlFor="purpose">
//                 Purpose <span className="text-destructive">*</span>
//               </Label>
//               <Textarea
//                 id="purpose"
//                 name="purpose"
//                 value={formData.purpose}
//                 onChange={handleChange}
//                 placeholder="Brief description of the trip purpose"
//                 required
//                 rows={3}
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="start_date">
//                   Start Date <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   type="date"
//                   id="start_date"
//                   name="start_date"
//                   value={formData.start_date}
//                   onChange={handleChange}
//                   required
//                   min={new Date().toISOString().split('T')[0]}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="end_date">
//                   End Date <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   type="date"
//                   id="end_date"
//                   name="end_date"
//                   value={formData.end_date}
//                   onChange={handleChange}
//                   required
//                   min={formData.start_date || new Date().toISOString().split('T')[0]}
//                 />
//               </div>
//             </div>

//             {/* ✅ Estimated Budget DISABLED */}
//             <div className="space-y-2">
//               <Label htmlFor="estimated_budget">
//                 Estimated Budget <span className="text-destructive">*</span>
//               </Label>
//               <div className="relative">
//                 <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
//                 <Input
//                   type="number"
//                   id="estimated_budget"
//                   name="estimated_budget"
//                   value={formData.estimated_budget}
//                   onChange={handleChange}
//                   className="pl-10"
//                   placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
//                   required
//                   min="1"
//                   disabled={true}
//                 />
//               </div>
//               {isCalculatingDistance && (
//                 <p className="text-xs text-muted-foreground flex items-center gap-1">
//                   <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
//                   Calculating distance and budget...
//                 </p>
//               )}
//               <p className="text-xs text-muted-foreground">
//                 {distance > 0 
//                   ? "💰 Budget calculated automatically: distance × Rp 5,000 × days"
//                   : "📍 Select locations and dates for automatic budget calculation"
//                 }
//               </p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="notes">Additional Notes</Label>
//               <Textarea
//                 id="notes"
//                 name="notes"
//                 value={formData.notes}
//                 onChange={handleChange}
//                 placeholder="Any additional information (optional)"
//                 rows={3}
//               />
//             </div>
//           </CardContent>

//           <CardFooter className="flex justify-end space-x-4">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => navigate('/employee/trips')}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" disabled={isSubmitting || successMessage !== null}>
//               {isSubmitting ? (
//                 <>
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                   Creating Trip...
//                 </>
//               ) : successMessage ? (
//                 <>
//                   <CheckCircle2 className="h-4 w-4 mr-2" />
//                   Redirecting...
//                 </>
//               ) : (
//                 'Create Trip Request'
//               )}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }





import { useState, FormEvent, useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Info, MapPin, Navigation, CheckCircle2, XCircle } from 'lucide-react'
import { tripAPI, settingsAPI } from '@/services/api' // ✅ ADD settingsAPI

import { searchLocations, calculateDistance, metersToKm } from '@/services/locationAPI'
import { LocationSuggestion } from '@/types'

interface TripFormData {
  destination: string
  purpose: string
  start_date: string
  end_date: string
  estimated_budget: string
  notes: string
}

export default function NewTrip() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  
  // ✅ NEW: State untuk price per km (dynamic dari API)
  const [pricePerKm, setPricePerKm] = useState<number>(5000)
  const [loadingPrice, setLoadingPrice] = useState(true)
  
  const [startLocation, setStartLocation] = useState({
    name: '',
    lat: 0,
    lon: 0,
  })
  
  const [destination, setDestination] = useState({
    name: '',
    lat: 0,
    lon: 0,
  })
  
  const [startSuggestions, setStartSuggestions] = useState<LocationSuggestion[]>([])
  const [destSuggestions, setDestSuggestions] = useState<LocationSuggestion[]>([])
  const [showStartSuggestions, setShowStartSuggestions] = useState(false)
  const [showDestSuggestions, setShowDestSuggestions] = useState(false)
  
  const [distance, setDistance] = useState(0)
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
  const [isSearchingStart, setIsSearchingStart] = useState(false)
  const [isSearchingDest, setIsSearchingDest] = useState(false)

  const [isStartLocationValid, setIsStartLocationValid] = useState(false)
  const [isDestinationValid, setIsDestinationValid] = useState(false)

  const [formData, setFormData] = useState<TripFormData>({
    destination: '',
    purpose: '',
    start_date: '',
    end_date: '',
    estimated_budget: '',
    notes: ''
  })

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startLocationRef = useRef<HTMLDivElement>(null)
  const destinationRef = useRef<HTMLDivElement>(null)

  // ✅ NEW: Fetch price per km dari API saat component mount
  useEffect(() => {
    const fetchPricePerKm = async () => {
      try {
        setLoadingPrice(true)
        const response = await settingsAPI.getPricePerKm()
        const price = response.data.data.price_per_km
        setPricePerKm(price)
        console.log('✅ Loaded price per km from API:', price)
      } catch (error) {
        console.error('Failed to fetch price per km, using default:', error)
        // Fallback to default 5000 if API fails
        setPricePerKm(5000)
      } finally {
        setLoadingPrice(false)
      }
    }

    fetchPricePerKm()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startLocationRef.current && !startLocationRef.current.contains(event.target as Node)) {
        setShowStartSuggestions(false)
      }
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setShowDestSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // ✅ UPDATED: RECALCULATE dengan dynamic pricePerKm
  useEffect(() => {
    if (
      startLocation.lat !== 0 && 
      startLocation.lon !== 0 && 
      destination.lat !== 0 && 
      destination.lon !== 0 &&
      formData.start_date &&
      formData.end_date &&
      distance > 0
    ) {
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      const timeDiff = endDate.getTime() - startDate.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
      const numberOfDays = daysDiff > 0 ? daysDiff : 1
      
      // ✅ UPDATED: Use dynamic pricePerKm
      const totalBudget = Math.round(distance * pricePerKm * numberOfDays)
      
      console.log('🔄 Recalculating budget on date change:', {
        distance: distance,
        pricePerKm: pricePerKm,
        numberOfDays: numberOfDays,
        totalBudget: totalBudget
      })
      
      setFormData(prev => ({
        ...prev,
        estimated_budget: totalBudget.toString(),
      }))
    }
  }, [formData.start_date, formData.end_date, distance, startLocation, destination, pricePerKm])

  const validateSelectedLocation = (location: LocationSuggestion, type: 'start' | 'destination'): boolean => {
    const hasGoodDetail = location.display_name && 
                         (location.display_name.includes('Jl.') || 
                          location.display_name.includes('Jalan') ||
                          location.display_name.includes('Kota') ||
                          location.display_name.includes('Kecamatan') ||
                          location.display_name.split(',').length >= 2)
    
    if (!hasGoodDetail) {
      setError(`Lokasi ${type === 'start' ? 'awal' : 'tujuan'} terlalu umum. Pilih lokasi yang lebih spesifik.`)
      return false
    }
    
    return true
  }

  const handleSearchStartLocation = async (query: string) => {
    setStartLocation({ ...startLocation, name: query })
    setIsStartLocationValid(false)
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (query.length > 2) {
      setIsSearchingStart(true)
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchLocations(query)
          setStartSuggestions(results)
          setShowStartSuggestions(true)
        } catch (error) {
          console.error('Search error:', error)
          setStartSuggestions([])
        } finally {
          setIsSearchingStart(false)
        }
      }, 500)
    } else {
      setStartSuggestions([])
      setShowStartSuggestions(false)
      setIsSearchingStart(false)
    }
  }
  
  const handleSelectStartLocation = (location: LocationSuggestion) => {
    if (!validateSelectedLocation(location, 'start')) {
      return
    }
    
    setStartLocation({
      name: location.display_name,
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
    })
    setStartSuggestions([])
    setShowStartSuggestions(false)
    setIsStartLocationValid(true)
    setError(null)
    
    if (destination.lat !== 0 && destination.lon !== 0) {
      calculateDistanceAndBudget(
        parseFloat(location.lat),
        parseFloat(location.lon),
        destination.lat,
        destination.lon
      )
    }
  }
  
  const handleSearchDestination = async (query: string) => {
    setDestination({ ...destination, name: query })
    setFormData(prev => ({ ...prev, destination: query }))
    setIsDestinationValid(false)
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    if (query.length > 2) {
      setIsSearchingDest(true)
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchLocations(query)
          setDestSuggestions(results)
          setShowDestSuggestions(true)
        } catch (error) {
          console.error('Search error:', error)
          setDestSuggestions([])
        } finally {
          setIsSearchingDest(false)
        }
      }, 500)
    } else {
      setDestSuggestions([])
      setShowDestSuggestions(false)
      setIsSearchingDest(false)
    }
  }
  
  const handleSelectDestination = (location: LocationSuggestion) => {
    if (!validateSelectedLocation(location, 'destination')) {
      return
    }
    
    setDestination({
      name: location.display_name,
      lat: parseFloat(location.lat),
      lon: parseFloat(location.lon),
    })
    setFormData(prev => ({ ...prev, destination: location.display_name }))
    setDestSuggestions([])
    setShowDestSuggestions(false)
    setIsDestinationValid(true)
    setError(null)
    
    if (startLocation.lat !== 0 && startLocation.lon !== 0) {
      calculateDistanceAndBudget(
        startLocation.lat,
        startLocation.lon,
        parseFloat(location.lat),
        parseFloat(location.lon)
      )
    }
  }
  
  // ✅ UPDATED: CALCULATE dengan dynamic pricePerKm
  const calculateDistanceAndBudget = async (
    startLat: number,
    startLon: number,
    endLat: number,
    endLon: number
  ) => {
    try {
      setIsCalculatingDistance(true)
      setError(null)
      
      if (startLat === endLat && startLon === endLon) {
        setError('Lokasi awal dan tujuan tidak boleh sama')
        setDistance(0)
        setFormData(prev => ({ ...prev, estimated_budget: '' }))
        return
      }
      
      const route = await calculateDistance(startLat, startLon, endLat, endLon)
      
      if (route) {
        const distKm = metersToKm(route.distance)
        
        if (distKm < 1) {
          setError('Jarak terlalu dekat. Pastikan lokasi awal dan tujuan berbeda.')
          setDistance(0)
          setFormData(prev => ({ ...prev, estimated_budget: '' }))
          return
        }
        
        if (distKm > 5000) {
          setError('Jarak terhitung tidak realistic. Silakan pilih lokasi yang lebih spesifik.')
          setDistance(0)
          setFormData(prev => ({ ...prev, estimated_budget: '' }))
          return
        }
        
        setDistance(distKm)
        
        if (!formData.start_date || !formData.end_date) {
          // ✅ UPDATED: Use dynamic pricePerKm
          const budget = Math.round(distKm * pricePerKm * 1)
          
          setFormData(prev => ({
            ...prev,
            estimated_budget: budget.toString(),
          }))
          return
        }
        
        const startDate = new Date(formData.start_date)
        const endDate = new Date(formData.end_date)
        const timeDiff = endDate.getTime() - startDate.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
        const numberOfDays = daysDiff > 0 ? daysDiff : 1
        
        // ✅ UPDATED: Use dynamic pricePerKm
        const totalBudget = Math.round(distKm * pricePerKm * numberOfDays)
        
        console.log('🧮 Budget Calculation:', {
          distance: distKm,
          pricePerKm: pricePerKm,
          numberOfDays: numberOfDays,
          totalBudget: totalBudget
        })
        
        setFormData(prev => ({
          ...prev,
          estimated_budget: totalBudget.toString(),
        }))
      } else {
        setError('Gagal menghitung jarak. Silakan coba pilih lokasi lain.')
      }
    } catch (error) {
      console.error('Failed to calculate distance:', error)
      setError('Gagal menghitung jarak. Silakan coba lagi atau hubungi administrator.')
    } finally {
      setIsCalculatingDistance(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.destination.trim()) {
      setError('Destination is required')
      return false
    }
    
    if (!isDestinationValid) {
      setError('Silakan pilih destination dari daftar suggestions')
      return false
    }
    
    if (!formData.purpose.trim()) {
      setError('Purpose is required')
      return false
    }
    if (!formData.start_date) {
      setError('Start date is required')
      return false
    }
    if (!formData.end_date) {
      setError('End date is required')
      return false
    }
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      setError('End date must be after start date')
      return false
    }
    if (!formData.estimated_budget || parseFloat(formData.estimated_budget) <= 0) {
      setError('Estimated budget must be greater than 0')
      return false
    }
    
    const budget = parseFloat(formData.estimated_budget)
    if (budget > 100000000) {
      setError('Estimated budget seems too high. Please check the amount.')
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (!validateForm()) {
      return
    }

    try {
      setIsSubmitting(true)

      const tripData = {
        ...formData,
        estimated_budget: parseFloat(formData.estimated_budget),
        start_location_name: startLocation.name || null,
        start_location_lat: startLocation.lat || null,
        start_location_lon: startLocation.lon || null,
        destination_lat: destination.lat || null,
        destination_lon: destination.lon || null,
        calculated_distance: distance || null,
      }

      const response = await tripAPI.create(tripData)
      
      setSuccessMessage('Trip created successfully! Redirecting to trip details...')
      
      setTimeout(() => {
        navigate(`/employee/trips/${response.data.data.trip_id}`)
      }, 1500)

    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create trip. Please try again.')
      setIsSubmitting(false)
    }
  }

  const calculateDays = (): number => {
    if (!formData.start_date || !formData.end_date) return 0
    const startDate = new Date(formData.start_date)
    const endDate = new Date(formData.end_date)
    const timeDiff = endDate.getTime() - startDate.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    return daysDiff > 0 ? daysDiff : 1
  }

  // ✅ NEW: Format currency untuk display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount)
  }

  // ✅ Show loading if still fetching price
  if (loadingPrice) {
    return (
      <div className="container max-w-2xl mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading trip settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/employee/trips')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Trips
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>New Trip Request</CardTitle>
          <CardDescription>
            Fill in the details of your upcoming business trip
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                <AlertDescription className="text-green-800">
                  {successMessage}
                </AlertDescription>
              </Alert>
            )}

            {/* ... (START LOCATION FIELD - SAME AS BEFORE) ... */}
            <div className="space-y-2" ref={startLocationRef}>
              <Label htmlFor="start_location">
                <MapPin className="inline h-4 w-4 mr-1" />
                Start Location
                {isStartLocationValid && (
                  <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
                )}
              </Label>
              <div className="relative">
                <Input
                  id="start_location"
                  value={startLocation.name}
                  onChange={(e) => handleSearchStartLocation(e.target.value)}
                  placeholder="e.g., Jl. Teuku Umar No.2, Pontianak"
                  className="pr-10"
                />
                <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
                {showStartSuggestions && (
                  <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
                    <CardContent className="p-2">
                      {isSearchingStart ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          Mencari lokasi...
                        </div>
                      ) : startSuggestions.length > 0 ? (
                        <>
                          <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
                            Pilih lokasi dari daftar:
                          </div>
                          {startSuggestions.map((location) => (
                            <div
                              key={location.place_id}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
                              onClick={() => handleSelectStartLocation(location)}
                            >
                              <p className="font-medium">{location.display_name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          ❌ Lokasi tidak ditemukan. Coba ketik nama jalan yang lebih spesifik.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {isStartLocationValid 
                  ? "✅ Lokasi awal telah dipilih" 
                  : "Pilih titik awal untuk perhitungan jarak otomatis"
                }
              </p>
            </div>

            {/* ... (DESTINATION FIELD - SAME AS BEFORE) ... */}
            <div className="space-y-2" ref={destinationRef}>
              <Label htmlFor="destination">
                <MapPin className="inline h-4 w-4 mr-1" />
                Destination <span className="text-destructive">*</span>
                {isDestinationValid && (
                  <CheckCircle2 className="inline h-4 w-4 text-green-500 ml-1" />
                )}
              </Label>
              <div className="relative">
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={(e) => handleSearchDestination(e.target.value)}
                  placeholder="e.g., Sanggau, Kalimantan Barat"
                  required
                  className="pr-10"
                />
                <Navigation className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                
                {showDestSuggestions && (
                  <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-auto shadow-lg border-2 border-blue-200">
                    <CardContent className="p-2">
                      {isSearchingDest ? (
                        <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                          Mencari lokasi...
                        </div>
                      ) : destSuggestions.length > 0 ? (
                        <>
                          <div className="px-2 py-1 text-xs text-muted-foreground border-b mb-1">
                            Pilih lokasi dari daftar:
                          </div>
                          {destSuggestions.map((location) => (
                            <div
                              key={location.place_id}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer rounded text-sm border-b last:border-b-0 transition-colors"
                              onClick={() => handleSelectDestination(location)}
                            >
                              <p className="font-medium">{location.display_name}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                📍 {parseFloat(location.lat).toFixed(6)}, {parseFloat(location.lon).toFixed(6)}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          ❌ Lokasi tidak ditemukan. Coba ketik nama kota/kabupaten yang lebih spesifik.
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {isDestinationValid 
                  ? "✅ Lokasi tujuan telah dipilih" 
                  : "Pilih lokasi tujuan dari daftar suggestions"
                }
              </p>
            </div>

            {/* ✅ UPDATED: DISTANCE INFO dengan dynamic pricePerKm */}
            {distance > 0 && (
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <p className="font-medium text-blue-900">
                    📍 Distance: {distance} km
                  </p>
                  {formData.start_date && formData.end_date ? (
                    <div className="text-sm text-blue-700 mt-2 space-y-1">
                      <p>🗓️ Duration: {calculateDays()} day(s)</p>
                      <p className="font-mono text-xs bg-blue-100 p-2 rounded mt-1">
                        💰 Budget = {distance} km × Rp {formatCurrency(pricePerKm)} × {calculateDays()} day(s)
                        <br />
                        <span className="font-bold">
                          = Rp {formatCurrency(parseInt(formData.estimated_budget || '0'))}
                        </span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-blue-700 mt-1">
                      💰 Select dates to calculate budget with trip duration
                    </p>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* ... (REST OF THE FORM - PURPOSE, DATES, BUDGET, NOTES) ... */}
            <div className="space-y-2">
              <Label htmlFor="purpose">
                Purpose <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                placeholder="Brief description of the trip purpose"
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start_date">
                  Start Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  id="start_date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end_date">
                  End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  id="end_date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  required
                  min={formData.start_date || new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated_budget">
                Estimated Budget <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                <Input
                  type="number"
                  id="estimated_budget"
                  name="estimated_budget"
                  value={formData.estimated_budget}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder={distance > 0 ? "Auto-calculated" : "Enter amount"}
                  required
                  min="1"
                  disabled={true}
                />
              </div>
              {isCalculatingDistance && (
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
                  Calculating distance and budget...
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {distance > 0 
                  ? `💰 Budget calculated: distance × Rp ${formatCurrency(pricePerKm)} × days`
                  : "📍 Select locations and dates for automatic budget calculation"
                }
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional information (optional)"
                rows={3}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/employee/trips')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || successMessage !== null}>
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Trip...
                </>
              ) : successMessage ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Redirecting...
                </>
              ) : (
                'Create Trip Request'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}