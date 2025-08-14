"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Topbar } from "@/components/topbar"
import {
  Zap,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Database,
  Settings,
  ExternalLink,
  CheckCircle,
  Clock,
} from "lucide-react"

const integrations = [
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Send automated messages and notifications to leads via WhatsApp",
    icon: MessageSquare,
    status: "available",
    category: "Communication",
    features: ["Automated messaging", "Lead notifications", "Two-way communication"],
  },
  {
    id: "email",
    name: "Email Marketing",
    description: "Automated email campaigns and lead nurturing sequences",
    icon: Mail,
    status: "connected",
    category: "Marketing",
    features: ["Email campaigns", "Lead scoring", "Analytics"],
  },
  {
    id: "calendar",
    name: "Calendar Sync",
    description: "Sync appointments and property viewings with your calendar",
    icon: Calendar,
    status: "available",
    category: "Productivity",
    features: ["Two-way sync", "Automatic reminders", "Conflict detection"],
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5000+ apps through automated workflows",
    icon: Zap,
    status: "available",
    category: "Automation",
    features: ["5000+ app connections", "Custom workflows", "Real-time sync"],
  },
  {
    id: "reports",
    name: "Advanced Reports",
    description: "Generate detailed analytics and performance reports",
    icon: FileText,
    status: "coming-soon",
    category: "Analytics",
    features: ["Custom reports", "Data visualization", "Export options"],
  },
  {
    id: "database",
    name: "External Database",
    description: "Connect external databases and import/export data",
    icon: Database,
    status: "coming-soon",
    category: "Data",
    features: ["Data import/export", "Real-time sync", "Custom mapping"],
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "connected":
      return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Connected</Badge>
    case "available":
      return <Badge variant="outline">Available</Badge>
    case "coming-soon":
      return <Badge variant="secondary">Coming Soon</Badge>
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "available":
      return <Settings className="h-4 w-4 text-blue-600" />
    case "coming-soon":
      return <Clock className="h-4 w-4 text-gray-400" />
    default:
      return <Settings className="h-4 w-4 text-gray-400" />
  }
}

export default function IntegrationsPage() {
  const handleConnect = (integrationId: string) => {
    // Simulate connection process
    console.log(`Connecting to ${integrationId}`)
  }

  const categories = [...new Set(integrations.map((integration) => integration.category))]

  return (
    <div className="flex flex-col">
      <Topbar />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
            <p className="text-muted-foreground">
              Connect your CRM with external tools and services to enhance your workflow.
            </p>
          </div>
        </div>

        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h3 className="text-xl font-semibold">{category}</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {integrations
                .filter((integration) => integration.category === category)
                .map((integration) => {
                  const IconComponent = integration.icon
                  return (
                    <Card key={integration.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{integration.name}</CardTitle>
                              {getStatusBadge(integration.status)}
                            </div>
                          </div>
                          {getStatusIcon(integration.status)}
                        </div>
                        <CardDescription className="text-sm">{integration.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Features:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {integration.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-current rounded-full" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="pt-2">
                            {integration.status === "connected" ? (
                              <Button variant="outline" className="w-full bg-transparent" disabled>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Connected
                              </Button>
                            ) : integration.status === "available" ? (
                              <Button className="w-full" onClick={() => handleConnect(integration.id)}>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Connect
                              </Button>
                            ) : (
                              <Button variant="secondary" className="w-full" disabled>
                                <Clock className="h-4 w-4 mr-2" />
                                Coming Soon
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
