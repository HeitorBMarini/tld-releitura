"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const cards = [
  {
    label: "Notícias",
    title: "Riders × Red Bull Ducati — Nova temporada começa em março",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80",
    href: "#",
  },
  {
    label: "Pintura",
    title: "A história por trás do design Ciclope Edição Limitada",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    href: "#",
  },
  {
    label: "Atletas",
    title: "Conheça os pilotos que usam equipamentos Riders no circuito",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    href: "#",
  },
]

export default function InsideRiders() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section ref={ref} className="bg-[#080808] py-16 lg:py-24">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-white text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
          >
            Mundo Riders
          </motion.h2>
          <a href="#" className="hidden lg:flex items-center gap-2 text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">
            Ver tudo <ArrowRight size={12} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {cards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-[#080808] hover:bg-[#0f0f0f] transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.25em] block mb-2">{card.label}</span>
                <h3 className="text-white/80 group-hover:text-white text-sm font-semibold leading-snug transition-colors mb-3">{card.title}</h3>
                <span className="flex items-center gap-2 text-[10px] text-white/35 group-hover:text-red-500 uppercase tracking-widest transition-colors">
                  Ler mais <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
