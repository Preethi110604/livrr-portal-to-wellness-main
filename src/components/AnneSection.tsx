
import React from 'react';
import { useScrollReveal, usePulseAnimation } from '@/utils/animations';
import { Shield, Leaf, Apple, SmilePlus } from 'lucide-react';

const AnneSection = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.1);
  const pulseRef = usePulseAnimation(0.98, 1.02, 3000);
  
  const principles = [
    {
      letter: "A",
      title: "Agility",
      description: "We promote physical agility and mental flexibility to adapt to life's changing demands.",
      icon: <Shield className="h-8 w-8" />,
      color: "from-livrr-green/20 to-livrr-green/10"
    },
    {
      letter: "N",
      title: "Natural",
      description: "We believe in natural solutions and respect the body's innate wisdom.",
      icon: <Leaf className="h-8 w-8" />,
      color: "from-livrr-blue/20 to-livrr-blue/10"
    },
    {
      letter: "N",
      title: "Nutrition",
      description: "We focus on organic, whole foods that nourish rather than just feed.",
      icon: <Apple className="h-8 w-8" />,
      color: "from-livrr-beige/30 to-livrr-beige/20"
    },
    {
      letter: "E",
      title: "Eudaimonia",
      description: "We aim for true well-being that encompasses physical, mental, and social flourishing.",
      icon: <SmilePlus className="h-8 w-8" />,
      color: "from-emerald-100/80 to-emerald-50/60"
    }
  ];
  
  return (
    <section 
      id="anne" 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="py-24 relative bg-gradient-to-b from-white to-livrr-beige/10"
    >
      <div className="container">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-livrr-green/10 text-livrr-green-dark px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Our Philosophy
          </span>
          <h2 className="section-title">
            The ANNE Principle
          </h2>
          <p className="section-subtitle">
            Our core philosophy is built on four pillars that guide our approach to holistic wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div 
            className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full bg-gradient-radial from-livrr-green/5 to-transparent"
            ref={pulseRef}
          />
          
          {principles.map((principle, index) => (
            <div 
              key={principle.title}
              className={`glass-card rounded-xl p-8 transition-all duration-700 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 relative overflow-hidden`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                opacity: sectionVisible ? 1 : 0,
                transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${principle.color}`} />
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${principle.color} opacity-20`} />
              
              <div className="mb-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${principle.color} flex items-center justify-center text-livrr-green-dark mb-2`}>
                    {principle.icon}
                  </div>
                  <div className="text-5xl font-display font-bold text-livrr-green/20">
                    {principle.letter}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-livrr-green-dark mb-2">
                  {principle.title}
                </h3>
              </div>
              <p className="text-livrr-gray-dark">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnneSection;
