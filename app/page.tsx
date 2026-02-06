"use client"

import { useState } from "react"
import { LandingLayer } from "@/components/landing-layer"
import { LoginPortal } from "@/components/login-portal"
import { CommandCenter } from "@/components/command-center"
import { WorkerDashboard } from "@/components/worker-dashboard"

type View = "landing" | "login" | "admin" | "worker"

export default function Page() {
  const [view, setView] = useState<View>("landing")

  const handleLogout = () => setView("login")

  return (
    <>
      {view === "landing" && (
        <LandingLayer onInitialize={() => setView("login")} />
      )}
      {view === "login" && (
        <LoginPortal
          onSelectRole={(role) => {
            if (role === "admin") {
              setView("admin")
            } else {
              setView("worker")
            }
          }}
        />
      )}
      {view === "admin" && <CommandCenter onLogout={handleLogout} />}
      {view === "worker" && <WorkerDashboard onLogout={handleLogout} />}
    </>
  )
}
