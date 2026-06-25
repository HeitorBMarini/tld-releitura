"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    label: "BIKE",
    title: "Flowline SE Helmets",
    cta: "Comprar Agora",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    size: "tall",
  },
  {
    label: "VESTUÁRIO",
    title: "Riders × Red Bull Ducati",
    cta: "Ver Coleção",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    size: "normal",
  },
  {
    label: "MOTO",
    title: "Scout GP",
    cta: "Comprar Agora",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80",
    size: "normal",
  },
  {
    label: "CAPACETES",
    title: "D4 Carbon",
    cta: "Ver Linha",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    size: "wide",
  },
]

export default function Collections() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} className="bg-[#080808] py-px">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
        {collections.map((c, i) => (
          <motion.a
            key={i}
            href="#"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`group relative overflow-hidden bg-[#0f0f0f] ${i === 0 ? "row-span-2" : ""}`}
            style={{ aspectRatio: i === 0 ? "auto" : "4/3" }}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-5 lg:p-7 flex flex-col h-full min-h-[200px] lg:min-h-[240px] justify-end">
              <div className="text-[9px] font-black text-red-500 tracking-[0.3em] uppercase mb-2">{c.label}</div>
              <h3
                className="text-white text-2xl lg:text-3xl leading-tight mb-4 group-hover:text-red-100 transition-colors"
                style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.03em" }}
              >
                {c.title}
              </h3>
              <span className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-white/60 group-hover:text-white transition-colors">
                {c.cta} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
