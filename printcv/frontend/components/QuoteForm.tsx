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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="nome_cliente"
          className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2"
        >
          Nome
        </label>
        <input
          id="nome_cliente"
          type="text"
          placeholder="O seu nome"
          className="input-field"
          {...register('nome_cliente', {
            validate: (v) => v.trim() !== '' || 'Nome é obrigatório',
          })}
        />
        {errors.nome_cliente && (
          <p className="text-red-500 text-xs mt-1">{errors.nome_cliente.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="descricao_peca"
          className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2"
        >
          Descreva a peça
        </label>
        <textarea
          id="descricao_peca"
          rows={5}
          placeholder="Medidas, cor, quantidade, uso pretendido..."
          className="input-field resize-y"
          {...register('descricao_peca', {
            validate: (v) => {
              const texto = v.trim()
              if (!texto) return 'Descreva o que pretende'
              if (texto.length < 10) return 'Descreva com mais detalhe (mín. 10 caracteres)'
              return true
            },
          })}
        />
        {errors.descricao_peca && (
          <p className="text-red-500 text-xs mt-1">{errors.descricao_peca.message}</p>
        )}
      </div>

      {/* Upload de Imagem */}
      <div>
        <label
          htmlFor="imagem_referencia"
          className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2"
        >
          Adicionar Imagem ou Foto (Opcional)
        </label>

        {!imagePreview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-theme rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-brand/50 hover:bg-brand/5"
          >
            <Upload size={32} className="mx-auto mb-3 text-fg-subtle" />
            <p className="text-sm text-fg-muted mb-1">Clique para escolher uma imagem</p>
            <p className="text-xs text-fg-subtle">PNG, JPG, WEBP, HEIC (Máx. 5MB)</p>
            <input
              id="imagem_referencia"
              ref={fileInputRef}
              type="file"
              accept={TIPOS_IMAGEM.join(',')}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-elevated p-4">
            {previewFalhou ? (
              // HEIC e afins não têm pré-visualização na maioria dos browsers
              <div className="flex items-center gap-3 p-4 text-sm text-fg-muted">
                <ImageIcon size={20} className="text-accent shrink-0" />
                <span className="truncate pr-10">{selectedFile?.name}</span>
              </div>
            ) : (
              <img
                src={imagePreview}
                alt="Pré-visualização da imagem escolhida"
                onError={() => setPreviewFalhou(true)}
                className="w-full max-h-[300px] object-cover rounded-lg"
              />
            )}
            <button
              type="button"
              onClick={removeImage}
              disabled={isSubmitting}
              aria-label="Remover imagem"
              className="absolute top-6 right-6 bg-red-500/90 hover:bg-red-600 p-2 rounded-full transition-colors disabled:opacity-50"
            >
              <X size={18} className="text-white" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-3 rounded-lg">
          {error}
        </p>
      )}

      <p className="text-xs text-fg-subtle">
        O pedido abre no WhatsApp com a mensagem já escrita
        {selectedFile ? ' e o link da imagem.' : '.'}
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {selectedFile ? 'A enviar imagem...' : 'A abrir o WhatsApp...'}
          </>
        ) : (
          <>
            <MessageCircle size={18} />
            Enviar pedido pelo WhatsApp
          </>
        )}
      </button>
    </form>
  )
}
