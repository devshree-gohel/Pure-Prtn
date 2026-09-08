import React, { useState } from 'react';
import { INGREDIENTS, MACRO_METRICS, BRAND_INFO } from '../lib/constants';
import { soundEngine } from '../lib/audioManager';
import { ChevronRight, Plus, Droplets, Flame, Activity, ShieldCheck } from 'lucide-react';

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'FORMULA & AMINO MATRIX', icon: <Droplets size={16} /> },
    { title: 'SENSORY PROFILE', icon: <Flame size={16} /> },
    { title: 'MACRONUTRIENT AUDIT', icon: <Activity size={16} /> },
  ];

  const handleTabChange = (idx) => {
    soundEngine.playClickTone();
    setActiveTab(idx);
  };

  return (
    <section id="specs" className="w-full bg-[#050505] text-[#F5F5F0] py-32 px-6 md:px-12 border-t border-[#1a1a1a] z-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#222]">
          <div>
            <span className="font-mono text-xs text-[#B7FF00] tracking-widest uppercase block mb-2">
              // BIO-PEPTIDE SPECIFICATIONS
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight">
              AMINO MATRIX & PURITY
            </h2>
          </div>
          <div className="mt-4 md:mt-0 font-mono text-xs text-[#858585]">
            <span>{BRAND_INFO.batch}</span> // <span>{BRAND_INFO.volume}</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 sm:space-x-4 mb-12 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab, idx) => (
            <button
              key={tab.title}
              onClick={() => handleTabChange(idx)}
              className={`flex items-center space-x-2 font-mono text-xs tracking-wider px-5 py-3 rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                activeTab === idx
                  ? 'bg-[#B7FF00] text-[#050505] border-[#B7FF00] font-bold shadow-[0_0_20px_rgba(183,255,0,0.3)]'
                  : 'bg-transparent text-[#858585] border-[#222] hover:border-[#444] hover:text-[#F5F5F0]'
              }`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content 0: Ingredients Table */}
        {activeTab === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 divide-y divide-[#1a1a1a]">
              {INGREDIENTS.map((item, index) => (
                <div
                  key={item.name}
                  className="py-6 flex items-start justify-between group hover:bg-[#0d0d0d] px-4 -mx-4 transition-colors rounded"
                >
                  <div className="space-y-1 pr-6">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-xs text-[#858585]">0{index + 1}</span>
                      <h4 className="font-display text-xl text-[#F5F5F0] group-hover:text-[#B7FF00] transition-colors">
                        {item.name}
                      </h4>
                    </div>
                    <p className="font-mono text-xs text-[#858585] pl-7">{item.desc}</p>
                  </div>
                  <span className="font-mono text-sm text-[#B7FF00] font-bold shrink-0">
                    {item.pct}
                  </span>
                </div>
              ))}
            </div>

            {/* Vessel Specifications Box */}
            <div className="lg:col-span-5 bg-[#0a0a0a] border border-[#222] p-8 flex flex-col justify-between rounded-sm">
              <div>
                <span className="font-mono text-[10px] text-[#B7FF00] tracking-widest uppercase block mb-4">
                  // BIO-VESSEL STANDARDS
                </span>
                <h3 className="font-display text-3xl mb-6 tracking-tight">PHARMACEUTICAL FLINT GLASS</h3>
                <ul className="space-y-4 font-mono text-xs text-[#858585]">
                  <li className="flex justify-between border-b border-[#1f1f1f] pb-2">
                    <span>MICRO-PLASTIC SHIELD</span>
                    <span className="text-[#B7FF00]">100% ZERO LEACHING</span>
                  </li>
                  <li className="flex justify-between border-b border-[#1f1f1f] pb-2">
                    <span>SEAL INTEGRITY</span>
                    <span className="text-[#F5F5F0]">HERMETIC ALUMINUM NITROGEN CAP</span>
                  </li>
                  <li className="flex justify-between border-b border-[#1f1f1f] pb-2">
                    <span>SHELF STABILITY</span>
                    <span className="text-[#F5F5F0]">12 MONTHS UNREFRIGERATED</span>
                  </li>
                  <li className="flex justify-between border-b border-[#1f1f1f] pb-2">
                    <span>NET BIO-AVAILABILITY</span>
                    <span className="text-[#B7FF00]">99.4% RAPID ABSORPTION</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1f1f1f] flex items-center justify-between font-mono text-[11px] text-[#858585]">
                <span>CERTIFIED INFORMED-SPORT</span>
                <span>NON-GMO // GLUTEN FREE</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content 1: Sensory Profile */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]">
              <span className="font-mono text-xs text-[#B7FF00]">01 // FIRST SIP</span>
              <h4 className="font-display text-2xl text-[#F5F5F0] mt-2 mb-3">GLACIAL WATER CRUSH</h4>
              <p className="font-mono text-xs text-[#858585] leading-relaxed">
                Zero milky film or heavy residue. Light and hyper-refreshing with crisp botanical acidity.
              </p>
            </div>
            <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]">
              <span className="font-mono text-xs text-[#B7FF00]">02 // MID-TEXTURE</span>
              <h4 className="font-display text-2xl text-[#F5F5F0] mt-2 mb-3">SILK PEPTIDE FLOW</h4>
              <p className="font-mono text-xs text-[#858585] leading-relaxed">
                Hydrolyzed peptides flow with ultra-low viscosity for effortless consumption even during high exertion.
              </p>
            </div>
            <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]">
              <span className="font-mono text-xs text-[#B7FF00]">03 // FINISH</span>
              <h4 className="font-display text-2xl text-[#F5F5F0] mt-2 mb-3">BONE DRY REFRESH</h4>
              <p className="font-mono text-xs text-[#858585] leading-relaxed">
                Finishes clean without artificial aftertaste, sweetened only with real cold-pressed organic essences.
              </p>
            </div>
            <div className="p-8 border border-[#1f1f1f] bg-[#0a0a0a]">
              <span className="font-mono text-xs text-[#B7FF00]">04 // DIGESTION</span>
              <h4 className="font-display text-2xl text-[#F5F5F0] mt-2 mb-3">INSTANT CLEARANCE</h4>
              <p className="font-mono text-xs text-[#858585] leading-relaxed">
                Leaves your stomach light and energised, entering bloodstream within 15 minutes post-consumption.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 2: Macronutrient Metrics */}
        {activeTab === 2 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 font-mono">
            {MACRO_METRICS.map((metric) => (
              <div key={metric.label} className="p-8 border border-[#1f1f1f] bg-[#0a0a0a] flex flex-col justify-between">
                <span className="text-xs text-[#858585]">{metric.label}</span>
                <span className="font-display text-5xl md:text-6xl text-[#B7FF00] my-4">{metric.value}</span>
                <span className="text-[10px] text-[#858585]">{metric.detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
