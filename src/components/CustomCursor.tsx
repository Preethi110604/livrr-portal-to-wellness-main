
import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };

    const handleMouseEnter = () => {
      setIsHovering(true);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsVisible(false);
    };

    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-livrr-green/20 backdrop-blur-sm border border-livrr-green/30 pointer-events-none z-[9999] transition-transform duration-100 flex items-center justify-center"
        style={{ 
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
          mixBlendMode: 'difference'
        }}
      >
        {isPointer && (
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        )}
      </div>
      
      {/* Trail effect */}
      <div 
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-gradient-radial from-livrr-green/20 to-transparent pointer-events-none z-[9998] transition-opacity duration-300"
        style={{ 
          transform: `translate(${position.x - 48}px, ${position.y - 48}px)`,
          opacity: isPointer ? 0.8 : 0.4
        }}
      />
      
      {/* Text that appears when hovering over interactive elements */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9997] text-xs font-medium text-white backdrop-blur-sm bg-livrr-green/70 px-2 py-1 rounded-full transition-opacity duration-300"
        style={{ 
          transform: `translate(${position.x + 20}px, ${position.y - 10}px)`,
          opacity: isPointer ? 1 : 0
        }}
      >
        Longevity
      </div>
    </>
  );
};

export default CustomCursor;
