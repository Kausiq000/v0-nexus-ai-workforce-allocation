"use client"

import {
  LayoutDashboard,
  Map,
  Users,
  BrainCircuit,
  Settings,
  ChevronLeft,
  Activity,
  Zap,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { title: "Live Floor Map", icon: Map, id: "floor-map" },
  { title: "Workforce Grid", icon: Users, id: "workforce" },
  { title: "AI Predictions", icon: BrainCircuit, id: "ai-predictions" },
  { title: "Settings", icon: Settings, id: "settings" },
]

export function AppSidebar({
  activeView,
  onNavigate,
}: {
  activeView: string
  onNavigate: (view: string) => void
}) {
  const { toggleSidebar, state } = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              NEXUS
            </span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              AI Workforce
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeView === item.id}
                    onClick={() => onNavigate(item.id)}
                    tooltip={item.title}
                    className={
                      activeView === item.id
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <div className="glass-card rounded-lg p-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-accent animate-pulse" />
            <span className="text-[10px] uppercase tracking-wider text-accent">
              System Online
            </span>
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground">
            Last sync: 2s ago
          </p>
        </div>
        <button
          onClick={toggleSidebar}
          className="hidden md:flex items-center justify-center h-8 w-full rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-200 ${state === "collapsed" ? "rotate-180" : ""}`}
          />
          <span className="ml-2 text-xs group-data-[collapsible=icon]:hidden">
            Collapse
          </span>
        </button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
