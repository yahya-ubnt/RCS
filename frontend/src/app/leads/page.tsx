"use client"

import type React from "react"
import { useState } from "react"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  UserPlus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Lead = {
  _id: string
  name?: string
  phoneNumber: string
  leadSource: "Manual" | "WhatsApp" | "SMS" | "Referral" | "Website" | "API"
  buildingName?: string
  buildingLocation?: string
  status: "New" | "In Progress" | "Converted" | "Rejected" | "Follow Up"
  assignedTo?: string
  notes?: string
  nextPaymentDate?: string
  createdAt: string
  updatedAt?: string
}

type Staff = {
  _id: string
  fullName: string
  role: "Caretaker" | "Agent"
}

const mockLeads: Lead[] = [
  {
    _id: "lead_001",
    name: "John Doe",
    phoneNumber: "+254712345678",
    leadSource: "Website",
    buildingName: "Sunrise Apartments",
    buildingLocation: "Kilimani, Nairobi",
    status: "New",
    assignedTo: "staff_001",
    notes: "Currently with Safaricom, unhappy with speed. Looking for 10Mbps.",
    nextPaymentDate: "2024-02-15",
    createdAt: "2024-01-15",
  },
  {
    _id: "lead_002",
    name: "Mary Wanjiku",
    phoneNumber: "+254723456789",
    leadSource: "WhatsApp",
    buildingName: "Garden View Complex",
    buildingLocation: "Westlands, Nairobi",
    status: "In Progress",
    assignedTo: "staff_002",
    notes: "Interested in fiber connection. Budget around 3000 KES monthly.",
    nextPaymentDate: "2024-02-20",
    createdAt: "2024-01-12",
  },
  {
    _id: "lead_003",
    name: "Peter Kimani",
    phoneNumber: "+254734567890",
    leadSource: "Referral",
    buildingName: "Riverside Towers",
    buildingLocation: "Karen, Nairobi",
    status: "Converted",
    assignedTo: "staff_001",
    notes: "Converted to customer. 20Mbps package installed.",
    createdAt: "2024-01-08",
  },
  {
    _id: "lead_004",
    phoneNumber: "+254745678901",
    leadSource: "SMS",
    buildingLocation: "CBD, Nairobi",
    status: "Follow Up",
    assignedTo: "staff_003",
    notes: "No response to initial contact. Schedule follow-up call.",
    nextPaymentDate: "2024-02-10",
    createdAt: "2024-01-20",
  },
  {
    _id: "lead_005",
    name: "Grace Muthoni",
    phoneNumber: "+254756789012",
    leadSource: "Manual",
    buildingName: "City Center Plaza",
    buildingLocation: "CBD, Nairobi",
    status: "Rejected",
    assignedTo: "staff_002",
    notes: "Not interested in changing provider at this time.",
    createdAt: "2024-01-05",
  },
]

const mockStaff: Staff[] = [
  { _id: "staff_001", fullName: "Peter Mwangi", role: "Agent" },
  { _id: "staff_002", fullName: "Mary Njeri", role: "Caretaker" },
  { _id: "staff_003", fullName: "James Kiprotich", role: "Agent" },
]

const getStatusColor = (status: Lead["status"]) => {
  const colors = {
    New: "bg-blue-100 text-blue-800",
    "In Progress": "bg-yellow-100 text-yellow-800",
    Converted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    "Follow Up": "bg-orange-100 text-orange-800",
  }
  return colors[status]
}

const getStatusIcon = (status: Lead["status"]) => {
  const icons = {
    New: AlertCircle,
    "In Progress": Clock,
    Converted: CheckCircle,
    Rejected: XCircle,
    "Follow Up": Calendar,
  }
  return icons[status]
}

const getSourceColor = (source: Lead["leadSource"]) => {
  const colors = {
    Manual: "bg-gray-100 text-gray-800",
    WhatsApp: "bg-green-100 text-green-800",
    SMS: "bg-blue-100 text-blue-800",
    Referral: "bg-purple-100 text-purple-800",
    Website: "bg-indigo-100 text-indigo-800",
    API: "bg-pink-100 text-pink-800",
  }
  return colors[source]
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [staff] = useState<Staff[]>(mockStaff)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("New")
  const [sourceFilter, setSourceFilter] = useState<string>("Manual")
  const [assignedFilter, setAssignedFilter] = useState<string>("staff_001")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const { toast } = useToast()

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      (lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      lead.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.buildingName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (lead.buildingLocation?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    const matchesSource = sourceFilter === "all" || lead.leadSource === sourceFilter
    const matchesAssigned =
      assignedFilter === "all" ||
      (assignedFilter === "unassigned" ? !lead.assignedTo : lead.assignedTo === assignedFilter)
    return matchesSearch && matchesStatus && matchesSource && matchesAssigned
  })

  const handleEditLead = (leadData: Partial<Lead>) => {
    if (editingLead) {
      setLeads(
        leads.map((lead) =>
          lead._id === editingLead._id
            ? { ...lead, ...leadData, updatedAt: new Date().toISOString().split("T")[0] }
            : lead,
        ),
      )
      setEditingLead(null)
      setIsDialogOpen(false)
      toast({
        title: "Lead Updated",
        description: `Lead ${leadData.name || leadData.phoneNumber} has been updated successfully.`,
      })
    }
  }

  const handleDeleteLead = (leadId: string) => {
    const lead = leads.find((l) => l._id === leadId)
    setLeads(leads.filter((lead) => lead._id !== leadId))
    toast({
      title: "Lead Deleted",
      description: `Lead ${lead?.name || lead?.phoneNumber} has been deleted.`,
    })
  }

  const handleStatusChange = (leadId: string, newStatus: Lead["status"]) => {
    setLeads(
      leads.map((lead) =>
        lead._id === leadId ? { ...lead, status: newStatus, updatedAt: new Date().toISOString().split("T")[0] } : lead,
      ),
    )
    const lead = leads.find((l) => l._id === leadId)
    toast({
      title: "Status Updated",
      description: `Lead ${lead?.name || lead?.phoneNumber} status changed to ${newStatus}.`,
    })
  }

  const getStaffName = (staffId?: string) => {
    if (!staffId) return "Unassigned"
    return staff.find((s) => s._id === staffId)?.fullName || "Unknown"
  }

  // Statistics
  const totalLeads = leads.length
  const newLeads = leads.filter((l) => l.status === "New").length
  const inProgressLeads = leads.filter((l) => l.status === "In Progress").length
  const convertedLeads = leads.filter((l) => l.status === "Converted").length
  const conversionRate = totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Leads</h1>
            <p className="text-muted-foreground">Manage and track all your potential customers</p>
          </div>
          <div className="flex gap-2">
            <Link href="/leads/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </Link>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <LeadDialog
                lead={editingLead}
                staff={staff}
                onSave={handleEditLead}
                onCancel={() => {
                  setIsDialogOpen(false)
                  setEditingLead(null)
                }}
              />
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
              <p className="text-xs text-muted-foreground">All time leads</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newLeads}</div>
              <p className="text-xs text-muted-foreground">Awaiting contact</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressLeads}</div>
              <p className="text-xs text-muted-foreground">Being worked on</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{conversionRate}%</div>
              <p className="text-xs text-muted-foreground">{convertedLeads} converted</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search leads..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Follow Up">Follow Up</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sourceFilter} onValueChange={setSourceFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sources</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="SMS">SMS</SelectItem>
              <SelectItem value="Referral">Referral</SelectItem>
              <SelectItem value="Website">Website</SelectItem>
              <SelectItem value="API">API</SelectItem>
            </SelectContent>
          </Select>
          <Select value={assignedFilter} onValueChange={setAssignedFilter}>
            <SelectTrigger>
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Assigned" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Staff</SelectItem>
              {staff.map((member) => (
                <SelectItem key={member._id} value={member._id}>
                  {member.fullName} ({member.role})
                </SelectItem>
              ))}
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="grid" className="space-y-4">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>

          <TabsContent value="grid" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredLeads.map((lead) => {
                const StatusIcon = getStatusIcon(lead.status)
                return (
                  <Card key={lead._id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <CardTitle className="text-lg">{lead.name || "Anonymous Lead"}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {lead.phoneNumber}
                          </CardDescription>
                          {lead.buildingName && (
                            <CardDescription className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {lead.buildingName}
                            </CardDescription>
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEditingLead(lead)
                                setIsDialogOpen(true)
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteLead(lead._id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className={getStatusColor(lead.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {lead.status}
                        </Badge>
                        <Badge className={getSourceColor(lead.leadSource)}>{lead.leadSource}</Badge>
                      </div>

                      {lead.buildingLocation && (
                        <div className="text-sm text-muted-foreground">
                          <MapPin className="inline h-3 w-3 mr-1" />
                          {lead.buildingLocation}
                        </div>
                      )}

                      <div className="text-sm">
                        <span className="font-medium">Assigned to:</span> {getStaffName(lead.assignedTo)}
                      </div>

                      {lead.nextPaymentDate && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          Next payment: {new Date(lead.nextPaymentDate).toLocaleDateString()}
                        </div>
                      )}

                      {lead.notes && (
                        <div className="text-sm text-muted-foreground">
                          <p className="line-clamp-2">{lead.notes}</p>
                        </div>
                      )}

                      <div className="text-xs text-muted-foreground">
                        Created: {new Date(lead.createdAt).toLocaleDateString()}
                        {lead.updatedAt && (
                          <span className="block">Updated: {new Date(lead.updatedAt).toLocaleDateString()}</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium">Name</th>
                        <th className="text-left p-4 font-medium">Phone</th>
                        <th className="text-left p-4 font-medium">Source</th>
                        <th className="text-left p-4 font-medium">Building</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Assigned To</th>
                        <th className="text-left p-4 font-medium">Next Payment</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredLeads.map((lead) => {
                        const StatusIcon = getStatusIcon(lead.status)
                        return (
                          <tr key={lead._id} className="hover:bg-muted/50">
                            <td className="p-4">
                              <div className="font-medium">{lead.name || "Anonymous"}</div>
                            </td>
                            <td className="p-4 text-sm">{lead.phoneNumber}</td>
                            <td className="p-4">
                              <Badge className={getSourceColor(lead.leadSource)}>{lead.leadSource}</Badge>
                            </td>
                            <td className="p-4 text-sm">
                              <div>{lead.buildingName || "—"}</div>
                              {lead.buildingLocation && (
                                <div className="text-xs text-muted-foreground">{lead.buildingLocation}</div>
                              )}
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(lead.status)}>
                                <StatusIcon className="mr-1 h-3 w-3" />
                                {lead.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-sm">{getStaffName(lead.assignedTo)}</td>
                            <td className="p-4 text-sm">
                              {lead.nextPaymentDate ? new Date(lead.nextPaymentDate).toLocaleDateString() : "—"}
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setEditingLead(lead)
                                      setIsDialogOpen(true)
                                    }}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Lead
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Change Status</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteLead(lead._id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Lead
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredLeads.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No leads found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function LeadDialog({
  lead,
  staff,
  onSave,
  onCancel,
}: {
  lead: Lead | null
  staff: Staff[]
  onSave: (data: Partial<Lead>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState({
    name: lead?.name || "",
    phoneNumber: lead?.phoneNumber || "+254712345678",
    leadSource: lead?.leadSource || "Manual",
    buildingName: lead?.buildingName || "",
    buildingLocation: lead?.buildingLocation || "",
    status: lead?.status || "New",
    assignedTo: lead?.assignedTo || "staff_001",
    notes: lead?.notes || "",
    nextPaymentDate: lead?.nextPaymentDate || "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validatePhone(formData.phoneNumber)) {
      return
    }
    onSave(formData)
  }

  return (
    <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{lead ? "Edit Lead" : "Add New Lead"}</DialogTitle>
        <DialogDescription>
          {lead ? "Update the lead information below." : "Create a new lead record."}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Optional"
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="leadSource">Lead Source</Label>
            <Select
              value={formData.leadSource}
              onValueChange={(value) => setFormData({ ...formData, leadSource: value as Lead["leadSource"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="API">API</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as Lead["status"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
                <SelectItem value="Follow Up">Follow Up</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="buildingName">Building Name</Label>
            <Input
              id="buildingName"
              value={formData.buildingName}
              onChange={(e) => setFormData({ ...formData, buildingName: e.target.value })}
              placeholder="Optional"
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assigned To</Label>
            <Select
              value={formData.assignedTo || "unassigned"}
              onValueChange={(value) => setFormData({ ...formData, assignedTo: value === "unassigned" ? "" : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select staff member" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {staff.map((member) => (
                  <SelectItem key={member._id} value={member._id}>
                    {member.fullName} ({member.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nextPaymentDate">Next Payment Date</Label>
            <Input
              id="nextPaymentDate"
              type="date"
              value={formData.nextPaymentDate}
              onChange={(e) => setFormData({ ...formData, nextPaymentDate: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={3}
            placeholder="Current provider, needs, budget, etc..."
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{lead ? "Update Lead" : "Create Lead"}</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
