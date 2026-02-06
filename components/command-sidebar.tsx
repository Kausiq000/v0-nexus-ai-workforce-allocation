"use client"

import React from "react"

import { Map, Brain, Users, Settings, Hexagon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type View = "nexus-map" | "ai-brain" | "workforce" | "settings"

interface CommandSidebarProps {
  activeView: View
  onNavigate: (view: View) => void
}

const navItems: { id: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "nexus-map", label: "Nexus Map", icon: Map },
  { id: "ai-brain", label: "AI Brain", icon: Brain },
  { id: "workforce", label: "Workforce Grid", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
]

export function CommandSidebar({ activeView, onNavigate }: CommandSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen flex-col items-center justify-between py-6 px-3">
        <nav className="glass flex flex-col items-center gap-1 rounded-2xl p-2">
          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-2">
            <Hexagon className="h-6 w-6 text-primary neon-cyan" />
          </div>

          {/* Nav Items */}
          {navItems.map((item) => {
            const isActive = activeView === item.id
            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-primary/15 text-primary border border-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                    }`}
                    aria-label={item.label}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <item.icon className="h-4.5 w-4.5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-card border-border font-mono text-xs">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </nav>

        {/* Bottom Status */}
        <div className="glass flex flex-col items-center gap-2 rounded-2xl p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card border-border font-mono text-xs">
              Connected
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
