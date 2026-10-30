'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Clock, X } from 'lucide-react'
import { useMenosMovimento } from '@/lib/useMenosMovimento'
import type { GaleriaItem } from '@/lib/types'

interface LightboxProps {
  items: GaleriaItem[]
  /** Índice do trabalho aberto em `items`; null fecha */
  indice: number | null
  onMudar: (indice: number) => void
  onFechar: () => void
}

// Vista em grande de um trabalho da galeria. Usa o <dialog> nativo em modo modal:
// o foco fica preso lá dentro, Escape fecha e o foco volta ao cartão que o abriu.
// Setas do teclado e deslizar no telemóvel passam ao trabalho anterior/seguinte.
export function Lightbox({ items, indice, onMudar, onFechar }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const toqueX = useRef<number | null>(null)
  const menosMovimento = useMenosMovimento()
  const item = indice !== null ? items[indice] : null
  const total = items.length

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  function passar(direcao: 1 | -1) {
    if (indice === null || total < 2) return
    onMudar((indice + direcao + total) % total)
  }

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      onKeyDown={(e) => {
        // No vídeo, as setas avançam/recuam o próprio vídeo
        if (e.target instanceof HTMLVideoElement) return
        if (e.key === 'ArrowRight') passar(1)
        if (e.key === 'ArrowLeft') passar(-1)
      }}
      onTouchStart={(e) => {
        // Ignora zoom com dois dedos e arrastar a barra do vídeo
        const ignora = e.touches.length > 1 || e.target instanceof HTMLVideoElement
        toqueX.current = ignora ? null : e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (toqueX.current === null) return
        const dx = e.changedTouches[0].clientX - toqueX.current
        toqueX.current = null
        if (Math.abs(dx) > 50) passar(dx < 0 ? 1 : -1)
      }}
      aria-labelledby="lightbox-titulo"
      className="lightbox fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-black/95 p-0 text-white backdrop:bg-transparent"
    >
      {item && (
        // Clicar fora da imagem (no fundo escuro) fecha
        <div
          className="flex h-full flex-col"
          onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close() }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <p className="font-mono text-xs tracking-[2px] text-white/70">
              {indice! + 1} / {total}
            </p>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Fechar"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          {/* Imagem e vídeo no tamanho próprio, para o clique na zona escura à volta fechar */}
          <div
            key={item.id}
            className="lightbox-media mx-4 flex min-h-0 flex-1 items-center justify-center md:mx-20"
            onClick={(e) => { if (e.target === e.currentTarget) ref.current?.close() }}
          >
            {item.video_timelapse ? (
              <video
                src={item.video_timelapse}
                poster={item.imagens[0]}
                controls
                muted
                loop
                playsInline
                autoPlay={!menosMovimento}
                aria-label={item.titulo}
                className="max-h-full max-w-full rounded-lg"
              />
            ) : item.imagens[0] ? (
              <Image
                src={item.imagens[0]}
                alt={item.titulo}
                width={0}
                height={0}
                sizes="(min-width: 768px) 80vw, 100vw"
                className="h-auto max-h-full w-auto max-w-full rounded-lg"
              />
            ) : null}
          </div>

          {/* Setas aos lados do ecrã no computador; no telemóvel ficam por baixo da legenda */}
          {total > 1 && (
            <>
              <BotaoPassar direcao={-1} onClick={passar} className="absolute left-3 top-1/2 hidden -translate-y-1/2 md:flex" />
              <BotaoPassar direcao={1} onClick={passar} className="absolute right-3 top-1/2 hidden -translate-y-1/2 md:flex" />
            </>
          )}

          <div className="mx-auto w-full max-w-2xl px-6 pb-6 pt-4 text-center" aria-live="polite">
            <div className="mb-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[2px] text-white/70">
              {item.material && <span>{item.material}</span>}
              {item.tempo_impressao && (
                <span>
                  <Clock size={11} className="-mt-0.5 mr-1 inline" aria-hidden="true" />
                  <span className="sr-only">Tempo de impressão:</span> {item.tempo_impressao}
                </span>
              )}
              {item.portfolio && <span>Portfólio · não está à venda</span>}
            </div>
            <h2 id="lightbox-titulo" className="text-lg font-bold">{item.titulo}</h2>
            {item.descricao && (
              <p className="mt-1 text-sm leading-relaxed text-white/75">{item.descricao}</p>
            )}

            {total > 1 && (
              <div className="mt-4 flex justify-center gap-3 md:hidden">
                <BotaoPassar direcao={-1} onClick={passar} className="flex" />
                <BotaoPassar direcao={1} onClick={passar} className="flex" />
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}

function BotaoPassar({ direcao, onClick, className }: {
  direcao: 1 | -1
  onClick: (direcao: 1 | -1) => void
  className: string
}) {
  const Icone = direcao === 1 ? ChevronRight : ChevronLeft
  return (
    <button
      type="button"
      onClick={() => onClick(direcao)}
      aria-label={direcao === 1 ? 'Trabalho seguinte' : 'Trabalho anterior'}
      className={`${className} h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20`}
    >
      <Icone size={24} aria-hidden="true" />
    </button>
  )
}
