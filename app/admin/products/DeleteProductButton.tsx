"use client"

import { Trash2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`Excluir "${name}"?`)) return
    const supabase = createClient()
    await supabase.from("products").delete().eq("id", id)
    router.refresh()
  }

  return (
    <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-destructive hover:bg-destructive/10" onClick={handleDelete}>
      <Trash2 size={13} />
    </Button>
  )
}
