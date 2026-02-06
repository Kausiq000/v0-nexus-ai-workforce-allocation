"use client"

import { useState } from "react"
import { CommandSidebar } from "@/components/command-sidebar"
import { NexusMapCard } from "@/components/nexus-map-card"
import { AiInsightCard } from "@/components/ai-insight-card"
import { WorkforceGridCard } from "@/components/workforce-grid-card"
import { SystemMetricsCard } from "@/components/system-metrics-card"
import { Badge } from "@/components/ui/badge"
import { Bell, ChevronRight, Terminal } from "lucide-react"

type View = "nexus-map" | "ai-brain" | "workforce" | "settings"

export function CommandCenter() {
  const [activeView, setActiveView] = useState<View>("nexus-map")

  return (
    <div className="animate-fade-in flex h-screen w-screen overflow-hidden" style={{ background: "hsl(222 59% 3%)" }}>
      {/* Floating Sidebar */}
      <CommandSidebar activeView={activeView} onNavigate={setActiveView} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border/50 px-8 py-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground tracking-tight">
                Welcome back, <span className="text-primary neon-cyan">Commander</span>.
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-3 w-3" />
              <span className="font-mono">ALLOC8 v4.2.0</span>
              <ChevronRight className="h-3 w-3" />
              <span className="font-mono">
                {activeView === "nexus-map" && "Nexus Map"}
                {activeView === "ai-brain" && "AI Brain"}
                {activeView === "workforce" && "Workforce Grid"}
                {activeView === "settings" && "Settings"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-[10px]"
            >
              <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              ALL SYSTEMS NOMINAL
            </Badge>
            <div className="relative">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-secondary" />
            </div>
          </div>
        </header>

        {/* Bento Grid Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="grid h-full auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
            {/* Card 1 - The Map (Large) */}
            <div className="animate-slide-up lg:col-span-2 lg:row-span-2" style={{ animationDelay: "0.1s" }}>
              <NexusMapCard />
            </div>

            {/* Card 2 - AI Insight */}
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <AiInsightCard />
            </div>

            {/* Card 3 - Workforce / Metrics */}
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              {activeView === "workforce" ? <WorkforceGridCard /> : <SystemMetricsCard />}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-border/50 px-8 py-3">
          <span className="font-mono text-[10px] text-muted-foreground">
            ALLOC8:AUTOMATE // Smart Factory Orchestration Engine
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Node: US-EAST-1 // Latency: 12ms
          </span>
        </footer>
      </div>
    </div>
  )
}
