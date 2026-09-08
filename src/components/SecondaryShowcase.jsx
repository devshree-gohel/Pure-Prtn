import React, { useState } from 'react';
import BottleScene from './BottleScene';
import { EDITIONS } from '../lib/constants';
import { soundEngine } from '../lib/audioManager';
import { RotateCw, Check, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function SecondaryShowcase({
  activeEdition,
  setActiveEdition,
  pointer,
  setHoveringBottle,
}) {
  const [rotationAngle, setRotationAngle] = useState(0);

  const rotateMore = () => {
    soundEngine.playClickTone();
    setRotationAngle((prev) => prev + Math.PI / 2);
  };

  const handleSelectEdition = (edition) => {
    soundEngine.playClickTone();
    setActiveEdition(edition);
  };

  return (
    <section id="showcase" className="w-full bg-[#050505] text-[#F5F5F0] py-32 px-6 md:px-12 border-t border-[#1a1a1a] relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#222]">
          <div>
            <span className="font-mono text-xs text-[#B7FF00] tracking-widest uppercase block mb-2">
              // 3 BIO-PROTEIN CATEGORIES
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
              FORMULATION SPECTRUM
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#858585] flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse"></span>
            <span>REAL-TIME BIO-VESSEL 3D VIEW</span>
          </div>
        </div>

        {/* Grid: 3D Preview on Left, 3 Category Selectors on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* 3D Showcase Canvas */}
          <div className="lg:col-span-7 h-[520px] md:h-[620px] bg-gradient-to-b from-[#0a0a0a] to-[#040404] border border-[#1f1f1f] rounded-sm relative overflow-hidden flex items-center justify-center group">
            {/* Top Category Badge */}
            <div className="absolute top-6 left-6 z-30 font-mono text-xs tracking-wider flex items-center space-x-2 bg-[#050505]/80 backdrop-blur px-3 py-1.5 rounded border border-[#222]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeEdition.color }}
              ></span>
              <span className="text-[#F5F5F0] font-bold">{activeEdition.tag}</span>
            </div>

            {/* Quick Rotate Button */}
            <button
              onClick={rotateMore}
              className="absolute bottom-6 right-6 z-30 font-mono text-xs tracking-wider bg-[#111] hover:bg-[#B7FF00] hover:text-[#050505] text-[#F5F5F0] px-4 py-2 rounded-full border border-[#333] transition-all flex items-center space-x-2 shadow-lg cursor-pointer"
            >
              <RotateCw size={14} />
              <span>SPIN +90°</span>
            </button>

            {/* 3D Scene */}
            <div className="w-full h-full">
              <BottleScene
                rotationY={rotationAngle}
                targetTiltX={pointer.normX * 0.15}
                targetTiltY={pointer.normY * 0.1}
                scrollScale={1.12}
                cameraZ={4.8}
                cameraY={0}
                activeEdition={activeEdition}
                onHover={setHoveringBottle}
              />
            </div>
          </div>

          {/* 3 Category Information & Selection Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs text-[#858585] tracking-widest uppercase">
                {activeEdition.category} // {activeEdition.tag}
              </span>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight text-[#F5F5F0]">
                {activeEdition.name}
              </h3>
              <p className="font-mono text-xs text-[#B7FF00] uppercase tracking-wider font-semibold">
                {activeEdition.flavor}
              </p>
              <p className="font-mono text-xs text-[#858585] leading-relaxed pt-2">
                {activeEdition.profile}
              </p>
            </div>

            {/* 3 Protein Category Cards */}
            <div className="space-y-3 pt-2">
              {EDITIONS.map((edition) => {
                const isSelected = activeEdition.id === edition.id;
                return (
                  <div
                    key={edition.id}
                    onClick={() => handleSelectEdition(edition)}
                    className={`p-5 rounded border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#B7FF00] bg-[#0d0d0d] shadow-[0_0_25px_rgba(183,255,0,0.15)]'
                        : 'border-[#1f1f1f] bg-[#080808] hover:border-[#333]'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                        style={{ backgroundColor: edition.color }}
                      ></div>
                      <div>
                        <span className="font-mono text-[9px] text-[#858585] block uppercase">
                          {edition.category}
                        </span>
                        <h4 className="font-display text-lg text-[#F5F5F0] tracking-tight">
                          {edition.shortName}
                        </h4>
                        <p className="font-mono text-[11px] text-[#B7FF00] font-medium">
                          {edition.protein} • {edition.bcaa}
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex items-center space-x-3">
                      {isSelected ? (
                        <div className="w-7 h-7 rounded-full bg-[#B7FF00] flex items-center justify-center text-[#050505]">
                          <Check size={16} />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-full border border-[#333] flex items-center justify-center text-[#858585]">
                          <ArrowRight size={14} />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Formulation Tasting & Botanical Notes */}
            <div className="pt-6 border-t border-[#1a1a1a]">
              <span className="font-mono text-[10px] text-[#858585] tracking-widest uppercase block mb-3">
                KEY INGREDIENT & FLAVOR NOTES:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeEdition.notes.map((note) => (
                  <span
                    key={note}
                    className="font-mono text-xs px-3 py-1 rounded bg-[#121212] border border-[#222] text-[#F5F5F0]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
