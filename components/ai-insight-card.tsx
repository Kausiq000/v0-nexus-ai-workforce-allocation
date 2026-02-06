"use client"

import { useState, useEffect } from "react"
import { Brain, Sparkles, TrendingUp, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const insights = [
  {
    message: "Shift optimal. Efficiency at 98%.",
    confidence: 98,
    type: "positive" as const,
  },
  {
    message: "Recommend re-routing 3 workers from Zone C1 to B1. Welding Bay bottleneck detected.",
    confidence: 91,
    type: "action" as const,
  },
  {
    message: "Predictive maintenance alert: CNC-07 bearing replacement in 48h.",
    confidence: 87,
    type: "warning" as const,
  },
  {
    message: "Night shift staffing optimal. No changes needed.",
    confidence: 95,
    type: "positive" as const,
  },
  {
    message: "Energy consumption down 12% vs. yesterday. Solar grid contributing 34%.",
    confidence: 99,
    type: "positive" as const,
  },
]

const typeStyles = {
  positive: "border-emerald-500/20 bg-emerald-500/5",
  action: "border-secondary/20 bg-secondary/5",
  warning: "border-amber-500/20 bg-amber-500/5",
}

const typeIcon = {
  positive: "text-emerald-400",
  action: "text-secondary",
  warning: "text-amber-400",
}

export function AiInsightCard() {
  const [currentInsight, setCurrentInsight] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true)
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % insights.length)
        setIsTyping(false)
      }, 1200)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const insight = insights[currentInsight]

  return (
    <div className="glass glass-hover flex h-full flex-col overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 border border-secondary/20">
            <Brain className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">AI Brain</h3>
            <p className="text-[11px] text-muted-foreground font-mono">Neural Engine v3</p>
          </div>
        </div>
        <Badge variant="outline" className="border-secondary/30 bg-secondary/10 text-secondary font-mono text-[9px]">
          <Sparkles className="mr-1 h-2.5 w-2.5" />
          ACTIVE
        </Badge>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col gap-3">
          {/* AI Message Bubble */}
          <div className={`rounded-xl border p-4 transition-all duration-300 ${typeStyles[insight.type]}`}>
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 ${typeIcon[insight.type]}`}>
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-mono text-muted-foreground mb-1.5">AI RECOMMENDATION</p>
                {isTyping ? (
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                ) : (
                  <p className="text-sm text-foreground leading-relaxed animate-fade-in">
                    {insight.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Confidence */}
          {!isTyping && (
            <div className="flex items-center justify-between animate-fade-in">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3 w-3 text-primary" />
                <span className="font-mono text-[10px] text-muted-foreground">
                  Confidence: <span className="text-primary">{insight.confidence}%</span>
                </span>
              </div>
              <div className="flex gap-1">
                {insights.map((_, i) => (
                  <div
                    key={`dot-${i}-${insights[i].confidence}`}
                    className={`h-1 w-1 rounded-full transition-colors ${
                      i === currentInsight ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action */}
        <button className="flex items-center justify-between rounded-lg border border-border/50 p-3 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground group">
          <span className="font-mono">View full analysis</span>
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  )
}
