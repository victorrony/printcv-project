'use client'

export function Printer3D() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto select-none" aria-hidden="true">
      {/* Glow de fundo */}
      <div className="absolute inset-0 rounded-full bg-brand/20 blur-[60px] scale-75 animate-pulse-glow" />

      <svg
        viewBox="0 0 400 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto relative z-10"
      >
        {/* ── Base da Impressora ── */}
        <g className="animate-fade-up [animation-delay:0.2s] opacity-0">
          {/* Plataforma base */}
          <ellipse cx="200" cy="340" rx="130" ry="24" fill="#292524" stroke="#EA580C" strokeWidth="1.5" strokeOpacity="0.6" />
          <rect x="80" y="280" width="240" height="62" rx="8" fill="#1C1917" stroke="#292524" strokeWidth="1.5" />
          {/* Detalhe frente da base */}
          <rect x="88" y="288" width="224" height="46" rx="6" fill="#292524" />
          {/* Ecrã LCD simulado */}
          <rect x="100" y="296" width="80" height="30" rx="4" fill="#0C0A09" stroke="#EA580C" strokeWidth="1" strokeOpacity="0.5" />
          <rect x="104" y="300" width="72" height="22" rx="3" fill="#0D1117" />
          {/* Texto do ecrã */}
          <rect x="108" y="305" width="40" height="3" rx="1.5" fill="#EA580C" opacity="0.9" />
          <rect x="108" y="312" width="28" height="2" rx="1" fill="#F97316" opacity="0.6" />
          {/* Botões */}
          <circle cx="210" cy="311" r="8" fill="#292524" stroke="#EA580C" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="230" cy="311" r="8" fill="#292524" stroke="#4B5563" strokeWidth="1" strokeOpacity="0.4" />
          <circle cx="250" cy="311" r="8" fill="#292524" stroke="#4B5563" strokeWidth="1" strokeOpacity="0.4" />
          {/* Luz de status */}
          <circle cx="288" cy="311" r="5" fill="#10B981">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ── Frame vertical da impressora ── */}
        <g className="animate-fade-up [animation-delay:0.4s] opacity-0">
          {/* Coluna esquerda */}
          <rect x="88" y="80" width="14" height="204" rx="4" fill="#292524" stroke="#374151" strokeWidth="1" />
          {/* Coluna direita */}
          <rect x="298" y="80" width="14" height="204" rx="4" fill="#292524" stroke="#374151" strokeWidth="1" />
          {/* Barra horizontal topo */}
          <rect x="84" y="74" width="232" height="16" rx="4" fill="#1C1917" stroke="#374151" strokeWidth="1" />
          {/* Rail guia no topo */}
          <rect x="96" y="78" width="208" height="8" rx="2" fill="#292524" />
        </g>

        {/* ── Cabeça de impressão (extrusor) ── */}
        <g className="animate-float-mid" style={{ transformOrigin: '200px 140px' }}>
          {/* Carruagem */}
          <rect x="162" y="112" width="76" height="40" rx="6" fill="#1C1917" stroke="#EA580C" strokeWidth="1.5" strokeOpacity="0.7" />
          {/* Motor */}
          <rect x="168" y="118" width="30" height="28" rx="4" fill="#292524" stroke="#4B5563" strokeWidth="1" />
          {/* Extrusor bico */}
          <rect x="194" y="152" width="12" height="20" rx="2" fill="#374151" />
          <polygon points="194,172 206,172 202,184 198,184" fill="#EA580C" />
          {/* LED extrusor */}
          <circle cx="204" cy="125" r="4" fill="#F97316">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
          </circle>
          {/* Filamento */}
          <line x1="200" y1="74" x2="200" y2="112" stroke="#F97316" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
        </g>

        {/* ── Mesa de impressão ── */}
        <g className="animate-fade-up [animation-delay:0.6s] opacity-0">
          <rect x="110" y="222" width="180" height="10" rx="3" fill="#292524" stroke="#374151" strokeWidth="1" />
          {/* Grelha da mesa */}
          {[0,1,2,3,4].map(i => (
            <line key={`h${i}`} x1="114" y1={228 + i * 1} x2="286" y2={228 + i * 1}
              stroke="#EA580C" strokeWidth="0.5" strokeOpacity="0.2" />
          ))}
          {[0,1,2,3,4,5,6].map(i => (
            <line key={`v${i}`} x1={114 + i * 29} y1="222" x2={114 + i * 29} y2="232"
              stroke="#EA580C" strokeWidth="0.5" strokeOpacity="0.2" />
          ))}
        </g>

        {/* ── Objecto a ser impresso (camadas) ── */}
        <g style={{ transformOrigin: '200px 220px' }}>
          {/* Camada 1 - base */}
          <rect x="158" y="216" width="84" height="7" rx="2" fill="#EA580C" opacity="0.9">
            <animate attributeName="opacity" values="0;0.9" dur="0.5s" begin="1s" fill="freeze" />
          </rect>
          {/* Camada 2 */}
          <rect x="162" y="209" width="76" height="7" rx="2" fill="#F97316" opacity="0.85">
            <animate attributeName="opacity" values="0;0.85" dur="0.5s" begin="1.5s" fill="freeze" />
          </rect>
          {/* Camada 3 */}
          <rect x="166" y="202" width="68" height="7" rx="2" fill="#FB923C" opacity="0.8">
            <animate attributeName="opacity" values="0;0.8" dur="0.5s" begin="2s" fill="freeze" />
          </rect>
          {/* Camada 4 */}
          <rect x="170" y="195" width="60" height="7" rx="2" fill="#FED7AA" opacity="0.7">
            <animate attributeName="opacity" values="0;0.7" dur="0.5s" begin="2.5s" fill="freeze" />
          </rect>
          {/* Camada 5 - topo (parcial, sendo impressa) */}
          <rect x="174" y="188" width="52" height="7" rx="2" fill="#FFF7ED" opacity="0.5">
            <animate attributeName="width" values="0;52" dur="1s" begin="3s" fill="freeze" />
            <animate attributeName="opacity" values="0;0.5" dur="0.3s" begin="3s" fill="freeze" />
          </rect>
        </g>

        {/* ── Rolo de filamento ── */}
        <g className="animate-spin-slower" style={{ transformOrigin: '342px 100px' }}>
          <circle cx="342" cy="100" r="32" fill="#1C1917" stroke="#374151" strokeWidth="2" />
          <circle cx="342" cy="100" r="22" fill="#0C0A09" stroke="#EA580C" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="342" cy="100" r="8" fill="#292524" />
          {/* Espiras do filamento */}
          {[0,60,120,180,240,300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180
            const x1 = 342 + 22 * Math.cos(rad)
            const y1 = 100 + 22 * Math.sin(rad)
            const x2 = 342 + 30 * Math.cos(rad)
            const y2 = 100 + 30 * Math.sin(rad)
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#F97316" strokeWidth="2" strokeOpacity="0.5" />
          })}
        </g>

        {/* ── Partículas flutuantes ── */}
        {[
          { cx: 60, cy: 160, r: 3, delay: '0s', color: '#EA580C' },
          { cx: 350, cy: 200, r: 2, delay: '1s', color: '#F97316' },
          { cx: 40, cy: 260, r: 2, delay: '2s', color: '#10B981' },
          { cx: 370, cy: 270, r: 3, delay: '0.5s', color: '#FB923C' },
          { cx: 75, cy: 320, r: 2, delay: '1.5s', color: '#EA580C' },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill={p.color}>
            <animate attributeName="cy" values={`${p.cy};${p.cy - 15};${p.cy}`}
              dur="3s" begin={p.delay} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.9;0.4"
              dur="3s" begin={p.delay} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
    </div>
  )
}
