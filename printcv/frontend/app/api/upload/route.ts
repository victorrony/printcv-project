import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { NextResponse } from 'next/server'
import { TIPOS_IMAGEM, TAMANHO_MAX_IMAGEM } from '@/lib/upload'

// Gera o token para o browser enviar a imagem do pedido directamente para o
// Vercel Blob (as funções da Vercel não aceitam corpos acima de 4,5 MB).
// Precisa de BLOB_READ_WRITE_TOKEN — criado ao ligar um Blob store ao projecto.
export async function POST(request: Request) {
  // Trava o uso da rota a partir de outros sites; um script pode forjar o
  // cabeçalho, por isso o limite de pedidos fica na Firewall da Vercel.
  const origem = request.headers.get('origin')
  if (origem && origem !== new URL(request.url).origin) {
    return NextResponse.json({ erro: 'Origem não permitida' }, { status: 403 })
  }

  try {
    const body = (await request.json()) as HandleUploadBody
    const resposta = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith('pedidos/')) throw new Error('Destino inválido')
        return {
          allowedContentTypes: TIPOS_IMAGEM,
          maximumSizeInBytes: TAMANHO_MAX_IMAGEM,
          addRandomSuffix: true,
          validUntil: Date.now() + 5 * 60 * 1000,
        }
      },
    })
    return NextResponse.json(resposta)
  } catch (erro) {
    console.error('[api/upload]', erro)
    return NextResponse.json({ erro: 'Não foi possível preparar o envio da imagem' }, { status: 400 })
  }
}
