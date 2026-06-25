"use client"

import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DeleteCategoryButton({ id, name, disabled }: { id: string; name: string; disabled: boolean }) {
  const router = useRouter()
  const handleDelete = async () => {
    if (!confirm(`Excluir categoria "${name}"?`)) return
    const supabase = createClient()
    await supabase.from("categories").delete().eq("id", id)
    router.refresh()
  }
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 hover:text-destructive hover:bg-destructive/10 disabled:opacity-30"
      onClick={handleDelete}
      disabled={disabled}
      title={disabled ? "Remova os produtos desta categoria primeiro" : "Excluir"}
    >
      <Trash2 size={13} />
    </Button>
  )
}
