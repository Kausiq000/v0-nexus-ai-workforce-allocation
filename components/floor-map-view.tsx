"use client"

import { FactoryFloor } from "@/components/factory-floor"
import { Badge } from "@/components/ui/badge"
import { Wifi, ThermometerSun, Wind, Gauge } from "lucide-react"

const environmentStats = [
  { label: "Network Latency", value: "12ms", icon: Wifi, status: "good" },
  { label: "Ambient Temp", value: "21.4 C", icon: ThermometerSun, status: "good" },
  { label: "Air Quality", value: "AQI 32", icon: Wind, status: "good" },
  { label: "Humidity", value: "45%", icon: Gauge, status: "good" },
]

export function FloorMapView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Live Floor Map
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time digital twin of the factory floor
          </p>
        </div>
        <Badge className="bg-accent/15 text-accent border-accent/25 hover:bg-accent/15">
          Live Sync Active
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {environmentStats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="h-3.5 w-3.5 text-primary" />
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <FactoryFloor />
    </div>
  )
}
