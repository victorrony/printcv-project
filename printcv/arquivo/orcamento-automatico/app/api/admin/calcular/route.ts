import { NextRequest, NextResponse } from 'next/server'

const SERVIDOR_ORCAMENTO = process.env.SERVIDOR_ORCAMENTO || 'http://localhost:3001'
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''
// Sem valor por omissão: sem ADMIN_PASSWORD definida, o acesso é sempre recusado
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

export async function POST(req: NextRequest) {
  const { password, pedidoId, ficheiro3mf, quantidade = 1 } = await req.json()

  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    return NextResponse.json({ erro: 'Não autorizado' }, { status: 401 })
  }

  if (!pedidoId || !ficheiro3mf) {
    return NextResponse.json({ erro: 'Faltam pedidoId e ficheiro3mf' }, { status: 400 })
  }

  // 1. Fazer slice no servidor local
  let sliceResult
  try {
    const res = await fetch(`${SERVIDOR_ORCAMENTO}/orcamento`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produtoId: '__custom__', quantidade, ficheiro: ficheiro3mf }),
    })
    sliceResult = await res.json()
    if (!res.ok) throw new Error(sliceResult.erro || 'Erro no slice')
  } catch (e) {
    return NextResponse.json({ erro: `Servidor de slice: ${(e as Error).message}` }, { status: 503 })
  }

  // 2. Guardar resultado no Strapi
  try {
    await fetch(`${STRAPI_URL}/api/orcamentos/${pedidoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          ficheiro_3mf: ficheiro3mf,
          dados_slice: sliceResult,
          preco_estimado: sliceResult.orcamento?.precoUnitario?.recomendado ?? null,
          status: 'orcado',
        },
      }),
    })
  } catch (e) {
    // Não bloquear — devolver o resultado mesmo se Strapi falhar
    console.error('Erro ao guardar no Strapi:', e)
  }

  return NextResponse.json(sliceResult)
}
