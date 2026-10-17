export interface Categoria {
  id: number
  nome: string
  slug: string
  descricao: string
  icone?: string
  ordem: number
}

export interface Produto {
  id: number
  nome: string
  slug: string
  descricao: string
  preco: number
  preco_sob_consulta: boolean
  /** Caminhos em /public, ex.: '/produtos/vaso.png' */
  imagens: string[]
  categoria: Categoria | null
  destaque: boolean
  disponivel: boolean
  tempo_producao?: string
  material?: 'PLA' | 'PETG' | 'TPU' | 'Misto'
  dimensoes?: string
}

export interface GaleriaItem {
  id: number
  titulo: string
  descricao: string
  imagens: string[]
  video_timelapse?: string
  tempo_impressao?: string
  material?: 'PLA' | 'PETG' | 'TPU'
  /** AAAA-MM-DD */
  data: string
  destaque: boolean
}
