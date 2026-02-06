"use client"

import { useState, useEffect } from "react"
import { Gauge, Zap, ThermometerSun, Cpu } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const metrics = [
  { label: "Plant Efficiency", value: 94, icon: Gauge, color: "text-primary" },
  { label: "Energy Usage", value: 67, icon: Zap, color: "text-secondary" },
  { label: "Avg Temperature", value: 72, icon: ThermometerSun, color: "text-amber-400" },
  { label: "CPU Load", value: 43, icon: Cpu, color: "text-emerald-400" },
]

export function SystemMetricsCard() {
  const [animatedValues, setAnimatedValues] = useState(metrics.map(() => 0))

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValues(metrics.map((m) => m.value))
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="glass glass-hover flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <Gauge className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">System Metrics</h3>
            <p className="text-[11px] text-muted-foreground font-mono">Real-time telemetry</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4 p-5">
        {metrics.map((metric, i) => (
          <div key={metric.label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <metric.icon className={`h-3.5 w-3.5 ${metric.color}`} />
                <span className="text-xs text-muted-foreground">{metric.label}</span>
              </div>
              <span className={`font-mono text-sm font-semibold ${metric.color}`}>
                {animatedValues[i]}%
              </span>
            </div>
            <Progress value={animatedValues[i]} className="h-1.5" />
          </div>
        ))}
      </div>
    </div>
  )
}
