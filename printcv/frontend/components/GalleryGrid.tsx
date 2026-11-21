'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Clock, Maximize2 } from 'lucide-react'
import { VideoLoop } from '@/components/ui/VideoLoop'
import { Lightbox } from '@/components/ui/Lightbox'
import type { GaleriaItem } from '@/lib/types'
import { formatData } from '@/lib/format'

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
      <div className="border-2 border-indigo px-6 py-16 text-center">
        <p className="text-[1.1rem]">Os primeiros trabalhos aparecem aqui em breve.</p>
      </div>
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
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar trabalhos">
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
                className={`inline-flex min-h-[2.75rem] items-center gap-2 border-2 px-4 text-[0.95rem] font-semibold transition-colors ${
                  activo
                    ? 'border-indigo bg-indigo text-algodao'
                    : 'border-indigo hover:bg-algodao-sombra'
                }`}
              >
                {f.nome}{' '}
                <span className={`numeros text-sm ${activo ? 'text-indigo-claro' : 'text-algodao-texto'}`}>{quantos}</span>
              </button>
            )
          })}
          <p className="sr-only" aria-live="polite">
            {visiveis.length} {visiveis.length === 1 ? 'trabalho' : 'trabalhos'}
          </p>
        </div>
      )}

      <div className="tiras">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((item) => {
          const imageUrl = item.imagens[0] ?? null
          const indiceAbrir = abriveis.indexOf(item)

          return (
            <li key={item.id} className="tira">
              <div className="group h-full bg-algodao">
                <div className="relative aspect-square overflow-hidden bg-algodao-sombra">
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
                  ) : null}

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
                        className="pointer-events-none absolute right-0 top-0 z-[3] flex h-10 w-10 items-center justify-center bg-algodao text-indigo opacity-0 transition-opacity group-hover:opacity-100 peer-focus-visible:opacity-100"
                      >
                        <Maximize2 size={15} />
                      </span>
                    </>
                  )}

                  {item.portfolio && (
                    <span className="letra-estreita pointer-events-none absolute left-0 top-0 z-[3] bg-indigo px-3 py-1.5 text-[0.7rem] text-algodao">
                      Portfólio · não está à venda
                    </span>
                  )}

                  {item.tempo_impressao && (
                    <span className="numeros pointer-events-none absolute bottom-0 right-0 bg-algodao px-2.5 py-1.5 text-xs">
                      <Clock size={11} className="inline -mt-0.5 mr-1" aria-hidden="true" />
                      <span className="sr-only">Tempo de impressão:</span> {item.tempo_impressao}
                    </span>
                  )}
                </div>

                <div className="px-5 pb-6 pt-4">
                  <Titulo className="text-[1.1rem] font-bold leading-snug">{item.titulo}</Titulo>
                  <span className="letra-estreita numeros mt-1 block text-xs text-algodao-texto">
                    {formatData(item.data)}
                    {item.material && ` · ${item.material}`}
                    {item.video_timelapse && ' · vídeo'}
                  </span>
                  {item.descricao && (
                    <p className="mt-2 line-clamp-2 text-[0.95rem] leading-relaxed text-algodao-texto">{item.descricao}</p>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
      </div>

      <Lightbox items={abriveis} indice={aberto} onMudar={setAberto} onFechar={fechar} />
    </>
  )
}
