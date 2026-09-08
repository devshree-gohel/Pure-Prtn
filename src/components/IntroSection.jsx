import React from 'react';
import { BRAND_INFO } from '../lib/constants';
import { Zap, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export default function IntroSection() {
  return (
    <section id="story" className="relative w-full bg-[#050505] text-[#F5F5F0] py-32 md:py-48 px-6 md:px-12 border-t border-[#1a1a1a] z-20">
      <div className="max-w-7xl mx-auto">
        {/* Editorial Subtitle Badge */}
        <div className="flex items-center space-x-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#B7FF00] animate-ping"></span>
          <span className="font-mono text-xs text-[#B7FF00] tracking-widest uppercase">
            // MANIFESTO — RE-ENGINEERED BIO-PROTEIN
          </span>
        </div>

        {/* Massive Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-8">
            <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight leading-[0.95]">
              ZERO CHALK. <span className="text-[#B7FF00] italic font-serif">PURE</span> BIO-PEPTIDES.
            </h2>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-8 font-mono text-xs md:text-sm text-[#858585] leading-relaxed">
            <p className="text-[#F5F5F0]">
              Traditional ready-to-drink protein is plagued with artificial gums, thickeners, and dairy curdling. We threw away the old formula to build <span className="text-[#B7FF00] font-bold">{BRAND_INFO.name}</span>: crystal-clear, cold-filtered hydrolyzed protein peptides with the mouthfeel of pure glacier water.
            </p>
            <p>
              30 Grams of pure protein. 0 Grams of sugar. Delivered in an ultra-clean 330ml recyclable flint glass vessel for absolute purity and taste integrity.
            </p>
            <div className="pt-4 border-t border-[#222] flex items-center justify-between text-[#B7FF00] font-bold">
              <span>0% GUMS / THICKENERS</span>
              <span>100% HYDROLYZED</span>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]/60 backdrop-blur rounded-sm hover:border-[#B7FF00]/50 transition-colors group">
            <div className="w-10 h-10 rounded bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00] mb-6 group-hover:bg-[#B7FF00] group-hover:text-[#050505] transition-colors">
              <Zap size={20} />
            </div>
            <h3 className="font-display text-2xl text-[#F5F5F0] mb-2 tracking-tight">30G FAST-ACTING PEPTIDES</h3>
            <p className="font-mono text-xs text-[#858585] leading-relaxed">
              Enzymatically pre-cleaved into di- and tri-peptides for immediate 15-minute gastric absorption and rapid muscle protein synthesis.
            </p>
          </div>

          <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]/60 backdrop-blur rounded-sm hover:border-[#B7FF00]/50 transition-colors group">
            <div className="w-10 h-10 rounded bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00] mb-6 group-hover:bg-[#B7FF00] group-hover:text-[#050505] transition-colors">
              <Sparkles size={20} />
            </div>
            <h3 className="font-display text-2xl text-[#F5F5F0] mb-2 tracking-tight">ZERO BLOAT // 0G SUGAR</h3>
            <p className="font-mono text-xs text-[#858585] leading-relaxed">
              Completely lactose-free, gluten-free, and keto compliant. Clean digestive kinetics without heaviness or GI distress.
            </p>
          </div>

          <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]/60 backdrop-blur rounded-sm hover:border-[#B7FF00]/50 transition-colors group">
            <div className="w-10 h-10 rounded bg-[#B7FF00]/10 flex items-center justify-center text-[#B7FF00] mb-6 group-hover:bg-[#B7FF00] group-hover:text-[#050505] transition-colors">
              <Activity size={20} />
            </div>
            <h3 className="font-display text-2xl text-[#F5F5F0] mb-2 tracking-tight">6.8G BRANCHED AMINOS</h3>
            <p className="font-mono text-xs text-[#858585] leading-relaxed">
              Loaded with 3.2g bioactive L-Leucine to trigger maximal anabolic signaling and accelerate cellular tissue recovery.
            </p>
          </div>
        </div>

        {/* Kinetic Marquee Ticker */}
        <div className="w-full overflow-hidden mt-32 py-6 border-y border-[#1c1c1c] text-[#B7FF00] select-none">
          <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite] space-x-12 font-display text-4xl md:text-5xl tracking-tight uppercase">
            <span>30G BIO-PROTEIN</span>
            <span className="text-[#858585]">•</span>
            <span>0G SUGAR</span>
            <span className="text-[#858585]">•</span>
            <span>HYDRO WHEY ISOLATE</span>
            <span className="text-[#858585]">•</span>
            <span>RAW PLANT PEPTIDES</span>
            <span className="text-[#858585]">•</span>
            <span>CLEAR COLLAGEN</span>
            <span className="text-[#858585]">•</span>
            <span>ZERO GUMS</span>
            <span className="text-[#858585]">•</span>
            <span>PURE PRTN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
