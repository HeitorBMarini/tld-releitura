import type { ReactNode } from "react"
import AdminSidebar from "./components/AdminSidebar"

export const metadata = { title: "Admin — RIDERS" }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-auto">
        {children}
      </main>
    </div>
  )
}
