"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    category: "EDIÇÃO LIMITADA",
    title: "CICLOPE\nEDIÇÃO LIMITADA",
    cta: "Comprar Agora",
    href: "#",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1920&q=85",
    align: "center",
    light: false,
  },
  {
    category: "BIKE",
    title: "CAPACETES\nFLOWLINE SE",
    cta: "Comprar Agora",
    href: "#",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1920&q=85",
    align: "left",
    light: false,
  },
  {
    category: "VESTUÁRIO",
    title: "RIDERS × RED BULL\nDUCATI",
    cta: "Ver Coleção",
    href: "#",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=85",
    align: "center",
    light: false,
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [auto])

  const go = (i: number) => {
    setCurrent(i)
    setAuto(false)
    setTimeout(() => setAuto(true), 10000)
  }

  const s = slides[current]

  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-4rem)] overflow-hidden bg-black">
      {/* Background images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={s.image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Content — centered at bottom like TLD */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-16 lg:pb-20 text-center px-6">
        <motion.div
          key={`cat-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase mb-4"
        >
          {s.category}
        </motion.div>

        <motion.h1
          key={`title-${current}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl whitespace-pre-line leading-[0.92] mb-8 tracking-wide"
          style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)" }}
        >
          {s.title}
        </motion.h1>

        <motion.a
          key={`cta-${current}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          href={s.href}
          className="bg-white text-black text-xs font-black tracking-[0.25em] uppercase px-10 py-4 hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          {s.cta}
        </motion.a>
      </div>

      {/* Slide counter + nav */}
      <div className="absolute left-6 lg:left-10 bottom-8 flex items-center gap-4">
        <button
          onClick={() => go((current - 1 + slides.length) % slides.length)}
          className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => go((current + 1) % slides.length)}
          className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute right-6 lg:right-10 bottom-9 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-[2px] transition-all duration-500 ${i === current ? "bg-white w-8" : "bg-white/30 w-4 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  )
}
