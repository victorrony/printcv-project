import { FadeSection } from '@/components/ui/FadeSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre — PrintCV',
  description: 'Conheça a PrintCV — impressão 3D profissional na Praia, Santiago, Cabo Verde.',
}

export default function SobrePage() {
  return (
    <section className="pt-[120px] pb-[80px] px-6 md:px-0 max-w-3xl mx-auto">
      <FadeSection>
        <p className="section-label">▸ Quem somos</p>
        <h1 className="section-title">Sobre a PrintCV</h1>
      </FadeSection>

      <div className="flex flex-col gap-12 mt-4">
        <FadeSection delay={0.1}>
          <p className="text-fg-muted text-[16px] leading-relaxed">
            A <strong className="text-fg">PrintCV</strong> é o primeiro serviço de impressão 3D
            profissional em Cabo Verde, baseado na Praia, Santiago. Usamos tecnologia de ponta —
            a impressora <strong className="text-accent">Bambu Lab</strong> — para produzir peças
            com qualidade e precisão, directamente para clientes locais.
          </p>
        </FadeSection>

        <FadeSection delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { label: 'Tecnologia', value: 'Bambu Lab', desc: 'Impressora profissional com câmara integrada' },
              { label: 'Materiais', value: 'PLA', desc: 'Materiais duráveis para cada necessidade' },
              { label: 'Localização', value: 'Praia, CV', desc: 'Produção local, entrega rápida no arquipélago' },
            ].map((item, i) => (
              <div key={i} className="info-card">
                <p className="font-mono text-[10px] tracking-[3px] text-accent uppercase mb-2">{item.label}</p>
                <p className="font-bold text-lg text-fg mb-1">{item.value}</p>
                <p className="text-xs text-fg-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </FadeSection>

        <FadeSection delay={0.3}>
          <div className="info-card">
            <p className="font-mono text-[10px] tracking-[3px] text-accent uppercase mb-4">O que fazemos</p>
            <ul className="flex flex-col gap-3 text-sm text-fg-muted leading-relaxed">
              {[
                'Peças decorativas e funcionais personalizadas',
                'Protótipos para empreendedores e estudantes',
                'Acessórios e peças de substituição',
                'Encomendas especiais com design próprio',
                'Timelapses do processo de impressão camada a camada',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-accent mt-0.5">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeSection>

        <FadeSection delay={0.4}>
          <div className="text-center">
            <p className="text-fg-muted text-sm mb-6">
              Tem um projecto em mente? Fale connosco.
            </p>
            <Link href="/orcamento" className="btn-primary">
              Pedir Orçamento Grátis
            </Link>
          </div>
        </FadeSection>
      </div>
    </section>
  )
}
