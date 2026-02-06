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
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border/50 px-6 sm:px-8 py-4 bg-white/50 backdrop-blur-md">
          <div className="flex flex-col gap-1">
            <h1 className="text-lg sm:text-xl font-heading font-semibold text-foreground">
              Admin Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              {activeView === "dashboard" && "System Overview"}
              {activeView === "live-map" && "Real-time Floor Map"}
              {activeView === "reports" && "Efficiency Reports"}
              {activeView === "employees" && "Employee Directory"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="border-accent/30 bg-accent/10 text-accent font-mono text-[10px]"
            >
              <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              ONLINE
            </Badge>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10 active:scale-95"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 sm:p-8">
          {activeView === "dashboard" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-max"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <SystemMetricsCard />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <AiInsightCard />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-3"
              >
                <WorkforceGridCard />
              </motion.div>
            </motion.div>
          )}

          {activeView === "live-map" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <NexusMapCard />
            </motion.div>
          )}

          {activeView === "reports" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <AiInsightCard />
              <SystemMetricsCard />
            </motion.div>
          )}

          {activeView === "employees" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <WorkforceGridCard />
            </motion.div>
          )}
        </main>
      </div>
    </motion.div>
  )
}
