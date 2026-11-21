import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { getProdutoBySlug, getProdutos } from '@/lib/conteudo'
import { formatPreco } from '@/lib/format'
import { linkWhatsApp } from '@/lib/site'
import { GaleriaProduto } from '@/components/GaleriaProduto'
import { Emenda } from '@/components/pano/Padroes'
import { TiraProduto } from '@/components/TiraProduto'

export const dynamicParams = false

export function generateStaticParams() {
  return getProdutos().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const produto = getProdutoBySlug(params.slug)
  if (!produto) return { title: 'Produto — PrintCV' }
  return {
    title: `${produto.nome} — PrintCV`,
    description: produto.descricao.substring(0, 160),
  }
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const produto = getProdutoBySlug(params.slug)
  if (!produto) notFound()

  const preco = produto.preco_sob_consulta ? 'A combinar' : formatPreco(produto.preco)
  const etiqueta = [
    { nome: 'Material', valor: produto.material },
    { nome: 'Dimensões', valor: produto.dimensoes },
    { nome: 'Tempo de impressão', valor: produto.tempo_producao },
    { nome: 'Categoria', valor: produto.categoria?.nome },
  ].filter((l): l is { nome: string; valor: string } => Boolean(l.valor))
  const outros = getProdutos({ disponivel: true }).filter((p) => p.id !== produto.id).slice(0, 3)

  return (
    <>
      <section className="banda-clara pb-20 pt-8 md:pb-28 md:pt-10">
        <div className="moldura">
          <Link href="/loja" className="ligacao inline-flex items-center gap-2 text-[0.95rem]">
            <ArrowLeft size={16} aria-hidden="true" /> Loja
          </Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] lg:gap-16">
            <GaleriaProduto imagens={produto.imagens} nome={produto.nome} />

            <div>
              <h1 className="letra-larga text-[clamp(2.25rem,4.4vw,3.75rem)]">{produto.nome}</h1>
              <p className="letra-larga numeros mt-6 text-[clamp(2rem,3.6vw,3rem)]">{preco}</p>
              <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-relaxed">{produto.descricao}</p>

              {/* A etiqueta cosida no pano: os dados da peça */}
              {etiqueta.length > 0 && (
                <div className="mt-8 border-2 border-indigo p-1.5">
                  <dl className="border-2 border-dashed border-indigo-tinta px-5 py-4">
                    {etiqueta.map((linha) => (
                      <div
                        key={linha.nome}
                        className="flex items-baseline justify-between gap-6 border-b border-algodao-sombra py-2.5 last:border-0"
                      >
                        <dt className="letra-estreita text-xs text-algodao-texto">{linha.nome}</dt>
                        <dd className="numeros text-right font-semibold">{linha.valor}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {produto.disponivel ? (
                <a
                  href={linkWhatsApp(
                    `Olá! Gostaria de encomendar "${produto.nome}" (${produto.preco_sob_consulta ? 'preço a combinar' : formatPreco(produto.preco)}). Podem dar-me mais informações?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="accao-whatsapp mt-8 w-full sm:w-auto"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  Encomendar pelo WhatsApp
                </a>
              ) : (
                <p className="mt-8 border-2 border-indigo px-5 py-4 font-semibold">
                  Esta peça está indisponível de momento.
                </p>
              )}
              <p className="mt-4 text-sm text-algodao-texto">
                Abre o WhatsApp com a mensagem já escrita. Cor ou medida diferente?{' '}
                <Link href="/orcamento" className="ligacao text-indigo">
                  Peça por medida
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {outros.length > 0 && (
        <>
          <Emenda motivo="riscas" tom="claro" altura={10} />
          <section aria-labelledby="titulo-outros" className="banda-clara pb-20 pt-14 md:pb-28">
            <div className="moldura">
              <h2 id="titulo-outros" className="letra-larga text-[clamp(1.75rem,3vw,2.5rem)]">
                Também na loja
              </h2>
              <div className="tiras mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  {outros.map((p) => (
                    <TiraProduto key={p.id} produto={p} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  )
}
