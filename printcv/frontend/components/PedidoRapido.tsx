'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { SITE, linkWhatsApp } from '@/lib/site'

// O pedido de orçamento no próprio topo da página: uma frase e segue para o WhatsApp.
// Vazio também segue, com a mensagem geral — nunca bloqueia quem quer falar.
export function PedidoRapido() {
  const [texto, setTexto] = useState('')

  function enviar(e: React.FormEvent) {
    e.preventDefault()
    const ideia = texto.trim()
    const mensagem = ideia
      ? `Olá! Gostaria de um orçamento para: ${ideia}`
      : SITE.mensagemWhatsApp
    const url = linkWhatsApp(mensagem)
    // Com 'noopener' o window.open devolve sempre null; cortamos o opener à mão
    const janela = window.open(url, '_blank')
    if (janela) janela.opener = null
    else window.location.href = url
  }

  return (
    <form onSubmit={enviar} className="w-full max-w-[36rem]">
      <label htmlFor="pedido-rapido" className="letra-estreita mb-2.5 block text-sm text-indigo-claro">
        O que pretende imprimir?
      </label>
      <div className="flex flex-col gap-2 bg-algodao p-1.5 sm:flex-row">
        <input
          id="pedido-rapido"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Ex.: 20 porta-chaves com logótipo"
          autoComplete="off"
          enterKeyHint="send"
          className="min-h-[3.25rem] min-w-0 flex-1 bg-transparent px-3.5 text-base text-indigo outline-none placeholder:text-indigo-fio focus-visible:shadow-[inset_0_-3px_0_#22327A]"
        />
        <button type="submit" className="accao-whatsapp shrink-0">
          <MessageCircle size={18} aria-hidden="true" />
          Pedir pelo WhatsApp
        </button>
      </div>
    </form>
  )
}
