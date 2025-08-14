"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Topbar } from "@/components/topbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  User,
  Calendar,
  Edit,
  Trash2,
  ExternalLink,
  MessageCircle,
  Users,
  Plus,
  Eye,
} from "lucide-react"

const mockBuildings = [
  {
    id: "1",
    name: "Sunrise Apartments",
    address: "Kilimani, Nairobi",
    gps: { lat: -1.2921, lng: 36.8219 },
    owner: "John Doe",
    staffName: "Peter Mwangi",
    staffPhone: "+254712345678",
    notes: "Modern apartment complex with rooftop antenna. Security gate access required.",
    totalUnits: 24,
    providers: ["Mediatek", "Safaricom"],
    images: ["/modern-apartment-building.png", "/modern-apartment-complex.png"],
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Green Valley Towers",
    address: "Westlands, Nairobi",
    gps: { lat: -1.2634, lng: 36.8078 },
    owner: "Sarah Johnson",
    staffName: "Mary Wanjiku",
    staffPhone: "+254723456789",
    notes: "High-rise building with excellent connectivity infrastructure.",
    totalUnits: 48,
    providers: ["Zuku", "Airtel"],
    images: ["/luxury-towers.png"],
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "City Plaza Residences",
    address: "CBD, Nairobi",
    gps: { lat: -1.2864, lng: 36.8172 },
    owner: "Michael Brown",
    staffName: "James Kiprotich",
    staffPhone: "+254734567890",
    notes: "Central location with mixed commercial and residential units.",
    totalUnits: 36,
    providers: ["Mediatek", "Zuku", "Telkom"],
    images: ["/city-plaza-building.png"],
    createdAt: "2024-03-10",
  },
]

export default function BuildingDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const buildingId = params.id as string

  const [building, setBuilding] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading building data
    const loadBuilding = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const foundBuilding = mockBuildings.find((b) => b.id === buildingId)
      setBuilding(foundBuilding)
      setIsLoading(false)
    }

    loadBuilding()
  }, [buildingId])

  const handleDelete = async () => {
    // Simulate delete API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Deleting building:", buildingId)
    router.push("/buildings")
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace("+", "")
    window.open(`https://wa.me/${cleanPhone}`, "_blank")
  }

  const handleOpenMap = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading building details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!building) {
    return (
      <div className="flex flex-col min-h-screen">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Building Not Found</h2>
            <p className="text-muted-foreground mb-4">The building you're looking for doesn't exist.</p>
            <Link href="/buildings">
              <Button>Back to Buildings</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/buildings">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{building.name}</h1>
              <p className="text-muted-foreground">{building.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/buildings/edit/${building.id}`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-2" />
                Edit Building
              </Button>
            </Link>
            <Button variant="outline" size="sm" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Building Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Primary Image */}
                {building.images && building.images.length > 0 && (
                  <div className="space-y-4">
                    <img
                      src={building.images[0] || "/placeholder.svg"}
                      alt={building.name}
                      className="w-full h-64 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedImage(building.images[0])}
                    />

                    {/* Additional Images */}
                    {building.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {building.images.slice(1).map((image: string, index: number) => (
                          <img
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`${building.name} ${index + 2}`}
                            className="w-full h-16 object-cover rounded cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedImage(image)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Building Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{building.totalUnits}</div>
                    <div className="text-sm text-muted-foreground">Total Units</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">{building.providers.length}</div>
                    <div className="text-sm text-muted-foreground">Providers</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      <MapPin className="h-6 w-6 mx-auto" />
                    </div>
                    <div className="text-sm text-muted-foreground">GPS Located</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      <Calendar className="h-6 w-6 mx-auto" />
                    </div>
                    <div className="text-sm text-muted-foreground">{new Date(building.createdAt).getFullYear()}</div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <h3 className="font-semibold flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </h3>
                  <p className="text-muted-foreground">{building.address}</p>
                  <Button variant="outline" size="sm" onClick={() => handleOpenMap(building.gps.lat, building.gps.lng)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in Maps
                  </Button>
                </div>

                {/* Owner Information */}
                {building.owner && (
                  <div className="space-y-2">
                    <h3 className="font-semibold flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Owner / Landlord
                    </h3>
                    <p className="text-muted-foreground">{building.owner}</p>
                  </div>
                )}

                {/* Service Providers */}
                <div className="space-y-2">
                  <h3 className="font-semibold">Available Providers</h3>
                  <div className="flex flex-wrap gap-2">
                    {building.providers.map((provider: string) => (
                      <Badge key={provider} variant="secondary">
                        {provider}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes Section */}
            {building.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>Notes & Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{building.notes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Caretaker/Agent Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Caretaker/Agent
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">{building.staffName}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {building.staffPhone}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleCall(building.staffPhone)} className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleWhatsApp(building.staffPhone)}
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href={`/units?building=${building.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    View Units
                  </Button>
                </Link>
                <Link href={`/leads/new?building=${building.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lead
                  </Button>
                </Link>
                <Link href={`/units/new?building=${building.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Add Unit
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Building</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{building.name}"? This action cannot be undone and will remove all
              associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Building
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl">
            <img src={selectedImage || "/placeholder.svg"} alt="Building" className="w-full h-auto rounded-lg" />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
