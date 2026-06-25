import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

type Props = { searchParams: Promise<{ categoria?: string }> }

export default async function ProdutosPage({ searchParams }: Props) {
  const { categoria } = await searchParams
  const supabase = await createClient()

  const [{ data: categories }, { data: products }] = await Promise.all([
    supabase.from("categories").select("id, name, slug").eq("is_active", true).order("sort_order"),
    supabase
      .from("products")
      .select("id, name, slug, price, original_price, badge, is_sold_out, images, category:categories(slug)")
      .eq("is_active", true)
      .order("sort_order")
      .order("created_at", { ascending: false }),
  ])

  const filtered = categoria
    ? products?.filter(p => {
        const cat = p.category as unknown as { slug: string } | null
        return cat?.slug === categoria
      })
    : products

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Header */}
      <div className="border-b border-white/5 pt-20 pb-10 px-4">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-[10px] font-black text-red-600 tracking-[0.3em] uppercase mb-2">Loja</p>
          <h1
            className="text-5xl lg:text-7xl text-white"
            style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.03em" }}
          >
            {categoria ? (categories?.find(c => c.slug === categoria)?.name ?? "Produtos") : "Todos os Produtos"}
          </h1>
          <p className="text-white/30 text-sm mt-2">{filtered?.length ?? 0} produto(s)</p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10">
        {/* Category filter */}
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <Link
            href="/produtos"
            className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-colors ${
              !categoria ? "border-white text-white" : "border-white/15 text-white/40 hover:text-white hover:border-white/40"
            }`}
          >
            Todos
          </Link>
          {categories?.map(c => (
            <Link
              key={c.id}
              href={`/produtos?categoria=${c.slug}`}
              className={`shrink-0 text-[10px] font-black uppercase tracking-widest px-4 py-2 border transition-colors ${
                categoria === c.slug ? "border-white text-white" : "border-white/15 text-white/40 hover:text-white hover:border-white/40"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        {/* Grid */}
        {!filtered?.length ? (
          <div className="text-center py-24 text-white/25 text-sm">Nenhum produto encontrado.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
            {filtered.map(p => {
              const isSale = !!p.original_price && p.price < p.original_price
              return (
                <Link
                  key={p.id}
                  href={`/produtos/${p.slug}`}
                  className="group bg-[#080808] hover:bg-[#0f0f0f] transition-colors relative block"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={p.images?.[0] ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"}
                      alt={p.name}
                      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${p.is_sold_out ? "grayscale opacity-50" : ""}`}
                    />
                    {p.badge && (
                      <div className={`absolute top-3 left-3 text-[9px] font-black tracking-widest uppercase px-2 py-1 ${
                        p.badge === "Sale" ? "bg-red-600 text-white" :
                        p.badge === "Esgotado" ? "bg-white/10 text-white/60 border border-white/20" :
                        "bg-white text-black"
                      }`}>{p.badge}</div>
                    )}
                    {!p.is_sold_out && (
                      <div className="absolute bottom-3 right-3 w-9 h-9 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
                        <ShoppingBag size={15} className="text-black group-hover:text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white/80 text-xs font-semibold leading-snug mb-2 group-hover:text-white transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2">
                      {isSale && p.original_price && (
                        <span className="text-white/30 text-xs line-through">
                          {Number(p.original_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                      )}
                      <span className={`text-xs font-bold ${isSale ? "text-red-500" : "text-white/70"}`}>
                        {Number(p.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
