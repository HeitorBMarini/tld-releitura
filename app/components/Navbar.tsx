"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react"

const nav = [
  {
    label: "Capacetes",
    sub: {
      Bike: ["Stage Stunt", "D4 Carbon", "Stage", "A3 Mips", "Flowline", "Flowline SE", "Acessórios", "Encontre seu Capacete"],
      Moto: ["SE5 Carbon", "SE4", "GP Pro", "GP", "Acessórios", "Encontre seu Capacete"],
    },
  },
  {
    label: "Masculino",
    sub: {
      Bike: ["Capacetes", "Jaquetas", "Calças", "Shorts", "Luvas", "Proteção", "Goggles"],
      Moto: ["Capacetes", "Jaquetas", "Calças", "Luvas", "Proteção", "Goggles"],
      Casual: ["Camisetas", "Bonés", "Moletom", "Jaquetas"],
    },
  },
  {
    label: "Feminino",
    sub: {
      Destaques: ["Lilium Collection", "Mischief Collection"],
      Bike: ["Capacetes", "Jaquetas", "Shorts", "Luvas"],
      Moto: ["Capacetes", "Jaquetas", "Calças", "Luvas"],
    },
  },
  {
    label: "Jovem",
    sub: {
      Destaques: ["Capacetes GP", "SE Pro", "Skyline"],
      Bike: ["Capacetes", "Jaquetas", "Calças", "Luvas"],
      Moto: ["Capacetes", "Jaquetas", "Calças", "Luvas"],
    },
  },
  {
    label: "Mundo Riders",
    sub: {
      Conteúdo: ["Notícias", "Histórico de Pintura", "Atletas"],
      Equipes: ["Riders x Red Bull Ducati", "Monster Energy Yamaha"],
      Programas: ["Riders Pro — Fidelidade", "Suporte a Pilotos"],
    },
  },
]

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#080808]/98 backdrop-blur-sm shadow-lg shadow-black/50" : "bg-[#080808]"
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center h-14 lg:h-16 gap-6">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl text-white shrink-0"
          style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
        >
          RIDERS
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 flex-1" onMouseLeave={() => setOpen(null)}>
          {nav.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => setOpen(item.label)}>
              <button className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-white/60 hover:text-white uppercase tracking-wider transition-colors">
                {item.label}
                <ChevronDown size={11} className={`transition-transform ${open === item.label ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {open === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 bg-[#0f0f0f] border border-white/6 shadow-2xl shadow-black/80 min-w-[500px] p-6"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(item.sub).map(([group, links]) => (
                        <div key={group}>
                          <div className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-3">{group}</div>
                          <ul className="flex flex-col gap-1.5">
                            {links.map((l) => (
                              <li key={l}>
                                <a href="#" className="text-xs text-white/55 hover:text-white transition-colors">
                                  {l}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right icons */}
        <div className="ml-auto flex items-center gap-3">
          <button className="hidden lg:flex text-white/50 hover:text-white transition-colors p-1">
            <Search size={18} />
          </button>
          <button className="hidden lg:flex text-white/50 hover:text-white transition-colors p-1">
            <User size={18} />
          </button>
          <button className="relative text-white/50 hover:text-white transition-colors p-1">
            <ShoppingBag size={18} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-600 rounded-full text-[8px] flex items-center justify-center text-white font-bold">
              0
            </span>
          </button>
          <button className="lg:hidden text-white/70 hover:text-white p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0f0f0f] border-t border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {nav.map((item) => (
                <a key={item.label} href="#" className="text-white/70 hover:text-white py-2.5 text-sm font-semibold uppercase tracking-wider border-b border-white/5 transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
