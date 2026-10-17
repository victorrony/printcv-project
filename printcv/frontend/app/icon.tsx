import { ImageResponse } from 'next/og'
import { IconeMarca } from '@/lib/marca'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(<IconeMarca raio="7px" />, size)
}
