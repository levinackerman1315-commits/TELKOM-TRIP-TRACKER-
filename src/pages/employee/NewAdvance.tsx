// // import { useState, useEffect, FormEvent } from 'react'
// // import { useNavigate, useSearchParams, Link } from 'react-router-dom'
// // import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import { ArrowLeft, DollarSign, FileText, Info, CheckCircle2, AlertCircle, Loader2, MapPin, Calendar } from 'lucide-react'
// // import { advanceAPI, tripAPI } from '@/services/api'
// // import { Trip } from '@/types'

// // export default function NewAdvance() {
// //   const navigate = useNavigate()
// //   const [searchParams] = useSearchParams()
// //   const tripId = searchParams.get('trip_id')

// //   const [trip, setTrip] = useState<Trip | null>(null)
// //   const [formData, setFormData] = useState({ request_type: 'initial' as 'initial' | 'additional', requested_amount: '', request_reason: '' })
// //   const [errors, setErrors] = useState<Record<string, string>>({})
// //   const [isLoading, setIsLoading] = useState(false)
// //   const [isFetchingTrip, setIsFetchingTrip] = useState(true)
// //   const [successMessage, setSuccessMessage] = useState('')

// //   useEffect(() => { if (tripId) fetchTrip(); else navigate('/employee/trips') }, [tripId])

// //   const fetchTrip = async () => {
// //     try {
// //       setIsFetchingTrip(true)
// //       const response = await tripAPI.getById(Number(tripId))
// //       const t = response.data.data as Trip
// //       setTrip(t)
// //       if (t.total_advance && t.total_advance > 0) setFormData(p => ({ ...p, request_type: 'additional' }))
// //     } catch {
// //       setErrors({ fetch: 'Failed to load trip details' })
// //     } finally { setIsFetchingTrip(false) }
// //   }

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
// //     const { name, value } = e.target
// //     setFormData(prev => ({ ...prev, [name]: value }))
// //     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
// //   }

// //   const validate = () => {
// //     const er: Record<string, string> = {}
// //     if (!formData.requested_amount || parseFloat(formData.requested_amount) <= 0) er.requested_amount = 'Amount must be greater than 0'
// //     if (!formData.request_reason.trim()) er.request_reason = 'Reason is required'
// //     setErrors(er); return Object.keys(er).length === 0
// //   }

// //   const submit = async (e: FormEvent) => {
// //     e.preventDefault()
// //     if (!validate()) return
// //     try {
// //       setIsLoading(true); setSuccessMessage('')
// //       await advanceAPI.create({
// //         trip_id: Number(tripId),
// //         request_type: formData.request_type,
// //         requested_amount: parseFloat(formData.requested_amount),
// //         request_reason: formData.request_reason
// //       })
// //       setSuccessMessage('Advance request submitted successfully!')
// //       setTimeout(() => navigate(`/employee/trips/${tripId}`), 1200)
// //     } catch (err: any) {
// //       if (err.response?.data?.errors) setErrors(err.response.data.errors)
// //       else setErrors({ submit: err.response?.data?.message || 'Failed to submit advance request' })
// //     } finally { setIsLoading(false) }
// //   }

// //   const formatDate = (s: string) => new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
// //   const formatCurrency = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

// //   if (isFetchingTrip) return (
// //     <div className="min-h-screen flex items-center justify-center">
// //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
// //     </div>
// //   )

// //   if (!trip) return (
// //     <div className="min-h-screen bg-background flex items-center justify-center">
// //       <Card className="max-w-md"><CardHeader><CardTitle>Trip Not Found</CardTitle></CardHeader><CardFooter><Button onClick={() => navigate('/employee/trips')}>Back to My Trips</Button></CardFooter></Card>
// //     </div>
// //   )

// //   return (
// //     <div className="min-h-screen bg-background">
// //       <div className="bg-gradient-primary border-b shadow-soft">
// //         <div className="container max-w-4xl mx-auto px-4 py-6">
// //           <Link to={`/employee/trips/${tripId}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
// //             <ArrowLeft className="h-4 w-4" /> Back to Trip Details
// //           </Link>
// //           <h1 className="text-2xl font-bold text-white">Request Advance</h1>
// //           <p className="text-sm text-white/80">Trip #{trip.trip_number} — {trip.destination}</p>
// //         </div>
// //       </div>

// //       <div className="container max-w-4xl mx-auto px-4 py-8">
// //         {successMessage && (<Alert className="mb-6 border-success bg-success/10"><CheckCircle2 className="h-4 w-4 text-success" /><AlertDescription className="text-success">{successMessage}</AlertDescription></Alert>)}
// //         {errors.submit && (<Alert variant="destructive" className="mb-6"><AlertCircle className="h-4 w-4" /><AlertDescription>{errors.submit}</AlertDescription></Alert>)}

// //         <Card className="mb-6 shadow-soft bg-primary/5 border-primary/20">
// //           <CardHeader className="pb-3"><CardTitle className="text-base">Trip Information</CardTitle></CardHeader>
// //           <CardContent className="space-y-3">
// //             <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" />Destination</span><span className="font-semibold">{trip.destination}</span></div>
// //             <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" />Duration</span><span className="font-semibold">{trip.duration} days ({formatDate(trip.start_date)} - {formatDate(trip.end_date)})</span></div>
// //             <div className="flex items-center justify-between pt-3 border-t"><span className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4" />Current Advance</span><span className="font-bold text-primary">{formatCurrency(trip.total_advance || 0)}</span></div>
// //           </CardContent>
// //         </Card>

// //         <form onSubmit={submit}>
// //           <Card className="shadow-soft mb-6">
// //             <CardHeader><CardTitle>Advance Request Details</CardTitle><CardDescription>Fill in the details</CardDescription></CardHeader>
// //             <CardContent className="space-y-6">
// //               <div className="grid grid-cols-2 gap-4">
// //                 <Card className={`cursor-pointer ${formData.request_type==='initial'?'border-primary bg-primary/5':'hover:border-primary/50'}`} onClick={()=>setFormData(p=>({...p,request_type:'initial'}))}><CardContent className="p-4 text-center"><p className="font-semibold mb-1">Initial</p><p className="text-xs text-muted-foreground">First-time request</p></CardContent></Card>
// //                 <Card className={`cursor-pointer ${formData.request_type==='additional'?'border-primary bg-primary/5':'hover:border-primary/50'}`} onClick={()=>setFormData(p=>({...p,request_type:'additional'}))}><CardContent className="p-4 text-center"><p className="font-semibold mb-1">Additional</p><p className="text-xs text-muted-foreground">Extra funds</p></CardContent></Card>
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="requested_amount" className="flex items-center gap-2"><DollarSign className="h-4 w-4" />Requested Amount <span className="text-destructive">*</span></Label>
// //                 <div className="relative"><span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
// //                   <Input type="number" id="requested_amount" name="requested_amount" value={formData.requested_amount} onChange={handleChange} min="0" step="1000" className={`pl-10 ${errors.requested_amount?'border-destructive':''}`} />
// //                 </div>
// //                 {errors.requested_amount && <p className="text-sm text-destructive">{errors.requested_amount}</p>}
// //               </div>

// //               <div className="space-y-2">
// //                 <Label htmlFor="request_reason" className="flex items-center gap-2"><FileText className="h-4 w-4" />Reason <span className="text-destructive">*</span></Label>
// //                 <Textarea id="request_reason" name="request_reason" rows={4} value={formData.request_reason} onChange={handleChange} className={errors.request_reason?'border-destructive':''} />
// //                 {errors.request_reason && <p className="text-sm text-destructive">{errors.request_reason}</p>}
// //               </div>
// //             </CardContent>
// //             <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
// //               <Button type="button" variant="outline" onClick={()=>navigate(`/employee/trips/${tripId}`)} disabled={isLoading}>Cancel</Button>
// //               <Button type="submit" disabled={isLoading}>{isLoading? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>):'Submit Request'}</Button>
// //             </CardFooter>
// //           </Card>
// //         </form>

// //         <Alert className="bg-primary/5 border-primary/20"><Info className="h-4 w-4 text-primary" /><AlertDescription><p className="font-semibold mb-2">Notes:</p><ul className="space-y-1 text-sm"><li>• Reviewed by Finance Area</li><li>• Transfer after Regional approval</li><li>• Keep receipts for settlement</li></ul></AlertDescription></Alert>
// //       </div>
// //     </div>
// //   )
// // }


// import { useState, useEffect, FormEvent } from 'react'
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { ArrowLeft, DollarSign, FileText, Info, CheckCircle2, AlertCircle, Loader2, MapPin, Calendar, Lock } from 'lucide-react'
// import { advanceAPI, tripAPI } from '@/services/api'
// import { Trip, Advance } from '@/types'

// export default function NewAdvance() {
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()
//   const tripId = searchParams.get('trip_id')

//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [existingAdvances, setExistingAdvances] = useState<Advance[]>([])
//   const [formData, setFormData] = useState({ 
//     request_type: 'initial' as 'initial' | 'additional', 
//     requested_amount: '', 
//     request_reason: '' 
//   })
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetchingTrip, setIsFetchingTrip] = useState(true)
//   const [successMessage, setSuccessMessage] = useState('')

//   useEffect(() => { 
//     if (tripId) {
//       fetchTrip()
//       fetchExistingAdvances()
//     } else {
//       navigate('/employee/trips')
//     }
//   }, [tripId])

//   const fetchTrip = async () => {
//     try {
//       setIsFetchingTrip(true)
//       const response = await tripAPI.getById(Number(tripId))
//       const t = response.data.data as Trip
//       setTrip(t)
//     } catch {
//       setErrors({ fetch: 'Failed to load trip details' })
//     } finally { 
//       setIsFetchingTrip(false) 
//     }
//   }

//   const fetchExistingAdvances = async () => {
//     try {
//       const response = await tripAPI.getAdvances(Number(tripId))
//       const advances = response.data.data as Advance[]
//       setExistingAdvances(advances || [])
      
//       // ✅ LOGIC FIXED: Jika sudah ada advance, set ke 'additional'
//       const hasExistingAdvances = advances && advances.length > 0
//       if (hasExistingAdvances) {
//         setFormData(prev => ({ ...prev, request_type: 'additional' }))
//       }
//     } catch (error) {
//       console.error('Failed to fetch existing advances:', error)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
//   }

//   const validate = () => {
//     const er: Record<string, string> = {}
//     if (!formData.requested_amount || parseFloat(formData.requested_amount) <= 0) {
//       er.requested_amount = 'Amount must be greater than 0'
//     }
//     if (!formData.request_reason.trim()) {
//       er.request_reason = 'Reason is required'
//     }
//     setErrors(er)
//     return Object.keys(er).length === 0
//   }

//   const submit = async (e: FormEvent) => {
//     e.preventDefault()
//     if (!validate()) return

//     try {
//       setIsLoading(true)
//       setSuccessMessage('')
//       await advanceAPI.create({
//         trip_id: Number(tripId),
//         request_type: formData.request_type,
//         requested_amount: parseFloat(formData.requested_amount),
//         request_reason: formData.request_reason
//       })
//       setSuccessMessage('Advance request submitted successfully!')
//       setTimeout(() => navigate(`/employee/trips/${tripId}`), 1200)
//     } catch (err: any) {
//       if (err.response?.data?.errors) {
//         setErrors(err.response.data.errors)
//       } else {
//         setErrors({ submit: err.response?.data?.message || 'Failed to submit advance request' })
//       }
//     } finally { 
//       setIsLoading(false) 
//     }
//   }

//   const formatDate = (s: string) => {
//     return new Date(s).toLocaleDateString('id-ID', { 
//       day: 'numeric', 
//       month: 'long', 
//       year: 'numeric' 
//     })
//   }

//   const formatCurrency = (n: number) => {
//     return new Intl.NumberFormat('id-ID', { 
//       style: 'currency', 
//       currency: 'IDR', 
//       minimumFractionDigits: 0 
//     }).format(n)
//   }

//   // ✅ LOGIC FIXED: Cek apakah sudah ada advance initial
//   const hasExistingAdvances = existingAdvances.length > 0
//   const hasInitialAdvance = existingAdvances.some(adv => 
//     adv.request_type === 'initial' && !['rejected', 'voided'].includes(adv.status)
//   )

//   if (isFetchingTrip) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
//     </div>
//   )

//   if (!trip) return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <Card className="max-w-md">
//         <CardHeader>
//           <CardTitle>Trip Not Found</CardTitle>
//         </CardHeader>
//         <CardFooter>
//           <Button onClick={() => navigate('/employee/trips')}>
//             Back to My Trips
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-primary border-b shadow-soft">
//         <div className="container max-w-4xl mx-auto px-4 py-6">
//           <Link 
//             to={`/employee/trips/${tripId}`} 
//             className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
//           >
//             <ArrowLeft className="h-4 w-4" /> 
//             Back to Trip Details
//           </Link>
//           <h1 className="text-2xl font-bold text-white">Request Advance</h1>
//           <p className="text-sm text-white/80">
//             Trip #{trip.trip_number} — {trip.destination}
//           </p>
//         </div>
//       </div>

//       <div className="container max-w-4xl mx-auto px-4 py-8">
//         {/* Success Message */}
//         {successMessage && (
//           <Alert className="mb-6 border-success bg-success/10">
//             <CheckCircle2 className="h-4 w-4 text-success" />
//             <AlertDescription className="text-success">
//               {successMessage}
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Error Message */}
//         {errors.submit && (
//           <Alert variant="destructive" className="mb-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{errors.submit}</AlertDescription>
//           </Alert>
//         )}

//         {/* Trip Information */}
//         <Card className="mb-6 shadow-soft bg-primary/5 border-primary/20">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-base">Trip Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground flex items-center gap-2">
//                 <MapPin className="w-4 h-4" />
//                 Destination
//               </span>
//               <span className="font-semibold">{trip.destination}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 Duration
//               </span>
//               <span className="font-semibold">
//                 {trip.duration} days ({formatDate(trip.start_date)} - {formatDate(trip.end_date)})
//               </span>
//             </div>
//             <div className="flex items-center justify-between pt-3 border-t">
//               <span className="text-sm text-muted-foreground flex items-center gap-2">
//                 <DollarSign className="w-4 h-4" />
//                 Existing Advances
//               </span>
//               <span className="font-bold text-primary">
//                 {existingAdvances.length} request(s)
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         <form onSubmit={submit}>
//           <Card className="shadow-soft mb-6">
//             <CardHeader>
//               <CardTitle>Advance Request Details</CardTitle>
//               <CardDescription>
//                 {hasExistingAdvances 
//                   ? "Request additional funds for your trip" 
//                   : "Submit your first advance request for this trip"
//                 }
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Request Type Selection */}
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Initial Request Card */}
//                 <Card 
//                   className={`
//                     cursor-pointer transition-all
//                     ${formData.request_type === 'initial' 
//                       ? 'border-primary bg-primary/5' 
//                       : 'border-border hover:border-primary/50'
//                     }
//                     ${hasExistingAdvances ? 'opacity-60 cursor-not-allowed' : ''}
//                   `}
//                   onClick={() => {
//                     if (!hasExistingAdvances) {
//                       setFormData(prev => ({ ...prev, request_type: 'initial' }))
//                     }
//                   }}
//                 >
//                   <CardContent className="p-4 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-1">
//                       <p className="font-semibold">Initial</p>
//                       {hasExistingAdvances && <Lock className="h-3 w-3 text-muted-foreground" />}
//                     </div>
//                     <p className="text-xs text-muted-foreground mb-2">
//                       First-time request
//                     </p>
//                     {hasExistingAdvances && (
//                       <p className="text-xs text-amber-600 font-medium">
//                         Already requested
//                       </p>
//                     )}
//                   </CardContent>
//                 </Card>

//                 {/* Additional Request Card */}
//                 <Card 
//                   className={`
//                     cursor-pointer transition-all
//                     ${formData.request_type === 'additional' 
//                       ? 'border-primary bg-primary/5' 
//                       : 'border-border hover:border-primary/50'
//                     }
//                   `}
//                   onClick={() => setFormData(prev => ({ ...prev, request_type: 'additional' }))}
//                 >
//                   <CardContent className="p-4 text-center">
//                     <p className="font-semibold mb-1">Additional</p>
//                     <p className="text-xs text-muted-foreground">
//                       Extra funds
//                     </p>
//                     {hasExistingAdvances && (
//                       <p className="text-xs text-green-600 font-medium mt-1">
//                         Available
//                       </p>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* Informasi jika sudah ada advance */}
//               {hasExistingAdvances && (
//                 <Alert className="bg-blue-50 border-blue-200">
//                   <Info className="h-4 w-4 text-blue-600" />
//                   <AlertDescription className="text-blue-800">
//                     <p className="font-medium mb-1">Additional Request Only</p>
//                     <p className="text-sm">
//                       You already have {existingAdvances.length} advance request(s) for this trip. 
//                       You can only request additional funds at this time.
//                     </p>
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {/* Requested Amount */}
//               <div className="space-y-2">
//                 <Label htmlFor="requested_amount" className="flex items-center gap-2">
//                   <DollarSign className="h-4 w-4" />
//                   Requested Amount <span className="text-destructive">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
//                   <Input
//                     type="number"
//                     id="requested_amount"
//                     name="requested_amount"
//                     value={formData.requested_amount}
//                     onChange={handleChange}
//                     min="0"
//                     step="1000"
//                     className={`pl-10 ${errors.requested_amount ? 'border-destructive' : ''}`}
//                     placeholder="Enter amount"
//                   />
//                 </div>
//                 {errors.requested_amount && (
//                   <p className="text-sm text-destructive">{errors.requested_amount}</p>
//                 )}
//               </div>

//               {/* Reason */}
//               <div className="space-y-2">
//                 <Label htmlFor="request_reason" className="flex items-center gap-2">
//                   <FileText className="h-4 w-4" />
//                   Reason <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="request_reason"
//                   name="request_reason"
//                   rows={4}
//                   value={formData.request_reason}
//                   onChange={handleChange}
//                   className={errors.request_reason ? 'border-destructive' : ''}
//                   placeholder="Explain why you need this advance..."
//                 />
//                 {errors.request_reason && (
//                   <p className="text-sm text-destructive">{errors.request_reason}</p>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => navigate(`/employee/trips/${tripId}`)}
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 type="submit" 
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : (
//                   'Submit Request'
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </form>

//         {/* Information Alert */}
//         <Alert className="bg-primary/5 border-primary/20">
//           <Info className="h-4 w-4 text-primary" />
//           <AlertDescription>
//             <p className="font-semibold mb-2">Notes:</p>
//             <ul className="space-y-1 text-sm">
//               <li>• Reviewed by Finance Area first</li>
//               <li>• Regional approval required for amounts above threshold</li>
//               <li>• Transfer processed after final approval</li>
//               <li>• Keep all receipts for settlement process</li>
//               {hasExistingAdvances && (
//                 <li>• Additional requests will be tracked separately</li>
//               )}
//             </ul>
//           </AlertDescription>
//         </Alert>
//       </div>
//     </div>
//   )
// }


// import { useState, useEffect, FormEvent } from 'react'
// import { useNavigate, useSearchParams, Link } from 'react-router-dom'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { ArrowLeft, DollarSign, FileText, Info, CheckCircle2, AlertCircle, Loader2, MapPin, Calendar, Lock, Unlock } from 'lucide-react'
// import { advanceAPI, tripAPI } from '@/services/api'
// import { Trip, Advance } from '@/types'

// export default function NewAdvance() {
//   const navigate = useNavigate()
//   const [searchParams] = useSearchParams()
//   const tripId = searchParams.get('trip_id')

//   const [trip, setTrip] = useState<Trip | null>(null)
//   const [existingAdvances, setExistingAdvances] = useState<Advance[]>([])
//   const [formData, setFormData] = useState({ 
//     request_type: 'initial' as 'initial' | 'additional', 
//     requested_amount: '', 
//     request_reason: '' 
//   })
//   const [errors, setErrors] = useState<Record<string, string>>({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [isFetchingTrip, setIsFetchingTrip] = useState(true)
//   const [successMessage, setSuccessMessage] = useState('')

//   useEffect(() => { 
//     if (tripId) {
//       fetchTrip()
//       fetchExistingAdvances()
//     } else {
//       navigate('/employee/trips')
//     }
//   }, [tripId])

//   const fetchTrip = async () => {
//     try {
//       setIsFetchingTrip(true)
//       const response = await tripAPI.getById(Number(tripId))
//       const t = response.data.data as Trip
//       setTrip(t)
//     } catch {
//       setErrors({ fetch: 'Failed to load trip details' })
//     } finally { 
//       setIsFetchingTrip(false) 
//     }
//   }

//   const fetchExistingAdvances = async () => {
//     try {
//       const response = await tripAPI.getAdvances(Number(tripId))
//       const advances = response.data.data as Advance[]
//       setExistingAdvances(advances || [])
      
//       // ✅ LOGIC: Auto-select berdasarkan kondisi
//       const hasApprovedInitial = advances.some(adv => 
//         adv.request_type === 'initial' && 
//         ['approved_area', 'approved_regional', 'completed'].includes(adv.status)
//       )
      
//       if (hasApprovedInitial) {
//         // Kalau ada initial yang approved → auto-select additional
//         setFormData(prev => ({ ...prev, request_type: 'additional' }))
//       } else {
//         // Kalau belum ada / rejected → auto-select initial
//         setFormData(prev => ({ ...prev, request_type: 'initial' }))
//       }
//     } catch (error) {
//       console.error('Failed to fetch existing advances:', error)
//     }
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
//   }

//   const validate = () => {
//     const er: Record<string, string> = {}
//     if (!formData.requested_amount || parseFloat(formData.requested_amount) <= 0) {
//       er.requested_amount = 'Amount must be greater than 0'
//     }
//     if (!formData.request_reason.trim()) {
//       er.request_reason = 'Reason is required'
//     }
//     setErrors(er)
//     return Object.keys(er).length === 0
//   }

//   const submit = async (e: FormEvent) => {
//     e.preventDefault()
//     if (!validate()) return

//     try {
//       setIsLoading(true)
//       setSuccessMessage('')
//       await advanceAPI.create({
//         trip_id: Number(tripId),
//         request_type: formData.request_type,
//         requested_amount: parseFloat(formData.requested_amount),
//         request_reason: formData.request_reason
//       })
//       setSuccessMessage('Advance request submitted successfully!')
//       setTimeout(() => navigate(`/employee/trips/${tripId}`), 1500)
//     } catch (err: any) {
//       if (err.response?.data?.errors) {
//         setErrors(err.response.data.errors)
//       } else {
//         setErrors({ submit: err.response?.data?.message || 'Failed to submit advance request' })
//       }
//     } finally { 
//       setIsLoading(false) 
//     }
//   }

//   const formatDate = (s: string) => {
//     return new Date(s).toLocaleDateString('id-ID', { 
//       day: 'numeric', 
//       month: 'long', 
//       year: 'numeric' 
//     })
//   }

//   const formatCurrency = (n: number) => {
//     return new Intl.NumberFormat('id-ID', { 
//       style: 'currency', 
//       currency: 'IDR', 
//       minimumFractionDigits: 0 
//     }).format(n)
//   }

//   // ✅ LOGIC LENGKAP: Tentukan apakah Initial/Additional bisa diklik
//   const hasAnyAdvances = existingAdvances.length > 0
  
//   // Initial LOCKED kalau:
//   // 1. Ada initial yang PENDING/APPROVED/COMPLETED (tidak termasuk REJECTED)
//   const hasSuccessfulInitial = existingAdvances.some(adv => 
//     adv.request_type === 'initial' && 
//     !['rejected', 'voided'].includes(adv.status)
//   )
//   const isInitialLocked = hasSuccessfulInitial
  
//   // Additional LOCKED kalau:
//   // 1. Belum ada initial yang approved (pending/rejected/tidak ada)
//   // 2. Ada additional yang masih pending
//   const hasApprovedInitial = existingAdvances.some(adv => 
//     adv.request_type === 'initial' && 
//     ['approved_area', 'approved_regional', 'completed'].includes(adv.status)
//   )
//   const hasPendingAdditional = existingAdvances.some(adv => 
//     adv.request_type === 'additional' && 
//     adv.status === 'pending'
//   )
//   const isAdditionalLocked = !hasApprovedInitial || hasPendingAdditional

//   // ✅ Pesan info untuk user
//   let initialMessage = ''
//   let additionalMessage = ''
  
//   if (isInitialLocked) {
//     const pendingInitial = existingAdvances.find(adv => 
//       adv.request_type === 'initial' && adv.status === 'pending'
//     )
//     const approvedInitial = existingAdvances.find(adv => 
//       adv.request_type === 'initial' && 
//       ['approved_area', 'approved_regional', 'completed'].includes(adv.status)
//     )
    
//     if (pendingInitial) {
//       initialMessage = 'Request pending'
//     } else if (approvedInitial) {
//       initialMessage = 'Already approved'
//     }
//   } else {
//     initialMessage = 'Available'
//   }
  
//   if (isAdditionalLocked) {
//     if (!hasApprovedInitial) {
//       additionalMessage = 'Initial required first'
//     } else if (hasPendingAdditional) {
//       additionalMessage = 'Request pending'
//     }
//   } else {
//     additionalMessage = 'Available'
//   }

//   if (isFetchingTrip) return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
//     </div>
//   )

//   if (!trip) return (
//     <div className="min-h-screen bg-background flex items-center justify-center">
//       <Card className="max-w-md">
//         <CardHeader>
//           <CardTitle>Trip Not Found</CardTitle>
//         </CardHeader>
//         <CardFooter>
//           <Button onClick={() => navigate('/employee/trips')}>
//             Back to My Trips
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="bg-gradient-primary border-b shadow-soft">
//         <div className="container max-w-4xl mx-auto px-4 py-6">
//           <Link 
//             to={`/employee/trips/${tripId}`} 
//             className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
//           >
//             <ArrowLeft className="h-4 w-4" /> 
//             Back to Trip Details
//           </Link>
//           <h1 className="text-2xl font-bold text-white">Request Advance</h1>
//           <p className="text-sm text-white/80">
//             Trip #{trip.trip_number} — {trip.destination}
//           </p>
//         </div>
//       </div>

//       <div className="container max-w-4xl mx-auto px-4 py-8">
//         {/* Success Message */}
//         {successMessage && (
//           <Alert className="mb-6 border-success bg-success/10">
//             <CheckCircle2 className="h-4 w-4 text-success" />
//             <AlertDescription className="text-success font-medium">
//               {successMessage}
//             </AlertDescription>
//           </Alert>
//         )}

//         {/* Error Message */}
//         {errors.submit && (
//           <Alert variant="destructive" className="mb-6">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>{errors.submit}</AlertDescription>
//           </Alert>
//         )}

//         {/* Trip Information */}
//         <Card className="mb-6 shadow-soft bg-primary/5 border-primary/20">
//           <CardHeader className="pb-3">
//             <CardTitle className="text-base">Trip Information</CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground flex items-center gap-2">
//                 <MapPin className="w-4 h-4" />
//                 Destination
//               </span>
//               <span className="font-semibold">{trip.destination}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 Duration
//               </span>
//               <span className="font-semibold">
//                 {trip.duration} days ({formatDate(trip.start_date)} - {formatDate(trip.end_date)})
//               </span>
//             </div>
//             <div className="flex items-center justify-between pt-3 border-t">
//               <span className="text-sm text-muted-foreground flex items-center gap-2">
//                 <DollarSign className="w-4 h-4" />
//                 Existing Advances
//               </span>
//               <span className="font-bold text-primary">
//                 {existingAdvances.length} request(s)
//               </span>
//             </div>
//           </CardContent>
//         </Card>

//         <form onSubmit={submit}>
//           <Card className="shadow-soft mb-6">
//             <CardHeader>
//               <CardTitle>Advance Request Details</CardTitle>
//               <CardDescription>
//                 Select request type and fill in the details
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Request Type Selection */}
//               <div className="grid grid-cols-2 gap-4">
//                 {/* Initial Request Card */}
//                 <Card 
//                   className={`
//                     transition-all
//                     ${formData.request_type === 'initial' 
//                       ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
//                       : 'border-border'
//                     }
//                     ${isInitialLocked 
//                       ? 'opacity-60 cursor-not-allowed' 
//                       : 'cursor-pointer hover:border-primary/50'
//                     }
//                   `}
//                   onClick={() => {
//                     if (!isInitialLocked) {
//                       setFormData(prev => ({ ...prev, request_type: 'initial' }))
//                     }
//                   }}
//                 >
//                   <CardContent className="p-4 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       {isInitialLocked ? (
//                         <Lock className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Unlock className="h-4 w-4 text-green-600" />
//                       )}
//                       <p className="font-semibold">Initial</p>
//                     </div>
//                     <p className="text-xs text-muted-foreground mb-2">
//                       First-time request
//                     </p>
//                     <p className={`
//                       text-xs font-medium
//                       ${isInitialLocked 
//                         ? 'text-amber-600' 
//                         : 'text-green-600'}
//                     `}>
//                       {initialMessage}
//                     </p>
//                   </CardContent>
//                 </Card>

//                 {/* Additional Request Card */}
//                 <Card 
//                   className={`
//                     transition-all
//                     ${formData.request_type === 'additional' 
//                       ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
//                       : 'border-border'
//                     }
//                     ${isAdditionalLocked 
//                       ? 'opacity-60 cursor-not-allowed' 
//                       : 'cursor-pointer hover:border-primary/50'
//                     }
//                   `}
//                   onClick={() => {
//                     if (!isAdditionalLocked) {
//                       setFormData(prev => ({ ...prev, request_type: 'additional' }))
//                     }
//                   }}
//                 >
//                   <CardContent className="p-4 text-center">
//                     <div className="flex items-center justify-center gap-2 mb-2">
//                       {isAdditionalLocked ? (
//                         <Lock className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Unlock className="h-4 w-4 text-green-600" />
//                       )}
//                       <p className="font-semibold">Additional</p>
//                     </div>
//                     <p className="text-xs text-muted-foreground mb-2">
//                       Extra funds
//                     </p>
//                     <p className={`
//                       text-xs font-medium
//                       ${isAdditionalLocked 
//                         ? 'text-amber-600' 
//                         : 'text-green-600'}
//                     `}>
//                       {additionalMessage}
//                     </p>
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* ✅ Info Alert berdasarkan kondisi */}
//               {isInitialLocked && !hasApprovedInitial && (
//                 <Alert className="bg-amber-50 border-amber-200">
//                   <Info className="h-4 w-4 text-amber-600" />
//                   <AlertDescription className="text-amber-800">
//                     <p className="font-medium mb-1">Initial Request Pending</p>
//                     <p className="text-sm">
//                       You have an initial advance request that is currently being processed.
//                       Please wait for approval before requesting additional funds.
//                     </p>
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {isAdditionalLocked && !hasApprovedInitial && (
//                 <Alert className="bg-blue-50 border-blue-200">
//                   <Info className="h-4 w-4 text-blue-600" />
//                   <AlertDescription className="text-blue-800">
//                     <p className="font-medium mb-1">Initial Request Required</p>
//                     <p className="text-sm">
//                       You must submit and get approval for an initial advance request 
//                       before you can request additional funds.
//                     </p>
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {!isAdditionalLocked && hasApprovedInitial && (
//                 <Alert className="bg-green-50 border-green-200">
//                   <CheckCircle2 className="h-4 w-4 text-green-600" />
//                   <AlertDescription className="text-green-800">
//                     <p className="font-medium mb-1">Additional Request Available</p>
//                     <p className="text-sm">
//                       Your initial advance has been approved. You can now request additional funds if needed.
//                     </p>
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {/* Requested Amount */}
//               <div className="space-y-2">
//                 <Label htmlFor="requested_amount" className="flex items-center gap-2">
//                   <DollarSign className="h-4 w-4" />
//                   Requested Amount <span className="text-destructive">*</span>
//                 </Label>
//                 <div className="relative">
//                   <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
//                   <Input
//                     type="number"
//                     id="requested_amount"
//                     name="requested_amount"
//                     value={formData.requested_amount}
//                     onChange={handleChange}
//                     min="0"
//                     step="1000"
//                     disabled={isLoading || successMessage !== ''}
//                     className={`pl-10 ${errors.requested_amount ? 'border-destructive' : ''}`}
//                     placeholder="Enter amount"
//                   />
//                 </div>
//                 {errors.requested_amount && (
//                   <p className="text-sm text-destructive">{errors.requested_amount}</p>
//                 )}
//               </div>

//               {/* Reason */}
//               <div className="space-y-2">
//                 <Label htmlFor="request_reason" className="flex items-center gap-2">
//                   <FileText className="h-4 w-4" />
//                   Reason <span className="text-destructive">*</span>
//                 </Label>
//                 <Textarea
//                   id="request_reason"
//                   name="request_reason"
//                   rows={4}
//                   value={formData.request_reason}
//                   onChange={handleChange}
//                   disabled={isLoading || successMessage !== ''}
//                   className={errors.request_reason ? 'border-destructive' : ''}
//                   placeholder="Explain why you need this advance..."
//                 />
//                 {errors.request_reason && (
//                   <p className="text-sm text-destructive">{errors.request_reason}</p>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
//               <Button 
//                 type="button" 
//                 variant="outline" 
//                 onClick={() => navigate(`/employee/trips/${tripId}`)}
//                 disabled={isLoading || successMessage !== ''}
//               >
//                 Cancel
//               </Button>
//               <Button 
//                 type="submit" 
//                 disabled={isLoading || successMessage !== ''}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                     Submitting...
//                   </>
//                 ) : successMessage ? (
//                   <>
//                     <CheckCircle2 className="mr-2 h-4 w-4" />
//                     Redirecting...
//                   </>
//                 ) : (
//                   'Submit Request'
//                 )}
//               </Button>
//             </CardFooter>
//           </Card>
//         </form>

//         {/* Information Alert */}
//         <Alert className="bg-primary/5 border-primary/20">
//           <Info className="h-4 w-4 text-primary" />
//           <AlertDescription>
//             <p className="font-semibold mb-2">How it works:</p>
//             <ul className="space-y-1 text-sm">
//               <li>• <strong>Initial:</strong> First advance request for this trip (required)</li>
//               <li>• <strong>Additional:</strong> Extra funds (available after initial approval)</li>
//               <li>• Rejected requests can be resubmitted</li>
//               <li>• Only one pending request allowed at a time</li>
//               <li>• Keep all receipts for settlement</li>
//             </ul>
//           </AlertDescription>
//         </Alert>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, DollarSign, FileText, Info, CheckCircle2, AlertCircle, Loader2, MapPin, Calendar, Lock, Unlock } from 'lucide-react'
import { advanceAPI, tripAPI } from '@/services/api'
import { Trip, Advance } from '@/types'

export default function NewAdvance() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip_id')

  const [trip, setTrip] = useState<Trip | null>(null)
  const [existingAdvances, setExistingAdvances] = useState<Advance[]>([])
  const [formData, setFormData] = useState({ 
    request_type: 'initial' as 'initial' | 'additional', 
    requested_amount: '', 
    request_reason: '' 
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingTrip, setIsFetchingTrip] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => { 
    if (tripId) {
      fetchTrip()
      fetchExistingAdvances()
    } else {
      navigate('/employee/trips')
    }
  }, [tripId])

  const fetchTrip = async () => {
    try {
      setIsFetchingTrip(true)
      const response = await tripAPI.getById(Number(tripId))
      const t = response.data.data as Trip
      setTrip(t)
    } catch {
      setErrors({ fetch: 'Failed to load trip details' })
    } finally { 
      setIsFetchingTrip(false) 
    }
  }

  const fetchExistingAdvances = async () => {
    try {
      const response = await tripAPI.getAdvances(Number(tripId))
      const advances = response.data.data as Advance[]
      setExistingAdvances(advances || [])
      
      // ✅ LOGIC: Auto-select berdasarkan kondisi
      const hasApprovedInitial = advances.some(adv => 
        adv.request_type === 'initial' && 
        ['approved_area', 'approved_regional', 'completed'].includes(adv.status)
      )
      
      if (hasApprovedInitial) {
        // Kalau ada initial yang approved → auto-select additional
        setFormData(prev => ({ ...prev, request_type: 'additional' }))
      } else {
        // Kalau belum ada / rejected → auto-select initial
        setFormData(prev => ({ ...prev, request_type: 'initial' }))
      }
    } catch (error) {
      console.error('Failed to fetch existing advances:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const er: Record<string, string> = {}
    if (!formData.requested_amount || parseFloat(formData.requested_amount) <= 0) {
      er.requested_amount = 'Amount must be greater than 0'
    }
    if (!formData.request_reason.trim()) {
      er.request_reason = 'Reason is required'
    }
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setIsLoading(true)
      setSuccessMessage('')
      await advanceAPI.create({
        trip_id: Number(tripId),
        request_type: formData.request_type,
        requested_amount: parseFloat(formData.requested_amount),
        request_reason: formData.request_reason
      })
      setSuccessMessage('Advance request submitted successfully!')
      setTimeout(() => navigate(`/employee/trips/${tripId}`), 1500)
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ submit: err.response?.data?.message || 'Failed to submit advance request' })
      }
    } finally { 
      setIsLoading(false) 
    }
  }

  const formatDate = (s: string) => {
    return new Date(s).toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const formatCurrency = (n: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0 
    }).format(n)
  }

  // ✅ LOGIC LENGKAP: Tentukan apakah Initial/Additional bisa diklik
  const hasAnyAdvances = existingAdvances.length > 0
  
  // Initial LOCKED kalau:
  // 1. Ada initial yang PENDING/APPROVED/COMPLETED (tidak termasuk REJECTED)
  const hasSuccessfulInitial = existingAdvances.some(adv => 
    adv.request_type === 'initial' && 
    !['rejected', 'voided'].includes(adv.status)
  )
  const isInitialLocked = hasSuccessfulInitial
  
  // Additional LOCKED kalau:
  // 1. Belum ada initial yang approved (pending/rejected/tidak ada)
  // 2. Ada additional yang masih pending
  const hasApprovedInitial = existingAdvances.some(adv => 
    adv.request_type === 'initial' && 
    ['approved_area', 'approved_regional', 'completed'].includes(adv.status)
  )
  const hasPendingAdditional = existingAdvances.some(adv => 
    adv.request_type === 'additional' && 
    adv.status === 'pending'
  )
  const isAdditionalLocked = !hasApprovedInitial || hasPendingAdditional

  // ✅ Pesan info untuk user
  let initialMessage = ''
  let additionalMessage = ''
  
  if (isInitialLocked) {
    const pendingInitial = existingAdvances.find(adv => 
      adv.request_type === 'initial' && adv.status === 'pending'
    )
    const approvedInitial = existingAdvances.find(adv => 
      adv.request_type === 'initial' && 
      ['approved_area', 'approved_regional', 'completed'].includes(adv.status)
    )
    
    if (pendingInitial) {
      initialMessage = 'Request pending'
    } else if (approvedInitial) {
      initialMessage = 'Already approved'
    }
  } else {
    initialMessage = 'Available'
  }
  
  if (isAdditionalLocked) {
    if (!hasApprovedInitial) {
      additionalMessage = 'Initial required first'
    } else if (hasPendingAdditional) {
      additionalMessage = 'Request pending'
    }
  } else {
    additionalMessage = 'Available'
  }

  if (isFetchingTrip) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  )

  if (!trip) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Trip Not Found</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => navigate('/employee/trips')}>
            Back to My Trips
          </Button>
        </CardFooter>
      </Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Link 
            to={`/employee/trips/${tripId}`} 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> 
            Back to Trip Details
          </Link>
          <h1 className="text-2xl font-bold text-white">Request Advance</h1>
          <p className="text-sm text-white/80">
            Trip #{trip.trip_number} — {trip.destination}
          </p>
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

        {/* Trip Information */}
        <Card className="mb-6 shadow-soft bg-primary/5 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Trip Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Destination
              </span>
              <span className="font-semibold">{trip.destination}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Duration
              </span>
              <span className="font-semibold">
                {trip.duration} days ({formatDate(trip.start_date)} - {formatDate(trip.end_date)})
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Existing Advances
              </span>
              <span className="font-bold text-primary">
                {existingAdvances.length} request(s)
              </span>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={submit}>
          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Advance Request Details</CardTitle>
              <CardDescription>
                Select request type and fill in the details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Request Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                {/* Initial Request Card */}
                <Card 
                  className={`
                    transition-all
                    ${formData.request_type === 'initial' 
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                      : 'border-border'
                    }
                    ${isInitialLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'cursor-pointer hover:border-primary/50'
                    }
                  `}
                  onClick={() => {
                    if (!isInitialLocked) {
                      setFormData(prev => ({ ...prev, request_type: 'initial' }))
                    }
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {isInitialLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Unlock className="h-4 w-4 text-green-600" />
                      )}
                      <p className="font-semibold">Initial</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      First-time request
                    </p>
                    <p className={`
                      text-xs font-medium
                      ${isInitialLocked 
                        ? 'text-amber-600' 
                        : 'text-green-600'}
                    `}>
                      {initialMessage}
                    </p>
                  </CardContent>
                </Card>

                {/* Additional Request Card */}
                <Card 
                  className={`
                    transition-all
                    ${formData.request_type === 'additional' 
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                      : 'border-border'
                    }
                    ${isAdditionalLocked 
                      ? 'opacity-60 cursor-not-allowed' 
                      : 'cursor-pointer hover:border-primary/50'
                    }
                  `}
                  onClick={() => {
                    if (!isAdditionalLocked) {
                      setFormData(prev => ({ ...prev, request_type: 'additional' }))
                    }
                  }}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {isAdditionalLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Unlock className="h-4 w-4 text-green-600" />
                      )}
                      <p className="font-semibold">Additional</p>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Extra funds
                    </p>
                    <p className={`
                      text-xs font-medium
                      ${isAdditionalLocked 
                        ? 'text-amber-600' 
                        : 'text-green-600'}
                    `}>
                      {additionalMessage}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* ✅ Info Alert berdasarkan kondisi */}
              {isInitialLocked && !hasApprovedInitial && (
                <Alert className="bg-amber-50 border-amber-200">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <p className="font-medium mb-1">Initial Request Pending</p>
                    <p className="text-sm">
                      You have an initial advance request that is currently being processed.
                      Please wait for approval before requesting additional funds.
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              {isAdditionalLocked && !hasApprovedInitial && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <p className="font-medium mb-1">Initial Request Required</p>
                    <p className="text-sm">
                      You must submit and get approval for an initial advance request 
                      before you can request additional funds.
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              {!isAdditionalLocked && hasApprovedInitial && (
                <Alert className="bg-amber-50 border-amber-200">
                  <Info className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-800">
                    <p className="font-medium mb-1">Additional Request Available</p>
                    <p className="text-sm mb-2">
                      Your initial advance has been approved. You can now request additional funds if needed.
                    </p>
                    <p className="text-xs font-medium text-amber-900 flex items-center gap-1">
                      💡 Tip: Upload receipts first to support your request
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => navigate(`/employee/receipts/new?trip_id=${tripId}`)}
                    >
                      Upload Receipt
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {/* Requested Amount */}
              <div className="space-y-2">
                <Label htmlFor="requested_amount" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Requested Amount <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                  <Input
                    type="number"
                    id="requested_amount"
                    name="requested_amount"
                    value={formData.requested_amount}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    disabled={isLoading || successMessage !== ''}
                    className={`pl-10 ${errors.requested_amount ? 'border-destructive' : ''}`}
                    placeholder="Enter amount"
                  />
                </div>
                {errors.requested_amount && (
                  <p className="text-sm text-destructive">{errors.requested_amount}</p>
                )}
              </div>

              {/* Reason */}
              <div className="space-y-2">
                <Label htmlFor="request_reason" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="request_reason"
                  name="request_reason"
                  rows={4}
                  value={formData.request_reason}
                  onChange={handleChange}
                  disabled={isLoading || successMessage !== ''}
                  className={errors.request_reason ? 'border-destructive' : ''}
                  placeholder="Explain why you need this advance..."
                />
                {errors.request_reason && (
                  <p className="text-sm text-destructive">{errors.request_reason}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/employee/trips/${tripId}`)}
                disabled={isLoading || successMessage !== ''}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading || successMessage !== ''}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : successMessage ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Redirecting...
                  </>
                ) : (
                  'Submit Request'
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Information Alert */}
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription>
            <p className="font-semibold mb-2">How it works:</p>
            <ul className="space-y-1 text-sm">
              <li>• <strong>Initial:</strong> First advance request for this trip (required)</li>
              <li>• <strong>Additional:</strong> Extra funds (available after initial approval)</li>
              <li>• Rejected requests can be resubmitted</li>
              <li>• Only one pending request allowed at a time</li>
              <li>• Keep all receipts for settlement</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}