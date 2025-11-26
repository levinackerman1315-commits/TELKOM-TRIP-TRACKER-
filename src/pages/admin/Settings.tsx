import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { settingsAPI } from '@/services/api'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, XCircle, DollarSign, ArrowLeft, Info } from 'lucide-react'

export default function FinanceAreaSettings() {
  const navigate = useNavigate()
  
  const [pricePerKm, setPricePerKm] = useState<number>(5000)
  const [originalPrice, setOriginalPrice] = useState<number>(5000)
  const [newPrice, setNewPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    fetchCurrentPrice()
  }, [])

  useEffect(() => {
    if (newPrice && parseInt(newPrice) !== originalPrice) {
      setHasChanges(true)
    } else {
      setHasChanges(false)
    }
  }, [newPrice, originalPrice])

  const fetchCurrentPrice = async () => {
    try {
      setIsLoading(true)
      const response = await settingsAPI.getPricePerKm()
      const price = response.data.data.price_per_km
      setPricePerKm(price)
      setOriginalPrice(price)
      setNewPrice(price.toString())
    } catch (error) {
      console.error('Failed to fetch price:', error)
      setError('Failed to load current price settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)

    const price = parseInt(newPrice)

    // Validation
    if (isNaN(price)) {
      setError('Please enter a valid number')
      return
    }

    if (price < 1000) {
      setError('Price must be at least Rp 1.000')
      return
    }

    if (price > 50000) {
      setError('Price cannot exceed Rp 50.000')
      return
    }

    if (price === originalPrice) {
      setError('No changes detected')
      return
    }

    try {
      setIsSaving(true)
      await settingsAPI.updatePricePerKm(price)
      
      setPricePerKm(price)
      setOriginalPrice(price)
      setHasChanges(false)
      setSuccess(`Price per km successfully updated to Rp ${formatCurrency(price)}`)

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update price per km')
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setNewPrice(originalPrice.toString())
    setHasChanges(false)
    setError(null)
    setSuccess(null)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID').format(amount)
  }

  const calculateExample = (distance: number, days: number) => {
    const price = parseInt(newPrice) || originalPrice
    return distance * price * days
  }

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto py-8">
      {/* ✅ BACK BUTTON - STYLE SAMA SEPERTI PROFILE */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate('/finance-area')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Finance Settings</h1>
        <p className="text-muted-foreground">
          Configure price per kilometer for trip budget calculations
        </p>
      </div>

      {/* Success Alert */}
      {success && (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6">
        {/* Current Price Display */}
        <Card>
          <CardHeader>
            <CardTitle>Current Price Configuration</CardTitle>
            <CardDescription>
              This price is used to calculate estimated budgets for all new trips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <DollarSign className="h-8 w-8 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Price per Kilometer</p>
                <p className="text-3xl font-bold">Rp {formatCurrency(pricePerKm)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Update Price Form */}
        <Card>
          <CardHeader>
            <CardTitle>Update Price per Kilometer</CardTitle>
            <CardDescription>
              Change the price used for calculating trip budgets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPrice">
                New Price (Rp / km) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">Rp</span>
                <Input
                  id="newPrice"
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="pl-10"
                  placeholder="Enter new price"
                  min="1000"
                  max="50000"
                  step="500"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum: Rp 1.000 | Maximum: Rp 50.000
              </p>
            </div>

            {/* Change Indicator */}
            {hasChanges && (
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertDescription>
                  <p className="font-semibold text-blue-900">Unsaved Changes</p>
                  <p className="text-sm text-blue-800 mt-1">
                    Old Price: Rp {formatCurrency(originalPrice)} → New Price: Rp {formatCurrency(parseInt(newPrice) || 0)}
                  </p>
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={isSaving || !hasChanges}
                className="flex-1"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>

              {hasChanges && (
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isSaving}
                >
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Preview Calculation */}
        <Card>
          <CardHeader>
            <CardTitle>Preview Calculation</CardTitle>
            <CardDescription>
              See how the new price affects budget calculations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { distance: 50, days: 1, label: 'Short trip (50 km, 1 day)' },
                { distance: 100, days: 3, label: 'Medium trip (100 km, 3 days)' },
                { distance: 200, days: 5, label: 'Long trip (200 km, 5 days)' },
              ].map((example, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">{example.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {example.distance} km × Rp {formatCurrency(parseInt(newPrice) || originalPrice)} × {example.days} day(s)
                    </p>
                  </div>
                  <p className="text-lg font-bold">
                    Rp {formatCurrency(calculateExample(example.distance, example.days))}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            <p className="font-semibold">Important Notes:</p>
            <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
              <li>Changes will only affect NEW trip requests created after saving</li>
              <li>Existing trips will keep their original budget calculations</li>
              <li>Price changes are logged for audit purposes</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}