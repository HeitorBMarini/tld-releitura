"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, Package, Tag, CreditCard, LogOut, ExternalLink } from "lucide-react"

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Produtos", icon: Package },
  { href: "/admin/categories", label: "Categorias", icon: Tag },
  { href: "/admin/payments", label: "Pagamentos", icon: CreditCard },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <aside className="w-56 shrink-0 bg-[#080808] border-r border-white/5 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/5">
        <span className="text-xl text-white block" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>
          RIDERS
        </span>
        <span className="text-[9px] text-white/25 uppercase tracking-widest">Painel Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded transition-colors ${
                active ? "bg-red-600/10 text-red-500" : "text-white/40 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={15} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5 flex flex-col gap-0.5">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-white/40 hover:text-white hover:bg-white/5 rounded transition-colors"
        >
          <ExternalLink size={15} /> Ver site
        </a>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 text-xs font-semibold text-white/40 hover:text-red-500 hover:bg-white/5 rounded transition-colors w-full text-left"
        >
          <LogOut size={15} /> Sair
        </button>
      </div>
    </aside>
  )
}
