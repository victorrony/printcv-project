'use client'

import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ImageIcon, Loader2, MessageCircle, Upload, X } from 'lucide-react'
import { linkWhatsApp } from '@/lib/site'
import { TIPOS_IMAGEM, TAMANHO_MAX_IMAGEM } from '@/lib/upload'

interface FormData {
  nome_cliente: string
  descricao_peca: string
}

export function QuoteForm() {
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [previewFalhou, setPreviewFalhou] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Evita reenviar a mesma imagem se o cliente voltar e submeter de novo
  const enviada = useRef<{ file: File; url: string } | null>(null)

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!TIPOS_IMAGEM.includes(file.type)) {
      setError('Use uma imagem PNG, JPG, WEBP, GIF ou HEIC')
      e.target.value = ''
      return
    }

    if (file.size > TAMANHO_MAX_IMAGEM) {
      setError('A imagem não pode exceder 5MB')
      e.target.value = ''
      return
    }

    setSelectedFile(file)
    setError('')
    setPreviewFalhou(false)
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setError('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (data: FormData) => {
    setError('')
    let mensagem = `Olá! Sou ${data.nome_cliente.trim()} e gostaria de um orçamento.\n\n${data.descricao_peca.trim()}`

    if (selectedFile) {
      try {
        if (enviada.current?.file !== selectedFile) {
          // Só carrega o cliente do Blob (~35 kB) quando há imagem para enviar
          const { upload } = await import('@vercel/blob/client')
          const ext = selectedFile.type.split('/')[1].replace('jpeg', 'jpg')
          const blob = await upload(`pedidos/referencia.${ext}`, selectedFile, {
            access: 'public',
            handleUploadUrl: '/api/upload',
            contentType: selectedFile.type,
          })
          enviada.current = { file: selectedFile, url: blob.url }
        }
        mensagem += `\n\nImagem de referência: ${enviada.current.url}`
      } catch (e) {
        console.error('[QuoteForm] upload da imagem falhou', e)
        setError(
          'Não foi possível enviar a imagem. Tente de novo, ou remova-a e envie a foto na conversa do WhatsApp.'
        )
        return
      }
    }

    const url = linkWhatsApp(mensagem)
    // Depois de um await, alguns browsers bloqueiam o window.open;
    // nesse caso seguimos para o WhatsApp na mesma janela.
    const janela = window.open(url, '_blank')
    if (janela) janela.opener = null
    else window.location.href = url
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
      <div>
        <label htmlFor="nome_cliente" className="rotulo">
          Nome
        </label>
        <input
          id="nome_cliente"
          type="text"
          autoComplete="name"
          placeholder="O seu nome"
          aria-invalid={errors.nome_cliente ? true : undefined}
          aria-describedby={errors.nome_cliente ? 'erro-nome' : undefined}
          className="campo"
          {...register('nome_cliente', {
            validate: (v) => v.trim() !== '' || 'Escreva o seu nome, para sabermos com quem falamos',
          })}
        />
        {errors.nome_cliente && (
          <p id="erro-nome" className="erro">{errors.nome_cliente.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="descricao_peca" className="rotulo">
          A peça
        </label>
        <textarea
          id="descricao_peca"
          rows={6}
          placeholder="Medidas, cor, quantidade, para que serve…"
          aria-invalid={errors.descricao_peca ? true : undefined}
          aria-describedby={errors.descricao_peca ? 'erro-descricao' : undefined}
          className="campo resize-y leading-relaxed"
          {...register('descricao_peca', {
            validate: (v) => {
              const texto = v.trim()
              if (!texto) return 'Descreva a peça que pretende'
              if (texto.length < 10) return 'Conte um pouco mais (pelo menos 10 caracteres)'
              return true
            },
          })}
        />
        {errors.descricao_peca && (
          <p id="erro-descricao" className="erro">{errors.descricao_peca.message}</p>
        )}
      </div>

      <div>
        <span id="rotulo-imagem" className="rotulo">
          Fotografia de referência <span className="normal-case tracking-normal text-algodao-texto">(opcional)</span>
        </span>

        {!imagePreview ? (
          // O próprio rótulo é a zona de escolha: funciona com teclado e leitor de ecrã
          <label
            htmlFor="imagem_referencia"
            className="flex cursor-pointer items-center gap-4 border-2 border-dashed border-indigo px-5 py-6 transition-colors hover:bg-algodao-sombra has-[:focus-visible]:shadow-[0_0_0_3px_#F3F2EC,0_0_0_6px_#22327A]"
          >
            <Upload size={26} className="shrink-0" aria-hidden="true" />
            <span>
              <span className="block font-semibold">Escolher uma imagem</span>
              <span className="numeros block text-sm text-algodao-texto">PNG, JPG, WEBP ou HEIC, até 5 MB</span>
            </span>
            <input
              id="imagem_referencia"
              ref={fileInputRef}
              type="file"
              accept={TIPOS_IMAGEM.join(',')}
              onChange={handleImageChange}
              aria-labelledby="rotulo-imagem"
              className="sr-only"
            />
          </label>
        ) : (
          <div className="border-2 border-indigo bg-algodao-sombra p-2">
            {previewFalhou ? (
              // HEIC e afins não têm pré-visualização na maioria dos browsers
              <div className="flex items-center gap-3 p-4">
                <ImageIcon size={20} className="shrink-0" aria-hidden="true" />
                <span className="truncate">{selectedFile?.name}</span>
              </div>
            ) : (
              <img
                src={imagePreview}
                alt="Pré-visualização da imagem escolhida"
                onError={() => setPreviewFalhou(true)}
                className="max-h-[300px] w-full object-cover"
              />
            )}
            <button
              type="button"
              onClick={removeImage}
              disabled={isSubmitting}
              className="mt-2 inline-flex min-h-[2.75rem] items-center gap-2 px-2 font-semibold underline decoration-2 underline-offset-4 disabled:opacity-50"
            >
              <X size={18} aria-hidden="true" />
              Remover imagem
            </button>
          </div>
        )}
      </div>

      {error && (
        <p role="alert" className="border-2 border-[#9B1C1C] px-4 py-3 font-semibold text-[#9B1C1C]">
          {error}
        </p>
      )}

      <div>
        <button type="submit" disabled={isSubmitting} className="accao-whatsapp w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              {selectedFile ? 'A enviar a imagem…' : 'A abrir o WhatsApp…'}
            </>
          ) : (
            <>
              <MessageCircle size={18} aria-hidden="true" />
              Enviar pedido pelo WhatsApp
            </>
          )}
        </button>
        <p className="mt-3 text-sm text-algodao-texto">
          Abre o WhatsApp com a mensagem já escrita{selectedFile ? ' e o link da imagem' : ''}. A mensagem só
          segue quando carregar em enviar no WhatsApp.
        </p>
      </div>
    </form>
  )
}
