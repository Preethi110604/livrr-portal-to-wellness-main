
import React, { createContext, useContext, useState, useEffect } from 'react';

type AppContextType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      let current = '';
      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || '';
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop <= 100) {
          current = sectionId;
        }
      });
      
      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <AppContext.Provider value={{ loading, setLoading, activeSection, setActiveSection }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
