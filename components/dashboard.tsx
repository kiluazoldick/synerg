"use client"

import { useState, useEffect } from "react"
import { loadData } from "@/lib/storage"
import type { ERPData } from "@/lib/types"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"
import { colors } from "@/lib/theme"

interface DashboardProps {
  isDark: boolean
}

export function Dashboard({ isDark }: DashboardProps) {
  const [data, setData] = useState<ERPData | null>(null)
  const palette = isDark ? colors.dark : colors.light

  useEffect(() => {
    setData(loadData())
  }, [])

  if (!data)
    return <div style={{ padding: "20px", textAlign: "center", color: palette.text.secondary }}>Chargement...</div>

  const totalRevenue = data.invoices.reduce((sum, inv) => sum + inv.totalAmount, 0)
  const totalMargin = data.invoices.reduce((sum, inv) => sum + inv.marginAmount, 0)
  const marginPercentage = totalRevenue > 0 ? ((totalMargin / totalRevenue) * 100).toFixed(1) : "0"
  const clientCount = data.clients.length
  const orderCount = data.orders.length

  const chartData = [
    { month: "Jan", revenue: 2400, margin: 1240 },
    { month: "Fév", revenue: 1398, margin: 721 },
    { month: "Mar", revenue: 9800, margin: 5290 },
    { month: "Avr", revenue: 3908, margin: 2000 },
    { month: "Mai", revenue: 4800, margin: 2181 },
  ]

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
          Tableau de bord
        </h1>
        <p style={{ fontSize: "15px", color: palette.text.secondary, margin: 0 }}>Vue d'ensemble de votre activité</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
        {/* Chiffre d'affaires - Blue Primary */}
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: palette.shadow,
            borderLeft: `4px solid ${palette.accent.blue}`,
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}
          >
            <div style={{ fontSize: "13px", fontWeight: "500", color: palette.text.secondary }}>Chiffre d'affaires</div>
            <DollarSign size={18} style={{ color: palette.accent.blue }} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: palette.accent.blue, marginBottom: "8px" }}>
            {totalRevenue.toFixed(0)} XAF
          </div>
          <div style={{ fontSize: "12px", color: palette.text.tertiary }}>+12% ce mois</div>
        </div>

        {/* Marge totale - Teal Accent */}
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: palette.shadow,
            borderLeft: `4px solid ${palette.accent.teal}`,
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}
          >
            <div style={{ fontSize: "13px", fontWeight: "500", color: palette.text.secondary }}>Marge totale</div>
            <TrendingUp size={18} style={{ color: palette.accent.teal }} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: palette.accent.teal, marginBottom: "8px" }}>
            {totalMargin.toFixed(0)} XAF
          </div>
          <div style={{ fontSize: "12px", color: palette.text.tertiary }}>{marginPercentage}% de marge</div>
        </div>

        {/* Clients */}
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: palette.shadow,
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}
          >
            <div style={{ fontSize: "13px", fontWeight: "500", color: palette.text.secondary }}>Clients</div>
            <Users size={18} style={{ color: palette.accent.teal }} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: palette.text.primary, marginBottom: "8px" }}>
            {clientCount}
          </div>
          <div style={{ fontSize: "12px", color: palette.text.tertiary }}>Clients actifs</div>
        </div>

        {/* Commandes */}
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: palette.shadow,
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}
          >
            <div style={{ fontSize: "13px", fontWeight: "500", color: palette.text.secondary }}>Commandes</div>
            <ShoppingCart size={18} style={{ color: palette.accent.teal }} />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "700", color: palette.text.primary, marginBottom: "8px" }}>
            {orderCount}
          </div>
          <div style={{ fontSize: "12px", color: palette.text.tertiary }}>Commandes en cours</div>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "20px" }}>
        {/* Bar Chart */}
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: palette.shadow,
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: palette.text.primary }}>
            Chiffre d'affaires vs Marge
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
              <XAxis dataKey="month" stroke={palette.text.secondary} />
              <YAxis stroke={palette.text.secondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: palette.bg.secondary,
                  border: `1px solid ${palette.border}`,
                  borderRadius: "8px",
                  color: palette.text.primary,
                }}
              />
              <Legend />
              <Bar dataKey="revenue" fill={palette.accent.blue} name="Chiffre d'affaires" />
              <Bar dataKey="margin" fill={palette.accent.teal} name="Marge" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            boxShadow: palette.shadow,
          }}
        >
          <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 16px 0", color: palette.text.primary }}>
            Tendance du chiffre d'affaires
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={palette.border} />
              <XAxis dataKey="month" stroke={palette.text.secondary} />
              <YAxis stroke={palette.text.secondary} />
              <Tooltip
                contentStyle={{
                  backgroundColor: palette.bg.secondary,
                  border: `1px solid ${palette.border}`,
                  borderRadius: "8px",
                  color: palette.text.primary,
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke={palette.accent.blue} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
