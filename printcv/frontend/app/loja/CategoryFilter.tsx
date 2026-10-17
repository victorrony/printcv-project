'use client'

import { useRouter } from 'next/navigation'
import type { Categoria } from '@/lib/types'

interface CategoryFilterProps {
  categorias: Categoria[]
  activeSlug?: string
}

export function CategoryFilter({ categorias, activeSlug }: CategoryFilterProps) {
  const router = useRouter()

  const handleFilter = (slug?: string) => {
    if (slug) {
      router.push(`/loja?categoria=${slug}`)
    } else {
      router.push('/loja')
    }
  }

  return (
    <div className="flex gap-3 flex-wrap">
      <button
        onClick={() => handleFilter()}
        className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
          !activeSlug
            ? 'border-brand bg-brand/[0.12] text-brand'
            : 'border-theme bg-elevated text-fg-muted hover:border-brand/40 hover:text-brand'
        }`}
      >
        Todos
      </button>
      {categorias.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleFilter(cat.slug)}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
            activeSlug === cat.slug
              ? 'border-brand bg-brand/[0.12] text-brand'
              : 'border-theme bg-elevated text-fg-muted hover:border-brand/40 hover:text-brand'
          }`}
        >
          {cat.icone ? `${cat.icone} ${cat.nome}` : cat.nome}
        </button>
      ))}
    </div>
  )
}
