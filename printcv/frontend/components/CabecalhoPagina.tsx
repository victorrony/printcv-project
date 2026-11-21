import type { ReactNode } from 'react'
import { Emenda, type Motivo } from '@/components/pano/Padroes'

/** Banda índigo no topo das páginas interiores, cosida à página por uma faixa de padrão. */
export function CabecalhoPagina({
  titulo,
  texto,
  motivo = 'losango',
  children,
}: {
  titulo: string
  texto?: ReactNode
  motivo?: Motivo
  children?: ReactNode
}) {
  return (
    <>
      <header className="banda-escura">
        <div className="moldura pb-12 pt-14 md:pb-16 md:pt-20">
          <h1 className="letra-larga tecer-entrada text-[clamp(2.6rem,6vw,5.25rem)]">{titulo}</h1>
          {texto && <p className="mt-5 max-w-[52ch] text-[1.1rem] leading-relaxed text-indigo-claro">{texto}</p>}
          {children}
        </div>
      </header>
      <Emenda motivo={motivo} tom="escuro" altura={16} />
    </>
  )
}
