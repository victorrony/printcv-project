import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { MessageCircle } from 'lucide-react'
import { CabecalhoPagina } from '@/components/CabecalhoPagina'
import { SITE, linkWhatsApp } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre — PrintCV',
  description: 'A PrintCV é uma oficina de impressão 3D na Praia, Santiago, Cabo Verde.',
}

const FICHA = [
  { nome: 'Impressora', valor: 'Bambu Lab A1 com AMS (várias cores na mesma peça)' },
  { nome: 'Material', valor: 'PLA' },
  { nome: 'Chegada da impressora', valor: '7 mai 2026' },
  { nome: 'Primeira impressão', valor: '9 mai 2026, o Benchy' },
  { nome: 'Onde', valor: SITE.endereco },
]

const FAZEMOS = [
  'Peças decorativas e funcionais, por medida',
  'Lembranças e figuras de Cabo Verde',
  'Brindes e peças para empresas',
  'Protótipos para quem está a criar um produto',
  'Peças de substituição e acessórios',
]

export default function SobrePage() {
  return (
    <>
      <CabecalhoPagina titulo="A oficina" motivo="riscas" />

      <section className="banda-clara py-14 md:py-20">
        <div className="moldura grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="letra-larga text-[clamp(1.6rem,2.6vw,2.25rem)] leading-[1.1]">
              A PrintCV imprime peças em 3D na Praia, em Santiago, para quem as quer ter nas mãos.
            </p>
            <div className="mt-8 max-w-[60ch] space-y-5 text-[1.08rem] leading-relaxed">
              <p>
                Tudo começou no dia em que a impressora saiu da caixa. Desde então, cada trabalho fica registado na{' '}
                <Link href="/galeria" className="ligacao">
                  galeria
                </Link>
                , com a data e, muitas vezes, com o vídeo da impressão.
              </p>
              <p>
                Uma peça impressa em 3D nasce de um ficheiro e cresce camada a camada, como um pano cresce fio a fio no
                tear. Os acabamentos, quando a peça os pede, são feitos à mão.
              </p>
            </div>

            <h2 className="letra-larga mt-12 text-[1.75rem]">O que fazemos</h2>
            <ul className="mt-4">
              {FAZEMOS.map((item) => (
                <li key={item} className="border-t-2 border-dashed border-indigo-tinta py-3 text-[1.05rem]">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <figure className="m-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-algodao-sombra">
                <Image
                  src="/galeria/chegada-impressora.webp"
                  alt="A impressora Bambu Lab A1 ainda na caixa, no dia em que chegou à oficina"
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <figcaption className="letra-estreita numeros mt-3 text-xs text-algodao-texto">
                A chegada da Bambu Lab A1 · 7 mai 2026
              </figcaption>
            </figure>

            {/* A etiqueta do pano: os factos da oficina */}
            <div className="mt-10 border-2 border-indigo p-1.5">
              <dl className="border-2 border-dashed border-indigo-tinta px-5 py-3">
                {FICHA.map((linha) => (
                  <div
                    key={linha.nome}
                    className="grid gap-1 border-b border-algodao-sombra py-3 last:border-0 sm:grid-cols-[12rem_1fr] sm:gap-6"
                  >
                    <dt className="letra-estreita text-xs text-algodao-texto sm:pt-1">{linha.nome}</dt>
                    <dd className="numeros font-semibold">{linha.valor}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href={linkWhatsApp(SITE.mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="accao-whatsapp"
              >
                <MessageCircle size={18} aria-hidden="true" />
                Falar pelo WhatsApp
              </a>
              <Link href="/orcamento" className="accao-linha">
                Pedir orçamento
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
