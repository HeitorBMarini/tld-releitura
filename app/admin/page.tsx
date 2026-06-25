import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Tag, CreditCard, TrendingUp, Plus, Settings } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [{ count: products }, { count: categories }, { count: payments }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("payment_methods").select("*", { count: "exact", head: true }).eq("is_active", true),
  ])

  const stats = [
    { label: "Produtos", value: products ?? 0, icon: Package, desc: "cadastrados" },
    { label: "Categorias", value: categories ?? 0, icon: Tag, desc: "ativas" },
    { label: "Pagamentos", value: payments ?? 0, icon: CreditCard, desc: "métodos ativos" },
    { label: "Conversão", value: "—", icon: TrendingUp, desc: "em breve" },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Visão geral da loja RIDERS</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, desc }) => (
          <Card key={label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-5">
              <span className="text-xs font-medium text-muted-foreground">{label}</span>
              <Icon size={16} className="text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-5 pb-4">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="px-6 pt-5 pb-4">
          <CardTitle className="text-base">Início rápido</CardTitle>
          <p className="text-muted-foreground text-sm">Comece cadastrando seus produtos e categorias.</p>
        </CardHeader>
        <CardContent className="px-6 pb-5 flex flex-wrap gap-3">
          <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="/admin/products/new">
              <Plus size={14} className="mr-1.5" /> Novo Produto
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/categories">
              <Settings size={14} className="mr-1.5" /> Categorias
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
