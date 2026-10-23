'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const NAV_ITEMS = [
  { href: '/galeria', label: 'Galeria' },
  { href: '/loja', label: 'Loja' },
  { href: '/orcamento', label: 'Orçamento' },
  { href: '/sobre', label: 'Sobre' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  // '/loja/x' também marca 'Loja'; '/#processo' nunca fica activo
  const ativo = (href: string) => !href.includes('#') && (pathname === href || pathname.startsWith(href + '/'))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottomColor: scrolled ? 'var(--nav-border)' : 'transparent',
      }}
      className={`fixed top-0 left-0 right-0 z-50 h-[70px] transition-all duration-300 ${scrolled ? 'backdrop-blur-2xl border-b shadow-sm' : ''
        }`}
    >
      <div className="max-w-6xl mx-auto h-full px-6 lg:px-0 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-[10px] bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-[15px] font-extrabold text-white font-mono transition-transform group-hover:scale-110 shadow-[0_4px_12px_rgba(234,88,12,0.4)]">
            3D
          </div>
          <span className="font-mono font-bold text-lg tracking-tight text-fg">
            PRINT<span className="text-accent">CV</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={ativo(item.href) ? 'page' : undefined}
              className={`text-xs font-semibold tracking-[2px] uppercase transition-colors hover:text-accent ${
                ativo(item.href) ? 'text-accent' : 'text-fg-muted'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="menu-movel"
            className="md:hidden -mr-2.5 p-2.5 text-fg-muted"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="menu-movel"
          style={{ backgroundColor: 'var(--nav-bg)', borderBottomColor: 'var(--nav-border)' }}
          className="absolute top-[70px] left-0 right-0 backdrop-blur-2xl border-b px-6 py-4 md:hidden shadow-lg"
        >
          <div className="max-w-6xl mx-auto">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                aria-current={ativo(item.href) ? 'page' : undefined}
                className={`block py-3 text-sm font-semibold tracking-wide hover:text-accent transition-colors border-b border-theme last:border-0 ${
                  ativo(item.href) ? 'text-accent' : 'text-fg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
