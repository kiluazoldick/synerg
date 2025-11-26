"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadData, saveData } from "@/lib/storage"
import type { ERPData } from "@/lib/types"
import { colors } from "@/lib/theme"

interface InventoryModuleProps {
  isDark: boolean
}

export function InventoryModule({ isDark }: InventoryModuleProps) {
  const [data, setData] = useState<ERPData | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    costPrice: "",
    salePrice: "",
    quantity: "",
  })
  const palette = isDark ? colors.dark : colors.light

  useEffect(() => {
    setData(loadData())
  }, [])

  const handleAddProduct = () => {
    setFormData({ name: "", costPrice: "", salePrice: "", quantity: "" })
    setEditingId(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      costPrice: product.costPrice.toString(),
      salePrice: product.salePrice.toString(),
      quantity: product.quantity.toString(),
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDeleteProduct = (id: string) => {
    if (data && confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      const updatedData = {
        ...data,
        products: data.products.filter((p) => p.id !== id),
      }
      saveData(updatedData)
      setData(updatedData)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data || !formData.name || !formData.costPrice || !formData.salePrice || !formData.quantity) {
      alert("Veuillez remplir tous les champs")
      return
    }

    const costPrice = Number.parseFloat(formData.costPrice)
    const salePrice = Number.parseFloat(formData.salePrice)
    const quantity = Number.parseInt(formData.quantity)

    if (editingId) {
      const updatedProducts = data.products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: formData.name,
              costPrice,
              salePrice,
              quantity,
              margin: ((salePrice - costPrice) / costPrice) * 100,
            }
          : p,
      )
      const updatedData = { ...data, products: updatedProducts }
      saveData(updatedData)
      setData(updatedData)
    } else {
      const newProduct = {
        id: Date.now().toString(),
        name: formData.name,
        costPrice,
        salePrice,
        quantity,
        margin: ((salePrice - costPrice) / costPrice) * 100,
      }
      const updatedData = { ...data, products: [...data.products, newProduct] }
      saveData(updatedData)
      setData(updatedData)
    }

    setShowForm(false)
    setFormData({ name: "", costPrice: "", salePrice: "", quantity: "" })
  }

  if (!data) return <div style={{ padding: "20px", color: palette.text.secondary }}>Chargement...</div>

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "700", margin: "0 0 8px 0", color: palette.text.primary }}>
            Gestion des stocks
          </h1>
          <p style={{ fontSize: "14px", color: palette.text.secondary, margin: 0 }}>
            Total: {data.products.length} produits
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          style={{
            backgroundColor: palette.accent.blue,
            color: palette.text.inverse,
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
        >
          + Ajouter produit
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: palette.bg.tertiary,
            border: `1px solid ${palette.border}`,
            borderRadius: "12px",
            padding: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <input
            type="text"
            placeholder="Nom du produit"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: palette.bg.secondary,
              color: palette.text.primary,
            }}
          />
          <input
            type="number"
            placeholder="Prix d'achat (XAF)"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
            step="0.01"
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: palette.bg.secondary,
              color: palette.text.primary,
            }}
          />
          <input
            type="number"
            placeholder="Prix de vente (XAF)"
            value={formData.salePrice}
            onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
            step="0.01"
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: palette.bg.secondary,
              color: palette.text.primary,
            }}
          />
          <input
            type="number"
            placeholder="Quantité"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            style={{
              padding: "10px 12px",
              border: `1px solid ${palette.border}`,
              borderRadius: "8px",
              fontSize: "14px",
              backgroundColor: palette.bg.secondary,
              color: palette.text.primary,
            }}
          />
          <div style={{ display: "flex", gap: "10px", gridColumn: "1 / -1" }}>
            <button
              type="submit"
              style={{
                flex: 1,
                backgroundColor: palette.accent.teal,
                color: palette.text.inverse,
                border: "none",
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {editingId ? "Modifier" : "Ajouter"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                flex: 1,
                backgroundColor: palette.bg.tertiary,
                color: palette.text.primary,
                border: `1px solid ${palette.border}`,
                padding: "10px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      {/* Products List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {data.products.length === 0 ? (
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
            Aucun produit en stock.
          </div>
        ) : (
          data.products.map((product) => (
            <div
              key={product.id}
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
                <h3 style={{ fontSize: "16px", fontWeight: "600", margin: "0 0 12px 0", color: palette.text.primary }}>
                  {product.name}
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "16px",
                  }}
                >
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Prix d'achat</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                      {product.costPrice.toFixed(2)} XAF
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Prix de vente</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: palette.text.primary, margin: 0 }}>
                      {product.salePrice.toFixed(2)} XAF
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Quantité</p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: product.quantity < 50 ? palette.accent.red : palette.text.primary,
                        margin: 0,
                      }}
                    >
                      {product.quantity}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: "12px", color: palette.text.tertiary, margin: "0 0 4px 0" }}>Marge %</p>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: palette.accent.teal, margin: 0 }}>
                      {product.margin.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", marginLeft: "16px" }}>
                <button
                  onClick={() => handleEditProduct(product)}
                  style={{
                    backgroundColor: palette.bg.tertiary,
                    color: palette.text.primary,
                    border: `1px solid ${palette.border}`,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = palette.border
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = palette.bg.tertiary
                  }}
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{
                    backgroundColor: isDark ? "#7f1d1d" : "#fecaca",
                    color: isDark ? palette.accent.red : "#991b1b",
                    border: `1px solid ${isDark ? "#991b1b" : "#fca5a5"}`,
                    padding: "8px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = "0.8"
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = "1"
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
