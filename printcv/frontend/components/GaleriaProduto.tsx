'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Package } from 'lucide-react'

interface GaleriaProdutoProps {
  imagens: string[]
  nome: string
}

// Imagem principal do produto com miniaturas clicáveis
export function GaleriaProduto({ imagens, nome }: GaleriaProdutoProps) {
  const [atual, setAtual] = useState(0)
  const principal = imagens[atual] ?? null

  return (
    <>
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-elevated border border-theme">
        {principal ? (
          <Image
            src={principal}
            alt={imagens.length > 1 ? `${nome} — imagem ${atual + 1} de ${imagens.length}` : nome}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 460px, (min-width: 768px) 45vw, 100vw"
            priority
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-accent opacity-30">
            <Package size={96} strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
      </div>

      {imagens.length > 1 && (
        <div className="flex gap-3 mt-4">
          {imagens.slice(0, 4).map((img, i) => (
            <button
              key={`${i}-${img}`}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver imagem ${i + 1} de ${imagens.length}`}
              aria-pressed={i === atual}
              className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                i === atual ? 'border-brand' : 'border-theme hover:border-brand/50'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </>
  )
}
