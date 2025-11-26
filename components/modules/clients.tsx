"use client"

import { useState, useEffect } from "react"
import { loadData, saveData } from "@/lib/storage"
import type { ERPData, Client } from "@/lib/types"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { colors } from "@/lib/theme"

interface ClientsModuleProps {
  isDark: boolean
}

export function ClientsModule({ isDark }: ClientsModuleProps) {
  const [data, setData] = useState<ERPData | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Client>>({})
  const palette = isDark ? colors.dark : colors.light

  useEffect(() => {
    setData(loadData())
  }, [])

  const handleAddClient = () => {
    if (!data || !formData.name) return

    const newClient: Client = {
      id: Date.now().toString(),
      name: formData.name || "",
      email: formData.email || "",
      phone: formData.phone || "",
      company: formData.company || "",
      createdAt: new Date().toISOString(),
    }

    const updatedData = {
      ...data,
      clients: editingId
        ? data.clients.map((c) => (c.id === editingId ? { ...c, ...formData } : c))
        : [...data.clients, newClient],
    }

    setData(updatedData)
    saveData(updatedData)
    setFormData({})
    setShowForm(false)
    setEditingId(null)
  }

  const handleDelete = (id: string) => {
    if (!data) return
    const updatedData = {
      ...data,
      clients: data.clients.filter((c) => c.id !== id),
    }
    setData(updatedData)
    saveData(updatedData)
  }

  if (!data) return <div style={{ padding: "20px", color: palette.text.secondary }}>Chargement...</div>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
            Gestion des clients
          </h1>
          <p style={{ fontSize: "14px", color: palette.text.secondary, margin: 0 }}>
            Total: {data.clients.length} clients
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
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
          <Plus size={18} /> Ajouter un client
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div
          style={{
            backgroundColor: palette.bg.secondary,
            border: `2px solid ${palette.accent.teal}`,
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: "600", margin: 0, color: palette.text.primary }}>
            {editingId ? "Modifier" : "Ajouter"} un client
          </h2>
          <input
            placeholder="Nom du client"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              backgroundColor: palette.bg.tertiary,
              color: palette.text.primary,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = palette.accent.blue)}
            onBlur={(e) => (e.currentTarget.style.borderColor = palette.border)}
          />
          <input
            placeholder="Email"
            value={formData.email || ""}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              backgroundColor: palette.bg.tertiary,
              color: palette.text.primary,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = palette.accent.blue)}
            onBlur={(e) => (e.currentTarget.style.borderColor = palette.border)}
          />
          <input
            placeholder="Téléphone"
            value={formData.phone || ""}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              backgroundColor: palette.bg.tertiary,
              color: palette.text.primary,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = palette.accent.blue)}
            onBlur={(e) => (e.currentTarget.style.borderColor = palette.border)}
          />
          <input
            placeholder="Entreprise"
            value={formData.company || ""}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              fontFamily: "inherit",
              backgroundColor: palette.bg.tertiary,
              color: palette.text.primary,
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = palette.accent.blue)}
            onBlur={(e) => (e.currentTarget.style.borderColor = palette.border)}
          />
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleAddClient}
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
              Enregistrer
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
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = palette.bg.tertiary)}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = palette.bg.tertiary)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}

      {/* Clients List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.clients.length === 0 ? (
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
            Aucun client. Commencez par en ajouter un.
          </div>
        ) : (
          data.clients.map((client) => (
            <div
              key={client.id}
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
              }}
              onMouseOver={(e) => (e.currentTarget.style.boxShadow = palette.shadowMd)}
              onMouseOut={(e) => (e.currentTarget.style.boxShadow = palette.shadow)}
            >
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0", color: palette.text.primary }}>
                  {client.name}
                </h3>
                <p style={{ fontSize: "13px", color: palette.text.secondary, margin: "4px 0" }}>{client.company}</p>
                <p style={{ fontSize: "13px", color: palette.text.tertiary, margin: "4px 0" }}>{client.email}</p>
                <p style={{ fontSize: "13px", color: palette.text.tertiary, margin: "4px 0" }}>{client.phone}</p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    setEditingId(client.id)
                    setFormData(client)
                    setShowForm(true)
                  }}
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
                  onClick={() => handleDelete(client.id)}
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
          ))
        )}
      </div>
    </div>
  )
}
