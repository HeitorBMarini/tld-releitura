"use client"

import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Excluir "${name}"?`)) return
    const supabase = createClient()
    await supabase.from("products").delete().eq("id", id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="w-8 h-8 border border-white/10 hover:border-red-600 flex items-center justify-center text-white/40 hover:text-red-500 transition-all"
    >
      <Trash2 size={13} />
    </button>
  )
}
