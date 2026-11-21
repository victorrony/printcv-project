'use client'

import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { SITE, linkWhatsApp } from '@/lib/site'

// Atalho fixo no telemóvel, onde o botão do menu fica escondido. Só aparece depois
// do primeiro ecrã, para não tapar o topo (que já tem a sua acção do WhatsApp).
export function WhatsAppButton() {
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const avaliar = () => setVisivel(window.scrollY > window.innerHeight * 0.8)
    avaliar()
    window.addEventListener('scroll', avaliar, { passive: true })
    return () => window.removeEventListener('scroll', avaliar)
  }, [])

  return (
    <a
      href={linkWhatsApp(SITE.mensagemWhatsApp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      tabIndex={visivel ? undefined : -1}
      aria-hidden={visivel ? undefined : true}
      className={`fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center bg-amarelo text-indigo shadow-[0_6px_18px_rgba(20,28,68,0.35)] transition-[transform,opacity,background-color] duration-300 ease-out hover:bg-amarelo-forte sm:hidden ${
        visivel ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <MessageCircle size={26} aria-hidden="true" />
    </a>
  )
}
