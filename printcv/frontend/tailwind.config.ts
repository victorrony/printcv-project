import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#EA580C',
          light: '#F97316',
          dark: '#C2410C',
          800: '#9A3412',
          50: '#FFF7ED',
          100: '#FFEDD5',
          500: '#EA580C',
          600: '#C2410C',
          900: '#431407',
        },
        teal: {
          DEFAULT: '#059669',
          light: '#10B981',
          dark: '#047857',
        },
        /* Tokens estáticos (fallback) */
        page:    '#FAFAF8',
        surface: '#FFFFFF',
        elevated: '#F5F4F0',
        /* Tokens semânticos via variáveis CSS — adaptam-se ao tema */
        /* Texto laranja com contraste AA em ambos os temas (o brand fica para fundos) */
        accent: 'var(--accent-text)',
        fg: {
          DEFAULT: 'var(--fg)',
          muted:   'var(--fg-muted)',
          subtle:  'var(--fg-subtle)',
        },
        dark: {
          DEFAULT: '#0C0A09',
          card: '#1C1917',
          surface: '#292524',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      backgroundColor: {
        page:    'var(--bg-page)',
        surface: 'var(--bg-surface)',
        elevated:'var(--bg-elevated)',
        muted:   'var(--bg-muted)',
      },
      borderColor: {
        theme:  'var(--border)',
        subtle: 'var(--border-subtle)',
      },
      fontFamily: {
        /* Variáveis definidas pelo next/font em app/layout.tsx */
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        'float-mid':  'floatSlow 6s ease-in-out infinite reverse',
        'spin-slow':  'spin 20s linear infinite',
        'spin-slower':'spin 35s linear infinite reverse',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':    'shimmer 3s linear infinite',
        'layer-rise': 'layerRise 1s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':      { transform: 'translateY(-18px) rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%':      { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        layerRise: {
          from: { opacity: '0', transform: 'translateY(20px) scaleX(0.8)' },
          to:   { opacity: '1', transform: 'translateY(0) scaleX(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
