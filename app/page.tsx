"use client"

import { useState } from "react"
import { LandingLayer } from "@/components/landing-layer"
import { CommandCenter } from "@/components/command-center"

export default function Page() {
  const [layer, setLayer] = useState<"landing" | "command">("landing")

  return (
    <>
      {layer === "landing" && (
        <LandingLayer onInitialize={() => setLayer("command")} />
      )}
      {layer === "command" && <CommandCenter />}
    </>
  )
}
