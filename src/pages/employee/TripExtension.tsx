import { useEffect, useState, FormEvent } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ArrowLeft, Calendar, FileText, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
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
    new_end_date: '',
    extension_reason: '',
    additional_budget: ''
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
      // min date = current end_date + 1
      const minDate = new Date(new Date(t.end_date).getTime() + 24 * 60 * 60 * 1000)
      const iso = minDate.toISOString().split('T')[0]
      setForm(f => ({ ...f, new_end_date: iso }))
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
    if (!form.new_end_date) next.new_end_date = 'New end date is required'
    if (!form.extension_reason.trim()) next.extension_reason = 'Reason is required'
    if (trip && form.new_end_date) {
      const newEnd = new Date(form.new_end_date)
      const currentEnd = new Date(trip.end_date)
      if (newEnd <= currentEnd) next.new_end_date = 'Must be after current end date'
    }
    if (form.additional_budget && Number(form.additional_budget) < 0) {
      next.additional_budget = 'Must be 0 or greater'
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
          new_end_date: form.new_end_date,
          extension_reason: form.extension_reason,
          additional_budget: form.additional_budget ? Number(form.additional_budget) : null
        }
      )
      setSuccessMessage('Extension request submitted')
      setTimeout(() => navigate(`/employee/trips/${id}`), 1200)
    } catch (err: any) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors)
      else setErrors({ submit: err.response?.data?.message || 'Failed to submit extension' })
    } finally {
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
          <CardHeader><CardTitle>Trip Not Found</CardTitle></CardHeader>
          <CardFooter><Button onClick={() => navigate('/employee/trips')}>Back</Button></CardFooter>
        </Card>
      </div>
    )
  }

  const minDate = new Date(new Date(trip.end_date).getTime() + 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary border-b shadow-soft">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <Link to={`/employee/trips/${id}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Trip Details
          </Link>
          <h1 className="text-2xl font-bold text-white">Request Trip Extension</h1>
          <p className="text-sm text-white/80">Trip #{trip.trip_number} — {trip.destination}</p>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        {successMessage && (
          <Alert className="mb-6 border-success bg-success/10">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <AlertDescription className="text-success">{successMessage}</AlertDescription>
          </Alert>
        )}
        {errors.submit && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.submit}</AlertDescription>
          </Alert>
        )}

        <Card className="shadow-soft mb-6">
          <CardHeader>
            <CardTitle>Extension Details</CardTitle>
            <CardDescription>Propose new end date and reason</CardDescription>
          </CardHeader>
          <form onSubmit={submit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current_end">Current End Date</Label>
                <Input id="current_end" value={new Date(trip.end_date).toLocaleDateString('id-ID')} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_end_date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> New End Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  id="new_end_date"
                  name="new_end_date"
                  value={form.new_end_date}
                  onChange={onChange}
                  min={minDate}
                  className={errors.new_end_date ? 'border-destructive' : ''}
                />
                {errors.new_end_date && <p className="text-sm text-destructive">{errors.new_end_date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="extension_reason" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Reason <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="extension_reason"
                  name="extension_reason"
                  rows={4}
                  value={form.extension_reason}
                  onChange={onChange}
                  className={errors.extension_reason ? 'border-destructive' : ''}
                  placeholder="Explain why you need to extend this trip..."
                />
                {errors.extension_reason && <p className="text-sm text-destructive">{errors.extension_reason}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional_budget">Additional Budget (optional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                  <Input
                    type="number"
                    id="additional_budget"
                    name="additional_budget"
                    value={form.additional_budget}
                    onChange={onChange}
                    min="0"
                    step="1000"
                    className={`pl-10 ${errors.additional_budget ? 'border-destructive' : ''}`}
                    placeholder="0"
                  />
                </div>
                {errors.additional_budget && <p className="text-sm text-destructive">{errors.additional_budget}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between bg-muted/50 border-t">
              <Button type="button" variant="outline" onClick={() => navigate(`/employee/trips/${id}`)}>Cancel</Button>
              <Button type="submit" disabled={saving}>
                {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Submitting...</> : 'Submit Extension'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}