"use client"

import { useState } from "react"

type Props = { images: string[] | null; name: string }

const fallback = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"

export default function ProductGallery({ images, name }: Props) {
  const imgs = images?.length ? images : [fallback]
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="aspect-square bg-[#0f0f0f] overflow-hidden relative">
        <img
          key={active}
          src={imgs[active]}
          alt={`${name} — imagem ${active + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        {imgs.length > 1 && (
          <>
            <button
              onClick={() => setActive(i => (i - 1 + imgs.length) % imgs.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-red-600 flex items-center justify-center text-white text-sm transition-colors"
              aria-label="Anterior"
            >‹</button>
            <button
              onClick={() => setActive(i => (i + 1) % imgs.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/60 hover:bg-red-600 flex items-center justify-center text-white text-sm transition-colors"
              aria-label="Próxima"
            >›</button>
          </>
        )}
        {imgs.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-1.5 h-1.5 transition-colors ${i === active ? "bg-white" : "bg-white/25"}`}
                aria-label={`Imagem ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 w-16 h-16 overflow-hidden border transition-colors ${
                i === active ? "border-white" : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={src} alt={`Miniatura ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
