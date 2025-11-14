import { useState, useEffect, FormEvent } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  ArrowLeft,
  Receipt,
  Upload,
  FileText,
  DollarSign,
  Info,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Calendar,
  X,
  Image as ImageIcon
} from 'lucide-react'
import { receiptAPI, tripAPI } from '@/services/api'
import { Trip } from '@/types'

const EXPENSE_CATEGORIES = [
  { value: 'transportation', label: 'Transportation' },
  { value: 'accommodation', label: 'Accommodation' },
  { value: 'meals', label: 'Meals' },
  { value: 'communication', label: 'Communication' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'supplies', label: 'Office Supplies' },
  { value: 'other', label: 'Other' },
]

export default function NewReceipt() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tripId = searchParams.get('trip_id')

  const [trip, setTrip] = useState<Trip | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    merchant_name: '',
    receipt_date: new Date().toISOString().split('T')[0],
    description: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingTrip, setIsFetchingTrip] = useState(true)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    if (tripId) {
      fetchTrip()
    } else {
      navigate('/employee/trips')
    }
  }, [tripId])

  const fetchTrip = async () => {
    try {
      setIsFetchingTrip(true)
      const response = await tripAPI.getById(Number(tripId))
      setTrip(response.data.data)
    } catch (error) {
      console.error('Failed to fetch trip:', error)
      setErrors({ fetch: 'Failed to load trip details' })
    } finally {
      setIsFetchingTrip(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf']
      if (!allowedTypes.includes(file.type)) {
        setErrors({ file: 'Only JPG, PNG, GIF, and PDF files are allowed' })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ file: 'File size must be less than 5MB' })
        return
      }

      setSelectedFile(file)
      setErrors(prev => ({ ...prev, file: '' }))

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setPreviewUrl('')
      }
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    setPreviewUrl('')
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.merchant_name.trim()) {
      newErrors.merchant_name = 'Merchant name is required'
    }

    if (!formData.receipt_date) {
      newErrors.receipt_date = 'Receipt date is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!selectedFile) {
      newErrors.file = 'Receipt image/PDF is required'
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
      const formDataToSend = new FormData()
      formDataToSend.append('trip_id', tripId!)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('amount', formData.amount)
      formDataToSend.append('merchant_name', formData.merchant_name)
      formDataToSend.append('receipt_date', formData.receipt_date)
      formDataToSend.append('description', formData.description)
      if (selectedFile) {
        formDataToSend.append('receipt_image', selectedFile)
      }

      await receiptAPI.upload(formDataToSend)
      
      setSuccessMessage('Receipt uploaded successfully!')
      
      setTimeout(() => {
        navigate(`/employee/trips/${tripId}`)
      }, 1500)

    } catch (error: any) {
      console.error('Failed to upload receipt:', error)
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else {
        setErrors({
          submit: error.response?.data?.message || 'Failed to upload receipt'
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  if (isFetchingTrip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading trip details...</p>
        </div>
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
          <CardContent>
            <p className="text-muted-foreground">Unable to load trip details.</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate('/employee/trips')}>
              Back to My Trips
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

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
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Upload Receipt</h1>
            <p className="text-sm text-white/80">Upload proof of expense for your trip</p>
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

        {/* Trip Info */}
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
              <span className="font-semibold">{trip.duration} days</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Total Expenses So Far
              </span>
              <span className="font-bold text-success">{formatCurrency(trip.total_expenses || 0)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Card className="shadow-soft mb-6">
            <CardHeader>
              <CardTitle>Receipt Details</CardTitle>
              <CardDescription>Fill in the expense information</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Expense Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, category: value }))
                    if (errors.category) {
                      setErrors(prev => ({ ...prev, category: '' }))
                    }
                  }}
                  disabled={isLoading}
                >
                  <SelectTrigger className={errors.category ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>

              {/* Amount & Merchant in grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Amount <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                    <Input
                      type="number"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="100"
                      disabled={isLoading}
                      className={`pl-10 ${errors.amount ? 'border-destructive' : ''}`}
                    />
                  </div>
                  {errors.amount && (
                    <p className="text-sm text-destructive">{errors.amount}</p>
                  )}
                </div>

                {/* Merchant Name */}
                <div className="space-y-2">
                  <Label htmlFor="merchant_name">
                    Merchant Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="merchant_name"
                    name="merchant_name"
                    value={formData.merchant_name}
                    onChange={handleChange}
                    placeholder="e.g., Restaurant, Hotel, Gas Station"
                    disabled={isLoading}
                    className={errors.merchant_name ? 'border-destructive' : ''}
                  />
                  {errors.merchant_name && (
                    <p className="text-sm text-destructive">{errors.merchant_name}</p>
                  )}
                </div>
              </div>

              {/* Receipt Date */}
              <div className="space-y-2">
                <Label htmlFor="receipt_date" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Receipt Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  type="date"
                  id="receipt_date"
                  name="receipt_date"
                  value={formData.receipt_date}
                  onChange={handleChange}
                  max={new Date().toISOString().split('T')[0]}
                  disabled={isLoading}
                  className={errors.receipt_date ? 'border-destructive' : ''}
                />
                {errors.receipt_date && (
                  <p className="text-sm text-destructive">{errors.receipt_date}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe what this expense was for..."
                  disabled={isLoading}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="receipt_image" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Receipt <span className="text-destructive">*</span>
                </Label>
                
                {!selectedFile ? (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                    <Input
                      type="file"
                      id="receipt_image"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                      className="hidden"
                      disabled={isLoading}
                    />
                    <label 
                      htmlFor="receipt_image" 
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-10 w-10 text-muted-foreground" />
                      <p className="text-sm font-medium">Click to upload receipt</p>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG, GIF or PDF (max 5MB)
                      </p>
                    </label>
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {previewUrl ? (
                          <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="w-24 h-24 object-cover rounded-lg border"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-muted rounded-lg border flex items-center justify-center">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{selectedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(selectedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={removeFile}
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {errors.file && (
                  <p className="text-sm text-destructive">{errors.file}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between bg-muted/50 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/employee/trips/${tripId}`)}
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
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Receipt
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Help Text */}
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription>
            <p className="font-semibold mb-2">Tips for uploading receipts:</p>
            <ul className="space-y-1 text-sm">
              <li>• Make sure the receipt is clear and readable</li>
              <li>• Include the merchant name, date, and amount</li>
              <li>• Upload within the trip duration period</li>
              <li>• Finance will verify all receipts before settlement</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}