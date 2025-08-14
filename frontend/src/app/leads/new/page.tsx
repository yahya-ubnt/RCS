"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Phone, MapPin, Calendar, User, FileText, Tag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Staff = {
  _id: string
  fullName: string
  role: "Caretaker" | "Agent"
}

const mockStaff: Staff[] = [
  { _id: "staff_001", fullName: "Peter Mwangi", role: "Agent" },
  { _id: "staff_002", fullName: "Mary Njeri", role: "Caretaker" },
  { _id: "staff_003", fullName: "James Kiprotich", role: "Agent" },
]

export default function NewLeadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [staff] = useState<Staff[]>(mockStaff)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    leadSource: "Manual",
    buildingName: "",
    buildingLocation: "",
    assignedTo: "",
    notes: "",
    nextPaymentDate: "",
  })

  const [phoneError, setPhoneError] = useState("")

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+254[0-9]{9}$/
    if (!phoneRegex.test(phone)) {
      setPhoneError("Phone must be in format +254XXXXXXXXX")
      return false
    }
    setPhoneError("")
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validatePhone(formData.phoneNumber)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Lead Created",
        description: `Lead ${formData.name || formData.phoneNumber} has been created successfully.`,
      })

      router.push("/leads")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create lead. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      leadSource: "Manual",
      buildingName: "",
      buildingLocation: "",
      assignedTo: "",
      notes: "",
      nextPaymentDate: "",
    })
    setPhoneError("")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/leads")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Lead</h1>
            <p className="text-muted-foreground">Create a new lead record for potential customers</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Lead Information
              </CardTitle>
              <CardDescription>
                Fill in the details below to create a new lead. Phone number is required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    Contact Information
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Optional - can be added later"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData({ ...formData, phoneNumber: e.target.value })
                          if (phoneError) validatePhone(e.target.value)
                        }}
                        placeholder="+254712345678"
                        required
                      />
                      {phoneError && <p className="text-sm text-red-600">{phoneError}</p>}
                    </div>
                  </div>
                </div>

                {/* Lead Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    Lead Details
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="leadSource">Lead Source</Label>
                      <Select
                        value={formData.leadSource}
                        onValueChange={(value) => setFormData({ ...formData, leadSource: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Manual">Manual Entry</SelectItem>
                          <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                          <SelectItem value="SMS">SMS</SelectItem>
                          <SelectItem value="Referral">Referral</SelectItem>
                          <SelectItem value="Website">Website</SelectItem>
                          <SelectItem value="API">API Integration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedTo">Assign To</Label>
                      <Select
                        value={formData.assignedTo || "unassigned"}
                        onValueChange={(value) =>
                          setFormData({ ...formData, assignedTo: value === "unassigned" ? "" : value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select staff member" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Leave Unassigned</SelectItem>
                          {staff.map((member) => (
                            <SelectItem key={member._id} value={member._id}>
                              {member.fullName} — {member.role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Property Information
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buildingName">Building Name</Label>
                      <Input
                        id="buildingName"
                        value={formData.buildingName}
                        onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
                        placeholder="e.g., Sunrise Apartments"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="buildingLocation">Building Location</Label>
                      <Input
                        id="buildingLocation"
                        value={formData.buildingLocation}
                        onChange={(e) => setFormData({ ...formData, buildingLocation: e.target.value })}
                        placeholder="e.g., Kilimani, Nairobi"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    Additional Information
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nextPaymentDate">Next Payment Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="nextPaymentDate"
                          type="date"
                          value={formData.nextPaymentDate}
                          onChange={(e) => setFormData({ ...formData, nextPaymentDate: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        When is the customer expected to make their next payment?
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={4}
                        placeholder="Add any relevant information about this lead:
• Current internet provider
• Reason for dissatisfaction
• Specific needs or requirements
• Budget considerations
• Best time to contact"
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button type="button" variant="outline" onClick={handleReset}>
                    Reset Form
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => router.push("/leads")}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Creating Lead..." : "Create Lead"}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Tips for Adding Leads</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-blue-500" />
                <div>
                  <p className="font-medium text-foreground">Phone Number Format</p>
                  <p>Use the format +254XXXXXXXXX for Kenyan phone numbers</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Tag className="h-4 w-4 mt-0.5 text-green-500" />
                <div>
                  <p className="font-medium text-foreground">Lead Sources</p>
                  <p>Choose the appropriate source to track where leads are coming from</p>
                </div>
              </div>
              <div className="flex gap-3">
                <FileText className="h-4 w-4 mt-0.5 text-orange-500" />
                <div>
                  <p className="font-medium text-foreground">Notes Section</p>
                  <p>Include current provider, dissatisfaction reasons, and specific customer needs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
