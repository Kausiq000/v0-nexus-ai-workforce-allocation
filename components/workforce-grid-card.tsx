"use client"

import { Users, UserCheck, UserX, Clock } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const workers = [
  { name: "M. Chen", role: "Welder", zone: "B1", efficiency: 96, status: "active" },
  { name: "S. Park", role: "Operator", zone: "A1", efficiency: 92, status: "active" },
  { name: "J. Davis", role: "QA Lead", zone: "C2", efficiency: 88, status: "active" },
  { name: "R. Kumar", role: "Technician", zone: "A2", efficiency: 78, status: "break" },
  { name: "L. Zhang", role: "Engineer", zone: "C1", efficiency: 94, status: "active" },
]

export function WorkforceGridCard() {
  return (
    <div className="glass glass-hover flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Workforce Grid</h3>
            <p className="text-[11px] text-muted-foreground font-mono">55 active / 60 total</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <div className="flex items-center gap-1" title="Active">
            <UserCheck className="h-3 w-3 text-emerald-400" />
            <span className="font-mono text-[10px]">55</span>
          </div>
          <div className="flex items-center gap-1" title="On Break">
            <Clock className="h-3 w-3 text-amber-400" />
            <span className="font-mono text-[10px]">3</span>
          </div>
          <div className="flex items-center gap-1" title="Off Shift">
            <UserX className="h-3 w-3 text-muted-foreground" />
            <span className="font-mono text-[10px]">2</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="flex flex-col gap-2">
          {workers.map((worker) => (
            <div
              key={worker.name}
              className="flex items-center gap-3 rounded-xl border border-border/30 p-3 transition-colors hover:border-primary/20"
            >
              <Avatar className="h-7 w-7 border border-border">
                <AvatarFallback className="bg-primary/10 text-primary text-[9px] font-semibold">
                  {worker.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground truncate">{worker.name}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{worker.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={worker.efficiency} className="h-1 flex-1" />
                  <span className="font-mono text-[10px] text-primary">{worker.efficiency}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
