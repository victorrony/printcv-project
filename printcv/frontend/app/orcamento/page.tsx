import { FadeSection } from '@/components/ui/FadeSection'
import { QuoteForm } from '@/components/QuoteForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedir Orçamento — PrintCV',
  description: 'Peça um orçamento gratuito para impressão 3D personalizada em Cabo Verde.',
}

export default function OrcamentoPage() {
  return (
    <section className="pt-[120px] pb-[80px] px-6">
      <div className="max-w-[580px] mx-auto">
        <FadeSection>
          <p className="section-label">▸ Encomenda personalizada</p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-fg">
            A sua peça, à sua medida
          </h1>
          <p className="text-fg-muted text-[15px] leading-relaxed mb-12">
            Descreva o que precisa. Respondemos em até 24 horas com estimativa de preço
            e prazo de produção.
          </p>
        </FadeSection>

        <FadeSection delay={0.2}>
          <QuoteForm />
        </FadeSection>
      </div>
    </section>
  )
}
