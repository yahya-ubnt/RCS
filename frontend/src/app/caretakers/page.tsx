"use client"
import { useState } from "react"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Building2,
  UserCheck,
  Users,
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

type Staff = {
  _id: string
  fullName: string
  phone: string
  role: "Caretaker" | "Agent"
  assignedBuildings: string[]
  status: "Active" | "Inactive"
  createdAt: string
  updatedAt?: string
}

type Building = {
  _id: string
  name: string
  address: string
}

const mockStaff: Staff[] = [
  {
    _id: "staff_001",
    fullName: "Peter Mwangi",
    phone: "+254712345678",
    role: "Caretaker",
    assignedBuildings: ["bld_001", "bld_002"],
    status: "Active",
    createdAt: "2024-01-15",
  },
  {
    _id: "staff_002",
    fullName: "Mary Njeri",
    phone: "+254723456789",
    role: "Caretaker",
    assignedBuildings: ["bld_003"],
    status: "Active",
    createdAt: "2024-01-10",
  },
  {
    _id: "staff_003",
    fullName: "James Kiprotich",
    phone: "+254734567890",
    role: "Agent",
    assignedBuildings: ["bld_004", "bld_005"],
    status: "Active",
    createdAt: "2023-12-20",
  },
  {
    _id: "staff_004",
    fullName: "Grace Wanjiku",
    phone: "+254745678901",
    role: "Caretaker",
    assignedBuildings: ["bld_006"],
    status: "Inactive",
    createdAt: "2023-11-15",
  },
  {
    _id: "staff_005",
    fullName: "Samuel Ochieng",
    phone: "+254756789012",
    role: "Agent",
    assignedBuildings: [],
    status: "Active",
    createdAt: "2024-01-05",
  },
]

const mockBuildings: Building[] = [
  { _id: "bld_001", name: "Sunrise Apartments", address: "Kilimani, Nairobi" },
  { _id: "bld_002", name: "Garden View Complex", address: "Westlands, Nairobi" },
  { _id: "bld_003", name: "Riverside Towers", address: "Karen, Nairobi" },
  { _id: "bld_004", name: "City Center Plaza", address: "CBD, Nairobi" },
  { _id: "bld_005", name: "Parklands Heights", address: "Parklands, Nairobi" },
  { _id: "bld_006", name: "Eastleigh Square", address: "Eastleigh, Nairobi" },
]

const getRoleColor = (role: Staff["role"]) => {
  return role === "Caretaker" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
}

const getStatusColor = (status: Staff["status"]) => {
  return status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
}

export default function CaretakersPage() {
  const [staff, setStaff] = useState<Staff[]>(mockStaff)
  const [buildings] = useState<Building[]>(mockBuildings)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { toast } = useToast()

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || member.role === roleFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleDeleteStaff = (staffId: string) => {
    const staffMember = staff.find((s) => s._id === staffId)
    setStaff(staff.map((member) => (member._id === staffId ? { ...member, status: "Inactive" as const } : member)))
    toast({
      title: "Staff Deactivated",
      description: `${staffMember?.fullName} has been deactivated.`,
    })
  }

  const getBuildingName = (buildingId: string) => {
    return buildings.find((b) => b._id === buildingId)?.name || "Unknown Building"
  }

  const activeStaffCount = staff.filter((s) => s.status === "Active").length
  const caretakerCount = staff.filter((s) => s.role === "Caretaker" && s.status === "Active").length
  const agentCount = staff.filter((s) => s.role === "Agent" && s.status === "Active").length

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Caretakers & Agents</h1>
            <p className="text-muted-foreground">Manage staff members and their building assignments</p>
          </div>
          <Link href="/caretakers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Staff
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Staff</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStaffCount}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Caretakers</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{caretakerCount}</div>
              <p className="text-xs text-muted-foreground">Active caretakers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agents</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{agentCount}</div>
              <p className="text-xs text-muted-foreground">Active agents</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Buildings</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activeStaffCount > 0
                  ? Math.round(
                      staff
                        .filter((s) => s.status === "Active")
                        .reduce((acc, s) => acc + s.assignedBuildings.length, 0) / activeStaffCount,
                    )
                  : 0}
              </div>
              <p className="text-xs text-muted-foreground">Per staff member</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or phone..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="Caretaker">Caretaker</SelectItem>
              <SelectItem value="Agent">Agent</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
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
              {filteredStaff.map((member) => (
                <Card key={member._id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.fullName}`}
                            alt={member.fullName}
                          />
                          <AvatarFallback>
                            {member.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{member.fullName}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {member.phone}
                          </CardDescription>
                        </div>
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
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Staff
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteStaff(member._id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                      <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{member.assignedBuildings.length} buildings assigned</span>
                      </div>
                      {member.assignedBuildings.length > 0 && (
                        <div className="text-xs text-muted-foreground space-y-1">
                          {member.assignedBuildings.slice(0, 2).map((buildingId) => (
                            <div key={buildingId}>• {getBuildingName(buildingId)}</div>
                          ))}
                          {member.assignedBuildings.length > 2 && (
                            <div>• +{member.assignedBuildings.length - 2} more</div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Added: {new Date(member.createdAt).toLocaleDateString()}
                      {member.updatedAt && (
                        <span className="block">Updated: {new Date(member.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                        <th className="text-left p-4 font-medium">Role</th>
                        <th className="text-left p-4 font-medium">Buildings</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {filteredStaff.map((member) => (
                        <tr key={member._id} className="hover:bg-muted/50">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.fullName}`}
                                  alt={member.fullName}
                                />
                                <AvatarFallback className="text-xs">
                                  {member.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{member.fullName}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm">{member.phone}</td>
                          <td className="p-4">
                            <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                          </td>
                          <td className="p-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Building2 className="h-3 w-3 text-muted-foreground" />
                              <span>{member.assignedBuildings.length}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(member.status)}>{member.status}</Badge>
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
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit Staff
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteStaff(member._id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Deactivate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {filteredStaff.length === 0 && (
          <Card>
            <CardContent className="flex items-center justify-center h-32">
              <p className="text-muted-foreground">No staff members found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
