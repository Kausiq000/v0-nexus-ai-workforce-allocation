import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Space_Grotesk, Asimovian } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const _spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-space-grotesk' })
const _asimovian = Asimovian({ subsets: ['latin'], variable: '--font-asimovian' })
export const metadata: Metadata = {
  title: 'ALLOC8: AUTOMATE - Smart Factory Orchestration',
  description: 'Enterprise-grade workforce allocation system for smart factories. AI-powered scheduling, real-time floor maps, and autonomous resource orchestration.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  }
}

export const viewport: Viewport = {
  themeColor: '#3A6EA5',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_geist.variable} ${_spaceGrotesk.variable} ${_asimovian.variable}`}>{children}</body>
    </html>
  )
}
