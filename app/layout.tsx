import type { Metadata } from "next"
import { Bebas_Neue, Inter, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
})

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

export const metadata: Metadata = {
  title: "RIDERS — Equipamentos de Motorsport",
  description: "Capacetes, roupas e acessórios para motociclistas que levam a pilotagem a sério.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={cn(bebas.variable, "font-sans", geist.variable)} suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  )
}
