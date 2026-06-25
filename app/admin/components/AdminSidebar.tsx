"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  LayoutDashboard, Package, Tag, CreditCard,
  LogOut, ExternalLink, Sun, Moon, Database,
} from "lucide-react"

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Produtos", icon: Package },
  { href: "/admin/categories", label: "Categorias", icon: Tag },
  { href: "/admin/payments", label: "Pagamentos", icon: CreditCard },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="w-56 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-sidebar-border">
        <span
          className="text-xl text-sidebar-foreground block"
          style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}
        >
          RIDERS
        </span>
        <span className="text-[9px] text-muted-foreground uppercase tracking-widest">Painel Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-colors",
                active
                  ? "bg-red-600 text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}

        <Separator className="my-2" />

        {/* Supabase */}
        <a
          href="https://supabase.com/dashboard/project/jallhrengbzcerbdruwf/editor"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <Database size={15} />
          Schema / SQL
        </a>
        <a
          href="https://supabase.com/dashboard/project/jallhrengbzcerbdruwf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ExternalLink size={13} className="ml-0.5" />
          Dashboard Supabase
        </a>
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-sidebar-border flex flex-col gap-1">
        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors w-full text-left"
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          {theme === "dark" ? "Tema claro" : "Tema escuro"}
        </button>
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <ExternalLink size={15} /> Ver site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
        >
          <LogOut size={15} /> Sair
        </button>
      </div>
    </aside>
  )
}
