import Image from 'next/image'
import { FadeSection } from '@/components/ui/FadeSection'
import type { GaleriaItem } from '@/lib/types'

interface GalleryGridProps {
  items: GaleriaItem[]
}

export function GalleryGrid({ items }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <FadeSection>
        <div className="text-center py-20 rounded-2xl border-2 border-dashed border-theme">
          <p className="text-4xl mb-4">🎬</p>
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
          <FadeSection key={item.id} delay={i * 0.1}>
            <div className="rounded-2xl overflow-hidden card-hover">
              <div className="relative h-[240px] bg-elevated">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand/20 border-2 border-brand/40 flex items-center justify-center text-xl">
                      ▶
                    </div>
                  </div>
                )}

                {item.tempo_impressao && (
                  <span className="absolute bottom-3 right-3 font-mono text-[11px] text-brand bg-surface/80 backdrop-blur-sm px-2 py-1 rounded-md">
                    ⏱ {item.tempo_impressao}
                  </span>
                )}
              </div>

              <div className="p-5">
                {item.material && (
                  <span className="font-mono text-[10px] tracking-[2px] text-brand uppercase">
                    {item.material}
                  </span>
                )}
                <h3 className="text-base font-bold mt-1 text-fg">{item.titulo}</h3>
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
