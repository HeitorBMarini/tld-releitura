import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

type Props = { currentId: string; categoryId: string | null }

export default async function RelatedProducts({ currentId, categoryId }: Props) {
  if (!categoryId) return null
  const supabase = await createClient()

  const { data } = await supabase
    .from("products")
    .select("id, name, slug, price, original_price, images, badge, is_sold_out")
    .eq("is_active", true)
    .eq("category_id", categoryId)
    .neq("id", currentId)
    .order("sort_order")
    .limit(4)

  if (!data?.length) return null

  return (
    <section className="border-t border-white/5 py-14 px-4">
      <div className="max-w-screen-xl mx-auto">
        <p className="text-[10px] font-black text-red-600 tracking-[0.3em] uppercase mb-2">Você também pode gostar</p>
        <h2
          className="text-3xl lg:text-4xl text-white mb-8"
          style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.03em" }}
        >
          Produtos Relacionados
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5">
          {data.map(p => {
            const isSale = !!p.original_price && p.price < p.original_price
            return (
              <Link
                key={p.id}
                href={`/produtos/${p.slug}`}
                className="group bg-[#080808] hover:bg-[#0f0f0f] transition-colors block"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={p.images?.[0] ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"}
                    alt={p.name}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${p.is_sold_out ? "grayscale opacity-50" : ""}`}
                  />
                  {p.badge && (
                    <div className={`absolute top-2 left-2 text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 ${
                      p.badge === "Sale" ? "bg-red-600 text-white" : "bg-white text-black"
                    }`}>{p.badge}</div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-white/70 text-xs font-semibold leading-snug group-hover:text-white transition-colors mb-1">{p.name}</p>
                  <div className="flex items-center gap-1.5">
                    {isSale && p.original_price && (
                      <span className="text-white/25 text-[10px] line-through">
                        {Number(p.original_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    )}
                    <span className={`text-xs font-bold ${isSale ? "text-red-500" : "text-white/60"}`}>
                      {Number(p.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
