import type { Categoria, Produto, GaleriaItem } from './types'

// Conteúdo do site. Para acrescentar um produto: junta-o a PRODUTOS,
// põe as imagens em public/produtos/ e faz push — a Vercel publica sozinha.

const CATEGORIAS: Categoria[] = [
  {
    id: 1,
    nome: 'Mundial',
    slug: 'mundial',
    descricao: 'Figuras personalizadas para acompanhar Cabo Verde no Mundial.',
    ordem: 1,
  },
  {
    id: 2,
    nome: 'Decoração e Casa',
    slug: 'decoracao-e-casa',
    descricao: 'Artigos decorativos para o lar, vasos, molduras e elementos de design de interiores.',
    ordem: 2,
  },
  {
    id: 3,
    nome: 'Peças Funcionais',
    slug: 'pecas-funcionais',
    descricao: 'Componentes práticos para uso quotidiano: suportes, encaixes, ferramentas e organizadores.',
    ordem: 3,
  },
  {
    id: 4,
    nome: 'Miniaturas e Figuras',
    slug: 'miniaturas-e-figuras',
    descricao: 'Figuras decorativas, miniaturas de personagens e objectos coleccionáveis impressos em 3D.',
    ordem: 4,
  },
]

const categoria = (slug: string) => CATEGORIAS.find((c) => c.slug === slug) ?? null

const PRODUTOS: Produto[] = [
  {
    id: 1,
    nome: 'Chaveiro Cabo-Verdiano',
    slug: 'chaveiro-cabo-verdiano',
    descricao:
      'Chaveiro personalizado com a bandeira de Cabo Verde, para torceres por Cabo Verde no Mundial.',
    preco: 200,
    preco_sob_consulta: false,
    imagens: ['/produtos/chaveiro-cabo-verdiano.png'],
    categoria: categoria('mundial'),
    destaque: true,
    disponivel: true,
    tempo_producao: '30 min',
    material: 'PLA',
  },
  {
    id: 2,
    nome: 'Vaso Geométrico Moderno',
    slug: 'vaso-geometrico-moderno',
    descricao:
      'Vaso decorativo com design geométrico contemporâneo. Perfeito para plantas artificiais ou como peça decorativa isolada.',
    preco: 1500,
    preco_sob_consulta: false,
    imagens: [],
    categoria: categoria('decoracao-e-casa'),
    destaque: true,
    disponivel: true,
    tempo_producao: '2 h',
    dimensoes: '25 cm × 15 cm',
  },
  {
    id: 3,
    nome: 'Suporte para Telemóvel de Mesa',
    slug: 'suporte-telemovel-mesa',
    descricao:
      'Suporte ajustável para telemóvel impresso em PLA, compatível com todos os modelos. Ideal para secretária ou mesa de cabeceira.',
    preco: 800,
    preco_sob_consulta: false,
    imagens: [],
    categoria: categoria('pecas-funcionais'),
    destaque: false,
    disponivel: true,
    tempo_producao: '45 min',
    material: 'PLA',
    dimensoes: 'À sua medida',
  },
  {
    id: 4,
    nome: 'Mascote Tubarão Cabo-Verdiano',
    slug: 'mascote-tubarao-cabo-verdiano',
    descricao:
      'Miniatura do tubarão mascote de Cabo Verde equipado com camisola e acessórios desportivos nas cores da bandeira nacional. Impresso em PLA de alta resolução, ideal para coleccionadores, fãs de desporto e como lembrança turística única.',
    preco: 2500,
    preco_sob_consulta: false,
    // Foto real da peça pintada; a segunda mostra a pintura à mão
    imagens: ['/produtos/mascote-tubarao-cabo-verdiano.webp', '/galeria/mascote-a-ser-pintado.webp'],
    categoria: categoria('mundial'),
    destaque: true,
    disponivel: true,
    tempo_producao: '1 h 30 min',
    material: 'PLA',
    dimensoes: '15 cm',
  },
]

// Trabalhos reais (fotos e vídeos da oficina; datas = data da foto/vídeo).
// Fotos tratadas sem metadados (GPS incluído) e vídeos sem som.
const GALERIA: GaleriaItem[] = [
  {
    id: 1,
    titulo: 'Impressão multicolor com AMS',
    descricao: 'Peças em várias cores numa só impressão, com o sistema AMS da Bambu Lab A1. Vídeo acelerado 3×.',
    imagens: ['/videos/impressao-multicolor-poster.webp'],
    video_timelapse: '/videos/impressao-multicolor.mp4',
    material: 'PLA',
    data: '2026-05-31',
    destaque: true,
  },
  {
    id: 2,
    titulo: 'Mascote Tubarão pintado à mão',
    descricao: 'Impresso em PLA e pintado à mão com as cores da selecção de Cabo Verde.',
    imagens: ['/produtos/mascote-tubarao-cabo-verdiano.webp'],
    material: 'PLA',
    data: '2026-07-07',
    destaque: true,
  },
  {
    id: 3,
    titulo: 'Candeeiros em espiral',
    descricao: 'Três candeeiros de mesa com cúpulas em espiral, impressos em cores vivas.',
    imagens: ['/galeria/candeeiros-espiral.webp'],
    inteira: true,
    material: 'PLA',
    data: '2026-05-31',
    destaque: true,
  },
  {
    id: 4,
    titulo: 'Mascote a ser pintado',
    descricao: 'O acabamento é feito à mão: depois de impresso, cada mascote é pintado camada a camada.',
    imagens: ['/galeria/mascote-a-ser-pintado.webp'],
    data: '2026-06-30',
    destaque: false,
  },
  {
    id: 5,
    titulo: 'Porta-lápis "hoodie"',
    descricao: 'Porta-lápis em forma de camisola com capuz, para a secretária.',
    imagens: ['/galeria/porta-lapis-hoodie.webp'],
    foco: 'center 75%',
    material: 'PLA',
    data: '2026-07-10',
    destaque: false,
  },
  {
    id: 6,
    titulo: 'Suporte para smartwatch',
    descricao: 'Suporte de carregamento para relógio, com encaixe para o cabo.',
    imagens: ['/galeria/suporte-relogio.webp'],
    material: 'PLA',
    data: '2026-07-10',
    destaque: false,
  },
  {
    id: 7,
    titulo: 'Porta-chaves Cabo Verde',
    descricao: 'Porta-chaves multicolor com a bandeira de Cabo Verde, para o Mundial 2026.',
    imagens: ['/galeria/porta-chaves-cabo-verde.webp'],
    material: 'PLA',
    data: '2026-05-30',
    destaque: false,
  },
  {
    id: 8,
    titulo: 'O primeiro Benchy',
    descricao: 'A primeira impressão da PrintCV: o Benchy, o barco de teste clássico da impressão 3D. Vídeo acelerado 6×.',
    imagens: ['/videos/impressao-benchy-poster.webp'],
    video_timelapse: '/videos/impressao-benchy.mp4',
    material: 'PLA',
    data: '2026-05-09',
    destaque: false,
  },
]

export function getCategorias(): Categoria[] {
  return [...CATEGORIAS].sort((a, b) => a.ordem - b.ordem)
}

export function getProdutos(filtros?: {
  categoria?: string
  destaque?: boolean
  disponivel?: boolean
}): Produto[] {
  return PRODUTOS.filter(
    (p) =>
      (filtros?.categoria === undefined || p.categoria?.slug === filtros.categoria) &&
      (filtros?.destaque === undefined || p.destaque === filtros.destaque) &&
      (filtros?.disponivel === undefined || p.disponivel === filtros.disponivel)
  )
}

export function getProdutoBySlug(slug: string): Produto | undefined {
  return PRODUTOS.find((p) => p.slug === slug)
}

export function getGaleria(filtros?: { destaque?: boolean }): GaleriaItem[] {
  return GALERIA.filter(
    (g) => filtros?.destaque === undefined || g.destaque === filtros.destaque
  ).sort((a, b) => b.data.localeCompare(a.data))
}
