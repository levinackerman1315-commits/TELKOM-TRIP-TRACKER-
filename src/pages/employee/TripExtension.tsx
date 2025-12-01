
import { useEffect, useState, FormEvent } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Calendar, FileText, Loader2, CheckCircle2, AlertCircle, Ban } from 'lucide-react'
import { tripAPI } from '@/services/api'
import { Trip } from '@/types'

export default function TripExtension() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [trip, setTrip] = useState<Trip | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({
    extended_end_date: '',
    extension_reason: ''
  })

  useEffect(() => {
    if (id) loadTrip()
  }, [id])

  const loadTrip = async () => {
    try {
      setIsLoading(true)
      const res = await tripAPI.getById(Number(id))
      const t = res.data.data as Trip
      setTrip(t)
      
      // Set min date = current end_date + 1
      const currentEnd = t.extended_end_date || t.end_date
      const minDate = new Date(new Date(currentEnd).getTime() + 24 * 60 * 60 * 1000)
      const iso = minDate.toISOString().split('T')[0]
      setForm(f => ({ ...f, extended_end_date: iso }))
    } catch (e) {
      setErrors({ fetch: 'Failed to load trip' })
    } finally {
      setIsLoading(false)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next: Record<string, string> = {}
    
    if (!form.extended_end_date) {
      next.extended_end_date = 'New end date is required'
    }
    
    if (!form.extension_reason.trim()) {
      next.extension_reason = 'Reason is required'
    }
    
    if (trip && form.extended_end_date) {
      const newEnd = new Date(form.extended_end_date)
      const currentEnd = new Date(trip.extended_end_date || trip.end_date)
      if (newEnd <= currentEnd) {
        next.extended_end_date = 'Must be after current end date'
      }
    }
    
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate() || !id) return
    
    try {
      setSaving(true)
      await tripAPI.requestExtension(
        Number(id),
        {
          extended_end_date: form.extended_end_date,
          extension_reason: form.extension_reason
        }
      )
      
      setSuccessMessage('Extension request submitted successfully!')
      
      // ✅ Redirect setelah 1.5 detik
      setTimeout(() => {
        navigate(`/employee/trips/${id}`)
      }, 1500)
      
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        setErrors({ 
          submit: err.response?.data?.message || 'Failed to submit extension' 
        })
      }
      setSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  if (!trip) {
    return (
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
  }

  // ✅ VALIDASI: Hanya bisa extend saat trip ACTIVE
  if (trip.status !== 'active') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ban className="h-5 w-5 text-destructive" />
              Cannot Extend Trip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Trip extension can only be requested for <strong>active trips</strong>.
                <br />
                <br />
                Current status: <strong className="uppercase">{trip.status}</strong>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate(`/employee/trips/${id}`)}>
              Back to Trip Details
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentEnd = trip.extended_end_date || trip.end_date
  const minDate = new Date(new Date(currentEnd).getTime() + 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Link 
            to={`/employee/trips/${id}`} 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Trip Details
          </Link>
          <h1 className="text-2xl font-bold text-white">Request Trip Extension</h1>
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

        {/* Form Card */}
        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle>Extension Details</CardTitle>
            <CardDescription>
              Propose new end date and reason for extension
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={submit}>
            <CardContent className="space-y-6">
              {/* Current End Date */}
              <div className="space-y-2">
                <Label htmlFor="current_end">Current End Date</Label>
                <Input 
                  id="current_end" 
                  value={new Date(currentEnd).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })} 
                  disabled 
                  className="bg-muted"
                />
              </div>

              {/* New End Date */}
              <div className="space-y-2">
                <Label htmlFor="extended_end_date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> 
                  New End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  id="extended_end_date"
                  name="extended_end_date"
                  value={form.extended_end_date}
                  onChange={onChange}
                  min={minDate}
                  disabled={saving || !!successMessage}
                  className={errors.extended_end_date ? 'border-destructive' : ''}
                />
                {errors.extended_end_date && (
                  <p className="text-sm text-destructive">{errors.extended_end_date}</p>
                )}
              </div>

              {/* Extension Reason */}
              <div className="space-y-2">
                <Label htmlFor="extension_reason" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> 
                  Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="extension_reason"
                  name="extension_reason"
                  rows={4}
                  value={form.extension_reason}
                  onChange={onChange}
                  disabled={saving || !!successMessage}
                  className={errors.extension_reason ? 'border-destructive' : ''}
                  placeholder="Explain why you need to extend this trip..."
                />
                {errors.extension_reason && (
                  <p className="text-sm text-destructive">{errors.extension_reason}</p>
                )}
              </div>

              {/* Info Alert */}
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <p className="font-medium mb-1">Extension Request Info:</p>
                  <ul className="text-sm space-y-1">
                    <li>• This will update your trip end date</li>
                    <li>• Finance will be notified (no approval required)</li>
                    <li>• You can request additional advance if needed</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>

            <CardFooter className="flex justify-between bg-muted/50 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/employee/trips/${id}`)}
                disabled={saving || !!successMessage}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={saving || !!successMessage}
              >
                {saving ? (
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
                  'Submit Extension Request'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}