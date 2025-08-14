"use client"

import { useState } from "react"
import Link from "next/link"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Users,
  Building2,
  Grid3X3,
  List,
  Globe,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Building = {
  _id: string
  name: string
  address: string
  gps?: { lat: number; lng: number }
  owner?: string
  staffName: string
  staffPhone: string
  notes?: string
  images?: string[]
  providers: string[]
  totalUnits: number
  active: boolean
  createdAt: string
}

const initialBuildings: Building[] = [
  {
    _id: "bld_001",
    name: "Sunrise Apartments",
    address: "Kilimani, Nairobi",
    gps: { lat: -1.2921, lng: 36.8219 },
    owner: "John Doe",
    staffName: "Peter Mwangi",
    staffPhone: "+254712345678",
    notes: "Rooftop antenna installed. Building has excellent network coverage.",
    images: ["/modern-apartment-building.png"],
    providers: ["Mediatek", "Zuku"],
    totalUnits: 50,
    active: true,
    createdAt: "2024-01-15",
  },
  {
    _id: "bld_002",
    name: "Garden View Complex",
    address: "Westlands, Nairobi",
    gps: { lat: -1.2634, lng: 36.8078 },
    owner: "Sarah Wilson",
    staffName: "Mary Njeri",
    staffPhone: "+254723456789",
    notes: "New construction, fiber ready. Modern building with good infrastructure.",
    images: ["/modern-apartment-complex.png"],
    providers: ["Safaricom", "Mediatek"],
    totalUnits: 75,
    active: true,
    createdAt: "2024-01-10",
  },
  {
    _id: "bld_003",
    name: "Riverside Towers",
    address: "Karen, Nairobi",
    gps: { lat: -1.3197, lng: 36.7073 },
    owner: "Michael Chen",
    staffName: "James Kiprotich",
    staffPhone: "+254734567890",
    notes: "High-end residential, security gate. Premium location with affluent residents.",
    images: ["/luxury-towers.png"],
    providers: ["Zuku", "Safaricom", "Mediatek"],
    totalUnits: 120,
    active: true,
    createdAt: "2023-12-20",
  },
  {
    _id: "bld_004",
    name: "City Center Plaza",
    address: "CBD, Nairobi",
    gps: { lat: -1.2864, lng: 36.8172 },
    owner: "Emily Rodriguez",
    staffName: "Grace Wanjiku",
    staffPhone: "+254745678901",
    notes: "Mixed use building, commercial ground floor",
    images: ["/city-plaza-building.png"],
    providers: ["Safaricom"],
    totalUnits: 30,
    active: true,
    createdAt: "2023-11-15",
  },
]

const providerColors: Record<string, string> = {
  Mediatek: "bg-blue-100 text-blue-800",
  Safaricom: "bg-green-100 text-green-800",
  Zuku: "bg-purple-100 text-purple-800",
  Airtel: "bg-orange-100 text-orange-800",
  Telkom: "bg-red-100 text-red-800",
}

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings)
  const [searchTerm, setSearchTerm] = useState("")
  const [providerFilter, setProviderFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredBuildings = buildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.staffName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProvider = providerFilter === "all" || building.providers.includes(providerFilter)
    return matchesSearch && matchesProvider && building.active
  })

  const handleDeleteBuilding = (buildingId: string) => {
    setBuildings(buildings.map((building) => (building._id === buildingId ? { ...building, active: false } : building)))
  }

  const totalUnits = buildings.reduce((sum, building) => sum + building.totalUnits, 0)
  const averageUnits = Math.round(totalUnits / buildings.length)

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Buildings</h1>
            <p className="text-muted-foreground">Manage building information and caretaker assignments</p>
          </div>
          <Link href="/buildings/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Building
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{buildings.filter((b) => b.active).length}</div>
              <p className="text-xs text-muted-foreground">Active properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
              <p className="text-xs text-muted-foreground">Across all buildings</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Units</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageUnits}</div>
              <p className="text-xs text-muted-foreground">Per building</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Providers</CardTitle>
              <Globe className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Service providers</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search buildings..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Providers</SelectItem>
                <SelectItem value="Mediatek">Mediatek</SelectItem>
                <SelectItem value="Safaricom">Safaricom</SelectItem>
                <SelectItem value="Zuku">Zuku</SelectItem>
                <SelectItem value="Airtel">Airtel</SelectItem>
                <SelectItem value="Telkom">Telkom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Buildings Display */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "grid" | "list")} className="space-y-4">
          <TabsContent value="grid" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBuildings.map((building) => (
                <Card key={building._id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{building.name}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {building.address}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/buildings/${building._id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/buildings/edit/${building._id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Building
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteBuilding(building._id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Building
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {building.images && building.images.length > 0 && (
                      <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                        <img
                          src={building.images[0] || "/placeholder.svg"}
                          alt={building.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{building.totalUnits} units</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{building.staffPhone}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Caretaker:</span> {building.staffName}
                      </div>
                      {building.owner && (
                        <div className="text-sm">
                          <span className="font-medium">Owner:</span> {building.owner}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {building.providers.map((provider) => (
                        <Badge key={provider} className={providerColors[provider] || "bg-gray-100 text-gray-800"}>
                          {provider}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredBuildings.map((building) => (
                    <div key={building._id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="space-y-1">
                            <h3 className="font-medium">{building.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {building.address}
                            </p>
                          </div>
                          <div className="text-sm">
                            <div className="font-medium">{building.staffName}</div>
                            <div className="text-muted-foreground">{building.staffPhone}</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium">{building.totalUnits}</div>
                            <div className="text-xs text-muted-foreground">units</div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {building.providers.map((provider) => (
                              <Badge key={provider} className={providerColors[provider] || "bg-gray-100 text-gray-800"}>
                                {provider}
                              </Badge>
                            ))}
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
                            <DropdownMenuItem asChild>
                              <Link href={`/buildings/${building._id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/buildings/edit/${building._id}`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Building
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteBuilding(building._id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Building
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Empty State */}
        {filteredBuildings.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No buildings found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm || providerFilter !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by adding your first building"}
              </p>
              <Link href="/buildings/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Building
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
