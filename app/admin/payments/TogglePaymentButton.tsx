"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function TogglePaymentButton({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter()
  const toggle = async () => {
    const supabase = createClient()
    await supabase.from("payment_methods").update({ is_active: !isActive }).eq("id", id)
    router.refresh()
  }
  return (
    <button onClick={toggle} className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 transition-colors ${
      isActive ? "bg-green-600/15 text-green-400 hover:bg-red-600/15 hover:text-red-400" : "bg-white/5 text-white/25 hover:bg-green-600/15 hover:text-green-400"
    }`}>
      {isActive ? "Ativo" : "Inativo"}
    </button>
  )
}
