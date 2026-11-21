'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, MessageCircle, X } from 'lucide-react'
import { MarcaPano } from '@/components/pano/Padroes'
import { SITE, linkWhatsApp } from '@/lib/site'

const NAV_ITEMS = [
  { href: '/loja', label: 'Loja' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/orcamento', label: 'Orçamento' },
  { href: '/sobre', label: 'Sobre' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  // '/loja/x' também marca 'Loja'
  const ativo = (href: string) => pathname === href || pathname.startsWith(href + '/')

  // Fecha o menu ao mudar de página e com Escape
  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    // A página por trás não desliza enquanto o menu está aberto
    const antes = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = antes
    }
  }, [menuOpen])

  return (
    <header className="banda-clara sticky top-0 z-50">
      <nav aria-label="Principal" className="moldura flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3" aria-label="PrintCV, página inicial">
          <MarcaPano tamanho={30} />
          <span className="letra-larga text-[1.35rem] leading-none">PrintCV</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={ativo(item.href) ? 'page' : undefined}
                className={`text-[0.95rem] font-semibold decoration-[3px] underline-offset-[0.45em] transition-colors hover:underline ${
                  ativo(item.href) ? 'underline' : ''
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={linkWhatsApp(SITE.mensagemWhatsApp)}
            target="_blank"
            rel="noopener noreferrer"
            className="accao-whatsapp hidden min-h-[2.5rem] px-4 text-sm sm:inline-flex"
          >
            <MessageCircle size={17} aria-hidden="true" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="menu-movel"
            className="-mr-2 flex h-11 items-center gap-2 px-2 text-[0.95rem] font-semibold md:hidden"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            {menuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </nav>
      <div aria-hidden="true" className="costura text-indigo" />

      {menuOpen && (
        <div id="menu-movel" className="banda-escura fixed inset-x-0 bottom-0 top-[66px] overflow-y-auto md:hidden">
          <ul className="moldura py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href} className="border-b border-indigo-tinta last:border-0">
                <Link
                  href={item.href}
                  aria-current={ativo(item.href) ? 'page' : undefined}
                  className="letra-larga flex min-h-[3.5rem] items-center justify-between text-[1.6rem]"
                >
                  {item.label}
                  {ativo(item.href) && <span className="letra-estreita text-xs text-indigo-claro">Aqui</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="moldura pb-6">
            <a
              href={linkWhatsApp(SITE.mensagemWhatsApp)}
              target="_blank"
              rel="noopener noreferrer"
              className="accao-whatsapp w-full"
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
