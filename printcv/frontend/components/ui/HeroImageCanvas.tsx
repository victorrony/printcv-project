'use client'

import dynamic from 'next/dynamic'

const HeroCanvas3D = dynamic(
  () => import('./HeroCanvas3DInner').then((m) => m.HeroCanvas3DInner),
  { ssr: false }
)

interface HeroImageCanvasProps {
  imageUrl?: string
  modelUrl?: string
}

export function HeroImageCanvas({ imageUrl, modelUrl }: HeroImageCanvasProps) {
  return (
    <div className="w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[720px] lg:h-[720px]">
      <HeroCanvas3D imageUrl={imageUrl} modelUrl={modelUrl} />
    </div>
  )
}
