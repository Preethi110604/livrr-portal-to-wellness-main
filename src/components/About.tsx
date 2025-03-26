
import React, { useRef, useEffect } from 'react';
import { useScrollReveal } from '@/utils/animations';
import WaveDivider from './ui/WaveDivider';

const impactStats = [
  {
    value: "5.3 Years",
    label: "Air Pollution Impact",
    description: "Air pollution can reduce life expectancy by approximately 5.3 years in India, with up to 11.9 years lost in highly polluted cities like Delhi."
  },
  {
    value: "90%",
    label: "Blue Zone Diet",
    description: "People in Blue Zones primarily eat a 95% plant-based diet, rich in antioxidants and fiber, contributing to longevity."
  },
  {
    value: "3 in 4",
    label: "Diabetes Distribution",
    description: "3 in 4 people with diabetes live in low- and middle-income countries, highlighting health disparities."
  },
  {
    value: "13.9%",
    label: "Mental Health Prevalence",
    description: "13.9% of the world's population experienced mental disorders in 2021, affecting overall wellbeing."
  },
];

const targetedAudience = [
  "Health Enthusiasts",
  "Weight Management Seekers",
  "Athletes & Sports Professionals",
  "Gym-Goers & Bodybuilders",
  "People with Chronic Conditions",
  "Busy Professionals",
  "Vegans & Organic Food Consumers",
  "Seniors Focused on Wellness",
  "People with Food Allergies & Sensitivities",
];

const About = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.1);
  const { ref: audienceRef, isVisible: audienceVisible } = useScrollReveal(0.1);
  const { ref: visionRef, isVisible: visionVisible } = useScrollReveal(0.1);
  
  const parallaxImageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxImageRef.current) {
        const scrollValue = window.scrollY;
        const offset = (scrollValue - 1500) * 0.1;
        parallaxImageRef.current.style.transform = `translateY(${Math.min(
          Math.max(-30, offset),
          30
        )}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="py-20 relative bg-gradient-to-b from-white to-livrr-beige/30"
    >
      <WaveDivider position="top" waveColor="fill-white" direction="reverse" />
      
      <div className="container">
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-livrr-beige-dark/20 text-livrr-gray-dark px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Our Mission
          </span>
          <h2 className="section-title text-center">
            Revolutionizing Holistic Wellness
          </h2>
          <p className="section-subtitle text-center">
            Livrr bridges the gap between fitness, nutrition, and organic living, creating a comprehensive ecosystem for your health journey.
          </p>
        </div>

        {/* Vision & Purpose */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          ref={visionRef as React.RefObject<HTMLDivElement>}
        >
          <div 
            className={`relative overflow-hidden rounded-2xl transition-all duration-700 ${
              visionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative h-full aspect-[4/3] overflow-hidden rounded-2xl">
              <div ref={parallaxImageRef}>
                <img 
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" 
                  alt="Woman using Livrr app" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Overlaid statistics card */}
              <div className="absolute bottom-6 left-6 glass-card p-4 rounded-xl max-w-[200px]">
                <div className="text-xs text-livrr-gray-dark mb-1">Active Users Growth</div>
                <div className="flex items-end space-x-1">
                  <span className="text-2xl font-semibold text-livrr-green">+128%</span>
                  <span className="text-xs text-livrr-green mb-1">vs last quarter</span>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-700 delay-300 ${
              visionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-livrr-gray-dark mb-6">
              Our Vision with Livrr
            </h3>
            
            <p className="text-livrr-gray-dark mb-6 text-justify">
  We promote longevity by offering comprehensive health tracking, personalized fitness assistance, and access to organic food and products. Our goal is to set a new trend, encouraging people to be more mindful of their eating habits while gaining deeper insights into their bodies.
</p>

<p className="text-livrr-gray-dark mb-6 text-justify">
  Many individuals strive to establish a healthy routine, but the declining quality of food—due to the commercialization of the food industry—has created a need for an alternative source. Organic food and products serve as the ideal solution, yet addressing all these concerns in one place remains a challenge.
</p>

<p className="text-livrr-gray-dark text-justify">
  Livrr bridges this gap by providing access to healthy organic food products and personalized fitness assistance. Unlike other platforms that solely focus on fitness, we take a step ahead by offering comprehensive health reports with expert guidance from renowned Naturopathy Doctors.
</p>
          </div>
        </div>

        {/* Livrr Built On These - Health Impact Statistics */}
        <div 
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-livrr-gray-dark mb-6 text-center">
            Livrr Built On These
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`glass-card rounded-xl p-6 transition-all duration-700 delay-${index * 100} ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-medium text-livrr-gray-dark mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-livrr-gray">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div 
          ref={audienceRef as React.RefObject<HTMLDivElement>}
          className="mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-display font-semibold text-livrr-gray-dark mb-6 text-center">
            Who We Serve
          </h3>
          
          <div 
            className={`flex flex-wrap justify-center gap-3 transition-all duration-700 ${
              audienceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {targetedAudience.map((audience, index) => (
              <div 
                key={audience}
                className="bg-white/80 border border-livrr-green/20 rounded-full px-4 py-2 text-livrr-gray-dark transition-all duration-300 hover:bg-livrr-green/10 hover:border-livrr-green/30"
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: audienceVisible ? 1 : 0,
                  transform: audienceVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                {audience}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <WaveDivider position="bottom" waveColor="fill-white" />
    </section>
  );
};

export default About;
