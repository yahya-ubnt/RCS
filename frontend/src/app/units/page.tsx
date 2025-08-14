"use client"
import { useState } from "react"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, MapPin, Users, Settings, Building2, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

type Building = {
  _id: string
  name: string
  address: string
  totalUnits: number
  visitedUnits: number
  providers: string[]
  active: boolean
  completionRate: number
  lastUpdated: string
  status: "completed" | "in-progress" | "not-started"
}

const mockBuildings: Building[] = [
  {
    _id: "bld_001",
    name: "Sunrise Apartments",
    address: "Kilimani, Nairobi",
    totalUnits: 50,
    visitedUnits: 45,
    providers: ["Mediatek", "Zuku"],
    active: true,
    completionRate: 90,
    lastUpdated: "2024-01-15",
    status: "in-progress",
  },
  {
    _id: "bld_002",
    name: "Garden View Complex",
    address: "Westlands, Nairobi",
    totalUnits: 75,
    visitedUnits: 75,
    providers: ["Safaricom", "Mediatek"],
    active: true,
    completionRate: 100,
    lastUpdated: "2024-01-14",
    status: "completed",
  },
  {
    _id: "bld_003",
    name: "Riverside Towers",
    address: "Karen, Nairobi",
    totalUnits: 120,
    visitedUnits: 30,
    providers: ["Zuku", "Safaricom", "Mediatek"],
    active: true,
    completionRate: 25,
    lastUpdated: "2024-01-13",
    status: "in-progress",
  },
  {
    _id: "bld_004",
    name: "City Center Plaza",
    address: "CBD, Nairobi",
    totalUnits: 30,
    visitedUnits: 0,
    providers: ["Safaricom"],
    active: true,
    completionRate: 0,
    lastUpdated: "2024-01-10",
    status: "not-started",
  },
]

const providerColors: Record<string, string> = {
  Mediatek: "bg-blue-100 text-blue-800 border-blue-200",
  Safaricom: "bg-green-100 text-green-800 border-green-200",
  Zuku: "bg-purple-100 text-purple-800 border-purple-200",
}

const statusConfig = {
  completed: {
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "Completed",
  },
  "in-progress": {
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "In Progress",
  },
  "not-started": {
    icon: AlertCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    label: "Not Started",
  },
}

export default function UnitsPage() {
  const [buildings] = useState<Building[]>(mockBuildings)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredBuildings = buildings.filter((building) => {
    const matchesSearch =
      building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      building.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || building.status === statusFilter

    return matchesSearch && matchesStatus && building.active
  })

  // Calculate overall statistics
  const totalBuildings = buildings.length
  const totalUnits = buildings.reduce((sum, building) => sum + building.totalUnits, 0)
  const totalVisited = buildings.reduce((sum, building) => sum + building.visitedUnits, 0)
  const overallProgress = totalUnits > 0 ? Math.round((totalVisited / totalUnits) * 100) : 0

  const completedBuildings = buildings.filter((b) => b.status === "completed").length
  const inProgressBuildings = buildings.filter((b) => b.status === "in-progress").length
  const notStartedBuildings = buildings.filter((b) => b.status === "not-started").length

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Units Management</h1>
            <p className="text-muted-foreground">Track and manage individual units across all buildings</p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Buildings</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBuildings}</div>
              <p className="text-xs text-muted-foreground">Active buildings in system</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Units</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
              <p className="text-xs text-muted-foreground">
                {totalVisited} visited ({overallProgress}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{completedBuildings}</div>
              <p className="text-xs text-muted-foreground">Buildings fully surveyed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search buildings..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All ({totalBuildings})
            </Button>
            <Button
              variant={statusFilter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("completed")}
              className="text-green-700 border-green-200 hover:bg-green-50"
            >
              Completed ({completedBuildings})
            </Button>
            <Button
              variant={statusFilter === "in-progress" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("in-progress")}
              className="text-blue-700 border-blue-200 hover:bg-blue-50"
            >
              In Progress ({inProgressBuildings})
            </Button>
            <Button
              variant={statusFilter === "not-started" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("not-started")}
              className="text-gray-700 border-gray-200 hover:bg-gray-50"
            >
              Not Started ({notStartedBuildings})
            </Button>
          </div>
        </div>

        {/* Buildings Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBuildings.map((building) => {
            const StatusIcon = statusConfig[building.status].icon
            return (
              <Card
                key={building._id}
                className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg leading-tight">{building.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {building.address}
                      </CardDescription>
                    </div>
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[building.status].bgColor} ${statusConfig[building.status].borderColor} border`}
                    >
                      <StatusIcon className={`h-3 w-3 ${statusConfig[building.status].color}`} />
                      {statusConfig[building.status].label}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground">
                        {building.visitedUnits}/{building.totalUnits} units
                      </span>
                    </div>
                    <Progress value={building.completionRate} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{building.completionRate}% complete</span>
                      <span>Updated {new Date(building.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Units Info */}
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{building.totalUnits} total units</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{building.visitedUnits} visited</div>
                      <div className="text-xs text-muted-foreground">
                        {building.totalUnits - building.visitedUnits} remaining
                      </div>
                    </div>
                  </div>

                  {/* Providers */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Service Providers</span>
                    <div className="flex flex-wrap gap-1">
                      {building.providers.map((provider) => (
                        <Badge
                          key={provider}
                          variant="outline"
                          className={`${providerColors[provider] || "bg-gray-100 text-gray-800 border-gray-200"} text-xs`}
                        >
                          {provider}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/units/${building._id}`} className="block">
                    <Button className="w-full" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Manage Units
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredBuildings.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-64 text-center">
              <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No buildings found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filter criteria."
                  : "No buildings available for unit management."}
              </p>
              {(searchTerm || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setStatusFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
