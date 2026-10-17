import type {
  Produto, Categoria, GaleriaItem, Configuracao,
  StrapiResponse, StrapiSingleResponse
} from './types'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''

// ─── Base Fetch ───────────────────────────────────────────

async function fetchStrapi<T>(
  endpoint: string,
  options?: {
    params?: Record<string, string>
    method?: string
    body?: Record<string, unknown>
    revalidate?: number
  }
): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`)

  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) =>
      url.searchParams.set(key, value)
    )
  }

  const fetchOptions: RequestInit = {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
    },
    next: { revalidate: options?.revalidate ?? 60 },
  }

  if (options?.body) {
    fetchOptions.body = JSON.stringify({ data: options.body })
  }

  const res = await fetch(url.toString(), fetchOptions)

  if (!res.ok) {
    throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// ─── Produtos ─────────────────────────────────────────────

export async function getProdutos(filters?: {
  categoria?: string
  destaque?: boolean
  disponivel?: boolean
}) {
  const params: Record<string, string> = { 'populate': '*' }

  if (filters?.categoria) {
    params['filters[categoria][slug][$eq]'] = filters.categoria
  }
  if (filters?.destaque !== undefined) {
    params['filters[destaque][$eq]'] = String(filters.destaque)
  }
  if (filters?.disponivel !== undefined) {
    params['filters[disponivel][$eq]'] = String(filters.disponivel)
  }

  return fetchStrapi<StrapiResponse<Produto[]>>('produtos', { params })
}

export async function getProdutoBySlug(slug: string) {
  return fetchStrapi<StrapiResponse<Produto[]>>('produtos', {
    params: {
      'filters[slug][$eq]': slug,
      'populate': '*',
    },
  })
}

export async function getProdutosSlugs() {
  const res = await fetchStrapi<StrapiResponse<{ slug: string }[]>>('produtos', {
    params: { 'fields[0]': 'slug' },
  })
  return res.data.map((p) => p.slug)
}

// ─── Categorias ───────────────────────────────────────────

export async function getCategorias() {
  return fetchStrapi<StrapiResponse<Categoria[]>>('categorias', {
    params: { 'sort': 'ordem:asc' },
  })
}

// ─── Galeria ──────────────────────────────────────────────

export async function getGaleria(options?: { destaque?: boolean }) {
  const params: Record<string, string> = {
    'populate': '*',
    'sort': 'data:desc',
  }

  if (options?.destaque !== undefined) {
    params['filters[destaque][$eq]'] = String(options.destaque)
  }

  return fetchStrapi<StrapiResponse<GaleriaItem[]>>('galerias', { params })
}

// ─── Orçamentos ───────────────────────────────────────────

export async function submitOrcamento(data: {
  nome_cliente: string
  email: string
  telefone: string
  descricao_peca: string
  imagem?: File
}) {
  // Se tiver imagem, usar FormData
  if (data.imagem) {
    const formData = new FormData()
    formData.append('data.nome_cliente', data.nome_cliente)
    formData.append('data.email', data.email)
    formData.append('data.telefone', data.telefone)
    formData.append('data.descricao_peca', data.descricao_peca)
    formData.append('data.status', 'novo')
    formData.append('files.imagem_referencia', data.imagem)

    const res = await fetch(`${STRAPI_URL}/api/orcamentos`, {
      method: 'POST',
      headers: {
        ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      },
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`Strapi API error: ${res.status} ${res.statusText}`)
    }

    return res.json()
  }

  // Sem imagem, usar JSON como antes
  return fetchStrapi<StrapiSingleResponse<{ id: number }>>('orcamentos', {
    method: 'POST',
    body: { 
      nome_cliente: data.nome_cliente,
      email: data.email,
      telefone: data.telefone,
      descricao_peca: data.descricao_peca,
      status: 'novo' 
    },
    revalidate: 0,
  })
}

// ─── Configuração do Site ─────────────────────────────────

export async function getConfig() {
  return fetchStrapi<StrapiSingleResponse<Configuracao>>('configuracao', {
    params: { 'populate': '*' },
    revalidate: 300, // 5 min cache
  })
}

// ─── Helpers ──────────────────────────────────────────────

export function getStrapiImageUrl(image: { url: string } | null): string {
  if (!image) return '/placeholder.jpg'
  if (image.url.startsWith('http')) return image.url
  return `${STRAPI_URL}${image.url}`
}

export function formatPreco(preco: number): string {
  return new Intl.NumberFormat('pt-CV', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(preco) + '$'
}
