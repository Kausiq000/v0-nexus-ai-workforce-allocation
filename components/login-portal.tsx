"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Shield, User } from "lucide-react"

interface LoginPortalProps {
  onSelectRole: (role: "admin" | "worker") => void
}

export function LoginPortal({ onSelectRole }: LoginPortalProps) {
  const [selectedRole, setSelectedRole] = useState<"admin" | "worker" | null>(null)

  const handleRoleSelect = (role: "admin" | "worker") => {
    setSelectedRole(role)
    setTimeout(() => onSelectRole(role), 300)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ background: "#F4F7FA" }}
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#D5DFE8 1px, transparent 1px), linear-gradient(90deg, #D5DFE8 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.15,
        }}
      />

      {/* Center content */}
      <div className="relative z-10 w-full max-w-2xl px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-2">
            ALLOC8
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground">
            Select your role to access the system
          </p>
        </motion.div>

        {/* Dual option cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Admin Card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect("admin")}
            className={`relative group p-8 rounded-2xl border-2 transition-all duration-300 ${
              selectedRole === "admin"
                ? "border-primary bg-primary/5"
                : "border-secondary/30 bg-white hover:border-primary/50 hover:bg-primary/5"
            }`}
            style={{
              boxShadow: selectedRole === "admin" 
                ? "0 20px 40px rgba(58, 110, 165, 0.15)" 
                : "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
          >
            {/* Icon */}
            <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
              selectedRole === "admin"
                ? "bg-primary/15 text-primary"
                : "bg-secondary/20 text-secondary"
            }`}>
              <Shield className="h-7 w-7" />
            </div>

            {/* Text */}
            <h2 className="font-heading text-xl font-semibold text-foreground text-left mb-2">
              ADMIN
            </h2>
            <p className="font-sans text-sm text-muted-foreground text-left">
              System oversight, analytics, and resource management
            </p>
          </motion.button>

          {/* Worker Card */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRoleSelect("worker")}
            className={`relative group p-8 rounded-2xl border-2 transition-all duration-300 ${
              selectedRole === "worker"
                ? "border-primary bg-primary/5"
                : "border-secondary/30 bg-white hover:border-primary/50 hover:bg-primary/5"
            }`}
            style={{
              boxShadow: selectedRole === "worker" 
                ? "0 20px 40px rgba(58, 110, 165, 0.15)" 
                : "0 4px 12px rgba(0, 0, 0, 0.05)"
            }}
          >
            {/* Icon */}
            <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
              selectedRole === "worker"
                ? "bg-primary/15 text-primary"
                : "bg-secondary/20 text-secondary"
            }`}>
              <User className="h-7 w-7" />
            </div>

            {/* Text */}
            <h2 className="font-heading text-xl font-semibold text-foreground text-left mb-2">
              WORKER
            </h2>
            <p className="font-sans text-sm text-muted-foreground text-left">
              View tasks, attendance, and personal performance stats
            </p>
          </motion.button>
        </div>

        {/* Footer hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-xs text-muted-foreground/50">
            ALLOC8 v4.2.0 // Enterprise Workforce Allocation
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
