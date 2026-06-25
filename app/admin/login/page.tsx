"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError("E-mail ou senha incorretos.")
      setLoading(false)
    } else {
      router.push("/admin")
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-3xl text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>
            RIDERS
          </span>
          <p className="text-white/30 text-xs mt-1 uppercase tracking-widest">Admin</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-red-600 outline-none px-4 py-3 text-white text-sm placeholder-white/20 transition-colors"
              placeholder="admin@riders.com"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-red-600 outline-none px-4 py-3 text-white text-sm placeholder-white/20 transition-colors"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-black tracking-widest uppercase px-6 py-3.5 transition-colors mt-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
