import Link from 'next/link'
import { HeroImageCanvas } from '@/components/ui/HeroImageCanvas'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[80px] bg-page">

      {/* Orb laranja top-left */}
      <div className="absolute top-[-80px] left-[-80px] w-[500px] h-[500px] rounded-full bg-brand/[0.12] blur-[120px] pointer-events-none" />
      {/* Orb teal bottom-right */}
      <div className="absolute bottom-[-60px] right-[-60px] w-[400px] h-[400px] rounded-full bg-teal/[0.08] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-0 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20">

        {/* Lado esquerdo — texto */}

        <div>
          {/* Badge */}
          <div className="animate-fade-up [animation-delay:0.1s] opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/30 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse-glow" />
            {/* Mais escuro no tema claro: o fundo aqui é o brilho laranja do hero */}
            <span className="font-mono text-[11px] tracking-[4px] text-brand-800 dark:text-accent uppercase">
              Impressão 3D em Cabo Verde
            </span>
          </div>

          {/* Título */}
          <h1 className="animate-fade-up [animation-delay:0.3s] opacity-0 font-display font-bold leading-[1.05] tracking-tight mb-6">
            <span className="block text-[clamp(38px,6vw,72px)] text-fg">
              Do digital
            </span>
            <span className="block text-[clamp(38px,6vw,72px)] gradient-text">
              ao real.
            </span>
          </h1>

          {/* Divisor */}
          <div className="animate-fade-up [animation-delay:0.5s] opacity-0 flex items-center gap-4 mb-8">
            <div className="h-[3px] w-14 bg-brand rounded-full" />
            <div className="h-[3px] w-8 bg-brand/30 rounded-full" />
          </div>

          {/* Subtítulo */}
          <p className="animate-fade-up [animation-delay:0.6s] opacity-0 text-[17px] text-fg-muted max-w-[480px] leading-relaxed mb-10 font-body">
            Criamos peças únicas com precisão milimétrica usando tecnologia
            <span className="text-accent font-semibold"> Bambu Lab</span>.
            Protótipos, arte, acessórios — camada por camada, na ilha de Santiago.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up [animation-delay:0.8s] opacity-0 flex gap-4 flex-wrap">
            <Link href="/loja" className="btn-primary text-base px-10 py-[14px]">
              Ver Produtos
            </Link>
            <Link href="/orcamento" className="btn-secondary text-base px-10 py-[14px]">
              Pedir Orçamento
            </Link>
          </div>

          {/* Stats */}
          <div className="animate-fade-up [animation-delay:1s] opacity-0 flex gap-8 mt-12 pt-8 border-t border-theme">
            {[
              { value: '3+', label: 'Materiais' },
              { value: '24h', label: 'Resposta' },
              { value: '100%', label: 'Local' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl text-accent">{stat.value}</div>
                <div className="text-xs text-fg-subtle font-mono uppercase tracking-widest mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Lado direito — mascote 3D (a foto aparece enquanto o modelo carrega) */}
        <div className="animate-fade-up [animation-delay:0.5s] opacity-0 flex items-center justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-[-30px] rounded-full border border-brand/20 animate-spin-slower" />
            <div className="absolute inset-[-60px] rounded-full border border-brand/10 animate-spin-slow" />
            <HeroImageCanvas
              modelUrl="/modelos/mascote.glb"
              posterUrl="/produtos/mascote-tubarao-cabo-verdiano.png"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-up [animation-delay:1.4s] opacity-0">
        <span className="font-mono text-[10px] tracking-[4px] text-fg-subtle uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-brand/60 to-transparent" />
      </div>
    </section>
  )
}
