'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Clapperboard, Clock, Maximize2, Play } from 'lucide-react'
import { FadeSection } from '@/components/ui/FadeSection'
import { VideoLoop } from '@/components/ui/VideoLoop'
import { Lightbox } from '@/components/ui/Lightbox'
import type { GaleriaItem } from '@/lib/types'

interface GalleryGridProps {
  items: GaleriaItem[]
  /** h2 quando a grelha vem logo a seguir ao h1 da página */
  nivelTitulo?: 'h2' | 'h3'
  /** Mostra os botões de filtro (página da galeria) */
  comFiltros?: boolean
}

const FILTROS = [
  { id: 'todos', nome: 'Todos', aceita: () => true },
  { id: 'pecas', nome: 'Peças nossas', aceita: (g: GaleriaItem) => !g.portfolio && !g.video_timelapse },
  { id: 'videos', nome: 'Vídeos', aceita: (g: GaleriaItem) => Boolean(g.video_timelapse) },
  { id: 'portfolio', nome: 'Portfólio', aceita: (g: GaleriaItem) => Boolean(g.portfolio) },
] as const

type FiltroId = (typeof FILTROS)[number]['id']

export function GalleryGrid({ items, nivelTitulo: Titulo = 'h3', comFiltros = false }: GalleryGridProps) {
  const [filtro, setFiltro] = useState<FiltroId>('todos')
  const [aberto, setAberto] = useState<number | null>(null)

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

  const visiveis = items.filter(FILTROS.find((f) => f.id === filtro)!.aceita)
  // Só abrem em grande os trabalhos com foto ou vídeo; as setas do lightbox seguem esta lista
  const abriveis = visiveis.filter((g) => g.imagens[0] || g.video_timelapse)

  function fechar() {
    // O <dialog> devolve o foco ao cartão que o abriu; queremos o último trabalho visto
    const id = aberto !== null ? abriveis[aberto]?.id : undefined
    setAberto(null)
    document.querySelector<HTMLButtonElement>(`[data-abrir="${id}"]`)?.focus()
  }

  return (
    <>
      {comFiltros && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filtrar trabalhos">
          {FILTROS.map((f) => {
            const quantos = items.filter(f.aceita).length
            if (quantos === 0) return null
            const activo = filtro === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltro(f.id)}
                aria-pressed={activo}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  activo
                    ? 'border-brand-dark bg-brand-dark text-white'
                    : 'border-theme bg-surface text-fg-muted hover:text-accent'
                }`}
              >
                {f.nome} <span className="font-mono text-xs font-normal">{quantos}</span>
              </button>
            )
          })}
          <p className="sr-only" aria-live="polite">
            {visiveis.length} {visiveis.length === 1 ? 'trabalho' : 'trabalhos'}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiveis.map((item, i) => {
          const imageUrl = item.imagens[0] ?? null
          const indiceAbrir = abriveis.indexOf(item)

          return (
            // Atraso por coluna (0–0,2 s), para não crescer com o número de cartões
            <FadeSection key={item.id} delay={(i % 3) * 0.1}>
              <div className="group rounded-2xl overflow-hidden card-hover">
                <div className="relative aspect-square overflow-hidden bg-elevated">
                  {item.video_timelapse ? (
                    <VideoLoop
                      src={item.video_timelapse}
                      poster={imageUrl ?? undefined}
                      titulo={item.titulo}
                      ajuste={item.inteira ? 'contain' : 'cover'}
                      foco={item.foco}
                      suspenso={aberto !== null}
                    />
                  ) : imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.titulo}
                      fill
                      className={`transition-transform duration-500 group-hover:scale-[1.03] ${item.inteira ? 'object-contain p-3' : 'object-cover'}`}
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

                  {/* Cobre o cartão para o abrir em grande; o botão de pausa do vídeo fica por cima */}
                  {indiceAbrir !== -1 && (
                    <>
                      <button
                        type="button"
                        data-abrir={item.id}
                        onClick={() => setAberto(indiceAbrir)}
                        aria-label={`Ver em grande: ${item.titulo}`}
                        className="peer absolute inset-0 cursor-zoom-in focus-visible:outline-offset-[-4px]"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-surface/85 text-fg opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100 peer-focus-visible:opacity-100"
                      >
                        <Maximize2 size={15} />
                      </span>
                    </>
                  )}

                  {item.portfolio && (
                    <span className="pointer-events-none absolute top-3 left-3 font-mono text-[10px] tracking-[2px] uppercase text-fg bg-surface/90 backdrop-blur-sm px-2.5 py-1 rounded-md">
                      Portfólio · não está à venda
                    </span>
                  )}

                  {item.tempo_impressao && (
                    <span className="pointer-events-none absolute bottom-3 right-3 font-mono text-[11px] text-accent bg-surface/80 backdrop-blur-sm px-2 py-1 rounded-md">
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

      <Lightbox items={abriveis} indice={aberto} onMudar={setAberto} onFechar={fechar} />
    </>
  )
}
