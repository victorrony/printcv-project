export const SITE = {
  /** Só dígitos, com indicativo — formato exigido pelo wa.me */
  whatsapp: '2389519228',
  /** Por mostrar até o domínio existir (printcv.cv ainda não resolve). Pôr o endereço aqui para voltar a aparecer. */
  email: '' as string,
  endereco: 'Praia, Santiago — Cabo Verde',
  mensagemWhatsApp: 'Olá! Gostaria de saber mais sobre os serviços da PrintCV.',
}

export function linkWhatsApp(mensagem: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensagem)}`
}
