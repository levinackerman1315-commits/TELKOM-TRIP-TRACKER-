// import { useState, FormEvent } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { tripAPI } from '@/services/api';
// import { useAuth } from '@/contexts/AuthContext';

// export default function NewTrip() {
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     destination: '',
//     purpose: '',
//     start_date: '',
//     end_date: '',
//     estimated_budget: ''
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!formData.destination.trim()) {
//       newErrors.destination = 'Destination is required';
//     }

//     if (!formData.purpose.trim()) {
//       newErrors.purpose = 'Purpose is required';
//     }

//     if (!formData.start_date) {
//       newErrors.start_date = 'Start date is required';
//     }

//     if (!formData.end_date) {
//       newErrors.end_date = 'End date is required';
//     }

//     if (formData.start_date && formData.end_date) {
//       const startDate = new Date(formData.start_date);
//       const endDate = new Date(formData.end_date);
      
//       if (endDate < startDate) {
//         newErrors.end_date = 'End date must be after start date';
//       }

//       // Check if start date is not in the past
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (startDate < today) {
//         newErrors.start_date = 'Start date cannot be in the past';
//       }
//     }

//     if (formData.estimated_budget && parseFloat(formData.estimated_budget) <= 0) {
//       newErrors.estimated_budget = 'Budget must be greater than 0';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);
//     setSuccessMessage('');

//     try {
//       const payload = {
//         destination: formData.destination,
//         purpose: formData.purpose,
//         start_date: formData.start_date,
//         end_date: formData.end_date,
//         estimated_budget: formData.estimated_budget ? parseFloat(formData.estimated_budget) : null
//       };

//       const response = await tripAPI.create(payload);
      
//       setSuccessMessage('Trip created successfully!');
      
//       // Redirect to trip detail after 1.5 seconds
//       setTimeout(() => {
//         navigate(`/employee/trips/${response.data.data.trip_id}`);
//       }, 1500);

//     } catch (error: any) {
//       console.error('Failed to create trip:', error);
      
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//       } else {
//         setErrors({
//           submit: error.response?.data?.message || 'Failed to create trip. Please try again.'
//         });
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const calculateDuration = () => {
//     if (formData.start_date && formData.end_date) {
//       const start = new Date(formData.start_date);
//       const end = new Date(formData.end_date);
//       const diffTime = Math.abs(end.getTime() - start.getTime());
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end date
//       return diffDays;
//     }
//     return 0;
//   };

//   const duration = calculateDuration();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Create New Trip</h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 Fill in the details for your business trip
//               </p>
//             </div>
//             <Link
//               to="/employee/dashboard"
//               className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//             >
//               ← Back
//             </Link>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Success Message */}
//         {successMessage && (
//           <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
//             <div className="flex items-center">
//               <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <p className="text-sm text-green-800 font-medium">{successMessage}</p>
//             </div>
//           </div>
//         )}

//         {/* Error Message */}
//         {errors.submit && (
//           <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-sm text-red-600">{errors.submit}</p>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow">
//           <div className="p-6 space-y-6">
//             {/* Employee Info */}
//             <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//               <h3 className="font-semibold text-blue-900 mb-2">Employee Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <span className="text-blue-700">Name:</span>
//                   <span className="ml-2 text-blue-900 font-medium">{user?.name}</span>
//                 </div>
//                 <div>
//                   <span className="text-blue-700">NIK:</span>
//                   <span className="ml-2 text-blue-900 font-medium">{user?.nik}</span>
//                 </div>
//                 <div>
//                   <span className="text-blue-700">Department:</span>
//                   <span className="ml-2 text-blue-900 font-medium">{user?.department}</span>
//                 </div>
//                 <div>
//                   <span className="text-blue-700">Position:</span>
//                   <span className="ml-2 text-blue-900 font-medium">{user?.position}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Destination */}
//             <div>
//               <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
//                 Destination <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="destination"
//                 name="destination"
//                 value={formData.destination}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
//                   errors.destination ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="e.g., Jakarta, Surabaya, Bandung"
//                 disabled={isLoading}
//               />
//               {errors.destination && (
//                 <p className="mt-1 text-sm text-red-600">{errors.destination}</p>
//               )}
//             </div>

//             {/* Purpose */}
//             <div>
//               <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
//                 Purpose of Trip <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="purpose"
//                 name="purpose"
//                 value={formData.purpose}
//                 onChange={handleChange}
//                 rows={4}
//                 className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
//                   errors.purpose ? 'border-red-500' : 'border-gray-300'
//                 }`}
//                 placeholder="Describe the purpose of your business trip..."
//                 disabled={isLoading}
//               />
//               {errors.purpose && (
//                 <p className="mt-1 text-sm text-red-600">{errors.purpose}</p>
//               )}
//             </div>

//             {/* Dates */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-2">
//                   Start Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   id="start_date"
//                   name="start_date"
//                   value={formData.start_date}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
//                     errors.start_date ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   disabled={isLoading}
//                 />
//                 {errors.start_date && (
//                   <p className="mt-1 text-sm text-red-600">{errors.start_date}</p>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
//                   End Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   id="end_date"
//                   name="end_date"
//                   value={formData.end_date}
//                   onChange={handleChange}
//                   className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
//                     errors.end_date ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   disabled={isLoading}
//                 />
//                 {errors.end_date && (
//                   <p className="mt-1 text-sm text-red-600">{errors.end_date}</p>
//                 )}
//               </div>
//             </div>

//             {/* Duration Display */}
//             {duration > 0 && (
//               <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//                 <p className="text-sm text-gray-700">
//                   <span className="font-semibold">Trip Duration:</span>
//                   <span className="ml-2 text-blue-600 font-bold">{duration} day{duration > 1 ? 's' : ''}</span>
//                 </p>
//               </div>
//             )}

//             {/* Estimated Budget */}
//             <div>
//               <label htmlFor="estimated_budget" className="block text-sm font-medium text-gray-700 mb-2">
//                 Estimated Budget (Optional)
//               </label>
//               <div className="relative">
//                 <span className="absolute left-4 top-3 text-gray-500">Rp</span>
//                 <input
//                   type="number"
//                   id="estimated_budget"
//                   name="estimated_budget"
//                   value={formData.estimated_budget}
//                   onChange={handleChange}
//                   className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
//                     errors.estimated_budget ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="0"
//                   min="0"
//                   step="1000"
//                   disabled={isLoading}
//                 />
//               </div>
//               {errors.estimated_budget && (
//                 <p className="mt-1 text-sm text-red-600">{errors.estimated_budget}</p>
//               )}
//               <p className="mt-1 text-xs text-gray-500">
//                 This is just an estimate. You can request advance (panjar) after creating the trip.
//               </p>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex items-center justify-between border-t border-gray-200">
//             <Link
//               to="/employee/dashboard"
//               className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
//             >
//               Cancel
//             </Link>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
//             >
//               {isLoading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating Trip...
//                 </span>
//               ) : (
//                 'Create Trip'
//               )}
//             </button>
//           </div>
//         </form>

//         {/* Help Text */}
//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <h4 className="font-semibold text-blue-900 mb-2 flex items-center">
//             <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//             </svg>
//             What happens next?
//           </h4>
//           <ul className="text-sm text-blue-800 space-y-1 ml-7">
//             <li>• Your trip will be created with status "Active"</li>
//             <li>• You can request advance (panjar) for initial or additional funds</li>
//             <li>• Upload receipts/bon during your trip</li>
//             <li>• Submit for review when trip is completed</li>
//             <li>• Settlement will be processed by Finance</li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  MapPin, 
  FileText, 
  Calendar, 
  DollarSign,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { tripAPI } from '@/services/api'
import { useAuth } from '@/contexts/AuthContext'

export default function NewTrip() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    destination: '',
    purpose: '',
    start_date: '',
    end_date: '',
    estimated_budget: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required'
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Purpose is required'
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required'
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End date is required'
    }

    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      
      if (endDate < startDate) {
        newErrors.end_date = 'End date must be after start date'
      }

      // Check if start date is not in the past
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (startDate < today) {
        newErrors.start_date = 'Start date cannot be in the past'
      }
    }

    if (formData.estimated_budget && parseFloat(formData.estimated_budget) <= 0) {
      newErrors.estimated_budget = 'Budget must be greater than 0'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setSuccessMessage('')

    try {
      const payload = {
        destination: formData.destination,
        purpose: formData.purpose,
        start_date: formData.start_date,
        end_date: formData.end_date,
        estimated_budget: formData.estimated_budget ? parseFloat(formData.estimated_budget) : null
      }

      const response = await tripAPI.create(payload)
      
      setSuccessMessage('Trip created successfully!')
      
      // Redirect to trip detail after 1.5 seconds
      setTimeout(() => {
        navigate(`/employee/trips/${response.data.data.trip_id}`)
      }, 1500)

    } catch (error: any) {
      console.error('Failed to create trip:', error)
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({
          submit: error.response?.data?.message || 'Failed to create trip. Please try again.'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const calculateDuration = () => {
    if (formData.start_date && formData.end_date) {
      const start = new Date(formData.start_date)
      const end = new Date(formData.end_date)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end date
      return diffDays
    }
    return 0
  }

  const duration = calculateDuration()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Link
            to="/employee/dashboard"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Create New Trip</h1>
            <p className="text-sm text-white/80">Fill in the details for your business trip</p>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        {successMessage && (
          <Alert className="mb-6 border-success bg-success/10">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertDescription className="text-success font-medium">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {errors.submit && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.submit}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Trip Information</CardTitle>
              <CardDescription>Provide the details of your business trip</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Employee Info */}
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Employee Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NIK:</span>
                    <span className="font-medium">{user?.nik}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">{user?.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Position:</span>
                    <span className="font-medium">{user?.position}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Destination <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g., Jakarta, Surabaya, Bandung"
                  disabled={isLoading}
                  className={errors.destination ? 'border-destructive' : ''}
                />
                {errors.destination && (
                  <p className="text-sm text-destructive">{errors.destination}</p>
                )}
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Purpose of Trip <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the purpose of your business trip..."
                  disabled={isLoading}
                  className={errors.purpose ? 'border-destructive' : ''}
                />
                {errors.purpose && (
                  <p className="text-sm text-destructive">{errors.purpose}</p>
                )}
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="start_date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Start Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="start_date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={errors.start_date ? 'border-destructive' : ''}
                  />
                  {errors.start_date && (
                    <p className="text-sm text-destructive">{errors.start_date}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end_date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    End Date <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="date"
                    id="end_date"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={errors.end_date ? 'border-destructive' : ''}
                  />
                  {errors.end_date && (
                    <p className="text-sm text-destructive">{errors.end_date}</p>
                  )}
                </div>
              </div>

              {/* Duration Display */}
              {duration > 0 && (
                <Alert className="bg-primary/5 border-primary/20">
                  <Info className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">
                    <span className="font-semibold">Trip Duration:</span>
                    <Badge variant="default" className="ml-2">
                      {duration} day{duration > 1 ? 's' : ''}
                    </Badge>
                  </AlertDescription>
                </Alert>
              )}

              {/* Estimated Budget */}
              <div className="space-y-2">
                <Label htmlFor="estimated_budget" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Estimated Budget (Optional)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                  <Input
                    type="number"
                    id="estimated_budget"
                    name="estimated_budget"
                    value={formData.estimated_budget}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    step="1000"
                    disabled={isLoading}
                    className={`pl-10 ${errors.estimated_budget ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.estimated_budget && (
                  <p className="text-sm text-destructive">{errors.estimated_budget}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  This is just an estimate. You can request advance (panjar) after creating the trip.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/employee/dashboard')}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Trip...
                  </>
                ) : (
                  'Create Trip'
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Help Text */}
        <Card className="bg-primary/5 border-primary/20 shadow-soft">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Info className="h-5 w-5" />
              What happens next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Your trip will be created with status "Active"</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>You can request advance (panjar) for initial or additional funds</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Upload receipts/bon during your trip</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Submit for review when trip is completed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Settlement will be processed by Finance</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}