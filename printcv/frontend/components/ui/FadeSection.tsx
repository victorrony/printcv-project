'use client'

import { useRef, useEffect, useState, type ReactNode } from 'react'
import { useMenosMovimento } from '@/lib/useMenosMovimento'

interface FadeSectionProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function FadeSection({ children, delay = 0, className = '' }: FadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const menosMovimento = useMenosMovimento()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Com "reduzir movimento", o conteúdo aparece logo, sem esperar pelo scroll
    if (menosMovimento) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // a animação só corre uma vez
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [menosMovimento])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
