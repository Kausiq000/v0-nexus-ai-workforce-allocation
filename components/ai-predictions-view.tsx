"use client"

import { Badge } from "@/components/ui/badge"
import {
  BrainCircuit,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  Target,
} from "lucide-react"
import { Sparkline } from "@/components/sparkline"

const predictions = [
  {
    id: 1,
    title: "Assembly Line B Bottleneck",
    description:
      "Worker fatigue patterns indicate a 78% probability of throughput decline between 14:00-15:30. AI recommends preemptive shift rotation.",
    confidence: 94,
    impact: "high",
    timeframe: "In 2.5 hours",
    trend: "down",
    sparkData: [95, 93, 90, 88, 84, 80, 78, 75, 72, 70, 68, 65, 63, 60, 58],
    category: "Bottleneck",
  },
  {
    id: 2,
    title: "Zone D Efficiency Surge",
    description:
      "Current worker-machine alignment score is at 97%. Predicted efficiency surge of +12% if David Kim is reallocated from Zone E.",
    confidence: 89,
    impact: "positive",
    timeframe: "Immediate",
    trend: "up",
    sparkData: [78, 80, 82, 85, 87, 88, 90, 91, 93, 94, 95, 96, 96, 97, 97],
    category: "Optimization",
  },
  {
    id: 3,
    title: "Packaging Unit J Maintenance Window",
    description:
      "Vibration sensors trending upward. AI predicts 62% chance of unplanned downtime within 8 hours. Recommend scheduled maintenance at next shift change.",
    confidence: 82,
    impact: "warning",
    timeframe: "In 8 hours",
    trend: "down",
    sparkData: [10, 12, 14, 18, 22, 25, 28, 32, 35, 38, 42, 45, 50, 55, 62],
    category: "Maintenance",
  },
  {
    id: 4,
    title: "Overnight Shift Staffing Gap",
    description:
      "Two workers on overnight shift have flagged availability issues. AI has identified 3 qualified backup candidates and sent notifications.",
    confidence: 76,
    impact: "medium",
    timeframe: "In 6 hours",
    trend: "down",
    sparkData: [100, 100, 98, 98, 95, 92, 90, 88, 85, 82, 80, 78, 75, 72, 70],
    category: "Staffing",
  },
  {
    id: 5,
    title: "Quality Yield Improvement",
    description:
      "Machine learning model detected correlation between ambient temperature adjustment and defect rates. Adjusting climate control could improve yield by 3.2%.",
    confidence: 71,
    impact: "positive",
    timeframe: "Ongoing",
    trend: "up",
    sparkData: [92, 92.5, 93, 93.2, 93.5, 94, 94.2, 94.5, 94.8, 95, 95.2, 95.4, 95.6, 95.8, 96],
    category: "Quality",
  },
]

function getImpactStyle(impact: string) {
  switch (impact) {
    case "high":
      return { color: "#ef4444", bg: "bg-red-500/10 border-red-500/20" }
    case "positive":
      return { color: "#10b981", bg: "bg-emerald-500/10 border-emerald-500/20" }
    case "warning":
      return { color: "#f59e0b", bg: "bg-amber-500/10 border-amber-500/20" }
    case "medium":
      return { color: "#06b6d4", bg: "bg-cyan-500/10 border-cyan-500/20" }
    default:
      return { color: "#6b7280", bg: "bg-muted border-border" }
  }
}

export function AIPredictionsView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          AI Predictions
        </h1>
        <p className="text-sm text-muted-foreground">
          Machine learning forecasts and recommended actions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Avg Confidence</span>
          </div>
          <p className="text-2xl font-bold text-foreground">82.4%</p>
          <p className="text-xs text-accent mt-1">+3.2% from last week</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Active Models</span>
          </div>
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground mt-1">All models healthy</p>
        </div>
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <span className="text-xs text-muted-foreground">Action Required</span>
          </div>
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-xs text-destructive mt-1">2 critical, 1 warning</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {predictions.map((prediction) => {
          const impactStyle = getImpactStyle(prediction.impact)
          return (
            <div
              key={prediction.id}
              className={`glass-card glass-card-hover rounded-xl p-5 border transition-all duration-200 ${impactStyle.bg}`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: `${impactStyle.color}15`,
                        border: `1px solid ${impactStyle.color}30`,
                      }}
                    >
                      {prediction.trend === "up" ? (
                        <TrendingUp
                          className="h-4 w-4"
                          style={{ color: impactStyle.color }}
                        />
                      ) : (
                        <TrendingDown
                          className="h-4 w-4"
                          style={{ color: impactStyle.color }}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {prediction.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge className="bg-primary/15 text-primary border-primary/25 text-[9px] hover:bg-primary/15 animate-pulse-glow">
                          AI Prediction
                        </Badge>
                        <Badge
                          className="text-[9px]"
                          style={{
                            backgroundColor: `${impactStyle.color}15`,
                            color: impactStyle.color,
                            borderColor: `${impactStyle.color}30`,
                          }}
                        >
                          {prediction.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground mt-3">
                    {prediction.description}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        {prediction.confidence}% confidence
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        {prediction.timeframe}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-36 shrink-0">
                  <Sparkline
                    data={prediction.sparkData}
                    color={impactStyle.color}
                    height={50}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
