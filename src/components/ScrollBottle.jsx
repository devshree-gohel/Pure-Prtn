import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottleScene from './BottleScene';
import HeroTypography from './HeroTypography';
import HeroMeta from './HeroMeta';
import { EDITIONS } from '../lib/constants';
import { prefersReducedMotion } from '../lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollBottle({ pointer, setHoveringBottle, activeEdition = EDITIONS[0] }) {
  const containerRef = useRef(null);
  const heroContentRef = useRef(null);

  // Animated 3D parameters driven by GSAP timeline
  const [sceneState, setSceneState] = useState({
    rotationY: 0,
    scrollScale: 1,
    cameraZ: 5.2,
    cameraY: 0,
    progress: 0,
  });

  // Calculate mouse tilt target with damping
  const targetTiltX = pointer.normX * 0.18;
  const targetTiltY = pointer.normY * 0.12;

  useEffect(() => {
    if (!containerRef.current) return;

    // In reduced motion mode, provide a lightweight scroll without pinning
    if (prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      // Dynamic proxy object that GSAP interpolates
      const proxy = {
        rotationY: 0,
        scrollScale: 1,
        cameraZ: 5.2,
        cameraY: 0,
      };

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=2200',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setSceneState({
              rotationY: proxy.rotationY,
              scrollScale: proxy.scrollScale,
              cameraZ: proxy.cameraZ,
              cameraY: proxy.cameraY,
              progress: self.progress,
            });
          },
        },
      });

      // --- SECTION 1: 0% to 25% (Initial Rotation & Approach) ---
      masterTimeline.to(
        proxy,
        {
          rotationY: Math.PI * 0.45, // ~81 deg
          cameraZ: 4.6, // Zoom in closer
          scrollScale: 1.08,
          ease: 'power1.inOut',
          duration: 2.5,
        },
        0
      );

      // Letter individual parallax 0 -> 25%
      masterTimeline.to('.hero-char-l1-0', { x: -60, y: -20, rotate: -4, ease: 'none', duration: 2.5 }, 0);
      masterTimeline.to('.hero-char-l1-1', { x: -30, y: -10, rotate: -2, ease: 'none', duration: 2.5 }, 0);
      masterTimeline.to('.hero-char-l1-3', { x: 40, y: 15, rotate: 3, ease: 'none', duration: 2.5 }, 0);
      masterTimeline.to('.hero-char-l1-4', { x: 80, y: 25, rotate: 5, ease: 'none', duration: 2.5 }, 0);
      masterTimeline.to('.hero-char-l2-0', { x: -80, y: 20, rotate: -3, ease: 'none', duration: 2.5 }, 0);
      masterTimeline.to('.hero-char-l2-3', { x: 90, y: -20, rotate: 4, ease: 'none', duration: 2.5 }, 0);

      // --- SECTION 2: 25% to 60% (Midway Weave & Pass Through) ---
      masterTimeline.to(
        proxy,
        {
          rotationY: Math.PI * 1.3, // ~234 deg
          cameraZ: 4.8,
          cameraY: 0.1,
          scrollScale: 1.15,
          ease: 'power1.inOut',
          duration: 3.5,
        },
        2.5
      );

      // Wide separation of letters to let the bottle pass through the typography
      masterTimeline.to('.hero-char-l1-0', { x: -160, y: -40, rotate: -8, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l1-1', { x: -90, y: -25, rotate: -5, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l1-2', { y: -50, scale: 0.95, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l1-3', { x: 110, y: 30, rotate: 6, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l1-4', { x: 190, y: 50, rotate: 10, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l2-0', { x: -180, y: 40, rotate: -7, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l2-1', { x: -70, y: 20, rotate: -3, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l2-2', { x: 70, y: -30, rotate: 4, ease: 'none', duration: 3.5 }, 2.5);
      masterTimeline.to('.hero-char-l2-3', { x: 200, y: -45, rotate: 9, ease: 'none', duration: 3.5 }, 2.5);

      // --- SECTION 3: 60% to 100% (Full 360 Spin & Dispersal into Next Section) ---
      masterTimeline.to(
        proxy,
        {
          rotationY: Math.PI * 2.0, // 360 deg
          cameraZ: 5.4, // Pull back slightly
          cameraY: -0.2,
          scrollScale: 0.95,
          ease: 'power2.inOut',
          duration: 4.0,
        },
        6.0
      );

      masterTimeline.to('.hero-char', {
        opacity: 0.2,
        scale: 1.1,
        ease: 'power2.in',
        duration: 4.0,
      }, 6.0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100svh] min-h-[700px] overflow-hidden bg-[#050505] flex items-center justify-center"
    >
      <div ref={heroContentRef} className="relative w-full h-full flex items-center justify-center">
        {/* Layer 1: Background Typography (z-index 10) */}
        <HeroTypography layer="back" />

        {/* Layer 2: 3D Bottle Canvas (z-index 20) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="w-[85vw] h-[85vh] md:w-[60vw] md:h-[80vh] lg:w-[45vw] lg:h-[85vh] max-w-[680px]">
            <BottleScene
              rotationY={sceneState.rotationY}
              targetTiltX={targetTiltX}
              targetTiltY={targetTiltY}
              scrollScale={sceneState.scrollScale}
              cameraZ={sceneState.cameraZ}
              cameraY={sceneState.cameraY}
              activeEdition={activeEdition}
              onHover={setHoveringBottle}
            />
          </div>
        </div>

        {/* Layer 3: Foreground Clipped Typography (z-index 30) */}
        <HeroTypography layer="front" />

        {/* Layer 4: Micro-UI, Metadata & Scroll Trigger Stats (z-index 35) */}
        <HeroMeta scrollProgress={sceneState.progress} />
      </div>
    </section>
  );
}
