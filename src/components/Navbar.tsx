import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Livrr Tribe', href: '/livrr-tribe' },
  { name: 'Products', href: '/products' },
  { name: 'Survey', href: '/survey' },
  { name: 'Livrr AI', href: '#' },  // Trigger popup
  { name: 'Livrr α', href: '/livrr-alpha' },  
  { name: 'Liv Blue', href: '/blue-zone' },
  { name: 'New Updates', href: '#' },  
];

const Navbar = () => {
  const { activeSection } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  
  const location = useLocation();
  const navigate = useNavigate();  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);

    if (href === '#') {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 10000);
    } else if (href === '/livrr-ai') {  
      setShowPopup(true);
    } else {
      navigate(href);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/longi');  
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-livrr-green-dark flex items-center">
          Livrr
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={(e) => {
                if (link.href === '#') {
                  e.preventDefault();
                  setShowPopup(true);
                }
              }}
              className={`font-medium hover:text-livrr-green transition duration-300 ${
                location.pathname === link.href ? 'text-livrr-green' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
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

      {/* Mobile Menu */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button
          type ="button"
            onClick={() => setMobileMenuOpen(false)}
            className="text-livrr-gray-dark"
            title={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col items-center space-y-6 mt-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => {
                if (link.href === '#') {
                  setShowPopup(true);
                }
                setMobileMenuOpen(false);
              }}
              className="text-2xl font-medium hover:text-livrr-green transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* AI Features Popup */}
      <Dialog open={showPopup} onOpenChange={handlePopupClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Livrr AI Features</DialogTitle>
            <DialogDescription>
              <h3 className="font-bold">Pre-Trained Model, utilizing advanced AI to provide accurate and insightful responses.</h3>

              <h4 className="mt-4 font-bold">Features and Benefits:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Tailored Nutritional Advice:</strong> Get customized meal suggestions and nutritional counseling based on your physical parameters and preferences.</li>
                <li><strong>Interactive Calorie Tracking:</strong> Send a photo of your meals and get instant calorie and nutritional analysis.</li>
                <li><strong>Informed Dietary Recommendations:</strong> Receive optimized diet plans for health conditions, fitness targets, or dietary restrictions.</li>
              </ul>

              <h4 className="mt-4 font-bold">How to Use AI Dietitian:</h4>
              <p>
                You can ask any questions about your diet and health, like the example questions above the chat area.
                You can also send photos of your meals for detailed analysis and discussion.
                It considers the foods you logged today. AI Dietitian is here to support you in achieving a healthier lifestyle through personalized, data-driven advice.
              </p>

              <h4 className="mt-4 font-bold">AI Model Information:</h4>
              <p>
                We use a pre-trained Microsoft Phi-4 model for AI dietitian chat interactions. While we strive for accuracy, the AI model system may make mistakes. 
                The AI model is currently undergoing updates to improve its performance. 
                We remind users to consult a doctor before making any medical decisions.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end mt-4">
            <Button onClick={handlePopupClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
