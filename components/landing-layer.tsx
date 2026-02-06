"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LandingLayerProps {
  onInitialize: () => void
}

export function LandingLayer({ onInitialize }: LandingLayerProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleInitialize = () => {
    setIsExiting(true)
    setTimeout(onInitialize, 500)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed inset-0 z-50 overflow-hidden ${isExiting ? "" : ""}`}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.85) saturate(0.8)" }}
        src="/images/user-ai-generation-lql16vybirwo-1080p.mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/85" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/5 px-4 py-2 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-primary/70">
              Enterprise Workforce Allocation
            </span>
          </div>
        </motion.div>

        {/* Main Title with Cache Effect */}
        <motion.div variants={itemVariants} className="mb-8 max-w-4xl text-center">
          <div className="relative">
            {/* Cache effect - gradient shimmer */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-accent/20 to-primary/40 blur-2xl opacity-60 animate-pulse" />
            
            {/* Title with layered effect */}
            <div className="relative">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
                Smart Factory
              </h1>
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent">
                  Orchestration
                </span>
              </h1>
            </div>

            {/* Accent line */}
            <div className="mt-6 flex justify-center">
              <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-12 max-w-2xl text-center text-lg sm:text-xl text-muted-foreground leading-relaxed"
        >
          AI-powered workforce allocation for smart factories. Real-time scheduling, predictive analytics, and autonomous resource orchestration.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleInitialize}
          className="group relative inline-flex items-center gap-2 rounded-full bg-primary px-8 sm:px-10 py-4 font-heading font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <span>Get Started</span>
          <svg
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </motion.button>

        {/* Bottom Info */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 sm:flex-row sm:justify-between px-6 sm:px-10"
        >
          <span className="font-mono text-xs text-muted-foreground/50">ALLOC8 v4.2.0</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground/50">System Online</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
