"use client"

import { useState, useEffect } from "react"
import { loadData, saveData } from "@/lib/storage"
import type { ERPData, Invoice } from "@/lib/types"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { colors } from "@/lib/theme"

interface InvoicesModuleProps {
  isDark: boolean
}

export function InvoicesModule({ isDark }: InvoicesModuleProps) {
  const [data, setData] = useState<ERPData | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Invoice>>({})
  const [showForm, setShowForm] = useState(false)
  const palette = isDark ? colors.dark : colors.light

  useEffect(() => {
    setData(loadData())
  }, [])

  if (!data) return <div style={{ padding: "20px", color: palette.text.secondary }}>Chargement...</div>

  const getClientName = (clientId: string) => {
    return data.clients.find((c) => c.id === clientId)?.name || "Client inconnu"
  }

  const handleAddInvoice = () => {
    if (!formData.clientId || !formData.invoiceNumber) return

    const newInvoice: Invoice = {
      id: Date.now().toString(),
      clientId: formData.clientId,
      invoiceNumber: formData.invoiceNumber,
      totalAmount: formData.totalAmount || 0,
      marginAmount: formData.marginAmount || 0,
      status: (formData.status as any) || "draft",
      dueDate: formData.dueDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    const updatedData = { ...data, invoices: [...data.invoices, newInvoice] }
    saveData(updatedData)
    setData(updatedData)
    setShowForm(false)
    setFormData({})
  }

  const handleUpdateInvoice = (id: string) => {
    if (!formData.clientId || !formData.invoiceNumber) return

    const updatedInvoices = data.invoices.map((i) =>
      i.id === id
        ? {
            ...i,
            clientId: formData.clientId,
            invoiceNumber: formData.invoiceNumber,
            totalAmount: formData.totalAmount || i.totalAmount,
            marginAmount: formData.marginAmount || i.marginAmount,
            status: formData.status || i.status,
            dueDate: formData.dueDate || i.dueDate,
          }
        : i,
    )

    const updatedData = { ...data, invoices: updatedInvoices }
    saveData(updatedData)
    setData(updatedData)
    setEditingId(null)
    setFormData({})
    setShowForm(false)
  }

  const handleDeleteInvoice = (id: string) => {
    const updatedData = { ...data, invoices: data.invoices.filter((i) => i.id !== id) }
    saveData(updatedData)
    setData(updatedData)
  }

  const startEdit = (invoice: Invoice) => {
    setEditingId(invoice.id)
    setFormData(invoice)
    setShowForm(true)
  }

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = isDark
      ? {
          paid: { bg: "#164e63", text: "#86efac" },
          sent: { bg: "#0c4a6e", text: "#38bdf8" },
          draft: { bg: "#374151", text: "#e5e7eb" },
        }
      : {
          paid: { bg: "#dcfce7", text: "#166534" },
          sent: { bg: "#dbeafe", text: "#1e40af" },
          draft: { bg: "#f3f4f6", text: "#374151" },
        }
    return colorMap[status] || colorMap.draft
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", padding: "20px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
            Gestion des factures
          </h1>
          <p style={{ fontSize: "14px", color: palette.text.secondary, margin: 0 }}>
            Total: {data.invoices.length} factures
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
          <Plus size={18} /> Nouvelle facture
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
            {editingId ? "Modifier la facture" : "Nouvelle facture"}
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
              placeholder="N° de facture"
              value={formData.invoiceNumber || ""}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
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

            <input
              type="date"
              value={formData.dueDate?.split("T")[0] || ""}
              onChange={(e) => setFormData({ ...formData, dueDate: new Date(e.target.value).toISOString() })}
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
              <option value="sent">Envoyée</option>
              <option value="paid">Payée</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px", flexDirection: "column", alignItems: "center" }}>
            <button
              onClick={() => (editingId ? handleUpdateInvoice(editingId) : handleAddInvoice())}
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

      {/* Invoices List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.invoices.length === 0 ? (
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
            Aucune facture. Créez-en une nouvelle.
          </div>
        ) : (
          data.invoices.map((invoice) => {
            const statusColor = getStatusColor(invoice.status)
            return (
              <div
                key={invoice.id}
                style={{
                  backgroundColor: palette.bg.secondary,
                  border: `1px solid ${palette.border}`,
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  boxShadow: palette.shadow,
                  transition: "box-shadow 0.2s",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseOver={(e) => (e.currentTarget.style.boxShadow = palette.shadowMd)}
                onMouseOut={(e) => (e.currentTarget.style.boxShadow = palette.shadow)}
              >
                <div style={{ width: "100%" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 4px 0", color: palette.text.primary }}>
                    {invoice.invoiceNumber}
                  </h3>
                  <p style={{ fontSize: "13px", color: palette.text.secondary, margin: "4px 0" }}>
                    {getClientName(invoice.clientId)}
                  </p>
                  <p style={{ fontSize: "13px", color: palette.text.tertiary, margin: "4px 0" }}>
                    Échéance: {new Date(invoice.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div style={{ textAlign: "right", width: "100%", marginTop: "24px" }}>
                  <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Montant</p>
                  <p style={{ fontSize: "18px", fontWeight: "700", color: palette.accent.blue, margin: "0 0 12px 0" }}>
                    {invoice.totalAmount.toFixed(0)} XAF
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        padding: "6px 12px",
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {invoice.status}
                    </span>
                    <button
                      onClick={() => startEdit(invoice)}
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
                        width: "100%",
                        textAlign: "center",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = palette.border)}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = palette.bg.tertiary)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteInvoice(invoice.id)}
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
                        width: "100%",
                        textAlign: "center",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.opacity = "0.8")}
                      onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <Trash2 size={16} />
                    </button>
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
