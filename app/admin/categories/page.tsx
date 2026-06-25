import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Categorias</h1>
        <p className="text-muted-foreground text-sm mt-1">Organize seus produtos por categoria</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Nome</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Slug</th>
                    <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Produtos</th>
                    <th className="px-5 py-3.5 w-28"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {categories?.map((c) => {
                    const count = (c.products as { count: number }[])?.[0]?.count ?? 0
                    return (
                      <tr key={c.id} className="hover:bg-muted/40 transition-colors">
                        <td className="px-5 py-3.5">
                          <span className={`text-sm font-medium ${c.is_active ? "text-foreground" : "text-muted-foreground"}`}>
                            {c.name}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{c.slug}</code>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-muted-foreground text-xs">{count}</span>
                        </td>
                        <td className="px-5 py-3.5">
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
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader className="px-5 pt-5 pb-3">
              <CardTitle className="text-base">Nova Categoria</CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <AddCategoryForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
