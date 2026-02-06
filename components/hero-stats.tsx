"use client"

import { Activity, Users, AlertTriangle, ShieldCheck } from "lucide-react"
import { Sparkline } from "@/components/sparkline"

const stats = [
  {
    title: "Real-time Plant Efficiency",
    value: "98.2%",
    change: "+1.4%",
    changeType: "positive" as const,
    icon: Activity,
    color: "#06b6d4",
    sparkData: [88, 90, 87, 92, 94, 91, 95, 93, 96, 94, 97, 95, 98, 96, 98],
  },
  {
    title: "Active Workers",
    value: "142/150",
    change: "94.7% capacity",
    changeType: "positive" as const,
    icon: Users,
    color: "#10b981",
    sparkData: [130, 135, 140, 138, 142, 140, 145, 142, 144, 140, 143, 141, 142, 142, 142],
  },
  {
    title: "Predicted Bottlenecks",
    value: "2",
    change: "Assembly B, Packaging",
    changeType: "warning" as const,
    icon: AlertTriangle,
    color: "#f59e0b",
    sparkData: [5, 4, 6, 3, 4, 5, 3, 2, 4, 3, 2, 3, 2, 2, 2],
  },
  {
    title: "Safety Incidents",
    value: "0",
    change: "42 days incident-free",
    changeType: "positive" as const,
    icon: ShieldCheck,
    color: "#10b981",
    sparkData: [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
]

export function HeroStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="glass-card glass-card-hover rounded-xl p-5 transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{
                  backgroundColor: `${stat.color}15`,
                  border: `1px solid ${stat.color}30`,
                }}
              >
                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
              </div>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </div>
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p
                className="mt-0.5 text-xs"
                style={{
                  color:
                    stat.changeType === "warning"
                      ? "#f59e0b"
                      : "#10b981",
                }}
              >
                {stat.change}
              </p>
            </div>
            <div className="w-24">
              <Sparkline data={stat.sparkData} color={stat.color} height={36} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
