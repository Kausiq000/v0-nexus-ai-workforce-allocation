"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock, AlertCircle } from "lucide-react"

interface LoginPortalProps {
  onSelectRole: (role: "admin" | "worker") => void
}

export function LoginPortal({ onSelectRole }: LoginPortalProps) {
  const [step, setStep] = useState<"role-select" | "login">("role-select")
  const [selectedRole, setSelectedRole] = useState<"admin" | "worker" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = (role: "admin" | "worker") => {
    setSelectedRole(role)
    setStep("login")
    setError("")
  }

  const handleBackToRoles = () => {
    setStep("role-select")
    setEmail("")
    setPassword("")
    setError("")
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    if (selectedRole) {
      onSelectRole(selectedRole)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background p-4">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {step === "role-select" ? (
          <motion.div
            key="role-select"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            <div className="mb-8 text-center">
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Welcome to ALLOC8
              </h1>
              <p className="text-muted-foreground">Choose your role to access the system</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {/* Admin Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect("admin")}
                className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-white/5 backdrop-blur-md p-8 transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-32 w-32 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors blur-2xl" />

                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-4 rounded-lg bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors">
                    <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-foreground text-left mb-2">Admin</h2>
                  <p className="text-sm text-muted-foreground text-left">
                    Manage workforce, view analytics, and configure settings
                  </p>
                </div>
              </motion.button>

              {/* Worker Card */}
              <motion.button
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRoleSelect("worker")}
                className="group relative overflow-hidden rounded-2xl border-2 border-accent/20 bg-white/5 backdrop-blur-md p-8 transition-all hover:border-accent/40 hover:bg-accent/5"
              >
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-32 w-32 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors blur-2xl" />

                <div className="relative z-10 flex flex-col items-start">
                  <div className="mb-4 rounded-lg bg-accent/10 p-3 group-hover:bg-accent/20 transition-colors">
                    <svg className="h-6 w-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>

                  <h2 className="font-heading text-xl font-bold text-foreground text-left mb-2">Worker</h2>
                  <p className="text-sm text-muted-foreground text-left">View tasks, attendance, and performance metrics</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/5 px-3 py-1 backdrop-blur-md">
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-xs font-medium text-primary/70">
                  {selectedRole === "admin" ? "Admin Access" : "Worker Portal"}
                </span>
              </div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Sign In</h1>
              <p className="text-muted-foreground">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full rounded-lg border border-border bg-white/5 py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-border bg-white/5 py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/50 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/5 p-3"
                >
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary py-3 font-heading font-semibold text-white transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Back Button */}
              <button
                type="button"
                onClick={handleBackToRoles}
                className="w-full rounded-lg border border-border bg-white/5 py-3 font-heading font-medium text-foreground transition-all hover:bg-white/10 active:scale-95"
              >
                Back to Roles
              </button>
            </form>

            {/* Demo Hint */}
            <p className="mt-6 text-center text-xs text-muted-foreground/60">
              Demo: Use any email and 6+ character password
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
