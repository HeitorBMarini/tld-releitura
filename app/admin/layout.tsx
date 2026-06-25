import type { ReactNode } from "react"
import AdminSidebar from "./components/AdminSidebar"
import { ThemeProvider } from "./components/ThemeProvider"

export const metadata = { title: "Admin — RIDERS" }

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="admin-layout min-h-screen bg-background flex">
        <AdminSidebar />
        <main className="flex-1 min-w-0 overflow-auto bg-muted/30">
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}
