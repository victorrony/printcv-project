'use client'

import { useState } from 'react'
import Image from 'next/image'
import { SemFoto } from '@/components/TiraProduto'

interface GaleriaProdutoProps {
  imagens: string[]
  nome: string
}

// Imagem principal do produto com miniaturas clicáveis
export function GaleriaProduto({ imagens, nome }: GaleriaProdutoProps) {
  const [atual, setAtual] = useState(0)
  const principal = imagens[atual] ?? null

  return (
    <div>
      <div className="relative aspect-square overflow-hidden bg-algodao-sombra">
        {principal ? (
          <Image
            src={principal}
            alt={imagens.length > 1 ? `${nome} — imagem ${atual + 1} de ${imagens.length}` : nome}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 640px, (min-width: 768px) 52vw, 100vw"
            priority
          />
        ) : (
          <SemFoto motivo="xadrez" />
        )}
      </div>

      {imagens.length > 1 && (
        <div className="mt-2 flex gap-2">
          {imagens.slice(0, 4).map((img, i) => (
            <button
              key={`${i}-${img}`}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver imagem ${i + 1} de ${imagens.length}`}
              aria-pressed={i === atual}
              className={`relative h-20 w-20 overflow-hidden border-2 transition-colors ${
                i === atual ? 'border-indigo' : 'border-transparent hover:border-indigo-fio'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
