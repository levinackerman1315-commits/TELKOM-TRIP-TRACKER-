import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, DollarSign, FileText, Info, CheckCircle2, AlertCircle, Loader2, MapPin, Calendar } from 'lucide-react'
import { advanceAPI, tripAPI } from '@/services/api'
import { Trip } from '@/types'

export default function NewAdvance() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip_id')

  const [trip, setTrip] = useState<Trip | null>(null)
  const [formData, setFormData] = useState({ request_type: 'initial' as 'initial' | 'additional', requested_amount: '', request_reason: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingTrip, setIsFetchingTrip] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => { if (tripId) fetchTrip(); else navigate('/employee/trips') }, [tripId])

  const fetchTrip = async () => {
    try {
      setIsFetchingTrip(true)
      const response = await tripAPI.getById(Number(tripId))
      const t = response.data.data as Trip
      setTrip(t)
      if (t.total_advance && t.total_advance > 0) setFormData(p => ({ ...p, request_type: 'additional' }))
    } catch {
      setErrors({ fetch: 'Failed to load trip details' })
    } finally { setIsFetchingTrip(false) }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const er: Record<string, string> = {}
    if (!formData.requested_amount || parseFloat(formData.requested_amount) <= 0) er.requested_amount = 'Amount must be greater than 0'
    if (!formData.request_reason.trim()) er.request_reason = 'Reason is required'
    setErrors(er); return Object.keys(er).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setIsLoading(true); setSuccessMessage('')
      await advanceAPI.create({
        trip_id: Number(tripId),
        request_type: formData.request_type,
        requested_amount: parseFloat(formData.requested_amount),
        request_reason: formData.request_reason
      })
      setSuccessMessage('Advance request submitted successfully!')
      setTimeout(() => navigate(`/employee/trips/${tripId}`), 1200)
    } catch (err: any) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else setErrors({ submit: err.response?.data?.message || 'Failed to submit advance request' })
    } finally { setIsLoading(false) }
  }

  const formatDate = (s: string) => new Date(s).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  const formatCurrency = (n: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n)

  if (isFetchingTrip) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  )

  if (!trip) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <Card className="max-w-md"><CardHeader><CardTitle>Trip Not Found</CardTitle></CardHeader><CardFooter><Button onClick={() => navigate('/employee/trips')}>Back to My Trips</Button></CardFooter></Card>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Link to={`/employee/trips/${tripId}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Trip Details
          </Link>
          <h1 className="text-2xl font-bold text-white">Request Advance</h1>
          <p className="text-sm text-white/80">Trip #{trip.trip_number} — {trip.destination}</p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {successMessage && (<Alert className="mb-6 border-success bg-success/10"><CheckCircle2 className="h-4 w-4 text-success" /><AlertDescription className="text-success">{successMessage}</AlertDescription></Alert>)}
        {errors.submit && (<Alert variant="destructive" className="mb-6"><AlertCircle className="h-4 w-4" /><AlertDescription>{errors.submit}</AlertDescription></Alert>)}

        <Card className="mb-6 shadow-soft bg-primary/5 border-primary/20">
          <CardHeader className="pb-3"><CardTitle className="text-base">Trip Information</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" />Destination</span><span className="font-semibold">{trip.destination}</span></div>
            <div className="flex items-center justify-between"><span className="text-sm text-muted-foreground flex items-center gap-2"><Calendar className="w-4 h-4" />Duration</span><span className="font-semibold">{trip.duration} days ({formatDate(trip.start_date)} - {formatDate(trip.end_date)})</span></div>
            <div className="flex items-center justify-between pt-3 border-t"><span className="text-sm text-muted-foreground flex items-center gap-2"><DollarSign className="w-4 h-4" />Current Advance</span><span className="font-bold text-primary">{formatCurrency(trip.total_advance || 0)}</span></div>
          </CardContent>
        </Card>

        <form onSubmit={submit}>
          <Card className="shadow-soft mb-6">
            <CardHeader><CardTitle>Advance Request Details</CardTitle><CardDescription>Fill in the details</CardDescription></CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card className={`cursor-pointer ${formData.request_type==='initial'?'border-primary bg-primary/5':'hover:border-primary/50'}`} onClick={()=>setFormData(p=>({...p,request_type:'initial'}))}><CardContent className="p-4 text-center"><p className="font-semibold mb-1">Initial</p><p className="text-xs text-muted-foreground">First-time request</p></CardContent></Card>
                <Card className={`cursor-pointer ${formData.request_type==='additional'?'border-primary bg-primary/5':'hover:border-primary/50'}`} onClick={()=>setFormData(p=>({...p,request_type:'additional'}))}><CardContent className="p-4 text-center"><p className="font-semibold mb-1">Additional</p><p className="text-xs text-muted-foreground">Extra funds</p></CardContent></Card>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requested_amount" className="flex items-center gap-2"><DollarSign className="h-4 w-4" />Requested Amount <span className="text-destructive">*</span></Label>
                <div className="relative"><span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                  <Input type="number" id="requested_amount" name="requested_amount" value={formData.requested_amount} onChange={handleChange} min="0" step="1000" className={`pl-10 ${errors.requested_amount?'border-destructive':''}`} />
                </div>
                {errors.requested_amount && <p className="text-sm text-destructive">{errors.requested_amount}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="request_reason" className="flex items-center gap-2"><FileText className="h-4 w-4" />Reason <span className="text-destructive">*</span></Label>
                <Textarea id="request_reason" name="request_reason" rows={4} value={formData.request_reason} onChange={handleChange} className={errors.request_reason?'border-destructive':''} />
                {errors.request_reason && <p className="text-sm text-destructive">{errors.request_reason}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
              <Button type="button" variant="outline" onClick={()=>navigate(`/employee/trips/${tripId}`)} disabled={isLoading}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>{isLoading? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</>):'Submit Request'}</Button>
            </CardFooter>
          </Card>
        </form>

        <Alert className="bg-primary/5 border-primary/20"><Info className="h-4 w-4 text-primary" /><AlertDescription><p className="font-semibold mb-2">Notes:</p><ul className="space-y-1 text-sm"><li>• Reviewed by Finance Area</li><li>• Transfer after Regional approval</li><li>• Keep receipts for settlement</li></ul></AlertDescription></Alert>
      </div>
    </div>
  )
}