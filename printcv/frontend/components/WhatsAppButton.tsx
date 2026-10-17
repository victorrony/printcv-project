'use client'

import { MessageCircle } from 'lucide-react'
import { linkWhatsApp } from '@/lib/site'

const DEFAULT_MESSAGE = 'Olá! Gostaria de saber mais sobre os serviços da PrintCV.'

export function WhatsAppButton() {
  const url = linkWhatsApp(DEFAULT_MESSAGE)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
      aria-label="Contactar via WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  )
}
