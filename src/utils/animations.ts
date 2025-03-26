
import { useEffect, useRef, useState } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentRef) {
            observer.unobserve(currentRef);
          }
        }
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

export const useTypewriter = (text: string, speed = 40, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (delay > 0 && !started) {
      const delayTimer = setTimeout(() => {
        setStarted(true);
      }, delay);
      
      return () => clearTimeout(delayTimer);
    }
    
    if (!started && delay > 0) return;
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, delay, speed, started, text]);

  return displayText;
};

export const useParallax = (sensitivity = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * sensitivity * 100;
      const yPos = (clientY / innerHeight - 0.5) * sensitivity * 100;
      
      ref.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [sensitivity]);
  
  return ref;
};

// New animation hooks for enhanced visual effects
export const useFloatingAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let startY = 0;
    let direction = 1;
    let position = 0;
    const speed = 0.5;
    const maxOffset = 20;
    
    const animate = () => {
      if (!element) return;
      
      position += speed * direction;
      
      if (position >= maxOffset) {
        direction = -1;
      } else if (position <= -maxOffset) {
        direction = 1;
      }
      
      element.style.transform = `translateY(${startY + position}px)`;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return ref;
};

export const useRotationAnimation = (speed = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    let rotation = 0;
    
    const animate = () => {
      if (!element) return;
      
      rotation += speed;
      element.style.transform = `rotate(${rotation}deg)`;
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [speed]);
  
  return ref;
};

export const usePulseAnimation = (minScale = 0.95, maxScale = 1.05, duration = 2000) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    element.style.transition = `transform ${duration}ms ease-in-out`;
    
    const shrink = () => {
      if (!element) return;
      element.style.transform = `scale(${minScale})`;
      setTimeout(expand, duration);
    };
    
    const expand = () => {
      if (!element) return;
      element.style.transform = `scale(${maxScale})`;
      setTimeout(shrink, duration);
    };
    
    expand();
    
    return () => {
      if (element) {
        element.style.transform = 'scale(1)';
      }
    };
  }, [minScale, maxScale, duration]);
  
  return ref;
};
