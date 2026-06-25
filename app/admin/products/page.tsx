import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
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
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Produtos</h1>
          <p className="text-white/30 text-sm mt-1">{products?.length ?? 0} produto(s) cadastrado(s)</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black tracking-widest uppercase px-5 py-3 transition-colors"
        >
          <Plus size={14} /> Novo Produto
        </Link>
      </div>

      <div className="bg-[#111] border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest">Produto</th>
              <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest hidden md:table-cell">Categoria</th>
              <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest">Preço</th>
              <th className="text-left px-5 py-3.5 text-[10px] font-black text-white/30 uppercase tracking-widest hidden sm:table-cell">Status</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-white/25 text-sm">
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            )}
            {products?.map((p) => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {p.images[0] && (
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover bg-white/5 shrink-0" />
                    )}
                    <div>
                      <p className="text-white text-sm font-semibold">{p.name}</p>
                      {p.badge && (
                        <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 ${
                          p.badge === "Sale" ? "bg-red-600/20 text-red-400" :
                          p.badge === "Esgotado" ? "bg-white/5 text-white/30" :
                          "bg-white/10 text-white/60"
                        }`}>{p.badge}</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <span className="text-white/40 text-xs">{(p.category as { name: string } | null)?.name ?? "—"}</span>
                </td>
                <td className="px-5 py-4">
                  <div>
                    <span className="text-white text-sm font-bold">
                      {Number(p.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    {p.original_price && (
                      <span className="text-white/25 text-xs line-through block">
                        {Number(p.original_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 ${
                    p.is_active ? "bg-green-600/15 text-green-400" : "bg-white/5 text-white/25"
                  }`}>
                    {p.is_active ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="w-8 h-8 border border-white/10 hover:border-white/30 flex items-center justify-center text-white/40 hover:text-white transition-all"
                    >
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
    </div>
  )
}
