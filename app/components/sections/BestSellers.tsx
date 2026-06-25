"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingBag } from "lucide-react"

type ProductItem = {
  name: string
  badge: string | null
  price: number
  original_price?: number | null
  images: string[]
  is_sold_out: boolean
}

export default function BestSellers({ products }: { products: ProductItem[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="bg-[#080808] py-16 lg:py-24">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-white text-3xl lg:text-4xl mb-10"
          style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
        >
          Mais Vendidos
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-white/5">
          {products.map((p, i) => {
            const isSale = !!p.original_price && p.price < p.original_price
            const priceFormatted = Number(p.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            const originalFormatted = p.original_price
              ? Number(p.original_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
              : null

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group bg-[#080808] hover:bg-[#0f0f0f] transition-colors relative"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={p.images[0] ?? "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"}
                    alt={p.name}
                    className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${p.is_sold_out ? "grayscale opacity-60" : ""}`}
                  />
                  {p.badge && (
                    <div className={`absolute top-3 left-3 text-[9px] font-black tracking-widest uppercase px-2 py-1 ${
                      p.badge === "Sale" ? "bg-red-600 text-white" :
                      p.badge === "Esgotado" ? "bg-white/10 text-white/60 border border-white/20" :
                      "bg-white text-black"
                    }`}>
                      {p.badge}
                    </div>
                  )}
                  {!p.is_sold_out && (
                    <button className="absolute bottom-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white">
                      <ShoppingBag size={14} className="text-black group-hover:text-white" />
                    </button>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-white/80 text-xs font-semibold leading-snug mb-2 group-hover:text-white transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {isSale && originalFormatted && (
                      <span className="text-white/30 text-xs line-through">{originalFormatted}</span>
                    )}
                    <span className={`text-xs font-bold ${isSale ? "text-red-500" : "text-white/70"}`}>
                      {priceFormatted}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
