import Link from 'next/link'
import Image from 'next/image'
import type { Produto } from '@/lib/types'
import { Clock, Package } from 'lucide-react'
import { formatPreco } from '@/lib/format'

interface ProductCardProps {
  produto: Produto
  /** h2 quando a grelha vem logo a seguir ao h1 da página */
  nivelTitulo?: 'h2' | 'h3'
}

export function ProductCard({ produto, nivelTitulo: Titulo = 'h3' }: ProductCardProps) {
  const imageUrl = produto.imagens[0] ?? null

  return (
    <Link href={`/loja/${produto.slug}`} className="block rounded-2xl">
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
              <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center text-accent">
                <Package size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
            </div>
          )}

          {/* Category badge */}
          {produto.categoria && (
            <span className="absolute top-3 right-3 font-mono text-[10px] tracking-[2px] text-accent bg-brand/10 border border-brand/20 px-3 py-1 rounded-md uppercase">
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
          <Titulo className="text-lg font-bold mb-2 text-fg">{produto.nome}</Titulo>
          <p className="text-sm text-fg-muted leading-relaxed mb-5 line-clamp-2">
            {produto.descricao}
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-mono text-accent">
              {produto.preco_sob_consulta ? 'A combinar' : formatPreco(produto.preco)}
            </span>

            {produto.tempo_producao && (
              <span className="inline-flex items-center gap-1 text-[11px] text-fg-subtle font-mono bg-elevated px-2 py-1 rounded-md">
                <Clock size={11} aria-hidden="true" />
                <span className="sr-only">Tempo de produção:</span> {produto.tempo_producao}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
