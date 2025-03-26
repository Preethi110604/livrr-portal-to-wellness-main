
import React from 'react';
import { useScrollReveal } from '@/utils/animations';
import { CheckCircle, Calendar, Shield, Leaf, Users2, Store } from 'lucide-react';

const tribeFeatures = [
  {
    title: "Weekly Progress Tracking",
    description: "Monitor your health improvements with our detailed weekly progress tracking system.",
    icon: <CheckCircle className="h-10 w-10" />,
    color: "from-green-400 to-emerald-500"
  },
  {
    title: "To-Do List and Alarm Setup",
    description: "Effectively manage your tasks with a to-do list and stay on track by setting alarms for important reminders.",
    icon: <Calendar className="h-10 w-10" />,
    color: "from-blue-400 to-indigo-500"
  },
  {
    title: "Blue Zone 30 Days Full Access",
    description: "Get complete access to our exclusive Blue Zone resources and programs for a full month.",
    icon: <Shield className="h-10 w-10" />,
    color: "from-amber-400 to-orange-500"
  },
  {
    title: "Structured Diet Plan for 10 Days",
    description: "Follow our expert-designed 10-day diet plan to kickstart your health transformation.",
    icon: <Leaf className="h-10 w-10" />,
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Community Meet-ups",
    description: "Connect with fellow tribe members in regular community gatherings and support sessions.",
    icon: <Users2 className="h-10 w-10" />,
    color: "from-livrr-green to-livrr-blue"
  },
  {
    title: "Naturopathy Doctors Consultation",
    description: "Get expert guidance from naturopathy doctors to improve your health with natural and holistic treatments.",
    icon: <Store className="h-10 w-10" />,
    color: "from-teal-400 to-cyan-500"
  }
];

const TribeBenefits = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal(0.1);
  
  return (
    <section id="tribe-benefits" className="py-20 bg-white">
      <div className="container">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="section-title">Tribe Benefits</h2>
          <p className="section-subtitle">
            Join a community focused on disease resistance and longevity
          </p>
        </div>
        
        <div 
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {tribeFeatures.map((feature, index) => (
            <div 
              key={feature.title}
              className="reveal glass-card rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="p-8">
                <div className={`w-16 h-16 mb-6 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-livrr-green-dark mb-3">{feature.title}</h3>
                <p className="text-livrr-gray-dark mb-4">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TribeBenefits;
