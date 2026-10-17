'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, useGLTF, OrbitControls, Preload } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function ImagePlane({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.08
    }
  })

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

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.6) * 0.08
    }
  })

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
}

export function HeroCanvas3DInner({ imageUrl, modelUrl }: Props) {
  return (
    <Canvas
      frameloop="always"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.5], fov: 40 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
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
