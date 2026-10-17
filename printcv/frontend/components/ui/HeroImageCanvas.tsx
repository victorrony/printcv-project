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
        // Descarrega o modelo em paralelo com o JS do 3D (senão só começa quando
        // o useGLTF monta); prioridade baixa para não atrasar a foto do hero
        <link
          rel="preload"
          href={modelUrl}
          as="fetch"
          crossOrigin="anonymous"
          fetchPriority="low"
        />
      )}
      {posterUrl && (
        // Disco com o cinzento do fundo da foto: as bordas da foto (4:3) desvanecem
        // para uma cor quase igual e não se vê o rectângulo
        <div
          className={`absolute inset-[10%] rounded-full overflow-hidden bg-[#e1e1dd] transition-opacity duration-700 ${
            carregado ? 'opacity-0' : 'opacity-100'
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
      {(modelUrl || imageUrl) && (
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
