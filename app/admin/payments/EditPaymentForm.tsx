"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { PaymentMethod } from "@/lib/supabase/types"

export default function EditPaymentForm({ method }: { method: PaymentMethod }) {
  const router = useRouter()
  const [installments, setInstallments] = useState(method.installments?.toString() ?? "1")
  const [discount, setDiscount] = useState(method.discount_pct?.toString() ?? "0")
  const [loading, setLoading] = useState(false)

  const save = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase.from("payment_methods").update({
      installments: parseInt(installments) || 1,
      discount_pct: parseFloat(discount) || 0,
    }).eq("id", method.id)
    router.refresh()
    setLoading(false)
  }

  const field = "bg-white/5 border border-white/10 focus:border-red-600 outline-none px-3 py-2 text-white text-xs placeholder-white/20 transition-colors w-24"

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div>
        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-1.5">Parcelas máx.</label>
        <input type="number" min="1" max="24" value={installments} onChange={e => setInstallments(e.target.value)} className={field} />
      </div>
      <div>
        <label className="text-[9px] font-black text-white/30 uppercase tracking-widest block mb-1.5">Desconto (%)</label>
        <input type="number" min="0" max="100" step="0.5" value={discount} onChange={e => setDiscount(e.target.value)} className={field} />
      </div>
      <button onClick={save} disabled={loading} className="bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white/60 hover:text-white text-[10px] font-black tracking-widest uppercase px-4 py-2 transition-colors">
        {loading ? "..." : "Salvar"}
      </button>
    </div>
  )
}
