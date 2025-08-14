"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building2, MapPin, User, FileText, Globe, Upload, X, Phone, Camera, Save } from "lucide-react"

interface BuildingFormData {
  name: string
  address: string
  gps: { lat: number; lng: number }
  owner: string
  staffName: string
  staffPhone: string
  notes: string
  totalUnits: number
  providers: string[]
  images: string[]
}

const initialFormData: BuildingFormData = {
  name: "",
  address: "",
  gps: { lat: 0, lng: 0 },
  owner: "",
  staffName: "",
  staffPhone: "",
  notes: "",
  totalUnits: 0,
  providers: [],
  images: [],
}

const providerOptions = ["Mediatek", "Safaricom", "Zuku", "Airtel", "Telkom"]

export default function NewBuildingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<BuildingFormData>(initialFormData)
  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    // Required field validations
    if (!formData.name.trim()) {
      newErrors.name = "Building name is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.staffName.trim()) {
      newErrors.staffName = "Caretaker/Agent name is required"
    }

    if (!formData.staffPhone.trim()) {
      newErrors.staffPhone = "Caretaker/Agent contact is required"
    } else if (!/^\+254[0-9]{9}$/.test(formData.staffPhone)) {
      newErrors.staffPhone = "Phone must be in format +254XXXXXXXXX"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof BuildingFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const buildingData = {
        name: formData.name,
        address: formData.address,
        gps: formData.gps,
        owner: formData.owner || null,
        staffName: formData.staffName,
        staffPhone: formData.staffPhone,
        notes: formData.notes || null,
        images: uploadedImages,
        providers: selectedProviders,
        totalUnits: formData.totalUnits || 0,
      }

      console.log("Creating building:", buildingData)

      // Redirect to buildings list
      router.push("/buildings")
    } catch (error) {
      console.error("Error creating building:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleProvider = (provider: string) => {
    setSelectedProviders((prev) => (prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Simulate image upload - in real app, upload to cloud storage
      const newImages = Array.from(files).map(
        (file, index) => `/placeholder.svg?height=200&width=300&query=building-${Date.now()}-${index}`,
      )
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleLocationSearch = () => {
    if (formData.address) {
      // Simulate geocoding - in real app, use Google Maps API
      const mockCoordinates = {
        lat: -1.2921 + (Math.random() - 0.5) * 0.1,
        lng: 36.8219 + (Math.random() - 0.5) * 0.1,
      }
      setFormData((prev) => ({ ...prev, gps: mockCoordinates }))
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/buildings">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Building</h1>
            <p className="text-muted-foreground">Create a new building record with caretaker information</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>Enter the basic details about the building</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Building Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="e.g., Sunrise Apartments"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalUnits">Total Units</Label>
                    <Input
                      id="totalUnits"
                      type="number"
                      min="0"
                      value={formData.totalUnits || ""}
                      onChange={(e) => handleInputChange("totalUnits", Number(e.target.value) || 0)}
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="e.g., Kilimani, Nairobi"
                      className={errors.address ? "border-red-500" : ""}
                    />
                    <Button type="button" variant="outline" onClick={handleLocationSearch}>
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                  {formData.gps.lat !== 0 && formData.gps.lng !== 0 && (
                    <p className="text-sm text-muted-foreground">
                      GPS: {formData.gps.lat.toFixed(4)}, {formData.gps.lng.toFixed(4)}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner">Owner / Landlord Name</Label>
                  <Input
                    id="owner"
                    value={formData.owner}
                    onChange={(e) => handleInputChange("owner", e.target.value)}
                    placeholder="Property owner name"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Caretaker Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Caretaker / Agent Information
                </CardTitle>
                <CardDescription>Contact details for the building caretaker or managing agent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="staffName">Caretaker/Agent Name *</Label>
                    <Input
                      id="staffName"
                      value={formData.staffName}
                      onChange={(e) => handleInputChange("staffName", e.target.value)}
                      placeholder="e.g., Peter Mwangi"
                      className={errors.staffName ? "border-red-500" : ""}
                    />
                    {errors.staffName && <p className="text-sm text-red-500">{errors.staffName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="staffPhone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="staffPhone"
                        value={formData.staffPhone}
                        onChange={(e) => handleInputChange("staffPhone", e.target.value)}
                        placeholder="+254712345678"
                        className={`pl-10 ${errors.staffPhone ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.staffPhone && <p className="text-sm text-red-500">{errors.staffPhone}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Building Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Building Images
                </CardTitle>
                <CardDescription>Upload images of the building (optional)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="images"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> building images
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB each)</p>
                      </div>
                      <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Building image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Service Providers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Service Providers
                </CardTitle>
                <CardDescription>Select which internet/TV providers are available in this building</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label>Available Providers</Label>
                  <div className="flex flex-wrap gap-2">
                    {providerOptions.map((provider) => (
                      <Button
                        key={provider}
                        type="button"
                        variant={selectedProviders.includes(provider) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleProvider(provider)}
                        className="h-8"
                      >
                        {provider}
                      </Button>
                    ))}
                  </div>
                  {selectedProviders.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedProviders.map((provider) => (
                        <Badge key={provider} variant="secondary">
                          {provider}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Additional Information
                </CardTitle>
                <CardDescription>Any additional notes or special information about the building</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="notes">Description / Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    rows={4}
                    placeholder="Additional notes about the building, special instructions, access codes, etc."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Link href="/buildings">
                <Button type="button" variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Building...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Building
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
