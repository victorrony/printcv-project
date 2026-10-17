'use client'

import { useState } from 'react'
import Image from 'next/image'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'

const STATUS_LABELS: Record<string, { label: string; cor: string }> = {
  novo:        { label: 'Novo',         cor: 'bg-blue-500' },
  em_analise:  { label: 'Em análise',   cor: 'bg-yellow-500' },
  orcado:      { label: 'Orçado',       cor: 'bg-orange-500' },
  aceite:      { label: 'Aceite',       cor: 'bg-green-500' },
  em_producao: { label: 'Em produção',  cor: 'bg-purple-500' },
  concluido:   { label: 'Concluído',    cor: 'bg-fg-subtle' },
}

interface Pedido {
  id: number
  documentId: string
  nome_cliente: string
  email: string
  telefone: string
  descricao_peca: string
  status: string
  preco_estimado: number | null
  ficheiro_3mf: string | null
  dados_slice: Record<string, unknown> | null
  cor_desejado: string | null
  praco_desejado: string | null
  imagem_referencia: { url: string } | null
  createdAt: string
}

interface SliceResultado {
  dados: { peso: number; tempo: string; cores: number }
  orcamento: {
    precoUnitario: { recomendado: number }
    precoLote: { recomendado: number }
    quantidade: number
  }
}

export default function AdminPanel() {
  const [password, setPassword] = useState('')
  const [autenticado, setAutenticado] = useState(false)
  const [erroAuth, setErroAuth] = useState(false)
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [aCarregar, setACarregar] = useState(false)
  const [pedidoAberto, setPedidoAberto] = useState<Pedido | null>(null)
  const [ficheiro3mf, setFicheiro3mf] = useState('')
  const [quantidade, setQuantidade] = useState(1)
  const [aCalcular, setACalcular] = useState(false)
  const [sliceResultado, setSliceResultado] = useState<SliceResultado | null>(null)
  const [erroSlice, setErroSlice] = useState<string | null>(null)

  async function entrar() {
    setACarregar(true)
    setErroAuth(false)
    const res = await fetch('/api/admin/pedidos', {
      headers: { 'x-admin-password': password },
    })
    if (res.status === 401) {
      setErroAuth(true)
      setACarregar(false)
      return
    }
    const dados = await res.json()
    setPedidos(dados.data ?? [])
    setAutenticado(true)
    setACarregar(false)
  }

  async function recarregar() {
    const res = await fetch('/api/admin/pedidos', {
      headers: { 'x-admin-password': password },
    })
    const dados = await res.json()
    setPedidos(dados.data ?? [])
  }

  async function calcular() {
    if (!pedidoAberto || !ficheiro3mf.trim()) return
    setACalcular(true)
    setErroSlice(null)
    setSliceResultado(null)

    const res = await fetch('/api/admin/calcular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        pedidoId: pedidoAberto.documentId,
        ficheiro3mf: ficheiro3mf.trim(),
        quantidade,
      }),
    })
    const dados = await res.json()
    if (!res.ok) {
      setErroSlice(dados.erro || 'Erro desconhecido')
    } else {
      setSliceResultado(dados)
      await recarregar()
      // Actualizar pedido aberto com novos dados
      setPedidoAberto(p => p ? { ...p, preco_estimado: dados.orcamento?.precoUnitario?.recomendado, ficheiro_3mf: ficheiro3mf.trim(), status: 'orcado' } : p)
    }
    setACalcular(false)
  }

  async function mudarStatus(id: string, status: string) {
    await fetch('/api/admin/pedidos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ id, status }),
    })
    await recarregar()
    setPedidoAberto(p => p ? { ...p, status } : p)
  }

  function abrirPedido(p: Pedido) {
    setPedidoAberto(p)
    setFicheiro3mf(p.ficheiro_3mf ?? '')
    setQuantidade(1)
    setSliceResultado(null)
    setErroSlice(null)
  }

  // — Ecrã de login —
  if (!autenticado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-page px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-light mb-4 text-white text-2xl font-extrabold font-mono shadow-lg">
              3D
            </div>
            <h1 className="text-2xl font-extrabold text-fg">Painel PrintCV</h1>
            <p className="text-sm text-fg-subtle mt-1">Gestão de pedidos</p>
          </div>

          <div className="bg-surface border border-theme rounded-2xl p-6 shadow-card">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && entrar()}
              className="w-full px-4 py-3 rounded-xl border border-theme bg-elevated text-fg placeholder:text-fg-subtle focus:outline-none focus:border-brand mb-3"
            />
            {erroAuth && <p className="text-red-500 text-sm mb-3">Password incorrecta.</p>}
            <button
              onClick={entrar}
              disabled={aCarregar}
              className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-light disabled:opacity-60 transition-colors"
            >
              {aCarregar ? 'A entrar...' : 'Entrar'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // — Painel principal —
  return (
    <div className="min-h-screen bg-page">
      {/* Header */}
      <div className="border-b border-theme bg-surface px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white text-sm font-extrabold font-mono">
            3D
          </div>
          <span className="font-bold text-fg">PrintCV Admin</span>
        </div>
        <span className="text-xs text-fg-subtle">{pedidos.length} pedidos</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 flex gap-6">

        {/* Lista de pedidos */}
        <div className="w-full md:w-[380px] shrink-0 space-y-3">
          {pedidos.length === 0 && (
            <p className="text-fg-subtle text-sm text-center py-12">Nenhum pedido ainda.</p>
          )}
          {pedidos.map((p) => {
            const st = STATUS_LABELS[p.status] ?? STATUS_LABELS.novo
            const ativo = pedidoAberto?.id === p.id
            return (
              <button
                key={p.id}
                onClick={() => abrirPedido(p)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  ativo ? 'border-brand bg-brand/5' : 'border-theme bg-surface hover:border-brand/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-semibold text-fg text-sm">{p.nome_cliente}</span>
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded shrink-0 ${st.cor}`}>
                    {st.label}
                  </span>
                </div>
                <p className="text-xs text-fg-subtle truncate">{p.descricao_peca?.replace(/<[^>]*>/g, '') ?? '—'}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-fg-subtle">
                    {new Date(p.createdAt).toLocaleDateString('pt-PT')}
                  </span>
                  {p.preco_estimado && (
                    <span className="text-xs font-bold text-brand">{p.preco_estimado} CVE</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Detalhe do pedido */}
        {pedidoAberto ? (
          <div className="flex-1 bg-surface border border-theme rounded-2xl p-6 h-fit space-y-6">

            {/* Cabeçalho */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-extrabold text-fg">{pedidoAberto.nome_cliente}</h2>
                <p className="text-sm text-fg-subtle">{pedidoAberto.email} · {pedidoAberto.telefone}</p>
              </div>
              <select
                value={pedidoAberto.status}
                onChange={e => mudarStatus(pedidoAberto.documentId, e.target.value)}
                className="text-sm px-3 py-1.5 rounded-lg border border-theme bg-elevated text-fg focus:outline-none focus:border-brand"
              >
                {Object.entries(STATUS_LABELS).map(([val, { label }]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            {/* Descrição */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-subtle mb-1">Descrição</p>
              <p className="text-sm text-fg leading-relaxed">
                {pedidoAberto.descricao_peca?.replace(/<[^>]*>/g, '') ?? '—'}
              </p>
              {(pedidoAberto.cor_desejado || pedidoAberto.praco_desejado) && (
                <div className="flex gap-4 mt-2 text-xs text-fg-muted">
                  {pedidoAberto.cor_desejado && <span>Cor: <strong>{pedidoAberto.cor_desejado}</strong></span>}
                  {pedidoAberto.praco_desejado && <span>Prazo: <strong>{pedidoAberto.praco_desejado}</strong></span>}
                </div>
              )}
            </div>

            {/* Foto do cliente */}
            {pedidoAberto.imagem_referencia?.url && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-fg-subtle mb-2">Foto de referência</p>
                <Image
                  src={`${STRAPI_URL}${pedidoAberto.imagem_referencia.url}`}
                  alt="Referência"
                  width={320}
                  height={240}
                  className="rounded-xl object-cover border border-theme"
                />
              </div>
            )}

            {/* Calcular preço */}
            <div className="border-t border-theme pt-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-subtle mb-3">
                Calcular preço
              </p>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Nome do ficheiro .3mf (ex: MinhaPeca.3mf)"
                  value={ficheiro3mf}
                  onChange={e => setFicheiro3mf(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-theme bg-elevated text-fg text-sm placeholder:text-fg-subtle focus:outline-none focus:border-brand"
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                    className="w-9 h-9 rounded-lg border border-theme bg-elevated text-fg font-bold hover:border-brand transition-colors"
                  >−</button>
                  <span className="w-8 text-center text-sm font-bold text-fg">{quantidade}</span>
                  <button
                    onClick={() => setQuantidade(quantidade + 1)}
                    className="w-9 h-9 rounded-lg border border-theme bg-elevated text-fg font-bold hover:border-brand transition-colors"
                  >+</button>
                </div>
              </div>

              <p className="text-xs text-fg-subtle mb-3">
                O ficheiro tem de estar em <code className="bg-elevated px-1 rounded">~/Downloads/BambuLab/</code>
              </p>

              <button
                onClick={calcular}
                disabled={aCalcular || !ficheiro3mf.trim()}
                className="w-full py-3 bg-brand text-white font-bold rounded-xl hover:bg-brand-light disabled:opacity-50 transition-colors"
              >
                {aCalcular ? '⏳ A fazer slice (~30s)...' : 'Calcular preço'}
              </button>

              {erroSlice && (
                <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                  {erroSlice}
                </div>
              )}

              {sliceResultado && (
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap gap-4 p-4 bg-elevated rounded-xl border border-theme text-sm">
                    <span className="text-fg-muted">⚖️ Peso: <strong className="text-fg">{sliceResultado.dados.peso}g</strong></span>
                    <span className="text-fg-muted">⏱️ Tempo: <strong className="text-fg">{sliceResultado.dados.tempo}</strong></span>
                    <span className="text-fg-muted">🎨 Cores: <strong className="text-fg">{sliceResultado.dados.cores}</strong></span>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-1 p-4 bg-elevated border border-theme rounded-xl">
                      <p className="text-xs text-fg-subtle mb-1">Preço unitário</p>
                      <p className="text-3xl font-extrabold text-fg">
                        {sliceResultado.orcamento.precoUnitario.recomendado}
                        <span className="text-sm font-normal text-fg-subtle ml-1">CVE</span>
                      </p>
                    </div>
                    {quantidade > 1 && (
                      <div className="flex-1 p-4 bg-brand/5 border-2 border-brand rounded-xl">
                        <p className="text-xs text-fg-subtle mb-1">Total ({quantidade}x)</p>
                        <p className="text-3xl font-extrabold text-brand">
                          {sliceResultado.orcamento.precoLote.recomendado}
                          <span className="text-sm font-normal text-brand/70 ml-1">CVE</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Atalho WhatsApp */}
                  <a
                    href={`https://wa.me/${pedidoAberto.telefone?.replace(/\D/g, '')}?text=${encodeURIComponent(
                      `Olá ${pedidoAberto.nome_cliente}! O orçamento para a sua peça é de *${sliceResultado.orcamento.precoUnitario.recomendado} CVE* por unidade. Para encomendar, responda a esta mensagem. — PrintCV`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm"
                  >
                    Enviar preço por WhatsApp
                  </a>
                </div>
              )}
            </div>

          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-fg-subtle text-sm">
            Selecciona um pedido para ver os detalhes.
          </div>
        )}
      </div>
    </div>
  )
}
