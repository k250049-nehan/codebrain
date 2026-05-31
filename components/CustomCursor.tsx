'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none;
        }
        a, button, input, select, textarea {
          cursor: none;
        }
      `}</style>

      {/* Main cursor dot */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
        className={`pointer-events-none fixed top-0 left-0 w-5 h-5 bg-gradient-to-r from-blue-200 to-blue-500 rounded-full shadow-lg ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Outer glow ring */}
      <motion.div
        animate={{
          x: mousePosition.x-10,
          y: mousePosition.y-10,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 50,
        }}
        className={`pointer-events-none fixed top-0 left-0 w-10 h-10 border-2 border-blue-300 rounded-full ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(96, 165, 250, 0.5)',
        }}
      />
    </>
  );
}