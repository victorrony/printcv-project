export const SITE = {
  /** Só dígitos, com indicativo — formato exigido pelo wa.me */
  whatsapp: '2389519228',
  email: 'geral@printcv.cv',
  endereco: 'Praia, Santiago — Cabo Verde',
}

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
