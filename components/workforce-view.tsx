"use client"

import React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  BrainCircuit,
  Zap,
  Clock,
  MapPin,
  ArrowUpDown,
  Loader2,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const unassignedTasks = [
  {
    id: "T-401",
    task: "Assembly Line B - Component Insertion",
    urgency: "critical",
    estimatedTime: "2h 15m",
    skillsNeeded: ["Assembly", "Precision"],
    aiPriority: 98,
  },
  {
    id: "T-402",
    task: "Quality Check - Batch #4421",
    urgency: "high",
    estimatedTime: "45m",
    skillsNeeded: ["QA", "Inspection"],
    aiPriority: 87,
  },
  {
    id: "T-403",
    task: "Packaging Line J - Overflow Support",
    urgency: "high",
    estimatedTime: "1h 30m",
    skillsNeeded: ["Packaging", "Logistics"],
    aiPriority: 82,
  },
  {
    id: "T-404",
    task: "Welding Station C - Support Role",
    urgency: "medium",
    estimatedTime: "3h",
    skillsNeeded: ["Welding", "Safety"],
    aiPriority: 65,
  },
  {
    id: "T-405",
    task: "Maintenance - 3D Printer F1 Restart",
    urgency: "medium",
    estimatedTime: "1h",
    skillsNeeded: ["Maintenance", "Electrical"],
    aiPriority: 60,
  },
  {
    id: "T-406",
    task: "Inventory Restock - Zone A Parts",
    urgency: "low",
    estimatedTime: "30m",
    skillsNeeded: ["Logistics"],
    aiPriority: 35,
  },
]

const workers = [
  {
    id: "W-001",
    name: "Sarah Chen",
    initials: "SC",
    role: "Assembly Specialist",
    skillMatch: 96,
    fatigue: "low",
    location: "Zone A - Break Room",
    status: "available",
    shift: "08:00 - 16:00",
  },
  {
    id: "W-002",
    name: "Marcus Johnson",
    initials: "MJ",
    role: "QA Inspector",
    skillMatch: 92,
    fatigue: "low",
    location: "Zone D - Station 3",
    status: "available",
    shift: "08:00 - 16:00",
  },
  {
    id: "W-003",
    name: "Priya Patel",
    initials: "PP",
    role: "Welding Technician",
    skillMatch: 88,
    fatigue: "medium",
    location: "Zone B - Corridor",
    status: "available",
    shift: "06:00 - 14:00",
  },
  {
    id: "W-004",
    name: "Thomas Mueller",
    initials: "TM",
    role: "Maintenance Engineer",
    skillMatch: 85,
    fatigue: "low",
    location: "Zone C - Workshop",
    status: "available",
    shift: "08:00 - 16:00",
  },
  {
    id: "W-005",
    name: "Lisa Nakamura",
    initials: "LN",
    role: "Logistics Coordinator",
    skillMatch: 78,
    fatigue: "high",
    location: "Zone E - Loading",
    status: "available",
    shift: "06:00 - 14:00",
  },
  {
    id: "W-006",
    name: "David Kim",
    initials: "DK",
    role: "Packaging Specialist",
    skillMatch: 74,
    fatigue: "medium",
    location: "Zone E - Line J",
    status: "on-task",
    shift: "08:00 - 16:00",
  },
  {
    id: "W-007",
    name: "Emma Rodriguez",
    initials: "ER",
    role: "CNC Operator",
    skillMatch: 71,
    fatigue: "low",
    location: "Zone A - Machine 2",
    status: "on-task",
    shift: "06:00 - 14:00",
  },
]

function getUrgencyStyle(urgency: string) {
  switch (urgency) {
    case "critical":
      return "bg-red-500/15 text-red-400 border-red-500/25 hover:bg-red-500/15"
    case "high":
      return "bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/15"
    case "medium":
      return "bg-blue-500/15 text-blue-400 border-blue-500/25 hover:bg-blue-500/15"
    default:
      return "bg-muted text-muted-foreground"
  }
}

function getFatigueStyle(fatigue: string) {
  switch (fatigue) {
    case "low":
      return { color: "#10b981", label: "Low" }
    case "medium":
      return { color: "#f59e0b", label: "Medium" }
    case "high":
      return { color: "#ef4444", label: "High" }
    default:
      return { color: "#6b7280", label: "Unknown" }
  }
}

function getSkillMatchColor(score: number) {
  if (score >= 90) return "#10b981"
  if (score >= 75) return "#06b6d4"
  if (score >= 60) return "#f59e0b"
  return "#ef4444"
}

export function WorkforceView() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [showSkeleton, setShowSkeleton] = useState(false)

  function handleSimulate() {
    setIsSimulating(true)
    setShowSkeleton(true)
    setTimeout(() => {
      setShowSkeleton(false)
      setIsSimulating(false)
    }, 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Workforce Allocation
          </h1>
          <p className="text-sm text-muted-foreground">
            AI-prioritized task assignment and worker matching
          </p>
        </div>
        <Button
          onClick={handleSimulate}
          disabled={isSimulating}
          className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-lg shadow-primary/20 transition-all duration-300"
          size="lg"
        >
          {isSimulating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BrainCircuit className="mr-2 h-4 w-4" />
          )}
          {isSimulating ? "Simulating..." : "Simulate AI Allocation"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Left: Unassigned Tasks */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Unassigned Tasks
              </h3>
              <Badge className="bg-primary/15 text-primary border-primary/25 hover:bg-primary/15">
                {unassignedTasks.length} pending
              </Badge>
            </div>

            <ScrollArea className="h-[520px]">
              <div className="flex flex-col gap-3 pr-3">
                {unassignedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="rounded-lg border border-border bg-background/30 p-4 transition-all duration-200 hover:border-primary/30 hover:bg-background/50"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {task.id}
                        </span>
                        <Badge className={getUrgencyStyle(task.urgency)}>
                          {task.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-3 w-3 text-primary" />
                        <span className="text-xs font-mono font-semibold text-primary">
                          {task.aiPriority}
                        </span>
                      </div>
                    </div>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {task.task}
                    </p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-[10px] text-muted-foreground">
                          {task.estimatedTime}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {task.skillsNeeded.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Right: Available Workers */}
        <div className="lg:col-span-3">
          <div className="glass-card rounded-xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">
                Available Workers
              </h3>
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Sorted by AI skill match
                </span>
              </div>
            </div>

            {showSkeleton ? (
              <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3">
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        Worker
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        Skill Match
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        Fatigue
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        Location
                      </TableHead>
                      <TableHead className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {workers.map((worker) => {
                      const fatigueStyle = getFatigueStyle(worker.fatigue)
                      const skillColor = getSkillMatchColor(worker.skillMatch)
                      return (
                        <TableRow
                          key={worker.id}
                          className="border-border/50 hover:bg-muted/30 transition-colors"
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 border border-border">
                                <AvatarFallback
                                  className="text-[10px] font-semibold"
                                  style={{
                                    backgroundColor: `${skillColor}15`,
                                    color: skillColor,
                                    borderColor: `${skillColor}30`,
                                  }}
                                >
                                  {worker.initials}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {worker.name}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  {worker.role}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress
                                value={worker.skillMatch}
                                className="h-1.5 w-16 bg-muted"
                                style={
                                  {
                                    "--progress-color": skillColor,
                                  } as React.CSSProperties
                                }
                              />
                              <span
                                className="text-xs font-mono font-semibold"
                                style={{ color: skillColor }}
                              >
                                {worker.skillMatch}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: fatigueStyle.color }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: fatigueStyle.color }}
                              >
                                {fatigueStyle.label}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {worker.location}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                worker.status === "available"
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/15"
                                  : "bg-blue-500/15 text-blue-400 border-blue-500/25 hover:bg-blue-500/15"
                              }
                            >
                              {worker.status === "available"
                                ? "Available"
                                : "On Task"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
