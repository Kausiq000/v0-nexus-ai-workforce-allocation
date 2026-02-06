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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "brightness(1.05) saturate(1)" }}
        src="/images/user-ai-generation-lql16vybirwo-1080p.mp4"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/30 to-black/35" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-black/30 px-4 py-2 backdrop-blur-md">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium tracking-wider text-cyan-300">
              Enterprise Workforce System
            </span>
          </div>
        </motion.div>

        {/* Title - ALLOC8OR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="mb-12 text-center relative"
        >
          {/* Glow Background */}
          <div className="absolute -inset-8 blur-3xl opacity-60">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-cyan-500/50 animate-pulse" />
          </div>

          {/* Title Text with Neon Effect */}
          <h1
            className="font-display text-7xl sm:text-8xl lg:text-9xl font-black leading-none relative tracking-wide"
            style={{
              background: "linear-gradient(to right, #FFFFFF 0%, #FFFFFF 45%, #22D3EE 45%, #22D3EE 55%, #FFFFFF 55%, #FFFFFF 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 16px rgba(34, 211, 238, 0.6)) drop-shadow(0 0 24px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 32px rgba(59, 130, 246, 0.3))",
            }}
          >
            ALLOC8OR
          </h1>

          {/* Underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-8 mx-auto h-1.5 w-48 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
            style={{
              originX: 0.5,
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-8 text-lg sm:text-xl text-cyan-100 tracking-widest"
        >
          Smart Factory Orchestration
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-12 max-w-2xl text-center text-sm sm:text-base text-white/70"
        >
          AI-powered workforce allocation for smart factories. Real-time scheduling, predictive analytics, and autonomous resource orchestration.
        </motion.p>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          onClick={handleInitialize}
          className="px-12 py-3 sm:py-4 rounded-full bg-cyan-500 text-black font-bold text-sm sm:text-base transition-all hover:scale-110 active:scale-95"
          style={{
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.8), inset 0 0 20px rgba(255,255,255,0.3)",
          }}
        >
          Enter System
        </motion.button>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 sm:flex-row sm:justify-between px-10"
        >
          <span className="font-mono text-xs text-cyan-300/40">ALLOC8OR v4.2.0</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs text-cyan-300/40">System Online</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
