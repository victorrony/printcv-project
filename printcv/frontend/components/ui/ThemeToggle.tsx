'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-9 h-9" />
  }

  const escuro = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      // resolvedTheme: com o tema a seguir o sistema, theme vale 'system'
      onClick={() => setTheme(escuro ? 'light' : 'dark')}
      aria-label={escuro ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
      // after: alarga a área de toque para 44 px sem mudar o aspecto
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
                 after:absolute after:-inset-1
                 bg-elevated border border-theme
                 hover:border-brand/40 hover:text-accent
                 text-fg-muted"
    >
      {escuro ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
