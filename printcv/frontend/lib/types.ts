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
  /** object-position da imagem no cartão quadrado (ex.: 'center 70%') */
  foco?: string
  /** Mostra a foto inteira no cartão (fotos de grupo largas), em vez de a recortar */
  inteira?: boolean
  tempo_impressao?: string
  material?: 'PLA' | 'PETG' | 'TPU'
  /** AAAA-MM-DD */
  data: string
  destaque: boolean
}
