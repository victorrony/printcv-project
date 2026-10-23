import { HeroSection } from '@/components/sections/HeroSection'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FadeSection } from '@/components/ui/FadeSection'
import { ProductCard } from '@/components/ProductCard'
import { GalleryGrid } from '@/components/GalleryGrid'
import { getProdutos, getGaleria } from '@/lib/conteudo'
import Link from 'next/link'
import { Package } from 'lucide-react'

export default function HomePage() {
  const produtos = getProdutos({ destaque: true, disponivel: true })
  const galeriaItems = getGaleria({ destaque: true })

  return (
    <>
      <HeroSection />
      <ProcessSection />

      {/* Featured Products */}
      <section className="py-[120px] px-6 relative overflow-hidden">
        {/* Background iso-grid */}
        <div className="absolute inset-0 iso-grid opacity-40" />
        <div className="absolute top-1/2 left-[-200px] w-[600px] h-[600px] rounded-full bg-brand/[0.05] blur-[140px] pointer-events-none -translate-y-1/2" />
        <div className="absolute top-1/2 right-[-200px] w-[500px] h-[500px] rounded-full bg-purple-500/[0.04] blur-[120px] pointer-events-none -translate-y-1/2" />
        <div className="relative max-w-6xl mx-auto">
        <FadeSection>
          <p className="section-label">▸ Destaques</p>
          <h2 className="section-title">Produtos em destaque</h2>
        </FadeSection>

        {produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtos.slice(0, 6).map((produto, i) => (
              <FadeSection key={produto.id} delay={i * 0.1}>
                <ProductCard produto={produto} />
              </FadeSection>
            ))}
          </div>
        ) : (
          <FadeSection>
            <div className="text-center py-20 rounded-2xl border-2 border-dashed border-theme">
              <Package size={36} strokeWidth={1.5} className="mx-auto mb-4 text-accent" aria-hidden="true" />
              <p className="text-fg-muted text-sm">
                Novos produtos em breve.
              </p>
            </div>
          </FadeSection>
        )}

        <FadeSection delay={0.3}>
          <div className="text-center mt-12">
            <Link href="/loja" className="btn-secondary">
              Ver todos os produtos
            </Link>
          </div>
        </FadeSection>
        </div>
      </section>

      {/* Gallery / Timelapse Preview */}
      <section className="py-[120px] px-6 relative overflow-hidden bg-elevated">
        {/* Orbs decorativos */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand/[0.06] blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal/[0.05] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/[0.04] blur-[100px] rounded-full pointer-events-none" />
        {/* Linhas horizontais subtis */}
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'repeating-linear-gradient(0deg, var(--border) 0px, var(--border) 1px, transparent 1px, transparent 60px)'}} />
        <div className="max-w-6xl mx-auto relative">
          <FadeSection>
            <p className="section-label">▸ Making of</p>
            <h2 className="section-title">Trabalhos reais da nossa oficina</h2>
            <p className="text-fg-muted text-[15px] max-w-[500px] leading-relaxed mb-12">
              Peças reais, impressas e acabadas na nossa oficina. Veja a impressora
              a trabalhar e o resultado final.
            </p>
          </FadeSection>

          <GalleryGrid items={galeriaItems} />

          <FadeSection delay={0.4}>
            <div className="text-center mt-12">
              <Link href="/galeria" className="btn-secondary">
                Ver galeria completa
              </Link>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-[120px] px-6 section-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '28px 28px'}} />
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-white/[0.06] blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-white/[0.04] blur-[60px] pointer-events-none" />
        <FadeSection>
          <div className="max-w-2xl mx-auto text-center relative">
            <p className="font-mono text-[11px] tracking-[5px] text-white/70 uppercase mb-4 inline-flex items-center gap-2">
              ▸ Pronto para começar?
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white">
              A sua peça, à sua medida
            </h2>
            <p className="text-white/75 text-[15px] leading-relaxed mb-10">
              Descreva o que precisa e respondemos em até 24 horas com uma estimativa
              de preço e prazo de produção.
            </p>
            <Link
              href="/orcamento"
              className="inline-flex items-center justify-center px-10 py-4 rounded-2xl
                         bg-white text-brand-dark text-sm font-bold tracking-wide cursor-pointer
                         transition-all duration-200 hover:scale-[1.03]
                         hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] active:scale-[0.98]"
            >
              Pedir Orçamento Grátis
            </Link>
          </div>
        </FadeSection>
      </section>
    </>
  )
}
