import { NextRequest, NextResponse } from 'next/server'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''
// Sem valor por omissão: sem ADMIN_PASSWORD definida, o acesso é sempre recusado
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  }

  const res = await fetch(
    `${STRAPI_URL}/api/orcamentos?populate=imagem_referencia&sort=createdAt:desc`,
    { headers: { Authorization: `Bearer ${STRAPI_TOKEN}` } }
  )
  const data = await res.json()
  return NextResponse.json(data)
}

export async function PUT(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  }

  const { id, ...campos } = await req.json()
  const res = await fetch(`${STRAPI_URL}/api/orcamentos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: campos }),
  })
  const data = await res.json()
  return NextResponse.json(data)
}
