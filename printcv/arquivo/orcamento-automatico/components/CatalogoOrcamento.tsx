'use client'

import { useState } from 'react'

const CATEGORIAS: Record<string, { label: string; cor: string }> = {
  chaveiro: { label: 'Chaveiro', cor: 'bg-blue-500' },
  decoracao: { label: 'Decoração', cor: 'bg-green-600' },
  suporte:   { label: 'Suporte',   cor: 'bg-brand' },
  acessorio: { label: 'Acessório', cor: 'bg-purple-600' },
}

const CATALOGO = [
  { id: 'caboverde-copa',  nome: 'Chaveiro Cabo Verde na Copa',    categoria: 'chaveiro',  coresPadrao: 3 },
  { id: 'fifa-wc-keychain', nome: 'Chaveiro FIFA World Cup 2026',  categoria: 'chaveiro',  coresPadrao: 3 },
  { id: 'llavero-caboverde', nome: 'Chaveiro Cabo Verde (bandeira)', categoria: 'chaveiro', coresPadrao: 4 },
  { id: 'jersey-ronaldo',  nome: 'Chaveiro Camisola Ronaldo',       categoria: 'chaveiro',  coresPadrao: 2 },
  { id: 'sporting-coaster', nome: 'Base de Copo Sporting',          categoria: 'decoracao', coresPadrao: 2 },
  { id: 'laptop-stand',    nome: 'Suporte de Laptop',               categoria: 'suporte',   coresPadrao: 1 },
  { id: 'cable-support',   nome: 'Suporte de Cabo A1',              categoria: 'acessorio', coresPadrao: 1 },
]

type Produto = typeof CATALOGO[0]

interface OrcamentoResult {
  produto: string
  dados: { peso: number; tempo: string; tempoHoras: number; cores: number }
  orcamento: {
    precoUnitario: { minimo: number; recomendado: number; premium: number }
    precoLote: { minimo: number; recomendado: number; premium: number }
    quantidade: number
  }
}

export default function CatalogoOrcamento() {
  const [selecionado, setSelecionado] = useState<Produto | null>(null)
  const [quantidade, setQuantidade] = useState(1)
  const [resultado, setResultado] = useState<OrcamentoResult | null>(null)
  const [aCarregar, setACarregar] = useState(false)
  const [erro, setErro] = useState<string | null>(null)

  async function calcular() {
    if (!selecionado) return
    setACarregar(true)
    setErro(null)
    setResultado(null)

    try {
      const res = await fetch('/api/orcamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produtoId: selecionado.id, quantidade }),
      })
      const dados = await res.json()
      if (!res.ok) throw new Error(dados.erro || 'Erro ao calcular orçamento')
      setResultado(dados)
    } catch (e) {
      setErro((e as Error).message)
    } finally {
      setACarregar(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Grelha de produtos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {CATALOGO.map((p) => {
          const cat = CATEGORIAS[p.categoria] ?? CATEGORIAS.acessorio
          const ativo = selecionado?.id === p.id
          return (
            <button
              key={p.id}
              onClick={() => { setSelecionado(p); setResultado(null); setErro(null) }}
              className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                ativo
                  ? 'border-brand bg-brand/5 shadow-md'
                  : 'border-theme bg-surface hover:border-brand/40 hover:bg-elevated'
              }`}
            >
              <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${cat.cor}`}>
                {cat.label}
              </span>
              <span className="text-sm font-semibold text-fg leading-snug">{p.nome}</span>
              <span className="text-xs text-fg-subtle">
                {p.coresPadrao} {p.coresPadrao === 1 ? 'cor' : 'cores'}
              </span>
            </button>
          )
        })}
      </div>

      {/* Painel de orçamento */}
      {selecionado && (
        <div className="border border-theme rounded-2xl p-6 bg-elevated">
          {/* Topo: produto + quantidade */}
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-subtle mb-1">
                Produto seleccionado
              </p>
              <p className="text-xl font-bold text-fg">{selecionado.nome}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-fg-subtle mb-1">
                Quantidade
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                  className="w-9 h-9 rounded-lg border border-theme bg-surface text-lg font-bold text-fg hover:border-brand transition-colors"
                >
                  −
                </button>
                <span className="text-xl font-bold text-fg min-w-[2rem] text-center">{quantidade}</span>
                <button
                  onClick={() => setQuantidade(quantidade + 1)}
                  className="w-9 h-9 rounded-lg border border-theme bg-surface text-lg font-bold text-fg hover:border-brand transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Botão calcular */}
          <button
            onClick={calcular}
            disabled={aCarregar}
            className="w-full py-4 bg-brand hover:bg-brand-light disabled:opacity-60 text-white font-bold rounded-xl transition-colors text-base"
          >
            {aCarregar ? '⏳ A calcular (pode demorar ~30s)...' : 'Calcular preço'}
          </button>

          {/* Erro */}
          {erro && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
              <strong>Não foi possível calcular.</strong>
              <p className="mt-1 text-xs opacity-80">{erro}</p>
            </div>
          )}

          {/* Resultado */}
          {resultado && (
            <div className="mt-6">
              {/* Dados técnicos */}
              <div className="flex flex-wrap gap-4 p-4 bg-surface rounded-xl border border-theme text-sm text-fg-muted mb-4">
                <span>⚖️ Peso: <strong className="text-fg">{resultado.dados.peso}g</strong></span>
                <span>⏱️ Tempo: <strong className="text-fg">{resultado.dados.tempo}</strong></span>
                <span>🎨 Cores: <strong className="text-fg">{resultado.dados.cores}</strong></span>
              </div>

              {/* Preços */}
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[140px] p-4 bg-surface border border-theme rounded-xl">
                  <p className="text-xs text-fg-subtle mb-1">Preço unitário</p>
                  <p className="text-3xl font-extrabold text-fg">
                    {resultado.orcamento.precoUnitario.recomendado}
                    <span className="text-sm font-normal text-fg-subtle ml-1">CVE</span>
                  </p>
                </div>
                {quantidade > 1 && (
                  <div className="flex-1 min-w-[140px] p-4 bg-brand/5 border-2 border-brand rounded-xl">
                    <p className="text-xs text-fg-subtle mb-1">Total ({quantidade} unidades)</p>
                    <p className="text-3xl font-extrabold text-brand">
                      {resultado.orcamento.precoLote.recomendado}
                      <span className="text-sm font-normal text-brand/70 ml-1">CVE</span>
                    </p>
                  </div>
                )}
              </div>

              <p className="mt-4 text-xs text-fg-subtle text-center">
                Preço estimado. Para encomendar, contacta-nos pelo WhatsApp ou Instagram.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
