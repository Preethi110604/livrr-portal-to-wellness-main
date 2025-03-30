import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';
import '@fontsource/inter';

// Initialize Supabase client
const supabaseUrl = 'https://eisoqaauuffifotkskmo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpc29xYWF1dWZmaWZvdGtza21vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE4NzcwODUsImV4cCI6MjA1NzQ1MzA4NX0.J8fv9hutJOnWl3efotAzzueINCP6SixxGTVQ6dks3Zc';
const supabase = createClient(supabaseUrl, supabaseKey);

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Livrr Tribe', href: '/livrr-tribe' },
  { name: 'Products', href: '/products' },
  { name: 'Survey', href: '/survey' },
  { name: 'Livrr AI', href: '/longi' },   // Locked initially
  { name: 'Livrr α', href: '/livrr-alpha' },
  { name: 'Liv Blue', href: '/blue-zone' },
  { name: 'New Updates', href: '/new-updates' }
];

const Navbar = () => {
  const { activeSection } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const userId = 'test-user';  // Replace with actual user ID from your auth system

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);

    // Fetch AI unlock status from Supabase
    const fetchAIStatus = async () => {
      try {
        const { data, error } = await supabase
          .from('user_access')
          .select('ai_unlocked')
          .eq('user_id', userId)
          .single();

        if (error) {
          console.error('Error fetching AI status:', error.message);
        } else {
          setIsUnlocked(data?.ai_unlocked || false);
        }
      } catch (error) {
        console.error('Unexpected error fetching AI access:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAIStatus();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userId]);

  const handleLinkClick = (href) => {
    setMobileMenuOpen(false);

    if (href === '/longi') {
      if (isUnlocked) {
        navigate(href);
      } else {
        setShowPopup(true);
      }
    } else {
      navigate(href);
    }
  };

  const handleJoinMovement = async () => {
    setShowPopup(false);
    navigate('/livrr-tribe#join-movement');

    try {
      const { error } = await supabase
        .from('user_access')
        .upsert([
          {
            user_id: userId,     // Use the dynamic user ID
            ai_unlocked: true,
            updated_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      console.log('AI unlocked successfully!');
      setIsUnlocked(true);
    } catch (error) {
      console.error('Error updating AI access:', error.message);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold font-times text-livrr-green-dark">
          Livrr
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className={`font-medium hover:text-livrr-green transition duration-300 ${
                location.pathname === link.href ? 'text-livrr-green' : 'text-gray-600'
              } ${!isUnlocked && link.name === 'Livrr AI' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg fixed inset-0 z-50">
          <button
            onClick={() => setMobileMenuOpen(false)}
            type="button"
            className="text-right"
            aria-label="Close menu"
          >
            <FaTimes className="text-2xl" />
          </button>

          <nav className="flex flex-col space-y-4 mt-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className={`text-lg font-medium ${
                  !isUnlocked && link.name === 'Livrr AI' ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Popup Dialog */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🔒 Unlock Livrr AI</DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <p>Join the movement to unlock AI-powered benefits!</p>
          </DialogDescription>

          <div className="flex justify-between mt-4">
            <Button onClick={() => setShowPopup(false)}>Close</Button>
            <Button onClick={handleJoinMovement}>Join the Movement</Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Navbar;
