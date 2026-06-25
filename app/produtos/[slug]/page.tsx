import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, ChevronRight } from "lucide-react"
import ProductGallery from "./ProductGallery"
import RelatedProducts from "./RelatedProducts"

type Props = { params: Promise<{ slug: string }> }

const paymentIcon: Record<string, string> = {
  pix: "◆",
  boleto: "≡",
  credit_card: "▣",
  debit_card: "▤",
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("products").select("name, description").eq("slug", slug).single()
  return {
    title: data ? `${data.name} — RIDERS` : "Produto — RIDERS",
    description: data?.description ?? undefined,
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const [{ data: product }, { data: payments }] = await Promise.all([
    supabase
      .from("products")
      .select("*, category:categories(name, slug)")
      .eq("slug", slug)
      .eq("is_active", true)
      .single(),
    supabase
      .from("payment_methods")
      .select("type, name, installments, discount_pct")
      .eq("is_active", true)
      .order("created_at"),
  ])

  if (!product) notFound()

  const isSale = !!product.original_price && product.price < product.original_price
  const category = product.category as { name: string; slug: string } | null
  const pixMethod = payments?.find(p => p.type === "pix")

  return (
    <div className="min-h-screen bg-[#080808]">
      {/* Breadcrumb */}
      <div className="border-b border-white/5 px-4 py-3">
        <div className="max-w-screen-xl mx-auto flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/produtos" className="hover:text-white transition-colors">Produtos</Link>
          {category && (
            <>
              <ChevronRight size={10} />
              <Link href={`/produtos?categoria=${category.slug}`} className="hover:text-white transition-colors">
                {category.name}
              </Link>
            </>
          )}
          <ChevronRight size={10} />
          <span className="text-white/60">{product.name}</span>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <ProductGallery images={product.images} name={product.name} />

          {/* Info */}
          <div className="flex flex-col">
            {/* Badge + category */}
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <Link
                  href={`/produtos?categoria=${category.slug}`}
                  className="text-[9px] font-black text-red-600 tracking-[0.3em] uppercase hover:text-red-400 transition-colors"
                >
                  {category.name}
                </Link>
              )}
              {product.badge && (
                <span className={`text-[9px] font-black tracking-widest uppercase px-2 py-0.5 ${
                  product.badge === "Sale" ? "bg-red-600 text-white" :
                  product.badge === "Esgotado" ? "bg-white/10 text-white/60 border border-white/20" :
                  "bg-white text-black"
                }`}>{product.badge}</span>
              )}
            </div>

            {/* Name */}
            <h1
              className="text-4xl lg:text-5xl xl:text-6xl text-white leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.02em" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-end gap-3 mb-2">
              <span className={`text-3xl font-black ${isSale ? "text-red-500" : "text-white"}`}>
                {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
              {isSale && product.original_price && (
                <span className="text-white/30 text-lg line-through mb-0.5">
                  {Number(product.original_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              )}
            </div>

            {/* Pix discount */}
            {pixMethod && pixMethod.discount_pct > 0 && (
              <p className="text-green-400 text-xs font-semibold mb-6">
                ◆ {Number(product.price * (1 - pixMethod.discount_pct / 100)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} no Pix ({pixMethod.discount_pct}% de desconto)
              </p>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-white/50 text-sm leading-relaxed mb-8 border-t border-white/5 pt-6">
                {product.description}
              </p>
            )}

            {/* CTA */}
            {product.is_sold_out ? (
              <div className="border border-white/10 text-white/30 text-xs font-black tracking-widest uppercase px-8 py-4 text-center mb-6">
                Esgotado
              </div>
            ) : (
              <a
                href={`https://wa.me/5511999999999?text=Olá! Tenho interesse no produto: ${product.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white text-black text-xs font-black tracking-[0.2em] uppercase px-8 py-4 hover:bg-red-600 hover:text-white transition-all duration-200 mb-6"
              >
                <ShoppingBag size={15} /> Comprar via WhatsApp
              </a>
            )}

            {/* Payment methods */}
            {payments && payments.length > 0 && (
              <div className="border-t border-white/5 pt-6">
                <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-3">Formas de pagamento</p>
                <div className="flex flex-col gap-2">
                  {payments.map(m => (
                    <div key={m.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-white/20 text-xs w-4">{paymentIcon[m.type]}</span>
                        <span className="text-white/50 text-xs">{m.name}</span>
                        {m.discount_pct > 0 && (
                          <span className="text-green-400 text-[9px] font-bold">{m.discount_pct}% off</span>
                        )}
                      </div>
                      {m.installments > 1 && (
                        <span className="text-white/25 text-[10px]">até {m.installments}x</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back */}
            <Link
              href="/produtos"
              className="flex items-center gap-2 text-[10px] text-white/25 hover:text-white uppercase tracking-widest transition-colors mt-8 w-fit"
            >
              <ArrowLeft size={12} /> Voltar para produtos
            </Link>
          </div>
        </div>
      </div>

      {/* Related */}
      <RelatedProducts currentId={product.id} categoryId={product.category_id} />
    </div>
  )
}
