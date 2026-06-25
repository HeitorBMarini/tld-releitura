"use client"

import { useState } from "react"
import { X } from "lucide-react"

const messages = [
  "Frete Grátis em Compras Acima de R$500",
  "Nova Coleção SE5 Carbon disponível — Estoque limitado",
  "Programa de Fidelidade Riders Pro — Acumule pontos em cada compra",
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="bg-red-600 text-white text-center text-xs py-2.5 px-4 relative flex items-center justify-center gap-4">
      <div className="flex gap-2 items-center shrink-0">
        {messages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
      <span className="font-medium tracking-wide">{messages[current]}</span>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}
