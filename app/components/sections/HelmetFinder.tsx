"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, RotateCcw } from "lucide-react"

type Step = "sport" | "level" | "use" | "result"

const recommendations: Record<string, { name: string; price: string; desc: string }> = {
  "bike-iniciante-lazer": { name: "Flowline Helmet", price: "R$ 709", desc: "Proteção certificada, ventilação otimizada e conforto para trilhas e ciclovias." },
  "bike-intermediario-lazer": { name: "A3 Mips Helmet", price: "R$ 1.290", desc: "Sistema MIPS integrado, perfil aerodinâmico e peso reduzido para performance real." },
  "bike-profissional-corrida": { name: "D4 Carbon Helmet", price: "R$ 1.890", desc: "Casca de carbono, ventilação de competição e o melhor custo-benefício da linha elite." },
  "moto-iniciante-lazer": { name: "GP Helmet", price: "R$ 1.490", desc: "Construção robusta, viseira anti-UV e fixação de encaixe rápido." },
  "moto-intermediario-lazer": { name: "SE4 Helmet", price: "R$ 2.290", desc: "Aerodinámica de corrida, forro MIPS removível e sistema de ventilação FLOAT." },
  "moto-profissional-corrida": { name: "SE5 Carbon Helmet", price: "R$ 4.890", desc: "Casca full-carbon triaxial, peso de apenas 1.395g e aprovado para o campeonato mundial." },
}

const getKey = (sport: string, level: string, use: string) => {
  const lvl = level === "profissional" ? "profissional" : level
  const u = use === "corrida" ? "corrida" : "lazer"
  return `${sport}-${lvl}-${u}`
}

export default function HelmetFinder() {
  const [step, setStep] = useState<Step>("sport")
  const [sport, setSport] = useState("")
  const [level, setLevel] = useState("")
  const [use, setUse] = useState("")

  const reset = () => { setStep("sport"); setSport(""); setLevel(""); setUse("") }

  const rec = step === "result" ? recommendations[getKey(sport, level, use)] || recommendations["bike-intermediario-lazer"] : null

  return (
    <section className="bg-[#0f0f0f] py-20 lg:py-28 border-t border-b border-white/5">
      <div className="max-w-2xl mx-auto px-4 lg:px-8 text-center">
        <h2
          className="text-white text-4xl lg:text-6xl mb-4"
          style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
        >
          Encontre seu Capacete
        </h2>
        <p className="text-white/40 text-sm mb-12 max-w-md mx-auto">
          Seu próximo capacete está esperando. Com nosso guia interativo, vamos te mostrar a escolha certa para proteger sua cabeça.
        </p>

        {/* Progress */}
        {step !== "result" && (
          <div className="flex gap-1.5 justify-center mb-10">
            {["sport", "level", "use"].map((s, i) => (
              <div
                key={s}
                className={`h-0.5 w-8 transition-colors ${
                  ["sport", "level", "use"].indexOf(step) >= i ? "bg-red-600" : "bg-white/15"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "sport" && (
            <motion.div key="sport" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-6">Qual é o seu esporte?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "bike", label: "Bike / MTB", icon: "🚵" },
                  { value: "moto", label: "Motociclismo", icon: "🏍️" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setSport(o.value); setStep("level") }}
                    className="border border-white/10 hover:border-red-600 hover:bg-red-600/5 p-6 text-center transition-all duration-200 group"
                  >
                    <span className="text-3xl block mb-3">{o.icon}</span>
                    <span className="text-white font-semibold text-sm group-hover:text-red-400 transition-colors">{o.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "level" && (
            <motion.div key="level" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-6">Qual é o seu nível?</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "iniciante", label: "Iniciante", sub: "Estou começando" },
                  { value: "intermediario", label: "Intermediário", sub: "Pratico há anos" },
                  { value: "profissional", label: "Profissional", sub: "Compito ou treino pesado" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setLevel(o.value); setStep("use") }}
                    className="border border-white/10 hover:border-red-600 hover:bg-red-600/5 p-5 text-center transition-all duration-200 group"
                  >
                    <span className="text-white font-semibold text-sm block mb-1 group-hover:text-red-400 transition-colors">{o.label}</span>
                    <span className="text-white/35 text-[10px]">{o.sub}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "use" && (
            <motion.div key="use" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-6">Como você usa principalmente?</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "lazer", label: "Lazer / Trilhas", sub: "Fins de semana, aventura" },
                  { value: "corrida", label: "Corrida / Competição", sub: "Velocidade e performance máxima" },
                ].map((o) => (
                  <button
                    key={o.value}
                    onClick={() => { setUse(o.value); setStep("result") }}
                    className="border border-white/10 hover:border-red-600 hover:bg-red-600/5 p-6 text-center transition-all duration-200 group"
                  >
                    <span className="text-white font-semibold text-sm block mb-2 group-hover:text-red-400 transition-colors">{o.label}</span>
                    <span className="text-white/35 text-[10px]">{o.sub}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === "result" && rec && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="bg-[#141414] border border-white/8 p-8 mb-6">
                <p className="text-red-600 text-[10px] font-black tracking-[0.3em] uppercase mb-3">Recomendamos</p>
                <h3
                  className="text-white text-4xl mb-2"
                  style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
                >
                  {rec.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{rec.desc}</p>
                <p className="text-white font-bold text-lg">{rec.price}</p>
              </div>
              <div className="flex gap-3 justify-center">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-white text-black text-xs font-black tracking-widest uppercase px-8 py-4 hover:bg-red-600 hover:text-white transition-all"
                >
                  Ver Produto <ArrowRight size={14} />
                </a>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 border border-white/20 text-white/60 hover:text-white text-xs font-bold tracking-widest uppercase px-6 py-4 transition-colors"
                >
                  <RotateCcw size={13} /> Recomeçar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
