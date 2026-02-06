"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CommandSidebar } from "@/components/command-sidebar"
import { NexusMapCard } from "@/components/nexus-map-card"
import { AiInsightCard } from "@/components/ai-insight-card"
import { WorkforceGridCard } from "@/components/workforce-grid-card"
import { SystemMetricsCard } from "@/components/system-metrics-card"
import { Badge } from "@/components/ui/badge"
import { Bell, ChevronRight, Terminal, LogOut } from "lucide-react"

type View = "dashboard" | "live-map" | "reports" | "employees"

interface CommandCenterProps {
  onLogout: () => void
}

export function CommandCenter({ onLogout }: CommandCenterProps) {
  const [activeView, setActiveView] = useState<View>("dashboard")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: "#F4F7FA" }}
    >
      {/* Floating Sidebar */}
      <CommandSidebar activeView={activeView} onNavigate={setActiveView} onLogout={onLogout} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border/50 px-8 py-5 bg-white">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-heading font-semibold text-foreground tracking-tight">
                Welcome back, <span className="text-primary">Commander</span>.
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Terminal className="h-3 w-3" />
              <span className="font-mono">ALLOC8 v4.2.0</span>
              <ChevronRight className="h-3 w-3" />
              <span className="font-mono">
                {activeView === "dashboard" && "Dashboard"}
                {activeView === "live-map" && "Live Map"}
                {activeView === "reports" && "Efficiency Reports"}
                {activeView === "employees" && "Employee List"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant="outline"
              className="border-accent/30 bg-accent/10 text-accent font-mono text-[10px]"
            >
              <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              ALL SYSTEMS NOMINAL
            </Badge>
            <div className="relative">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:border-primary/30"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
              </button>
              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent" />
            </div>
            <button
              onClick={onLogout}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:text-foreground hover:border-secondary/30"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Bento Grid Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeView === "dashboard" && (
            <div className="grid h-full auto-rows-fr grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
              {/* Card 1 - System Metrics (Large) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2 lg:row-span-2"
              >
                <SystemMetricsCard />
              </motion.div>

              {/* Card 2 - AI Insight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AiInsightCard />
              </motion.div>

              {/* Card 3 - Workforce Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <WorkforceGridCard />
              </motion.div>
            </div>
          )}

          {activeView === "live-map" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <NexusMapCard />
            </motion.div>
          )}

          {activeView === "reports" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <AiInsightCard />
              <SystemMetricsCard />
            </motion.div>
          )}

          {activeView === "employees" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <WorkforceGridCard />
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="flex items-center justify-between border-t border-border/50 px-8 py-3 bg-white">
          <span className="font-mono text-[10px] text-muted-foreground">
            ALLOC8 // Smart Factory Orchestration
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Node: US-EAST-1 // Latency: 12ms
          </span>
        </footer>
      </div>
    </motion.div>
  )
}
