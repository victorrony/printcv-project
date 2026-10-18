import { getProdutos, getCategorias } from '@/lib/conteudo'
import { ProductCard } from '@/components/ProductCard'
import { FadeSection } from '@/components/ui/FadeSection'
import { CategoryFilter } from './CategoryFilter'
import { Package } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loja — PrintCV',
  description: 'Peças impressas em 3D disponíveis para compra em Cabo Verde.',
}

export default function LojaPage({
  searchParams,
}: {
  searchParams: { categoria?: string | string[] }
}) {
  // ?categoria= vazio ou repetido conta como "Todos"
  const categoria =
    typeof searchParams.categoria === 'string' && searchParams.categoria
      ? searchParams.categoria
      : undefined
  const produtos = getProdutos({ categoria })
  const categorias = getCategorias()

  return (
    <section className="pt-[120px] pb-[80px] px-6 md:px-0 max-w-6xl mx-auto">
      <FadeSection>
        <p className="section-label">▸ Catálogo</p>
        <h1 className="section-title">Produtos</h1>
      </FadeSection>

      <FadeSection delay={0.1}>
        <CategoryFilter
          categorias={categorias}
          activeSlug={categoria}
        />
      </FadeSection>

      {produtos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {produtos.map((produto, i) => (
            <FadeSection key={produto.id} delay={i * 0.08}>
              <ProductCard produto={produto} nivelTitulo="h2" />
            </FadeSection>
          ))}
        </div>
      ) : (
        <FadeSection>
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-theme mt-8">
            <Package size={36} strokeWidth={1.5} className="mx-auto mb-4 text-accent" aria-hidden="true" />
            <p className="text-fg-muted text-sm">
              {categoria
                ? 'Nenhum produto nesta categoria ainda.'
                : 'Novos produtos em breve.'}
            </p>
          </div>
        </FadeSection>
      )}
    </section>
  )
}
