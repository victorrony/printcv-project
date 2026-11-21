import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { PadroesPano } from '@/components/pano/Padroes'

// Uma só família variável: a largura (wdth) faz a hierarquia —
// larga nos títulos, normal no texto, estreita nos dados.
// Archivo (Omnibus-Type, SIL Open Font License 1.1), subconjunto latino, servido pelo próprio site:
// o build não depende da rede para ir buscar a fonte.
const archivo = localFont({
  src: './fonts/Archivo-latin-var.woff2',
  variable: '--font-archivo',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  declarations: [{ prop: 'font-stretch', value: '62% 125%' }],
})

export const metadata: Metadata = {
  title: 'PrintCV — Impressão 3D na Praia, Cabo Verde',
  description:
    'Peças impressas em 3D na Praia, Santiago: lembranças, peças por medida e protótipos. Peça orçamento pelo WhatsApp.',
  openGraph: {
    title: 'PrintCV — Impressão 3D na Praia, Cabo Verde',
    description: 'Imprimimos em 3D, camada a camada, na Praia.',
    locale: 'pt_CV',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#141C44',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={archivo.variable}>
      <body>
        <PadroesPano />
        <a href="#conteudo" className="skip-link">
          Saltar para o conteúdo
        </a>
        <Navbar />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
