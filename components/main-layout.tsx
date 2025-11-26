"use client"

import type React from "react"
import { useState } from "react"
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Package,
  Truck,
  HelpCircle,
  Moon,
  Sun,
} from "lucide-react"
import { colors } from "@/lib/theme"

interface MainLayoutProps {
  children: React.ReactNode
  currentModule: string
  onModuleChange: (module: string) => void
  isDark: boolean
  onToggleTheme: () => void
}

export function MainLayout({ children, currentModule, onModuleChange, isDark, onToggleTheme }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const palette = isDark ? colors.dark : colors.light

  const modules = [
    { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
    { id: "clients", label: "Clients", icon: Users },
    { id: "orders", label: "Commandes", icon: ShoppingCart },
    { id: "invoices", label: "Factures", icon: FileText },
    { id: "inventory", label: "Stocks", icon: Package },
    { id: "suppliers", label: "Fournisseurs", icon: Truck },
    { id: "documentation", label: "Documentation", icon: HelpCircle },
  ]

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: palette.bg.primary }}>
      {/* Sidebar */}
      <aside
        style={{
          backgroundColor: palette.bg.secondary,
          borderRight: `1px solid ${palette.border}`,
          width: sidebarOpen ? "280px" : "80px",
          transition: "width 0.3s ease",
          overflowY: "auto",
          boxShadow: palette.shadow,
        }}
      >
        <div
          style={{
            padding: "24px 20px",
            borderBottom: `1px solid ${palette.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {sidebarOpen && (
            <h1 style={{ fontSize: "18px", fontWeight: "700", color: palette.accent.blue, margin: 0 }}>SynergERP</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              padding: "8px",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              color: palette.text.secondary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = palette.bg.tertiary)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav style={{ padding: "12px" }}>
          {modules.map((module) => {
            const Icon = module.icon
            const isActive = currentModule === module.id

            return (
              <button
                key={module.id}
                onClick={() => onModuleChange(module.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  marginBottom: "8px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: isActive ? palette.accent.blue : "transparent",
                  color: isActive ? palette.text.inverse : palette.text.secondary,
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "500",
                  transition: "all 0.2s ease",
                  fontFamily: "'Geist', sans-serif",
                }}
                onMouseOver={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = palette.bg.tertiary
                  }
                }}
                onMouseOut={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent"
                  }
                }}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span>{module.label}</span>}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          backgroundColor: palette.bg.primary,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Theme toggle button in header */}
        <div
          style={{
            padding: "16px 32px",
            borderBottom: `1px solid ${palette.border}`,
            display: "flex",
            justifyContent: "flex-end",
            backgroundColor: palette.bg.secondary,
          }}
        >
          <button
            onClick={onToggleTheme}
            style={{
              padding: "8px 12px",
              backgroundColor: palette.bg.tertiary,
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              cursor: "pointer",
              color: palette.text.secondary,
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontFamily: "'Geist', sans-serif",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = palette.bg.secondary
              e.currentTarget.style.borderColor = palette.accent.blue
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = palette.bg.tertiary
              e.currentTarget.style.borderColor = palette.border
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            {isDark ? "Clair" : "Sombre"}
          </button>
        </div>

        <div
          style={{
            padding: "32px",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {children}
        </div>
      </main>
    </div>
  )
}
