"use client"

import { useState } from "react"
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
      transition: { duration: 1, ease: "easeOut" },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Video Background - Bright & Visible */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(1.05) saturate(1)" }}
        src="/images/user-ai-generation-lql16vybirwo-1080p.mp4"
      />

      {/* Light Overlay - 35% opacity for video visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/35" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-black/30 px-4 py-2 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-cyan-300">
              Enterprise Workforce System
            </span>
          </div>
        </motion.div>

        {/* Main Title - ALLOC8OR with Asimovian Font & Selective Neon Blue */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 text-center">
          <div className="relative">
            {/* Neon Glow Background Effect */}
            <div className="absolute -inset-6 sm:-inset-8 blur-3xl opacity-60">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-cyan-500/50 animate-pulse" />
            </div>

            {/* Title with Asimovian Font - ALLOC + 8O (neon blue) + R */}
            <div className="relative flex items-center justify-center gap-0">
              {/* ALLOC in white */}
              <h1
                className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-none"
                style={{
                  color: "#FFFFFF",
                  textShadow: `
                    0 0 8px rgba(34, 211, 238, 0.6),
                    0 0 16px rgba(34, 211, 238, 0.4),
                    2px 2px 0 rgba(34, 211, 238, 0.3),
                    -2px -2px 0 rgba(59, 130, 246, 0.3)
                  `,
                  letterSpacing: "0.05em",
                }}
              >
                ALLOC
              </h1>

              {/* 8O in neon blue */}
              <h1
                className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-none"
                style={{
                  color: "#22D3EE",
                  textShadow: `
                    0 0 10px rgba(34, 211, 238, 1),
                    0 0 20px rgba(34, 211, 238, 0.8),
                    0 0 30px rgba(34, 211, 238, 0.6),
                    0 0 40px rgba(59, 130, 246, 0.8),
                    0 0 50px rgba(59, 130, 246, 0.6),
                    2px 2px 0 rgba(34, 211, 238, 0.6),
                    -2px -2px 0 rgba(59, 130, 246, 0.6),
                    4px 4px 0 rgba(34, 211, 238, 0.4)
                  `,
                  letterSpacing: "0.05em",
                }}
              >
                8O
              </h1>

              {/* R in white */}
              <h1
                className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-none"
                style={{
                  color: "#FFFFFF",
                  textShadow: `
                    0 0 8px rgba(34, 211, 238, 0.6),
                    0 0 16px rgba(34, 211, 238, 0.4),
                    2px 2px 0 rgba(34, 211, 238, 0.3),
                    -2px -2px 0 rgba(59, 130, 246, 0.3)
                  `,
                  letterSpacing: "0.05em",
                }}
              >
                R
              </h1>
            </div>

            {/* Animated Neon Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
              className="mt-6 sm:mt-8 mx-auto h-1.5 w-40 sm:w-48 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
              style={{
                originX: 0.5,
                boxShadow: "0 0 20px rgba(34, 211, 238, 0.6), 0 0 10px rgba(59, 130, 246, 0.4)",
              }}
            />
          </div>
        </motion.div>

        {/* Tagline - Single Instance */}
        <motion.p
          variants={itemVariants}
          className="mb-6 sm:mb-8 max-w-2xl text-center text-lg sm:text-xl text-cyan-100 leading-relaxed font-light tracking-widest"
        >
          Smart Factory Orchestration
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="mb-12 sm:mb-16 max-w-2xl text-center text-sm sm:text-base text-white/70 leading-relaxed"
        >
          AI-powered workforce allocation for smart factories. Real-time scheduling, predictive analytics, and autonomous resource orchestration.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          variants={itemVariants}
          onClick={handleInitialize}
          className="group relative inline-flex items-center gap-2 rounded-full bg-cyan-500 px-10 sm:px-12 py-3 sm:py-4 font-heading font-bold text-black/90 transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.8), 0 0 60px rgba(34, 211, 238, 0.4), inset 0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          <span className="text-sm sm:text-base">Enter System</span>
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1"
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
          className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex flex-col items-center gap-4 sm:flex-row sm:justify-between px-4 sm:px-10"
        >
          <span className="font-mono text-[10px] sm:text-xs text-cyan-300/40">ALLOC8OR v4.2.0</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs text-cyan-300/40">System Online</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
