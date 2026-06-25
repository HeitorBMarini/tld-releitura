"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"

export default function TogglePaymentButton({ id, isActive }: { id: string; isActive: boolean }) {
  const router = useRouter()
  const toggle = async () => {
    const supabase = createClient()
    await supabase.from("payment_methods").update({ is_active: !isActive }).eq("id", id)
    router.refresh()
  }
  return <Switch checked={isActive} onCheckedChange={toggle} />
}
