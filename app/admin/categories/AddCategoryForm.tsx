"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function AddCategoryForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const slugify = (v: string) =>
    v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()
    const { error } = await supabase.from("categories").insert({
      name,
      slug: slugify(name),
      description: description || null,
    })
    if (error) { setError(error.message); setLoading(false) }
    else { setName(""); setDescription(""); router.refresh(); setLoading(false) }
  }

  const field = "w-full bg-white/5 border border-white/10 focus:border-red-600 outline-none px-4 py-3 text-white text-sm placeholder-white/20 transition-colors"
  const lbl = "text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className={lbl}>Nome *</label>
        <input required value={name} onChange={e => setName(e.target.value)} className={field} placeholder="Ex: Capacetes" />
      </div>
      <div>
        <label className={lbl}>Descrição</label>
        <input value={description} onChange={e => setDescription(e.target.value)} className={field} placeholder="Opcional" />
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-black tracking-widest uppercase px-5 py-3 transition-colors mt-1">
        {loading ? "Criando..." : "Criar Categoria"}
      </button>
    </form>
  )
}
