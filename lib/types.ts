export interface Client {
  id: string
  name: string
  email: string
  phone: string
  company: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  costPrice: number
  salePrice: number
  quantity: number
  margin: number
}

export interface Order {
  id: string
  orderNumber: string
  clientId: string
  items: OrderItem[]
  totalAmount: number
  marginAmount: number
  status: "draft" | "pending" | "confirmed" | "delivered"
  createdAt: string
}

export interface OrderItem {
  productId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  margin: number
}

export interface Invoice {
  id: string
  invoiceNumber: string
  orderId: string
  clientId: string
  totalAmount: number
  marginAmount: number
  status: "draft" | "sent" | "paid"
  createdAt: string
  dueDate: string
}

export interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  category: string
  createdAt: string
}

export interface ERPData {
  clients: Client[]
  products: Product[]
  orders: Order[]
  invoices: Invoice[]
  suppliers: Supplier[]
}
