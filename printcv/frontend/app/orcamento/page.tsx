import type { Metadata } from 'next'
import { QuoteForm } from '@/components/QuoteForm'
import { CabecalhoPagina } from '@/components/CabecalhoPagina'

export const metadata: Metadata = {
  title: 'Pedir orçamento — PrintCV',
  description: 'Peça um orçamento para uma peça impressa em 3D na Praia, Cabo Verde. O pedido segue pelo WhatsApp.',
}

const AJUDA = [
  { titulo: 'Medidas', texto: 'Mesmo aproximadas: altura, largura, ou "cabe na palma da mão".' },
  { titulo: 'Cor e quantidade', texto: 'Uma peça ou cinquenta; uma cor ou várias.' },
  { titulo: 'Para que serve', texto: 'Decoração, presente, peça de substituição, brinde, protótipo.' },
  { titulo: 'Ficheiro STL', texto: 'Se já tem o modelo, envie-o depois, directamente na conversa do WhatsApp.' },
]

export default function OrcamentoPage() {
  return (
    <>
      <CabecalhoPagina
        titulo="Pedir orçamento"
        motivo="xadrez"
        texto="Descreva a peça e, se tiver, junte uma fotografia. O pedido abre no WhatsApp com a mensagem já escrita."
      />
      <section aria-label="Formulário de orçamento" className="banda-clara py-14 md:py-20">
        <div className="moldura grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <QuoteForm />

          <aside aria-labelledby="titulo-ajuda">
            <h2 id="titulo-ajuda" className="letra-larga text-[1.75rem]">
              O que ajuda a dar o preço
            </h2>
            <dl className="mt-6">
              {AJUDA.map((a) => (
                <div key={a.titulo} className="border-t-2 border-dashed border-indigo-tinta py-4">
                  <dt className="font-bold">{a.titulo}</dt>
                  <dd className="mt-1 leading-relaxed text-algodao-texto">{a.texto}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}
