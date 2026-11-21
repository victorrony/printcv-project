import { CANTOS_P, FILAS_P } from '@/components/pano/Padroes'

// Ícone da marca para o favicon e o apple-icon: o P fatiado em camadas num quadrado índigo
// (o mesmo desenho de MarcaPano em components/pano/Padroes.tsx).
const INDIGO = '#141C44'
const ALGODAO = '#F3F2EC'

export function IconeMarca({ raio }: { raio: string }) {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', borderRadius: raio, background: INDIGO }}>
      <svg viewBox="0 0 48 48" width="100%" height="100%">
        {FILAS_P.flatMap((segmentos, k) =>
          segmentos.map(([x, largura]) => (
            <rect key={`${k}-${x}`} x={x} y={7.5 + 4.4 * k} width={largura} height={3} fill={ALGODAO} />
          ))
        )}
        {CANTOS_P.map(([x, y]) => (
          <rect key={`c${y}`} x={x} y={y} width={2} height={2} fill={ALGODAO} />
        ))}
      </svg>
    </div>
  )
}
