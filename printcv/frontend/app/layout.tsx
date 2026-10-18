import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
// import { IsoGridBackground } from '@/components/ui/IsoGridBackground'

// Fontes servidas pelo próprio site (sem pedido bloqueante ao Google Fonts)
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' })
const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  // Tamanho óptico como no @import antigo; sem itálico (não é usado e era mais uma fonte pré-carregada)
  axes: ['opsz'],
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'PrintCV — Impressão 3D em Cabo Verde',
  description:
    'Peças personalizadas, protótipos, decoração e muito mais. Produção local na Praia, Santiago — com tecnologia Bambu Lab.',
  openGraph: {
    title: 'PrintCV — Impressão 3D em Cabo Verde',
    description: 'Do digital ao real. Impressão 3D profissional na Praia, Santiago.',
    locale: 'pt_CV',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <a href="#conteudo" className="skip-link">
          Saltar para o conteúdo
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <IsoGridBackground /> */}
          <Navbar />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
