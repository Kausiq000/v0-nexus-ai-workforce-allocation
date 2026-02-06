"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"

function DataWaveCanvas() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-background">
      {/* Animated background grid and glow */}
      <div className="absolute inset-0">
        <svg className="h-full w-full" aria-hidden="true">
          <defs>
            <pattern
              id="login-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="hsl(222 20% 16% / 0.3)"
                strokeWidth="0.5"
              />
            </pattern>
            <radialGradient id="glow1" cx="30%" cy="40%">
              <stop offset="0%" stopColor="hsl(187 92% 55% / 0.15)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="glow2" cx="70%" cy="60%">
              <stop offset="0%" stopColor="hsl(160 84% 39% / 0.1)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
          <rect width="100%" height="100%" fill="url(#glow1)" />
          <rect width="100%" height="100%" fill="url(#glow2)" />
        </svg>
      </div>

      {/* Floating data nodes */}
      <div className="absolute inset-0">
        {[
          { x: 15, y: 20, size: 3, delay: 0 },
          { x: 35, y: 35, size: 4, delay: 0.5 },
          { x: 55, y: 15, size: 2, delay: 1 },
          { x: 75, y: 45, size: 3, delay: 1.5 },
          { x: 25, y: 60, size: 2, delay: 2 },
          { x: 60, y: 70, size: 4, delay: 0.8 },
          { x: 80, y: 25, size: 3, delay: 1.2 },
          { x: 45, y: 80, size: 2, delay: 0.3 },
        ].map((node, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/30 animate-pulse"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.size * 4}px`,
              height: `${node.size * 4}px`,
              animationDelay: `${node.delay}s`,
              boxShadow: "0 0 20px hsl(187 92% 55% / 0.2)",
            }}
          />
        ))}
        {/* Connection lines between nodes */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <line x1="15%" y1="20%" x2="35%" y2="35%" stroke="hsl(187 92% 55% / 0.1)" strokeWidth="0.5" />
          <line x1="35%" y1="35%" x2="55%" y2="15%" stroke="hsl(187 92% 55% / 0.1)" strokeWidth="0.5" />
          <line x1="55%" y1="15%" x2="75%" y2="45%" stroke="hsl(187 92% 55% / 0.08)" strokeWidth="0.5" />
          <line x1="25%" y1="60%" x2="60%" y2="70%" stroke="hsl(160 84% 39% / 0.08)" strokeWidth="0.5" />
          <line x1="60%" y1="70%" x2="80%" y2="25%" stroke="hsl(187 92% 55% / 0.06)" strokeWidth="0.5" />
          <line x1="45%" y1="80%" x2="25%" y2="60%" stroke="hsl(160 84% 39% / 0.08)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Central content */}
      <div className="relative flex h-full flex-col items-center justify-center px-12">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
          <Zap className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground text-balance">
          Optimizing the Future of Manufacturing
        </h2>
        <p className="mt-4 max-w-md text-center text-sm leading-relaxed text-muted-foreground">
          AI-powered workforce allocation that adapts in real-time to
          your factory floor, maximizing efficiency and worker
          well-being.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-8">
          {[
            { label: "Efficiency Gain", value: "+34%" },
            { label: "Downtime Reduced", value: "89%" },
            { label: "Factories Live", value: "127" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LoginPortal({ onLogin }: { onLogin: () => void }) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin()
    }, 1500)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left: Login Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-foreground">
                  NEXUS
                </span>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  AI Workforce
                </p>
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to access your factory command center
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-xs text-muted-foreground"
              >
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@nexus-factory.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-border bg-muted/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-xs text-muted-foreground"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="text-[10px] text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 border-border bg-muted/50 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-primary/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/50 shadow-lg shadow-primary/20 transition-all duration-300"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Authenticating..." : "Sign In"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              className="h-10 border-border bg-transparent text-foreground hover:bg-muted/50 hover:text-foreground"
              onClick={onLogin}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google SSO
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-10 border-border bg-transparent text-foreground hover:bg-muted/50 hover:text-foreground"
              onClick={onLogin}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub SSO
            </Button>
          </div>

          <p className="mt-6 text-center text-[10px] text-muted-foreground">
            By signing in, you agree to the Nexus Platform Terms of Service
            and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:block lg:flex-1">
        <DataWaveCanvas />
      </div>
    </div>
  )
}
