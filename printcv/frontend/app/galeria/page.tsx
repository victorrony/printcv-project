import type { Metadata } from 'next'
import { getGaleria } from '@/lib/conteudo'
import { GalleryGrid } from '@/components/GalleryGrid'
import { CabecalhoPagina } from '@/components/CabecalhoPagina'

export const metadata: Metadata = {
  title: 'Galeria — PrintCV',
  description: 'Trabalhos impressos em 3D pela PrintCV na Praia, Cabo Verde: fotografias e vídeos da oficina.',
}

export default function GaleriaPage() {
  const items = getGaleria()

  return (
    <>
      <CabecalhoPagina
        titulo="Galeria"
        motivo="dente"
        texto="Peças que já saíram da impressora, fotografadas e filmadas na oficina, na Praia. Do primeiro barco de teste ao acabamento pintado à mão."
      />
      <section aria-label="Trabalhos" className="banda-clara py-14 md:py-20">
        <div className="moldura">
          <GalleryGrid items={items} nivelTitulo="h2" comFiltros />
        </div>
      </section>
    </>
  )
}
