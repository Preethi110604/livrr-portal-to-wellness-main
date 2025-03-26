
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveDivider from '@/components/ui/WaveDivider';
import ProductHeader from '@/components/products/ProductHeader';
import ProductCategories from '@/components/products/ProductCategories';
import DietProducts from '@/components/products/DietProducts';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import ScrollToTop from '@/components/products/ScrollToTop';
import { toast } from '@/components/ui/use-toast';

const Products = () => {
  useEffect(() => {
    // Initialize animations for reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    // Show welcome toast
    toast({
      title: "Welcome to Livrr Products",
      description: "Explore our traditional medicine and wellness products",
      duration: 5000,
    });
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);
  
  return (
    <div className="bg-gradient-to-b from-white to-livrr-beige/10 min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        <ProductHeader />
        <WaveDivider position="bottom" waveColor="fill-white" />
        <ProductCategories />
        <DietProducts />
        <FeaturedProducts />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Products;
