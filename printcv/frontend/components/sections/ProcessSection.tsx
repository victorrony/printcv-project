import { Lightbulb, Box, Printer, PackageCheck } from 'lucide-react'
import { FadeSection } from '@/components/ui/FadeSection'

const STEPS = [
  { num: '01', title: 'Ideia', desc: 'Recebemos o teu conceito ou escolhes do catálogo', Icone: Lightbulb },
  { num: '02', title: 'Modelagem', desc: 'Criamos ou adaptamos o modelo 3D digital', Icone: Box },
  { num: '03', title: 'Impressão', desc: 'Produzimos com precisão na Bambu Lab A1', Icone: Printer },
  { num: '04', title: 'Entrega', desc: 'Acabamento final e entrega na Praia', Icone: PackageCheck },
]

export function ProcessSection() {
  return (
    <section id="processo" className="py-[120px] px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-elevated dot-grid opacity-60" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] rounded-full bg-brand/[0.07] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[350px] h-[350px] rounded-full bg-teal/[0.05] blur-[100px] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
      <FadeSection>
        <p className="section-label">▸ Como funciona</p>
        <h2 className="section-title">Da ideia à peça final</h2>
      </FadeSection>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((step, i) => (
          <FadeSection key={step.num} delay={i * 0.15}>
            <div className="p-8 rounded-2xl card-hover relative overflow-hidden group">
              {/* Linha de acento na cor da marca */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand to-brand-light" />

              <span aria-hidden="true" className="block font-mono text-4xl font-bold text-brand/[0.2] mb-4">
                {step.num}
              </span>
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-accent">
                <step.Icone size={22} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold mb-2 text-fg">{step.title}</h3>
              <p className="text-sm text-fg-muted leading-relaxed">{step.desc}</p>
            </div>
          </FadeSection>
        ))}
      </div>
      </div>
    </section>
  )
}
