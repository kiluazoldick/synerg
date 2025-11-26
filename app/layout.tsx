import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SynergERP - Gestion PME",
  description: "Système de gestion intégré pour PME avec automatisation des processus et reporting en temps réel",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: "'Geist', sans-serif",
          margin: 0,
          padding: 0,
          backgroundColor: "#fafbfc",
          color: "#1a1a1a",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
