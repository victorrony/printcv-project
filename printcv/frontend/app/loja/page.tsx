import { getProdutos, getCategorias } from '@/lib/strapi'
import { ProductCard } from '@/components/ProductCard'
import { FadeSection } from '@/components/ui/FadeSection'
import { CategoryFilter } from './CategoryFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Loja — PrintCV',
  description: 'Peças impressas em 3D disponíveis para compra em Cabo Verde.',
}

export default async function LojaPage({
  searchParams,
}: {
  searchParams: { categoria?: string }
}) {
  let produtos: any[] = []
  let categorias: any[] = []

  try {
    const [produtosRes, categoriasRes] = await Promise.all([
      getProdutos(searchParams.categoria ? { categoria: searchParams.categoria } : undefined),
      getCategorias(),
    ])
    produtos = produtosRes.data || []
    categorias = categoriasRes.data || []
  } catch {
    // Strapi not connected
  }

  return (
    <section className="pt-[120px] pb-[80px] px-6 max-w-6xl mx-auto">
      <FadeSection>
        <p className="section-label">▸ Catálogo</p>
        <h1 className="section-title">Produtos</h1>
      </FadeSection>

      <FadeSection delay={0.1}>
        <CategoryFilter
          categorias={categorias}
          activeSlug={searchParams.categoria}
        />
      </FadeSection>

      {produtos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {produtos.map((produto, i) => (
            <FadeSection key={produto.id} delay={i * 0.08}>
              <ProductCard produto={produto} />
            </FadeSection>
          ))}
        </div>
      ) : (
        <FadeSection>
          <div className="text-center py-20 rounded-2xl border-2 border-dashed border-theme mt-8">
            <p className="text-4xl mb-4">📦</p>
            <p className="text-fg-muted text-sm">
              {searchParams.categoria
                ? 'Nenhum produto nesta categoria ainda.'
                : 'Os produtos aparecerão aqui quando adicionados no Strapi.'}
            </p>
          </div>
        </FadeSection>
      )}
    </section>
  )
}
