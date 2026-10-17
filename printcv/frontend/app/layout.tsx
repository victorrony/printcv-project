import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/ui/Navbar'
import { Footer } from '@/components/ui/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
// import { IsoGridBackground } from '@/components/ui/IsoGridBackground'

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
    <html lang="pt" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* <IsoGridBackground /> */}
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
