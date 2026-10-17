// Partilhado entre o formulário (validação no browser) e app/api/upload (token).
// Sem SVG de propósito: pode levar scripts e o Blob serve-o como público.
export const TIPOS_IMAGEM = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/heic',
  'image/heif',
  'image/avif',
]

export const TAMANHO_MAX_IMAGEM = 5 * 1024 * 1024
