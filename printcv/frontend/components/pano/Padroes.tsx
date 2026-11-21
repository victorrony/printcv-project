// Motivos do pano di terra (panu obra), desenhados em SVG.
// Os <pattern> vivem num só <svg> no layout; as faixas referem-nos por id.

export type Motivo = 'losango' | 'dente' | 'xadrez' | 'riscas'
export type Tom = 'escuro' | 'claro'

const INDIGO = '#141C44'
const ALGODAO = '#F3F2EC'

const TONS: Record<Tom, { fundo: string; fio: string }> = {
  escuro: { fundo: INDIGO, fio: ALGODAO },
  claro: { fundo: ALGODAO, fio: INDIGO },
}

function Motivos({ tom }: { tom: Tom }) {
  const { fundo, fio } = TONS[tom]
  return (
    <>
      <pattern id={`p-losango-${tom}`} width="20" height="20" patternUnits="userSpaceOnUse">
        <rect width="20" height="20" fill={fundo} />
        <path d="M10 1 19 10 10 19 1 10Z" fill={fio} />
        <path d="M10 6 14 10 10 14 6 10Z" fill={fundo} />
      </pattern>
      <pattern id={`p-dente-${tom}`} width="16" height="12" patternUnits="userSpaceOnUse">
        <rect width="16" height="12" fill={fundo} />
        <path d="M0 12 8 2 16 12Z" fill={fio} />
      </pattern>
      <pattern id={`p-xadrez-${tom}`} width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill={fundo} />
        <rect width="6" height="6" fill={fio} />
        <rect x="6" y="6" width="6" height="6" fill={fio} />
      </pattern>
      <pattern id={`p-riscas-${tom}`} width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill={fundo} />
        <rect width="3" height="8" fill={fio} />
      </pattern>
    </>
  )
}

/** Vai uma vez no layout: define todos os motivos usados nas faixas. */
export function PadroesPano() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
      <defs>
        <Motivos tom="escuro" />
        <Motivos tom="claro" />
      </defs>
    </svg>
  )
}

export function preenchimento(motivo: Motivo, tom: Tom) {
  return `url(#p-${motivo}-${tom})`
}

/** Faixa tecida a toda a largura. */
export function Faixa({
  motivo,
  tom = 'escuro',
  altura = 20,
  className = '',
}: {
  motivo: Motivo
  tom?: Tom
  altura?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`block w-full ${className}`}
      style={{ height: altura }}
      preserveAspectRatio="none"
    >
      <rect width="100%" height="100%" fill={preenchimento(motivo, tom)} />
    </svg>
  )
}

/**
 * Emenda entre duas bandas: costura, faixa de padrão, costura.
 * O fundo é o da banda que fica por cima; a faixa é a peça que as junta.
 */
export function Emenda({
  motivo,
  tom = 'escuro',
  altura = 20,
}: {
  motivo: Motivo
  tom?: Tom
  altura?: number
}) {
  const fundo = tom === 'escuro' ? 'bg-indigo text-indigo-fio' : 'bg-algodao text-indigo'
  return (
    <div aria-hidden="true" className={`${fundo} py-1.5`}>
      <div className="costura" />
      <div className="py-1.5">
        <Faixa motivo={motivo} tom={tom} altura={altura} />
      </div>
      <div className="costura" />
    </div>
  )
}

// Geometria da marca: o P cortado em camadas, como o programa da impressora fatia uma peça.
// Cada fila é [x, largura] numa grelha de 48; as filas têm 3 de altura e 1,4 de intervalo.
// lib/marca.tsx usa a mesma geometria para o favicon e o ícone do iPhone.
export const FILAS_P: [number, number][][] = [
  [[12, 18]],
  [[12, 7], [27, 7]],
  [[12, 7], [28, 7]],
  [[12, 7], [27, 7]],
  [[12, 18]],
  [[12, 7]],
  [[12, 7]],
  [[12, 7]],
]
// Meias camadas que fecham a curva do olho do P
export const CANTOS_P: [number, number][] = [
  [30, 8.5],
  [30, 26.1],
]

/** Marca da PrintCV: o P fatiado em camadas, num quadrado índigo (ou algodão, invertida). */
export function MarcaPano({ tamanho = 28, invertida = false }: { tamanho?: number; invertida?: boolean }) {
  const fundo = invertida ? ALGODAO : INDIGO
  const fio = invertida ? INDIGO : ALGODAO
  return (
    <svg aria-hidden="true" focusable="false" width={tamanho} height={tamanho} viewBox="0 0 48 48">
      <rect width="48" height="48" fill={fundo} />
      {FILAS_P.map((segmentos, k) =>
        segmentos.map(([x, largura]) => (
          <rect key={`${k}-${x}`} x={x} y={7.5 + 4.4 * k} width={largura} height="3" fill={fio} />
        ))
      )}
      {CANTOS_P.map(([x, y]) => (
        <rect key={`c${y}`} x={x} y={y} width="2" height="2" fill={fio} />
      ))}
    </svg>
  )
}
