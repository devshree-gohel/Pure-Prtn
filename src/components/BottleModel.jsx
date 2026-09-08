import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EDITIONS } from '../lib/constants';

/**
 * 2048x2048 Ultra-High-Resolution Canvas Label with Neural AI Bio-Matrix Graphics
 */
function createUltraLabelTexture(edition, aiMetrics) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 2048;
  const ctx = canvas.getContext('2d');

  // Background - Deep Obsidian Matte with Micro-Grid
  ctx.fillStyle = '#060606';
  ctx.fillRect(0, 0, 2048, 2048);

  // Subtle neural circuitry grid background
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 2;
  for (let x = 0; x < 2048; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 2048);
    ctx.stroke();
  }
  for (let y = 0; y < 2048; y += 64) {
    ctx.beginPath();
    ctx.moveTo(y, 0);
    ctx.lineTo(y, 2048);
    ctx.stroke();
  }

  // Accent vertical chromatic bar
  const grad = ctx.createLinearGradient(0, 0, 0, 2048);
  grad.addColorStop(0, edition?.color || '#B7FF00');
  grad.addColorStop(0.5, edition?.accentColor || '#84CC16');
  grad.addColorStop(1, edition?.color || '#B7FF00');
  ctx.fillStyle = grad;
  ctx.fillRect(80, 0, 50, 2048);

  // Large vertical brand typography: PRTN™
  ctx.save();
  ctx.translate(280, 1850);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = '#F5F5F0';
  ctx.font = 'bold 240px Anton, sans-serif';
  ctx.fillText('PRTN™', 0, 0);
  ctx.restore();

  // Category and active variant title
  ctx.save();
  ctx.translate(620, 1850);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = edition?.color || '#B7FF00';
  ctx.font = '900 88px "Space Grotesk", sans-serif';
  ctx.fillText(edition?.name || '01 // HYDRO WHEY ISOLATE', 0, 0);
  ctx.restore();

  // Protein Metrics Block
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 64px "Space Grotesk", sans-serif';
  ctx.fillText(edition?.protein ? edition.protein.toUpperCase() : '30G BIO-PROTEIN', 940, 360);

  ctx.fillStyle = '#A0A0A0';
  ctx.font = '600 42px "Space Grotesk", monospace';
  ctx.fillText('0G SUGAR • 6.8G BCAA • 130 KCAL', 940, 440);
  ctx.fillText('MICRO-FILTERED HYDROLYZED PEPTIDES', 940, 510);
  ctx.fillText('BIO-AVAILABLE LEUCINE: 3.2G', 940, 580);
  ctx.fillText('AI NEURAL SEQ // LOT: #882-PRTN-2026', 940, 650);
  ctx.fillText('RECYCLABLE FLINT GLASS • 330ML', 940, 720);

  // AI Tensor Inference Badge
  ctx.fillStyle = edition?.color || '#B7FF00';
  ctx.fillRect(940, 790, 480, 50);
  ctx.fillStyle = '#060606';
  ctx.font = 'bold 28px monospace';
  ctx.fillText('ML OPTIMIZED BIOAVAILABILITY: 99.4%', 955, 825);

  // Barcode graphics with precision lines
  ctx.fillStyle = '#F5F5F0';
  for (let i = 0; i < 48; i++) {
    const w = (i % 4 === 0 ? 16 : i % 2 === 0 ? 8 : 4);
    ctx.fillRect(940 + i * 20, 920, w, 220);
  }
  ctx.font = '36px monospace';
  ctx.fillText('7  8 4 9 2 0   3 0 4 9 2  1', 940, 1200);

  // Geometric Bio-Neural Circular Radar Seal
  ctx.strokeStyle = edition?.color || '#B7FF00';
  ctx.lineWidth = 8;
  ctx.strokeRect(940, 1340, 380, 380);

  ctx.beginPath();
  ctx.arc(1130, 1530, 130, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(1130, 1530, 70, 0, Math.PI * 2);
  ctx.stroke();

  // Crosshairs & AI Node points
  ctx.beginPath();
  ctx.moveTo(1130, 1430);
  ctx.lineTo(1130, 1630);
  ctx.moveTo(1030, 1530);
  ctx.lineTo(1230, 1530);
  ctx.stroke();

  ctx.fillStyle = edition?.color || '#B7FF00';
  ctx.font = 'bold 30px monospace';
  ctx.fillText('AI SEQ 4.2', 960, 1780);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 16;
  return texture;
}

export default function BottleModel({
  rotationY = 0,
  targetTiltX = 0,
  targetTiltY = 0,
  scrollScale = 1,
  activeEdition = EDITIONS[0],
  onHover,
}) {
  const groupRef = useRef();
  const liquidRef = useRef();
  const bubblesRef = useRef();

  // Generate dynamic 2048x2048 label texture
  const labelTexture = useMemo(() => {
    return createUltraLabelTexture(activeEdition);
  }, [activeEdition]);

  // Micro-effervescence bubble particles inside liquid
  const [bubblePositions, bubbleSpeeds] = useMemo(() => {
    const count = 45;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.55;
      positions[i * 3] = Math.cos(angle) * radius; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.8; // y
      positions[i * 3 + 2] = Math.sin(angle) * radius; // z
      speeds[i] = 0.3 + Math.random() * 0.6;
    }
    return [positions, speeds];
  }, []);

  // Smooth frame updates with delta damping (60/120/144fps uniform smoothness)
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();
    const idleFloatY = Math.sin(time * 1.4) * 0.035;
    const idleWobbleZ = Math.cos(time * 1.1) * 0.012;

    const dampFactor = 1 - Math.exp(-10 * delta);

    // Smooth rotation & pointer tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      rotationY + time * 0.1,
      dampFactor
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetTiltY + idleWobbleZ,
      dampFactor
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -targetTiltX + idleWobbleZ,
      dampFactor
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      idleFloatY,
      dampFactor
    );

    // Liquid subtle internal shimmer
    if (liquidRef.current) {
      liquidRef.current.rotation.y += delta * 0.15;
    }

    // Animate rising micro-bubbles
    if (bubblesRef.current) {
      const pos = bubblesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < 45; i++) {
        pos[i * 3 + 1] += bubbleSpeeds[i] * delta;
        if (pos[i * 3 + 1] > 0.6) {
          pos[i * 3 + 1] = -1.3;
        }
      }
      bubblesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={[scrollScale, scrollScale, scrollScale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover?.(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover?.(false);
      }}
    >
      {/* 1. Main Flint Glass Cylinder Body (Silky 80 segments) */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.78, 0.78, 2.2, 80, 1, false]} />
        <meshPhysicalMaterial
          roughness={0.03}
          transmission={activeEdition.transmission || 0.94}
          thickness={1.1}
          ior={1.54}
          color={activeEdition.glassTint || '#ffffff'}
          attenuationColor={activeEdition.liquidColor || '#c8ff2e'}
          attenuationDistance={1.4}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          reflectivity={0.96}
          transparent
        />
      </mesh>

      {/* 2. Glass Base Bevel Fillet */}
      <mesh position={[0, -1.48, 0]} castShadow>
        <cylinderGeometry args={[0.78, 0.72, 0.08, 80]} />
        <meshPhysicalMaterial
          roughness={0.04}
          transmission={0.92}
          thickness={1.4}
          ior={1.54}
          color={activeEdition.glassTint || '#ffffff'}
          clearcoat={1.0}
          transparent
        />
      </mesh>

      {/* 3. Smooth S-Curve Shoulder */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.78, 0.52, 80, 1, false]} />
        <meshPhysicalMaterial
          roughness={0.03}
          transmission={activeEdition.transmission || 0.94}
          thickness={1.1}
          ior={1.54}
          color={activeEdition.glassTint || '#ffffff'}
          attenuationColor={activeEdition.liquidColor || '#c8ff2e'}
          attenuationDistance={1.4}
          clearcoat={1.0}
          clearcoatRoughness={0.02}
          reflectivity={0.96}
          transparent
        />
      </mesh>

      {/* 4. Glass Bottle Neck */}
      <mesh position={[0, 1.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.32, 0.55, 80, 1, false]} />
        <meshPhysicalMaterial
          roughness={0.03}
          transmission={0.95}
          thickness={0.9}
          ior={1.54}
          color={activeEdition.glassTint || '#ffffff'}
          clearcoat={1.0}
          transparent
        />
      </mesh>

      {/* 5. Glass Lip / Retention Ring */}
      <mesh position={[0, 1.74, 0]} castShadow>
        <torusGeometry args={[0.3, 0.045, 32, 80]} />
        <meshPhysicalMaterial
          roughness={0.05}
          transmission={0.92}
          thickness={0.6}
          ior={1.54}
          clearcoat={1.0}
          transparent
        />
      </mesh>

      {/* 6. Inner Bio-Fluid Core */}
      <mesh ref={liquidRef} position={[0, -0.45, 0]}>
        <cylinderGeometry args={[0.735, 0.735, 2.05, 64]} />
        <meshPhysicalMaterial
          color={activeEdition.liquidColor || '#B7FF00'}
          emissive={activeEdition.liquidColor || '#B7FF00'}
          emissiveIntensity={0.3}
          roughness={0.15}
          transmission={0.7}
          thickness={1.8}
          ior={1.34}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 7. Micro-Effervescence Bio-Bubbles */}
      <points ref={bubblesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={45}
            array={bubblePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#ffffff"
          transparent
          opacity={0.75}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 8. Cylindrical Ultra-Sharp Label Wrap */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.785, 0.785, 1.62, 80, 1, true, -Math.PI * 0.65, Math.PI * 1.3]} />
        <meshStandardMaterial
          map={labelTexture}
          roughness={0.25}
          metalness={0.25}
          side={THREE.DoubleSide}
          transparent
          alphaTest={0.05}
        />
      </mesh>

      {/* 9. Knurled Aluminum Aerospace Cap */}
      <group position={[0, 1.86, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.335, 0.335, 0.36, 80]} />
          <meshStandardMaterial
            color={activeEdition.capColor || '#111111'}
            roughness={0.25}
            metalness={0.9}
          />
        </mesh>
        {/* Cap Knurled Grip Micro-Ribs */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.24, 48, 1, true]} />
          <meshStandardMaterial
            color="#2a2a2a"
            roughness={0.4}
            metalness={0.8}
            wireframe
          />
        </mesh>
        {/* Cap Top Chamfer Ring */}
        <mesh position={[0, 0.18, 0]}>
          <torusGeometry args={[0.31, 0.025, 24, 64]} />
          <meshStandardMaterial
            color="#3a3a3a"
            roughness={0.2}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* 10. Ground Contact Shadow Base */}
      <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 4.5]} />
        <shadowMaterial opacity={0.45} />
      </mesh>
    </group>
  );
}
