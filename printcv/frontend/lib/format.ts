export function formatPreco(preco: number): string {
  return new Intl.NumberFormat('pt-CV', {
    style: 'decimal',
    minimumFractionDigits: 0,
  }).format(preco) + '$'
}
