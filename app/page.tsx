"use client"

import { useState, useEffect } from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Dashboard } from "@/components/modules/dashboard"
import { ClientsModule } from "@/components/modules/clients"
import { OrdersModule } from "@/components/modules/orders"
import { InvoicesModule } from "@/components/modules/invoices"
import { InventoryModule } from "@/components/modules/inventory"
import { SuppliersModule } from "@/components/modules/suppliers"
import { DocumentationModule } from "@/components/modules/documentation"

export default function Home() {
  const [currentModule, setCurrentModule] = useState<string>("dashboard")
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("synerg-theme")
    if (saved) {
      setIsDark(saved === "dark")
    }
  }, [])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("synerg-theme", newDark ? "dark" : "light")
  }

  const renderModule = () => {
    switch (currentModule) {
      case "dashboard":
        return <Dashboard isDark={isDark} />
      case "clients":
        return <ClientsModule isDark={isDark} />
      case "orders":
        return <OrdersModule isDark={isDark} />
      case "invoices":
        return <InvoicesModule isDark={isDark} />
      case "inventory":
        return <InventoryModule isDark={isDark} />
      case "suppliers":
        return <SuppliersModule isDark={isDark} />
      case "documentation":
        return <DocumentationModule isDark={isDark} />
      default:
        return <Dashboard isDark={isDark} />
    }
  }

  return (
    <MainLayout
      currentModule={currentModule}
      onModuleChange={setCurrentModule}
      isDark={isDark}
      onToggleTheme={toggleTheme}
    >
      {renderModule()}
    </MainLayout>
  )
}
