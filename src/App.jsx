import React, { useState } from 'react';
import Navigation from './components/Navigation';
import ScrollBottle from './components/ScrollBottle';
import IntroSection from './components/IntroSection';
import AINeuralArchitect from './components/AINeuralArchitect';
import ProductDetails from './components/ProductDetails';
import SecondaryShowcase from './components/SecondaryShowcase';
import FinalCTA from './components/FinalCTA';
import CustomCursor from './components/CustomCursor';
import GrainOverlay from './components/GrainOverlay';
import { useLenis } from './hooks/useLenis';
import { usePointerPosition } from './hooks/usePointerPosition';
import { EDITIONS } from './lib/constants';

export default function App() {
  // Initialize Lenis smooth scroll synchronized with GSAP
  useLenis();

  // Pointer position tracker for 3D tilt & custom cursor
  const { pointer, setHoveringBottle, rawPosRef } = usePointerPosition();

  // Active product edition state (swappable across the app)
  const [activeEdition, setActiveEdition] = useState(EDITIONS[0]);

  return (
    <div className={`relative min-h-screen bg-[#050505] text-[#F5F5F0] overflow-x-hidden ${!pointer.isTouch ? 'has-custom-cursor' : ''}`}>
      {/* 1. Desktop Custom Interactive Cursor with smooth precision */}
      <CustomCursor pointer={pointer} rawPosRef={rawPosRef} />

      {/* 2. Fixed Film Grain Overlay */}
      <GrainOverlay />

      {/* 3. Top Navigation */}
      <Navigation />

      {/* 4. Main Content Flow */}
      <main className="relative w-full">
        {/* HERO SECTION: Pinned 3D Hero with Layered Typography & ScrollTrigger */}
        <ScrollBottle
          pointer={pointer}
          setHoveringBottle={setHoveringBottle}
          activeEdition={activeEdition}
        />

        {/* STORY SECTION: Manifesto, 30G Voltage, Kinetic Ticker */}
        <IntroSection />

        {/* AI & ML SECTION: Neural Peptide Formulator & Bio-Optimizer */}
        <AINeuralArchitect
          activeEdition={activeEdition}
          setActiveEdition={setActiveEdition}
        />

        {/* PRODUCT DETAILS: Ingredients, Botanical Matrix & Sensory Profile */}
        <ProductDetails />

        {/* SECONDARY 3D SECTION: Interactive Angle Showcase & Edition Selector */}
        <SecondaryShowcase
          activeEdition={activeEdition}
          setActiveEdition={setActiveEdition}
          pointer={pointer}
          setHoveringBottle={setHoveringBottle}
        />

        {/* FINAL CTA & FOOTER: Order Crate, Guarantees & Social Links */}
        <FinalCTA activeEdition={activeEdition} />
      </main>
    </div>
  );
}
