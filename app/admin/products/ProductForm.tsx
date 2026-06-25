"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Product, Category } from "@/lib/supabase/types"
import ImageUploader from "./ImageUploader"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button, buttonVariants } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
    sort_order: product?.sort_order?.toString() ?? "0",
  })
  const [images, setImages] = useState<string[]>(product?.images ?? [])
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
      images,
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

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Informações básicas */}
      <Card>
        <CardContent className="pt-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="name">Nome do produto *</Label>
              <Input
                id="name"
                required
                value={form.name}
                onChange={e => {
                  set("name", e.target.value)
                  if (!isEdit) set("slug", slugify(e.target.value))
                }}
                placeholder="Ex: SE5 Carbon Helmet"
              />
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={form.slug}
                onChange={e => set("slug", e.target.value)}
                placeholder="se5-carbon-helmet"
                className="font-mono text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                required
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={e => set("price", e.target.value)}
                placeholder="4890.00"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="original_price">Preço original (R$)</Label>
              <Input
                id="original_price"
                type="number"
                step="0.01"
                min="0"
                value={form.original_price}
                onChange={e => set("original_price", e.target.value)}
                placeholder="Vazio = sem promoção"
              />
            </div>

            <div className="space-y-1.5">
              <Label>Categoria</Label>
              <Select value={form.category_id} onValueChange={v => set("category_id", v)}>
                <SelectTrigger><SelectValue placeholder="Sem categoria" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sem categoria</SelectItem>
                  {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Badge</Label>
              <Select value={form.badge} onValueChange={v => set("badge", v)}>
                <SelectTrigger><SelectValue placeholder="Nenhuma" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Nenhuma</SelectItem>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Sale">Sale</SelectItem>
                  <SelectItem value="Esgotado">Esgotado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={e => set("description", e.target.value)}
                placeholder="Descrição do produto..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imagens */}
      <Card>
        <CardContent className="pt-5 space-y-3">
          <Label>Imagens do produto</Label>
          <ImageUploader images={images} onChange={setImages} />
        </CardContent>
      </Card>

      {/* Config */}
      <Card>
        <CardContent className="pt-5 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="sort_order">Ordem de exibição</Label>
            <Input
              id="sort_order"
              type="number"
              min="0"
              value={form.sort_order}
              onChange={e => set("sort_order", e.target.value)}
              className="w-32"
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Produto ativo</p>
                <p className="text-xs text-muted-foreground">Visível no site para os clientes</p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={v => set("is_active", v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Esgotado</p>
                <p className="text-xs text-muted-foreground">Exibe badge de esgotado, sem botão de compra</p>
              </div>
              <Switch
                checked={form.is_sold_out}
                onCheckedChange={v => set("is_sold_out", v)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {error && <p className="text-destructive text-xs">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading} className="bg-red-600 hover:bg-red-700 text-white">
          {loading ? "Salvando..." : isEdit ? "Salvar alterações" : "Criar produto"}
        </Button>
        <a href="/admin/products" className={buttonVariants({ variant: "outline" })}>Cancelar</a>
      </div>
    </form>
  )
}
