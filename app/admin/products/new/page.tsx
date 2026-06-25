import { createClient } from "@/lib/supabase/server"
import ProductForm from "../ProductForm"

export default async function NewProduct() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("categories").select("*").order("sort_order")

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Novo Produto</h1>
        <p className="text-white/30 text-sm mt-1">Preencha os dados do produto</p>
      </div>
      <ProductForm categories={categories ?? []} />
    </div>
  )
}
