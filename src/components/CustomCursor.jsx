import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor({ pointer, rawPosRef }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  const ringQuickToX = useRef(null);
  const ringQuickToY = useRef(null);
  const dotQuickToX = useRef(null);
  const dotQuickToY = useRef(null);

  // Initialize GSAP quickTo setters ONCE on mount
  useEffect(() => {
    if (!ringRef.current || !dotRef.current) return;

    ringQuickToX.current = gsap.quickTo(ringRef.current, 'x', {
      duration: 0.28,
      ease: 'power3.out',
    });
    ringQuickToY.current = gsap.quickTo(ringRef.current, 'y', {
      duration: 0.28,
      ease: 'power3.out',
    });

    dotQuickToX.current = gsap.quickTo(dotRef.current, 'x', {
      duration: 0.04,
      ease: 'power1.out',
    });
    dotQuickToY.current = gsap.quickTo(dotRef.current, 'y', {
      duration: 0.04,
      ease: 'power1.out',
    });
  }, []);

  // Update position on pointer changes
  useEffect(() => {
    if (pointer.isTouch || !pointer.isVisible) return;

    if (ringQuickToX.current && ringQuickToY.current) {
      ringQuickToX.current(pointer.x);
      ringQuickToY.current(pointer.y);
    }
    if (dotQuickToX.current && dotQuickToY.current) {
      dotQuickToX.current(pointer.x);
      dotQuickToY.current(pointer.y);
    }
  }, [pointer.x, pointer.y, pointer.isTouch, pointer.isVisible]);

  if (pointer.isTouch) return null;

  // Determine ring sizing and styles based on state
  const isBottleHover = pointer.isHoveringBottle;
  const isInteractive = pointer.isHoveringInteractive;
  const isPressed = pointer.isMouseDown;

  let ringSize = 34;
  let ringBg = 'transparent';
  let ringBorder = '1px solid rgba(183, 255, 0, 0.4)';
  let ringScale = isPressed ? 0.75 : 1;

  if (isBottleHover) {
    ringSize = 84;
    ringBg = '#B7FF00';
    ringBorder = 'none';
  } else if (isInteractive) {
    ringSize = 52;
    ringBg = 'rgba(183, 255, 0, 0.12)';
    ringBorder = '1px solid rgba(183, 255, 0, 0.8)';
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none transition-opacity duration-300 ${
        pointer.isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Precision Center Dot (Instant feedback & exact click point) */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          width: isBottleHover ? '0px' : isPressed ? '6px' : '4px',
          height: isBottleHover ? '0px' : isPressed ? '6px' : '4px',
          backgroundColor: '#B7FF00',
          boxShadow: '0 0 8px rgba(183, 255, 0, 0.9)',
          transition: 'width 0.15s ease, height 0.15s ease',
        }}
      />

      {/* 2. Fluid Trailing Ring / Interactive Bubble */}
      <div
        ref={ringRef}
        className="pointer-events-none absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform flex items-center justify-center transition-[width,height,background-color,border,transform] duration-200 ease-out"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          backgroundColor: ringBg,
          border: ringBorder,
          transform: `scale(${ringScale})`,
          boxShadow: isBottleHover
            ? '0 0 35px rgba(183, 255, 0, 0.45)'
            : isInteractive
            ? '0 0 15px rgba(183, 255, 0, 0.2)'
            : 'none',
        }}
      >
        {isBottleHover && (
          <span
            ref={textRef}
            className="text-[#050505] text-[10px] font-black tracking-widest font-mono uppercase select-none pointer-events-none"
          >
            VIEW
          </span>
        )}
      </div>
    </div>
  );
}
