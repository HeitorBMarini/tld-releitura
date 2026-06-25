import { createClient } from "@/lib/supabase/server"
import { Package, Tag, CreditCard, TrendingUp } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()
  const [{ count: products }, { count: categories }, { count: payments }] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("payment_methods").select("*", { count: "exact", head: true }).eq("is_active", true),
  ])

  const stats = [
    { label: "Produtos", value: products ?? 0, icon: Package, color: "text-blue-400" },
    { label: "Categorias", value: categories ?? 0, icon: Tag, color: "text-green-400" },
    { label: "Pagamentos ativos", value: payments ?? 0, icon: CreditCard, color: "text-yellow-400" },
    { label: "Taxa de conversão", value: "—", icon: TrendingUp, color: "text-red-400" },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/30 text-sm mt-1">Visão geral da loja RIDERS</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{label}</span>
              <Icon size={16} className={color} />
            </div>
            <p className="text-3xl font-bold text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-white/5 p-6">
        <h2 className="text-sm font-bold text-white mb-1">Início rápido</h2>
        <p className="text-white/30 text-xs mb-4">Comece cadastrando seus produtos e categorias.</p>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/products/new" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 transition-colors">
            + Novo Produto
          </a>
          <a href="/admin/categories" className="border border-white/10 hover:border-white/30 text-white/60 hover:text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 transition-colors">
            Gerenciar Categorias
          </a>
        </div>
      </div>
    </div>
  )
}
