'use client'

import { Component, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const HeroCanvas3D = dynamic(
  () => import('./HeroCanvas3DInner').then((m) => m.HeroCanvas3DInner),
  { ssr: false }
)

// Modelo em falta, extensão glTF não suportada ou sem WebGL: fica o poster
class SemFalhas extends Component<{ children: ReactNode }, { falhou: boolean }> {
  state = { falhou: false }

  static getDerivedStateFromError() {
    return { falhou: true }
  }

  componentDidCatch(erro: Error) {
    console.error('[HeroImageCanvas] o 3D não carregou', erro)
  }

  render() {
    return this.state.falhou ? null : this.props.children
  }
}

type NavegadorExtra = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean }
}

// O 3D custa ~600 kB de JS, 1 MB de modelo e GPU contínua: só onde compensa.
// No resto (telemóvel, aparelho fraco, poupança de dados, menos movimento) fica a foto.
function useAparelhoCapaz() {
  const [capaz, setCapaz] = useState(false)

  useEffect(() => {
    const nav = navigator as NavegadorExtra
    const hardware =
      (nav.hardwareConcurrency ?? 8) >= 4 && (nav.deviceMemory ?? 8) >= 4 && !nav.connection?.saveData
    const mq = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)')
    const avaliar = () => setCapaz(hardware && mq.matches)
    avaliar()
    mq.addEventListener('change', avaliar)
    return () => mq.removeEventListener('change', avaliar)
  }, [])

  return capaz
}

interface HeroImageCanvasProps {
  imageUrl?: string
  modelUrl?: string
  /** Imagem mostrada enquanto o modelo 3D carrega (ou se nunca carregar) */
  posterUrl?: string
}

export function HeroImageCanvas({ imageUrl, modelUrl, posterUrl }: HeroImageCanvasProps) {
  const [carregado, setCarregado] = useState(false)
  const [visivel, setVisivel] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const usar3d = useAparelhoCapaz() && Boolean(modelUrl || imageUrl)

  // O canvas desmonta quando usar3d passa a false: ao voltar, recomeça do zero
  useEffect(() => {
    if (!usar3d) setCarregado(false)
  }, [usar3d])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // A margem retoma o render um pouco antes de o hero voltar ao ecrã
    const observer = new IntersectionObserver(([entry]) => setVisivel(entry.isIntersecting), {
      rootMargin: '200px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[720px] lg:h-[720px]"
    >
      {modelUrl && (
        // Vai no HTML do servidor: o modelo descarrega em paralelo com o JS do 3D.
        // O media replica a parte de useAparelhoCapaz que o browser sabe avaliar,
        // para o telemóvel não o descarregar; prioridade baixa para não atrasar a foto
        <link
          rel="preload"
          href={modelUrl}
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="low"
          media="(min-width: 768px) and (prefers-reduced-motion: no-preference)"
        />
      )}
      {posterUrl && (
        // Disco com o cinzento do fundo da foto: as bordas da foto (4:3) desvanecem
        // para uma cor quase igual e não se vê o rectângulo
        <div
          className={`absolute inset-[10%] rounded-full overflow-hidden bg-[#e1e1dd] transition-opacity duration-700 ${
            usar3d && carregado ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Image
            src={posterUrl}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 576px, (min-width: 640px) 320px, 224px"
            className="object-contain [mask-image:radial-gradient(ellipse_50%_37.5%_at_center,black_75%,transparent)]"
          />
        </div>
      )}
      {usar3d && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            carregado ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <SemFalhas>
            <HeroCanvas3D
              imageUrl={imageUrl}
              modelUrl={modelUrl}
              onLoaded={() => setCarregado(true)}
              // Só pausa depois de carregado: o aviso de carregado precisa de um frame
              ativo={visivel || !carregado}
            />
          </SemFalhas>
        </div>
      )}
    </div>
  )
}
