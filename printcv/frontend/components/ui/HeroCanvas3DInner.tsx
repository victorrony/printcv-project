'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, useGLTF, OrbitControls, Preload } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

// Só monta depois de o Suspense resolver (recurso carregado) e avisa no
// primeiro frame, já com os shaders compilados e algo desenhado
function AoCarregar({ onLoaded }: { onLoaded?: () => void }) {
  const avisado = useRef(false)
  useFrame(() => {
    if (avisado.current) return
    avisado.current = true
    onLoaded?.()
  })
  return null
}

// Flutuação vertical com tempo próprio: o clock do R3F volta a zero quando o
// frameloop é retomado, o que faria o modelo saltar ao regressar ao ecrã
function useFlutuar(ref: React.RefObject<THREE.Object3D>) {
  const t = useRef(0)
  useFrame((_, delta) => {
    t.current += Math.min(delta, 0.1)
    if (ref.current) ref.current.position.y = Math.sin(t.current * 0.6) * 0.08
  })
}

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl)
  const meshRef = useRef<THREE.Mesh>(null)

  useFlutuar(meshRef)

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.2, 2.2]} />
      <meshStandardMaterial map={texture} transparent alphaTest={0.01} side={THREE.DoubleSide} />
    </mesh>
  )
}

function GLBModel({ modelUrl }: { modelUrl: string }) {
  const { scene } = useGLTF(modelUrl)
  const ref = useRef<THREE.Group>(null)

  useFlutuar(ref)

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={1.8}
      position={[0, -1, 0]}
    />
  )
}

interface Props {
  imageUrl?: string
  modelUrl?: string
  onLoaded?: () => void
  /** false com o hero fora do ecrã: pára de desenhar e poupa GPU/bateria */
  ativo?: boolean
}

export function HeroCanvas3DInner({ imageUrl, modelUrl, onLoaded, ativo = true }: Props) {
  return (
    <Canvas
      frameloop={ativo ? 'always' : 'never'}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      gl={{ alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, 5]} intensity={0.6} color="#FF6B35" />

        {modelUrl ? (
          <GLBModel modelUrl={modelUrl} />
        ) : imageUrl ? (
          <ImagePlane imageUrl={imageUrl} />
        ) : null}
        <AoCarregar onLoaded={onLoaded} />

        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.5}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
