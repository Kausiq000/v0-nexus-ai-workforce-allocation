"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { BrainCircuit, ArrowRightLeft, AlertTriangle, CheckCircle2, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const allActivities = [
  {
    id: 1,
    type: "ai-decision",
    message: "AI auto-reallocated John Doe to Assembly Line B due to fatigue risk",
    time: "12s ago",
    icon: BrainCircuit,
    color: "#06b6d4",
  },
  {
    id: 2,
    type: "transfer",
    message: "Maria Garcia transferred from Zone C to Zone D - skill match optimization",
    time: "1m ago",
    icon: ArrowRightLeft,
    color: "#10b981",
  },
  {
    id: 3,
    type: "alert",
    message: "Bottleneck predicted on Packaging Unit J in 45 minutes",
    time: "3m ago",
    icon: AlertTriangle,
    color: "#f59e0b",
  },
  {
    id: 4,
    type: "completed",
    message: "Shift rotation completed for Zone A - all positions filled",
    time: "5m ago",
    icon: CheckCircle2,
    color: "#10b981",
  },
  {
    id: 5,
    type: "ai-decision",
    message: "AI recommended preventive maintenance for CNC Lathe Alpha at next break",
    time: "8m ago",
    icon: BrainCircuit,
    color: "#06b6d4",
  },
  {
    id: 6,
    type: "alert",
    message: "3D Printer F1 went offline - rerouting tasks to backup line",
    time: "12m ago",
    icon: AlertTriangle,
    color: "#f59e0b",
  },
  {
    id: 7,
    type: "transfer",
    message: "Ahmed Hassan upskill session completed - now certified for welding",
    time: "18m ago",
    icon: CheckCircle2,
    color: "#10b981",
  },
  {
    id: 8,
    type: "ai-decision",
    message: "AI balanced workload across Zone B - reduced wait time by 23%",
    time: "25m ago",
    icon: BrainCircuit,
    color: "#06b6d4",
  },
  {
    id: 9,
    type: "scheduled",
    message: "Break rotation scheduled for 14:30 - 8 workers in batch",
    time: "32m ago",
    icon: Clock,
    color: "#6b7280",
  },
  {
    id: 10,
    type: "ai-decision",
    message: "AI detected quality drift on Assembly Robot B1 - adjusting parameters",
    time: "40m ago",
    icon: BrainCircuit,
    color: "#06b6d4",
  },
]

export function ActivityFeed() {
  const [activities, setActivities] = useState(allActivities.slice(0, 6))
  const [newItem, setNewItem] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        const remaining = allActivities.filter(
          (a) => !prev.find((p) => p.id === a.id)
        )
        if (remaining.length === 0) return prev
        setNewItem(true)
        setTimeout(() => setNewItem(false), 1000)
        return [remaining[0], ...prev].slice(0, 8)
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card rounded-xl p-5 flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            AI Activity Feed
          </h3>
          <p className="text-xs text-muted-foreground">Live decisions & events</p>
        </div>
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 animate-pulse-glow">
          <div className="h-2 w-2 rounded-full bg-primary" />
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="flex flex-col gap-3">
          {activities.map((activity, idx) => (
            <div
              key={activity.id}
              className={`flex gap-3 rounded-lg p-3 transition-all duration-500 ${
                idx === 0 && newItem
                  ? "bg-primary/5 border border-primary/20"
                  : "bg-background/30"
              }`}
            >
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                style={{
                  backgroundColor: `${activity.color}15`,
                  border: `1px solid ${activity.color}25`,
                }}
              >
                <activity.icon
                  className="h-3.5 w-3.5"
                  style={{ color: activity.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs leading-relaxed text-foreground/90">
                  {activity.message}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground">
                    {activity.time}
                  </span>
                  {activity.type === "ai-decision" && (
                    <Badge className="h-4 px-1.5 text-[9px] bg-primary/15 text-primary border-primary/25 hover:bg-primary/15 animate-pulse-glow">
                      AI
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
