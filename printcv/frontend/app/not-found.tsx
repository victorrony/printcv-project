import Link from 'next/link'
import { Faixa } from '@/components/pano/Padroes'

export default function NaoEncontrada() {
  return (
    <section className="banda-escura">
      <div className="moldura py-20 md:py-28">
        <h1 className="letra-larga max-w-[14ch] text-[clamp(2.6rem,6vw,5rem)]">Este fio soltou-se.</h1>
        <p className="mt-6 max-w-[48ch] text-[1.1rem] leading-relaxed text-indigo-claro">
          A página que procura não existe ou mudou de lugar. O resto do pano continua inteiro.
        </p>
        <p className="mt-8 flex flex-wrap gap-x-7 gap-y-2 text-[1.05rem]">
          <Link href="/" className="ligacao">
            Página inicial
          </Link>
          <Link href="/loja" className="ligacao">
            Loja
          </Link>
          <Link href="/galeria" className="ligacao">
            Galeria
          </Link>
        </p>
      </div>
      {/* O pano interrompido: a faixa pára a meio */}
      <div aria-hidden="true" className="moldura pb-10">
        <div className="faixa-partida">
          <Faixa motivo="losango" tom="escuro" altura={20} />
        </div>
      </div>
    </section>
  )
}
