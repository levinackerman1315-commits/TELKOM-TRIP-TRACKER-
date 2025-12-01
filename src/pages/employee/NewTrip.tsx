
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