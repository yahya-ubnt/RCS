"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { Building2, Home, Users, UserPlus, Settings, ChevronRight, LayoutGrid, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Menu items data
const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Buildings",
    icon: Building2,
    items: [
      {
        title: "View All Buildings",
        url: "/buildings",
      },
      {
        title: "Add New Building",
        url: "/buildings/new",
      },
    ],
  },
  {
    title: "Units",
    url: "/units",
    icon: LayoutGrid,
  },
  {
    title: "Caretakers",
    icon: Users,
    items: [
      {
        title: "View All Caretakers",
        url: "/caretakers",
      },
      {
        title: "Add New Caretaker",
        url: "/caretakers/new",
      },
    ],
  },
  {
    title: "Leads",
    icon: UserPlus,
    items: [
      {
        title: "View All Leads",
        url: "/leads",
      },
      {
        title: "Add New Lead",
        url: "/leads/new",
      },
    ],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [openMenu, setOpenMenu] = React.useState<string | null>(null)

  // Determine which menu should be open based on current pathname
  React.useEffect(() => {
    if (pathname.startsWith("/buildings")) {
      setOpenMenu("Buildings")
    } else if (pathname.startsWith("/caretakers")) {
      setOpenMenu("Caretakers")
    } else if (pathname.startsWith("/leads")) {
      setOpenMenu("Leads")
    } else {
      setOpenMenu(null)
    }
  }, [pathname])

  const handleMenuToggle = (menuTitle: string) => {
    setOpenMenu(openMenu === menuTitle ? null : menuTitle)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg">
            <Building2 className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-bold text-lg bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Mediatek
            </span>
            <span className="truncate text-xs text-muted-foreground font-medium">Sales CRM</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive = item.url ? pathname === item.url : false
              const hasActiveChild = item.items?.some((subItem) => pathname === subItem.url)

              if (item.items) {
                return (
                  <Collapsible
                    key={item.title}
                    asChild
                    open={openMenu === item.title}
                    onOpenChange={() => handleMenuToggle(item.title)}
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        className={`
                          transition-all duration-200 hover:bg-accent/80 
                          ${hasActiveChild ? "bg-accent text-accent-foreground font-medium" : ""}
                        `}
                      >
                        <CollapsibleTrigger>
                          <item.icon className={hasActiveChild ? "text-primary" : ""} />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </CollapsibleTrigger>
                      </SidebarMenuButton>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            const isSubActive = pathname === subItem.url
                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={`
                                    transition-all duration-200 hover:bg-accent/60
                                    ${isSubActive ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" : ""}
                                  `}
                                >
                                  <a href={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </a>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              }

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={`
                      transition-all duration-200 hover:bg-accent/80
                      ${isActive ? "bg-primary text-primary-foreground font-medium shadow-sm" : ""}
                    `}
                  >
                    <a href={item.url}>
                      <item.icon className={isActive ? "text-primary-foreground" : ""} />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-2 space-y-2">
          {/* Theme Toggle */}
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-full justify-start gap-2 hover:bg-accent/80 transition-colors"
            >
              {theme === "dark" ? (
                <>
                  <Sun className="h-4 w-4" />
                  <span className="text-sm">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  <span className="text-sm">Dark Mode</span>
                </>
              )}
            </Button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-accent/30 border">
            <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-sm font-bold shadow-sm">
              A
            </div>
            <div className="grid flex-1 leading-tight">
              <div className="font-semibold text-sm">Admin User</div>
              <div className="text-xs text-muted-foreground">Administrator</div>
            </div>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
