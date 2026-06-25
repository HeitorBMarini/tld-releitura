"use client"

import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function DeleteCategoryButton({ id, name, disabled }: { id: string; name: string; disabled: boolean }) {
  const router = useRouter()
  const handleDelete = async () => {
    if (!confirm(`Excluir categoria "${name}"?`)) return
    const supabase = createClient()
    await supabase.from("categories").delete().eq("id", id)
    router.refresh()
  }
  return (
    <button
      onClick={handleDelete}
      disabled={disabled}
      title={disabled ? "Remova os produtos desta categoria primeiro" : "Excluir"}
      className="w-8 h-8 border border-white/10 hover:border-red-600 flex items-center justify-center text-white/40 hover:text-red-500 transition-all disabled:opacity-25 disabled:cursor-not-allowed"
    >
      <Trash2 size={13} />
    </button>
  )
}
