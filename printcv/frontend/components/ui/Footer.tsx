import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-theme pt-16 pb-8 bg-page">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-[13px] font-extrabold text-white font-mono shadow-[0_4px_12px_rgba(234,88,12,0.3)]">
              3D
            </div>
            <span className="font-mono font-bold text-base text-fg">
              PRINT<span className="text-brand">CV</span>
            </span>
          </div>
          <p className="text-sm text-fg-muted leading-relaxed max-w-[280px]">
            Impressão 3D profissional em Cabo Verde.
            Transformamos ideias em objetos reais, camada por camada.
          </p>
        </div>

        {/* Contacto */}
        <div className="text-sm text-fg-muted leading-[2.2]">
          <div className="font-mono text-[10px] tracking-[3px] text-brand uppercase mb-3">
            Contacto
          </div>
          <p>📍 Praia, Santiago — Cabo Verde</p>
          <p>📱 WhatsApp: +{process.env.NEXT_PUBLIC_WHATSAPP || '238XXXXXXX'}</p>
          <p>📧 geral@printcv.cv</p>
        </div>

        {/* Nav */}
        <div className="text-sm text-fg-muted leading-[2.2]">
          <div className="font-mono text-[10px] tracking-[3px] text-brand uppercase mb-3">
            Navegação
          </div>
          {['Loja', 'Galeria', 'Orçamento', 'Sobre'].map((label) => (
            <Link
              key={label}
              href={`/${label.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')}`}
              className="block hover:text-brand transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-12 pt-6 border-t border-theme font-mono text-[11px] text-fg-subtle tracking-wider">
        © 2026 PRINTCV — Impressão 3D em Cabo Verde 🇨🇻
      </div>
    </footer>
  )
}
