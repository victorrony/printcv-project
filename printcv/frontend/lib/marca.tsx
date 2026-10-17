// Ícone da marca ("3D" sobre laranja) para o favicon e o apple-icon.
// O "3D" é desenhado com traços, sem fonte: fica igual em qualquer sistema.
// Cores = brand.DEFAULT e brand.light do tailwind.config.ts.
export const COR_INICIO = '#EA580C'
export const COR_FIM = '#F97316'

export function IconeMarca({ raio }: { raio: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: raio,
        background: `linear-gradient(135deg, ${COR_INICIO}, ${COR_FIM})`,
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width="100%"
        height="100%"
        fill="none"
        stroke="#fff"
        strokeWidth={3.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* 3 */}
        <path d="M6.2 10.4C7.2 9.4 8.5 8.8 10.1 8.8C12.4 8.8 13.9 10.1 13.9 12.2C13.9 14.4 12.3 15.8 9.6 15.8C12.6 15.8 14.3 17.3 14.3 19.7C14.3 22 12.6 23.2 10.1 23.2C8.4 23.2 7.1 22.6 6.1 21.5" />
        {/* D */}
        <path d="M18 8.8V23.2H20.2C24 23.2 26 20.6 26 16C26 11.4 24 8.8 20.2 8.8Z" />
      </svg>
    </div>
  )
}
