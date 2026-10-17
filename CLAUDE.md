# PrintCV — Contexto do Projecto

## O que é este projecto
Site de e-commerce / portfólio para uma empresa de impressão 3D em Cabo Verde (PrintCV).
Vende produtos impressos em 3D, aceita orçamentos personalizados e mostra timelapses da impressora Bambu Lab.

## Stack Técnica

| Camada | Tecnologia | Deploy |
|--------|-----------|--------|
| Frontend | Next.js 14 (App Router) + Tailwind CSS | Vercel |
| Backend/CMS | **Strapi v5** (headless CMS) | Railway |
| Base de dados | PostgreSQL (Railway managed) | Railway |
| Media | Cloudinary (imagens + vídeos) | Cloudinary |
| Domínio | printcv.cv (ou printcv.com) | — |

## Estrutura de Pastas

```
printcv-project/
└── printcv/
    ├── frontend/    ← Next.js 14
    └── backend/     ← Strapi v5
```

## Strapi v5 — Regras de Ouro

- **Usar sempre a skill `strapi-cms`** para qualquer tarefa relacionada com Strapi
- Versão: **Strapi v5** (não v4)
- Criar com: `npx create-strapi-app@latest . --no-run --no-cloud --ts --dbclient=sqlite` (local dev)
- Produção usa PostgreSQL + Cloudinary no Railway
- Content types são criados via Admin UI em dev, schemas guardados no repo

## Content Types

| Nome | Tipo | Descrição |
|------|------|-----------|
| `produto` | Collection | Produtos de impressão 3D |
| `categoria` | Collection | Categorias dos produtos |
| `galeria` | Collection | Portfolio + timelapses |
| `orcamento` | Collection | Pedidos de orçamento dos clientes |
| `configuracao` | Single Type | Config global do site |

## Portas Locais

- Strapi backend: `http://localhost:1337`
- Strapi admin: `http://localhost:1337/admin`
- Next.js frontend: `http://localhost:3000`

## Variáveis de Ambiente

### Backend (.env)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
TRANSFER_TOKEN_SALT=...
JWT_SECRET=...
DATABASE_CLIENT=sqlite          # local
DATABASE_FILENAME=.tmp/data.db  # local
# Produção: DATABASE_CLIENT=postgres + DATABASE_URL
# Produção: CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET
```

### Frontend (.env.local)
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=<gerado no painel Strapi>
```

## Fases de Desenvolvimento

1. **Fase 1** — Setup Strapi + PostgreSQL no Railway, content types, Next.js na Vercel
2. **Fase 2** — Popular conteúdo (quando a impressora chegar)
3. **Fase 3** — Orçamentos, WhatsApp, SEO, Analytics
4. **Fase 4** — Pagamentos (Vinti4/SISP ou Stripe)

## Regras Importantes

- Para tudo sobre Strapi: **usar a skill `strapi-cms`**
- Para tudo sobre frontend: **usar a skill `senior-fullstack`**
- Respostas sempre em **Português** (variedade europeia/africana)
- O plano completo está em `printcv/printcv-project-plan.md`
- Nunca alterar `node_modules/` ou ficheiros `dist/` gerados
