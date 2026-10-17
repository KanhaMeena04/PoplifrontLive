import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) return;

    // Set initial position off-screen
    gsap.set([cursor, cursorDot], { x: -100, y: -100, opacity: 0 });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      // Animate the main cursor circle with a slight delay/trail effect
      gsap.to(cursor, {
        x: x - cursor.offsetWidth / 2,
        y: y - cursor.offsetHeight / 2,
        duration: 0.6,
        ease: 'power3.out',
        opacity: 1
      });

      // Animate the dot instantly
      gsap.to(cursorDot, {
        x: x - cursorDot.offsetWidth / 2,
        y: y - cursorDot.offsetHeight / 2,
        duration: 0.1,
        ease: 'power3.out',
        opacity: 1
      });
    };

    const addHoverEffect = () => {
      gsap.to(cursor, {
        scale: 1.5,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        duration: 0.3
      });
    };

    const removeHoverEffect = () => {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'rgba(255, 255, 255, 0.15)', // Subtle white border
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add magnetic/hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, [data-cursor="pointer"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', addHoverEffect);
      el.addEventListener('mouseleave', removeHoverEffect);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', addHoverEffect);
        el.removeEventListener('mouseleave', removeHoverEffect);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-colors backdrop-blur-sm hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div 
        ref={cursorDotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] shadow-[0_0_10px_2px_rgba(255,255,255,0.4)] hidden md:block mix-blend-difference"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default CustomCursor;
