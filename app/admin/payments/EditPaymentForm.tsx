"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { PaymentMethod } from "@/lib/supabase/types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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

  return (
    <div className="flex flex-wrap items-end gap-4">
      <div className="space-y-1.5">
        <Label className="text-xs">Parcelas máx.</Label>
        <Input type="number" min="1" max="24" value={installments} onChange={e => setInstallments(e.target.value)} className="w-24 h-8 text-xs" />
      </div>
      <div className="space-y-1.5">
        <Label className="text-xs">Desconto (%)</Label>
        <Input type="number" min="0" max="100" step="0.5" value={discount} onChange={e => setDiscount(e.target.value)} className="w-24 h-8 text-xs" />
      </div>
      <Button size="sm" variant="secondary" onClick={save} disabled={loading}>
        {loading ? "Salvando..." : "Salvar"}
      </Button>
    </div>
  )
}
