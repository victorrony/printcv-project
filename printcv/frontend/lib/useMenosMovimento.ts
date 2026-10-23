'use client'

import { useEffect, useState } from 'react'

/** true quando o sistema pede "reduzir movimento"; acompanha mudanças com a página aberta */
export function useMenosMovimento(): boolean {
  const [menos, setMenos] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const atualizar = () => setMenos(mq.matches)
    atualizar()
    mq.addEventListener('change', atualizar)
    return () => mq.removeEventListener('change', atualizar)
  }, [])

  return menos
}
