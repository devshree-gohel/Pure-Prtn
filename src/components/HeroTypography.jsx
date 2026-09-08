import React from 'react';

/**
 * HeroTypography renders the massive acid-green protein typography ("PURE PRTN") in dual optical layers
 * with individual character spans for GSAP ScrollTrigger matrix transformations.
 */
export default function HeroTypography({ layer = 'back' }) {
  const line1 = ['P', 'U', 'R', 'E'];
  const line2 = ['P', 'R', 'T', 'N'];

  const isBack = layer === 'back';

  return (
    <div
      aria-hidden={!isBack}
      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden ${
        isBack ? 'z-10 text-[#B7FF00]' : 'z-30 text-[#B7FF00]'
      }`}
    >
      {/* Hidden semantic heading for SEO & screen readers */}
      {isBack && <h1 className="sr-only">PURE PRTN — 30G Hydrolyzed Bio-Protein</h1>}

      <div
        className={`w-full flex flex-col items-center justify-center font-display hero-title-clamp tracking-tighter uppercase transition-opacity ${
          isBack ? 'opacity-100' : 'opacity-90'
        }`}
      >
        {/* Line 1: P U R E */}
        <div className="flex items-center justify-center w-full leading-[0.78] overflow-visible">
          {line1.map((char, index) => {
            // Foreground layer selectively shows characters or clips them to let 3D bottle weave through
            const showInFront = isBack || index === 0 || index === 3;
            return (
              <span
                key={`line1-${index}-${layer}`}
                data-char={`l1-${index}`}
                className={`hero-char hero-char-l1-${index} inline-block transform-gpu will-change-transform ${
                  !showInFront ? 'opacity-0' : ''
                } ${
                  !isBack && index === 0 ? 'clip-left-letters' : ''
                } ${
                  !isBack && index === 3 ? 'clip-right-letters' : ''
                }`}
                style={{
                  textShadow: isBack
                    ? '0 0 80px rgba(183, 255, 0, 0.18)'
                    : '0 0 40px rgba(183, 255, 0, 0.3)',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Line 2: P R T N */}
        <div className="flex items-center justify-center w-full leading-[0.78] overflow-visible -mt-2 md:-mt-6">
          {line2.map((char, index) => {
            const showInFront = isBack || index === 2 || index === 3;
            return (
              <span
                key={`line2-${index}-${layer}`}
                data-char={`l2-${index}`}
                className={`hero-char hero-char-l2-${index} inline-block transform-gpu will-change-transform ${
                  !showInFront ? 'opacity-0' : ''
                }`}
                style={{
                  textShadow: isBack
                    ? '0 0 80px rgba(183, 255, 0, 0.18)'
                    : '0 0 40px rgba(183, 255, 0, 0.3)',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
