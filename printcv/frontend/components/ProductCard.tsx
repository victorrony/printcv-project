import Link from 'next/link'
import Image from 'next/image'
import type { Produto } from '@/lib/types'
import { getStrapiImageUrl, formatPreco } from '@/lib/strapi'

interface ProductCardProps {
  produto: Produto
}

export function ProductCard({ produto }: ProductCardProps) {
  const imageUrl = produto.imagens?.[0]
    ? getStrapiImageUrl(produto.imagens[0])
    : null

  return (
    <Link href={`/loja/${produto.slug}`}>
      <div className="rounded-2xl overflow-hidden card-hover group cursor-pointer">
        {/* Image */}
        <div className="relative h-[200px] bg-elevated border-b border-theme flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={produto.nome}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 opacity-40">
              <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center text-2xl">
                📦
              </div>
            </div>
          )}

          {/* Category badge */}
          {produto.categoria && (
            <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[2px] text-brand bg-brand/10 border border-brand/20 px-3 py-1 rounded-md uppercase">
              {produto.categoria.nome}
            </span>
          )}

          {/* Sold out overlay */}
          {!produto.disponivel && (
            <div className="absolute inset-0 bg-surface/80 flex items-center justify-center">
              <span className="font-mono text-sm text-fg-muted tracking-wider uppercase border border-theme px-4 py-2 rounded-lg">
                Indisponível
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-bold mb-2 text-fg">{produto.nome}</h3>
          <p className="text-sm text-fg-muted leading-relaxed mb-5 line-clamp-2">
            {produto.descricao}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-mono text-brand">
              {produto.preco_sob_consulta ? 'A combinar' : formatPreco(produto.preco)}
            </span>

            {produto.tempo_producao && (
              <span className="text-[11px] text-fg-subtle font-mono bg-elevated px-2 py-1 rounded-md">
                ⏱ {produto.tempo_producao}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
