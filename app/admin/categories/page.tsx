import { createClient } from "@/lib/supabase/server"
import AddCategoryForm from "./AddCategoryForm"
import DeleteCategoryButton from "./DeleteCategoryButton"
import ToggleActiveButton from "./ToggleActiveButton"

export default async function AdminCategories() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from("categories")
    .select("*, products(count)")
    .order("sort_order")

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Categorias</h1>
        <p className="text-white/30 text-sm mt-1">Organize seus produtos por categoria</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Lista */}
        <div className="lg:col-span-2 bg-[#111] border border-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest">Nome</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest hidden sm:table-cell">Slug</th>
                <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest">Produtos</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {categories?.map((c) => {
                const count = (c.products as { count: number }[])?.[0]?.count ?? 0
                return (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <span className={`text-sm font-semibold ${c.is_active ? "text-white" : "text-white/30"}`}>{c.name}</span>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <code className="text-white/30 text-xs">{c.slug}</code>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-white/40 text-xs">{count}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <ToggleActiveButton id={c.id} isActive={c.is_active} />
                        <DeleteCategoryButton id={c.id} name={c.name} disabled={count > 0} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Form */}
        <div className="bg-[#111] border border-white/5 p-6 h-fit">
          <h2 className="text-sm font-bold text-white mb-5">Nova Categoria</h2>
          <AddCategoryForm />
        </div>
      </div>
    </div>
  )
}
