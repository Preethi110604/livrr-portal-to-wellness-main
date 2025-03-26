import React, { useRef, useEffect } from 'react';
import { useTypewriter, usePulseAnimation, useFloatingAnimation } from '@/utils/animations';
import WaveDivider from './ui/WaveDivider';
import { ArrowDownCircle, Star } from 'lucide-react';

const Hero = () => {
  const typedText = useTypewriter('Thrive Beyond Time', 80, 2500);
  const floatingRef = useRef<HTMLDivElement>(null);
  const pulseCircleRef = usePulseAnimation();
  const floatingElementRef = useFloatingAnimation();
  
  useEffect(() => {
    const handleScroll = () => {
      if (floatingRef.current) {
        const scrollValue = window.scrollY;
        floatingRef.current.style.transform = `translateY(${scrollValue * 0.15}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white to-livrr-green/5">
      <div 
        className="absolute inset-0 opacity-70"
        style={{ 
          backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234CAF50' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundSize: "60px 60px"
        }}
      />
      
      <div 
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-livrr-green/10 animate-float"
        ref={pulseCircleRef}
      />
      <div 
        className="absolute bottom-1/4 right-10 w-16 h-16 rounded-full bg-livrr-blue/10 animate-pulse-slow"
      />
      <div 
        className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-livrr-beige/30 animate-spin-slow opacity-60"
      />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="star-1 absolute top-[15%] left-[10%]" ref={floatingElementRef}>
          <Star className="text-livrr-green/30 h-12 w-12" />
        </div>
        <div className="star-2 absolute top-[45%] right-[15%] animate-float">
          <Star className="text-livrr-blue/30 h-8 w-8" />
        </div>
        <div className="star-3 absolute bottom-[25%] left-[25%] animate-pulse-slow">
          <Star className="text-livrr-beige/60 h-10 w-10" />
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="mb-2 inline-block">
              <span className="bg-gradient-to-r from-livrr-green/80 to-livrr-blue/80 text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                Coming Soon
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-livrr-green-dark to-livrr-blue-dark">
                Livrr
              </span>
              <br />
              <span className="text-livrr-gray-dark h-[40px] md:h-[48px] lg:h-[60px] inline-block">
                {typedText}
                <span className="animate-pulse ml-0.5">|</span>
              </span>
            </h1>
            
            <p className="text-livrr-gray-dark text-lg md:text-xl mb-8 max-w-xl">
              Unlock your full wellness potential with our revolutionary health tracking, 
              fitness assistance, and organic food platform. Join the movement toward a 
              longer, healthier life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#waitlist" 
                className="group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-livrr-green to-livrr-blue rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium py-3 px-6 rounded-full">
                  Join the Waitlist
                  <ArrowDownCircle className="h-4 w-4 animate-bounce" />
                </span>
              </a>
              
              <a 
                href="#features" 
                className="relative group overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full border border-livrr-green/50 bg-white rounded-full group-hover:bg-livrr-green/5 transition-all duration-300"></span>
                <span className="relative z-10 flex items-center justify-center text-livrr-green-dark font-medium py-3 px-6 rounded-full">
                  Discover More
                </span>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center" ref={floatingRef}>
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-br from-livrr-green/20 to-livrr-blue/20 animate-pulse-slow" />
              <div className="absolute -bottom-5 -right-5 w-48 h-48 rounded-full bg-gradient-to-tr from-livrr-blue/20 to-livrr-beige/20 animate-float" />
              
              <div className="relative z-10 glass rounded-2xl h-full w-full overflow-hidden shadow-glass-lg group">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                  alt="Wellness and nature" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                <div className="absolute bottom-6 left-6 glass-card px-4 py-3 rounded-lg max-w-[80%] backdrop-blur-md">
                  <div className="flex items-center">
                    <div className="mr-3 h-8 w-8 rounded-full bg-gradient-to-r from-livrr-green to-livrr-blue flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                    </div>
                    <div className="text-sm font-medium text-livrr-green-dark">
                      Personalized health insights
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 glass-card px-4 py-3 rounded-lg max-w-[80%] animate-float backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <div className="text-sm font-medium text-livrr-green-dark">
                      ANNE Principle
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="text-xs text-livrr-gray-dark mb-2">Scroll to explore</div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-livrr-green">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      
      <WaveDivider position="bottom" waveColor="fill-white" />
    </section>
  );
};

export default Hero;
