import type { Config } from 'tailwindcss'

// Mundo "Pano di Terra": duas tintas (índigo e algodão), sem cinzentos.
// O amarelo é só para acções que abrem o WhatsApp; o preto só para a banda dos timelapses.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: '#141C44', // fundo das bandas escuras e texto sobre algodão
          tinta: '#22327A', // tinta do padrão sobre índigo; texto secundário forte
          claro: '#B9C0E0', // texto secundário sobre índigo
          fio: '#5A6699', // linhas da urdidura e costuras sobre índigo
        },
        algodao: {
          DEFAULT: '#F3F2EC', // fundo das bandas claras
          sombra: '#E4E2D8', // trama sobre algodão (pontos, divisões)
          texto: '#3B4677', // texto secundário sobre algodão (índigo esbatido)
        },
        preto: '#0B0B0F',
        amarelo: {
          DEFAULT: '#F2C230',
          forte: '#E0AE14',
        },
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        pano: '84rem',
      },
    },
  },
  plugins: [],
}
export default config
