// Types para os Content Types do Strapi

export interface StrapiImage {
  id: number
  url: string
  alternativeText: string | null
  width: number
  height: number
  formats?: {
    thumbnail?: { url: string; width: number; height: number }
    small?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    large?: { url: string; width: number; height: number }
  }
}

export interface Categoria {
  id: number
  nome: string
  slug: string
  icone: string
  ordem: number
}

export interface Produto {
  id: number
  nome: string
  slug: string
  descricao: string
  preco: number
  preco_sob_consulta: boolean
  imagens: StrapiImage[]
  categoria: Categoria | null
  destaque: boolean
  disponivel: boolean
  tempo_producao: string
  material: 'PLA' | 'PETG' | 'TPU' | 'Misto'
  dimensoes: string
}

export interface GaleriaItem {
  id: number
  titulo: string
  descricao: string
  imagens: StrapiImage[]
  video_timelapse: StrapiImage | null
  tempo_impressao: string
  material: 'PLA' | 'PETG' | 'TPU'
  data: string
  destaque: boolean
}

export interface Orcamento {
  id: number
  nome_cliente: string
  email: string
  telefone: string
  descricao_peca: string
  imagem_referencia: StrapiImage | null
  status: 'novo' | 'em_analise' | 'orcado' | 'aceite' | 'em_producao' | 'concluido'
  preco_estimado: number | null
  notas_internas: string | null
}

export interface Configuracao {
  titulo_site: string
  descricao_seo: string
  whatsapp: string
  email: string
  instagram: string
  endereco: string
  horario: string
  imagem_hero: StrapiImage | null
  modelo_3d: { id: number; url: string; name: string } | null
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiSingleResponse<T> {
  data: T
  meta: {}
}
