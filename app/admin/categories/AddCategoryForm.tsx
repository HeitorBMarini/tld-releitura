"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="cat-name">Nome *</Label>
        <Input id="cat-name" required value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Capacetes" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="cat-desc">Descrição</Label>
        <Input id="cat-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="Opcional" />
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
      <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white mt-1 w-full">
        {loading ? "Criando..." : "Criar Categoria"}
      </Button>
    </form>
  )
}
