"use client"

import { useState, useEffect } from "react"
import { Zap } from "lucide-react"

function TypewriterText({ text, delay = 80 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1))
        i++
      } else {
        setDone(true)
        clearInterval(interval)
      }
    }, delay)
    return () => clearInterval(interval)
  }, [text, delay])

  return (
    <span>
      {displayed}
      {!done && (
        <span className="animate-blink text-primary">|</span>
      )}
    </span>
  )
}

function ScanLine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-10">
      <div className="animate-scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  )
}

function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(190 95% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 95% 53%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }}
    />
  )
}

interface LandingLayerProps {
  onInitialize: () => void
}

export function LandingLayer({ onInitialize }: LandingLayerProps) {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 600)
    const buttonTimer = setTimeout(() => setShowButton(true), 2200)
    return () => {
      clearTimeout(subtitleTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  const handleInitialize = () => {
    setIsExiting(true)
    setTimeout(onInitialize, 600)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${isExiting ? "animate-fade-out" : ""}`}
      style={{ background: "hsl(222 59% 3%)" }}
    >
      {/* Video Background Placeholder */}
      <div
        id="hero-video-bg"
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(270 70% 12% / 0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, hsl(190 95% 20% / 0.3) 0%, transparent 50%), hsl(222 59% 3%)",
        }}
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      <ScanLine />
      <GridOverlay />

      {/* Center Stage */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        {/* Title */}
        <h1 className="animate-float-up text-7xl font-black tracking-tighter text-foreground sm:text-8xl md:text-9xl">
          <span className="animate-glitch inline-block">ALLOC</span>
          <span className="text-primary neon-cyan">8</span>
        </h1>

        {/* Subtitle - Typewriter Badge */}
        {showSubtitle && (
          <div
            className="animate-fade-in flex items-center gap-2 rounded-full border border-secondary/50 bg-secondary/10 px-5 py-2"
          >
            <Zap className="h-4 w-4 text-secondary" />
            <span className="font-mono text-sm tracking-[0.3em] text-secondary">
              <TypewriterText text="AUTOMATE" delay={100} />
            </span>
          </div>
        )}

        {/* Initialize Button */}
        {showButton && (
          <button
            onClick={handleInitialize}
            className="animate-float-up animate-pulse-neon mt-8 flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/10 px-8 py-4 font-mono text-sm tracking-widest text-primary transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            INITIALIZE SYSTEM
          </button>
        )}
      </div>

      {/* System Status Ticker */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
          System Status: <span className="text-emerald-400">Online</span>
        </span>
      </div>
    </div>
  )
}
