"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Product, Category } from "@/lib/supabase/types"

type Props = {
  product?: Product
  categories: Category[]
}

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    original_price: product?.original_price?.toString() ?? "",
    category_id: product?.category_id ?? "",
    badge: product?.badge ?? "",
    is_sold_out: product?.is_sold_out ?? false,
    is_active: product?.is_active ?? true,
    images: product?.images?.join("\n") ?? "",
    sort_order: product?.sort_order?.toString() ?? "0",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const slugify = (v: string) =>
    v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    const supabase = createClient()

    const payload = {
      name: form.name,
      slug: form.slug || slugify(form.name),
      description: form.description || null,
      price: parseFloat(form.price),
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      category_id: form.category_id || null,
      badge: (form.badge as Product["badge"]) || null,
      is_sold_out: form.is_sold_out,
      is_active: form.is_active,
      images: form.images.split("\n").map(s => s.trim()).filter(Boolean),
      sort_order: parseInt(form.sort_order) || 0,
    }

    const { error } = isEdit
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push("/admin/products")
      router.refresh()
    }
  }

  const field = "w-full bg-white/5 border border-white/10 focus:border-red-600 outline-none px-4 py-3 text-white text-sm placeholder-white/20 transition-colors"
  const label = "text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nome */}
        <div className="sm:col-span-2">
          <label className={label}>Nome do produto *</label>
          <input required value={form.name} onChange={e => {
            set("name", e.target.value)
            if (!isEdit) set("slug", slugify(e.target.value))
          }} className={field} placeholder="Ex: SE5 Carbon Helmet" />
        </div>

        {/* Slug */}
        <div className="sm:col-span-2">
          <label className={label}>Slug (URL)</label>
          <input value={form.slug} onChange={e => set("slug", e.target.value)} className={field} placeholder="se5-carbon-helmet" />
        </div>

        {/* Preço */}
        <div>
          <label className={label}>Preço (R$) *</label>
          <input required type="number" step="0.01" min="0" value={form.price} onChange={e => set("price", e.target.value)} className={field} placeholder="4890.00" />
        </div>

        {/* Preço original */}
        <div>
          <label className={label}>Preço original (R$)</label>
          <input type="number" step="0.01" min="0" value={form.original_price} onChange={e => set("original_price", e.target.value)} className={field} placeholder="Deixe vazio se não for promoção" />
        </div>

        {/* Categoria */}
        <div>
          <label className={label}>Categoria</label>
          <select value={form.category_id} onChange={e => set("category_id", e.target.value)} className={field + " cursor-pointer"}>
            <option value="">Sem categoria</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        {/* Badge */}
        <div>
          <label className={label}>Badge</label>
          <select value={form.badge} onChange={e => set("badge", e.target.value)} className={field + " cursor-pointer"}>
            <option value="">Nenhuma</option>
            <option value="Novo">Novo</option>
            <option value="Sale">Sale</option>
            <option value="Esgotado">Esgotado</option>
          </select>
        </div>

        {/* Descrição */}
        <div className="sm:col-span-2">
          <label className={label}>Descrição</label>
          <textarea rows={3} value={form.description} onChange={e => set("description", e.target.value)} className={field + " resize-none"} placeholder="Descrição do produto..." />
        </div>

        {/* Imagens */}
        <div className="sm:col-span-2">
          <label className={label}>URLs das imagens (uma por linha)</label>
          <textarea rows={4} value={form.images} onChange={e => set("images", e.target.value)} className={field + " resize-none font-mono text-xs"} placeholder={"https://images.unsplash.com/...\nhttps://images.unsplash.com/..."} />
        </div>

        {/* Sort + flags */}
        <div>
          <label className={label}>Ordem de exibição</label>
          <input type="number" min="0" value={form.sort_order} onChange={e => set("sort_order", e.target.value)} className={field} />
        </div>

        <div className="flex flex-col gap-3 justify-end">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} className="accent-red-600 w-4 h-4" />
            <span className="text-white/60 text-xs font-semibold">Produto ativo (visível no site)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_sold_out} onChange={e => set("is_sold_out", e.target.checked)} className="accent-red-600 w-4 h-4" />
            <span className="text-white/60 text-xs font-semibold">Esgotado</span>
          </label>
        </div>
      </div>

      {error && <p className="text-red-500 text-xs mt-4">{error}</p>}

      <div className="flex gap-3 mt-8">
        <button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-black tracking-widest uppercase px-8 py-3.5 transition-colors">
          {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Criar produto"}
        </button>
        <a href="/admin/products" className="border border-white/10 hover:border-white/30 text-white/50 hover:text-white text-xs font-bold tracking-widest uppercase px-6 py-3.5 transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  )
}
