import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import BottleModel from './BottleModel';

export default function BottleScene({
  rotationY = 0,
  targetTiltX = 0,
  targetTiltY = 0,
  scrollScale = 1,
  cameraZ = 5.2,
  cameraY = 0,
  activeEdition,
  onHover,
}) {
  return (
    <div className="w-full h-full relative pointer-events-auto">
      <Canvas
        shadows
        camera={{ position: [0, cameraY, cameraZ], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMappingExposure: 1.1,
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Ambient Foundation */}
          <ambientLight intensity={0.45} />

          {/* Key Light (Dramatic high-angle overhead softbox) */}
          <directionalLight
            position={[4, 8, 5]}
            intensity={2.0}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0001}
          />

          {/* Fill Light (Soft cool light on left flank) */}
          <directionalLight position={[-5, 2, 3]} intensity={0.8} color="#b4d2ff" />

          {/* High-Impact Color Rim Light (Edge illumination matching category color) */}
          <spotLight
            position={[3.5, 4.5, -4]}
            intensity={4.2}
            color={activeEdition?.color || '#B7FF00'}
            angle={0.65}
            penumbra={0.85}
          />

          {/* Secondary Soft Rim on Left Behind */}
          <spotLight
            position={[-3.5, 3, -3.5]}
            intensity={1.8}
            color="#ffffff"
            angle={0.5}
            penumbra={0.9}
          />

          {/* Bottom Up-light for liquid bio-luminescence */}
          <pointLight
            position={[0, -2.2, 0.8]}
            intensity={1.5}
            color={activeEdition?.liquidColor || '#c8ff2e'}
            distance={4.5}
          />

          {/* High-contrast dark studio environment reflections */}
          <Environment preset="city" />

          {/* Ultra-Smooth 3D Bottle Model */}
          <BottleModel
            rotationY={rotationY}
            targetTiltX={targetTiltX}
            targetTiltY={targetTiltY}
            scrollScale={scrollScale}
            activeEdition={activeEdition}
            onHover={onHover}
          />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.9, 0]}
            opacity={0.7}
            scale={6.5}
            blur={2.8}
            far={4.5}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
