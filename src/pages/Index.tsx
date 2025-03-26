
import React, { useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AnneSection from '@/components/AnneSection';
import Features from '@/components/Features';
import About from '@/components/About';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import { ArrowUp } from 'lucide-react';

const Index = () => {
  const { loading } = useApp();

  useEffect(() => {
    // Intersection Observer for reveal animations
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      revealElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [loading]);

  return (
    <>
      <Loader />
      <CustomCursor />
      
      <div className={loading ? 'opacity-0' : 'opacity-100 transition-opacity duration-700'}>
        <Navbar />
        <main>
          <Hero />
          <AnneSection />
          <Features />
          <About />
          <Waitlist />
        </main>
        <Footer />
        
        {/* Back to top button - enhanced with animation */}
        <a 
          href="#" 
          className="fixed bottom-6 right-6 bg-gradient-to-r from-livrr-green to-livrr-blue w-12 h-12 rounded-full shadow-md flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </a>
      </div>
    </>
  );
};

export default Index;
