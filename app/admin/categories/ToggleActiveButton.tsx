"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export default function ToggleActiveButton({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter()
  const toggle = async () => {
    const supabase = createClient()
    await supabase.from("categories").update({ is_active: !isActive }).eq("id", id)
    router.refresh()
  }
  return (
    <button onClick={toggle} className="cursor-pointer">
      <Badge
        variant={isActive ? "default" : "secondary"}
        className={isActive
          ? "bg-green-600/15 text-green-600 hover:bg-red-600/15 hover:text-red-600 border-0 transition-colors"
          : "hover:bg-green-600/15 hover:text-green-600 transition-colors cursor-pointer"
        }
      >
        {isActive ? "Ativa" : "Inativa"}
      </Badge>
    </button>
  )
}
