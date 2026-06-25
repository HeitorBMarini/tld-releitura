"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <section className="bg-[#111] border-t border-white/5 py-16 lg:py-20">
      <div className="max-w-xl mx-auto px-4 text-center">
        <h2
          className="text-white text-3xl lg:text-4xl mb-3"
          style={{ fontFamily: "var(--font-family-display, 'Bebas Neue', sans-serif)", letterSpacing: "0.05em" }}
        >
          Fique Conectado
        </h2>
        <p className="text-white/40 text-sm mb-8">
          Inscreva-se na nossa newsletter para receber novidades, lançamentos e ofertas exclusivas.
        </p>

        {sent ? (
          <p className="text-green-400 font-semibold text-sm">Obrigado! Você receberá novidades em breve.</p>
        ) : (
          <form onSubmit={submit} className="flex gap-0">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu endereço de e-mail"
              className="flex-1 bg-white/5 border border-white/10 focus:border-red-600 outline-none px-4 py-3.5 text-white text-sm placeholder-white/25 transition-colors"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 transition-colors flex items-center"
            >
              <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
