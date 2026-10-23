import Image from 'next/image'
import { Clapperboard, Clock, Play } from 'lucide-react'
import { FadeSection } from '@/components/ui/FadeSection'
import { VideoLoop } from '@/components/ui/VideoLoop'
import type { GaleriaItem } from '@/lib/types'

interface GalleryGridProps {
  items: GaleriaItem[]
  /** h2 quando a grelha vem logo a seguir ao h1 da página */
  nivelTitulo?: 'h2' | 'h3'
}

export function GalleryGrid({ items, nivelTitulo: Titulo = 'h3' }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <FadeSection>
        <div className="text-center py-20 rounded-2xl border-2 border-dashed border-theme">
          <Clapperboard size={36} strokeWidth={1.5} className="mx-auto mb-4 text-accent" aria-hidden="true" />
          <p className="text-fg-muted text-sm">
            Novos trabalhos em breve.
          </p>
        </div>
      </FadeSection>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, i) => {
        const imageUrl = item.imagens[0] ?? null

        return (
          // Atraso por coluna (0–0,2 s), para não crescer com o número de cartões
          <FadeSection key={item.id} delay={(i % 3) * 0.1}>
            <div className="rounded-2xl overflow-hidden card-hover">
              <div className="relative aspect-square bg-elevated">
                {item.video_timelapse ? (
                  <VideoLoop
                    src={item.video_timelapse}
                    poster={imageUrl ?? undefined}
                    titulo={item.titulo}
                    ajuste={item.inteira ? 'contain' : 'cover'}
                    foco={item.foco}
                  />
                ) : imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.titulo}
                    fill
                    className={item.inteira ? 'object-contain p-3' : 'object-cover'}
                    style={item.foco ? { objectPosition: item.foco } : undefined}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand/20 border-2 border-brand/40 flex items-center justify-center text-accent">
                      <Play size={22} fill="currentColor" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {item.portfolio && (
                  <span className="absolute top-3 left-3 font-mono text-[10px] tracking-[2px] uppercase text-fg bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                    Portfólio · não está à venda
                  </span>
                )}

                {item.tempo_impressao && (
                  <span className="absolute bottom-3 right-3 font-mono text-[11px] text-accent bg-surface/80 backdrop-blur-sm px-2 py-1 rounded-md">
                    <Clock size={11} className="inline -mt-0.5 mr-1" aria-hidden="true" />
                    <span className="sr-only">Tempo de impressão:</span> {item.tempo_impressao}
                  </span>
                )}
              </div>

              <div className="p-5">
                {item.material && (
                  <span className="font-mono text-[10px] tracking-[2px] text-accent uppercase">
                    {item.material}
                  </span>
                )}
                <Titulo className="text-base font-bold mt-1 text-fg">{item.titulo}</Titulo>
                {item.descricao && (
                  <p className="text-xs text-fg-muted mt-2 line-clamp-2">{item.descricao}</p>
                )}
              </div>
            </div>
          </FadeSection>
        )
      })}
    </div>
  )
}
