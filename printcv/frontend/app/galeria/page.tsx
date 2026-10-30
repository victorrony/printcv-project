import { getGaleria } from '@/lib/conteudo'
import { FadeSection } from '@/components/ui/FadeSection'
import { GalleryGrid } from '@/components/GalleryGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galeria — PrintCV',
  description: 'Portfolio de peças impressas em 3D pela PrintCV em Cabo Verde.',
}

export default function GaleriaPage() {
  const items = getGaleria()

  return (
    <section className="pt-[120px] pb-[80px] px-6 md:px-0 max-w-6xl mx-auto">
      <FadeSection>
        <p className="section-label">▸ Making of</p>
        <h1 className="section-title">Galeria</h1>
        <p className="text-fg-muted text-[15px] max-w-[500px] leading-relaxed mb-12">
          Peças que já saíram da nossa impressora, fotografadas e filmadas na oficina,
          na Praia. Do primeiro barco de teste ao acabamento pintado à mão.
        </p>
      </FadeSection>

      <GalleryGrid items={items} nivelTitulo="h2" comFiltros />
    </section>
  )
}
