import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';  
import { FaBell } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Livrr Tribe', href: '/livrr-tribe' },
  { name: 'Products', href: '/products' },
  { name: 'Survey', href: '/survey' },
  { name: 'Livrr AI', href: '#' },  // Trigger popup
  { name: 'Livrr α', href: '/livrr-alpha' },  // Redirect target
  { name: 'Liv Blue', href: '/blue-zone' },
  { name: 'New Updates', href: '#' },  
];

const Navbar = () => {
  const { activeSection } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showPopup, setShowPopup] = useState(false);  // State for popup
  const location = useLocation();
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle navigation clicks
  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);

    if (href === '#') {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 10000);
    } else if (href === '/livrr-ai') {  
      setShowPopup(true);  // Open the popup when Livrr AI is clicked
    } else if (href.startsWith('/#') && location.pathname !== '/') {
      window.location.href = href;
    }
  };

  // Close popup and redirect to Livrr α page
  const handlePopupClose = () => {
    setShowPopup(false);

    // Redirect to Livrr α page after closing the popup
    navigate('/longi');  
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-display font-bold text-livrr-green-dark flex items-center">
          <span className="relative">
            Livrr
            <span 
              className={`absolute -bottom-1 left-0 h-0.5 bg-livrr-green transition-all duration-300 ${
                activeSection === 'hero' ? 'w-full' : 'w-0'
              }`} 
            />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isNotification = link.name === 'Notification';

            return isNotification ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="relative font-medium hover:text-livrr-green transition-colors duration-300 cursor-pointer"
              >
                <span>{link.name}</span> 
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => {
                  if (link.name === 'Livrr AI') {
                    setShowPopup(true);
                  }
                  setMobileMenuOpen(false);
                }}
                className={`relative font-medium hover:text-livrr-green transition-colors duration-300 group ${
                  location.pathname === link.href ? 'text-livrr-green' : 'text-livrr-gray-dark'
                }`}
              >
                <span>{link.name}</span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-livrr-green transition-all duration-300 ${
                  location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          title="Toggle Mobile Menu"
          className="md:hidden text-livrr-gray-dark focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* AI Features Popup */}
      <Dialog open={showPopup} onOpenChange={handlePopupClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Livrr AI Features</DialogTitle>
            <DialogDescription>
              <h3 className="font-bold">Pre_Trained Model, utilizing advanced AI to provide accurate and insightful responses.</h3>

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
