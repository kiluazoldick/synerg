import type { ERPData } from "./types"

const STORAGE_KEY = "erp-data"

const mockData: ERPData = {
  clients: [
    {
      id: "1",
      name: "Acme Corp",
      email: "contact@acme.com",
      phone: "+33 1 23 45 67 89",
      company: "Acme Corporation",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Tech Solutions",
      email: "info@tech.com",
      phone: "+33 2 34 56 78 90",
      company: "Tech Solutions SA",
      createdAt: new Date().toISOString(),
    },
  ],
  products: [
    {
      id: "1",
      name: "Produit A",
      costPrice: 50,
      salePrice: 120,
      quantity: 150,
      margin: 58.33,
    },
    {
      id: "2",
      name: "Produit B",
      costPrice: 30,
      salePrice: 85,
      quantity: 200,
      margin: 64.71,
    },
    {
      id: "3",
      name: "Service Premium",
      costPrice: 100,
      salePrice: 250,
      quantity: 50,
      margin: 60,
    },
  ],
  orders: [
    {
      id: "1",
      orderNumber: "CMD-001",
      clientId: "1",
      items: [
        { productId: "1", quantity: 5, unitPrice: 120, totalPrice: 600, margin: 350 },
        { productId: "2", quantity: 3, unitPrice: 85, totalPrice: 255, margin: 165 },
      ],
      totalAmount: 855,
      marginAmount: 515,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    },
  ],
  invoices: [
    {
      id: "1",
      invoiceNumber: "FAC-001",
      orderId: "1",
      clientId: "1",
      totalAmount: 855,
      marginAmount: 515,
      status: "sent",
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  suppliers: [
    {
      id: "1",
      name: "Supplier Premium",
      email: "supplier@premium.com",
      phone: "+33 3 45 67 89 01",
      category: "Fournitures",
      createdAt: new Date().toISOString(),
    },
  ],
}

export function loadData(): ERPData {
  if (typeof window === "undefined") return mockData

  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : mockData
}

export function saveData(data: ERPData): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function resetData(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
}
