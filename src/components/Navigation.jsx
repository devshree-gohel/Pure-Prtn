import React, { useState } from 'react';
import { NAV_LINKS, BRAND_INFO } from '../lib/constants';
import { soundEngine } from '../lib/audioManager';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

export default function Navigation() {
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    if (!soundActive) {
      soundEngine.startAmbient();
      setSoundActive(true);
    } else {
      soundEngine.stopAmbient();
      setSoundActive(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 flex items-center justify-between mix-blend-difference pointer-events-auto">
      {/* Brand Identity */}
      <div className="flex items-center space-x-4">
        <a
          href="#"
          onClick={() => soundActive && soundEngine.playClickTone()}
          className="flex items-baseline space-x-2 group"
        >
          <span className="font-display text-2xl md:text-3xl tracking-tighter text-[#F5F5F0] group-hover:text-[#B7FF00] transition-colors">
            {BRAND_INFO.name}
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-[#858585] uppercase border border-[#333] px-2 py-0.5 rounded">
            {BRAND_INFO.edition}
          </span>
        </a>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center space-x-10 font-mono text-xs tracking-widest uppercase">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => soundActive && soundEngine.playClickTone()}
            className="text-[#F5F5F0] hover:text-[#B7FF00] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#B7FF00] hover:after:w-full after:transition-all after:duration-300"
          >
            {link.label}
          </a>
        ))}

        {/* Ambient Sound Toggle Button */}
        <button
          onClick={toggleSound}
          aria-label={soundActive ? 'Mute ambient sound' : 'Enable ambient sound'}
          className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-[#333] hover:border-[#B7FF00] text-[#858585] hover:text-[#B7FF00] transition-all bg-[#0a0a0a]/50 backdrop-blur cursor-pointer"
        >
          {soundActive ? (
            <>
              <Volume2 size={14} className="text-[#B7FF00] animate-pulse" />
              <span className="text-[10px] text-[#B7FF00] font-bold">SOUND ON</span>
              <span className="flex space-x-0.5 items-end h-2.5 ml-1">
                <span className="w-0.5 bg-[#B7FF00] animate-[pulse_0.6s_ease-in-out_infinite] h-2"></span>
                <span className="w-0.5 bg-[#B7FF00] animate-[pulse_0.8s_ease-in-out_infinite] h-3"></span>
                <span className="w-0.5 bg-[#B7FF00] animate-[pulse_0.5s_ease-in-out_infinite] h-1.5"></span>
              </span>
            </>
          ) : (
            <>
              <VolumeX size={14} />
              <span className="text-[10px]">SOUND OFF</span>
            </>
          )}
        </button>
      </nav>

      {/* Mobile Menu Trigger & Sound */}
      <div className="flex md:hidden items-center space-x-3">
        <button
          onClick={toggleSound}
          aria-label="Toggle Sound"
          className="p-2 border border-[#333] rounded-full text-[#B7FF00]"
        >
          {soundActive ? <Volume2 size={16} /> : <VolumeX size={16} className="text-[#858585]" />}
        </button>
        <a
          href="#shop"
          className="font-mono text-xs text-[#B7FF00] border border-[#B7FF00]/40 px-3 py-1 rounded-full"
        >
          ORDER
        </a>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#F5F5F0] p-1"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Modal */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#050505]/95 backdrop-blur-md z-50 flex flex-col justify-center px-10 md:hidden pointer-events-auto">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-[#F5F5F0] p-2"
          >
            <X size={28} />
          </button>
          <div className="flex flex-col space-y-8 font-display text-4xl">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  if (soundActive) soundEngine.playClickTone();
                  setMobileMenuOpen(false);
                }}
                className="text-[#F5F5F0] hover:text-[#B7FF00] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-[#222] font-mono text-xs text-[#858585] flex justify-between">
            <span>{BRAND_INFO.batch}</span>
            <span>{BRAND_INFO.temp}</span>
          </div>
        </div>
      )}
    </header>
  );
}
