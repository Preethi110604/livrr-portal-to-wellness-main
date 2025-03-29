import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import '@fontsource/inter';  

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Livrr Tribe', href: '/livrr-tribe' },
  { name: 'Products', href: '/products' },
  { name: 'Survey', href: '/survey' },
  { name: 'Livrr AI', href: '/livrr-ai' },   // Make this navigable if unlocked
  { name: 'Livrr α', href: '/livrr-alpha' },
  { name: 'Liv Blue', href: '/blue-zone' },
  { name: 'New Updates', href: '/new-updates' }
];

const Navbar = () => {
  const { activeSection } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  
  const [aiUnlocked, setAiUnlocked] = useState(false);  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    // Check if AI is unlocked
    const isUnlocked = localStorage.getItem('aiUnlocked') === 'true';
    setAiUnlocked(isUnlocked);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);

    if (href === '/livrr-ai' && !aiUnlocked) {
      setShowPopup(true); // Show popup if AI is not unlocked
    } else {
      navigate(href);
    }
  };

  const handleJoinWaitlist = () => {
    localStorage.setItem('aiUnlocked', 'true'); // Unlock AI
    setAiUnlocked(true);
    setShowPopup(false);
    navigate('/livrr-ai');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">

        {/* Logo with Inter Sans */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-livrr-green-dark flex items-center font-sans"
        >
          Livrr
        </Link>

        {/* Desktop Navigation with Inter Sans */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className={`font-medium hover:text-livrr-green transition duration-300 font-sans ${
                location.pathname === link.href ? 'text-livrr-green' : 'text-gray-600'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-livrr-gray-dark focus:outline-none"
        >
          {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu with Inter Sans */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="text-livrr-gray-dark"
            title="Close Menu"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-6 mt-10">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="text-2xl font-medium hover:text-livrr-green transition duration-300 font-sans"
            >
              {link.name}
            </button>
          ))}
        </nav>
      </div>

      {/* AI Locked Popup with Inter Sans */}
      <Dialog open={showPopup} onOpenChange={() => setShowPopup(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-sans">Livrr AI – Join the Waiting List</DialogTitle>
            <DialogDescription className="font-sans">
              <p className="text-gray-700">
                To get free insights about diet plans and personalized recommendations, 
                join the waiting list or sign up today!
              </p>
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end space-x-4 mt-4">
            <Button
              onClick={handleJoinWaitlist}
              className="bg-green-600 text-white hover:bg-green-700 font-sans"
            >
              Join Waiting List
            </Button>
            <Button onClick={() => setShowPopup(false)} className="font-sans">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
