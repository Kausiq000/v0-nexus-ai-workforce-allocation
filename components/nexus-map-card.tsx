"use client"

import { useState, useEffect } from "react"
import { MapPin, Wifi, Thermometer, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const zones = [
  { id: "A1", label: "Assembly Line A", status: "active", x: 8, y: 15, workers: 12 },
  { id: "A2", label: "Assembly Line B", status: "active", x: 38, y: 15, workers: 8 },
  { id: "B1", label: "Welding Bay", status: "warning", x: 68, y: 15, workers: 4 },
  { id: "C1", label: "Paint Shop", status: "active", x: 8, y: 50, workers: 6 },
  { id: "C2", label: "QA Station", status: "active", x: 38, y: 50, workers: 10 },
  { id: "D1", label: "Packaging", status: "idle", x: 68, y: 50, workers: 3 },
  { id: "E1", label: "Warehouse", status: "active", x: 23, y: 80, workers: 5 },
  { id: "E2", label: "Loading Dock", status: "active", x: 55, y: 80, workers: 7 },
]

const statusColor: Record<string, string> = {
  active: "bg-emerald-500",
  warning: "bg-amber-500",
  idle: "bg-muted-foreground",
}

const statusGlow: Record<string, string> = {
  active: "shadow-[0_0_8px_hsl(160_84%_39%/0.6)]",
  warning: "shadow-[0_0_8px_hsl(38_92%_50%/0.6)]",
  idle: "",
}

export function NexusMapCard() {
  const [selectedZone, setSelectedZone] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000)
    return () => clearInterval(interval)
  }, [])

  const selected = zones.find((z) => z.id === selectedZone)

  return (
    <div className="glass glass-hover relative flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Digital Twin - Factory Floor</h3>
            <p className="text-[11px] text-muted-foreground font-mono">Live topology // {zones.length} zones active</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="h-3.5 w-3.5 text-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-400">LIVE</span>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 p-4">
        {/* Grid lines */}
        <div
          className="absolute inset-4 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(190 95% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 95% 53%) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Zones */}
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
            className={`absolute flex flex-col items-center gap-1 transition-all duration-300 group ${
              selectedZone === zone.id ? "scale-110" : "hover:scale-105"
            }`}
            style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
            aria-label={`${zone.label} - ${zone.status}`}
          >
            <div
              className={`h-3 w-3 rounded-full ${statusColor[zone.status]} ${statusGlow[zone.status]} transition-all ${
                zone.status === "active" ? "animate-pulse" : ""
              }`}
            />
            <span className="font-mono text-[9px] text-muted-foreground group-hover:text-foreground transition-colors">
              {zone.id}
            </span>
          </button>
        ))}

        {/* Connection lines via SVG */}
        <svg className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] pointer-events-none opacity-20">
          <line x1="10%" y1="18%" x2="40%" y2="18%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="40%" y1="18%" x2="70%" y2="18%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="10%" y1="18%" x2="10%" y2="53%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="40%" y1="18%" x2="40%" y2="53%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="70%" y1="18%" x2="70%" y2="53%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="25%" y1="83%" x2="57%" y2="83%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="10%" y1="53%" x2="25%" y2="83%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
          <line x1="70%" y1="53%" x2="57%" y2="83%" stroke="hsl(190, 95%, 53%)" strokeWidth="0.5" strokeDasharray="4 4" />
        </svg>

        {/* Selected Zone Info */}
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-2.5 w-2.5 rounded-full ${statusColor[selected.status]} ${statusGlow[selected.status]}`} />
                <div>
                  <p className="text-sm font-medium text-foreground">{selected.label}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">Zone {selected.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3 w-3 text-primary" />
                  <span className="font-mono">{selected.workers} workers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Thermometer className="h-3 w-3 text-amber-400" />
                  <span className="font-mono">{22 + Math.floor(Math.random() * 4)}C</span>
                </div>
                <Badge
                  variant="outline"
                  className={`text-[9px] font-mono ${
                    selected.status === "active"
                      ? "border-emerald-500/30 text-emerald-400"
                      : selected.status === "warning"
                        ? "border-amber-500/30 text-amber-400"
                        : "border-border text-muted-foreground"
                  }`}
                >
                  {selected.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
