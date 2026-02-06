"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Calendar, BarChart3, LogOut, Menu } from "lucide-react"

interface WorkerDashboardProps {
  onLogout: () => void
}

export function WorkerDashboard({ onLogout }: WorkerDashboardProps) {
  const [activeView, setActiveView] = useState<"tasks" | "attendance" | "stats">("tasks")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { id: "tasks", label: "My Tasks", icon: CheckCircle2 },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "stats", label: "My Stats", icon: BarChart3 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: "#F4F7FA" }}
    >
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-white border border-border/50 hover:bg-secondary/5 transition-colors"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5 text-foreground" />
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-border/50 z-30 md:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-border/50">
          <h2 className="font-heading text-2xl font-bold text-primary">ALLOC8</h2>
          <p className="font-sans text-xs text-muted-foreground mt-1">Worker Portal</p>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as "tasks" | "attendance" | "stats")
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-sans text-sm transition-all ${
                  activeView === item.id
                    ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                    : "text-foreground hover:bg-secondary/5 border-l-2 border-transparent"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 font-sans text-sm font-medium transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 overflow-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            {activeView === "tasks" && "My Tasks"}
            {activeView === "attendance" && "Attendance"}
            {activeView === "stats" && "Performance Stats"}
          </h1>
          <p className="font-sans text-muted-foreground mt-2">
            {activeView === "tasks" && "Current assignments and upcoming work"}
            {activeView === "attendance" && "Check-ins and streak information"}
            {activeView === "stats" && "Your productivity and performance metrics"}
          </p>
        </motion.div>

        {/* Content Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeView}
        >
          {/* My Tasks View */}
          {activeView === "tasks" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  station: "Assembly Line B",
                  task: "Component Assembly",
                  time: "Until 2:30 PM",
                  progress: 75,
                },
                {
                  station: "Quality Check Zone",
                  task: "Product Inspection",
                  time: "Until 4:00 PM",
                  progress: 45,
                },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-white border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{card.station}</h3>
                      <p className="font-sans text-sm text-muted-foreground">{card.task}</p>
                    </div>
                    <span className="font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {card.time}
                    </span>
                  </div>
                  <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${card.progress}%` }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </div>
                  <p className="font-sans text-xs text-muted-foreground mt-2">{card.progress}% Complete</p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Attendance View */}
          {activeView === "attendance" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Check-in Summary */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl bg-white border border-border/50"
              >
                <h3 className="font-heading font-semibold text-foreground mb-4">Today's Check-In</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border/30">
                    <span className="font-sans text-sm text-muted-foreground">Check-in Time</span>
                    <span className="font-mono font-semibold text-foreground">08:05 AM</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border/30">
                    <span className="font-sans text-sm text-muted-foreground">Status</span>
                    <span className="font-sans text-sm font-semibold text-primary">On-Site</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-sm text-muted-foreground">Hours Logged</span>
                    <span className="font-mono font-semibold text-foreground">6.5h</span>
                  </div>
                </div>
              </motion.div>

              {/* Streak Info */}
              <motion.div
                variants={itemVariants}
                className="p-6 rounded-xl bg-primary/5 border border-primary/20"
              >
                <h3 className="font-heading font-semibold text-foreground mb-4">Attendance Streak</h3>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">23</div>
                  <p className="font-sans text-sm text-muted-foreground">Consecutive days present</p>
                  <div className="mt-4 inline-block px-3 py-1 rounded-full bg-accent/10 text-accent font-sans text-xs font-semibold">
                    Excellent Performance
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Stats View */}
          {activeView === "stats" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Avg. Productivity", value: "92%", color: "primary" },
                { label: "Tasks Completed", value: "156", color: "secondary" },
                { label: "Quality Score", value: "98.5%", color: "accent" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-white border border-border/50 text-center"
                >
                  <p className="font-sans text-sm text-muted-foreground mb-3">{stat.label}</p>
                  <p className={`font-heading text-4xl font-bold text-${stat.color}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* Mobile overlay close */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </motion.div>
  )
}
