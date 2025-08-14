"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  Edit3,
  Hash,
} from "lucide-react"
import { useToast } from " @/hooks/use-toast"

type Building = {
  _id: string
  name: string
  address: string
  totalUnits: number
  providers: string[]
  labelingFormat?: string // e.g., "A101", "1A", "Floor-Unit", etc.
}

type Unit = {
  _id?: string
  buildingId: string
  unitNumber: string
  visited: boolean
  provider: string
  comments: string
  contactName?: string
  contactPhone?: string
  lastVisited?: string
}

const mockBuilding: Building = {
  _id: "bld_001",
  name: "Sunrise Apartments",
  address: "Kilimani, Nairobi",
  totalUnits: 50,
  providers: ["Mediatek", "Zuku"],
  labelingFormat: "Floor-Unit (e.g., 1A, 2B, 3C)",
}

const providerOptions = ["Mediatek", "Safaricom", "Zuku", "Airtel", "Telkom", "Other", "Not Applicable"]

const providerColors: Record<string, string> = {
  Mediatek: "bg-blue-100 text-blue-800 border-blue-200",
  Safaricom: "bg-green-100 text-green-800 border-green-200",
  Zuku: "bg-purple-100 text-purple-800 border-purple-200",
  Airtel: "bg-red-100 text-red-800 border-red-200",
  Telkom: "bg-orange-100 text-orange-800 border-orange-200",
  Other: "bg-gray-100 text-gray-800 border-gray-200",
  "Not Applicable": "bg-red-100 text-red-800 border-red-200",
}

export default function ManageUnitsPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const buildingId = params.buildingId as string

  const [building, setBuilding] = useState<Building | null>(null)
  const [units, setUnits] = useState<Unit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("units")
  const [filterProvider, setFilterProvider] = useState("all")
  const [filterVisited, setFilterVisited] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const [editingUnit, setEditingUnit] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setBuilding(mockBuilding)

      // Generate initial units with varied labeling formats
      const labelingFormats = [
        "A101",
        "A102",
        "A103",
        "B101",
        "B102",
        "B103",
        "C101",
        "C102",
        "C103",
        "D101",
        "1A",
        "1B",
        "1C",
        "2A",
        "2B",
        "2C",
        "3A",
        "3B",
        "3C",
        "4A",
        "101",
        "102",
        "103",
        "201",
        "202",
        "203",
        "301",
        "302",
        "303",
        "401",
        "G1",
        "G2",
        "G3",
        "F1-1",
        "F1-2",
        "F1-3",
        "F2-1",
        "F2-2",
        "F2-3",
        "F3-1",
        "Unit-1",
        "Unit-2",
        "Unit-3",
        "Apt-4",
        "Apt-5",
        "Apt-6",
        "Room-7",
        "Room-8",
        "Room-9",
        "Studio-10",
      ]

      const initialUnits: Unit[] = Array.from({ length: mockBuilding.totalUnits }, (_, index) => ({
        buildingId: buildingId,
        unitNumber: labelingFormats[index] || `${String(index + 1).padStart(3, "0")}`,
        visited: Math.random() > 0.6,
        provider: Math.random() > 0.5 ? providerOptions[Math.floor(Math.random() * 3)] : "",
        comments: Math.random() > 0.8 ? "Sample comment for this unit" : "",
        contactName: Math.random() > 0.7 ? `Contact ${index + 1}` : "",
        contactPhone: Math.random() > 0.7 ? `+25471234${String(index).padStart(4, "0")}` : "",
        lastVisited:
          Math.random() > 0.6
            ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
            : undefined,
      }))

      setUnits(initialUnits)
      setIsLoading(false)
    }

    fetchData()
  }, [buildingId])

  const handleUnitChange = (index: number, field: keyof Unit, value: any) => {
    setUnits((prev) => prev.map((unit, i) => (i === index ? { ...unit, [field]: value } : unit)))
  }

  const handleUnitNumberChange = (index: number, newUnitNumber: string) => {
    // Check for duplicate unit numbers
    const isDuplicate = units.some((unit, i) => i !== index && unit.unitNumber === newUnitNumber)

    if (isDuplicate && newUnitNumber.trim() !== "") {
      toast({
        title: "Duplicate Unit Number",
        description: "This unit number already exists. Please choose a different one.",
        variant: "destructive",
      })
      return
    }

    handleUnitChange(index, "unitNumber", newUnitNumber)
  }

  const handleBulkUpdate = (field: keyof Unit, value: any) => {
    const filteredIndices = getFilteredUnits().map((unit) => units.indexOf(unit))
    setUnits((prev) => prev.map((unit, i) => (filteredIndices.includes(i) ? { ...unit, [field]: value } : unit)))
  }

  const generateUnitNumbers = (format: string) => {
    const newUnits = [...units]

    switch (format) {
      case "numeric":
        newUnits.forEach((unit, index) => {
          unit.unitNumber = String(index + 1).padStart(3, "0")
        })
        break
      case "floor-unit":
        newUnits.forEach((unit, index) => {
          const floor = Math.floor(index / 10) + 1
          const unitOnFloor = (index % 10) + 1
          unit.unitNumber = `${floor}${String.fromCharCode(64 + unitOnFloor)}`
        })
        break
      case "apartment":
        newUnits.forEach((unit, index) => {
          const floor = Math.floor(index / 4) + 1
          const unitOnFloor = (index % 4) + 1
          unit.unitNumber = `${floor}${String.fromCharCode(64 + unitOnFloor).padStart(2, "0")}`
        })
        break
      case "room":
        newUnits.forEach((unit, index) => {
          unit.unitNumber = `Room-${index + 1}`
        })
        break
    }

    setUnits(newUnits)
    toast({
      title: "Unit Numbers Updated",
      description: `Applied ${format} numbering format to all units.`,
    })
  }

  const handleSave = async () => {
    // Check for empty unit numbers
    const emptyUnits = units.filter((unit) => !unit.unitNumber.trim())
    if (emptyUnits.length > 0) {
      toast({
        title: "Validation Error",
        description: "All units must have a unit number.",
        variant: "destructive",
      })
      return
    }

    // Check for duplicate unit numbers
    const unitNumbers = units.map((unit) => unit.unitNumber.trim())
    const duplicates = unitNumbers.filter((num, index) => unitNumbers.indexOf(num) !== index)
    if (duplicates.length > 0) {
      toast({
        title: "Validation Error",
        description: `Duplicate unit numbers found: ${duplicates.join(", ")}`,
        variant: "destructive",
      })
      return
    }

    const invalidUnits = units.filter((unit) => !unit.provider)
    if (invalidUnits.length > 0) {
      toast({
        title: "Validation Error",
        description: "All units must have a provider status selected.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Units Updated",
        description: `Successfully updated ${units.length} units for ${building?.name}.`,
      })
      setEditingUnit(null)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update units. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getFilteredUnits = () => {
    return units.filter((unit) => {
      const matchesSearch =
        unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (unit.contactName && unit.contactName.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesProvider = filterProvider === "all" || unit.provider === filterProvider
      const matchesVisited =
        filterVisited === "all" ||
        (filterVisited === "visited" && unit.visited) ||
        (filterVisited === "not-visited" && !unit.visited)

      return matchesSearch && matchesProvider && matchesVisited
    })
  }

  const getVisitedCount = () => units.filter((unit) => unit.visited).length
  const getProviderStats = () => {
    const stats: Record<string, number> = {}
    units.forEach((unit) => {
      if (unit.provider) {
        stats[unit.provider] = (stats[unit.provider] || 0) + 1
      }
    })
    return stats
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading building units...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-1 p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Building not found.</p>
            <Button onClick={() => router.push("/units")} className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Buildings
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const visitedCount = getVisitedCount()
  const providerStats = getProviderStats()
  const completionRate = Math.round((visitedCount / building.totalUnits) * 100)
  const filteredUnits = getFilteredUnits()

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => router.push("/units")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Buildings
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">Manage Units</h1>
            <p className="text-muted-foreground">Track individual unit status and provider information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save All"}
            </Button>
          </div>
        </div>

        {/* Building Info Card */}
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{building.name}</CardTitle>
                <CardDescription className="flex items-center gap-1 mt-1">
                  <MapPin className="h-4 w-4" />
                  {building.address}
                </CardDescription>
                {building.labelingFormat && (
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <Hash className="h-3 w-3" />
                    Labeling Format: {building.labelingFormat}
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{completionRate}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Total Units</span>
                </div>
                <div className="text-2xl font-bold">{building.totalUnits}</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Visited</span>
                </div>
                <div className="text-2xl font-bold text-green-600">{visitedCount}</div>
                <Progress value={completionRate} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="font-medium">Remaining</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{building.totalUnits - visitedCount}</div>
              </div>

              <div className="space-y-2">
                <span className="font-medium">Providers</span>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(providerStats).map(([provider, count]) => (
                    <Badge
                      key={provider}
                      variant="outline"
                      className={`${providerColors[provider] || "bg-gray-100 text-gray-800"} text-xs`}
                    >
                      {provider}: {count}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="units">Units Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="units" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Filters & Search</CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                    {showDetails ? "Hide Details" : "Show Details"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <Label htmlFor="search">Search Units</Label>
                    <Input
                      id="search"
                      placeholder="Unit number, contact, comments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="provider-filter">Provider</Label>
                    <Select value={filterProvider} onValueChange={setFilterProvider}>
                      <SelectTrigger>
                        <SelectValue placeholder="All providers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Providers</SelectItem>
                        {providerOptions.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="visited-filter">Visit Status</Label>
                    <Select value={filterVisited} onValueChange={setFilterVisited}>
                      <SelectTrigger>
                        <SelectValue placeholder="All units" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Units</SelectItem>
                        <SelectItem value="visited">Visited Only</SelectItem>
                        <SelectItem value="not-visited">Not Visited</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setFilterProvider("all")
                        setFilterVisited("all")
                      }}
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                  </div>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredUnits.length} of {units.length} units
                </div>
              </CardContent>
            </Card>

            {/* Unit Numbering Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Unit Numbering Tools
                </CardTitle>
                <CardDescription>
                  Quickly apply numbering formats to all units or edit individual unit numbers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-5">
                  <Button variant="outline" size="sm" onClick={() => generateUnitNumbers("numeric")}>
                    001, 002, 003...
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generateUnitNumbers("floor-unit")}>
                    1A, 1B, 2A...
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generateUnitNumbers("apartment")}>
                    101, 102, 201...
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generateUnitNumbers("room")}>
                    Room-1, Room-2...
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingUnit(editingUnit === null ? 0 : null)}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    {editingUnit !== null ? "Stop Editing" : "Edit Mode"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Units Table */}
            <Card>
              <CardHeader>
                <CardTitle>Unit Details</CardTitle>
                <CardDescription>
                  {editingUnit !== null && (
                    <span className="text-orange-600 font-medium">
                      ✏️ Edit Mode: Click on unit numbers to rename them
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Header Row */}
                  <div
                    className={`grid gap-4 p-3 bg-muted rounded-lg font-medium text-sm ${showDetails ? "grid-cols-8" : "grid-cols-4"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      Unit Number
                    </div>
                    <div>Visited</div>
                    <div>Provider</div>
                    <div>Comments</div>
                    {showDetails && (
                      <>
                        <div>Contact Name</div>
                        <div>Contact Phone</div>
                        <div>Last Visited</div>
                        <div>Actions</div>
                      </>
                    )}
                  </div>

                  {/* Unit Rows */}
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {filteredUnits.map((unit, index) => {
                      const originalIndex = units.indexOf(unit)
                      const isEditing = editingUnit === originalIndex

                      return (
                        <div
                          key={originalIndex}
                          className={`grid gap-4 p-3 border rounded-lg items-center hover:bg-muted/50 transition-colors ${
                            showDetails ? "grid-cols-8" : "grid-cols-4"
                          } ${isEditing ? "ring-2 ring-orange-200 bg-orange-50" : ""}`}
                        >
                          <div className="relative">
                            {editingUnit !== null ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  value={unit.unitNumber}
                                  onChange={(e) => handleUnitNumberChange(originalIndex, e.target.value)}
                                  className="h-8 font-mono font-medium"
                                  placeholder="Enter unit number"
                                  onFocus={() => setEditingUnit(originalIndex)}
                                  onBlur={() => {
                                    if (!unit.unitNumber.trim()) {
                                      toast({
                                        title: "Invalid Unit Number",
                                        description: "Unit number cannot be empty.",
                                        variant: "destructive",
                                      })
                                    }
                                  }}
                                />
                                {isEditing && <Edit3 className="h-4 w-4 text-orange-600" />}
                              </div>
                            ) : (
                              <div
                                className="font-mono font-medium cursor-pointer hover:text-primary transition-colors p-1 rounded"
                                onClick={() => setEditingUnit(originalIndex)}
                                title="Click to edit unit number"
                              >
                                {unit.unitNumber}
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                checked={unit.visited}
                                onCheckedChange={(checked) => handleUnitChange(originalIndex, "visited", checked)}
                              />
                              <Label className="text-sm">
                                {unit.visited ? (
                                  <span className="text-green-600 font-medium">Visited</span>
                                ) : (
                                  <span className="text-gray-500">Not Visited</span>
                                )}
                              </Label>
                            </div>
                          </div>

                          <div>
                            <Select
                              value={unit.provider}
                              onValueChange={(value) => handleUnitChange(originalIndex, "provider", value)}
                            >
                              <SelectTrigger className="h-8">
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                              <SelectContent>
                                {providerOptions.map((provider) => (
                                  <SelectItem key={provider} value={provider}>
                                    {provider}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Textarea
                              value={unit.comments}
                              onChange={(e) => handleUnitChange(originalIndex, "comments", e.target.value)}
                              placeholder="Add comments..."
                              className="min-h-8 resize-none text-sm"
                              rows={1}
                            />
                          </div>

                          {showDetails && (
                            <>
                              <div>
                                <Input
                                  value={unit.contactName || ""}
                                  onChange={(e) => handleUnitChange(originalIndex, "contactName", e.target.value)}
                                  placeholder="Contact name"
                                  className="h-8 text-sm"
                                />
                              </div>

                              <div>
                                <Input
                                  value={unit.contactPhone || ""}
                                  onChange={(e) => handleUnitChange(originalIndex, "contactPhone", e.target.value)}
                                  placeholder="+254..."
                                  className="h-8 text-sm"
                                />
                              </div>

                              <div>
                                <Input
                                  type="date"
                                  value={unit.lastVisited || ""}
                                  onChange={(e) => handleUnitChange(originalIndex, "lastVisited", e.target.value)}
                                  className="h-8 text-sm"
                                />
                              </div>

                              <div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    handleUnitChange(originalIndex, "visited", true)
                                    handleUnitChange(
                                      originalIndex,
                                      "lastVisited",
                                      new Date().toISOString().split("T")[0],
                                    )
                                  }}
                                  disabled={unit.visited}
                                >
                                  Mark Visited
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Provider Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(providerStats).map(([provider, count]) => {
                      const percentage = Math.round((count / units.length) * 100)
                      return (
                        <div key={provider} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{provider}</span>
                            <span>
                              {count} units ({percentage}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Visit Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">{completionRate}%</div>
                      <div className="text-muted-foreground">Completion Rate</div>
                    </div>
                    <Progress value={completionRate} className="h-4" />
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{visitedCount}</div>
                        <div className="text-sm text-muted-foreground">Visited</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">{building.totalUnits - visitedCount}</div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Actions</CardTitle>
                <CardDescription>
                  Apply changes to multiple units at once. Actions will be applied to filtered units (
                  {filteredUnits.length} units).
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Mark as Visited</Label>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => handleBulkUpdate("visited", true)}
                    >
                      Mark All Visited
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label>Set Provider</Label>
                    <Select onValueChange={(value) => handleBulkUpdate("provider", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {providerOptions.map((provider) => (
                          <SelectItem key={provider} value={provider}>
                            {provider}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Clear Data</Label>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        handleBulkUpdate("visited", false)
                        handleBulkUpdate("provider", "")
                        handleBulkUpdate("comments", "")
                      }}
                    >
                      Clear All Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
