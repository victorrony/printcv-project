# PrintCV — Plano de Projeto

## Stack Técnica

**Frontend:** Next.js 14 (App Router) + React + Tailwind CSS → deploy na **Vercel**

**Backend/CMS:** Strapi v5 (headless CMS) → deploy no **Railway**

**Base de dados:** PostgreSQL (managed pelo Railway)

**Media:** Cloudinary (imagens dos produtos e vídeos timelapse)

**Domínio:** printcv.cv (ou printcv.com)

---

## Estrutura do Projeto

```
printcv/
├── frontend/          ← Next.js app
│   ├── app/
│   │   ├── page.tsx              # Home / Hero
│   │   ├── loja/
│   │   │   ├── page.tsx          # Catálogo com filtros
│   │   │   └── [slug]/page.tsx   # Detalhe do produto
│   │   ├── galeria/
│   │   │   └── page.tsx          # Portfolio + timelapses
│   │   ├── orcamento/
│   │   │   └── page.tsx          # Formulário de orçamento
│   │   ├── sobre/
│   │   │   └── page.tsx          # Sobre a PrintCV
│   │   └── layout.tsx            # Layout global (nav + footer)
│   ├── components/
│   │   ├── ui/                   # Componentes reutilizáveis
│   │   ├── sections/             # Secções da homepage
│   │   ├── ProductCard.tsx
│   │   ├── GalleryGrid.tsx
│   │   ├── QuoteForm.tsx
│   │   └── WhatsAppButton.tsx
│   ├── lib/
│   │   ├── strapi.ts             # Client API para Strapi
│   │   └── utils.ts
│   ├── public/
│   └── tailwind.config.ts
│
└── backend/           ← Strapi CMS
    ├── src/
    │   ├── api/
    │   │   ├── produto/           # Content Type: Produto
    │   │   ├── categoria/         # Content Type: Categoria
    │   │   ├── galeria/           # Content Type: Item da Galeria
    │   │   ├── orcamento/         # Content Type: Pedido de Orçamento
    │   │   └── configuracao/      # Single Type: Config do site
    │   └── extensions/
    ├── config/
    │   ├── database.ts            # PostgreSQL config
    │   ├── plugins.ts             # Cloudinary provider
    │   └── server.ts
    └── package.json
```

---

## Content Types no Strapi

### Produto (Collection Type)

| Campo | Tipo | Notas |
|---|---|---|
| nome | Text | Nome do produto |
| slug | UID (de nome) | URL amigável |
| descricao | Rich Text | Descrição detalhada |
| preco | Number (decimal) | Preço em ECV |
| preco_sob_consulta | Boolean | Se true, mostra "A combinar" |
| imagens | Media (multiple) | Fotos do produto |
| categoria | Relation → Categoria | Many-to-One |
| destaque | Boolean | Aparece na homepage |
| disponivel | Boolean | Em stock ou não |
| tempo_producao | Text | Ex: "2-3 dias" |
| material | Enumeration | PLA / PETG / TPU / Misto |
| dimensoes | Text | Ex: "10 × 8 × 5 cm" |

### Categoria (Collection Type)

| Campo | Tipo |
|---|---|
| nome | Text |
| slug | UID |
| icone | Text (emoji ou nome do ícone) |
| ordem | Number |

Categorias iniciais: Acessórios, Decoração, Personalizado, Utilidade, Arte, Encomenda

### Galeria (Collection Type)

| Campo | Tipo | Notas |
|---|---|---|
| titulo | Text | Nome da peça |
| descricao | Text | Descrição curta |
| imagens | Media (multiple) | Fotos da peça |
| video_timelapse | Media | Vídeo da câmara Bambu Lab |
| tempo_impressao | Text | Ex: "3h 42min" |
| material | Enumeration | PLA / PETG / TPU |
| data | Date | Data de criação |
| destaque | Boolean | Aparece na homepage |

### Orçamento (Collection Type)

| Campo | Tipo | Notas |
|---|---|---|
| nome_cliente | Text | Nome do cliente |
| email | Email | Email de contacto |
| telefone | Text | WhatsApp do cliente |
| descricao_peca | Rich Text | O que o cliente quer |
| imagem_referencia | Media | Imagem opcional |
| status | Enumeration | novo / em_analise / orcado / aceite / em_producao / concluido |
| preco_estimado | Number | Preço definido por ti |
| notas_internas | Rich Text | Notas só para ti |

### Configuração do Site (Single Type)

| Campo | Tipo |
|---|---|
| titulo_site | Text |
| descricao_seo | Text |
| whatsapp | Text |
| email | Email |
| instagram | Text |
| endereco | Text |
| horario | Text |

---

## API Client (lib/strapi.ts)

```typescript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: { pagination?: { page: number; pageSize: number; total: number } };
}

async function fetchStrapi<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<StrapiResponse<T>> {
  const url = new URL(`${STRAPI_URL}/api/${endpoint}`);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
    next: { revalidate: 60 }, // ISR: revalida a cada 60s
  });

  if (!res.ok) throw new Error(`Strapi error: ${res.status}`);
  return res.json();
}

// Funções específicas
export const getProdutos = (params?: Record<string, string>) =>
  fetchStrapi('produtos', { 'populate': '*', ...params });

export const getProdutoBySlug = (slug: string) =>
  fetchStrapi('produtos', { 'filters[slug][$eq]': slug, 'populate': '*' });

export const getCategorias = () =>
  fetchStrapi('categorias', { 'sort': 'ordem:asc' });

export const getGaleria = () =>
  fetchStrapi('galerias', { 'populate': '*', 'sort': 'data:desc' });

export const getConfig = () =>
  fetchStrapi('configuracao', { 'populate': '*' });

export const submitOrcamento = async (data: Record<string, unknown>) => {
  const res = await fetch(`${STRAPI_URL}/api/orcamentos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });
  return res.json();
};
```

---

## Deploy

### Frontend (Vercel)

```bash
# Na pasta frontend/
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
vercel deploy
```

Variáveis de ambiente na Vercel:
- `NEXT_PUBLIC_STRAPI_URL` = URL do Strapi no Railway
- `STRAPI_API_TOKEN` = Token API do Strapi

### Backend (Railway)

```bash
# Criar projeto Strapi
npx create-strapi@latest backend --quickstart --no-run
cd backend

# Instalar provider Cloudinary
npm install @strapi/provider-upload-cloudinary

# Instalar provider PostgreSQL
npm install pg
```

Variáveis de ambiente no Railway:
- `DATABASE_CLIENT=postgres`
- `DATABASE_URL` (auto pelo Railway)
- `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET`
- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`

---

## Fases de Desenvolvimento

### Fase 1 — Fundação (esta semana)
- Setup Strapi no Railway + PostgreSQL
- Criar content types (Produto, Categoria, Galeria, Orçamento, Config)
- Setup Next.js na Vercel + conectar à API do Strapi
- Migrar design cinematográfico para componentes Next.js

### Fase 2 — Conteúdo (quando a impressora chegar)
- Popular produtos iniciais no Strapi
- Tirar fotos dos primeiros prints
- Gravar timelapses da câmara da Bambu Lab
- Upload para Cloudinary + galeria no site

### Fase 3 — Funcionalidades (semana 2-3)
- Formulário de orçamento funcional (cria entrada no Strapi)
- Botão WhatsApp com mensagem pré-preenchida
- SEO (meta tags, Open Graph, sitemap)
- Google Analytics

### Fase 4 — Pagamento (futuro)
- Avaliar Vinti4/SISP para pagamentos locais
- Ou Stripe para pagamentos internacionais
- Carrinho de compras funcional

---

## Vantagens desta Stack

**Para ti (developer):** Strapi dá-te um admin panel visual onde geres tudo sem código. Adicionas produto novo? Login no painel → novo produto → upload fotos → publicar. O site actualiza sozinho via ISR.

**Para o negócio:** Next.js com SSR/ISR garante SEO forte (Google indexa tudo), performance rápida, e o site funciona perfeitamente em mobile (maioria dos clientes em CV usa telemóvel).

**Custos:** Vercel free tier cobre o frontend. Railway ~5$/mês para Strapi + PostgreSQL. Cloudinary free tier dá 25GB de media. Domínio ~10-15$/ano. Total: **~5-7$/mês** para começar.
