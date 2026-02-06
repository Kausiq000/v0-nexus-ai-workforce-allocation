"use client"

import { HeroStats } from "@/components/hero-stats"
import { FactoryFloor } from "@/components/factory-floor"
import { ActivityFeed } from "@/components/activity-feed"

export function DashboardView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Command Center
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time overview of plant operations and AI decisions
        </p>
      </div>

      <HeroStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FactoryFloor />
        </div>
        <div className="lg:col-span-1 min-h-[400px]">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
