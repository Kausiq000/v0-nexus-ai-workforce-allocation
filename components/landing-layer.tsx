"use client"

import React from "react"

import { useState, useEffect, useCallback } from "react"
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

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  type: "star" | "diamond" | "dot"
}

function SparkleParticle({ sparkle }: { sparkle: Sparkle }) {
  const shapes: Record<string, React.ReactNode> = {
    star: (
      <svg width={sparkle.size} height={sparkle.size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
          fill="hsl(190 95% 70%)"
        />
      </svg>
    ),
    diamond: (
      <svg width={sparkle.size * 0.8} height={sparkle.size * 0.8} viewBox="0 0 16 16" fill="none">
        <rect
          x="8" y="0" width="8" height="8"
          transform="rotate(45 8 8)"
          fill="hsl(270 70% 70%)"
        />
      </svg>
    ),
    dot: (
      <div
        className="rounded-full"
        style={{
          width: sparkle.size * 0.4,
          height: sparkle.size * 0.4,
          background: "hsl(190 95% 80%)",
          boxShadow: "0 0 6px hsl(190 95% 53%)",
        }}
      />
    ),
  }

  return (
    <div
      className="absolute pointer-events-none animate-sparkle-float"
      style={{
        left: `${sparkle.x}%`,
        top: `${sparkle.y}%`,
        animationDelay: `${sparkle.delay}s`,
        animationDuration: `${1.5 + Math.random() * 1.5}s`,
      }}
    >
      {shapes[sparkle.type]}
    </div>
  )
}

function TypewriterText({ text, delay = 60 }: { text: string; delay?: number }) {
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
      {!done && <span className="animate-blink text-primary">|</span>}
    </span>
  )
}

function ScanLine() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-20">
      <div className="animate-scan-line absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
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
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [allLettersDone, setAllLettersDone] = useState(false)

  // Generate sparkles around the title once letters are revealed
  const generateSparkles = useCallback(() => {
    const types: Sparkle["type"][] = ["star", "diamond", "dot"]
    const newSparkles: Sparkle[] = Array.from({ length: 14 }, (_, i) => ({
      id: Date.now() + i,
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 30,
      size: 8 + Math.random() * 14,
      delay: Math.random() * 2,
      type: types[Math.floor(Math.random() * types.length)],
    }))
    setSparkles(newSparkles)
  }, [])

  useEffect(() => {
    const letterTimers = TITLE_LETTERS.map((_, i) =>
      setTimeout(() => {
        setLettersRevealed(i + 1)
        if (i === TITLE_LETTERS.length - 1) {
          setAllLettersDone(true)
        }
      }, 400 + i * 150)
    )
    const subtitleTimer = setTimeout(
      () => setShowSubtitle(true),
      400 + TITLE_LETTERS.length * 150 + 500
    )
    const buttonTimer = setTimeout(
      () => setShowButton(true),
      400 + TITLE_LETTERS.length * 150 + 1600
    )
    return () => {
      letterTimers.forEach(clearTimeout)
      clearTimeout(subtitleTimer)
      clearTimeout(buttonTimer)
    }
  }, [])

  // Continuously generate sparkles after reveal
  useEffect(() => {
    if (!allLettersDone) return
    generateSparkles()
    const interval = setInterval(generateSparkles, 3000)
    return () => clearInterval(interval)
  }, [allLettersDone, generateSparkles])

  const handleInitialize = () => {
    setIsExiting(true)
    setTimeout(onInitialize, 600)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${isExiting ? "animate-fade-out" : ""}`}
    >
      {/* Video Background - adjusted for light overlay */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ filter: "brightness(0.9) saturate(0.85)" }}
        src="/images/user-ai-generation-lql16vybirwo-1080p.mp4"
      />

      {/* Heavy Misty Overlay - Clean Industrial Light Mode */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: "#F4F7FA" }}
        style={{ opacity: 0.8 }}
      />

      <ScanLine />

      {/* Grid overlay - subtle */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(190 95% 53%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 95% 53%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Center Stage */}
      <div
        className="relative z-30 flex flex-col items-center gap-6"
        style={{ perspective: "1000px" }}
      >
        {/* Top label */}
        <div
          className="flex items-center gap-4 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary/40" />
          <span className="font-heading text-[10px] tracking-[0.6em] uppercase text-primary/60">
            workforce orchestration
          </span>
          <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary/40" />
        </div>

        {/* Sparkle Layer */}
        <div className="absolute inset-0 z-40 pointer-events-none">
          {sparkles.map((s) => (
            <SparkleParticle key={s.id} sparkle={s} />
          ))}
        </div>

        {/* Title: ALLOC8OR - Stroke + Spark + Quirky Bounce */}
        <div className="relative animate-title-glow">
          <h1
            className="flex items-baseline font-display select-none"
            role="heading"
            aria-level={1}
            aria-label="ALLOC8OR"
          >
            {TITLE_LETTERS.map((letter, i) => {
              const isAccent = letter.accent
              return (
                <span
                  key={i}
                  className={`inline-block transition-all duration-300 ${
                    i < lettersRevealed ? "animate-letter-drop" : "opacity-0"
                  } ${isAccent ? "animate-neon-stroke" : ""}`}
                  style={{
                    animationDelay:
                      i < lettersRevealed ? `${i * 0.15}s` : "0s",
                    fontSize: "clamp(3.5rem, 10vw, 9rem)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    marginRight: i === 4 ? "0.04em" : "0.01em",
                    WebkitTextStroke: isAccent
                      ? "2px rgb(58, 110, 165)"
                      : "1.5px rgb(175, 198, 220, 0.5)",
                    color: isAccent ? "transparent" : "transparent",
                    textShadow: isAccent
                      ? "0 0 30px rgb(58, 110, 165, 0.4), 0 0 60px rgb(232, 184, 109, 0.2)"
                      : "0 0 15px rgb(30, 41, 51, 0.08)",
                    paintOrder: "stroke fill",
                  }}
                >
                  {letter.char}
                </span>
              )
            })}
          </h1>

          {/* Underline shimmer */}
          <div className="relative mt-2 h-[2px] w-full overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
            <div
              className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-primary/50 to-transparent"
              style={{ animation: "shimmer-line 2.5s ease-in-out infinite" }}
            />
          </div>
        </div>

        {/* Subtitle Badge */}
        {showSubtitle && (
          <div className="animate-fade-in flex items-center gap-3 rounded-full border border-secondary/30 bg-white/50 px-7 py-2.5 backdrop-blur-xl shadow-sm">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span className="font-heading text-xs sm:text-sm tracking-[0.35em] text-primary/70">
              <TypewriterText
                text="SMART FACTORY ORCHESTRATION"
                delay={45}
              />
            </span>
          </div>
        )}

        {/* Initialize Button */}
        {showButton && (
          <button
            onClick={handleInitialize}
            className="animate-float-up group relative mt-6 flex items-center gap-3 overflow-hidden rounded-full border-2 border-primary bg-primary px-12 py-4 font-heading text-xs sm:text-sm tracking-[0.3em] text-white backdrop-blur-md transition-all duration-500 hover:border-primary/80 hover:bg-primary/90 hover:tracking-[0.45em] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 active:scale-95 shadow-lg hover:shadow-xl"
          >
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span>START</span>
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-5 sm:px-10 bg-white/30 backdrop-blur-sm">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground/60">
          v4.2.0
        </span>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider text-muted-foreground/70">
            System Status:{" "}
            <span className="text-accent/80 font-semibold">Online</span>
          </span>
        </div>
      </div>
    </div>
  )
}
