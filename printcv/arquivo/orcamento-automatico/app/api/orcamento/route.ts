import { NextRequest, NextResponse } from 'next/server'

const SERVIDOR_ORCAMENTO = process.env.SERVIDOR_ORCAMENTO || 'http://localhost:3001'

export async function POST(req: NextRequest) {
  const { produtoId, quantidade } = await req.json()

  if (!produtoId) {
    return NextResponse.json({ erro: 'Falta o produtoId' }, { status: 400 })
  }

  try {
    const resposta = await fetch(`${SERVIDOR_ORCAMENTO}/orcamento`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produtoId, quantidade: quantidade || 1 }),
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      return NextResponse.json(dados, { status: resposta.status })
    }

    return NextResponse.json(dados)
  } catch {
    return NextResponse.json(
      {
        erro: 'O servidor de orçamento não está acessível. Verifica se está a correr no teu PC.',
      },
      { status: 503 }
    )
  }
}
