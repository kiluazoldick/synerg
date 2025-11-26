"use client"

import { useState, useEffect } from "react"
import { loadData, saveData } from "@/lib/storage"
import type { ERPData, Order } from "@/lib/types"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { colors } from "@/lib/theme"

interface OrdersModuleProps {
  isDark: boolean
}

export function OrdersModule({ isDark }: OrdersModuleProps) {
  const [data, setData] = useState<ERPData | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Order>>({})
  const [showForm, setShowForm] = useState(false)
  const palette = isDark ? colors.dark : colors.light

  useEffect(() => {
    setData(loadData())
  }, [])

  if (!data) return <div style={{ padding: "20px", color: palette.text.secondary }}>Chargement...</div>

  const getClientName = (clientId: string) => {
    return data.clients.find((c) => c.id === clientId)?.name || "Client inconnu"
  }

  const handleAddOrder = () => {
    if (!formData.clientId || !formData.orderNumber) return

    const newOrder: Order = {
      id: Date.now().toString(),
      clientId: formData.clientId,
      orderNumber: formData.orderNumber,
      status: (formData.status as any) || "draft",
      totalAmount: formData.totalAmount || 0,
      marginAmount: formData.marginAmount || 0,
      items: formData.items || [],
      createdAt: new Date().toISOString(),
    }

    const updatedData = { ...data, orders: [...data.orders, newOrder] }
    saveData(updatedData)
    setData(updatedData)
    setShowForm(false)
    setFormData({})
  }

  const handleUpdateOrder = (id: string) => {
    if (!formData.clientId || !formData.orderNumber) return

    const updatedOrders = data.orders.map((o) =>
      o.id === id
        ? {
            ...o,
            clientId: formData.clientId,
            orderNumber: formData.orderNumber,
            status: formData.status || o.status,
            totalAmount: formData.totalAmount || o.totalAmount,
            marginAmount: formData.marginAmount || o.marginAmount,
          }
        : o,
    )

    const updatedData = { ...data, orders: updatedOrders }
    saveData(updatedData)
    setData(updatedData)
    setEditingId(null)
    setFormData({})
    setShowForm(false)
  }

  const handleDeleteOrder = (id: string) => {
    const updatedData = { ...data, orders: data.orders.filter((o) => o.id !== id) }
    saveData(updatedData)
    setData(updatedData)
  }

  const startEdit = (order: Order) => {
    setEditingId(order.id)
    setFormData(order)
    setShowForm(true)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; text: string }> = isDark
      ? {
          confirmed: { bg: "#164e63", text: "#86efac" },
          pending: { bg: "#78350f", text: "#fcd34d" },
          draft: { bg: "#374151", text: "#e5e7eb" },
          completed: { bg: "#0c4a6e", text: "#38bdf8" },
        }
      : {
          confirmed: { bg: "#dcfce7", text: "#166534" },
          pending: { bg: "#fef3c7", text: "#92400e" },
          draft: { bg: "#f3f4f6", text: "#374151" },
          completed: { bg: "#dbeafe", text: "#1e40af" },
        }
    return colors[status] || colors.draft
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
            Gestion des commandes
          </h1>
          <p style={{ fontSize: "14px", color: palette.text.secondary, margin: 0 }}>
            Total: {data.orders.length} commandes
          </p>
        </div>
        <button
          onClick={() => {
            setEditingId(null)
            setFormData({})
            setShowForm(!showForm)
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 16px",
            backgroundColor: palette.accent.blue,
            color: palette.text.inverse,
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          <Plus size={18} /> Nouvelle commande
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: palette.text.primary }}>
            {editingId ? "Modifier la commande" : "Nouvelle commande"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <select
              value={formData.clientId || ""}
              onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              style={{
                padding: "10px 12px",
                border: `1px solid ${palette.border}`,
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
              }}
            >
              <option value="">Sélectionner un client</option>
              {data.clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="N° de commande"
              value={formData.orderNumber || ""}
              onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
              style={{
                padding: "10px 12px",
                border: `1px solid ${palette.border}`,
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
              }}
            />

            <input
              type="number"
              placeholder="Montant total (XAF)"
              value={formData.totalAmount || ""}
              onChange={(e) => setFormData({ ...formData, totalAmount: Number.parseFloat(e.target.value) })}
              style={{
                padding: "10px 12px",
                border: `1px solid ${palette.border}`,
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
              }}
            />

            <input
              type="number"
              placeholder="Marge (XAF)"
              value={formData.marginAmount || ""}
              onChange={(e) => setFormData({ ...formData, marginAmount: Number.parseFloat(e.target.value) })}
              style={{
                padding: "10px 12px",
                border: `1px solid ${palette.border}`,
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
              }}
            />

            <select
              value={formData.status || "draft"}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              style={{
                padding: "10px 12px",
                border: `1px solid ${palette.border}`,
                borderRadius: "8px",
                fontSize: "14px",
                fontFamily: "inherit",
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
              }}
            >
              <option value="draft">Brouillon</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmée</option>
              <option value="completed">Complétée</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => (editingId ? handleUpdateOrder(editingId) : handleAddOrder())}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: palette.accent.blue,
                color: palette.text.inverse,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {editingId ? "Mettre à jour" : "Ajouter"}
            </button>
            <button
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
                setFormData({})
              }}
              style={{
                flex: 1,
                padding: "10px 16px",
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
                border: `1px solid ${palette.border}`,
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: palette.text.tertiary,
              backgroundColor: palette.bg.tertiary,
              borderRadius: "12px",
              border: `1px solid ${palette.border}`,
            }}
          >
            Aucune commande. Créez-en une nouvelle.
          </div>
        ) : (
          data.orders.map((order) => {
            const statusColor = getStatusColor(order.status)
            return (
              <div
                key={order.id}
                style={{
                  backgroundColor: palette.bg.secondary,
                  border: `1px solid ${palette.border}`,
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: palette.shadow,
                  transition: "box-shadow 0.2s",
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = palette.shadowMd)}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = palette.shadow)}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h3
                      style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0", color: palette.text.primary }}
                    >
                      {order.orderNumber}
                    </h3>
                    <p style={{ fontSize: "13px", color: palette.text.secondary, margin: 0 }}>
                      {getClientName(order.clientId)}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span
                      style={{
                        padding: "6px 12px",
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {order.status}
                    </span>
                    <button
                      onClick={() => startEdit(order)}
                      style={{
                        padding: "8px",
                        backgroundColor: palette.bg.tertiary,
                        border: `1px solid ${palette.border}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.2s",
                        color: palette.text.secondary,
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = palette.border)}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = palette.bg.tertiary)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      style={{
                        padding: "8px",
                        backgroundColor: isDark ? "#7f1d1d" : "#fef2f2",
                        border: `1px solid ${isDark ? "#991b1b" : "#fee2e2"}`,
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background-color 0.2s",
                        color: palette.accent.red,
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "16px" }}
                >
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Montant total</p>
                    <p style={{ fontSize: "18px", fontWeight: "700", color: palette.accent.blue, margin: 0 }}>
                      {order.totalAmount.toFixed(0)} XAF
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Marge</p>
                    <p style={{ fontSize: "18px", fontWeight: "700", color: palette.accent.teal, margin: 0 }}>
                      {order.marginAmount.toFixed(0)} XAF
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>% Marge</p>
                    <p style={{ fontSize: "18px", fontWeight: "700", color: palette.text.primary, margin: 0 }}>
                      {((order.marginAmount / order.totalAmount) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
