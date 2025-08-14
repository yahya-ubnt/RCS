"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, User, Building2, UserCheck, FileText, Save, AlertCircle } from "lucide-react"
import Link from "next/link"

type Building = {
  _id: string
  name: string
  address: string
}

const mockBuildings: Building[] = [
  { _id: "bld_001", name: "Sunrise Apartments", address: "Kilimani, Nairobi" },
  { _id: "bld_002", name: "Garden View Complex", address: "Westlands, Nairobi" },
  { _id: "bld_003", name: "Riverside Towers", address: "Karen, Nairobi" },
  { _id: "bld_004", name: "City Center Plaza", address: "CBD, Nairobi" },
  { _id: "bld_005", name: "Parklands Heights", address: "Parklands, Nairobi" },
  { _id: "bld_006", name: "Eastleigh Square", address: "Eastleigh, Nairobi" },
]

export default function AddNewCaretakerPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [buildings] = useState<Building[]>(mockBuildings)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    role: "Caretaker",
    status: "Active",
    assignedBuildings: [] as string[],
    notes: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
  })

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+254[0-9]{9}$/
    return phoneRegex.test(phone)
  }

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      phone: "",
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be in format +254XXXXXXXXX"
    }

    setErrors(newErrors)
    return !newErrors.fullName && !newErrors.phone
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Staff Member Added",
        description: `${formData.fullName} has been added successfully.`,
      })

      router.push("/caretakers")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add staff member. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleBuilding = (buildingId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedBuildings: prev.assignedBuildings.includes(buildingId)
        ? prev.assignedBuildings.filter((id) => id !== buildingId)
        : [...prev.assignedBuildings, buildingId],
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/caretakers">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Staff Member</h1>
            <p className="text-muted-foreground">Create a new caretaker or agent profile</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>Enter the staff member's personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value })
                      if (errors.fullName) setErrors({ ...errors, fullName: "" })
                    }}
                    placeholder="Enter full name"
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: "" })
                    }}
                    placeholder="+254712345678"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">Format: +254XXXXXXXXX (Kenyan phone number)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Role & Status
              </CardTitle>
              <CardDescription>Define the staff member's role and current status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Caretaker">Caretaker</SelectItem>
                      <SelectItem value="Agent">Agent</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    {formData.role === "Caretaker"
                      ? "Manages building maintenance and tenant relations"
                      : "Handles property sales and leasing activities"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Building Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Building Assignment
              </CardTitle>
              <CardDescription>Select which buildings this staff member will manage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto border rounded-md p-4">
                {buildings.map((building) => (
                  <div key={building._id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted/50">
                    <Checkbox
                      checked={formData.assignedBuildings.includes(building._id)}
                      onCheckedChange={() => toggleBuilding(building._id)}
                      className="mt-1"
                    />
                    <div className="flex-1 cursor-pointer" onClick={() => toggleBuilding(building._id)}>
                      <Label className="text-sm font-medium cursor-pointer">{building.name}</Label>
                      <p className="text-xs text-muted-foreground">{building.address}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>Selected: {formData.assignedBuildings.length} building(s)</span>
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
              <CardDescription>Optional notes and additional details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes about this staff member..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4">
            <Link href="/caretakers">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Create Staff Member
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
