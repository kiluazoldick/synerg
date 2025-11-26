"use client"

import { useState, useEffect } from "react"
import { loadData, saveData } from "@/lib/storage"
import type { ERPData, Supplier } from "@/lib/types"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { colors } from "@/lib/theme"

interface SuppliersModuleProps {
  isDark: boolean
}

export function SuppliersModule({ isDark }: SuppliersModuleProps) {
  const [data, setData] = useState<ERPData | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Supplier>>({})
  const [showForm, setShowForm] = useState(false)
  const palette = isDark ? colors.dark : colors.light

  useEffect(() => {
    setData(loadData())
  }, [])

  if (!data) return <div style={{ padding: "20px", color: palette.text.secondary }}>Chargement...</div>

  const handleAddSupplier = () => {
    if (!formData.name || !formData.email) return

    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      address: formData.address || "",
      category: formData.category || "Autres",
      createdAt: new Date().toISOString(),
    }

    const updatedData = editingId
      ? {
          ...data,
          suppliers: data.suppliers.map((s) => (s.id === editingId ? { ...s, ...formData } : s)),
        }
      : { ...data, suppliers: [...data.suppliers, newSupplier] }

    saveData(updatedData)
    setData(updatedData)
    setShowForm(false)
    setFormData({})
    setEditingId(null)
  }

  const handleDeleteSupplier = (id: string) => {
    const updatedData = { ...data, suppliers: data.suppliers.filter((s) => s.id !== id) }
    saveData(updatedData)
    setData(updatedData)
  }

  const startEdit = (supplier: Supplier) => {
    setEditingId(supplier.id)
    setFormData(supplier)
    setShowForm(true)
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
            Gestion des fournisseurs
          </h1>
          <p style={{ fontSize: "14px", color: palette.text.secondary, margin: 0 }}>
            Total: {data.suppliers.length} fournisseurs
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
          <Plus size={18} /> Ajouter un fournisseur
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
            {editingId ? "Modifier le fournisseur" : "Ajouter un fournisseur"}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <input
              type="text"
              placeholder="Nom du fournisseur"
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
              }}
            />

            <input
              type="email"
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
              }}
            />

            <input
              type="tel"
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
              }}
            />

            <input
              type="text"
              placeholder="Adresse"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
              value={formData.category || ""}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
              <option value="">Catégorie</option>
              <option value="Matières premières">Matières premières</option>
              <option value="Équipement">Équipement</option>
              <option value="Services">Services</option>
              <option value="Autres">Autres</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleAddSupplier}
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

      {/* Suppliers List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.suppliers.length === 0 ? (
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
            Aucun fournisseur. Commencez par en ajouter un.
          </div>
        ) : (
          data.suppliers.map((supplier) => (
            <div
              key={supplier.id}
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
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 8px 0", color: palette.text.primary }}>
                  {supplier.name}
                </h3>
                <p style={{ fontSize: "13px", color: palette.text.secondary, margin: "4px 0" }}>{supplier.email}</p>
                <p style={{ fontSize: "13px", color: palette.text.tertiary, margin: "4px 0" }}>{supplier.phone}</p>
                {supplier.address && (
                  <p style={{ fontSize: "13px", color: palette.text.tertiary, margin: "4px 0" }}>{supplier.address}</p>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <span
                  style={{
                    padding: "6px 12px",
                    backgroundColor: palette.bg.tertiary,
                    color: palette.text.primary,
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {supplier.category}
                </span>
                <button
                  onClick={() => startEdit(supplier)}
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
                  onClick={() => handleDeleteSupplier(supplier.id)}
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
