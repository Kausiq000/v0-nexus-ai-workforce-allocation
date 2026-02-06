import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Orbitron } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })

export const metadata: Metadata = {
  title: 'ALLOC8OR - Smart Factory Workforce System',
  description: 'Next-generation AI-powered workforce allocation for smart factories. Digital twin visualization, predictive scheduling, and autonomous resource orchestration.',
}

export const viewport: Viewport = {
  themeColor: '#22d3ee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_orbitron.variable}`}>{children}</body>
    </html>
  )
}
