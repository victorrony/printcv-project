'use client'

export function IsoGridBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `
          linear-gradient(30deg,  var(--iso-line) 1px, transparent 1px),
          linear-gradient(150deg, var(--iso-line) 1px, transparent 1px),
          linear-gradient(90deg,  var(--iso-line) 1px, transparent 1px)
        `,
        backgroundSize: '40px 70px, 40px 70px, 40px 70px',
      }}
    />
  )
}
