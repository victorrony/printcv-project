'use client'

import { useState } from 'react'
import Image from 'next/image'
import { VideoLoop } from '@/components/ui/VideoLoop'
import { formatData } from '@/lib/format'
import type { GaleriaItem } from '@/lib/types'

/**
 * A única banda preta da página: os timelapses da oficina num ecrã grande,
 * com a lista dos vídeos ao lado, como fotogramas com a data de cada um.
 */
export function BandaTimelapses({ videos }: { videos: GaleriaItem[] }) {
  const [atual, setAtual] = useState(0)
  const video = videos[atual]
  if (!video?.video_timelapse) return null

  return (
    <section aria-labelledby="titulo-timelapses" className="banda-preta py-20 md:py-28">
      <div className="moldura">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 id="titulo-timelapses" className="titulo-banda max-w-[16ch]">
            A impressora a trabalhar
          </h2>
          <p className="max-w-[38ch] text-[1.05rem] leading-relaxed text-indigo-claro">
            Vídeos reais da oficina, acelerados. Sem som, sem cortes no que interessa: o bico a depositar o
            plástico, camada sobre camada.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:gap-8">
          <div className="relative aspect-video overflow-hidden bg-indigo">
            {/* key: muda de vídeo do zero, sem herdar o estado do anterior */}
            <VideoLoop
              key={video.id}
              src={video.video_timelapse}
              poster={video.imagens[0]}
              titulo={video.titulo}
            />
          </div>

          <div className="tiras">
            <ol className="grid" aria-label="Escolher vídeo">
              {videos.map((v, i) => {
                const activo = i === atual
                return (
                  <li key={v.id} className="tira">
                    <button
                      type="button"
                      onClick={() => setAtual(i)}
                      aria-pressed={activo}
                      className={`flex w-full items-start gap-4 px-4 py-4 text-left transition-colors ${
                        activo ? 'bg-algodao text-indigo' : 'hover:bg-indigo'
                      }`}
                    >
                      <span className="relative aspect-video w-20 shrink-0 overflow-hidden bg-indigo">
                        {v.imagens[0] && (
                          <Image src={v.imagens[0]} alt="" fill sizes="80px" className="object-cover" />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold leading-snug">{v.titulo}</span>
                        <span
                          className={`letra-estreita numeros mt-1 block text-xs ${
                            activo ? 'text-algodao-texto' : 'text-indigo-claro'
                          }`}
                        >
                          {formatData(v.data)}
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <p className="mt-5 max-w-[60ch] text-indigo-claro" aria-live="polite">
          {video.descricao}
        </p>
      </div>
    </section>
  )
}
