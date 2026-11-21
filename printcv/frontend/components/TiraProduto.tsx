import Link from 'next/link'
import Image from 'next/image'
import type { Produto } from '@/lib/types'
import { formatPreco } from '@/lib/format'
import { preenchimento } from '@/components/pano/Padroes'

interface TiraProdutoProps {
  produto: Produto
  /** Tira dupla: ocupa duas colunas no computador */
  larga?: boolean
  nivelTitulo?: 'h2' | 'h3'
  /** A primeira imagem visível da página carrega com prioridade */
  prioridade?: boolean
  /** Última tira de uma linha incompleta no telemóvel: ocupa a linha toda até ao computador */
  sozinha?: boolean
}

/** Sem foto ainda: o lugar fica tecido e diz-se o que falta, em vez de um ícone genérico. */
export function SemFoto({ motivo = 'losango' }: { motivo?: 'losango' | 'xadrez' | 'dente' }) {
  return (
    <div className="absolute inset-0">
      <svg aria-hidden="true" focusable="false" className="absolute inset-0 h-full w-full">
        <rect width="100%" height="100%" fill={preenchimento(motivo, 'claro')} />
      </svg>
      <span className="letra-estreita absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-algodao px-3 py-1.5 text-xs">
        Foto a caminho
      </span>
    </div>
  )
}

export function TiraProduto({
  produto,
  larga = false,
  nivelTitulo: Titulo = 'h3',
  prioridade = false,
  sozinha = false,
}: TiraProdutoProps) {
  const imagem = produto.imagens[0] ?? null
  // Cada peça sem foto tem o seu motivo, para duas tiras vizinhas não parecerem uma só
  const motivo = (['losango', 'xadrez', 'dente'] as const)[produto.id % 3]

  return (
    <Link
      href={`/loja/${produto.slug}`}
      className={`tira group flex flex-col bg-algodao transition-colors hover:bg-algodao-sombra ${
        larga ? 'col-span-2' : sozinha ? 'col-span-2 lg:col-span-1' : ''
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          larga ? 'aspect-[8/5]' : sozinha ? 'aspect-[8/5] lg:aspect-[4/5]' : 'aspect-[4/5]'
        }`}
      >
        {imagem ? (
          <Image
            src={imagem}
            alt={produto.nome}
            fill
            priority={prioridade}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes={larga || sozinha ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 20vw, 50vw'}
          />
        ) : (
          <SemFoto motivo={motivo} />
        )}
        {!produto.disponivel && (
          <span className="letra-estreita absolute left-0 top-0 z-[3] bg-indigo px-3 py-1.5 text-xs text-algodao">
            Indisponível
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-4 pb-5 pt-4 sm:px-5 sm:pb-6">
        <Titulo className="text-[1.05rem] font-bold leading-snug group-hover:underline sm:text-[1.2rem]">{produto.nome}</Titulo>
        {produto.categoria && (
          <span className="letra-estreita text-xs text-algodao-texto">{produto.categoria.nome}</span>
        )}
        <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 pt-4">
          <span className="letra-larga numeros text-[1.4rem] sm:text-[1.75rem]">
            {produto.preco_sob_consulta ? 'A combinar' : formatPreco(produto.preco)}
          </span>
          {produto.tempo_producao && (
            <span className="numeros text-sm text-algodao-texto">
              <span className="sr-only">Tempo de impressão: </span>
              {produto.tempo_producao}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
