import React from 'react';
import { BRAND_INFO } from '../lib/constants';
import { ArrowDown, Flame, Sparkles } from 'lucide-react';

export default function HeroMeta({ scrollProgress = 0 }) {
  return (
    <>
      {/* Top Right Specs (Desktop) */}
      <div className="absolute top-28 right-6 md:right-12 z-30 pointer-events-none hidden sm:block text-right font-mono text-[10px] md:text-xs text-[#858585] tracking-widest leading-relaxed">
        <p className="text-[#F5F5F0] font-bold text-sm tracking-tight">{BRAND_INFO.macros}</p>
        <p className="text-[#858585]">{BRAND_INFO.volume} • {BRAND_INFO.ph}</p>
        <p className="text-[#B7FF00] font-semibold">{BRAND_INFO.batch}</p>
      </div>

      {/* Bottom Left Specs */}
      <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-30 pointer-events-none font-mono text-[10px] md:text-xs text-[#858585] tracking-widest leading-relaxed">
        <div className="flex items-center space-x-2 text-[#F5F5F0] font-bold mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B7FF00] animate-pulse"></span>
          <span className="text-[#B7FF00]">{BRAND_INFO.name}</span>
          <span>// {BRAND_INFO.edition}</span>
        </div>
        <p className="hidden xs:block text-[#F5F5F0]">{BRAND_INFO.formula}</p>
        <p className="text-[#858585] text-[10px] mt-0.5">{BRAND_INFO.temp}</p>
      </div>

      {/* Bottom Right Scroll Indicator */}
      <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 z-30 pointer-events-none font-mono text-[10px] md:text-xs tracking-widest flex items-center space-x-3">
        <div className="text-right">
          <span className="text-[#F5F5F0] block font-semibold">SCROLL TO ROTATE</span>
          <span className="text-[#858585] text-[9px]">
            {Math.round(scrollProgress * 100)}% COMPLETE
          </span>
        </div>
        <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center text-[#B7FF00] animate-bounce">
          <ArrowDown size={14} />
        </div>
      </div>
    </>
  );
}
