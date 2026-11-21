'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useMenosMovimento } from '@/lib/useMenosMovimento'
import { preenchimento, type Motivo, type Tom } from './Padroes'

type NavegadorExtra = Navigator & { connection?: { saveData?: boolean } }

// Linhas do pano, de baixo para cima (a ordem em que se tece e em que se imprime)
const LINHAS: [Motivo, Tom][] = [
  ['riscas', 'escuro'],
  ['losango', 'claro'],
  ['xadrez', 'escuro'],
  ['dente', 'claro'],
  ['riscas', 'escuro'],
  ['losango', 'escuro'],
  ['dente', 'claro'],
  ['xadrez', 'claro'],
  ['riscas', 'escuro'],
  ['losango', 'claro'],
  ['dente', 'escuro'],
  ['riscas', 'claro'],
]
const TOTAL = LINHAS.length

interface TearProps {
  src: string
  poster: string
  titulo: string
  legenda: string
}

/**
 * O tear: o timelapse da impressora ao lado de uma banda de pano que se tece,
 * linha a linha, ao ritmo do vídeo. Quando a impressão recomeça, o pano também.
 * Sem vídeo a tocar (menos movimento, poupança de dados, pausa) o pano fica completo.
 */
export function Tear({ src, poster, titulo, legenda }: TearProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const menosMovimento = useMenosMovimento()
  const [poupaDados, setPoupaDados] = useState(false)
  const [escolha, setEscolha] = useState<'auto' | 'tocar' | 'pausar'>('auto')
  const [aTocar, setATocar] = useState(false)
  const [tecidas, setTecidas] = useState(TOTAL)

  useEffect(() => {
    setPoupaDados(Boolean((navigator as NavegadorExtra).connection?.saveData))
  }, [])

  const deveTocar = escolha === 'tocar' || (escolha === 'auto' && !menosMovimento && !poupaDados)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && deveTocar) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.3 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [deveTocar])

  function acompanhar() {
    const video = ref.current
    if (!video || !video.duration) return
    // Pelo menos uma linha: o pano nunca fica vazio
    setTecidas(Math.max(1, Math.ceil((video.currentTime / video.duration) * TOTAL)))
  }

  const pano = aTocar ? tecidas : TOTAL
  const alturaLinha = 100 / TOTAL

  return (
    <figure className="m-0">
      <div className="bg-algodao p-2 sm:p-2.5">
        <div className="grid gap-2 sm:gap-2.5">
          <div className="relative aspect-video overflow-hidden bg-preto">
            <video
              ref={ref}
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={titulo}
              onPlay={() => setATocar(true)}
              onPause={() => setATocar(false)}
              onTimeUpdate={acompanhar}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => setEscolha(aTocar ? 'pausar' : 'tocar')}
              aria-label={aTocar ? `Pausar vídeo: ${titulo}` : `Reproduzir vídeo: ${titulo}`}
              className="absolute bottom-0 left-0 flex h-11 w-11 items-center justify-center bg-algodao text-indigo transition-colors hover:bg-indigo hover:text-algodao"
            >
              {aTocar ? (
                <Pause size={18} fill="currentColor" aria-hidden="true" />
              ) : (
                <Play size={18} fill="currentColor" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* O pano que se tece por baixo do vídeo, a toda a largura: uma linha por cada
              doze avos da impressão. Por cima do que já está tecido, só a urdidura. */}
          <svg aria-hidden="true" focusable="false" className="block h-[192px] w-full bg-indigo sm:h-[240px]">
            <defs>
              <pattern id="urdidura" width="7" height="7" patternUnits="userSpaceOnUse">
                <rect width="7" height="7" fill="#141C44" />
                <rect x="3" width="1" height="7" fill="#5A6699" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#urdidura)" />
            {LINHAS.map(([motivo, tom], i) =>
              i < pano ? (
                <rect
                  key={i}
                  x="0"
                  y={`${100 - (i + 1) * alturaLinha}%`}
                  width="100%"
                  height={`${alturaLinha + 0.15}%`}
                  fill={preenchimento(motivo, tom)}
                />
              ) : null
            )}
            {/* A lançadeira: a linha que está a ser tecida agora */}
            {aTocar && pano < TOTAL && (
              <rect x="0" y={`${100 - pano * alturaLinha}%`} width="100%" height="3" fill="#F3F2EC" />
            )}
          </svg>
        </div>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="font-semibold">{titulo}</span>
        <span className="letra-estreita numeros text-xs text-indigo-claro">{legenda}</span>
      </figcaption>
    </figure>
  )
}
