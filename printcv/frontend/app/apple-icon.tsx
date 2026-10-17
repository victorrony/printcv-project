import { ImageResponse } from 'next/og'
import { IconeMarca } from '@/lib/marca'

// Ícone do ecrã inicial no iPhone: quadrado (o iOS arredonda os cantos)
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(<IconeMarca raio="0" />, size)
}
