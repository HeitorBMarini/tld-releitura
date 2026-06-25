"use client"

import { useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Upload, X, GripVertical, Loader2 } from "lucide-react"

type Props = {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [dragOver, setDragOver] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  const uploadFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files)
    if (!arr.length) return
    setUploading(true)
    setError("")
    const supabase = createClient()
    const urls: string[] = []

    for (const file of arr) {
      const ext = file.name.split(".").pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: upErr } = await supabase.storage
        .from("product-images")
        .upload(path, file, { upsert: false })

      if (upErr) { setError(`Erro: ${upErr.message}`); continue }

      const { data } = supabase.storage.from("product-images").getPublicUrl(path)
      urls.push(data.publicUrl)
    }

    onChange([...images, ...urls])
    setUploading(false)
  }

  const remove = (i: number) => {
    const next = images.filter((_, idx) => idx !== i)
    onChange(next)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) {
      await uploadFiles(e.dataTransfer.files)
    }
  }

  // Drag-to-reorder handlers
  const onItemDragStart = (i: number) => setDragIndex(i)
  const onItemDragEnter = (i: number) => setDropIndex(i)
  const onItemDragEnd = () => {
    if (dragIndex !== null && dropIndex !== null && dragIndex !== dropIndex) {
      const next = [...images]
      const [moved] = next.splice(dragIndex, 1)
      next.splice(dropIndex, 0, moved)
      onChange(next)
    }
    setDragIndex(null)
    setDropIndex(null)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        className={`border-2 border-dashed transition-colors rounded-none cursor-pointer flex flex-col items-center justify-center py-8 px-4 text-center ${
          dragOver ? "border-red-600 bg-red-600/5" : "border-white/10 hover:border-white/25"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {uploading ? (
          <Loader2 size={24} className="text-white/40 animate-spin mb-2" />
        ) : (
          <Upload size={24} className="text-white/25 mb-2" />
        )}
        <p className="text-white/40 text-xs">
          {uploading ? "Enviando..." : "Clique ou arraste imagens aqui"}
        </p>
        <p className="text-white/20 text-[10px] mt-1">JPG, PNG, WEBP — máx. 5 MB por arquivo</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={e => e.target.files && uploadFiles(e.target.files)}
        />
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((url, i) => (
            <div
              key={url}
              draggable
              onDragStart={() => onItemDragStart(i)}
              onDragEnter={() => onItemDragEnter(i)}
              onDragEnd={onItemDragEnd}
              onDragOver={e => e.preventDefault()}
              className={`relative group aspect-square bg-white/5 border transition-all cursor-grab active:cursor-grabbing ${
                dropIndex === i && dragIndex !== i
                  ? "border-red-600 scale-95"
                  : "border-white/10 hover:border-white/25"
              } ${i === 0 ? "ring-1 ring-red-600" : ""}`}
            >
              <img
                src={url}
                alt={`Imagem ${i + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              {/* Primary badge */}
              {i === 0 && (
                <span className="absolute bottom-1 left-1 text-[8px] font-black uppercase tracking-widest bg-red-600 text-white px-1 py-0.5">
                  Principal
                </span>
              )}
              {/* Drag handle */}
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical size={14} className="text-white drop-shadow" />
              </div>
              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-red-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <p className="text-white/20 text-[10px]">
          Arraste para reordenar · A primeira imagem é a principal da listagem
        </p>
      )}
    </div>
  )
}
