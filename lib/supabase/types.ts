export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  original_price: number | null
  category_id: string | null
  badge: "Novo" | "Sale" | "Esgotado" | null
  is_sold_out: boolean
  is_active: boolean
  images: string[]
  sort_order: number
  created_at: string
  updated_at: string
  category?: Category
}

export type PaymentMethod = {
  id: string
  name: string
  type: "pix" | "boleto" | "credit_card" | "debit_card"
  is_active: boolean
  installments: number
  discount_pct: number
  config: Record<string, unknown>
  created_at: string
}
