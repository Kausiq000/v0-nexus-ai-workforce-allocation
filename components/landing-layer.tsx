"use client"

import { useState, useEffect } from "react"
import { Zap } from "lucide-react"

const TITLE_LETTERS = [
  { char: "A", accent: false },
  { char: "L", accent: false },
  { char: "L", accent: false },
  { char: "O", accent: false },
  { char: "C", accent: false },
  { char: "8", accent: true },
  { char: "O", accent: true },
  { char: "R", accent: false },
]

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
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      <div className="animate-scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  )
}

function GridOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(190 95% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 95% 53%) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
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
  const [lettersRevealed, setLettersRevealed] = useState(0)

  useEffect(() => {
    // Stagger letter reveals
    const letterTimers = TITLE_LETTERS.map((_, i) =>
      setTimeout(() => setLettersRevealed(i + 1), 300 + i * 120)
    )
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 300 + TITLE_LETTERS.length * 120 + 400)
    const buttonTimer = setTimeout(() => setShowButton(true), 300 + TITLE_LETTERS.length * 120 + 1400)
    return () => {
      letterTimers.forEach(clearTimeout)
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${isExiting ? "animate-fade-out" : ""}`}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src="/images/user-ai-generation-lql16vybirwo-1080p.mp4"
      />

      {/* Dark overlay layers for text readability */}
      <div className="absolute inset-0 z-[2]" style={{ background: "hsl(222 59% 3% / 0.55)" }} />
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      <div className="absolute inset-0 z-[4] bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[4]"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(222 59% 3% / 0.7) 100%)",
        }}
      />

      <GridOverlay />
      <ScanLine />

      {/* Center Stage */}
      <div className="relative z-30 flex flex-col items-center gap-8" style={{ perspective: "800px" }}>
        {/* Decorative line above title */}
        <div className="flex items-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-primary/60">
            workforce ai
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/60" />
        </div>

        {/* Title: ALLOC8OR with letter-by-letter reveal */}
        <h1 className="flex items-baseline gap-1 sm:gap-2 md:gap-4 font-display">
          {TITLE_LETTERS.map((letter, i) => (
            <span
              key={i}
              className={`inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[0.08em] sm:tracking-[0.12em] md:tracking-[0.18em] transition-all duration-300 ${
                i < lettersRevealed ? "animate-letter-reveal" : "opacity-0"
              } ${
                letter.accent
                  ? "text-primary animate-neon-breathe"
                  : "text-foreground"
              }`}
              style={{
                animationDelay: letter.accent ? `${i * 0.15}s` : "0s",
              }}
            >
              {letter.char}
            </span>
          ))}
        </h1>

        {/* Shimmer line under title */}
        <div className="relative h-px w-full max-w-md overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "1.5s" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <div
            className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-primary/80 to-transparent"
            style={{ animation: "shimmer-line 3s ease-in-out infinite" }}
          />
        </div>

        {/* Subtitle - Typewriter Badge */}
        {showSubtitle && (
          <div className="animate-fade-in flex items-center gap-3 rounded-full border border-secondary/30 bg-secondary/5 px-6 py-2.5 backdrop-blur-md">
            <Zap className="h-3.5 w-3.5 text-secondary" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.35em] text-secondary/90">
              <TypewriterText text="SMART FACTORY ORCHESTRATION" delay={50} />
            </span>
          </div>
        )}

        {/* Initialize Button */}
        {showButton && (
          <button
            onClick={handleInitialize}
            className="animate-float-up animate-pulse-neon group relative mt-4 flex items-center gap-3 overflow-hidden rounded-lg border border-primary/30 bg-primary/10 px-10 py-4 font-mono text-xs sm:text-sm tracking-[0.25em] text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary/20 hover:border-primary/60 hover:tracking-[0.35em] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span>INITIALIZE SYSTEM</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40">
          v4.2.0
        </span>

        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground/50">
            System Status: <span className="text-emerald-400/80">Online</span>
          </span>
        </div>
      </div>
    </div>
  )
}
