"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Cpu, CircleDot } from "lucide-react"

const machines = [
  { id: "M-01", name: "CNC Lathe Alpha", zone: "Zone A", status: "running", efficiency: 97, x: 8, y: 12 },
  { id: "M-02", name: "Assembly Robot B1", zone: "Zone A", status: "running", efficiency: 94, x: 28, y: 12 },
  { id: "M-03", name: "Welding Station C", zone: "Zone B", status: "warning", efficiency: 72, x: 48, y: 12 },
  { id: "M-04", name: "Press Brake Delta", zone: "Zone B", status: "running", efficiency: 99, x: 68, y: 12 },
  { id: "M-05", name: "Injection Mold E2", zone: "Zone C", status: "running", efficiency: 91, x: 8, y: 42 },
  { id: "M-06", name: "3D Printer F1", zone: "Zone C", status: "down", efficiency: 0, x: 28, y: 42 },
  { id: "M-07", name: "Conveyor G Line", zone: "Zone D", status: "running", efficiency: 88, x: 48, y: 42 },
  { id: "M-08", name: "QA Scanner H4", zone: "Zone D", status: "running", efficiency: 95, x: 68, y: 42 },
  { id: "M-09", name: "Packaging Unit J", zone: "Zone E", status: "warning", efficiency: 68, x: 8, y: 72 },
  { id: "M-10", name: "Palletizer K2", zone: "Zone E", status: "running", efficiency: 92, x: 28, y: 72 },
  { id: "M-11", name: "AGV Docking Bay", zone: "Zone F", status: "running", efficiency: 100, x: 48, y: 72 },
  { id: "M-12", name: "Loading Dock L1", zone: "Zone F", status: "running", efficiency: 96, x: 68, y: 72 },
]

function getStatusColor(status: string) {
  switch (status) {
    case "running":
      return { bg: "#10b98120", border: "#10b98140", dot: "#10b981", text: "Running" }
    case "warning":
      return { bg: "#f59e0b20", border: "#f59e0b40", dot: "#f59e0b", text: "Warning" }
    case "down":
      return { bg: "#ef444420", border: "#ef444440", dot: "#ef4444", text: "Down" }
    default:
      return { bg: "#6b728020", border: "#6b728040", dot: "#6b7280", text: "Unknown" }
  }
}

export function FactoryFloor() {
  const [hoveredMachine, setHoveredMachine] = useState<string | null>(null)

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Live Factory Floor Digital Twin
          </h3>
          <p className="text-xs text-muted-foreground">
            Real-time machine status and zone monitoring
          </p>
        </div>
        <div className="flex items-center gap-3">
          {["running", "warning", "down"].map((status) => {
            const colors = getStatusColor(status)
            return (
              <div key={status} className="flex items-center gap-1.5">
                <CircleDot
                  className="h-3 w-3"
                  style={{ color: colors.dot }}
                />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {colors.text}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative rounded-lg border border-border bg-background/50 p-4" style={{ minHeight: 320 }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(222 20% 16% / 0.4)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Machines */}
        <div className="relative grid grid-cols-4 gap-4" style={{ minHeight: 280 }}>
          {machines.map((machine) => {
            const colors = getStatusColor(machine.status)
            const isHovered = hoveredMachine === machine.id
            return (
              <div
                key={machine.id}
                className="relative cursor-pointer rounded-lg p-3 transition-all duration-200"
                style={{
                  backgroundColor: isHovered ? `${colors.dot}15` : colors.bg,
                  border: `1px solid ${isHovered ? colors.dot : colors.border}`,
                  boxShadow: isHovered
                    ? `0 0 20px ${colors.dot}20`
                    : "none",
                }}
                onMouseEnter={() => setHoveredMachine(machine.id)}
                onMouseLeave={() => setHoveredMachine(null)}
              >
                <div className="flex items-center gap-2">
                  <Cpu className="h-3.5 w-3.5" style={{ color: colors.dot }} />
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {machine.id}
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-foreground truncate">
                  {machine.name}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">
                    {machine.zone}
                  </span>
                  {machine.status !== "down" && (
                    <span
                      className="text-[10px] font-mono font-semibold"
                      style={{ color: colors.dot }}
                    >
                      {machine.efficiency}%
                    </span>
                  )}
                  {machine.status === "down" && (
                    <Badge
                      variant="destructive"
                      className="h-4 px-1.5 text-[9px] bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/20"
                    >
                      OFFLINE
                    </Badge>
                  )}
                </div>
                {machine.status === "running" && (
                  <div
                    className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: colors.dot, boxShadow: `0 0 6px ${colors.dot}` }}
                  />
                )}
                {machine.status === "warning" && (
                  <div
                    className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: colors.dot, boxShadow: `0 0 6px ${colors.dot}` }}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
