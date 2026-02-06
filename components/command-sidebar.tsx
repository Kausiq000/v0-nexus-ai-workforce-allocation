"use client"

import React from "react"

import { LayoutDashboard, Map, BarChart3, Users, Hexagon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type View = "dashboard" | "live-map" | "reports" | "employees"

interface CommandSidebarProps {
  activeView: View
  onNavigate: (view: View) => void
  onLogout: () => void
}

const navItems: { id: View; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "live-map", label: "Live Map", icon: Map },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "employees", label: "Employees", icon: Users },
]

export function CommandSidebar({ activeView, onNavigate, onLogout }: CommandSidebarProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex h-screen flex-col items-center justify-between py-6 px-3 bg-white border-r border-border/50">
        <nav className="flex flex-col items-center gap-1 rounded-2xl p-2 bg-secondary/5">
          {/* Logo */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-2">
            <Hexagon className="h-6 w-6 text-primary" />
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
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/10 border border-transparent"
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
        <div className="flex flex-col items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onLogout}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary/10 transition-all border border-transparent"
                aria-label="Logout"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-card border-border font-mono text-xs">
              Logout
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
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
