import Link from 'next/link'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { SITE, linkWhatsApp } from '@/lib/site'
import { Emenda, MarcaPano } from '@/components/pano/Padroes'

const NAV = [
  { href: '/loja', label: 'Loja' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/orcamento', label: 'Orçamento' },
  { href: '/sobre', label: 'Sobre' },
]

// O pano acaba em franja: fios índigo soltos sobre o algodão
function Franja() {
  return (
    <svg aria-hidden="true" focusable="false" className="block h-10 w-full bg-algodao" preserveAspectRatio="none">
      <defs>
        <pattern id="franja" width="14" height="40" patternUnits="userSpaceOnUse">
          <rect x="3" width="8" height="5" fill="#141C44" />
          <rect x="6" y="5" width="2" height="27" fill="#141C44" />
          <rect x="5" y="30" width="4" height="3" fill="#141C44" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#franja)" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer>
      <Emenda motivo="xadrez" tom="escuro" altura={12} />
      <div className="banda-escura pb-10 pt-14">
        <div className="moldura grid gap-12 md:grid-cols-[1.4fr_1fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <MarcaPano tamanho={40} invertida />
              <span className="letra-larga text-[2.25rem] leading-none">PrintCV</span>
            </Link>
            <p className="mt-5 max-w-[30ch] text-[1.05rem] leading-relaxed text-indigo-claro">
              Impressão 3D na Praia, Santiago. Peças pensadas consigo e feitas camada a camada.
            </p>
          </div>

          <div>
            <h2 className="letra-estreita mb-4 text-sm text-indigo-claro">Contacto</h2>
            <ul className="space-y-3 text-[1rem]">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-indigo-claro" aria-hidden="true" />
                {SITE.endereco}
              </li>
              <li>
                <a
                  href={linkWhatsApp(SITE.mensagemWhatsApp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:underline"
                >
                  <MessageCircle size={18} className="mt-0.5 shrink-0 text-indigo-claro" aria-hidden="true" />
                  <span className="numeros">WhatsApp +{SITE.whatsapp.slice(0, 3)} {SITE.whatsapp.slice(3)}</span>
                </a>
              </li>
              {SITE.email && (
                <li>
                  <a href={`mailto:${SITE.email}`} className="flex items-start gap-3 hover:underline">
                    <Mail size={18} className="mt-0.5 shrink-0 text-indigo-claro" aria-hidden="true" />
                    {SITE.email}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Rodapé">
            <h2 className="letra-estreita mb-4 text-sm text-indigo-claro">Páginas</h2>
            <ul className="space-y-3 text-[1rem]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="moldura mt-14">
          <div aria-hidden="true" className="costura text-indigo-fio" />
          <p className="numeros mt-5 text-sm text-indigo-claro">© 2026 PrintCV · Praia, Cabo Verde</p>
        </div>
      </div>
      <Franja />
    </footer>
  )
}
