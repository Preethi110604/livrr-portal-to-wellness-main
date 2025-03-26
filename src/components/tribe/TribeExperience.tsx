import React from 'react';
import { useScrollReveal } from '@/utils/animations';
import { 
  Award, 
  Compass, 
  BookOpen, 
  Users, 
  Heart, 
  Zap, 
  Leaf
} from 'lucide-react';

const experiences = [
  {
    icon: <Award className="h-8 w-8" />,
    title: "Weekly Progress Tracking",
    description: "Track your health journey with detailed weekly measurements and milestones.",
    color: "from-green-400 to-green-600"
  },
  {
    icon: <Compass className="h-8 w-8" />,
    title: "Cheat Days Allowed",
    description: "Our balanced approach includes scheduled cheat days to keep your journey sustainable.",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Blue Zone 21 Days Access",
    description: "Get complete access to our blue zone resources and longevity programs.",
    color: "from-indigo-400 to-indigo-600"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Pure Products Discount",
    description: "Enjoy special discounts on our curated selection of organic health products.",
    color: "from-amber-400 to-amber-600"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community Meetups",
    description: "Connect with fellow tribe members through regular gatherings and support sessions.",
    color: "from-purple-400 to-purple-600"
  },
  {
    icon: <Leaf className="h-8 w-8" />,
    title: "Naturopathy Doctors Consultation",
    description: "Get expert guidance from naturopathy doctors to improve your health with natural and holistic treatments.",
    color: "from-green-400 to-green-600"
  },
  
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Structured Diet Plan",
    description: "Follow our expert-designed 10-day diet plan to kickstart your health transformation.",
    color: "from-pink-400 to-pink-600",
    textClass: "text-left" // Ensuring left alignment
  }   
];

const TribeExperience = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal(0.1);
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal(0.2);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container relative z-10">
        <div 
          ref={titleRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="bg-livrr-green/10 text-livrr-green-dark px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Livrr Tribe Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-livrr-green-dark">
            What You'll Experience
          </h2>
          <p className="text-livrr-gray-dark max-w-2xl mx-auto mt-4">
            Join our tribe and enjoy these exclusive benefits designed to enhance your health journey 
            and connect you with like-minded individuals.
          </p>
        </div>

        <div 
          ref={contentRef as React.RefObject<HTMLDivElement>}
          className={`relative transition-all duration-1000 ${
            contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-radial from-livrr-green/5 to-transparent rounded-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((experience, index) => (
              <div
                key={experience.title}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 border border-gray-100 hover:border-livrr-green/20 group ${
                  experience.title === "Structured Diet Plan" ? "md:col-span-2 lg:col-span-3 mx-auto text-left" : ""
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${experience.color} flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                  {experience.icon}
                </div>
                <h3 className={`text-xl font-semibold text-livrr-green-dark mb-3 ${experience.textClass || ""}`}>
                  {experience.title}
                </h3>
                <p className={`text-livrr-gray ${experience.textClass || ""}`}>
                  {experience.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a 
              href="#join-movement" 
              className="button-primary inline-flex items-center gap-2 group"
            >
              Join The Tribe
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TribeExperience;
