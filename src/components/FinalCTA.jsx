import React, { useState } from 'react';
import { BRAND_INFO } from '../lib/constants';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Truck, RefreshCw, Zap } from 'lucide-react';

export default function FinalCTA({ activeEdition }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [quantity, setQuantity] = useState(12);

  const handleOrder = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer id="shop" className="w-full bg-[#050505] text-[#F5F5F0] pt-32 pb-16 px-6 md:px-12 border-t border-[#1a1a1a] relative z-20">
      <div className="max-w-7xl mx-auto">
        {/* Massive Headline */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#B7FF00] tracking-widest uppercase block mb-4">
            // SECURE PROTEIN ALLOCATION
          </span>
          <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[0.9]">
            ORDER <span className="text-[#B7FF00]">{BRAND_INFO.name}</span> CRATE.
          </h2>
          <p className="font-mono text-xs md:text-sm text-[#858585] max-w-xl mx-auto mt-6">
            Pharmaceutical-grade 330ml flint glass bottles packaged in thermal-insulated unbleached structural crates. Zero plastic leaching.
          </p>
        </div>

        {/* Order Card */}
        <div className="max-w-2xl mx-auto bg-[#0a0a0a] border border-[#222] p-8 md:p-12 rounded-sm relative overflow-hidden mb-24 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Subtle Accent Glow */}
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[90px] opacity-20 pointer-events-none"
            style={{ backgroundColor: activeEdition.color }}
          ></div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#1f1f1f] gap-4">
            <div>
              <span className="font-mono text-[10px] text-[#858585] uppercase tracking-widest">
                SELECTED BIO-PROTEIN CATEGORY
              </span>
              <h3 className="font-display text-2xl text-[#F5F5F0]">{activeEdition.name}</h3>
              <p className="font-mono text-xs text-[#B7FF00]">{activeEdition.protein} • {activeEdition.flavor}</p>
            </div>
            <div className="text-left sm:text-right font-mono">
              <span className="text-2xl font-bold text-[#B7FF00]">
                ${quantity === 6 ? '28.00' : quantity === 12 ? '52.00' : '98.00'} USD
              </span>
              <span className="block text-[10px] text-[#858585]">{quantity}-BOTTLE ARCHIVAL CRATE</span>
            </div>
          </div>

          {/* Pack Quantity Selector */}
          <div className="my-6">
            <span className="font-mono text-xs text-[#858585] block mb-3">SELECT CRATE SIZE:</span>
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              {[6, 12, 24].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuantity(count)}
                  className={`py-3 rounded border text-center transition-all ${
                    quantity === count
                      ? 'bg-[#B7FF00] text-[#050505] border-[#B7FF00] font-bold shadow-[0_0_15px_rgba(183,255,0,0.2)]'
                      : 'bg-[#111] text-[#858585] border-[#222] hover:border-[#444] hover:text-[#F5F5F0]'
                  }`}
                >
                  {count} PACK
                </button>
              ))}
            </div>
          </div>

          {/* Order / Email Form */}
          {subscribed ? (
            <div className="p-6 bg-[#0f1c08] border border-[#B7FF00]/40 rounded text-center space-y-2">
              <CheckCircle2 size={24} className="text-[#B7FF00] mx-auto" />
              <p className="font-display text-xl text-[#F5F5F0]">ALLOCATION RESERVED</p>
              <p className="font-mono text-xs text-[#858585]">
                Order confirmation & cold-chain dispatch details sent to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrder} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ENTER DISPATCH EMAIL..."
                  className="grow bg-[#121212] border border-[#222] px-5 py-4 rounded font-mono text-xs text-[#F5F5F0] focus:outline-none focus:border-[#B7FF00] transition-colors"
                />
                <button
                  type="submit"
                  className="bg-[#B7FF00] hover:bg-[#a6e600] text-[#050505] font-display text-lg tracking-wider px-8 py-4 rounded transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2 shrink-0 font-bold"
                >
                  <span>ORDER CRATE</span>
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#1a1a1a] font-mono text-[10px] text-[#858585]">
            <div className="flex items-center space-x-2">
              <Truck size={14} className="text-[#B7FF00]" />
              <span>COLD CHAIN DISPATCH</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck size={14} className="text-[#B7FF00]" />
              <span>ZERO PLASTIC LEACHING</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap size={14} className="text-[#B7FF00]" />
              <span>30G PURE BIO-PEPTIDES</span>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Footer */}
        <div className="pt-12 border-t border-[#1f1f1f] flex flex-col md:flex-row items-center justify-between font-mono text-xs text-[#858585] space-y-6 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="font-display text-xl text-[#F5F5F0]">{BRAND_INFO.name}</span>
            <span>© 2026 // BIO-PROTEIN LABS</span>
          </div>

          <div className="flex items-center space-x-8 text-[11px]">
            <a href="#" className="hover:text-[#B7FF00] transition-colors">
              AMINO LAB AUDIT
            </a>
            <a href="#" className="hover:text-[#B7FF00] transition-colors">
              INFORMED-SPORT CERT
            </a>
            <a href="#" className="hover:text-[#B7FF00] transition-colors">
              RECYCLABILITY
            </a>
            <a href="#" className="hover:text-[#B7FF00] transition-colors">
              INSTAGRAM ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
