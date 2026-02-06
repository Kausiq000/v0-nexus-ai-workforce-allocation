"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { LoginPortal } from "@/components/login-portal"
import { DashboardView } from "@/components/dashboard-view"
import { WorkforceView } from "@/components/workforce-view"
import { AIPredictionsView } from "@/components/ai-predictions-view"
import { FloorMapView } from "@/components/floor-map-view"
import { SettingsView } from "@/components/settings-view"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function AppHeader({ activeView }: { activeView: string }) {
  const viewTitles: Record<string, string> = {
    dashboard: "Dashboard",
    "floor-map": "Live Floor Map",
    workforce: "Workforce Grid",
    "ai-predictions": "AI Predictions",
    settings: "Settings",
  }

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="h-5 bg-border" />
        <span className="text-sm text-muted-foreground">
          {viewTitles[activeView] || "Dashboard"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Search className="h-4 w-4" />
        </button>
        <div className="relative">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Bell className="h-4 w-4" />
          </button>
          <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-background" />
        </div>
        <Separator orientation="vertical" className="h-5 bg-border" />
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-semibold">
              AK
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-xs font-medium text-foreground">Admin User</p>
            <p className="text-[10px] text-muted-foreground">Plant Manager</p>
          </div>
        </div>
      </div>
    </header>
  )
}

function MainContent({ activeView }: { activeView: string }) {
  switch (activeView) {
    case "dashboard":
      return <DashboardView />
    case "floor-map":
      return <FloorMapView />
    case "workforce":
      return <WorkforceView />
    case "ai-predictions":
      return <AIPredictionsView />
    case "settings":
      return <SettingsView />
    default:
      return <DashboardView />
  }
}

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeView, setActiveView] = useState("dashboard")

  if (!isLoggedIn) {
    return <LoginPortal onLogin={() => setIsLoggedIn(true)} />
  }

  return (
    <SidebarProvider>
      <AppSidebar activeView={activeView} onNavigate={setActiveView} />
      <SidebarInset>
        <AppHeader activeView={activeView} />
        <main className="flex-1 overflow-auto p-6">
          <MainContent activeView={activeView} />
        </main>
        <footer className="flex items-center justify-between border-t border-border px-6 py-3">
          <p className="text-[10px] text-muted-foreground">
            Nexus AI Workforce Allocation System v3.2.1
          </p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[10px] text-muted-foreground">
              All Systems Operational
            </span>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}
