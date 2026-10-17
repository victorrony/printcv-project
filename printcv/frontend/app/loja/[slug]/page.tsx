import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProdutos, getProdutoBySlug } from '@/lib/conteudo'
import { formatPreco } from '@/lib/format'
import { linkWhatsApp } from '@/lib/site'
import { FadeSection } from '@/components/ui/FadeSection'
import { ArrowLeft, Clock, Ruler, Package } from 'lucide-react'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return getProdutos().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const produto = getProdutoBySlug(params.slug)
  if (!produto) return { title: 'Produto — PrintCV' }
  return {
    title: `${produto.nome} — PrintCV`,
    description: produto.descricao.substring(0, 160),
  }
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const produto = getProdutoBySlug(params.slug)
  if (!produto) notFound()

  const mainImage = produto.imagens[0] ?? null

  return (
    <section className="pt-[100px] pb-[80px] px-6 max-w-5xl mx-auto">
      <FadeSection>
        <Link
          href="/loja"
          className="inline-flex items-center gap-2 text-sm text-fg-muted hover:text-brand transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Voltar à loja
        </Link>
      </FadeSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image */}
        <FadeSection>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-elevated border border-theme">
            {mainImage ? (
              <Image
                src={mainImage}
                alt={produto.nome}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-7xl opacity-20">
                📦
              </div>
            )}
          </div>

          {/* Thumbnail gallery */}
          {produto.imagens.length > 1 && (
            <div className="flex gap-3 mt-4">
              {produto.imagens.slice(0, 4).map((img, i) => (
                <div
                  key={`${i}-${img}`}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-theme"
                >
                  <Image
                    src={img}
                    alt={`${produto.nome} - ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </FadeSection>

        {/* Details */}
        <FadeSection delay={0.2}>
          {produto.categoria && (
            <span className="inline-block font-mono text-[10px] tracking-[2px] text-brand bg-brand/10 px-3 py-1 rounded-md uppercase mb-4">
              {produto.categoria.nome}
            </span>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight mb-4 text-fg">
            {produto.nome}
          </h1>

          <p className="text-fg-muted leading-relaxed mb-8">
            {produto.descricao}
          </p>

          {/* Price */}
          <div className="text-3xl font-extrabold font-mono bg-gradient-to-r from-teal to-teal-light bg-clip-text text-transparent mb-8">
            {produto.preco_sob_consulta ? 'A combinar' : formatPreco(produto.preco)}
          </div>

          {/* Specs */}
          <div className="flex flex-col gap-3 mb-8 p-5 rounded-xl bg-elevated border border-theme">
            {produto.material && (
              <div className="flex items-center gap-3 text-sm">
                <Package size={16} className="text-brand" />
                <span className="text-fg-muted">Material:</span>
                <span className="font-semibold text-fg">{produto.material}</span>
              </div>
            )}
            {produto.dimensoes && (
              <div className="flex items-center gap-3 text-sm">
                <Ruler size={16} className="text-brand" />
                <span className="text-fg-muted">Dimensões:</span>
                <span className="font-semibold text-fg">{produto.dimensoes}</span>
              </div>
            )}
            {produto.tempo_producao && (
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-brand" />
                <span className="text-fg-muted">Tempo de produção:</span>
                <span className="font-semibold text-fg">{produto.tempo_producao}</span>
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href={linkWhatsApp(
              `Olá! Estou interessado no produto "${produto.nome}" (${produto.preco_sob_consulta ? 'preço a combinar' : formatPreco(produto.preco)}). Podem dar-me mais informações?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 w-full justify-center"
          >
            Encomendar via WhatsApp
          </a>

          {!produto.disponivel && (
            <p className="text-center text-sm text-fg-muted mt-3">
              Este produto está temporariamente indisponível.
            </p>
          )}
        </FadeSection>
      </div>
    </section>
  )
}
