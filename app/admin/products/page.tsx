import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Plus, Pencil } from "lucide-react"
import DeleteProductButton from "./DeleteProductButton"

export default async function AdminProducts() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name)")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground text-sm mt-1">{products?.length ?? 0} produto(s) cadastrado(s)</p>
        </div>
        <Link href="/admin/products/new" className={cn(buttonVariants(), "bg-red-600 hover:bg-red-700 text-white gap-1.5")}>
          <Plus size={14} /> Novo Produto
        </Link>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Produto</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Categoria</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Preço</th>
                  <th className="text-left px-5 py-3.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="px-5 py-3.5 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground text-sm">
                      Nenhum produto cadastrado ainda.
                    </td>
                  </tr>
                )}
                {products?.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] && (
                          <img src={p.images[0]} alt={p.name} className="w-9 h-9 object-cover rounded bg-muted shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.name}</p>
                          {p.badge && (
                            <Badge
                              variant={p.badge === "Sale" ? "destructive" : "secondary"}
                              className="text-[9px] mt-0.5 h-4"
                            >
                              {p.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span className="text-muted-foreground text-xs">{(p.category as { name: string } | null)?.name ?? "—"}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div>
                        <span className="text-sm font-semibold text-foreground">
                          {Number(p.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </span>
                        {p.original_price && (
                          <span className="text-muted-foreground text-xs line-through block">
                            {Number(p.original_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <Badge variant={p.is_active ? "default" : "secondary"} className={p.is_active ? "bg-green-600/15 text-green-600 hover:bg-green-600/20 border-0" : ""}>
                        {p.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/products/${p.id}`} className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-8 w-8")}>
                          <Pencil size={13} />
                        </Link>
                        <DeleteProductButton id={p.id} name={p.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
