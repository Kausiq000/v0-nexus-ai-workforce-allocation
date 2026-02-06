"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, CheckCircle2, TrendingUp, LogOut } from "lucide-react"

interface WorkerDashboardProps {
  onLogout: () => void
}

export function WorkerDashboard({ onLogout }: WorkerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"tasks" | "attendance" | "stats">("tasks")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-4 sm:px-8">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">My Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, Worker</p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-white/10 active:scale-95"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 sm:p-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex gap-2 border-b border-border">
          {[
            { id: "tasks" as const, label: "My Tasks", icon: CheckCircle2 },
            { id: "attendance" as const, label: "Attendance", icon: Clock },
            { id: "stats" as const, label: "Performance", icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-3"
        >
          {activeTab === "tasks" && (
            <>
              {[
                { title: "Assembly Line Setup", status: "in-progress", priority: "high" },
                { title: "Quality Inspection", status: "pending", priority: "medium" },
                { title: "Packaging", status: "completed", priority: "low" },
              ].map((task, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-lg border border-border bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading font-semibold text-foreground">{task.title}</h3>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                  <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full transition-all ${
                        task.status === "completed"
                          ? "w-full bg-green-500"
                          : task.status === "in-progress"
                          ? "w-2/3 bg-blue-500"
                          : "w-0 bg-gray-500"
                      }`}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">Priority: {task.priority}</p>
                </motion.div>
              ))}
            </>
          )}

          {activeTab === "attendance" && (
            <>
              {[
                { date: "Today", status: "present", time: "08:00 AM" },
                { date: "Yesterday", status: "present", time: "08:15 AM" },
                { date: "2 days ago", status: "present", time: "08:05 AM" },
              ].map((record, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-lg border border-border bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{record.date}</p>
                      <p className="text-sm text-muted-foreground">Check-in: {record.time}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </>
          )}

          {activeTab === "stats" && (
            <>
              {[
                { label: "Tasks Completed", value: "24", change: "+2 this week" },
                { label: "Attendance Rate", value: "98%", change: "Perfect record" },
                { label: "Performance Score", value: "92/100", change: "+5 points" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="rounded-lg border border-border bg-gradient-to-br from-white to-white/50 p-6 shadow-sm"
                >
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="font-heading text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                  <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>
      </main>
    </motion.div>
  )
}
