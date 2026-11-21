import Link from 'next/link'
import type { Metadata } from 'next'
import { getCategorias, getProdutos } from '@/lib/conteudo'
import { TiraProduto } from '@/components/TiraProduto'
import { CabecalhoPagina } from '@/components/CabecalhoPagina'

export const metadata: Metadata = {
  title: 'Loja — PrintCV',
  description: 'Peças impressas em 3D na Praia, Cabo Verde, prontas a encomendar pelo WhatsApp.',
}

export default function LojaPage({ searchParams }: { searchParams: { categoria?: string | string[] } }) {
  const categorias = getCategorias()
  // ?categoria= vazio, repetido ou desconhecido conta como "Todas"
  const pedida = typeof searchParams.categoria === 'string' ? searchParams.categoria : undefined
  const categoria = categorias.find((c) => c.slug === pedida)?.slug
  const produtos = getProdutos({ categoria })
  const todos = getProdutos()

  const separadores = [
    { slug: undefined, nome: 'Todas', quantos: todos.length },
    ...categorias.map((c) => ({
      slug: c.slug,
      nome: c.nome,
      quantos: todos.filter((p) => p.categoria?.slug === c.slug).length,
    })),
  ].filter((s) => s.quantos > 0)

  return (
    <>
      <CabecalhoPagina
        titulo="Loja"
        texto="Peças já desenhadas e impressas na oficina. Escolha uma e encomende pelo WhatsApp."
      >
        <nav aria-label="Categorias" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {separadores.map((s) => {
              const activo = s.slug === categoria
              return (
                <li key={s.nome}>
                  <Link
                    href={s.slug ? `/loja?categoria=${s.slug}` : '/loja'}
                    aria-current={activo ? 'page' : undefined}
                    scroll={false}
                    className={`inline-flex min-h-[2.75rem] items-center gap-2 border-2 px-4 text-[0.95rem] font-semibold transition-colors ${
                      activo
                        ? 'border-algodao bg-algodao text-indigo'
                        : 'border-indigo-fio hover:border-algodao'
                    }`}
                  >
                    {s.nome}
                    <span className={`numeros text-sm ${activo ? 'text-algodao-texto' : 'text-indigo-claro'}`}>
                      {s.quantos}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </CabecalhoPagina>

      <section aria-label="Produtos" className="banda-clara py-14 md:py-20">
        <div className="moldura">
          {produtos.length > 0 ? (
            <div className="tiras">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                {produtos.map((produto, i) => (
                  <TiraProduto
                    key={produto.id}
                    produto={produto}
                    nivelTitulo="h2"
                    prioridade={i < 2}
                    sozinha={i === produtos.length - 1 && produtos.length % 2 === 1}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="border-2 border-indigo px-6 py-16 text-center">
              <p className="text-[1.1rem]">Ainda não há peças nesta categoria.</p>
              <Link href="/loja" className="ligacao mt-4 inline-block">
                Ver todas as peças
              </Link>
            </div>
          )}
          <p className="mt-10 max-w-[60ch] text-algodao-texto">
            Não encontra o que procura?{' '}
            <Link href="/orcamento" className="ligacao text-indigo">
              Peça uma peça por medida
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  )
}
