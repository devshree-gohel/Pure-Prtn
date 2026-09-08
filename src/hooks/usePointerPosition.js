import { useState, useEffect, useRef } from 'react';

export function usePointerPosition() {
  const [pointer, setPointer] = useState({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
    normX: 0,
    normY: 0,
    isHoveringBottle: false,
    isHoveringInteractive: false,
    isMouseDown: false,
    isTouch: false,
    isVisible: false,
  });

  const rawPosRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });

  useEffect(() => {
    let rafId;

    const handleTouch = () => {
      setPointer((prev) => ({ ...prev, isTouch: true }));
    };

    const handleMouseMove = (e) => {
      rawPosRef.current.x = e.clientX;
      rawPosRef.current.y = e.clientY;

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = (e.clientY / window.innerHeight) * 2 - 1;

      // Check if hovering over clickable elements
      const target = e.target;
      const isInteractive = Boolean(
        target && (
          target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.dataset.interactive
        )
      );

      setPointer((prev) => ({
        ...prev,
        x: e.clientX,
        y: e.clientY,
        normX,
        normY,
        isHoveringInteractive: isInteractive,
        isVisible: true,
      }));
    };

    const handleMouseDown = () => {
      setPointer((prev) => ({ ...prev, isMouseDown: true }));
    };

    const handleMouseUp = () => {
      setPointer((prev) => ({ ...prev, isMouseDown: false }));
    };

    const handleMouseLeave = () => {
      setPointer((prev) => ({ ...prev, isVisible: false }));
    };

    window.addEventListener('touchstart', handleTouch, { passive: true, once: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const setHoveringBottle = (isHovering) => {
    setPointer((prev) => ({ ...prev, isHoveringBottle: isHovering }));
  };

  return { pointer, setHoveringBottle, rawPosRef };
}
