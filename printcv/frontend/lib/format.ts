export function formatPreco(preco: number): string {
  return new Intl.NumberFormat('pt-CV', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(preco) + '$'
}

const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

/** '2026-05-31' → '31 mai 2026' (sem depender do fuso do servidor) */
export function formatData(iso: string): string {
  const [ano, mes, dia] = iso.split('-').map(Number)
  return `${dia} ${MESES[mes - 1]} ${ano}`
}
