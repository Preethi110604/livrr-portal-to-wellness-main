import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdNotificationsActive } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';
import '@fontsource/inter';

const supabaseUrl = 'https://eisoqaauuffifotkskmo.supabase.co';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const Navbar = () => {
  const { activeSection } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Livrr Tribe', href: '/livrr-tribe' },
    { name: 'Products', href: '/products' },
    { name: 'Livrr AI', href: '/longi' },  // ✅ Navigates directly now!
    { name: 'Livrr α', href: '/livrr-alpha' },
    { name: 'Liv Blue', href: '/blue-zone' },
    user ? { name: 'Logout', href: '#', action: handleLogout } : { name: 'Login', href: '/login' },
  ];

  const handleLinkClick = (href, action) => {
    setMobileMenuOpen(false);
    if (action) {
      action();
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'py-3 bg-white/90 backdrop-blur-md shadow-md' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-2xl font-bold font-times text-livrr-green-dark">Livrr</Link>
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href, link.action)}
              className={`font-medium hover:text-livrr-green transition duration-300 ${location.pathname === link.href ? 'text-livrr-green' : 'text-gray-600'}`}
            >
              {link.name}
            </button>
          ))}
        </nav>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white p-4 shadow-lg fixed inset-0 z-50">
          <button onClick={() => setMobileMenuOpen(false)} className="text-right" aria-label="Close menu">
            <FaTimes className="text-2xl" />
          </button>
          <nav className="flex flex-col space-y-4 mt-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href, link.action)}
                className="text-lg font-medium"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}

      <div className="fixed top-15 right-1 bg-livrr-green-dark text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-livrr-green transition duration-300 hover:scale-110 flex items-center justify-center" onClick={() => navigate('/new-updates')} title="New Updates">
        <MdNotificationsActive className="text-3xl" />
      </div>
    </header>
  );
};

export default Navbar;
