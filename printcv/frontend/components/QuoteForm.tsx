'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { submitOrcamento } from '@/lib/strapi'
import { CheckCircle2, Loader2, Upload, X } from 'lucide-react'

interface FormData {
  nome_cliente: string
  email: string
  telefone: string
  descricao_peca: string
  imagem?: File
}

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione um ficheiro de imagem válido')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem não pode exceder 5MB')
      return
    }

    setSelectedFile(file)
    setError('')

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const onSubmit = async (data: FormData) => {
    try {
      setError('')
      if (selectedFile) data.imagem = selectedFile
      await submitOrcamento(data)
      setSubmitted(true)
    } catch {
      setError('Erro ao enviar. Tente novamente ou contacte-nos via WhatsApp.')
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 rounded-3xl bg-teal/[0.08] border border-teal/30">
        <CheckCircle2 size={56} className="text-teal mx-auto mb-5" />
        <h3 className="text-2xl font-extrabold mb-2 text-fg">Pedido Recebido</h3>
        <p className="text-fg-muted text-sm">
          Entraremos em contacto em até 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2">
            Nome
          </label>
          <input
            type="text"
            placeholder="O seu nome"
            className="input-field"
            {...register('nome_cliente', { required: 'Nome é obrigatório' })}
          />
          {errors.nome_cliente && (
            <p className="text-red-500 text-xs mt-1">{errors.nome_cliente.message}</p>
          )}
        </div>

        <div>
          <label className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2">
            Telefone / WhatsApp
          </label>
          <input
            type="tel"
            placeholder="+238 ..."
            className="input-field"
            {...register('telefone', { required: 'Telefone é obrigatório' })}
          />
          {errors.telefone && (
            <p className="text-red-500 text-xs mt-1">{errors.telefone.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="email@exemplo.com"
          className="input-field"
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2">
          Descreva a peça
        </label>
        <textarea
          rows={5}
          placeholder="Medidas, cor, quantidade, uso pretendido..."
          className="input-field resize-y"
          {...register('descricao_peca', {
            required: 'Descreva o que pretende',
            minLength: { value: 10, message: 'Descreva com mais detalhe (mín. 10 caracteres)' },
          })}
        />
        {errors.descricao_peca && (
          <p className="text-red-500 text-xs mt-1">{errors.descricao_peca.message}</p>
        )}
      </div>

      {/* Upload de Imagem */}
      <div>
        <label className="block font-mono text-[11px] text-fg-muted font-semibold tracking-[2px] uppercase mb-2">
          Adicionar Imagem ou Foto (Opcional)
        </label>

        {!imagePreview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-theme rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-brand/50 hover:bg-brand/5"
          >
            <Upload size={32} className="mx-auto mb-3 text-fg-subtle" />
            <p className="text-sm text-fg-muted mb-1">Clique ou arraste uma imagem</p>
            <p className="text-xs text-fg-subtle">PNG, JPG, GIF (Máx. 5MB)</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden bg-elevated p-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-[300px] object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-6 right-6 bg-red-500/90 hover:bg-red-600 p-2 rounded-full transition-colors"
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary mt-2 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            A enviar...
          </>
        ) : (
          'Enviar Pedido'
        )}
      </button>
    </form>
  )
}
