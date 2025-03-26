
import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';

const Loader = () => {
  const { loading } = useApp();
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (loading) {
      // Animate progress while loading is true
      const timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (100 - prev) / 15;
          return Math.min(next, 90); // Cap at 90% until fully loaded
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      // Complete progress and fade out
      setProgress(100);
      
      const timer = setTimeout(() => {
        setOpacity(0);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (!loading && opacity === 0) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white"
      style={{ 
        opacity, 
        transition: 'opacity 0.6s ease-in-out',
        pointerEvents: opacity === 0 ? 'none' : 'auto'
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="text-4xl md:text-5xl font-display font-bold mb-8 relative">
          <span className="text-livrr-green">Livrr</span>
          <span 
            className="absolute -bottom-2 left-0 h-0.5 bg-livrr-green"
            style={{ 
              width: `${progress}%`,
              transition: 'width 0.3s ease-out'
            }}
          />
        </div>
        
        <div className="text-sm text-livrr-gray animate-pulse-slow">
          Thrive Beyond Time
        </div>
      </div>
    </div>
  );
};

export default Loader;
