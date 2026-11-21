import Image from 'next/image'
import Link from 'next/link'
import { formatData } from '@/lib/format'
import type { GaleriaItem } from '@/lib/types'

// Retalhos de tamanhos diferentes cosidos num só pano (12 colunas no computador)
const RETALHOS = [
  'col-span-2 lg:col-span-7 lg:row-span-2',
  'col-span-1 lg:col-span-5',
  'col-span-1 lg:col-span-5',
  'col-span-2 sm:col-span-1 lg:col-span-4',
  'col-span-1 lg:col-span-4',
  'col-span-1 lg:col-span-4',
]

export function MosaicoOficina({ itens }: { itens: GaleriaItem[] }) {
  return (
    <div className="tiras">
      <ul className="grid auto-rows-[11rem] grid-cols-2 sm:auto-rows-[15rem] lg:auto-rows-[17rem] lg:grid-cols-12">
        {itens.slice(0, RETALHOS.length).map((item, i) => (
          <li key={item.id} className={`tira ${RETALHOS[i]}`}>
            <Link href="/galeria" className="group relative block h-full overflow-hidden bg-algodao-sombra">
              <Image
                src={item.imagens[0]}
                alt={item.titulo}
                fill
                className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                  item.inteira ? 'object-contain p-3' : 'object-cover'
                }`}
                style={item.foco ? { objectPosition: item.foco } : undefined}
                sizes={i === 0 ? '(min-width: 1024px) 58vw, 100vw' : '(min-width: 1024px) 34vw, 50vw'}
              />
              <span className="absolute bottom-0 left-0 z-[3] max-w-[calc(100%-1rem)] bg-algodao px-3 py-2">
                <span className="block text-sm font-semibold leading-snug group-hover:underline">{item.titulo}</span>
                <span className="letra-estreita numeros block text-[0.7rem] text-algodao-texto">
                  {formatData(item.data)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
