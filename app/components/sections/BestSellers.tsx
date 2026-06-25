"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ShoppingBag } from "lucide-react"

const products = [
  {
    name: "D4 Poliacrilite Preto Sombra",
    badge: "Novo",
    price: "R$ 1.890",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    soldOut: false,
    sale: false,
  },
  {
    name: "SE5 Carbon Listras Preto/Roxo",
    badge: null,
    price: "R$ 4.890",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&q=80",
    soldOut: false,
    sale: false,
  },
  {
    name: "SE5 Carbon Mono Preto",
    badge: null,
    price: "R$ 4.690",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80",
    soldOut: false,
    sale: false,
  },
  {
    name: "SE5 Carbon Óptico Preto",
    badge: "Sale",
    price: "R$ 2.940",
    originalPrice: "R$ 4.890",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=500&q=80",
    soldOut: false,
    sale: true,
  },
  {
    name: "Flowline SE Stealth Preto",
    badge: null,
    price: "R$ 999",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80",
    soldOut: false,
    sale: false,
  },
  {
    name: "Flowline Point Preto/Carvão",
    badge: "Esgotado",
    price: "R$ 709",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    soldOut: true,
    sale: false,
  },
  {
    name: "SE PRO Collection Jersey",
    badge: null,
    price: "R$ 390",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
    soldOut: false,
    sale: false,
  },
  {
    name: "Colete Ruckus Mono Carbono",
    badge: null,
    price: "R$ 689",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&q=80",
    soldOut: false,
    sale: false,
  },
]

export default function BestSellers() {
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
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="group bg-[#080808] hover:bg-[#0f0f0f] transition-colors relative"
            >
              {/* Image */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${p.soldOut ? "grayscale opacity-60" : ""}`}
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
                {!p.soldOut && (
                  <button className="absolute bottom-3 right-3 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white">
                    <ShoppingBag size={14} className="text-black group-hover:text-white" />
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="text-white/80 text-xs font-semibold leading-snug mb-2 group-hover:text-white transition-colors">
                  {p.name}
                </h3>
                <div className="flex items-center gap-2">
                  {p.sale && p.originalPrice && (
                    <span className="text-white/30 text-xs line-through">{p.originalPrice}</span>
                  )}
                  <span className={`text-xs font-bold ${p.sale ? "text-red-500" : "text-white/70"}`}>
                    {p.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
