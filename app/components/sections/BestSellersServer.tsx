import { createClient } from "@/lib/supabase/server"
import BestSellers from "./BestSellers"

const STATIC_FALLBACK = [
  { name: "D4 Poliacrilite Preto Sombra", badge: "Novo", price: 1890, original_price: null, images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"], is_sold_out: false },
  { name: "SE5 Carbon Listras Preto/Roxo", badge: null, price: 4890, original_price: null, images: ["https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80"], is_sold_out: false },
  { name: "SE5 Carbon Mono Preto", badge: null, price: 4690, original_price: null, images: ["https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80"], is_sold_out: false },
  { name: "SE5 Carbon Óptico Preto", badge: "Sale", price: 2940, original_price: 4890, images: ["https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&q=80"], is_sold_out: false },
  { name: "Flowline SE Stealth Preto", badge: null, price: 999, original_price: null, images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80"], is_sold_out: false },
  { name: "Flowline Point Preto/Carvão", badge: "Esgotado", price: 709, original_price: null, images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80"], is_sold_out: true },
  { name: "SE PRO Collection Jersey", badge: null, price: 390, original_price: null, images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80"], is_sold_out: false },
  { name: "Colete Ruckus Mono Carbono", badge: null, price: 689, original_price: null, images: ["https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=80"], is_sold_out: false },
]

export default async function BestSellersServer() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("products")
    .select("name, badge, price, original_price, images, is_sold_out")
    .eq("is_active", true)
    .order("sort_order")
    .order("created_at", { ascending: false })
    .limit(8)

  const products = data && data.length > 0 ? data : STATIC_FALLBACK
  return <BestSellers products={products} />
}
