'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { useMenosMovimento } from '@/lib/useMenosMovimento'

type NavegadorExtra = Navigator & { connection?: { saveData?: boolean } }

interface VideoLoopProps {
  src: string
  poster?: string
  titulo: string
  /** 'contain' mostra o vídeo inteiro (com faixas); por omissão preenche o cartão */
  ajuste?: 'cover' | 'contain'
  /** object-position quando o vídeo é recortado */
  foco?: string
}

// Vídeo curto em loop, sem som. Só descarrega e toca quando está visível e pára fora
// do ecrã. Não toca sozinho com "reduzir movimento" nem com "poupar dados", e tem
// sempre um botão de pausa (WCAG 2.2.2).
export function VideoLoop({ src, poster, titulo, ajuste = 'cover', foco }: VideoLoopProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const menosMovimento = useMenosMovimento()
  const [poupaDados, setPoupaDados] = useState(false)
  // 'auto' segue as preferências; 'tocar'/'pausar' é a escolha explícita do visitante
  const [escolha, setEscolha] = useState<'auto' | 'tocar' | 'pausar'>('auto')
  const [aTocar, setATocar] = useState(false)

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
      { threshold: 0.4 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [deveTocar])

  return (
    <>
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={titulo}
        onPlay={() => setATocar(true)}
        onPause={() => setATocar(false)}
        className={`absolute inset-0 h-full w-full ${ajuste === 'contain' ? 'object-contain' : 'object-cover'}`}
        style={foco ? { objectPosition: foco } : undefined}
      />
      <button
        type="button"
        onClick={() => setEscolha(aTocar ? 'pausar' : 'tocar')}
        aria-label={aTocar ? `Pausar vídeo: ${titulo}` : `Reproduzir vídeo: ${titulo}`}
        className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface/85 text-fg shadow backdrop-blur-sm transition-colors hover:text-accent after:absolute after:-inset-1"
      >
        {aTocar ? (
          <Pause size={16} fill="currentColor" aria-hidden="true" />
        ) : (
          <Play size={16} fill="currentColor" aria-hidden="true" />
        )}
      </button>
    </>
  )
}
