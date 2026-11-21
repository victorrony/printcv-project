import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { getGaleria, getProdutos } from '@/lib/conteudo'
import { formatData } from '@/lib/format'
import { SITE, linkWhatsApp } from '@/lib/site'
import { Emenda } from '@/components/pano/Padroes'
import { Tear } from '@/components/pano/Tear'
import { PedidoRapido } from '@/components/PedidoRapido'
import { TiraProduto } from '@/components/TiraProduto'
import { BandaTimelapses } from '@/components/BandaTimelapses'
import { MosaicoOficina } from '@/components/MosaicoOficina'

const PASSOS = [
  {
    titulo: 'Conte-nos a ideia',
    texto: 'Uma frase, uma fotografia ou um ficheiro STL, enviados pelo WhatsApp.',
  },
  {
    titulo: 'Combinamos preço e prazo',
    texto: 'Antes de imprimir, fica a saber quanto custa e quando fica pronta.',
  },
  {
    titulo: 'Imprimimos camada a camada',
    texto: 'Na Bambu Lab A1, em PLA, com várias cores quando a peça as pede.',
  },
  {
    titulo: 'Combinamos a entrega',
    texto: 'Acertamos consigo como a peça lhe chega às mãos.',
  },
]

export default function HomePage() {
  const galeria = getGaleria()
  const videos = galeria.filter((g) => g.video_timelapse)
  const tear = videos.find((g) => g.video_timelapse === '/videos/impressao-multicolor.mp4') ?? videos[0]
  // Na banda preta, o vídeo do tear fica por último: abre com outro
  const timelapses = [...videos.filter((v) => v !== tear), ...(tear ? [tear] : [])]
  const fotos = galeria.filter((g) => !g.portfolio && !g.video_timelapse && g.imagens[0])
  // A tira larga é a do produto com mais fotos reais; as outras seguem a ordem do catálogo
  const produtos = getProdutos({ disponivel: true })
  const larga = [...produtos].sort((a, b) => b.imagens.length - a.imagens.length)[0]
  const tiras = larga ? [larga, ...produtos.filter((p) => p !== larga)] : produtos

  return (
    <>
      {/* ── O topo: o tear ── */}
      <section aria-labelledby="titulo-inicio" className="banda-escura">
        <div className="moldura grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.3fr_1fr] lg:gap-14 lg:py-24">
          <div>
            <h1 id="titulo-inicio" className="letra-larga tecer-entrada text-[clamp(2.6rem,5.2vw,5.25rem)]">
              Imprimimos em 3D, camada a camada, na Praia.
            </h1>
            <p className="mt-6 max-w-[44ch] text-[1.15rem] leading-relaxed text-indigo-claro">
              Lembranças, peças por medida, brindes para empresas e protótipos. Diga-nos o que precisa e
              continuamos a conversa no WhatsApp.
            </p>
            <div className="mt-9">
              <PedidoRapido />
            </div>
            <p className="mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[1rem]">
              <Link href="/loja" className="ligacao">
                Ver a loja
              </Link>
              <Link href="/orcamento" className="ligacao">
                Pedido com fotografia
              </Link>
            </p>
          </div>

          {tear?.video_timelapse && (
            <Tear
              src={tear.video_timelapse}
              poster={tear.imagens[0]}
              titulo={tear.titulo}
              legenda={`${formatData(tear.data)} · vídeo acelerado`}
            />
          )}
        </div>
      </section>

      <Emenda motivo="losango" tom="escuro" altura={20} />

      {/* ── Loja ── */}
      <section aria-labelledby="titulo-loja" className="banda-clara py-20 md:py-28">
        <div className="moldura">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="titulo-loja" className="titulo-banda max-w-[18ch]">
              Peças prontas a encomendar
            </h2>
            <Link href="/loja" className="ligacao text-[1.05rem]">
              Ver a loja toda
            </Link>
          </div>
          <div className="tiras">
            <div className="grid grid-cols-2 lg:grid-cols-5">
              {tiras.map((produto, i) => (
                <TiraProduto
                  key={produto.id}
                  produto={produto}
                  larga={produto === larga}
                  // Com a tira larga a ocupar uma linha, as restantes vão aos pares; a que sobra estica
                  sozinha={i === tiras.length - 1 && (tiras.length - 1) % 2 === 1}
                  prioridade={i === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── A banda preta: os timelapses ── */}
      <BandaTimelapses videos={timelapses} />

      {/* ── A oficina ── */}
      <section aria-labelledby="titulo-oficina" className="banda-clara py-20 md:py-28">
        <div className="moldura">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 id="titulo-oficina" className="titulo-banda max-w-[16ch]">
              Saído da oficina
            </h2>
            <Link href="/galeria" className="ligacao text-[1.05rem]">
              Ver os {galeria.length} trabalhos
            </Link>
          </div>
          <MosaicoOficina itens={fotos} />
        </div>
      </section>

      <Emenda motivo="dente" tom="claro" altura={14} />

      {/* ── Como funciona + fecho ── */}
      <section aria-labelledby="titulo-passos" className="banda-escura py-20 md:py-28">
        <div className="moldura">
          <h2 id="titulo-passos" className="titulo-banda max-w-[18ch]">
            Da ideia à peça, em quatro passos
          </h2>
          <div className="tiras mt-12">
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
              {PASSOS.map((passo, i) => (
                <li key={passo.titulo} className="tira px-6 pb-8 pt-7">
                  <span className="letra-larga numeros block text-[3rem] text-indigo-claro" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 text-[1.25rem] font-bold leading-snug">{passo.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-indigo-claro">{passo.texto}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20 grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <p className="letra-larga text-[clamp(2.25rem,4.8vw,4.25rem)]">Tem uma ideia? Comece por aqui.</p>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
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
                Pedido com fotografia
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
